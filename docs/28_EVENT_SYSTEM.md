28_EVENT_SYSTEM

1. Назначение документа

EVENT_SYSTEM описывает внутреннюю событийную систему приложения.

События используются для того, чтобы отдельные модули могли реагировать на изменения в системе без прямой жёсткой связи друг с другом.

Главный принцип:

модуль сообщает, что произошло, а заинтересованные модули самостоятельно решают, нужно ли им на это реагировать.

⸻

2. Зачем нужен EVENT_SYSTEM

Без событийной архитектуры может появиться цепочка:

Content Service

→ напрямую вызывает Analytics

→ напрямую вызывает Pattern Engine

→ напрямую вызывает Recommendation Engine

→ напрямую вызывает Memory

→ напрямую вызывает Notification.

Такая система быстро становится хрупкой.

Событийная модель позволяет вместо этого сделать:

Content Service

→ CONTENT_CREATED

а дальше:

Analytics слушает событие

Pattern Engine слушает событие

Memory при необходимости слушает событие.

⸻

3. EVENT VS API

API отвечает на вопрос:

«Сделай это для меня».

Event отвечает:

«Это произошло».

Например:

API:

POST /recommendations/{id}/decision

Event:

USER_DECISION_CREATED

⸻

4. EVENT PRINCIPLE

Событие должно описывать факт, а не команду.

Правильно:

CONTENT_PUBLISHED

Неправильно:

CALCULATE_PATTERN_NOW

Потому что второе является command, а не событием.

⸻

5. COMMAND VS EVENT

COMMAND

Кто-то просит систему что-то сделать.

Например:

START_SYNC

EVENT

Система сообщает, что действие произошло.

Например:

SYNC_COMPLETED

Это различие должно сохраняться во всей архитектуре.

⸻

6. EVENT STRUCTURE

Каждое событие должно иметь стандартную структуру.

Например:

{
  "event_id": "evt_001",
  "event_type": "CONTENT_CREATED",
  "event_version": 1,
  "occurred_at": "2026-08-11T12:00:00Z",
  "user_id": "user_123",
  "entity_type": "content",
  "entity_id": "content_456",
  "payload": {}
}

⸻

7. EVENT_ID

Каждое событие имеет уникальный event_id.

Он используется для:

* deduplication;
* tracing;
* debugging;
* audit.

⸻

8. EVENT_VERSION

Структура события должна иметь version.

Например:

CONTENT_CREATED v1

Позже:

CONTENT_CREATED v2.

Это позволяет изменять payload без разрушения старых consumers.

⸻

9. OCCURRED_AT

occurred_at показывает, когда событие произошло в предметном мире.

Это отличается от:

processed_at

который показывает, когда система обработала событие.

⸻

10. SOURCE

По возможности событие должно содержать источник:

* internal;
* external_platform;
* user;
* system;
* AI.

⸻

11. CORRELATION_ID

События, возникшие в рамках одного пользовательского действия или pipeline run, должны иметь возможность связываться через correlation_id.

Например:

USER_DECISION

→ ACTION_CREATED

→ CONTENT_PUBLISHED

→ PERFORMANCE_UPDATED.

⸻

12. CAUSATION_ID

При необходимости событие может ссылаться на событие, которое его вызвало.

Например:

PERFORMANCE_UPDATED

может иметь:

causation_id = CONTENT_PUBLISHED.

Это помогает восстанавливать цепочку событий.

⸻

13. EVENT CATEGORIES

События логически делятся на:

* USER;
* ACCOUNT;
* CONTENT;
* PERFORMANCE;
* ANALYTICS;
* KNOWLEDGE;
* RECOMMENDATION;
* DECISION;
* ACTION;
* OUTCOME;
* SYSTEM.

⸻

14. USER EVENTS

Основные:

USER_CREATED

USER_UPDATED

USER_SETTINGS_UPDATED

USER_DEACTIVATED

