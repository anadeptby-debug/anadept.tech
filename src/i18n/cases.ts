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
  // Скриншоты: файлы кладём в public/cases/<slug>/, src — путь от корня сайта
  gallery?: { src: string; alt: string; caption?: string }[];
};

const ru: CaseStudy[] = [
  {
    slug: 'qr-workshop',
    tag: 'Производство · 1С',
    meta: ['Производитель межкомнатных дверей', '800+ сотрудников', '8 производственных участков', '3 базы 1С'],
    title: 'Цифровой цех: учёт работы по QR-коду прямо в 1С',
    lead: 'Мастера каждый день тратили около 3 часов на перенос выработки из журналов в 1С. Теперь рабочий сканирует бейдж и QR-код на листе заказа, система сама понимает, кто, что и сколько сделал, а мастер подтверждает готовые данные одним кликом.',
    card: {
      title: 'Цифровой цех за один QR-скан',
      text: 'Выработку больше не переносят в 1С вручную: рабочий сканирует бейдж и QR-код на листе заказа, мастер подтверждает готовые данные одним кликом.',
      figures: [
        { v: '~790 ч', l: 'в год экономит каждый мастер' },
        { v: '0', l: 'часов на ручной ввод данных' },
        { v: 'Сразу', l: 'данные в 1С в момент работы, а не на следующий день' },
      ],
    },
    figures: [
      { v: '−3 ч', l: 'рутины у мастера каждый день' },
      { v: '~790 ч', l: 'в год экономит один мастер' },
      { v: '106 → 45', l: 'групп рабочих после чистки справочника' },
      { v: '867', l: 'сотрудников подключены к учёту' },
    ],
    task: {
      title: 'Задача',
      intro: 'Фабрика быстро росла: десятки бригад, сотни операций и тысячи листов заказов в месяц. Учёт был выстроен давно и надёжно работал, но держался на ручном труде мастеров: в 1С попадали итоги по бригаде, а подробности о том, кто какую операцию выполнил, оставались в журналах мастеров.',
      items: [
        { b: 'Много времени на перенос данных.', t: 'После каждой смены мастер тратил около 3 часов, чтобы перенести выработку из журнала в 1С. Это ~66 часов в месяц и ~790 часов в год — время, которое опытный специалист мог бы отдавать производству. Данные при этом появлялись в системе только на следующий день.' },
        { b: 'Сложно увидеть вклад каждого.', t: 'Составы бригад гибко менялись под задачи — от месяца к месяцу они совпадали лишь в 38% случаев. Система не была рассчитана на такую гибкость, поэтому работа фиксировалась на уровне бригады, а не человека.' },
        { b: 'Справочники накопили историю.', t: 'За годы работы в справочнике групп рабочих набралось 106 записей, из которых актуальными были 46. Часть кодов была заведена в разной раскладке — внешне одинаково, но для 1С это разные записи.' },
        { b: 'Данные о сотрудниках жили отдельно.', t: '867 сотрудников вели в кадровой программе, а производственной 1С эти данные раньше были не нужны — там было всего 5 записей.' },
      ],
    },
    done: {
      title: 'Что мы сделали',
      items: [
        { b: 'Разобрались в трёх базах 1С', t: 'Изучили производство, бухгалтерию и зарплатную базу за год: как устроены документы и обмены. Договорились, откуда берём каждые данные: сотрудники — из кадров, бригады, группы и деньги — из бухгалтерии. Теперь у каждой цифры один источник.' },
        { b: 'Навели порядок, не сломав историю', t: 'Ничего не удаляли: добавили 17 недостающих групп и переименовали 4, чтобы закрытые документы прошлых лет остались целыми. Завели в производственной базе справочник рабочих — табельный номер, ФИО, бейдж, — который сам обновляется из кадров.' },
        { b: 'Сначала проверка, потом учёт', t: 'Данные со сканера попадают в промежуточный документ. Мастер проверяет и подтверждает, и только после этого они уходят в производственное задание в привычном виде. В работе бухгалтерии не изменилось ни строки.' },
        { b: 'Приложение для сканера', t: '7 экранов, рассчитанных на маленький экран промышленного сканера и работу в перчатках. Сканирование аппаратной кнопкой — без камеры и лишних касаний.' },
      ],
    },
    flow: {
      title: 'Как это работает в цехе',
      items: [
        { t: 'Рабочий входит в приложение и видит только группы своего участка.' },
        { t: 'Отмечает, кто сегодня в смене. Доли делятся поровну автоматически, их можно поправить кнопками ± — сумма всегда 100%.' },
        { t: 'Сканирует QR-код на листе заказа. Система сама находит следующую операцию по маршруту — выбирать ничего не нужно.' },
        { t: 'Подтверждает количество (по умолчанию — плановое) и при необходимости добавляет примечание: брак, простой, переделка.' },
        { t: 'Получает номер документа. Данные уже в 1С.' },
      ],
    },
    guards: {
      title: 'Защита от ошибок',
      items: [
        'Нельзя отметить больше деталей, чем пришло с предыдущей операции',
        'Сделать больше плана можно только с подтверждения мастера',
        'Пропустить операцию или поменять порядок может только мастер',
        'Если пропал Wi-Fi, форма не закрывается и данные не теряются, пока запись не пройдёт',
        'Если мастер поправит количество в задании, оно само обновится везде',
        'Отчёты пересчитываются каждый час и всегда актуальны',
      ],
    },
    tech: { title: 'На чём сделано', text: '1С: производство (УПП), бухгалтерия, зарплата и кадры (ЗУП) · обмен данными через HTTP-сервис 1С · приложение на React для промышленных сканеров на Android 10+ со встроенным 2D-сканером · автоматическая обработка данных каждый час' },
    compare: {
      title: 'Было → стало',
      cols: ['Что', 'Было', 'Стало'],
      rows: [
        ['Ручной ввод выработки мастером', '~3 часа каждый день', '0 — данные приходят со сканера'],
        ['Время мастера на ввод за год', '~790 часов, почти 100 рабочих дней', 'Несколько минут в день на проверку'],
        ['Когда данные появляются в 1С', 'На следующий день', 'В момент выполнения операции'],
        ['Кто выполнил операцию', 'В журнале мастера', 'Видно в 1С по каждому листу и человеку'],
        ['Действия рабочего на операцию', '—', '2 скана, экран — только при нестандартном количестве'],
        ['Группы рабочих в справочнике', '106 записей, включая устаревшие', '45 актуальных, совпадают с бухгалтерией'],
      ],
    },
    results: {
      title: 'Результаты',
      items: [
        { b: '~790 часов в год', t: 'освободили у каждого мастера — это время теперь уходит на производство.' },
        { b: '0 часов', t: 'на ручной ввод выработки: данные приходят из цеха в момент выполнения операции.' },
        { b: 'Видно вклад каждого:', t: 'по каждой операции на каждом листе видно, кто её выполнил и в какой доле.' },
        { b: 'Порядок в 1С:', t: 'единый формат кодов, 45 действующих групп совпадают с бухгалтерией.' },
        { b: 'План и факт рядом:', t: 'мастер видит выполнение в одном отчёте и печатает журнал выполненного задания одной кнопкой.' },
        { b: 'Без остановки производства:', t: 'бухгалтерия и кадры продолжили работать как раньше.' },
      ],
    },
    fit: { title: 'Кому подойдёт', text: 'Производствам со сдельной оплатой, бригадной работой и листами заказов: деревообработка, мебель, металлообработка, сборочные цеха. Если выработку у вас ведут в журналах или Excel, а хочется видеть её в 1С сразу, это ваш случай.' },
  },
  {
    slug: 'piecework-payroll',
    tag: 'Производство · Зарплата',
    meta: ['Тот же клиент', '7 производственных бригад', '45 групп рабочих', '~1 000 документов выпуска в месяц'],
    title: 'Зарплата без Excel: автоматический расчёт сдельной оплаты',
    lead: 'Расчёт сдельной зарплаты проходил несколько ручных шагов: операция → сумма на группу → таблица мастера → распределение в бухгалтерии. Мы сделали так, что деньги за каждую операцию сразу делятся между теми, кто её реально выполнил, а итог совпадает с бухгалтерией до копейки. Закрытие зарплаты, которое растягивалось почти на неделю, теперь укладывается в час.',
    card: {
      title: 'Зарплата, которая сходится до копейки',
      text: 'Сдельная оплата считается по фактической работе каждого сотрудника. Закрытие зарплаты, которое тянулось почти неделю, теперь занимает около часа.',
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
      { v: '100%', l: 'денег связаны с работой в цехе' },
    ],
    task: {
      title: 'Задача',
      intro: 'Каждый месяц повторялся один и тот же цикл:',
      items: [
        { b: 'День работы мастера', t: 'уходил на таблицу для бухгалтерии: кто в какой группе работал, сколько часов и с каким коэффициентом.' },
        { b: '3–5 рабочих дней сверки.', t: 'Данные из разных источников нужно было сводить вместе: сотрудники переходили между группами, часы сверялись с табелем, итоги — с выпуском в 1С. На согласование между мастерами и бухгалтерией уходили дни.' },
        { b: 'Ручной перенос в зарплатную программу.', t: 'Бухгалтер вносил данные вручную и делил деньги группы между людьми.' },
        { b: 'Подгонка копеек.', t: 'Стандартная кнопка «Распределить» теряла остаток при округлении, и копейки приходилось добавлять руками.' },
      ],
    },
    analysis: {
      title: 'Что показал аудит',
      intro: 'Мы разобрали 505 расчётов зарплаты «группа × месяц» за год:',
      total: 505,
      rows: [
        { l: 'Сумма совпала с автоматическим расчётом', v: 286 },
        { l: 'Требовалась ручная корректировка копеек', v: 133 },
        { l: 'Суммы уточняли вручную после расчёта', v: 86 },
        { l: 'Стандартный расчёт сам не сходился с начислением', v: 121 },
      ],
      outro: 'В 70% строк мастера уточняли коэффициенты вручную, опираясь на свой опыт, — это работало, но требовало времени и было сложно для проверки. Около 15% работ переносили между группами уже после закрытия месяца. Стало ясно: распределять деньги быстрее и точнее можно по фактической выработке каждого.',
    },
    idea: {
      title: 'Решение: деньги идут за работой',
      text: 'Главная находка аудита: в бухгалтерии деньги уже разложены по мелким ячейкам «лист заказа + операция + смена → сумма». А сканер в цехе записывает ту же ячейку с другой стороны: «лист + операция + смена → кто сделал и сколько». Оставалось их соединить.',
      example: {
        title: 'Пример',
        op: 'Прессование',
        sheet: 'Лист №1234',
        total: '920 ₽',
        parts: [
          { n: 'Иванов', q: '35 шт.', sum: '322 ₽', share: 35 },
          { n: 'Петров', q: '20 шт.', sum: '184 ₽', share: 20 },
          { n: 'Сидоров', q: '45 шт.', sum: '414 ₽', share: 45 },
        ],
        result: 'Итого ровно 920 ₽ — как в бухгалтерии.',
      },
      closing: 'Ручное распределение и промежуточные таблицы больше не нужны.',
    },
    flow: {
      title: 'Как устроен процесс',
      items: [
        { b: 'Бухгалтерия закрывает месяц', t: 'как обычно.' },
        { b: 'Система сопоставляет данные:', t: 'берёт суммы из бухгалтерии и сканы из производственной базы и связывает их по номеру листа, операции и смене.' },
        { b: 'Делит деньги', t: 'каждой ячейки пропорционально «количество × доля». Если сканов нет, применяет понятные запасные правила — соседние смены, выработку группы, часы — и отмечает в ведомости, по какому правилу поделена каждая сумма.' },
        { b: 'Округляет без потерь:', t: 'остаток уходит на самую большую сумму в группе, поэтому итог совпадает с бухгалтерией до копейки.' },
        { b: 'Готовит ведомость', t: 'для зарплатной программы. Бухгалтер загружает готовые суммы, а встроенная проверка сверяет итог с начислением.' },
      ],
      after: 'Зарплатную программу дорабатывать не пришлось: мы опёрлись на её стандартную работу, где загруженная сумма доходит до начисления без изменений.',
    },
    checks: {
      title: 'Что мы проверили до старта',
      items: [
        'Каждую сумму в бухгалтерии можно связать с листом заказа в цехе — проверили на данных за 4 месяца: совпадение 100%',
        'Связь не теряется после закрытия месяца, даже когда бухгалтерия пересохраняет 85–88% документов',
        'Нашли скрытые ловушки в данных — например, особый пробел в номерах отчётов больше 999, который ломал сопоставление',
        'Посчитали «слепые зоны» — работы без листа заказа и дополнительные работы — и для каждой придумали свой способ учёта',
      ],
    },
    compare: {
      title: 'Было → стало',
      cols: ['Этап', 'Было', 'Стало'],
      rows: [
        ['Подготовка данных для бухгалтерии', '~1 рабочий день мастера каждый месяц', '0 — всё уже собрал сканер'],
        ['Сверка мастеров с бухгалтерией', '3–5 рабочих дней переписки и созвонов', 'Автоматическая проверка «итог = начисление»'],
        ['Расчёт сдельной по всем бригадам', 'Несколько дней ручного деления', 'Минуты: одна обработка готовит ведомость'],
        ['Расчёты с ручной подгонкой копеек', '219 из 505 (43%)', '0 — сумма сходится до копейки'],
        ['Стандартный расчёт не сходился', '121 из 505 (24%)', '0'],
        ['Основа для оплаты', 'Коэффициенты, которые мастер выставлял вручную', 'Сколько человек реально сделал'],
      ],
    },
    results: {
      title: 'Результаты',
      items: [
        { b: 'Зарплата закрывается на неделю быстрее:', t: 'вместо дня подготовки у мастера и 3–5 дней сверки — готовая ведомость и проверка за минуты.' },
        { b: 'С нескольких дней до часа:', t: 'расчёт сдельной по всем бригадам больше не требует сбора таблиц от мастеров.' },
        { b: 'Точно до копейки:', t: 'итог по группе всегда равен начислению в бухгалтерии, ничего не нужно подгонять.' },
        { b: 'Прозрачная оплата:', t: 'каждый получает за свою фактическую выработку.' },
        { b: 'Понятно, откуда сумма:', t: 'на вопрос «почему мне столько начислили?» есть ответ — за какие операции и листы.' },
        { b: 'Заработок виден заранее:', t: 'мастер и рабочий видят примерную сумму (сканы × расценка) задолго до конца месяца.' },
        { b: 'Без переделки 1С', t: 'и без ломки привычной работы бухгалтерии.' },
      ],
    },
    fit: { title: 'Кому подойдёт', text: 'Компаниям со сдельной или бригадной оплатой, где зарплату делят через коэффициенты, часы и Excel: производство, строительство, склады и логистика. Если каждый месяц бухгалтерии приходится вручную сводить таблицы мастеров, этот этап можно автоматизировать.' },
  },
];

