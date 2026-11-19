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
    lead: 'Внедряем искусственный интеллект туда, где он даёт измеримую пользу: в работу с документами, звонками, знаниями и данными компании. Без «ИИ ради ИИ» — под конкретную задачу и с замером результата.',
    pains: [
      'Много однотипной работы с текстами: письма, документы, ответы клиентам',
      'Договоры и заявки приходится читать целиком, чтобы найти пару цифр',
      'Знания компании разбросаны по папкам и головам сотрудников',
      'Звонки, переписки и отзывы никто не успевает разбирать',
      'Итоги совещаний теряются, задачи забываются',
      'Закупки планируются по ощущениям, а не по данным',
      'Сотрудники уже пользуются ИИ, но бессистемно и с риском для данных',
      'Хочется использовать ИИ, но данные нельзя отправлять за границу',
    ],
    variants: [
      { group: 'Документы и тексты', t: 'ИИ-ассистент по документам компании', d: 'Отвечает сотрудникам на вопросы по регламентам, инструкциям, договорам и работе в 1С — со ссылкой на источник.', get: 'новички быстрее входят в работу, опытные меньше отвлекаются' },
      { group: 'Документы и тексты', t: 'Извлечение данных из документов', d: 'Из договоров, заявок и спецификаций ИИ достаёт реквизиты, суммы, сроки и условия — в таблицу или сразу в 1С.', get: 'данные из сотен документов за минуты' },
      { group: 'Документы и тексты', t: 'Проверка договоров по чек-листу', d: 'ИИ сравнивает договор с вашими стандартами и подсвечивает пункты, на которые стоит обратить внимание. Решение остаётся за юристом.', get: 'юрист тратит время только на спорные пункты' },
      { group: 'Документы и тексты', t: 'Подготовка типовых текстов', d: 'Коммерческие предложения, письма, описания товаров и ответы — по шаблонам и в тоне компании. Сотрудник правит и отправляет.', get: 'типовые тексты за минуты' },

      { group: 'Звонки и коммуникации', t: 'Анализ звонков', d: 'Каждый звонок расшифровывается и проверяется по скрипту, видно причины отказов, итоги разговора сами попадают в CRM.', get: 'проверены все звонки, а не выборочные' },
      { group: 'Звонки и коммуникации', t: 'Разбор входящих писем и обращений', d: 'ИИ определяет тему и срочность письма, готовит черновик ответа и передаёт его нужному сотруднику.', get: 'ни одно обращение не теряется' },
      { group: 'Звонки и коммуникации', t: 'Протоколы встреч', d: 'Запись совещания превращается в короткий протокол с решениями, задачами и сроками, задачи попадают в ваш трекер.', get: 'итоги встречи у всех сразу после неё' },
      { group: 'Звонки и коммуникации', t: 'Анализ отзывов и обращений клиентов', d: 'ИИ раскладывает отзывы, жалобы и вопросы клиентов по темам и показывает, что волнует людей чаще всего.', get: 'понятно, что улучшать в первую очередь' },

      { group: 'Прогнозы и контроль', t: 'Прогноз спроса и закупок', d: 'По истории продаж и сезонности система прогнозирует спрос и подсказывает, что и в каком количестве заказать.', get: 'меньше дефицита и лишних остатков' },
      { group: 'Прогнозы и контроль', t: 'Поиск ошибок и аномалий в данных', d: 'ИИ просматривает документы и операции и отмечает подозрительное: дубли, необычные суммы, отклонения от нормы.', get: 'ошибки находятся до того, как стали проблемой' },

      { group: 'Безопасность и команда', t: 'ИИ на вашем сервере', d: 'Для чувствительных данных — модели, которые работают внутри компании, без передачи данных наружу.', get: 'ИИ без компромиссов по защите данных' },
      { group: 'Безопасность и команда', t: 'Подбор и настройка ИИ-инструментов', d: 'Помогаем выбрать готовые ИИ-сервисы под задачи компании, настраиваем доступы и правила работы с данными.', get: 'команда пользуется ИИ легально и безопасно' },
      { group: 'Безопасность и команда', t: 'Обучение команды', d: 'Практический воркшоп на задачах вашей компании: как пользоваться ИИ безопасно и с пользой каждый день.', get: 'команда уверенно применяет ИИ в работе' },
    ],
    cases: [],
    faq: [
      { q: 'Насколько можно доверять ответам ИИ?', a: 'Система не угадывает: если данных не хватает или что-то не сходится, она передаёт вопрос сотруднику. Сомнительные случаи всегда проверяет человек.' },
      { q: 'Какие модели вы используете?', a: 'Подбираем под задачу и требования к данным: от моделей по API до локальных на вашем сервере. Модель можно заменить, если изменятся требования.' },
      { q: 'Можно сначала попробовать?', a: 'Да. Начинаем с пилота на одном процессе и реальных данных, критерий успеха фиксируем заранее. Почувствовать подход можно уже сейчас — в демо на сайте.' },
    ],
  },
  {
    slug: 'integrations',
    lead: 'Соединяем 1С, CRM, банк, ЭДО, сайт, мессенджеры, телефонию, маркетплейсы и службы доставки, чтобы данные передавались сами. Одни и те же цифры для всех отделов — без ручного переноса и дублей.',
    pains: [
      'Одни и те же данные вносят в несколько систем',
      'Цифры в CRM и 1С расходятся, и непонятно, каким верить',
      'Выписки из банка и платёжки загружают вручную',
      'Документы с контрагентами ходят по почте и курьером',
      'Заявки с сайта и из мессенджеров приходят в разные места',
      'Менеджер не видит, кто звонит и о чём договаривались раньше',
      'Заказы с маркетплейсов переносят в 1С руками, остатки обновляются с опозданием',
    ],
    variants: [
      { group: 'Учёт и финансы', t: '1С ↔ CRM', d: 'Клиенты, сделки, счета и оплаты синхронизируются автоматически: менеджер видит в CRM всё, что знает бухгалтерия.', get: 'одна база клиентов для продаж и учёта' },
      { group: 'Учёт и финансы', t: '1С ↔ банк', d: 'Выписки приходят в 1С сами, платёжные поручения уходят в банк без ручной выгрузки и загрузки файлов.', get: 'платежи и выписки без ручной работы' },
      { group: 'Учёт и финансы', t: '1С ↔ электронный документооборот', d: 'Счета, акты и накладные отправляются контрагентам и принимаются от них через ЭДО прямо из 1С.', get: 'документы без бумаги и пересылки' },
      { group: 'Учёт и финансы', t: 'Связка нескольких баз 1С', d: 'Производство, бухгалтерия и зарплата обмениваются данными по понятным правилам, у каждой цифры один источник.', get: 'нет расхождений между базами' },

      { group: 'Каналы общения', t: 'Сайт и формы → CRM', d: 'Заявки с сайта и лендингов попадают в CRM с источником, рекламной кампанией и историей.', get: 'видно, откуда приходят клиенты' },
      { group: 'Каналы общения', t: 'Мессенджеры ↔ CRM', d: 'Переписка в Telegram, Viber и WhatsApp ведётся из CRM и сохраняется в карточке клиента.', get: 'вся история общения в одном месте' },
      { group: 'Каналы общения', t: 'Телефония ↔ CRM', d: 'Входящий звонок открывает карточку клиента, записи разговоров и пропущенные звонки сохраняются в CRM.', get: 'менеджер знает, кто звонит, ещё до ответа' },
      { group: 'Каналы общения', t: 'Почта ↔ CRM', d: 'Письма клиентов сами привязываются к сделкам и контактам, ничего не теряется в личных ящиках.', get: 'переписка не уходит вместе с сотрудником' },

      { group: 'Торговля и логистика', t: '1С ↔ сайт', d: 'Каталог, остатки, цены и заказы обмениваются автоматически в обе стороны.', get: 'на сайте всегда актуальные остатки' },
      { group: 'Торговля и логистика', t: '1С ↔ маркетплейсы', d: 'Остатки, цены и заказы Wildberries и Ozon синхронизируются с 1С, отчёты о продажах загружаются сами.', get: 'заказы с маркетплейсов без ручного ввода' },
      { group: 'Торговля и логистика', t: '1С ↔ службы доставки', d: 'Заявки на доставку создаются из заказа, статусы и трек-номера возвращаются в 1С и CRM.', get: 'статус доставки виден в системе' },

      { group: 'Данные и таблицы', t: 'Единое хранилище для отчётов', d: 'Данные из всех систем собираются в одном месте и обновляются по расписанию — основа для аналитики.', get: 'отчёты строятся на одних и тех же цифрах' },
      { group: 'Данные и таблицы', t: 'Excel и Google Таблицы ↔ системы', d: 'Таблицы, к которым привыкли сотрудники, обновляются из 1С и CRM сами — и наоборот.', get: 'привычные таблицы без ручного копирования' },
    ],
    cases: ['qr-workshop'],
    faq: [
      { q: 'Работаете с нашей CRM?', a: 'Подключаемся к системам через их API и стандартные механизмы обмена — например, Битрикс24, amoCRM, 1С. Конкретную связку разберём на консультации.' },
      { q: 'Сколько времени занимает интеграция?', a: 'Зависит от систем и объёма данных: простые связки делаются быстро, сложные — поэтапно. Точный срок назовём после консультации, когда увидим ваши системы.' },
      { q: 'Что будет, если обмен даст сбой?', a: 'Обмен работает с проверками и журналом: если что-то не прошло, система сообщит ответственному, а данные не потеряются. Поддержку можно взять у нас по договору.' },
    ],
  },
  {
    slug: 'chatbots',
    lead: 'Создаём ботов и ИИ-помощников для клиентов, продаж и сотрудников: они отвечают на вопросы, принимают заявки, записывают, напоминают и находят информацию — круглосуточно и в стиле вашей компании. Пример уже перед вами: помощник внизу этой страницы.',
    pains: [
      'Менеджеры тратят время на одни и те же вопросы',
      'Клиенты пишут вечером и в выходные, а ответ получают утром',
      'Запись и подтверждение визитов отнимают часы у администраторов',
      'Заявки приходят «сырыми», и менеджер тратит время на уточнения',
      'Сотрудники отвлекают друг друга вопросами «где найти» и «как сделать»',
      'Полевые сотрудники отчитываются звонками и фото в личных чатах',
    ],
    variants: [
      { group: 'Для клиентов', t: 'ИИ-помощник для сайта', d: 'Отвечает посетителям по материалам компании, помогает с выбором и ведёт к заявке — как помощник на нашем сайте.', get: 'ответы и заявки 24/7' },
      { group: 'Для клиентов', t: 'Бот в Telegram, Viber и WhatsApp', d: 'Принимает заказы и заявки, отвечает на вопросы, сложное передаёт менеджеру вместе с историей.', get: 'менеджер получает только то, где нужен человек' },
      { group: 'Для клиентов', t: 'Запись и бронирование', d: 'Клиент сам выбирает услугу и время, получает напоминание и может перенести визит без звонка.', get: 'меньше неявок и звонков для записи' },
      { group: 'Для клиентов', t: 'Статус заказа и доставки', d: 'Бот сам отвечает, где заказ и когда приедет, — по данным 1С и службы доставки.', get: 'меньше вопросов «где мой заказ»' },
      { group: 'Для клиентов', t: 'Поддержка и претензии', d: 'Отвечает на частые вопросы, присылает инструкции, принимает претензии и сразу ставит их в работу.', get: 'обращения не теряются, ответ быстрее' },

      { group: 'Для продаж', t: 'Квалификация заявок', d: 'Бот уточняет задачу, объём и сроки и передаёт менеджеру уже понятную заявку.', get: 'менеджер говорит с теми, кто готов к покупке' },
      { group: 'Для продаж', t: 'Консультант по каталогу', d: 'Подбирает товар или услугу под задачу клиента, отвечает про наличие и характеристики.', get: 'клиент быстрее находит нужное' },
      { group: 'Для продаж', t: 'Сбор отзывов после покупки', d: 'Через несколько дней после покупки бот спрашивает впечатления, проблемы сразу передаёт ответственному.', get: 'больше отзывов, недовольство видно сразу' },

      { group: 'Для сотрудников', t: 'Внутренний бот-справочник', d: 'Отвечает на вопросы по регламентам, графикам и инструкциям, помогает оформить внутренние заявки.', get: 'меньше отвлечений, быстрее ответы' },
      { group: 'Для сотрудников', t: 'Бот для новичков', d: 'Сопровождает первые недели: отвечает на вопросы, ведёт по чек-листу и проверяет знание регламентов.', get: 'новичок быстрее выходит на полную нагрузку' },
      { group: 'Для сотрудников', t: 'Бот для выездных сотрудников', d: 'Водители, монтажники и торговые представители отправляют отчёты, фото и заявки прямо из мессенджера в систему.', get: 'отчёты с выезда сразу в системе' },

      { group: 'Голос', t: 'Голосовой ассистент', d: 'Принимает входящие звонки: запись, статус заказа, частые вопросы. Сложные звонки переводит на сотрудника.', get: 'ни один звонок не остаётся без ответа' },
      { group: 'Голос', t: 'Автоматические обзвоны', d: 'Напоминания об оплате и визите, подтверждение заказов, короткие опросы — с записью результата в CRM.', get: 'рутинные звонки без участия сотрудников' },
    ],
    cases: [],
    faq: [
      { q: 'Клиенты хотят говорить с человеком. Как быть?', a: 'Бот берёт типовые вопросы, а всё необычное сразу передаёт менеджеру вместе с историей переписки. Клиенту не нужно повторять.' },
      { q: 'На чём основаны ответы бота?', a: 'На ваших материалах: сайт, каталог, регламенты, база знаний. Бот не придумывает условия — если точного ответа нет, он передаёт вопрос сотруднику.' },
      { q: 'Где может работать бот?', a: 'На сайте, в Telegram, Viber и WhatsApp, по телефону и внутри вашей CRM. Выбираем каналы, где уже есть ваши клиенты и сотрудники.' },
    ],
  },
  {
    slug: 'sales-automation',
    lead: 'Помогаем не терять клиентов и продавать больше: заявки из всех каналов собираются в одном месте и получают ответ быстро, менеджеры занимаются продажами, а не рутиной, а руководитель видит воронку без ручных отчётов.',
    pains: [
      'Заявки приходят в почту, мессенджеры и на сайт — часть из них теряется',
      'Ответ клиенту ждёт свободного менеджера',
      'Менеджеры тратят время на заполнение CRM вместо продаж',
      'Коммерческие предложения готовятся часами',
      'Непонятно, на каком этапе и почему срываются сделки',
      'Постоянные клиенты перестают покупать, и это замечают поздно',
      'Отчёт по продажам собирают вручную раз в неделю',
    ],
    variants: [
      { group: 'Заявки и первый контакт', t: 'Сбор и распределение заявок', d: 'Заявки из всех каналов попадают в CRM, сортируются по типу и сразу назначаются ответственному.', get: 'ни одна заявка не теряется' },
      { group: 'Заявки и первый контакт', t: 'Мгновенный первый ответ', d: 'Клиент сразу получает ответ и понятный следующий шаг — даже ночью и в выходные.', get: 'клиент не уходит к конкурентам, пока ждёт' },
      { group: 'Заявки и первый контакт', t: 'Квалификация заявок', d: 'Система уточняет задачу, объём и сроки и передаёт менеджеру заявку, с которой можно сразу работать.', get: 'меньше времени на уточнения' },
      { group: 'Заявки и первый контакт', t: 'История клиента и дубли', d: 'При новом обращении система находит клиента, показывает историю покупок и объединяет дубли.', get: 'менеджер сразу в контексте' },

      { group: 'Работа менеджера', t: 'Черновики ответов клиентам', d: 'ИИ готовит ответ на типовой запрос с учётом истории клиента — менеджер проверяет и отправляет.', get: 'быстрее реакция на обращения' },
      { group: 'Работа менеджера', t: 'Коммерческие предложения по запросу', d: 'КП собирается из каталога и условий компании по запросу клиента, менеджер только проверяет.', get: 'предложение уходит в тот же час' },
      { group: 'Работа менеджера', t: 'CRM заполняется сама', d: 'Итоги звонков и писем, договорённости и следующие шаги записываются в карточку сделки автоматически.', get: 'менеджер продаёт, а не заполняет карточки' },
      { group: 'Работа менеджера', t: 'Напоминания и контроль воронки', d: 'Система напоминает о следующих шагах, зависших сделках и неоплаченных счетах.', get: 'сделки не зависают' },

      { group: 'Контроль и рост продаж', t: 'Анализ звонков и переписок', d: 'Проверка разговоров по скрипту, причины отказов и подсказки, где теряются сделки.', get: 'понятно, что улучшать в продажах' },
      { group: 'Контроль и рост продаж', t: 'Повторные продажи', d: 'По истории покупок система подсказывает, кому из клиентов пора заказать снова, и готовит предложение.', get: 'больше повторных заказов' },
      { group: 'Контроль и рост продаж', t: 'Возврат ушедших клиентов', d: 'Система находит тех, кто давно не покупал, и запускает персональные напоминания и предложения.', get: 'часть ушедших клиентов возвращается' },
      { group: 'Контроль и рост продаж', t: 'Отчёт по воронке для руководителя', d: 'Конверсия по этапам, менеджерам и каналам — автоматически, без ручной сборки.', get: 'видно, где теряются деньги' },
    ],
    cases: [],
    faq: [
      { q: 'Подойдёт ли небольшой команде продаж?', a: 'Да: чем меньше команда, тем ценнее каждая заявка. Часто достаточно начать со сбора заявок в CRM и черновиков ответов.' },
      { q: 'У нас нет CRM. Это проблема?', a: 'Нет. Поможем выбрать и настроить CRM под ваши процессы или начнём с того, что уже есть: почты, таблиц и мессенджеров.' },
      { q: 'Не отпугнёт ли автоматизация клиентов?', a: 'Нет: автоматизация берёт на себя рутину — первый ответ, напоминания, заполнение CRM. Живой разговор остаётся за менеджером, и у него на это появляется больше времени.' },
    ],
  },
  {
    slug: 'analytics',
    lead: 'Собираем данные из 1С, CRM, банка и таблиц в понятные отчёты, которые обновляются сами. Руководитель видит главное каждый день и может задать вопрос о бизнесе простыми словами, а не ждать отчёта в конце месяца.',
    pains: [
      'Отчёты собирают вручную из нескольких систем',
      'К моменту, когда отчёт готов, данные уже устарели',
      'Цифры в разных отчётах не совпадают',
      'Кассовые разрывы обнаруживаются в последний момент',
      'Непонятно, какие товары и клиенты приносят прибыль',
      'На любой новый вопрос руководителя отчёт готовят днями',
    ],
    variants: [
      { group: 'Для руководителя', t: 'Утренний отчёт в Telegram', d: 'Продажи, остатки, дебиторка и отклонения из 1С и CRM — каждое утро одним сообщением. ИИ отмечает, на что обратить внимание.', get: 'главное о бизнесе за минуту' },
      { group: 'Для руководителя', t: 'Дашборды', d: 'Наглядные панели с ключевыми показателями, которые обновляются автоматически.', get: 'решения на актуальных данных' },
      { group: 'Для руководителя', t: 'Вопросы о бизнесе простыми словами', d: 'Спрашиваете «какие клиенты сократили закупки в этом квартале?» — получаете ответ по данным 1С и CRM.', get: 'ответ за минуту без запроса аналитику' },
      { group: 'Для руководителя', t: 'Контроль отклонений', d: 'Система следит за показателями и сообщает, если что-то пошло не так: просела выручка, выросли остатки, задерживается оплата.', get: 'проблемы видны сразу' },

      { group: 'Финансы', t: 'Управленческая отчётность', d: 'Доходы и расходы, движение денег и план-факт собираются автоматически из 1С и банка.', get: 'финансовая картина без ручных таблиц' },
      { group: 'Финансы', t: 'Платёжный календарь', d: 'Прогноз поступлений и платежей по договорам и счетам, возможные кассовые разрывы видны заранее.', get: 'кассовый разрыв виден за недели, а не за день' },
      { group: 'Финансы', t: 'Долги клиентов и поставщикам', d: 'Отчёт по задолженностям с просрочками, суммами и ответственными — всегда актуальный.', get: 'долги под контролем' },

      { group: 'Продажи и склад', t: 'Аналитика продаж', d: 'Продажи по клиентам, товарам, менеджерам и регионам — с динамикой и сравнением периодов.', get: 'понятно, что растёт, а что проседает' },
      { group: 'Продажи и склад', t: 'Анализ ассортимента', d: 'Какие товары приносят прибыль, а какие долго лежат на складе и замораживают деньги.', get: 'понятно, что развивать, а что выводить' },
      { group: 'Продажи и склад', t: 'Прогноз продаж и остатков', d: 'Прогноз на ближайшие недели с учётом сезонности — и подсказки, где может возникнуть дефицит.', get: 'меньше дефицита и лишних остатков' },

      { group: 'Производство и регулярные отчёты', t: 'План-факт производства', d: 'Выполнение плана по участкам и заказам в реальном времени — по данным учёта в цехе.', get: 'отставание видно в тот же день' },
      { group: 'Производство и регулярные отчёты', t: 'Регулярные отчёты без ручной сборки', d: 'Отчёты для собственника, банка или отделов формируются по расписанию и приходят на почту или в Telegram.', get: 'время сотрудников уходит на анализ, а не на сборку' },
    ],
    cases: ['qr-workshop'],
    faq: [
      { q: 'Нужен ли нам отдельный аналитик?', a: 'Нет. Отчёты обновляются сами, а если понадобится новый показатель — добавим его в рамках поддержки.' },
      { q: 'Из каких систем можно собрать данные?', a: '1С, CRM, Excel и Google Таблицы, банковские выписки, маркетплейсы — всё, откуда данные можно получить выгрузкой или через API.' },
      { q: 'Насколько защищены данные?', a: 'Доступы настраиваем по ролям: каждый видит только свои показатели. При необходимости всё работает на вашем сервере, без передачи данных наружу.' },
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
    lead: 'We bring AI where it delivers measurable value: documents, calls, company knowledge and data. No “AI for the sake of AI” — a specific task with a measured result.',
    pains: [
      'Lots of repetitive text work: emails, documents, customer replies',
      'Contracts and requests have to be read in full to find a couple of numbers',
      'Company knowledge is scattered across folders and people’s heads',
      'Nobody has time to review calls, chats and reviews',
      'Meeting outcomes get lost and tasks are forgotten',
      'Purchasing is planned by gut feeling rather than data',
      'Staff already use AI, but ad hoc and with risks to data',
      'You want AI, but data cannot leave the country',
    ],
    variants: [
      { group: 'Documents & texts', t: 'AI assistant for company documents', d: 'Answers staff questions about policies, instructions, contracts and 1C — with a link to the source.', get: 'new hires ramp up faster, experienced staff are interrupted less' },
      { group: 'Documents & texts', t: 'Data extraction from documents', d: 'AI pulls details, amounts, dates and terms from contracts, requests and specifications — into a table or straight into 1C.', get: 'data from hundreds of documents in minutes' },
      { group: 'Documents & texts', t: 'Contract review against a checklist', d: 'AI compares a contract with your standards and highlights clauses worth a closer look. The decision stays with your lawyer.', get: 'lawyers spend time only on disputed clauses' },
      { group: 'Documents & texts', t: 'Drafting standard texts', d: 'Proposals, emails, product descriptions and replies — from templates and in your company’s voice. Staff edit and send.', get: 'standard texts in minutes' },

      { group: 'Calls & communication', t: 'Call analysis', d: 'Every call is transcribed and checked against the script, reasons for lost deals are visible, and the summary goes into the CRM automatically.', get: 'every call reviewed, not a sample' },
      { group: 'Calls & communication', t: 'Inbound email and request triage', d: 'AI detects the topic and urgency of each email, drafts a reply and routes it to the right person.', get: 'no request gets lost' },
      { group: 'Calls & communication', t: 'Meeting minutes', d: 'A meeting recording becomes short minutes with decisions, tasks and deadlines; tasks go to your tracker.', get: 'everyone has the outcome right after the meeting' },
      { group: 'Calls & communication', t: 'Customer feedback analysis', d: 'AI sorts reviews, complaints and questions by topic and shows what customers care about most.', get: 'clear what to improve first' },

      { group: 'Forecasts & control', t: 'Demand and purchase forecasting', d: 'Based on sales history and seasonality, the system forecasts demand and suggests what and how much to order.', get: 'fewer shortages and less excess stock' },
      { group: 'Forecasts & control', t: 'Error and anomaly detection', d: 'AI scans documents and transactions and flags anything suspicious: duplicates, unusual amounts, deviations from the norm.', get: 'errors caught before they become problems' },

      { group: 'Security & team', t: 'AI on your own server', d: 'For sensitive data — models running inside your company, with no data leaving it.', get: 'AI without compromising data protection' },
      { group: 'Security & team', t: 'Choosing and setting up AI tools', d: 'We help pick off-the-shelf AI services for your tasks and set up access and data rules.', get: 'your team uses AI legally and safely' },
      { group: 'Security & team', t: 'Team training', d: 'A hands-on workshop on your company’s tasks: how to use AI safely and productively every day.', get: 'a team that uses AI with confidence' },
    ],
    cases: [],
    faq: [
      { q: 'How far can we trust AI answers?', a: 'The system doesn’t guess: if data is missing or something doesn’t add up, it hands the question to a person. Doubtful cases are always reviewed by a human.' },
      { q: 'Which models do you use?', a: 'We choose for the task and your data requirements: from API models to local ones on your server. The model can be swapped if requirements change.' },
      { q: 'Can we try it first?', a: 'Yes. We start with a pilot on one process and real data, with success criteria agreed upfront. You can get a feel for the approach right now in the demo on our site.' },
    ],
  },
  {
    slug: 'integrations',
    lead: 'We connect 1C, CRM, bank, e-invoicing, website, messengers, telephony, marketplaces and delivery services so data flows on its own. The same numbers for every department — no manual copying or duplicates.',
    pains: [
      'The same data is entered into several systems',
      'Numbers in the CRM and 1C differ, and it’s unclear which to trust',
      'Bank statements and payment orders are uploaded by hand',
      'Documents with counterparties travel by email and courier',
      'Requests from the website and messengers land in different places',
      'Managers don’t see who is calling or what was agreed before',
      'Marketplace orders are retyped into 1C and stock updates late',
    ],
    variants: [
      { group: 'Accounting & finance', t: '1C ↔ CRM', d: 'Customers, deals, invoices and payments sync automatically: sales see in the CRM everything accounting knows.', get: 'one customer base for sales and accounting' },
      { group: 'Accounting & finance', t: '1C ↔ bank', d: 'Statements arrive in 1C on their own and payment orders go to the bank without exporting and uploading files.', get: 'payments and statements without manual work' },
      { group: 'Accounting & finance', t: '1C ↔ e-invoicing', d: 'Invoices, acts and delivery notes are sent to and received from counterparties via e-document exchange right from 1C.', get: 'documents without paper or forwarding' },
      { group: 'Accounting & finance', t: 'Linking several 1C databases', d: 'Production, accounting and payroll exchange data by clear rules; every number has a single source.', get: 'no mismatches between databases' },

      { group: 'Communication channels', t: 'Website and forms → CRM', d: 'Requests from the website and landing pages reach the CRM with their source, ad campaign and history.', get: 'see where customers come from' },
      { group: 'Communication channels', t: 'Messengers ↔ CRM', d: 'Telegram, Viber and WhatsApp chats run from the CRM and are saved in the customer record.', get: 'the whole conversation history in one place' },
      { group: 'Communication channels', t: 'Telephony ↔ CRM', d: 'An incoming call opens the customer record; recordings and missed calls are saved in the CRM.', get: 'managers know who is calling before they answer' },
      { group: 'Communication channels', t: 'Email ↔ CRM', d: 'Customer emails attach to deals and contacts automatically; nothing is lost in personal inboxes.', get: 'correspondence doesn’t leave with an employee' },

      { group: 'Commerce & logistics', t: '1C ↔ website', d: 'Catalogue, stock, prices and orders sync automatically in both directions.', get: 'always up-to-date stock on the website' },
      { group: 'Commerce & logistics', t: '1C ↔ marketplaces', d: 'Wildberries and Ozon stock, prices and orders sync with 1C, and sales reports load automatically.', get: 'marketplace orders without manual entry' },
      { group: 'Commerce & logistics', t: '1C ↔ delivery services', d: 'Delivery requests are created from the order; statuses and tracking numbers flow back to 1C and the CRM.', get: 'delivery status visible in the system' },

      { group: 'Data & spreadsheets', t: 'A single data store for reporting', d: 'Data from all systems is gathered in one place and refreshed on schedule — the foundation for analytics.', get: 'reports built on the same numbers' },
      { group: 'Data & spreadsheets', t: 'Excel and Google Sheets ↔ systems', d: 'Spreadsheets your staff are used to update from 1C and the CRM automatically — and vice versa.', get: 'familiar spreadsheets without copy-paste' },
    ],
    cases: ['qr-workshop'],
    faq: [
      { q: 'Do you work with our CRM?', a: 'We connect through each system’s API and standard exchange tools — for example Bitrix24, amoCRM, 1C. We will go through your specific setup on a consultation.' },
      { q: 'How long does an integration take?', a: 'It depends on the systems and data volume: simple links are quick, complex ones are done in stages. We will give an exact timeline after a consultation, once we see your systems.' },
      { q: 'What if the exchange fails?', a: 'Exchanges run with checks and a log: if something doesn’t go through, the system alerts the person in charge and no data is lost. Support can be provided under contract.' },
    ],
  },
  {
    slug: 'chatbots',
    lead: 'We build bots and AI assistants for customers, sales and staff: they answer questions, take requests, book appointments, send reminders and find information — around the clock and in your company’s voice. You are already looking at an example: the assistant at the bottom of this page.',
    pains: [
      'Managers spend time on the same questions over and over',
      'Customers write in the evening and at weekends and get answers in the morning',
      'Booking and confirming appointments takes administrators hours',
      'Requests arrive vague, and managers spend time clarifying them',
      'Staff interrupt each other with “where do I find” and “how do I” questions',
      'Field staff report by phone calls and photos in personal chats',
    ],
    variants: [
      { group: 'For customers', t: 'AI assistant for your website', d: 'Answers visitors from your company materials, helps them choose and leads to a request — like the assistant on our site.', get: 'answers and requests 24/7' },
      { group: 'For customers', t: 'Telegram, Viber and WhatsApp bot', d: 'Takes orders and requests, answers questions and passes complex ones to a manager with the history.', get: 'managers get only what needs a human' },
      { group: 'For customers', t: 'Booking and appointments', d: 'Customers choose a service and time themselves, get a reminder and can reschedule without calling.', get: 'fewer no-shows and booking calls' },
      { group: 'For customers', t: 'Order and delivery status', d: 'The bot answers where the order is and when it will arrive — using data from 1C and the delivery service.', get: 'fewer “where is my order” questions' },
      { group: 'For customers', t: 'Support and complaints', d: 'Answers common questions, sends instructions, accepts complaints and puts them into work right away.', get: 'requests aren’t lost, answers come faster' },

      { group: 'For sales', t: 'Lead qualification', d: 'The bot clarifies the task, volume and timing and hands the manager a request that is ready to work on.', get: 'managers talk to people ready to buy' },
      { group: 'For sales', t: 'Catalogue consultant', d: 'Picks a product or service for the customer’s task and answers about availability and specs.', get: 'customers find what they need faster' },
      { group: 'For sales', t: 'Post-purchase feedback', d: 'A few days after purchase the bot asks how it went and passes any problem to the person in charge.', get: 'more reviews, issues spotted early' },

      { group: 'For staff', t: 'Internal help bot', d: 'Answers questions about policies, schedules and instructions and helps file internal requests.', get: 'fewer interruptions, faster answers' },
      { group: 'For staff', t: 'Onboarding bot', d: 'Guides new hires through the first weeks: answers questions, follows a checklist and checks knowledge of policies.', get: 'new hires reach full speed sooner' },
      { group: 'For staff', t: 'Bot for field staff', d: 'Drivers, installers and sales reps send reports, photos and requests from the messenger straight into the system.', get: 'field reports land in the system right away' },

      { group: 'Voice', t: 'Voice assistant', d: 'Handles inbound calls: bookings, order status, common questions. Complex calls are transferred to a person.', get: 'no call goes unanswered' },
      { group: 'Voice', t: 'Automated outbound calls', d: 'Payment and appointment reminders, order confirmations, short surveys — with results recorded in the CRM.', get: 'routine calls without staff involvement' },
    ],
    cases: [],
    faq: [
      { q: 'Customers want to talk to a human. What then?', a: 'The bot handles typical questions and passes anything unusual straight to a manager along with the conversation history. The customer doesn’t have to repeat themselves.' },
      { q: 'What are the bot’s answers based on?', a: 'Your materials: website, catalogue, policies, knowledge base. The bot doesn’t invent terms — if there is no exact answer, it hands the question to a person.' },
      { q: 'Where can the bot work?', a: 'On your website, in Telegram, Viber and WhatsApp, over the phone and inside your CRM. We choose the channels where your customers and staff already are.' },
    ],
  },
  {
    slug: 'sales-automation',
    lead: 'We help you stop losing customers and sell more: requests from every channel land in one place and get a fast answer, managers sell instead of doing routine, and leadership sees the pipeline without manual reports.',
    pains: [
      'Requests come via email, messengers and the website — some get lost',
      'Replies wait for a free manager',
      'Managers spend time filling in the CRM instead of selling',
      'Proposals take hours to prepare',
      'It’s unclear at which stage and why deals fall through',
      'Regular customers stop buying and it’s noticed too late',
      'The sales report is put together by hand once a week',
    ],
    variants: [
      { group: 'Requests & first contact', t: 'Request capture and routing', d: 'Requests from every channel reach the CRM, are sorted by type and assigned to an owner right away.', get: 'no request gets lost' },
      { group: 'Requests & first contact', t: 'Instant first reply', d: 'The customer immediately gets an answer and a clear next step — even at night and at weekends.', get: 'customers don’t leave for competitors while waiting' },
      { group: 'Requests & first contact', t: 'Lead qualification', d: 'The system clarifies the task, volume and timing and hands the manager a request ready to work on.', get: 'less time spent clarifying' },
      { group: 'Requests & first contact', t: 'Customer history and duplicates', d: 'On a new request the system finds the customer, shows their purchase history and merges duplicates.', get: 'managers have context from the start' },

      { group: 'Manager’s work', t: 'Draft replies to customers', d: 'AI drafts a reply to a typical request using the customer’s history — the manager reviews and sends.', get: 'faster response to requests' },
      { group: 'Manager’s work', t: 'Proposals on request', d: 'A proposal is assembled from the catalogue and company terms for the customer’s request; the manager just reviews it.', get: 'the proposal goes out within the hour' },
      { group: 'Manager’s work', t: 'A CRM that fills itself in', d: 'Call and email outcomes, agreements and next steps are recorded in the deal automatically.', get: 'managers sell instead of filling in records' },
      { group: 'Manager’s work', t: 'Reminders and pipeline control', d: 'The system reminds about next steps, stalled deals and unpaid invoices.', get: 'deals don’t stall' },

      { group: 'Control & growth', t: 'Call and chat analysis', d: 'Conversations checked against the script, reasons for lost deals and hints where deals are lost.', get: 'clear what to improve in sales' },
      { group: 'Control & growth', t: 'Repeat sales', d: 'From purchase history the system suggests which customers are due to reorder and prepares an offer.', get: 'more repeat orders' },
      { group: 'Control & growth', t: 'Win back lapsed customers', d: 'The system finds customers who haven’t bought in a while and starts personal reminders and offers.', get: 'some lapsed customers come back' },
      { group: 'Control & growth', t: 'Pipeline report for leadership', d: 'Conversion by stage, manager and channel — automatically, without manual assembly.', get: 'see where money is lost' },
    ],
    cases: [],
    faq: [
      { q: 'Does it suit a small sales team?', a: 'Yes: the smaller the team, the more each request is worth. Often it’s enough to start with capturing requests in a CRM and draft replies.' },
      { q: 'We don’t have a CRM. Is that a problem?', a: 'No. We will help choose and set up a CRM for your processes, or start with what you have: email, spreadsheets and messengers.' },
      { q: 'Won’t automation put customers off?', a: 'No: automation takes the routine — the first reply, reminders, CRM updates. The real conversation stays with the manager, who now has more time for it.' },
    ],
  },
  {
    slug: 'analytics',
    lead: 'We bring data from 1C, CRM, the bank and spreadsheets into clear reports that update themselves. Leadership sees what matters every day and can ask questions about the business in plain words instead of waiting for a month-end report.',
    pains: [
      'Reports are assembled by hand from several systems',
      'By the time a report is ready, the data is out of date',
      'Numbers in different reports don’t match',
      'Cash gaps are discovered at the last moment',
      'It’s unclear which products and customers bring profit',
      'Any new question from leadership takes days to answer',
    ],
    variants: [
      { group: 'For leadership', t: 'Morning report in Telegram', d: 'Sales, stock, receivables and deviations from 1C and CRM — every morning in one message. AI flags what needs attention.', get: 'the essentials about the business in a minute' },
      { group: 'For leadership', t: 'Dashboards', d: 'Clear panels with key metrics that update automatically.', get: 'decisions based on current data' },
      { group: 'For leadership', t: 'Business questions in plain words', d: 'Ask “which customers cut their orders this quarter?” and get an answer from 1C and CRM data.', get: 'an answer in a minute without asking an analyst' },
      { group: 'For leadership', t: 'Deviation alerts', d: 'The system watches metrics and alerts you when something goes wrong: revenue dips, stock grows, a payment is late.', get: 'problems are visible immediately' },

      { group: 'Finance', t: 'Management reporting', d: 'Income and expenses, cash flow and plan vs actual are assembled automatically from 1C and the bank.', get: 'the financial picture without manual spreadsheets' },
      { group: 'Finance', t: 'Payment calendar', d: 'A forecast of incoming and outgoing payments from contracts and invoices; possible cash gaps are visible in advance.', get: 'cash gaps visible weeks ahead, not a day' },
      { group: 'Finance', t: 'Receivables and payables', d: 'An always-current report on debts with overdue items, amounts and owners.', get: 'debts under control' },

      { group: 'Sales & warehouse', t: 'Sales analytics', d: 'Sales by customer, product, manager and region — with trends and period comparisons.', get: 'clear what is growing and what is slipping' },
      { group: 'Sales & warehouse', t: 'Assortment analysis', d: 'Which products bring profit and which sit in the warehouse tying up money.', get: 'clear what to develop and what to drop' },
      { group: 'Sales & warehouse', t: 'Sales and stock forecast', d: 'A forecast for the coming weeks with seasonality — and hints where shortages may occur.', get: 'fewer shortages and less excess stock' },

      { group: 'Production & regular reports', t: 'Production plan vs actual', d: 'Plan completion by site and order in real time — from shop-floor tracking data.', get: 'delays visible the same day' },
      { group: 'Production & regular reports', t: 'Scheduled reports without manual work', d: 'Reports for owners, banks or departments are generated on schedule and arrive by email or Telegram.', get: 'staff time goes to analysis, not assembly' },
    ],
    cases: ['qr-workshop'],
    faq: [
      { q: 'Do we need a dedicated analyst?', a: 'No. Reports update themselves, and if you need a new metric we add it as part of support.' },
      { q: 'Which systems can data come from?', a: '1C, CRM, Excel and Google Sheets, bank statements, marketplaces — anything that offers an export or an API.' },
      { q: 'How secure is the data?', a: 'Access is role-based: everyone sees only their own metrics. If needed, everything runs on your own server with no data leaving it.' },
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