⸻

15. GOAL EVENTS

GOAL_CREATED

GOAL_UPDATED

GOAL_ARCHIVED

GOAL_PRIORITY_CHANGED

⸻

16. ACCOUNT EVENTS

EXTERNAL_ACCOUNT_CONNECTED

EXTERNAL_ACCOUNT_DISCONNECTED

EXTERNAL_ACCOUNT_SYNC_STARTED

EXTERNAL_ACCOUNT_SYNC_COMPLETED

EXTERNAL_ACCOUNT_SYNC_FAILED

⸻

17. CONTENT EVENTS

CONTENT_DISCOVERED

CONTENT_CREATED

CONTENT_UPDATED

CONTENT_PUBLISHED

CONTENT_DELETED

CONTENT_ANALYSIS_STARTED

CONTENT_ANALYSIS_COMPLETED

CONTENT_ANALYSIS_FAILED

⸻

18. PERFORMANCE EVENTS

PERFORMANCE_RECEIVED

PERFORMANCE_UPDATED

PERFORMANCE_SNAPSHOT_CREATED

METRIC_UNAVAILABLE

METRIC_RESTORED

⸻

19. BASELINE EVENTS

BASELINE_CALCULATION_STARTED

BASELINE_UPDATED

BASELINE_RECALCULATION_REQUIRED

⸻

20. PATTERN EVENTS

PATTERN_DETECTED

PATTERN_CONFIDENCE_CHANGED

PATTERN_CONFIRMED

PATTERN_DECLINING

PATTERN_DEACTIVATED

PATTERN_REACTIVATED

⸻

21. HYPOTHESIS EVENTS

HYPOTHESIS_CREATED

HYPOTHESIS_TEST_STARTED

HYPOTHESIS_TEST_COMPLETED

HYPOTHESIS_CONFIRMED

HYPOTHESIS_REJECTED

⸻

22. SKELETON EVENTS

SKELETON_UPDATED

SKELETON_REBUILT

SKELETON_VERSION_CREATED

⸻

23. RECOMMENDATION EVENTS

RECOMMENDATION_GENERATION_STARTED

RECOMMENDATION_CREATED

RECOMMENDATION_UPDATED

RECOMMENDATION_EXPIRED

RECOMMENDATION_INVALIDATED

⸻

24. DECISION EVENTS

USER_DECISION_CREATED

USER_DECISION_CHANGED

ALTERNATIVE_SELECTED

RECOMMENDATION_ACCEPTED

RECOMMENDATION_REJECTED

⸻

25. ACTION EVENTS

ACTION_CREATED

ACTION_STARTED

ACTION_COMPLETED

ACTION_FAILED

ACTION_CANCELLED

⸻

26. OUTCOME EVENTS

OUTCOME_RECEIVED

OUTCOME_UPDATED

OUTCOME_FINALIZED

⸻

27. LEARNING EVENTS

KNOWLEDGE_UPDATE_STARTED

KNOWLEDGE_UPDATED

MEMORY_CREATED

MEMORY_UPDATED

LEARNING_SIGNAL_DETECTED

⸻

28. SYSTEM EVENTS

JOB_CREATED

JOB_STARTED

JOB_COMPLETED

JOB_FAILED

DATA_REPROCESSING_STARTED

DATA_REPROCESSING_COMPLETED

ANALYSIS_RUN_STARTED

ANALYSIS_RUN_COMPLETED

⸻

29. EVENT FLOW: NEW CONTENT

Когда появляется новая публикация:

CONTENT_DISCOVERED

↓

CONTENT_CREATED

↓

CONTENT_ANALYSIS_STARTED

↓

CONTENT_ANALYSIS_COMPLETED

⸻

30. EVENT FLOW: PERFORMANCE

После получения новых метрик:

PERFORMANCE_RECEIVED

↓

PERFORMANCE_UPDATED

↓

PERFORMANCE_SNAPSHOT_CREATED

