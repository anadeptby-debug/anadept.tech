// Реальные кейсы: короткая карточка (главная, /cases/) + полная страница /cases/<slug>/
import type { Lang } from './content';

type Fig = { v: string; l: string };
type Item = { b?: string; t: string };

export type CaseStudy = {
  slug: string;
  tag: string;                 // отрасль — над заголовком
  meta: string[];              // факты о клиенте, через точку
  title: string;               // полный заголовок
  lead: string;                // «Коротко»
  card: { title: string; text: string; figures: Fig[] };
  figures: Fig[];              // ключевые цифры на странице кейса
  task: { title: string; intro?: string; items: Item[] };
  analysis?: { title: string; intro: string; total: number; rows: { l: string; v: number }[]; outro: string };
  done?: { title: string; items: Item[] };
  idea?: {
    title: string; text: string;
    example: { title: string; op: string; sheet: string; total: string; parts: { n: string; q: string; sum: string; share: number }[]; result: string };
    closing: string;
  };
  flow: { title: string; items: Item[]; after?: string };
  guards?: { title: string; items: string[] };
  checks?: { title: string; items: string[] };
  tech?: { title: string; text: string };
  compare: { title: string; cols: [string, string, string]; rows: [string, string, string][] };
  results: { title: string; items: Item[] };
  fit: { title: string; text: string };
};

