// Cloudflare Worker: отдаёт статический сайт (dist) и отвечает конструктору на /api/audit через Gemini.
// Ключ Gemini хранится только здесь (секрет GEMINI_API_KEY), в браузер он не попадает.
import { SYSTEM_PROMPT, RESPONSE_SCHEMA, userMessage } from './prompt.js';

const MAX_LEN = 600;              // символов на одно поле
const LIMIT = 8;                  // запросов с одного IP…
const WINDOW_MS = 10 * 60 * 1000; // …за 10 минут
const hits = new Map();           // простой лимит в памяти инстанса (защита от случайного спама)

export default {
  async fetch(req, env) {
    const { pathname } = new URL(req.url);
    if (!pathname.startsWith('/api/')) return env.ASSETS ? env.ASSETS.fetch(req) : new Response('Not found', { status: 404 });

    const cors = corsHeaders(req, env);
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (req.method !== 'POST' || pathname !== '/api/audit') return json({ error: 'not_found' }, 404, cors);
    if (!cors['Access-Control-Allow-Origin']) return json({ error: 'forbidden' }, 403, cors);

    const ip = req.headers.get('CF-Connecting-IP') || 'local';
    if (limited(ip)) return json({ error: 'rate_limited' }, 429, cors);

    let body;
    try { body = await req.json(); } catch { return json({ error: 'bad_request' }, 400, cors); }
    const clean = (v) => String(v ?? '').trim().slice(0, MAX_LEN);
    const input = {
      lang: body.lang === 'en' ? 'en' : 'ru',
      process: clean(body.process),
      sources: clean(body.sources),
      volume: clean(body.volume),
    };
    if (input.process.length < 3) return json({ error: 'empty' }, 400, cors);

    // Без ключа (локальная разработка) — отдаём заглушку, чтобы проверять интерфейс
    if (!env.GEMINI_API_KEY) return json({ ...mock(input), mock: true }, 200, cors);

    try {
      return json(await askGemini(input, env), 200, cors);
    } catch (e) {
      console.error(e);
      return json({ error: e.status === 429 ? 'busy' : 'ai_failed' }, 502, cors);
    }
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
  });
  if (!res.ok) {
    const err = new Error(`Gemini ${res.status}: ${(await res.text()).slice(0, 300)}`);
    err.status = res.status;
    throw err;
  }
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('') || '';
  const r = JSON.parse(text);
  return {
    hours: Math.max(0, Math.round(Number(r.hours) || 0)),
    bottlenecks: (Array.isArray(r.bottlenecks) ? r.bottlenecks : []).slice(0, 4).map(String),
    agent: String(r.agent || ''),
    format: String(r.format || ''),
    assumptions: String(r.assumptions || ''),
    off_topic: Boolean(r.off_topic),
  };
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

function limited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  return list.length > LIMIT;
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
    agent: (ru ? 'Заглушка (нет ключа Gemini). Процесс: ' : 'Mock (no Gemini key). Process: ') + process.slice(0, 80),
    format: ru ? 'Подходит для пилота на одном процессе.' : 'A good fit for a single-process pilot.',
    assumptions: ru ? '40 заявок в день, 5 минут на заявку.' : '40 requests a day, 5 minutes each.',
    off_topic: false,
  };
}
