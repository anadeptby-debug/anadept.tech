// Cloudflare Worker: отдаёт статический сайт (dist) и отвечает конструктору на /api/audit.
// ИИ: сначала Gemini (если задан секрет GEMINI_API_KEY), при ошибке или без ключа — Cloudflare Workers AI
// (привязка AI в wrangler.jsonc, ключ не нужен). Ключи живут только здесь, в браузер не попадают.
import { SYSTEM_PROMPT, RESPONSE_SCHEMA, JSON_SCHEMA, userMessage } from './prompt.js';
import { handleChat, chatMock } from './chat.js';

const MAX_LEN = 600;              // символов на одно поле
const LIMITS = { audit: 8, chat: 30 }; // запросов с одного IP…
const WINDOW_MS = 10 * 60 * 1000;     // …за 10 минут
const hits = new Map();           // простой лимит в памяти инстанса (защита от случайного спама)

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const { pathname } = url;
    if (!pathname.startsWith('/api/')) return env.ASSETS ? env.ASSETS.fetch(req) : new Response('Not found', { status: 404 });

    const cors = corsHeaders(req, env);
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    const route = pathname === '/api/audit' ? 'audit' : pathname === '/api/chat' ? 'chat' : null;
    if (req.method !== 'POST' || !route) return json({ error: 'not_found' }, 404, cors);
    if (!cors['Access-Control-Allow-Origin']) return json({ error: 'forbidden' }, 403, cors);

    const ip = req.headers.get('CF-Connecting-IP') || 'local';
    if (limited(`${route}:${ip}`, LIMITS[route])) return json({ error: 'rate_limited' }, 429, cors);

    let body;
    try { body = await req.json(); } catch { return json({ error: 'bad_request' }, 400, cors); }
    const isLocal = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(url.hostname);

    if (route === 'chat') {
      try {
        return json(await handleChat(body, env), 200, cors);
      } catch (e) {
        if (e.code === 'empty') return json({ error: 'empty' }, 400, cors);
        if (isLocal) return json(chatMock(body.lang === 'en' ? 'en' : 'ru'), 200, cors);
        return json({ error: e.status === 429 ? 'busy' : 'ai_failed' }, 502, cors);
      }
    }
    const clean = (v) => String(v ?? '').trim().slice(0, MAX_LEN);
    const input = {
      lang: body.lang === 'en' ? 'en' : 'ru',
      process: clean(body.process),
      sources: clean(body.sources),
      volume: clean(body.volume),
    };
    if (input.process.length < 3) return json({ error: 'empty' }, 400, cors);

    // Цепочка: Gemini → Workers AI. Первый, кто ответил, — тот и отвечает посетителю.
    const providers = [];
    if (env.GEMINI_API_KEY) providers.push(['gemini', askGemini]);
    if (env.AI) providers.push(['workers-ai', askWorkersAI]);

    let lastErr;
    for (const [name, ask] of providers) {
      try {
        return json({ ...(await ask(input, env)), via: name }, 200, cors);
      } catch (e) {
        lastErr = e;
        console.error(`[${name}]`, e.message || e);
      }
    }

    // Локальная разработка без ключа и без входа в Cloudflare — заглушка, чтобы проверять интерфейс.
    // На боевом домене заглушку не показываем: посетитель увидит честную ошибку.
    if (isLocal) return json({ ...mock(input), via: 'mock' }, 200, cors);
    return json({ error: lastErr?.status === 429 ? 'busy' : 'ai_failed' }, 502, cors);
  },
};

async function askGemini(input, env) {
  const model = env.GEMINI_MODEL || 'gemini-2.5-flash';
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [{ role: 'user', parts: [{ text: userMessage(input) }] }],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 1024,
        responseMimeType: 'application/json',
        responseSchema: RESPONSE_SCHEMA,
        thinkingConfig: { thinkingBudget: 0 }, // быстрее ответ, демо не нужна «долгая мысль»
      },
    }),
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) {
    // 400 «User location is not supported» — Google не обслуживает регион, где запущен воркер
    const err = new Error(`Gemini ${res.status}: ${(await res.text()).slice(0, 300)}`);
    err.status = res.status;
    throw err;
  }
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('') || '';
  return normalize(JSON.parse(text));
}

async function askWorkersAI(input, env) {
  const model = env.CF_AI_MODEL || '@cf/meta/llama-3.3-70b-instruct-fp8-fast';
  const out = await env.AI.run(model, {
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userMessage(input) },
    ],
    response_format: { type: 'json_schema', json_schema: JSON_SCHEMA },
    temperature: 0.4,
    max_tokens: 1024,
  });
  // Ответ бывает в двух видах: { response } или в стиле OpenAI { choices[0].message.content }; объектом или строкой
  const raw = out?.response ?? out?.choices?.[0]?.message?.content;
  const r = typeof raw === 'string' ? JSON.parse(raw) : raw;
  if (!r || typeof r !== 'object') throw new Error('Workers AI: empty response');
  return normalize(r);
}

const WORKDAYS = 21;
const num = (v, min, max) => Math.min(max, Math.max(min, Number(v) || 0));

// Приводим ответ любой модели к одному виду и обрезаем лишнее.
// Часы считаем сами: модели плохо умножают, а цифра должна быть честной.
function normalize(r) {
  const perDay = num(r.per_day, 0, 5000);
  const minutes = num(r.minutes, 0, 480);
  const share = num(r.share, 0, 0.9);
  const res = {
    hours: r.off_topic ? 0 : Math.round((perDay * minutes * share * WORKDAYS) / 60),
    bottlenecks: (Array.isArray(r.bottlenecks) ? r.bottlenecks : []).slice(0, 4).map((b) => String(b).slice(0, 120)),
    agent: String(r.agent || '').slice(0, 400),
    format: String(r.format || '').slice(0, 300),
    assumptions: String(r.assumptions || '').slice(0, 300),
    off_topic: Boolean(r.off_topic),
  };
  if (!res.off_topic && (!res.agent || !res.bottlenecks.length)) throw new Error('AI: incomplete answer');
  return res;
}

function corsHeaders(req, env) {
  // Разрешены: сам сайт (тот же домен), адреса из ALLOWED_ORIGINS и localhost для разработки
  const origin = req.headers.get('Origin') || '';
  const allowed = (env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
  const ok = origin === new URL(req.url).origin || allowed.includes(origin)
    || /^http:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/.test(origin);
  return {
    ...(ok ? { 'Access-Control-Allow-Origin': origin } : {}),
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
}

function limited(key, limit) {
  const now = Date.now();
  const list = (hits.get(key) || []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(key, list);
  return list.length > limit;
}

const json = (obj, status, headers) =>
  new Response(JSON.stringify(obj), { status, headers: { ...headers, 'Content-Type': 'application/json; charset=utf-8' } });

function mock({ lang, process }) {
  const ru = lang === 'ru';
  return {
    hours: 42,
    bottlenecks: ru
      ? ['Данные переносят между системами вручную', 'Нет единого журнала обращений', 'Ответ клиенту ждёт свободного менеджера']
      : ['Data is copied between systems by hand', 'No single request log', 'Replies wait for a free manager'],
    agent: (ru ? 'Заглушка (ИИ не подключён локально). Процесс: ' : 'Mock (AI not connected locally). Process: ') + process.slice(0, 80),
    format: ru ? 'Подходит для пилота на одном процессе.' : 'A good fit for a single-process pilot.',
    assumptions: ru ? '40 заявок в день, 5 минут на заявку.' : '40 requests a day, 5 minutes each.',
    off_topic: false,
  };
}
