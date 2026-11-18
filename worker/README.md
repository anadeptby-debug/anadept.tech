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
- `LIMIT` / `WINDOW_MS` в `src/index.js` — сколько запросов с одного IP.