↓

в зависимости от изменений:

BASELINE_RECALCULATION_REQUIRED

или

PATTERN_ANALYSIS_REQUIRED.

⸻

31. EVENT FLOW: RECOMMENDATION

Когда Decision Engine создаёт новую рекомендацию:

RECOMMENDATION_GENERATION_STARTED

↓

RECOMMENDATION_CREATED

↓

Frontend получает актуальную recommendation.

⸻

32. EVENT FLOW: USER ACCEPTS

Пользователь принимает recommendation:

USER_DECISION_CREATED

↓

RECOMMENDATION_ACCEPTED

↓

ACTION_CREATED

⸻

33. EVENT FLOW: USER REJECTS

Пользователь отклоняет recommendation:

USER_DECISION_CREATED

↓

RECOMMENDATION_REJECTED

При этом система не должна автоматически считать recommendation плохой.

Отклонение может быть вызвано:

* личным предпочтением;
* обстоятельствами;
* отсутствием времени;
* уже запланированным контентом;
* несогласием с предложением.

⸻

34. USER DECISION AS SIGNAL

Решение пользователя является потенциальным сигналом для learning system.

Но:

decision ≠ objective performance result.

Например:

пользователь постоянно выбирает carousel.

Это может быть preference.

Но это не означает автоматически, что carousel объективно работает лучше.

⸻

35. EVENT FLOW: ACTION

После принятого решения:

ACTION_CREATED

↓

ACTION_STARTED

↓

ACTION_COMPLETED

или:

ACTION_FAILED.

⸻

36. EVENT FLOW: OUTCOME

После публикации:

OUTCOME_RECEIVED

↓

PERFORMANCE_UPDATED

↓

KNOWLEDGE_UPDATE_STARTED

↓

KNOWLEDGE_UPDATED.

⸻

37. EVENT FLOW: LEARNING LOOP

Полный цикл:

RECOMMENDATION_CREATED

↓

USER_DECISION_CREATED

↓

ACTION_COMPLETED

↓

OUTCOME_RECEIVED

↓

PERFORMANCE_UPDATED

↓

PATTERN_ANALYSIS

↓

KNOWLEDGE_UPDATED

↓

RECOMMENDATION_GENERATION.

⸻

38. EVENT CONSUMERS

Один event может иметь несколько consumers.

Например:

PERFORMANCE_UPDATED

могут слушать:

* Analytics;
* Baseline Engine;
* Pattern Engine;
* Monitoring;
* Learning System.

⸻

39. LOOSE COUPLING

Producer не должен знать всех consumers.

Например Performance Service не должен содержать:

callPatternEngine()

callRecommendationEngine()

callMemoryEngine().

Он просто публикует:

PERFORMANCE_UPDATED.

⸻

40. EVENT DELIVERY

В зависимости от инфраструктуры события могут передаваться через:

* message queue;
* event broker;
* internal event bus.

Конкретный технологический выбор определяется в технической реализации.

Архитектурный принцип от этого не меняется.

⸻

41. AT_LEAST_ONCE

Для большинства внутренних событий предпочтительна модель:

at least once delivery.

Это означает, что consumer должен быть готов получить одно и то же событие больше одного раза.

⸻

42. IDEMPOTENT CONSUMERS

Каждый важный consumer должен быть idempotent.

Например если:

PERFORMANCE_UPDATED

пришёл дважды,

это не должно создать два одинаковых baseline updates.

⸻

43. EVENT_DEDUPLICATION

Для deduplication может использоваться:

event_id.

Consumer хранит информацию о уже обработанных событиях.

⸻

44. ORDERING

Не все события требуют глобального порядка.

Но для одного entity или aggregate порядок может быть критичен.

Например:

CONTENT_CREATED

должно логически предшествовать:

CONTENT_UPDATED.

⸻

45. EVENTUAL_CONSISTENCY

После события некоторые части системы могут обновиться не мгновенно.

