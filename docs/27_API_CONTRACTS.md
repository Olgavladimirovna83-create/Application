27_API_CONTRACTS

1. Назначение документа

API_CONTRACTS определяет правила взаимодействия между frontend, backend, аналитическими модулями, Decision Engine, Data Pipeline, внешними платформами и другими внутренними сервисами.

Главный принцип:

каждый модуль должен понимать, какие данные он получает, какие данные возвращает и что гарантируется при этом взаимодействии.

API contract является границей ответственности между компонентами.

⸻

2. Основной принцип API

API не должно описывать внутреннюю реализацию модуля.

Другой компонент должен знать:

* что отправить;
* что получит;
* какие ошибки возможны;
* какие поля обязательны;
* какая версия контракта используется.

Он не должен знать, как именно внутри модуля был получен результат.

⸻

3. API LAYERS

Архитектурно выделяются:

CLIENT API

Frontend → Backend.

INTERNAL API

Backend module → Backend module.

EXTERNAL API

Backend → внешняя платформа.

ANALYTICS API

Backend → Analytics / Decision Engine.

AI API

Backend → AI services.

⸻

4. CLIENT API

Frontend взаимодействует преимущественно с backend API.

Frontend не должен самостоятельно:

* вычислять baseline;
* определять patterns;
* принимать recommendation;
* обращаться напрямую к базе данных;
* хранить секретные API credentials.

⸻

5. AUTHENTICATION

Каждый защищённый API request должен быть связан с authenticated user context.

Backend должен самостоятельно определять:

user_id

из безопасного authentication context.

Нельзя доверять user_id, переданному клиентом, если он противоречит authenticated identity.

⸻

6. AUTHORIZATION

Authentication отвечает на вопрос:

кто пользователь?

Authorization отвечает:

что ему разрешено?

Каждый endpoint должен проверять authorization.

⸻

7. API VERSIONING

API должно иметь версию.

Например:

/api/v1/...

Изменения, несовместимые со старым контрактом, должны приводить к новой версии.

⸻

8. REQUEST FORMAT

Для стандартных JSON endpoints:

* Content-Type: application/json

Поля должны иметь стабильные типы.

Например число не должно иногда приходить как:

42

а иногда как:

"42".

⸻

9. RESPONSE FORMAT

Успешный response должен иметь предсказуемую структуру.

Например:

{
  "data": {},
  "meta": {}
}

Для списка:

{
  "data": [],
  "meta": {}
}

⸻

10. ERROR FORMAT

Ошибки должны иметь единый формат.

Например:

{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Request validation failed",
    "details": {}
  }
}

Frontend не должен зависеть от текста message для определения логики.

Для логики используется стабильный code.

⸻

11. ERROR CATEGORIES

Основные категории:

* UNAUTHENTICATED
* FORBIDDEN
* INVALID_REQUEST
* NOT_FOUND
* CONFLICT
* RATE_LIMITED
* EXTERNAL_SERVICE_ERROR
* INTERNAL_ERROR
* DATA_UNAVAILABLE
* PROCESSING_FAILED

⸻

12. IDEMPOTENCY

Операции, которые могут быть повторно отправлены клиентом, должны поддерживать idempotency там, где это необходимо.

Особенно:

* publish;
* sync;
* create action;
* external import.

Повторный request не должен случайно создавать два одинаковых действия.

⸻

13. PAGINATION

Списки должны поддерживать pagination.

Например:

* limit
* cursor

Cursor-based pagination предпочтительнее для больших и постоянно изменяющихся datasets.

⸻

14. FILTERING

API может поддерживать фильтры:

* date range;
* content type;
* topic;
* goal;
* status.

Фильтрация должна выполняться backend, а не только frontend.

⸻

15. SORTING

Сортировка должна быть явно определена.

Например:

published_at_desc

или:

performance_desc.

Нельзя полагаться на случайный порядок базы данных.

⸻

16. USER ENDPOINTS

Пример:

GET /api/v1/me

Возвращает:

* user;
* settings;
* basic account state.

⸻

17. GOALS ENDPOINTS

Получить цели

GET /api/v1/goals

Создать цель

POST /api/v1/goals

Изменить цель

PATCH /api/v1/goals/{goal_id}

Архивировать цель

POST /api/v1/goals/{goal_id}/archive

Каждое изменение цели должно сохраняться в истории.

