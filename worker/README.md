# Хостинг на Cloudflare: сайт + ИИ для демо

Один воркер (`wrangler.jsonc` в корне) отдаёт собранный сайт из `dist` и отвечает
конструктору на `/api/audit`: добавляет инструкции (`src/prompt.js`) и спрашивает Gemini.
Ключ Gemini живёт только в Cloudflare, в браузер не попадает.

## Деплой

Cloudflare подключён к GitHub-репозиторию: пуш в `main` → сборка `npm run build` → `npx wrangler deploy`.
Ключ: панель Cloudflare → Workers & Pages → anadept → Settings → Variables and Secrets →
секрет `GEMINI_API_KEY` (бесплатный ключ: https://aistudio.google.com/apikey).

## Локально

`npm run cf:dev` — собирает сайт и поднимает воркер на http://localhost:8787 (сайт + API).
Без ключа API отвечает заглушкой. Для реального Gemini положите ключ в `.dev.vars`:
`GEMINI_API_KEY=...` (файл в .gitignore).

## Что можно менять

- `src/prompt.js` — инструкции для ИИ и формат ответа.
- `GEMINI_MODEL` в `wrangler.jsonc` — модель (по умолчанию `gemini-2.5-flash`).
- `LIMIT` / `WINDOW_MS` в `src/index.js` — сколько запросов с одного IP.
