// Подробные страницы услуг: /services/<slug>/. Порядок совпадает с t.services.items в content.ts —
// карточка №i на сайте ведёт на страницу №i отсюда. Цен не указываем: стоимость — после консультации.
import type { Lang } from './content';

type Variant = { t: string; d: string; get: string; group?: string }; // group — раздел на странице (по отделам)
export type ServicePage = {
  slug: string;
  lead: string;
  pains: string[];
  variants: Variant[];
  cases: string[];            // slug'и реальных кейсов из cases.ts
  faq: { q: string; a: string }[];
};

const ru: ServicePage[] = [
  {
    slug: 'process-automation',
    lead: 'Берём процессы, которые держатся на ручном труде, — документы, оплаты, заказы, склад, производство, кадры — и делаем так, чтобы рутину выполняла система, а люди занимались тем, что требует решений. Начинаем с замера: сколько процесс стоит сейчас, — и автоматизируем то, что окупится.',
    pains: [
      'Сотрудники вручную переносят данные между почтой, Excel и 1С',
      'Счета, накладные и акты вносятся руками и сверяются вручную',
      'Согласования идут по почте и в мессенджерах, документы ждут подписи',
      'Оплаты разносятся с задержкой, а просрочки замечают слишком поздно',
      'Заказы клиентов и поставщикам собираются вручную, позиции теряются',
      'Ошибки ручного ввода всплывают поздно — в отчётах или у клиента',
      'Процесс держится на одном человеке и останавливается, когда он в отпуске',
      'Новые сотрудники неделями разбираются, как всё устроено',
    ],
    variants: [
      { group: 'Документы', t: 'Распознавание документов в 1С', d: 'Счета, накладные, ТТН и акты из почты распознаются, сверяются с договором и попадают в 1С. Сотрудник проверяет только расхождения.', get: 'документ в 1С за минуту, сверенный с договором' },
      { group: 'Документы', t: 'Сверка с контрагентами', d: 'Акты сверки, счета и накладные от партнёров сравниваются с данными 1С — на экране только расхождения.', get: 'сверка за минуты, а не за дни' },
      { group: 'Документы', t: 'Договоры и документы по шаблонам', d: 'Договоры, допсоглашения, счета и коммерческие предложения собираются из данных CRM и 1С с проверкой реквизитов.', get: 'документ готов за минуту, без опечаток' },
      { group: 'Документы', t: 'Электронный архив с умным поиском', d: 'Сканы и файлы сами раскладываются по контрагентам и типам и находятся по смыслу: «договор с поставщиком упаковки за 2024 год».', get: 'нужный документ за секунды' },

      { group: 'Финансы и бухгалтерия', t: 'Разнесение банковских выписок', d: 'Платежи из выписки сами привязываются к счетам и контрагентам в 1С, непонятные уходят на проверку.', get: 'оплаты разнесены в день поступления' },
      { group: 'Финансы и бухгалтерия', t: 'Контроль дебиторки и напоминания', d: 'Система видит просрочки и сама отправляет клиентам вежливые напоминания с копией счёта, менеджеру — сводку.', get: 'меньше просроченных платежей' },
      { group: 'Финансы и бухгалтерия', t: 'Согласование заявок на оплату', d: 'Заявки на оплату идут по цепочке согласования с лимитами и напоминаниями, одобренные сразу попадают в реестр платежей.', get: 'всегда понятно, у кого заявка и сколько она ждёт' },
      { group: 'Финансы и бухгалтерия', t: 'Авансовые отчёты по фото чеков', d: 'Сотрудник фотографирует чек — данные распознаются и попадают в авансовый отчёт.', get: 'отчёт за минуту вместо пачки чеков' },

      { group: 'Склад, закупки и логистика', t: 'Обработка заказов клиентов', d: 'Заказ из почты, мессенджера или Excel распознаётся, проверяется по остаткам и ценам и создаётся в 1С.', get: 'заказ в системе без ручного ввода' },
      { group: 'Склад, закупки и логистика', t: 'Заказы поставщикам по остаткам', d: 'Система считает потребность по остаткам и нормам и готовит черновики заказов. Менеджер проверяет только позиции под вопросом.', get: 'заказы за минуты, без пропущенных позиций' },
      { group: 'Склад, закупки и логистика', t: 'Приёмка и инвентаризация со сканером', d: 'Поступления сверяются с заказом прямо при приёмке, инвентаризация идёт по штрихкодам и QR-кодам.', get: 'расхождения видны сразу' },
      { group: 'Склад, закупки и логистика', t: 'Отслеживание доставок', d: 'Статусы от перевозчиков собираются автоматически, клиент получает уведомления о движении заказа.', get: 'меньше звонков «где мой заказ»' },

      { group: 'Производство', t: 'Цифровой учёт производства', d: 'Учёт выработки по QR-коду и сканерам: видно, кто, какую операцию и в каком объёме выполнил. Данные из цеха сразу в 1С.', get: 'факт рядом с планом в момент работы' },
      { group: 'Производство', t: 'Табель и сдельная зарплата', d: 'Время и выработка собираются автоматически, сдельная считается по фактической работе каждого — без промежуточных таблиц.', get: 'зарплата сходится с бухгалтерией до копейки' },
      { group: 'Производство', t: 'Проверка спецификаций и техдокументации', d: 'Спецификации сверяются с чертежами и нормами до запуска в цех — система отмечает несоответствия.', get: 'ошибки находятся до производства' },

      { group: 'Кадры и офис', t: 'Оформление новых сотрудников', d: 'Заявка на нового сотрудника запускает чек-лист: документы, доступы, рабочее место — с ответственными и сроками.', get: 'новичок готов к работе в первый день' },
      { group: 'Кадры и офис', t: 'Внутренние заявки', d: 'Закупка, ремонт, пропуска, командировки — заявки идут по понятному маршруту с напоминаниями и историей.', get: 'ни одна заявка не теряется в переписке' },
      { group: 'Кадры и офис', t: 'Графики смен и отпусков', d: 'Графики составляются с учётом отпусков, норм и пожеланий, сотрудники получают уведомления об изменениях.', get: 'график за минуты, без накладок' },
    ],
    cases: ['qr-workshop', 'piecework-payroll'],
    faq: [
      { q: 'С какого процесса лучше начать?', a: 'С того, где больше всего ручной работы и понятен результат: обычно это документы, оплаты или заказы. На бесплатной консультации поможем выбрать и честно скажем, окупится ли автоматизация.' },
      { q: 'Можно автоматизировать сразу несколько процессов?', a: 'Можно, но надёжнее по очереди: начинаем с того, что быстрее окупится, и подтверждаем результат замером. Следующие процессы идут быстрее — основа уже готова.' },
      { q: 'Придётся менять 1С или CRM?', a: 'Нет. Мы встраиваемся в ваши текущие системы и не ломаем привычную работу — в наших проектах бухгалтерия продолжала работать как раньше.' },
    ],
  },
  {
    slug: 'ai-solutions',
    lead: 'Внедряем искусственный интеллект туда, где он даёт измеримую пользу: в работу с документами, звонками и знаниями компании. Без «ИИ ради ИИ» — под конкретную задачу и с замером результата.',
    pains: [
      'Много однотипной работы с текстами: письма, документы, ответы клиентам',
      'Знания компании разбросаны по папкам и головам сотрудников',
      'Звонки и переписки никто не успевает разбирать',
      'Хочется использовать ИИ, но данные нельзя отправлять за границу',
    ],
    variants: [
      { t: 'Анализ звонков', d: 'Каждый звонок расшифровывается и проверяется по скрипту, видно причины отказов, а итоги разговора сами попадают в CRM.', get: 'проверены все звонки, а не выборочные' },
      { t: 'ИИ-ассистент по документам компании', d: 'Отвечает сотрудникам на вопросы по регламентам, инструкциям, договорам и работе в 1С — со ссылкой на источник.', get: 'новички быстрее входят в работу, опытные меньше отвлекаются' },
      { t: 'Разбор входящих писем и обращений', d: 'ИИ определяет тему и срочность письма, готовит черновик ответа и передаёт его нужному сотруднику.', get: 'ни одно обращение не теряется' },
      { t: 'ИИ на вашем сервере', d: 'Для чувствительных данных — модели, которые работают внутри компании, без передачи данных наружу.', get: 'ИИ без компромиссов по защите данных' },
      { t: 'Обучение команды', d: 'Практический воркшоп на задачах вашей компании: как пользоваться ИИ безопасно и с пользой каждый день.', get: 'команда уверенно применяет ИИ в работе' },
    ],
    cases: [],
    faq: [
      { q: 'Насколько можно доверять ответам ИИ?', a: 'Система не угадывает: если данных не хватает или что-то не сходится, она передаёт вопрос сотруднику. Сомнительные случаи всегда проверяет человек.' },
      { q: 'Какие модели вы используете?', a: 'Подбираем под задачу и требования к данным: от моделей по API до локальных на вашем сервере. Модель можно заменить, если изменятся требования.' },
    ],
  },
  {
    slug: 'integrations',
    lead: 'Соединяем 1С, CRM, сайт, мессенджеры, телефонию и маркетплейсы, чтобы данные передавались сами. Одни и те же цифры для всех отделов — без ручного переноса и дублей.',
    pains: [
      'Одни и те же данные вносят в несколько систем',
      'Цифры в CRM и 1С расходятся, и непонятно, каким верить',
      'Заявки с сайта и из мессенджеров приходят в разные места',
      'Остатки и цены на сайте или маркетплейсе обновляются с опозданием',
    ],
    variants: [
      { t: '1С ↔ CRM', d: 'Клиенты, сделки, счета и оплаты синхронизируются автоматически: менеджер видит в CRM всё, что знает бухгалтерия.', get: 'одна база клиентов для продаж и учёта' },
      { t: 'Сайт, мессенджеры и телефония → CRM', d: 'Заявки и звонки из всех каналов попадают в CRM с источником и историей общения.', get: 'все обращения в одном окне' },
      { t: '1С ↔ сайт и маркетплейсы', d: 'Остатки, цены и заказы передаются автоматически в обе стороны.', get: 'актуальные остатки без ручных выгрузок' },
      { t: 'Связка нескольких баз 1С', d: 'Производство, бухгалтерия и зарплата обмениваются данными по понятным правилам, у каждой цифры один источник.', get: 'нет расхождений между базами' },
    ],
    cases: ['qr-workshop'],
    faq: [
      { q: 'Работаете с нашей CRM?', a: 'Подключаемся к системам через их API и стандартные механизмы обмена — например, Битрикс24, amoCRM, 1С. Конкретную связку разберём на консультации.' },
      { q: 'Что будет, если обмен даст сбой?', a: 'Обмен работает с проверками и журналом: если что-то не прошло, система сообщит ответственному, а данные не потеряются. Поддержку можно взять у нас по договору.' },
    ],
  },
  {
    slug: 'chatbots',
    lead: 'Создаём ботов и ИИ-помощников для клиентов и сотрудников: они отвечают на вопросы, принимают заявки и находят информацию — круглосуточно и в стиле вашей компании. Пример уже перед вами: помощник внизу этой страницы.',
    pains: [
      'Менеджеры тратят время на одни и те же вопросы',
      'Клиенты пишут вечером и в выходные, а ответ получают утром',
      'Сотрудники отвлекают друг друга вопросами «где найти» и «как сделать»',
    ],
    variants: [
      { t: 'ИИ-помощник для сайта', d: 'Отвечает посетителям по материалам компании, помогает с выбором и ведёт к заявке — как помощник на нашем сайте.', get: 'ответы и заявки 24/7' },
      { t: 'Бот в Telegram и Viber', d: 'Принимает заказы и заявки, отвечает про статус, наличие и доставку, сложные вопросы передаёт менеджеру вместе с историей.', get: 'менеджер получает только то, где нужен человек' },
      { t: 'Внутренний бот для сотрудников', d: 'Отвечает на вопросы по регламентам, графикам и инструкциям, помогает оформить внутренние заявки.', get: 'меньше отвлечений, быстрее ответы' },
      { t: 'Голосовой ассистент', d: 'Принимает входящие звонки: запись, статус заказа, частые вопросы. Сложные звонки переводит на сотрудника.', get: 'ни один звонок не остаётся без ответа' },
    ],
    cases: [],
    faq: [
      { q: 'Клиенты хотят говорить с человеком. Как быть?', a: 'Бот берёт типовые вопросы, а всё необычное сразу передаёт менеджеру вместе с историей переписки. Клиенту не нужно повторять.' },
      { q: 'На чём основаны ответы бота?', a: 'На ваших материалах: сайт, каталог, регламенты, база знаний. Бот не придумывает условия — если точного ответа нет, он передаёт вопрос сотруднику.' },
    ],
  },
  {
    slug: 'sales-automation',
    lead: 'Помогаем не терять клиентов: заявки из всех каналов собираются в одном месте, быстро распределяются и получают ответ, а руководитель видит воронку без ручных отчётов.',
    pains: [
      'Заявки приходят в почту, мессенджеры и на сайт — часть из них теряется',
      'Ответ клиенту ждёт свободного менеджера',
      'Непонятно, на каком этапе и почему срываются сделки',
      'Отчёт по продажам собирают вручную раз в неделю',
    ],
    variants: [
      { t: 'Сбор и распределение заявок', d: 'Заявки из всех каналов попадают в CRM, сортируются по типу и сразу назначаются ответственному.', get: 'ни одна заявка не теряется' },
      { t: 'Черновики ответов клиентам', d: 'ИИ готовит ответ на типовой запрос с учётом истории клиента — менеджер проверяет и отправляет.', get: 'быстрее реакция на обращения' },
      { t: 'Анализ звонков и переписок', d: 'Проверка разговоров по скрипту, причины отказов и подсказки, где теряются сделки.', get: 'понятно, что улучшать в продажах' },
      { t: 'Напоминания и контроль воронки', d: 'Система напоминает о следующих шагах, зависших сделках и неоплаченных счетах.', get: 'сделки не зависают' },
    ],
    cases: [],
    faq: [
      { q: 'Подойдёт ли небольшой команде продаж?', a: 'Да: чем меньше команда, тем ценнее каждая заявка. Часто достаточно начать со сбора заявок в CRM и черновиков ответов.' },
      { q: 'У нас нет CRM. Это проблема?', a: 'Нет. Поможем выбрать и настроить CRM под ваши процессы или начнём с того, что уже есть: почты, таблиц и мессенджеров.' },
    ],
  },
  {
    slug: 'analytics',
    lead: 'Собираем данные из 1С, CRM и таблиц в понятные отчёты, которые обновляются сами. Руководитель видит главное каждый день, а не ждёт отчёта в конце месяца.',
    pains: [
      'Отчёты собирают вручную из нескольких систем',
      'К моменту, когда отчёт готов, данные уже устарели',
      'Цифры в разных отчётах не совпадают',
    ],
    variants: [
      { t: 'Утренний отчёт в Telegram', d: 'Продажи, остатки, дебиторка и отклонения из 1С и CRM — каждое утро одним сообщением. ИИ отмечает, на что обратить внимание.', get: 'главное о бизнесе за минуту' },
      { t: 'Дашборды для руководителя', d: 'Наглядные панели с ключевыми показателями, которые обновляются автоматически.', get: 'решения на актуальных данных' },
      { t: 'Регулярные отчёты без ручной сборки', d: 'Отчёты для собственника, банка или отделов формируются по расписанию.', get: 'часы сотрудников уходят на анализ, а не на сборку' },
      { t: 'Контроль отклонений', d: 'Система следит за показателями и сообщает, если что-то пошло не так: просела выручка, выросли остатки, задерживается оплата.', get: 'проблемы видны сразу' },
    ],
    cases: ['qr-workshop'],
    faq: [
      { q: 'Нужен ли нам отдельный аналитик?', a: 'Нет. Отчёты обновляются сами, а если понадобится новый показатель — добавим его в рамках поддержки.' },
      { q: 'Из каких систем можно собрать данные?', a: '1С, CRM, Excel и Google Таблицы, банковские выписки, маркетплейсы — всё, откуда данные можно получить выгрузкой или через API.' },
    ],
  },
];