Например:

PERFORMANCE_UPDATED

произошло сейчас,

а:

PATTERN_UPDATED

через несколько секунд.

Это допустимо.

Frontend должен понимать состояние:

analytics update pending.

⸻

46. RETRIES

Если consumer временно недоступен, событие должно быть повторно обработано.

Retry policy должна иметь:

* maximum attempts;
* backoff;
* failure state.

⸻

47. DEAD_LETTER_QUEUE

События, которые невозможно обработать после нескольких попыток, должны попадать в dead-letter state.

Это позволяет:

* диагностировать проблему;
* повторить обработку после исправления;
* не блокировать остальные события.

⸻

48. POISON EVENTS

Если конкретное событие постоянно ломает consumer, оно не должно бесконечно блокировать очередь.

Оно переводится в отдельное состояние для диагностики.

⸻

49. EVENT LOG

Критические события желательно сохранять.

Это создаёт audit trail.

Можно восстановить:

что произошло → когда → с каким entity → в рамках какого процесса.

⸻

50. EVENT RETENTION

Не каждое техническое событие обязано храниться вечно.

Но события, необходимые для:

* audit;
* debugging;
* reproducibility;
* learning history;

должны иметь соответствующую retention policy.

⸻

51. DOMAIN EVENTS

Особенно важны domain events.

Они описывают реальные изменения предметной области:

RECOMMENDATION_CREATED

USER_DECISION_CREATED

OUTCOME_RECEIVED

PATTERN_CONFIRMED.

⸻

52. TECHNICAL EVENTS

Технические события описывают инфраструктуру:

JOB_STARTED

JOB_FAILED

SYNC_TIMEOUT.

Они не должны смешиваться с domain events без необходимости.

⸻

53. EVENT PAYLOAD

Payload должен содержать достаточно информации, чтобы consumer мог понять событие.

Но он не должен превращаться в копию всей базы данных.

⸻

54. EVENT REFERENCES

Для больших объектов лучше передавать reference:

entity_id

вместо полного объекта.

Consumer при необходимости получает актуальные данные через internal API или repository layer.

⸻

55. IMMUTABILITY

После публикации событие не должно изменяться.

Если произошло новое состояние:

создаётся новое событие.

Например:

не изменять:

PERFORMANCE_UPDATED

а создать:

PERFORMANCE_UPDATED с новым event_id.

⸻

56. EVENT SCHEMA REGISTRY

При масштабировании желательно иметь централизованное описание:

* event name;
* version;
* payload;
* producer;
* consumers.

Это снижает риск несовместимых изменений.

⸻

57. EVENT DOCUMENTATION

Каждое критическое событие должно иметь описание:

Name

название.

Meaning

что оно означает.

Producer

кто создаёт.

Consumers

кто может реагировать.

Payload

какие данные передаются.

Version

версия.

⸻

58. EVENT SECURITY

События не должны содержать:

* passwords;
* access tokens;
* refresh tokens;
* ненужные персональные данные;
* секреты.

⸻

59. USER ISOLATION

Consumer должен уважать user_id.

Нельзя обработать event одного пользователя в контексте другого.

⸻

60. EVENT OBSERVABILITY

Для каждого event желательно иметь:

* event_id;
* correlation_id;
* processing status;
* processing duration;
* retry count;
* consumer;
* error information.

⸻

61. EVENT MONITORING

Внутренний monitoring должен показывать:

* количество событий;
* задержку;
* failed events;
* retry rate;
* dead-letter events;
* consumer health.

⸻

62. MVP EVENT SYSTEM

Для MVP не нужен огромный event catalog.

Минимально достаточно:

CONTENT

CONTENT_CREATED

CONTENT_UPDATED

PERFORMANCE

PERFORMANCE_UPDATED

ANALYTICS

BASELINE_UPDATED

PATTERN_UPDATED

RECOMMENDATION