⸻

18. EXTERNAL ACCOUNTS

Получить аккаунты

GET /api/v1/external-accounts

Подключить аккаунт

POST /api/v1/external-accounts

Отключить аккаунт

POST /api/v1/external-accounts/{id}/disconnect

Credentials не должны возвращаться frontend.

⸻

19. CONTENT API

Список публикаций

GET /api/v1/content

Поддерживает:

* pagination;
* date range;
* content type;
* topic;
* goal-related filters.

Получить публикацию

GET /api/v1/content/{content_id}

⸻

20. PERFORMANCE API

Получить performance

GET /api/v1/content/{content_id}/performance

Response должен позволять увидеть:

* current metrics;
* snapshots;
* measurement timestamps;
* data freshness.

⸻

21. BASELINE API

Baseline является в первую очередь системой, а не пользовательской настройкой.

Поэтому frontend получает read-only представление:

GET /api/v1/analytics/baselines

Backend отвечает за расчёт и версионирование.

⸻

22. PATTERN API

Получить активные patterns

GET /api/v1/analytics/patterns

Можно фильтровать:

* status;
* topic;
* format;
* goal.

⸻

23. PATTERN DETAILS

GET /api/v1/analytics/patterns/{pattern_id}

Ответ должен включать:

* description;
* confidence;
* strength;
* status;
* freshness;
* evidence summary.

⸻

24. PATTERN EVIDENCE

GET /api/v1/analytics/patterns/{pattern_id}/evidence

Позволяет системе показать:

на каких наблюдениях основан вывод.

⸻

25. RECOMMENDATION API

Главный пользовательский endpoint:

GET /api/v1/recommendations/current

Он возвращает текущую recommendation.

Она должна содержать:

* primary candidate;
* alternatives;
* goal;
* confidence;
* reasons;
* relevant evidence summary.

⸻

26. RECOMMENDATION DETAILS

GET /api/v1/recommendations/{recommendation_id}

Возвращает полный контекст recommendation.

⸻

27. RECOMMENDATION CANDIDATES

Backend может вернуть несколько candidates:

{
  "candidate_id": "...",
  "type": "content_format",
  "value": "video",
  "rank": 1,
  "confidence": 0.84
}

Frontend не должен пересчитывать rank самостоятельно.

⸻

28. RECOMMENDATION REASONS

Каждая recommendation должна иметь структурированные reasons.

Например:

{
  "type": "strong_recent_pattern",
  "description": "Recent videos performed above the personal baseline",
  "confidence": 0.87
}

⸻

29. EXPLANATION PRINCIPLE

Explanation должен строиться из structured evidence.

Не следует хранить только заранее сгенерированный красивый текст.

Лучше иметь:

reason data

→ затем

human-readable explanation.

Это позволит изменять стиль объяснения без изменения аналитики.

⸻

30. USER DECISION API

Основной endpoint:

POST /api/v1/recommendations/{id}/decision

Пример типов:

* accepted;
* rejected;
* modified;
* alternative_selected;
* deferred.

⸻

31. DECISION PAYLOAD

Пример:

{
  "decision_type": "alternative_selected",
  "selected_candidate_id": "...",
  "comment": "I prefer carousel for this topic"
}

Comment является дополнительным сигналом и не должен автоматически считаться объективным фактом.

⸻

32. ACTION API

После decision может быть создан action.

POST /api/v1/actions

Action должен ссылаться на:

* recommendation;
* decision;
* user;
* content, если оно уже существует.

⸻

33. OUTCOME API

GET /api/v1/actions/{action_id}/outcomes

Позволяет получить результат действия.

⸻

34. SYNC API

Для запуска синхронизации:

POST /api/v1/sync

Request может содержать:

* external account;
* sync scope;
* date range.

⸻

35. SYNC STATUS

После запуска backend возвращает:

* sync_id;
* status.

Frontend может затем запрашивать:

GET /api/v1/sync/{sync_id}

⸻

36. ASYNC OPERATIONS

Долгие операции не должны удерживать HTTP request открытым без необходимости.

Например:

* full sync;
* historical import;
* reanalysis;
* skeleton rebuild.

Вместо этого:

request

→ job_id

→ background processing

→ status endpoint.

⸻

37. JOB STATUS

Основные состояния:

* queued;
* running;
* completed;
* partial;
* failed;
* cancelled.