const en: CaseStudy[] = [
  {
    slug: 'qr-workshop',
    tag: 'Manufacturing · 1C',
    meta: ['Interior door manufacturer', '800+ employees', '8 production sites', '3 1C databases'],
    title: 'Digital shop floor: tracking work by QR code, straight into 1C',
    lead: 'Foremen spent about 3 hours a day transferring output from their logs into 1C. Now a worker scans their badge and the QR code on the order sheet, the system knows who did what and how much, and the foreman approves the ready data in one click.',
    card: {
      title: 'A digital shop floor in one QR scan',
      text: 'Output no longer has to be entered into 1C by hand: workers scan their badge and the QR code on the order sheet, the foreman approves the ready data in one click.',
      figures: [
        { v: '~790 h', l: 'a year saved by every foreman' },
        { v: '0', l: 'hours of manual data entry' },
        { v: 'Instantly', l: 'data is in 1C as work is done, not the next day' },
      ],
    },
    figures: [
      { v: '−3 h', l: 'of routine per foreman per day' },
      { v: '~790 h', l: 'a year saved per foreman' },
      { v: '106 → 45', l: 'worker groups after the cleanup' },
      { v: '867', l: 'employees connected' },
    ],
    task: {
      title: 'The problem',
      intro: 'The factory was growing fast: dozens of crews, hundreds of operations and thousands of order sheets a month. Tracking had been set up long ago and worked reliably, but it relied on foremen’s manual work: 1C received crew totals, while details of who did which operation stayed in the foremen’s logs.',
      items: [
        { b: 'A lot of time spent transferring data.', t: 'After every shift a foreman spent about 3 hours moving output from the log into 1C. That is ~66 hours a month and ~790 hours a year — time an experienced specialist could give to production. And the data reached the system only the next day.' },
        { b: 'Hard to see individual contribution.', t: 'Crews were flexibly reorganised for each task — month to month they matched only 38% of the time. The system was not built for that flexibility, so work was recorded per crew rather than per person.' },
        { b: 'Directories had accumulated history.', t: 'Over the years the worker-group directory grew to 106 records, of which 46 were current. Some codes had been entered in different keyboard layouts — identical to the eye, different records to 1C.' },
        { b: 'Staff data lived separately.', t: '867 employees were managed in the HR system; production 1C had not needed that data before and held just 5 records.' },
      ],
    },
    done: {
      title: 'What we did',
      items: [
        { b: 'Mapped three 1C databases', t: 'We went through a year of production, accounting and payroll documents and data exchanges, and agreed where each piece of data comes from: staff from HR; crews, groups and money from accounting. Now every number has a single source.' },
        { b: 'Cleaned up without breaking history', t: 'Nothing was deleted: we added 17 missing groups and renamed 4, so closed documents from past years stayed intact. The production database got a worker directory — staff number, name, badge — that updates itself from HR.' },
        { b: 'Review first, then record', t: 'Scanner data lands in an intermediate document. The foreman reviews and approves it, and only then does it go to the production order in the usual format. Accounting work did not change by a single line.' },
        { b: 'A scanner app', t: '7 screens designed for the small screen of an industrial scanner and for gloves. Scanning with the hardware button — no camera, no extra taps.' },
      ],
    },
    flow: {
      title: 'How it works on the floor',
      items: [
        { t: 'The worker logs in and sees only the groups of their site.' },
        { t: 'Marks who is on shift today. Shares split evenly and can be adjusted with ± buttons — the total is always 100%.' },
        { t: 'Scans the QR code on the order sheet. The system finds the next operation on the route by itself.' },
        { t: 'Confirms the quantity (planned by default) and adds a note if needed: defect, downtime, rework.' },
        { t: 'Gets a document number. The data is already in 1C.' },
      ],
    },
    guards: {
      title: 'Protection from mistakes',
      items: [
        'You cannot record more parts than came from the previous operation',
        'Going over plan needs the foreman’s approval',
        'Only the foreman can skip an operation or change the order',
        'If Wi-Fi drops, the form stays open and nothing is lost until the record goes through',
        'If the foreman corrects a quantity, it updates everywhere',
        'Reports recalculate every hour and are always current',
      ],
    },
    tech: { title: 'Built with', text: '1C: Manufacturing, Accounting, Payroll & HR · data exchange via 1C HTTP service · React app for Android 10+ industrial scanners with built-in 2D scanner · automatic processing every hour' },
    compare: {
      title: 'Before → after',
      cols: ['What', 'Before', 'After'],
      rows: [
        ['Manual output entry by the foreman', '~3 hours every day', '0 — data comes from the scanner'],
        ['Foreman time on entry per year', '~790 hours, almost 100 working days', 'A few minutes a day to review'],
        ['When data appears in 1C', 'The next day', 'The moment the operation is done'],
        ['Who did the operation', 'In the foreman’s log', 'Visible in 1C per sheet and per person'],
        ['Worker actions per operation', '—', '2 scans; screen only for non-standard quantities'],
        ['Worker groups in the directory', '106 records, including outdated ones', '45 current, matching accounting'],
      ],
    },
    results: {
      title: 'Results',
      items: [
        { b: '~790 hours a year', t: 'freed up for every foreman — that time now goes to production.' },
        { b: '0 hours', t: 'of manual output entry: data arrives from the floor as operations are done.' },
        { b: 'Everyone’s contribution is visible:', t: 'for every operation on every sheet you see who did it and in what share.' },
        { b: 'Order in 1C:', t: 'one code format, 45 active groups matching accounting.' },
        { b: 'Plan and actuals side by side:', t: 'the foreman sees progress in one report and prints the completed-order log in one click.' },
        { b: 'No production stop:', t: 'accounting and HR kept working as before.' },
      ],
    },
    fit: { title: 'Who it fits', text: 'Manufacturers with piece-rate pay, crew work and order sheets: woodworking, furniture, metalworking, assembly. If output lives in logs or Excel and you want to see it in 1C right away, this is for you.' },
  },
  {
    slug: 'piecework-payroll',
    tag: 'Manufacturing · Payroll',
    meta: ['Same client', '7 production crews', '45 worker groups', '~1,000 output documents a month'],
    title: 'Payroll without Excel: automatic piece-rate pay',
    lead: 'Piece-rate pay went through several manual steps: operation → group total → foreman’s table → distribution in accounting. We made the money for every operation go straight to the people who actually did it, and the total matches accounting to the kopeck. Closing payroll used to take almost a week — now it takes about an hour.',
    card: {
      title: 'Payroll that adds up to the kopeck',
      text: 'Pay is calculated from each employee’s actual output. Closing payroll used to take almost a week — now it takes about an hour.',
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
      { v: '100%', l: 'of money linked to shop-floor work' },
    ],
    task: {
      title: 'The problem',
      intro: 'Every month went the same way:',
      items: [
        { b: 'A full day of the foreman’s time', t: 'went into a table for accounting: who worked in which group, how many hours, with what coefficient.' },
        { b: '3–5 working days of reconciliation.', t: 'Data from different sources had to be brought together: people moved between groups, hours were checked against timesheets, totals against output in 1C. Agreeing it between foremen and accounting took days.' },
        { b: 'Manual entry into payroll.', t: 'The accountant entered everything by hand and split the group’s money between people.' },
        { b: 'Fixing kopecks.', t: 'The standard “Distribute” button lost the rounding remainder, so kopecks had to be added by hand.' },
      ],
    },
    analysis: {
      title: 'What the audit showed',
      intro: 'We went through 505 “group × month” payroll calculations over a year:',
      total: 505,
      rows: [
        { l: 'Total matched the automatic calculation', v: 286 },
        { l: 'Kopecks needed a manual correction', v: 133 },
        { l: 'Amounts were refined by hand after calculation', v: 86 },
        { l: 'Standard calculation did not match the accrual', v: 121 },
      ],
      outro: 'In 70% of rows foremen refined coefficients by hand based on their experience — it worked, but took time and was hard to verify. About 15% of work was moved between groups after the month closed. It became clear that money could be distributed faster and more precisely by each person’s actual output.',
    },
    idea: {
      title: 'The solution: money follows the work',
      text: 'The key audit finding: accounting already splits money into small cells “order sheet + operation + shift → amount”. The shop-floor scanner records the same cell from the other side: “sheet + operation + shift → who did it and how much”. All that was left was to join them.',
      example: {
        title: 'Example',
        op: 'Pressing',
        sheet: 'Sheet #1234',
        total: '920 ₽',
        parts: [
          { n: 'Ivanov', q: '35 pcs', sum: '322 ₽', share: 35 },
          { n: 'Petrov', q: '20 pcs', sum: '184 ₽', share: 20 },
          { n: 'Sidorov', q: '45 pcs', sum: '414 ₽', share: 45 },
        ],
        result: 'Exactly 920 ₽ in total — same as in accounting.',
      },
      closing: 'No more manual distribution or intermediate tables.',
    },
    flow: {
      title: 'How the process works',
      items: [
        { b: 'Accounting closes the month', t: 'as usual.' },
        { b: 'The system matches the data:', t: 'it takes amounts from accounting and scans from the production database and links them by sheet number, operation and shift.' },
        { b: 'It splits the money', t: 'of each cell by “quantity × share”. Without scans it applies clear fallback rules — neighbouring shifts, group output, hours — and marks which rule split each amount.' },
        { b: 'It rounds without losses:', t: 'the remainder goes to the largest amount in the group, so the total matches accounting to the kopeck.' },
        { b: 'It prepares the pay sheet', t: 'for the payroll system. The accountant loads ready amounts, and a built-in check compares the total with the accrual.' },
      ],
      after: 'The payroll system needed no changes: we relied on its standard behaviour, where a loaded amount reaches the accrual unchanged.',
    },
    checks: {
      title: 'What we verified before starting',
      items: [
        'Every amount in accounting can be linked to an order sheet on the floor — tested on 4 months of data: 100% match',
        'The link survives month close, even when accounting re-saves 85–88% of documents',
        'We found hidden data traps — e.g. a special space character in report numbers above 999 that broke matching',
        'We sized the “blind spots” — work without an order sheet and extra work — and designed a way to track each',
      ],
    },
    compare: {
      title: 'Before → after',
      cols: ['Stage', 'Before', 'After'],
      rows: [
        ['Preparing data for accounting', '~1 foreman working day a month', '0 — the scanner already collected it'],
        ['Foremen ↔ accounting reconciliation', '3–5 working days of emails and calls', 'Automatic “total = accrual” check'],
        ['Piece-rate calculation for all crews', 'Several days of manual splitting', 'Minutes: one job builds the pay sheet'],
        ['Calculations with manual kopeck fixes', '219 of 505 (43%)', '0 — totals match to the kopeck'],
        ['Standard calculation did not match', '121 of 505 (24%)', '0'],
        ['Basis for pay', 'Coefficients set manually by the foreman', 'What the person actually did'],
      ],
    },
    results: {
      title: 'Results',
      items: [
        { b: 'Payroll closes a week faster:', t: 'instead of a day of prep and 3–5 days of reconciliation — a ready pay sheet and a check in minutes.' },
        { b: 'From several days to an hour:', t: 'calculating piece-rate pay for all crews no longer needs foremen’s tables.' },
        { b: 'Accurate to the kopeck:', t: 'the group total always equals the accounting accrual, nothing to adjust.' },
        { b: 'Transparent pay:', t: 'everyone is paid for their actual output.' },
        { b: 'Clear where the amount comes from:', t: '“why was I paid this?” has an answer — which operations and sheets.' },
        { b: 'Earnings visible early:', t: 'foremen and workers see an estimate (scans × rate) long before month close.' },
        { b: 'No changes to 1C', t: 'and no disruption to how accounting works.' },
      ],
    },
    fit: { title: 'Who it fits', text: 'Companies with piece-rate or crew pay split via coefficients, hours and Excel: manufacturing, construction, warehouses and logistics. If accounting has to compile foremen’s tables by hand every month, that step can be automated.' },
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
    note: 'Клиент назван обезличенно по договорённости о конфиденциальности.',
    gallery: 'Как это выглядит',
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
    note: 'The client is anonymised under a confidentiality agreement.',
    gallery: 'What it looks like',
    cta: { title: 'Show us how you track work — in a week we’ll find where hours and money leak.', btn: 'Discuss a project' },
  },
};

export const cases: Record<Lang, CaseStudy[]> = { ru, en };