const en: ServicePage[] = [
  {
    slug: 'process-automation',
    lead: 'We take processes that rely on manual work — documents, payments, orders, warehouse, production, HR — and make the system do the routine, so people focus on decisions. We start by measuring what a process costs today — and automate what will pay off.',
    pains: [
      'Staff move data between email, Excel and 1C by hand',
      'Invoices, delivery notes and acts are typed in and checked manually',
      'Approvals go through email and messengers; documents wait for sign-off',
      'Payments are matched late and overdue invoices are noticed too late',
      'Customer and supplier orders are assembled by hand and items get missed',
      'Manual entry errors surface late — in reports or with the customer',
      'A process depends on one person and stops when they are on leave',
      'New staff spend weeks figuring out how things work',
    ],
    variants: [
      { group: 'Documents', t: 'Document recognition into 1C', d: 'Invoices, delivery notes and acts from email are recognised, checked against the contract and posted to 1C. Staff review only mismatches.', get: 'a document in 1C in a minute, checked against the contract' },
      { group: 'Documents', t: 'Reconciliation with counterparties', d: 'Reconciliation statements, invoices and delivery notes from partners are compared with 1C — only mismatches are shown.', get: 'reconciliation in minutes, not days' },
      { group: 'Documents', t: 'Contracts and documents from templates', d: 'Contracts, amendments, invoices and proposals are assembled from CRM and 1C data with details checked.', get: 'a document in a minute, no typos' },
      { group: 'Documents', t: 'Electronic archive with smart search', d: 'Scans and files are sorted by counterparty and type and found by meaning: “packaging supplier contract for 2024”.', get: 'the right document in seconds' },

      { group: 'Finance & accounting', t: 'Bank statement matching', d: 'Payments from the statement are matched to invoices and counterparties in 1C automatically; unclear ones go to review.', get: 'payments matched the day they arrive' },
      { group: 'Finance & accounting', t: 'Receivables control and reminders', d: 'The system spots overdue invoices and sends customers polite reminders with a copy of the invoice, and a summary to the manager.', get: 'fewer overdue payments' },
      { group: 'Finance & accounting', t: 'Payment request approvals', d: 'Payment requests move through an approval chain with limits and reminders; approved ones go straight to the payment register.', get: 'always clear who has the request and for how long' },
      { group: 'Finance & accounting', t: 'Expense reports from receipt photos', d: 'An employee photographs a receipt — the data is recognised and added to the expense report.', get: 'a report in a minute instead of a pile of receipts' },

      { group: 'Warehouse, purchasing & logistics', t: 'Customer order processing', d: 'An order from email, a messenger or Excel is recognised, checked against stock and prices and created in 1C.', get: 'orders in the system without manual entry' },
      { group: 'Warehouse, purchasing & logistics', t: 'Supplier orders from stock levels', d: 'The system calculates demand from stock and norms and drafts orders. The manager reviews only flagged items.', get: 'orders in minutes, nothing missed' },
      { group: 'Warehouse, purchasing & logistics', t: 'Receiving and stocktaking with scanners', d: 'Deliveries are checked against the order on receipt; stocktaking runs on barcodes and QR codes.', get: 'mismatches visible immediately' },
      { group: 'Warehouse, purchasing & logistics', t: 'Delivery tracking', d: 'Carrier statuses are collected automatically and customers get notifications as their order moves.', get: 'fewer “where is my order” calls' },

      { group: 'Production', t: 'Digital production tracking', d: 'Output tracked by QR codes and scanners: who did which operation and how much. Shop-floor data goes straight to 1C.', get: 'actuals next to the plan as work happens' },
      { group: 'Production', t: 'Timesheets and piece-rate pay', d: 'Time and output are collected automatically and piece-rate pay is calculated from each person’s actual work — no intermediate tables.', get: 'payroll matches accounting to the kopeck' },
      { group: 'Production', t: 'Specification and technical document checks', d: 'Specifications are checked against drawings and norms before work starts — the system flags inconsistencies.', get: 'errors caught before production' },

      { group: 'HR & office', t: 'Onboarding new employees', d: 'A new-hire request launches a checklist: documents, access, workplace — with owners and deadlines.', get: 'new hires ready to work on day one' },
      { group: 'HR & office', t: 'Internal requests', d: 'Purchases, repairs, passes, business trips — requests follow a clear route with reminders and history.', get: 'no request gets lost in chats' },
      { group: 'HR & office', t: 'Shift and vacation schedules', d: 'Schedules are built around vacations, norms and preferences; staff are notified of changes.', get: 'a schedule in minutes, no clashes' },
    ],
    cases: ['qr-workshop', 'piecework-payroll'],
    faq: [
      { q: 'Which process should we start with?', a: 'The one with the most manual work and a clear result — usually documents, payments or orders. On a free consultation we will help you choose and tell you honestly whether it will pay off.' },
      { q: 'Can we automate several processes at once?', a: 'Yes, but one at a time is more reliable: we start with what pays off fastest and confirm the result with a measurement. Each next process goes faster — the foundation is already there.' },
      { q: 'Will we have to replace 1C or our CRM?', a: 'No. We build into your current systems without disrupting how people work — in our projects accounting kept working as before.' },
    ],
  },
  {
    slug: 'ai-solutions',
    lead: 'We bring AI where it delivers measurable value: documents, calls and company knowledge. No “AI for the sake of AI” — a specific task with a measured result.',
    pains: [
      'Lots of repetitive text work: emails, documents, customer replies',
      'Company knowledge is scattered across folders and people’s heads',
      'Nobody has time to review calls and conversations',
      'You want AI, but data cannot leave the country',
    ],
    variants: [
      { t: 'Call analysis', d: 'Every call is transcribed and checked against the script, reasons for lost deals are visible, and the summary goes into the CRM automatically.', get: 'every call reviewed, not a sample' },
      { t: 'AI assistant for company documents', d: 'Answers staff questions about policies, instructions, contracts and 1C — with a link to the source.', get: 'new hires ramp up faster, experienced staff are interrupted less' },
      { t: 'Inbound email and request triage', d: 'AI detects the topic and urgency of each email, drafts a reply and routes it to the right person.', get: 'no request gets lost' },
      { t: 'AI on your own server', d: 'For sensitive data — models running inside your company, with no data leaving it.', get: 'AI without compromising data protection' },
      { t: 'Team training', d: 'A hands-on workshop on your company’s tasks: how to use AI safely and productively every day.', get: 'a team that uses AI with confidence' },
    ],
    cases: [],
    faq: [
      { q: 'How far can we trust AI answers?', a: 'The system doesn’t guess: if data is missing or something doesn’t add up, it hands the question to a person. Doubtful cases are always reviewed by a human.' },
      { q: 'Which models do you use?', a: 'We choose for the task and your data requirements: from API models to local ones on your server. The model can be swapped if requirements change.' },
    ],
  },
  {
    slug: 'integrations',
    lead: 'We connect 1C, CRM, website, messengers, telephony and marketplaces so data flows on its own. The same numbers for every department — no manual copying or duplicates.',
    pains: [
      'The same data is entered into several systems',
      'Numbers in the CRM and 1C differ, and it’s unclear which to trust',
      'Requests from the website and messengers land in different places',
      'Stock and prices on the website or marketplace update late',
    ],
    variants: [
      { t: '1C ↔ CRM', d: 'Customers, deals, invoices and payments sync automatically: sales see in the CRM everything accounting knows.', get: 'one customer base for sales and accounting' },
      { t: 'Website, messengers and telephony → CRM', d: 'Requests and calls from every channel reach the CRM with their source and history.', get: 'all requests in one window' },
      { t: '1C ↔ website and marketplaces', d: 'Stock, prices and orders sync automatically in both directions.', get: 'up-to-date stock without manual exports' },
      { t: 'Linking several 1C databases', d: 'Production, accounting and payroll exchange data by clear rules; every number has a single source.', get: 'no mismatches between databases' },
    ],
    cases: ['qr-workshop'],
    faq: [
      { q: 'Do you work with our CRM?', a: 'We connect through each system’s API and standard exchange tools — for example Bitrix24, amoCRM, 1C. We will go through your specific setup on a consultation.' },
      { q: 'What if the exchange fails?', a: 'Exchanges run with checks and a log: if something doesn’t go through, the system alerts the person in charge and no data is lost. Support can be provided under contract.' },
    ],
  },
  {
    slug: 'chatbots',
    lead: 'We build bots and AI assistants for customers and staff: they answer questions, take requests and find information — around the clock and in your company’s voice. You are already looking at an example: the assistant at the bottom of this page.',
    pains: [
      'Managers spend time on the same questions over and over',
      'Customers write in the evening and at weekends and get answers in the morning',
      'Staff interrupt each other with “where do I find” and “how do I” questions',
    ],
    variants: [
      { t: 'AI assistant for your website', d: 'Answers visitors from your company materials, helps them choose and leads to a request — like the assistant on our site.', get: 'answers and requests 24/7' },
      { t: 'Telegram and Viber bot', d: 'Takes orders and requests, answers about status, stock and delivery, and passes complex questions to a manager with the history.', get: 'managers get only what needs a human' },
      { t: 'Internal bot for staff', d: 'Answers questions about policies, schedules and instructions and helps file internal requests.', get: 'fewer interruptions, faster answers' },
      { t: 'Voice assistant', d: 'Handles inbound calls: bookings, order status, common questions. Complex calls are transferred to a person.', get: 'no call goes unanswered' },
    ],
    cases: [],
    faq: [
      { q: 'Customers want to talk to a human. What then?', a: 'The bot handles typical questions and passes anything unusual straight to a manager along with the conversation history. The customer doesn’t have to repeat themselves.' },
      { q: 'What are the bot’s answers based on?', a: 'Your materials: website, catalogue, policies, knowledge base. The bot doesn’t invent terms — if there is no exact answer, it hands the question to a person.' },
    ],
  },
  {
    slug: 'sales-automation',
    lead: 'We help you stop losing customers: requests from every channel land in one place, get routed fast and answered quickly, and managers see the pipeline without manual reports.',
    pains: [
      'Requests come via email, messengers and the website — some get lost',
      'Replies wait for a free manager',
      'It’s unclear at which stage and why deals fall through',
      'The sales report is put together by hand once a week',
    ],
    variants: [
      { t: 'Request capture and routing', d: 'Requests from every channel reach the CRM, are sorted by type and assigned to an owner right away.', get: 'no request gets lost' },
      { t: 'Draft replies to customers', d: 'AI drafts a reply to a typical request using the customer’s history — the manager reviews and sends.', get: 'faster response to requests' },
      { t: 'Call and chat analysis', d: 'Conversations checked against the script, reasons for lost deals and hints where deals are lost.', get: 'clear what to improve in sales' },
      { t: 'Reminders and pipeline control', d: 'The system reminds about next steps, stalled deals and unpaid invoices.', get: 'deals don’t stall' },
    ],
    cases: [],
    faq: [
      { q: 'Does it suit a small sales team?', a: 'Yes: the smaller the team, the more each request is worth. Often it’s enough to start with capturing requests in a CRM and draft replies.' },
      { q: 'We don’t have a CRM. Is that a problem?', a: 'No. We will help choose and set up a CRM for your processes, or start with what you have: email, spreadsheets and messengers.' },
    ],
  },
  {
    slug: 'analytics',
    lead: 'We bring data from 1C, CRM and spreadsheets into clear reports that update themselves. Managers see what matters every day instead of waiting for a month-end report.',
    pains: [
      'Reports are assembled by hand from several systems',
      'By the time a report is ready, the data is out of date',
      'Numbers in different reports don’t match',
    ],
    variants: [
      { t: 'Morning report in Telegram', d: 'Sales, stock, receivables and deviations from 1C and CRM — every morning in one message. AI flags what needs attention.', get: 'the essentials about the business in a minute' },
      { t: 'Management dashboards', d: 'Clear panels with key metrics that update automatically.', get: 'decisions based on current data' },
      { t: 'Scheduled reports without manual work', d: 'Reports for owners, banks or departments are generated on a schedule.', get: 'staff time goes to analysis, not assembly' },
      { t: 'Deviation alerts', d: 'The system watches metrics and alerts you when something goes wrong: revenue dips, stock grows, a payment is late.', get: 'problems are visible immediately' },
    ],
    cases: ['qr-workshop'],
    faq: [
      { q: 'Do we need a dedicated analyst?', a: 'No. Reports update themselves, and if you need a new metric we add it as part of support.' },
      { q: 'Which systems can data come from?', a: '1C, CRM, Excel and Google Sheets, bank statements, marketplaces — anything that offers an export or an API.' },
    ],
  },
];