⸻

38. AI SERVICE CONTRACT

AI module получает структурированный context.

Он не должен напрямую читать database.

Например AI может получить:

* content features;
* relevant patterns;
* user goal;
* recent performance;
* recommendation candidates.

⸻

39. AI RESPONSE

AI response должен по возможности возвращаться в структурированном формате.

Например:

{
  "result": {},
  "confidence": 0.81,
  "model_version": "...",
  "prompt_version": "..."
}

Свободный текст не должен быть единственным результатом AI, если ответ используется системой дальше.

⸻

40. AI CONFIDENCE

Если AI сообщает confidence, это не должно автоматически означать statistical confidence.

Нужно различать:

* model confidence;
* analytical confidence;
* recommendation confidence.

⸻

41. EXTERNAL PLATFORM CONTRACT

External adapters отвечают за преобразование внешнего API в internal schema.

Например:

InstagramAdapter

→ internal Content

TikTokAdapter

→ internal Content.

Основная система не должна зависеть от конкретных внешних полей.

⸻

42. EXTERNAL API ERRORS

Внешние ошибки должны переводиться во внутренние категории.

Например:

external 429

→ RATE_LIMITED

external timeout

→ EXTERNAL_SERVICE_ERROR

⸻

43. RATE LIMITING

Backend должен учитывать ограничения внешних API.

Нельзя бесконтрольно повторять requests.

Должны использоваться:

* retry policy;
* exponential backoff;
* rate limits;
* queueing.

⸻

44. WEBHOOKS

Если внешняя платформа поддерживает webhooks, они могут использоваться для событий.

Webhook endpoint должен:

1. проверить authenticity;
2. принять событие;
3. быстро вернуть acknowledgement;
4. передать дальнейшую обработку в background job.

⸻

45. EVENT API

Внутренние события могут иметь структуру:

{
  "event_type": "OUTCOME_RECEIVED",
  "entity_type": "content",
  "entity_id": "...",
  "occurred_at": "...",
  "payload": {}
}

⸻

46. EVENT_VERSIONING

События также должны иметь version.

Например:

OUTCOME_RECEIVED v1

Если структура изменяется несовместимым образом:

OUTCOME_RECEIVED v2.

⸻

47. DATA_CONTRACTS

Каждый endpoint должен иметь формальное описание:

* request schema;
* response schema;
* required fields;
* optional fields;
* error codes;
* authorization requirements.

Для этого в дальнейшем желательно использовать OpenAPI.

⸻

48. OPENAPI

API documentation должна генерироваться или поддерживаться в OpenAPI-compatible формате.

Это позволяет:

* frontend разработчику понимать backend;
* автоматически генерировать clients;
* валидировать requests;
* уменьшать расхождение между документацией и кодом.

⸻

49. CONTRACT_TESTING

Для критических endpoints должны существовать contract tests.

Они проверяют:

frontend ожидает X

и:

backend действительно возвращает X.

⸻

50. BACKWARD_COMPATIBILITY

Не следует без необходимости менять существующие response fields.

Если новое поле добавляется, старый клиент по возможности должен продолжать работать.

⸻

51. OPTIONAL_FIELDS

Новые поля предпочтительно добавлять как optional, если это возможно.

Удаление или изменение смысла существующего поля требует особой осторожности.

⸻

52. DEPRECATION

Если endpoint или field больше не рекомендуется использовать:

* пометить deprecated;
* сохранить переходный период;
* документировать replacement;
* удалить только после контролируемого migration.

⸻

53. SECURITY_RULE

Никогда не возвращать через обычный API:

* external credentials;
* access tokens;
* refresh tokens;
* internal secrets;
* private infrastructure information.

⸻

54. INPUT_VALIDATION

Frontend validation недостаточна.

Все критические входные данные должны повторно проверяться backend.

⸻

55. RESOURCE_OWNERSHIP

Каждый resource endpoint должен проверять принадлежность объекта пользователю.

Например:

GET /content/{id}

не должен позволять одному пользователю получить content другого пользователя, даже если известен content_id.

⸻

56. AUDITABLE_ACTIONS

Следующие действия желательно логировать:

* recommendation created;
* user decision;
* action created;
* external account connected;
* sync started;
* sync failed;
* important settings changed.

⸻

57. OBSERVABILITY

API requests должны иметь:

* request ID;
* timestamp;
* endpoint;
* execution time;
* status.

Это необходимо для диагностики.

⸻

58. CORRELATION_ID

Один пользовательский запрос может пройти через несколько сервисов.

Например:

Frontend

→ Backend

→ Decision Engine

→ Analytics

→ Database.

Один correlation_id позволяет связать эти операции.

⸻

59. TIMEOUTS

Каждый внешний и внутренний request должен иметь разумный timeout.

Нельзя оставлять requests бесконечно зависшими.

⸻

60. RETRY_POLICY

Retry допустим только там, где операция безопасна для повторения.

Особенно осторожно нужно обращаться с:

* publish;
* payment;
* destructive actions;
* external mutations.

⸻

61. TRANSACTION_BOUNDARIES

Если несколько изменений должны произойти как единая логическая операция, backend должен использовать transaction.

Например создание:

decision

и соответствующей записи истории.

⸻

62. CONSISTENCY

API не должно сообщать пользователю:

«recommendation обновлена»

если соответствующее изменение фактически не сохранено.

Response должен отражать подтверждённое состояние системы.

⸻

63. EVENTUAL_CONSISTENCY

Некоторые аналитические данные могут обновляться асинхронно.

Например после нового performance:

performance updated

но

pattern analysis pending.

Frontend должен уметь отображать такое промежуточное состояние.

⸻

64. STALE_STATE

Если recommendation основана на устаревших данных, backend должен иметь возможность сообщить:

data_freshness = stale

или аналогичный статус.

⸻

65. API НЕ ДОЛЖЕН ПРИДУМЫВАТЬ ДАННЫЕ

Если информация отсутствует:

→ null;

если обработка ещё идёт:

→ соответствующий status;

если источник недоступен:

→ соответствующий error/state.

Нельзя подменять отсутствие данных предположением.

⸻

66. API И USER TRUST

Поскольку приложение принимает решения, связанные с рекомендациями, API должно сохранять:

* source;
* evidence;
* confidence;
* timestamps;
* versions.

Это позволяет объяснить пользователю не только что система рекомендует, но и почему.

⸻

67. MINIMUM MVP API

Для первой версии достаточно реализовать:

USER

GET /me

GOALS

GET /goals

POST /goals

PATCH /goals/{id}

CONTENT

GET /content

GET /content/{id}

PERFORMANCE

GET /content/{id}/performance

ANALYTICS

GET /analytics/baselines

GET /analytics/patterns

RECOMMENDATIONS

GET /recommendations/current

GET /recommendations/{id}

DECISIONS

POST /recommendations/{id}/decision

ACTIONS

POST /actions

OUTCOMES

GET /actions/{id}/outcomes

SYNC

POST /sync

GET /sync/{id}

⸻

68. FUTURE API

Позже можно добавить:

* experiments;
* advanced analytics;
* skeleton;
* memory;
* multi-platform management;
* automated publishing;
* advanced AI tools;
* administration;
* billing;
* team accounts.

⸻

69. Главный принцип API_CONTRACTS

Модули должны быть заменяемыми.

Если сегодня recommendation engine реализован одним способом, а завтра другим, frontend не должен знать об этом.

Он должен продолжать получать один и тот же понятный contract.

⸻

70. Второй главный принцип

API является обещанием между компонентами.

Если контракт нарушается, проблема не должна решаться случайным изменением другого модуля.

Изменение должно быть:

* осознанным;
* документированным;
* версионированным;
* протестированным.

⸻

71. Финальная схема

FRONTEND

↓

CLIENT API

↓

BACKEND

↓

DOMAIN SERVICES

↓

ANALYTICS / DECISION ENGINE / DATA PIPELINE

↓

DATABASE

и параллельно:

BACKEND

↓

EXTERNAL ADAPTERS

↓

EXTERNAL PLATFORMS

⸻

72. Финальный принцип

API должен скрывать сложность системы, а не переносить её на следующий модуль.

Frontend не должен знать, как считается pattern.

Decision Engine не должен знать, как конкретно хранится performance.

Analytics не должна знать, как frontend показывает recommendation.

External platform не должна диктовать внутреннюю структуру базы.

Каждый компонент получает только тот контракт, который ему необходим.

Именно это позволяет сохранять модульную архитектуру и постепенно расширять приложение без необходимости перестраивать уже работающие части системы.