RECOMMENDATION_CREATED

USER

USER_DECISION_CREATED

ACTION

ACTION_COMPLETED

OUTCOME

OUTCOME_RECEIVED

LEARNING

KNOWLEDGE_UPDATED

⸻

63. MVP FLOW

Минимальный рабочий цикл:

CONTENT_CREATED

↓

PERFORMANCE_UPDATED

↓

BASELINE_UPDATED

↓

PATTERN_UPDATED

↓

RECOMMENDATION_CREATED

↓

USER_DECISION_CREATED

↓

ACTION_COMPLETED

↓

OUTCOME_RECEIVED

↓

KNOWLEDGE_UPDATED.

⸻

64. ЧТО НЕ НУЖНО ДЕЛАТЬ В MVP

Не нужно сразу создавать:

* сотни event types;
* сложную распределённую event mesh;
* глобальную event choreography;
* сложную streaming infrastructure.

Сначала нужен простой и надёжный event mechanism.

⸻

65. EVENTUAL EVOLUTION

По мере роста можно перейти от простого internal event bus к:

* message broker;
* distributed queues;
* streaming;
* отдельным consumers;
* event replay.

Архитектура должна позволять это сделать без переписывания domain logic.

⸻

66. EVENT REPLAY

Для аналитических и learning events желательно иметь возможность повторно проиграть историю.

Например после исправления Pattern Engine:

старые:

PERFORMANCE_UPDATED

могут быть replayed.

Новый Pattern Engine пересчитает knowledge.

⸻

67. EVENT SOURCING

Полный Event Sourcing не требуется для MVP.

Система может использовать обычную database как source of record и event log как механизм коммуникации и аудита.

⸻

68. EVENT VS DATABASE

Database хранит:

текущее и историческое состояние.

Event system сообщает:

что изменилось.

Они дополняют друг друга.

⸻

69. EVENT VS MEMORY

Memory хранит:

что система знает или считает важным.

Events фиксируют:

какие изменения привели к этому знанию.

⸻

70. EVENT VS DATA PIPELINE

Data Pipeline отвечает за:

обработку данных.

Event System отвечает за:

сигнализацию о произошедших изменениях и запуск зависимых процессов.

⸻

71. EVENT VS DECISION ENGINE

Decision Engine принимает решение.

Event System сообщает:

решение создано

или:

решение было принято пользователем.

⸻

72. PRINCIPLE OF MINIMAL DEPENDENCY

Если модуль может работать через событие, не следует создавать прямую зависимость без необходимости.

Это сохраняет архитектуру расширяемой.

⸻

73. PRINCIPLE OF EXPLICIT OWNERSHIP

Каждое событие должно иметь одного понятного producer.

Несколько разных модулей не должны независимо публиковать событие с одинаковым смыслом.

⸻

74. PRINCIPLE OF TRACEABILITY

Любое критическое событие должно быть трассируемым:

кто → что → когда → почему → какой результат.

⸻

75. Финальная архитектурная схема

DOMAIN ACTION

↓

DOMAIN EVENT

↓

EVENT BUS

↓

MULTIPLE CONSUMERS

↓

Analytics

Knowledge

Recommendation

Monitoring

Memory

и другие необходимые модули.

⸻

76. Главный принцип EVENT_SYSTEM

Событие не говорит системе, что делать. Оно сообщает системе, что произошло.

Это позволяет каждому модулю оставаться относительно независимым.

⸻

77. Финальный принцип

Вся интеллектуальная петля приложения должна постепенно выглядеть так:

DATA

→ EVENT

→ ANALYSIS

→ KNOWLEDGE

→ DECISION

→ USER ACTION

→ OUTCOME

→ EVENT

→ LEARNING

→ NEW KNOWLEDGE

→ NEW DECISION

Именно эта событийная петля позволяет приложению развиваться как системе, не превращаясь в монолит, где любое новое правило требует переписывать всё приложение.