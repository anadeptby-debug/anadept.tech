# ИИ для демо-конструктора (Cloudflare Worker + Gemini)

Конструктор на странице «Услуги» отправляет ответы клиента сюда, воркер добавляет инструкции
(`src/prompt.js`) и спрашивает Gemini. Ключ Gemini живёт только в воркере.

## Запуск в первый раз

1. Получить бесплатный ключ Gemini: https://aistudio.google.com/apikey
2. Завести бесплатный аккаунт Cloudflare: https://dash.cloudflare.com/sign-up
3. В этой папке:
   ```bash
   npm install
   npx wrangler login
   npx wrangler secret put GEMINI_API_KEY   # вставить ключ из шага 1
   npm run deploy
   ```
   Wrangler покажет адрес вида `https://anadept-audit.<аккаунт>.workers.dev`.
4. В `wrangler.toml` → `ALLOWED_ORIGINS` перечислить адреса сайта через запятую
   (например `https://anadept.tech,https://<user>.github.io`) и снова `npm run deploy`.
5. В GitHub: Settings → Secrets and variables → Actions → Variables → `AUDIT_API` = адрес воркера.
   Следующий деплой сайта подхватит его.

## Локально

`npm run dev` — воркер на http://localhost:8787. Без ключа (`.dev.vars` с `GEMINI_API_KEY=...`)
отвечает заглушкой, чтобы проверять интерфейс.

## Что можно менять

- `src/prompt.js` — инструкции для ИИ и формат ответа.
- `GEMINI_MODEL` в `wrangler.toml` — модель (по умолчанию `gemini-2.5-flash`).
- `LIMIT` / `WINDOW_MS` в `src/index.js` — сколько запросов с одного IP.