const ru: CaseStudy[] = [
  {
    slug: 'qr-workshop',
    tag: 'Производство · 1С',
    meta: ['Производитель межкомнатных дверей', '800+ сотрудников', '8 производственных участков'],
    title: 'Цифровой цех: учёт работы по QR-коду прямо в 1С',
    lead: 'Мастер каждый день тратил 3 часа, чтобы переписать выработку из тетради в 1С. Теперь рабочий сканирует бейдж и QR-код на листе заказа — и данные сразу в системе.',
    card: {
      title: 'Цифровой цех за один QR-скан',
      text: 'Выработку больше не переписывают из тетради в 1С: рабочий сканирует бейдж и QR-код на листе заказа, мастер подтверждает готовые данные одним кликом.',
      figures: [
        { v: '~790 ч', l: 'в год экономит каждый мастер' },
        { v: '0', l: 'часов на ручной ввод данных' },
        { v: 'Сразу', l: 'данные в 1С в момент работы, а не на следующий день' },
      ],
    },
    figures: [
      { v: '−3 ч', l: 'рутины у мастера каждый день' },
      { v: '~790 ч', l: 'в год экономит один мастер' },
      { v: 'Сразу', l: 'данные в 1С, а не на следующий день' },
      { v: '867', l: 'сотрудников подключены к учёту' },
    ],
    task: {
      title: 'Задача',
      intro: 'В 1С попадало только «бригада сделала 40 штук». Кто именно стоял у станка, знал один мастер — из своей тетради.',
      items: [
        { b: 'Пять месяцев в год на бумаги.', t: 'После смены мастер около 3 часов переносил тетрадь в 1С — почти 100 рабочих дней за год. С опечатками и задержкой на сутки.' },
        { b: 'Не видно, кто что сделал.', t: 'Бригады менялись каждый день, и вклад конкретного человека нигде не фиксировался.' },
        { b: 'Беспорядок в 1С.', t: 'Из 106 групп рабочих в справочнике реально работали меньше половины, часть была записана дважды.' },
      ],
    },
    done: {
      title: 'Что мы сделали',
      items: [
        { b: 'Навели порядок в 1С', t: 'Убрали дубли и договорились, откуда брать данные: сотрудники — из кадров, деньги — из бухгалтерии. Старые документы при этом не пострадали.' },
        { b: 'Приложение для сканера', t: 'Крупные кнопки, удобно в перчатках, сканирование одной кнопкой. Если пропал Wi-Fi, данные не теряются.' },
        { b: 'Мастер подтверждает, а не вводит', t: 'Данные со сканера сначала видит мастер и подтверждает одним кликом. Система не даст отметить больше, чем пришло с прошлой операции. Бухгалтерия работает как раньше.' },
      ],
    },
    flow: {
      title: 'Как это выглядит в цехе',
      items: [
        { t: 'Рабочий открывает приложение и отмечает, кто сегодня в смене.' },
        { t: 'Сканирует QR-код на листе заказа — система сама знает, какая операция следующая.' },
        { t: 'Подтверждает количество, при необходимости отмечает брак или простой.' },
        { t: 'Готово — данные уже в 1С.' },
      ],
    },
    compare: {
      title: 'Было → стало',
      cols: ['Что', 'Было', 'Стало'],
      rows: [
        ['Ручной ввод данных мастером', '~3 часа каждый день', 'Несколько минут на проверку'],
        ['Когда данные появляются в 1С', 'На следующий день', 'Сразу после работы'],
        ['Кто выполнил работу', 'Знает только мастер', 'Видно по каждому заказу и человеку'],
        ['Что делает рабочий', '—', 'Два скана'],
      ],
    },
    results: {
      title: 'Что ещё это дало',
      items: [
        { b: 'План и факт в одном отчёте:', t: 'мастер в любой момент видит, что сделано и что осталось.' },
        { b: 'Основа для честной зарплаты:', t: 'раз видно, кто что сделал, сдельную можно считать по факту — это следующий кейс.' },
        { b: 'Без остановки производства:', t: 'внедряли на работающей фабрике.' },
      ],
    },
    fit: { title: 'Кому подойдёт', text: 'Производствам со сдельной оплатой и бригадной работой: мебель, деревообработка, металлообработка, сборка. Если выработку у вас считают в тетради или Excel — это ваш случай.' },
  },
  {
    slug: 'piecework-payroll',
    tag: 'Производство · Зарплата',
    meta: ['Тот же клиент', '7 производственных бригад', '~1 000 заказов в месяц'],
    title: 'Зарплата без Excel: автоматический расчёт сдельной оплаты',
    lead: 'Закрытие сдельной зарплаты растягивалось почти на неделю: таблицы мастеров, сверка, ручная подгонка копеек. Теперь деньги делятся по реальной работе каждого, а расчёт занимает около часа.',
    card: {
      title: 'Зарплата, которая сходится до копейки',
      text: 'Сдельная оплата считается по реальной работе каждого, а не по коэффициенту «на глаз». Закрытие зарплаты, которое тянулось почти неделю, теперь занимает около часа.',
      figures: [
        { v: '−1 неделя', l: 'на закрытии зарплаты' },
        { v: '0', l: 'расхождений с бухгалтерией' },
        { v: '~1 час', l: 'на расчёт по всем бригадам' },
      ],
    },
    figures: [
      { v: '−1 неделя', l: 'на закрытии зарплаты' },
      { v: '~1 час', l: 'на расчёт по всем бригадам' },
      { v: '0', l: 'ручной подгонки копеек' },
      { v: '505', l: 'расчётов проверили, прежде чем менять' },
    ],
    task: {
      title: 'Задача',
      intro: 'Деньги начислялись на всю группу, а дальше их делили вручную:',
      items: [
        { b: 'День у мастера', t: 'на таблицу для бухгалтерии: кто где работал и с каким коэффициентом.' },
        { b: '3–5 дней сверки:', t: 'цифры мастера не сходились с 1С, начинались переписки и созвоны.' },
        { b: 'Ручная подгонка:', t: 'бухгалтер делил деньги и добавлял потерянные при округлении копейки.' },
      ],
    },
    analysis: {
      title: 'Что показала проверка',
      intro: 'Мы разобрали 505 расчётов зарплаты за год:',
      total: 505,
      rows: [
        { l: 'Сумма сошлась сама', v: 286 },
        { l: 'Копейки подгоняли вручную', v: 133 },
        { l: 'Суммы правили руками после расчёта', v: 86 },
        { l: 'Расчёт не сходился с начислением', v: 121 },
      ],
      outro: 'Коэффициенты мастер почти всегда ставил «на глаз». Человек получал деньги за то, в какой группе числился, а не за то, что сделал сам.',
    },
    idea: {
      title: 'Решение: деньги идут за работой',
      text: 'Бухгалтерия уже знала, сколько стоит каждая операция по каждому заказу. А сканер в цехе знает, кто её выполнил и сколько сделал. Мы соединили одно с другим.',
      example: {
        title: 'Пример',
        op: 'Прессование',
        sheet: 'Заказ №1234',
        total: '920 ₽',
        parts: [
          { n: 'Иванов', q: '35 шт.', sum: '322 ₽', share: 35 },
          { n: 'Петров', q: '20 шт.', sum: '184 ₽', share: 20 },
          { n: 'Сидоров', q: '45 шт.', sum: '414 ₽', share: 45 },
        ],
        result: 'Итого ровно 920 ₽ — как в бухгалтерии.',
      },
      closing: 'Без Excel, коэффициентов и ручного деления.',
    },
    flow: {
      title: 'Как это работает',
      items: [
        { b: 'Бухгалтерия закрывает месяц', t: 'как обычно.' },
        { b: 'Система делит деньги', t: 'по данным сканера: сколько сделал каждый, столько и получает.' },
        { b: 'Округляет без потерь:', t: 'итог совпадает с бухгалтерией до копейки.' },
        { b: 'Бухгалтер загружает готовую ведомость', t: '— система сама проверяет, что всё сходится.' },
      ],
    },
    compare: {
      title: 'Было → стало',
      cols: ['Что', 'Было', 'Стало'],
      rows: [
        ['Подготовка данных мастером', '~1 рабочий день в месяц', 'Не нужна'],
        ['Сверка с бухгалтерией', '3–5 дней', 'Система проверяет сама'],
        ['Ручная подгонка копеек', 'В 43% расчётов', 'Не нужна'],
        ['Основа для оплаты', 'Коэффициент «на глаз»', 'Сколько человек реально сделал'],
      ],
    },
    results: {
      title: 'Что ещё это дало',
      items: [
        { b: 'Понятно, откуда сумма:', t: 'на вопрос «почему мне столько?» есть ответ — за какие операции и заказы.' },
        { b: 'Заработок виден заранее:', t: 'рабочий видит примерную сумму ещё до конца месяца.' },
        { b: 'Без переделки 1С:', t: 'бухгалтерия работает в привычной программе.' },
      ],
    },
    fit: { title: 'Кому подойдёт', text: 'Компаниям со сдельной или бригадной оплатой: производство, стройка, склады. Если бухгалтер каждый месяц сводит таблицы мастеров и подгоняет копейки — это можно убрать.' },
  },
];

