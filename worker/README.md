# Хостинг на Cloudflare: сайт + ИИ для демо

Один воркер (`wrangler.jsonc` в корне) отдаёт собранный сайт из `dist` и отвечает
конструктору демо на `/api/audit`: добавляет инструкции (`src/prompt.js`) и спрашивает ИИ.
Ключи живут только в Cloudflare, в браузер не попадают.

## Какой ИИ отвечает

1. **Gemini** — если задан секрет `GEMINI_API_KEY`. Лучше всего пишет по-русски.
2. **Cloudflare Workers AI** — если Gemini не задан или не ответил (например, Google не обслуживает регион).
   Ключ не нужен: привязка `AI` в `wrangler.jsonc`, бесплатно до ~80–100 разборов в день.
3. Если не ответил никто — посетитель видит честную ошибку. Заглушка показывается только локально.

В ответе API есть поле `via` (`gemini`, `workers-ai`, `mock`) — видно, кто ответил.

## Заявки с сайта → Telegram

Форма «Обсудим вашу задачу?» (`src/components/Contact.astro`) отправляет заявку на `/api/contact`,
воркер (`src/contact.js`) проверяет поля и пересылает сообщение в Telegram. «Спасибо» посетитель видит
только после того, как Telegram принял сообщение; при ошибке — честное сообщение и прямые контакты.

Настройка (один раз):

1. В Telegram откройте @BotFather → `/newbot` → получите токен вида `123456:ABC…`.
2. Решите, куда приходят заявки:
   - себе в личку — напишите своему боту любое сообщение;
   - в рабочую группу — добавьте бота в группу и напишите там что-нибудь.
3. Узнайте `chat_id`: откройте в браузере `https://api.telegram.org/bot<ТОКЕН>/getUpdates`
   и найдите `"chat":{"id": …}` (у групп id отрицательный, например `-1001234567890`).
4. Панель Cloudflare → Workers & Pages → anadept → Settings → Variables and Secrets → добавьте два секрета:
   `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`. Передеплой не нужен — секреты подхватятся сразу.

Пока секреты не заданы, на сайте форма покажет ошибку с прямыми контактами (заявки не теряются молча),
а локально (`npm run cf:dev`) заявка печатается в консоль wrangler. Защита от спама: скрытое поле-ловушка
и не больше 5 заявок с одного IP за 10 минут.

Важно: `/api/*` работает только на Cloudflare. На копии сайта в GitHub Pages воркера нет — там форма
покажет ошибку с прямыми контактами.

## Деплой

Cloudflare подключён к GitHub-репозиторию: пуш в `main` → сборка `npm run build` → `npx wrangler deploy`.
Workers AI подключается сам при деплое. Ключ Gemini (необязательно):
панель Cloudflare → Workers & Pages → anadept → Settings → Variables and Secrets →
секрет `GEMINI_API_KEY` (ключ: https://aistudio.google.com/apikey).

## Локально

- `npm run cf:dev` — сайт + API на http://localhost:8787 без входа в Cloudflare. ИИ не подключён, отвечает заглушка:
  удобно проверять интерфейс.
- `npm run cf:dev:ai` — то же, но с настоящим Workers AI. Нужен один раз `npx wrangler login`.
  Для Gemini положите ключ в `.dev.vars`: `GEMINI_API_KEY=...` (файл в .gitignore).
  Из РБ/РФ Gemini локально может отвечать «User location is not supported» — тогда ответит Workers AI.

## Что можно менять

- `src/prompt.js` — инструкции для ИИ и формат ответа.
- `GEMINI_MODEL` и `CF_AI_MODEL` в `wrangler.jsonc` — модели.
- `LIMITS` / `WINDOW_MS` в `src/index.js` — сколько запросов с одного IP.
- `src/contact.js` — текст сообщения о заявке в Telegram.
