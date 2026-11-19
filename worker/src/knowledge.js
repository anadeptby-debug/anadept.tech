// База знаний помощника: собирается из текстов сайта (src/i18n) + файлов из папки knowledge/.
// Тексты сайта подтягиваются сами: поменяли текст на сайте — помощник знает новый после деплоя.
import { dict } from '../../src/i18n/content.ts';
import { cases } from '../../src/i18n/cases.ts';
import { services } from '../../src/i18n/services.ts';
import company from '../../knowledge/company.md';

const strip = (s) => String(s).replace(/<[^>]+>/g, ' ').replace(/<!--[\s\S]*?-->/g, '').replace(/\s+/g, ' ').trim();
const mdClean = (s) => s.replace(/<!--[\s\S]*?-->/g, '').trim();

function build(lang) {
  const t = dict[lang];
  const p = (path) => (lang === 'en' ? '/en' : '') + path;
  const L = [];

  L.push('## Карта сайта (ссылки давай только на эти страницы)');
  L.push(`- ${lang === 'en' ? 'Home' : 'Главная'}: ${p('/')}`);
  for (const l of t.nav.links) L.push(`- ${l.label}: ${p(l.href)}`);
  for (const c of cases[lang]) L.push(`- ${lang === 'en' ? 'Case' : 'Кейс'} «${c.card.title}»: ${p(`/cases/${c.slug}/`)}`);
  services[lang].forEach((s, i) => L.push(`- ${lang === 'en' ? 'Service' : 'Услуга'} «${t.services.items[i].t}»: ${p(`/services/${s.slug}/`)}`));
  L.push(`- ${lang === 'en' ? 'Other language' : 'English version'}: ${lang === 'en' ? '/' : '/en/'}`);

  L.push('', `## ${t.services.title}`);
  t.services.items.forEach((s, i) => {
    const d = services[lang][i];
    L.push(`- ${s.t} (${p(`/services/${d.slug}/`)}): ${s.d}`);
    // Для экономии квоты ИИ — только название варианта и результат; подробности на странице услуги
    L.push(`  ${lang === 'en' ? 'Options' : 'Варианты'}: ${d.variants.map((v) => `${v.t} (${v.get})`).join('; ')}.`);
  });

  // Цены в базу знаний намеренно не попадают: помощник их не называет, стоимость обсуждается на консультации
  L.push('', `## ${lang === 'en' ? 'How we work' : 'Как мы работаем'}: ${t.how.title}`);
  for (const s of t.how.steps) L.push(`- ${s.t} (${s.time}): ${s.d} ${t.how.getLabel}: ${s.get}.`);
  L.push(lang === 'en' ? `- Also available: ${t.how.extra.map((e) => e.t).join(', ')}.` : `- Также: ${t.how.extra.map((e) => e.t).join(', ')}.`);

  L.push('', `## ${t.trust.eyebrow}`, strip(t.trust.lead));
  for (const i of [...t.trust.items, ...t.trust.moreItems]) L.push(`- ${i.t}: ${i.d}`);

  L.push('', `## ${lang === 'en' ? 'Real cases' : 'Реальные кейсы'}`);
  for (const c of cases[lang]) {
    L.push(`- «${c.card.title}» (${c.meta.join(', ')}): ${c.lead} ${c.figures.map((f) => `${f.v} — ${f.l}`).join('; ')}. ${p(`/cases/${c.slug}/`)}`);
  }
  L.push(lang === 'en'
    ? `- Typical scenarios (demonstrations based on average time norms, NOT completed client projects): ${t.solutions.items.map((s) => s.title).join('; ')}. ${p('/cases/')}`
    : `- Типовые сценарии (демонстрации по усреднённым нормам времени, а НЕ выполненные проекты клиентов): ${t.solutions.items.map((s) => s.title).join('; ')}. ${p('/cases/')}`);
  L.push(lang === 'en' ? '- Only the cases above are real completed projects. Do not invent other clients or projects.' : '- Реальные проекты — только кейсы выше. Не придумывай других клиентов и проектов.');

  L.push('', `## ${t.audit.eyebrow}`, `${strip(t.audit.lead)} ${p('/demo/')}`);

  L.push('', `## ${t.faq.title}`);
  for (const f of t.faq.items) L.push(`- ${f.q} — ${f.a}`);

  L.push('', mdClean(company));
  return L.join('\n');
}

export const KNOWLEDGE = { ru: build('ru'), en: build('en') };