const en: CaseStudy[] = [
  {
    slug: 'qr-workshop',
    tag: 'Manufacturing · 1C',
    meta: ['Interior door manufacturer', '800+ employees', '8 production sites'],
    title: 'Digital shop floor: tracking work by QR code, straight into 1C',
    lead: 'The foreman spent 3 hours a day copying output from a notebook into 1C. Now a worker scans their badge and the QR code on the order sheet — and the data is in the system instantly.',
    card: {
      title: 'A digital shop floor in one QR scan',
      text: 'No more copying output from notebooks into 1C: workers scan their badge and the QR code on the order sheet, the foreman approves the ready data in one click.',
      figures: [
        { v: '~790 h', l: 'a year saved by every foreman' },
        { v: '0', l: 'hours of manual data entry' },
        { v: 'Instantly', l: 'data is in 1C as work is done, not the next day' },
      ],
    },
    figures: [
      { v: '−3 h', l: 'of routine per foreman per day' },
      { v: '~790 h', l: 'a year saved per foreman' },
      { v: 'Instantly', l: 'data in 1C, not the next day' },
      { v: '867', l: 'employees connected' },
    ],
    task: {
      title: 'The problem',
      intro: '1C only got “the crew made 40 pieces”. Who actually stood at the machine was known only to the foreman — from their notebook.',
      items: [
        { b: 'Five months a year on paperwork.', t: 'After each shift the foreman spent about 3 hours copying the notebook into 1C — almost 100 working days a year. With typos and a one-day delay.' },
        { b: 'No idea who did what.', t: 'Crews changed daily and individual contribution was never recorded.' },
        { b: 'A mess in 1C.', t: 'Of 106 worker groups, fewer than half were real, some recorded twice.' },
      ],
    },
    done: {
      title: 'What we did',
      items: [
        { b: 'Cleaned up 1C', t: 'Removed duplicates and agreed where data comes from: staff from HR, money from accounting. Old documents stayed intact.' },
        { b: 'A scanner app', t: 'Big buttons, works with gloves, one button to scan. If Wi-Fi drops, nothing is lost.' },
        { b: 'The foreman approves instead of typing', t: 'Scanner data goes to the foreman first, approved in one click. The system won’t accept more than came from the previous step. Accounting works as before.' },
      ],
    },
    flow: {
      title: 'What it looks like on the floor',
      items: [
        { t: 'The worker opens the app and marks who is on shift today.' },
        { t: 'Scans the QR code on the order sheet — the system knows which operation is next.' },
        { t: 'Confirms the quantity, marks defects or downtime if needed.' },
        { t: 'Done — the data is already in 1C.' },
      ],
    },
    compare: {
      title: 'Before → after',
      cols: ['What', 'Before', 'After'],
      rows: [
        ['Manual data entry by the foreman', '~3 hours every day', 'A few minutes to review'],
        ['When data appears in 1C', 'The next day', 'Right after the work'],
        ['Who did the work', 'Only the foreman knows', 'Visible per order and per person'],
        ['What the worker does', '—', 'Two scans'],
      ],
    },
    results: {
      title: 'What else it gave',
      items: [
        { b: 'Plan and actuals in one report:', t: 'the foreman always sees what is done and what is left.' },
        { b: 'A basis for fair pay:', t: 'once you see who did what, piece-rate pay can follow the facts — that’s the next case.' },
        { b: 'No production stop:', t: 'rolled out at a working factory.' },
      ],
    },
    fit: { title: 'Who it fits', text: 'Manufacturers with piece-rate pay and crew work: furniture, woodworking, metalworking, assembly. If output is counted in a notebook or Excel — this is for you.' },
  },
  {
    slug: 'piecework-payroll',
    tag: 'Manufacturing · Payroll',
    meta: ['Same client', '7 production crews', '~1,000 orders a month'],
    title: 'Payroll without Excel: automatic piece-rate pay',
    lead: 'Closing piece-rate payroll took almost a week: foremen’s tables, reconciliation, fixing kopecks by hand. Now money is split by what each person actually did, and the calculation takes about an hour.',
    card: {
      title: 'Payroll that adds up to the kopeck',
      text: 'Pay is based on what each person actually did, not on a coefficient picked by eye. Closing payroll used to take almost a week — now it takes about an hour.',
      figures: [
        { v: '−1 week', l: 'to close payroll' },
        { v: '0', l: 'mismatches with accounting' },
        { v: '~1 hour', l: 'to calculate all crews' },
      ],
    },
    figures: [
      { v: '−1 week', l: 'to close payroll' },
      { v: '~1 hour', l: 'to calculate all crews' },
      { v: '0', l: 'manual kopeck fixes' },
      { v: '505', l: 'calculations reviewed before changing anything' },
    ],
    task: {
      title: 'The problem',
      intro: 'Money was assigned to the whole group and then split by hand:',
      items: [
        { b: 'A day of the foreman’s time', t: 'on a table for accounting: who worked where, with what coefficient.' },
        { b: '3–5 days of reconciliation:', t: 'the foreman’s numbers didn’t match 1C, emails and calls followed.' },
        { b: 'Manual fixing:', t: 'the accountant split the money and added kopecks lost to rounding.' },
      ],
    },
    analysis: {
      title: 'What the review showed',
      intro: 'We went through 505 payroll calculations over a year:',
      total: 505,
      rows: [
        { l: 'Total matched on its own', v: 286 },
        { l: 'Kopecks fixed by hand', v: 133 },
        { l: 'Amounts edited by hand after calculation', v: 86 },
        { l: 'Calculation did not match the accrual', v: 121 },
      ],
      outro: 'Coefficients were almost always set by eye. People were paid for the group they were in, not for what they did.',
    },
    idea: {
      title: 'The solution: money follows the work',
      text: 'Accounting already knew what each operation on each order is worth. The shop-floor scanner knows who did it and how much. We joined the two.',
      example: {
        title: 'Example',
        op: 'Pressing',
        sheet: 'Order #1234',
        total: '920 ₽',
        parts: [
          { n: 'Ivanov', q: '35 pcs', sum: '322 ₽', share: 35 },
          { n: 'Petrov', q: '20 pcs', sum: '184 ₽', share: 20 },
          { n: 'Sidorov', q: '45 pcs', sum: '414 ₽', share: 45 },
        ],
        result: 'Exactly 920 ₽ in total — same as in accounting.',
      },
      closing: 'No Excel, no coefficients, no manual splitting.',
    },
    flow: {
      title: 'How it works',
      items: [
        { b: 'Accounting closes the month', t: 'as usual.' },
        { b: 'The system splits the money', t: 'using scanner data: you get paid for what you did.' },
        { b: 'It rounds without losses:', t: 'the total matches accounting to the kopeck.' },
        { b: 'The accountant loads a ready pay sheet', t: '— the system checks that everything adds up.' },
      ],
    },
    compare: {
      title: 'Before → after',
      cols: ['What', 'Before', 'After'],
      rows: [
        ['Data prep by the foreman', '~1 working day a month', 'Not needed'],
        ['Reconciliation with accounting', '3–5 days', 'The system checks by itself'],
        ['Manual kopeck fixes', 'In 43% of calculations', 'Not needed'],
        ['Basis for pay', 'Coefficient picked by eye', 'What the person actually did'],
      ],
    },
    results: {
      title: 'What else it gave',
      items: [
        { b: 'Clear where the amount comes from:', t: '“why was I paid this?” has an answer — which operations and orders.' },
        { b: 'Earnings visible early:', t: 'workers see an estimate before the month ends.' },
        { b: 'No changes to 1C:', t: 'accounting keeps working in the familiar system.' },
      ],
    },
    fit: { title: 'Who it fits', text: 'Companies with piece-rate or crew pay: manufacturing, construction, warehouses. If your accountant compiles foremen’s tables and fixes kopecks every month — that can go away.' },
  },
];