export const serviceLabels = {
  ru: {
    eyebrow: 'Услуги',
    back: 'Все услуги',
    more: 'Подробнее',
    painsTitle: 'Какие задачи решаем',
    variantsTitle: 'Что можем сделать',
    getLabel: 'Результат',
    casesTitle: 'Похожие проекты',
    startTitle: 'Как начинаем',
    start: [
      { t: 'Бесплатная консультация', d: '60 минут: разбираем ваш процесс и честно говорим, стоит ли его автоматизировать.' },
      { t: 'Аудит', d: 'Замеряем, сколько процесс стоит сейчас, и выбираем то, что окупится первым.' },
      { t: 'Пилот', d: 'Запускаем решение на одном процессе и подтверждаем результат замером «до и после».' },
    ],
    startMore: 'Подробнее об этапах',
    faqTitle: 'Частые вопросы',
    cta: { title: 'Расскажите о своей задаче — на бесплатной консультации подберём решение и честно скажем, окупится ли оно.', btn: 'Записаться на консультацию', demo: 'Попробовать демо' },
    others: 'Другие услуги',
  },
  en: {
    eyebrow: 'Services',
    back: 'All services',
    more: 'Learn more',
    painsTitle: 'What we solve',
    variantsTitle: 'What we can build',
    getLabel: 'Result',
    casesTitle: 'Related projects',
    startTitle: 'How we start',
    start: [
      { t: 'Free consultation', d: '60 minutes: we look at your process and tell you honestly whether to automate it.' },
      { t: 'Audit', d: 'We measure what the process costs today and pick what will pay off first.' },
      { t: 'Pilot', d: 'We launch on one process and confirm the result with a before-and-after measurement.' },
    ],
    startMore: 'More about the stages',
    faqTitle: 'FAQ',
    cta: { title: 'Tell us about your task — on a free consultation we will find a solution and tell you honestly whether it will pay off.', btn: 'Book a consultation', demo: 'Try the demo' },
    others: 'Other services',
  },
};

export const services: Record<Lang, ServicePage[]> = { ru, en };
