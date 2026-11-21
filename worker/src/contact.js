// Заявка с сайта (/api/contact): проверяем поля и отправляем сообщение в Telegram.
// Секреты в Cloudflare: TELEGRAM_BOT_TOKEN (токен бота от @BotFather) и TELEGRAM_CHAT_ID
// (куда слать: личный чат, группа или канал, где бот добавлен). В браузер они не попадают.
// Необязательно: TELEGRAM_THREAD_ID — номер темы в группе с темами (иначе заявки идут в «General»).

const LIMITS = { name: 100, contact: 150, process: 1500, page: 200 };

const clean = (v, max) => String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
const cleanText = (v, max) => String(v ?? '').replace(/\r\n?/g, '\n').replace(/\n{3,}/g, '\n\n').trim().slice(0, max);

export function parseContact(body) {
  const lead = {
    lang: body?.lang === 'en' ? 'en' : 'ru',
    name: clean(body?.name, LIMITS.name),
    contact: clean(body?.contact, LIMITS.contact),
    process: cleanText(body?.process, LIMITS.process),
    page: clean(body?.page, LIMITS.page),
  };
  // Скрытое поле-ловушка: человек его не видит и не заполняет, боты — заполняют
  const bot = clean(body?.website, 200).length > 0;
  const valid = lead.name.length >= 1 && lead.contact.length >= 3;
  return { lead, bot, valid };
}

export function leadMessage(lead, when = new Date()) {
  const time = when.toLocaleString('ru-RU', { timeZone: 'Europe/Minsk', dateStyle: 'short', timeStyle: 'short' });
  return [
    'Новая заявка с сайта',
    '',
    `Имя: ${lead.name}`,
    `Контакт: ${lead.contact}`,
    lead.process ? `Процесс: ${lead.process}` : 'Процесс: не указан',
    '',
    `Страница: ${lead.page || '—'} (${lead.lang.toUpperCase()})`,
    `Время: ${time} (Минск)`,
  ].join('\n');
}

export async function sendToTelegram(text, env) {
  const res = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // Без parse_mode: текст посетителя уходит как есть, разметку в нём Telegram не трактует
    body: JSON.stringify({
      chat_id: env.TELEGRAM_CHAT_ID,
      ...(env.TELEGRAM_THREAD_ID ? { message_thread_id: Number(env.TELEGRAM_THREAD_ID) } : {}),
      text,
      disable_web_page_preview: true,
    }),
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) {
    const err = new Error(`Telegram ${res.status}: ${(await res.text()).slice(0, 300)}`);
    err.status = res.status;
    throw err;
  }
}