export const caseLabels = {
  ru: {
    eyebrow: 'Кейсы',
    pageTitle: 'Проекты и сценарии',
    pageLead: 'Реальные проекты с цифрами до и после — и типовые сценарии, которые часто встречаются у наших клиентов.',
    realTitle: 'Реальные проекты',
    case: 'Кейс',
    read: 'Читать кейс полностью',
    expand: 'Коротко о результатах',
    collapse: 'Свернуть',
    allCases: 'Все кейсы',
    next: 'Следующий кейс',
    note: 'Цифры результатов — целевые показатели, рассчитанные по данным аудита. Клиент назван обезличенно.',
    cta: { title: 'Покажите нам свой учёт — за неделю найдём, где теряются часы и деньги.', btn: 'Обсудить проект' },
  },
  en: {
    eyebrow: 'Cases',
    pageTitle: 'Projects and scenarios',
    pageLead: 'Real projects with before-and-after numbers — and typical scenarios we often see at our clients.',
    realTitle: 'Real projects',
    case: 'Case',
    read: 'Read the full case',
    expand: 'Results at a glance',
    collapse: 'Collapse',
    allCases: 'All cases',
    next: 'Next case',
    note: 'Result figures are targets calculated from audit data. The client is anonymised.',
    cta: { title: 'Show us how you track work — in a week we’ll find where hours and money leak.', btn: 'Discuss a project' },
  },
};

export const cases: Record<Lang, CaseStudy[]> = { ru, en };
