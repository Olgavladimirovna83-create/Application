25_DATABASE_SCHEMA

1. Назначение документа

DATABASE_SCHEMA описывает конкретную структуру хранения данных приложения.

Документ переводит DATA_MODEL и TECHNICAL_ARCHITECTURE на уровень:

какие сущности существуют → какие поля они содержат → как связаны → что является историей → что можно пересчитывать → что нельзя терять.

Главный принцип:

база данных должна хранить фактическую историю системы и пользователя, а вычисляемые знания должны быть связаны с исходными данными, на которых они основаны.

⸻

2. Основные группы данных

База логически делится на семь групп:

USER

пользователь и его цели.

CONTENT

публикации и их характеристики.

PERFORMANCE

результаты публикаций.

KNOWLEDGE

закономерности, гипотезы и память.

RECOMMENDATIONS

решения системы.

DECISIONS

решения пользователя.

OUTCOMES

результаты действий и последующее обучение.

⸻

3. USER

Основная таблица пользователя.

Ключевые поля:

* user_id
* created_at
* updated_at
* last_active_at
* status
* timezone
* locale

user_id является основным идентификатором пользователя внутри системы.

⸻

4. USER_SETTINGS

Настройки пользователя должны храниться отдельно от основной сущности USER.

Примеры:

* язык;
* формат отображения;
* настройки уведомлений;
* другие пользовательские параметры.

Это позволяет расширять настройки без перегрузки USER.

⸻

5. GOALS

Таблица целей пользователя.

Поля:

* goal_id
* user_id
* goal_type
* priority
* status
* created_at
* updated_at

Основные типы:

* likes
* followers
* saves
* reach

Архитектура должна позволять добавлять новые цели.

⸻

6. GOAL_HISTORY

История изменения целей.

Поля:

* goal_history_id
* goal_id
* previous_priority
* new_priority
* changed_at

Это необходимо, чтобы система знала:

какая цель была актуальной в момент прошлого решения.

⸻

7. EXTERNAL_ACCOUNTS

Связь пользователя с внешней платформой.

Поля:

* external_account_id
* user_id
* platform
* external_user_id
* status
* connected_at
* last_synced_at

В будущем один пользователь может иметь несколько внешних аккаунтов.

⸻

8. CONTENT

Основная таблица публикаций.

Поля:

* content_id
* user_id
* external_account_id
* external_content_id
* published_at
* content_type
* status
* created_at
* updated_at

external_content_id должен быть уникальным в контексте соответствующей платформы.

⸻

9. CONTENT_VERSION

Если метаданные публикации могут изменяться, система должна иметь возможность хранить версии.

Например:

* изменился caption;
* появились дополнительные метаданные;
* изменился набор доступных признаков.

В MVP это может быть упрощено, но архитектура должна оставлять такую возможность.

⸻

10. CONTENT_FEATURES

Характеристики публикации.

Поля могут включать:

* content_features_id
* content_id
* feature_type
* feature_value
* confidence
* source
* analysis_version
* created_at

Это гибкая структура.

Она позволяет добавлять новые типы признаков без изменения основной таблицы CONTENT.

⸻

11. CONTENT_TOPICS

Темы публикации.

Поля:

* topic_id
* content_id
* topic
* confidence
* source
* created_at

Одна публикация может иметь несколько тем.

⸻

12. CONTENT_FORMAT

Формат публикации должен иметь нормализованное значение.

Например:

* photo
* video
* carousel

Нельзя создавать множество почти одинаковых вариантов названий.

⸻

13. PERFORMANCE

Текущий агрегированный результат публикации.

Поля:

* performance_id
* content_id
* reach
* likes
* saves
* followers_gained
* measured_at
* source
* updated_at

Если конкретная метрика недоступна, её значение должно быть NULL, а не автоматически 0.

⸻

14. PERFORMANCE_SNAPSHOTS

История изменения статистики.

Поля:

* snapshot_id
* content_id
* reach
* likes
* saves
* followers_gained
* captured_at
* source

Например одна публикация может иметь:

day_1

day_2

day_7

и более поздние snapshots.

⸻

15. METRIC_AVAILABILITY

При необходимости можно отдельно фиксировать, какие метрики были доступны.

Например:

* reach = available
* likes = available
* saves = unavailable

Это защищает систему от путаницы между:

0

и

данные отсутствуют.

⸻

16. BASELINES

Хранит рассчитанные персональные baseline.

Поля:

* baseline_id
* user_id
* metric
* scope
* scope_value
* value
* sample_size
* confidence
* calculated_at
* calculation_version

scope может определять:

* global;
* format;
* topic;
* goal;
* комбинацию признаков.

⸻

17. BASELINE_HISTORY

Каждая новая версия baseline не должна уничтожать предыдущую.

История позволяет узнать:

каким был baseline в момент конкретной рекомендации.

⸻

18. PATTERNS

Основная таблица закономерностей.

Поля:

* pattern_id
* user_id
* pattern_type
* description
* direction
* strength
* confidence
* status
* first_detected_at
* last_confirmed_at
* last_updated_at

⸻

19. PATTERN_FEATURES

Связывает закономерность с конкретными характеристиками.

Например:

format = video

или:

topic = travel

или:

format = carousel + goal = saves

Это позволяет описывать сложные закономерности.

⸻

20. PATTERN_EVIDENCE

Связь pattern с публикациями, которые послужили доказательством.

Поля:

* pattern_evidence_id
* pattern_id
* content_id
* performance_id
* evidence_weight
* created_at

Таким образом система может ответить:

«На каких публикациях основан этот вывод?»

⸻

21. PATTERN_STATUS_HISTORY

История изменения состояния pattern.

Например:

hypothesis

↓

emerging

↓

confirmed

↓

declining

Это позволяет видеть эволюцию знания.

⸻

22. HYPOTHESES

Отдельная сущность для предположений.

Поля:

* hypothesis_id
* user_id
* description
* confidence
* status
* created_at
* updated_at
* last_tested_at

Гипотеза не должна автоматически считаться подтверждённым pattern.

⸻

23. EXPERIMENTS

Эксперименты, созданные для проверки гипотез.

Поля:

* experiment_id
* hypothesis_id
* goal_id
* description
* status
* started_at
* completed_at
* result
* conclusion

⸻

24. SKELETON

Долгосрочная карта наиболее устойчивых типов контента пользователя.

Поля:

* skeleton_id
* user_id
* version
* created_at
* updated_at

Сам skeleton не должен хранить необъяснимые «магические» рекомендации.

Он должен ссылаться на patterns и другие доказательства.

⸻

25. SKELETON_ITEMS

Отдельные элементы skeleton.

Например:

* strong format;
* strong topic;
* strong combination;
* reliable content type;
* stable goal-specific pattern.

Поля:

* skeleton_item_id
* skeleton_id
* pattern_id
* rank
* strength
* confidence
* status

⸻

26. RECOMMENDATIONS

Основная таблица рекомендаций.

Поля:

* recommendation_id
* user_id
* goal_id
* primary_candidate
* confidence
* status
* created_at
* expires_at
* decision_version

⸻

27. RECOMMENDATION_CANDIDATES

Все кандидаты, которые участвовали в ranking.

Поля:

* candidate_id
* recommendation_id
* candidate_type
* candidate_value
* score
* rank
* status

Это важно, потому что система должна помнить не только победителя.

⸻

28. RECOMMENDATION_REASONS

Причины рекомендации.

Поля:

* reason_id
* recommendation_id
* reason_type
* description
* weight
* confidence

Причина может ссылаться на:

* pattern;
* performance;
* baseline;
* goal;
* experiment;
* freshness;
* opportunity.

⸻

29. RECOMMENDATION_EVIDENCE

Если необходимо детально хранить доказательства, создаётся отдельная связь.

Она может связывать recommendation с:

* content;
* performance;
* pattern;
* baseline.

Это обеспечивает полный trace.

⸻

30. RECOMMENDATION_CONTEXT

Снимок контекста в момент создания рекомендации.

Он может содержать:

* goal;
* relevant baseline;
* active patterns;
* confidence;
* recent performance;
* skeleton version;
* decision version.

Главная цель:

сохранить состояние системы на момент решения.

⸻

31. USER_DECISIONS

Решение пользователя.

Поля:

* decision_id
* recommendation_id
* user_id
* decision_type
* selected_candidate
* comment
* created_at

Типы:

* accepted
* rejected
* modified
* deferred
* alternative_selected

⸻

32. USER_DECISION_HISTORY

История изменения решения, если пользователь сначала выбрал один вариант, а затем изменил его.

Это особенно важно для анализа пользовательского поведения.

⸻

33. ACTIONS

Фактическое действие пользователя.

Поля:

* action_id
* user_id
* recommendation_id
* decision_id
* action_type
* content_id
* started_at
* completed_at
* status

Например:

publish_content

⸻

34. OUTCOMES

Результат действия.

Поля:

* outcome_id
* action_id
* content_id
* measured_at
* result_status
* created_at

Самые подробные показатели остаются в PERFORMANCE.

Outcome связывает их с конкретным решением и действием.

⸻

35. RECOMMENDATION_OUTCOMES

Отдельная связь между recommendation и фактическим результатом.

Она позволяет измерить:

насколько хорошо рекомендация сработала.

⸻

36. MEMORY

Структурированная память системы.

Минимальные типы:

* fact
* pattern
* preference
* decision
* lesson
* hypothesis

Поля:

* memory_id
* user_id
* memory_type
* content
* confidence
* source
* created_at
* updated_at
* status

⸻

37. MEMORY_EVIDENCE

Память должна иметь возможность ссылаться на доказательства.

Например lesson может ссылаться на:

* recommendation;
* outcome;
* content;
* pattern.

⸻

38. EVENTS

Системная история событий.

Поля:

* event_id
* user_id
* event_type
* entity_type
* entity_id
* payload
* created_at

Примеры:

RECOMMENDATION_CREATED

USER_ACCEPTED

OUTCOME_RECEIVED

⸻

39. DATA_SOURCES

Источники данных.

Поля:

* source_id
* source_type
* provider
* created_at

Это помогает понимать происхождение информации.

⸻

40. ANALYSIS_RUNS

Каждый крупный аналитический запуск может иметь собственную запись.

Поля:

* analysis_run_id
* user_id
* analysis_version
* started_at
* completed_at
* status

Это полезно для debugging и replay.

⸻

41. DECISION_RUNS

Отдельно можно хранить запуск Decision Engine.

Поля:

* decision_run_id
* user_id
* decision_version
* started_at
* completed_at
* status

Он может быть связан с конкретной recommendation.

⸻

42. AI_INTERACTIONS

Если это необходимо для продукта и политики хранения данных, можно хранить метаданные взаимодействия с AI.

Например:

* interaction_id
* user_id
* context_type
* model_version
* prompt_version
* created_at

При этом не нужно автоматически сохранять всё содержимое разговоров, если для этого нет продуктовой необходимости.

⸻

43. RELATIONSHIP: USER → CONTENT

Один пользователь:

→ много публикаций.

Одна публикация:

→ принадлежит одному пользователю.

⸻

44. RELATIONSHIP: CONTENT → PERFORMANCE

Одна публикация:

→ имеет текущий performance.

Одна публикация:

→ имеет много performance snapshots.

⸻

45. RELATIONSHIP: USER → PATTERNS

Один пользователь:

→ имеет много patterns.

Каждый pattern:

→ принадлежит конкретному пользователю.

⸻

46. RELATIONSHIP: PATTERN → EVIDENCE

Один pattern:

→ может иметь много evidence.

Одна публикация:

→ может быть evidence для нескольких patterns.

Следовательно, здесь используется many-to-many связь.

⸻

47. RELATIONSHIP: RECOMMENDATION → CANDIDATES

Одна recommendation:

→ много candidates.

Один candidate:

→ имеет rank и score.

⸻

48. RELATIONSHIP: RECOMMENDATION → USER_DECISION

Одна recommendation:

→ может иметь одно основное решение пользователя.

История изменений может храниться отдельно.

⸻

49. RELATIONSHIP: RECOMMENDATION → ACTION

Recommendation может привести:

→ к одному или нескольким действиям.

Не каждая recommendation обязана приводить к действию.

⸻

50. RELATIONSHIP: ACTION → OUTCOME

Action:

→ может иметь один или несколько outcome updates.

Например performance может обновляться несколько раз.

⸻

51. RELATIONSHIP: OUTCOME → LEARNING

Outcome может привести к:

* изменению pattern;
* созданию hypothesis;
* подтверждению hypothesis;
* изменению baseline;
* обновлению skeleton;
* обновлению recommendation quality.

⸻

52. FOREIGN_KEYS

Ключевые связи должны быть явно определены.

Например:

content.user_id → user.id

performance.content_id → content.id

pattern.user_id → user.id

recommendation.user_id → user.id

recommendation.goal_id → goal.id

decision.recommendation_id → recommendation.id

action.recommendation_id → recommendation.id

outcome.action_id → action.id

⸻

53. UNIQUE_CONSTRAINTS

Дубликаты должны предотвращаться на уровне базы там, где это возможно.

Например:

platform + external_user_id

может быть уникальной комбинацией.

Аналогично:

platform + external_content_id.

⸻

54. TIMESTAMPS

Основные сущности должны иметь timestamps.

Минимально:

* created_at;
* updated_at.

Для событийных данных:

* occurred_at;
* captured_at;
* measured_at.

⸻

55. SOFT_DELETE

Исторически важные данные не должны бездумно удаляться.

Для некоторых сущностей предпочтительнее:

status = inactive

вместо физического удаления.

Особенно для:

* patterns;
* recommendations;
* decisions;
* outcomes;
* history.

⸻

56. NULL VS ZERO

Это одно из важных правил схемы.

0 означает:

измеренное значение равно нулю.

NULL означает:

значение неизвестно или недоступно.

Это правило должно соблюдаться во всей аналитической системе.

⸻

57. ENUMS

Для часто используемых категорий желательно иметь контролируемый набор значений.

Например:

goal_type

content_type

decision_type

pattern_status

Но система не должна становиться настолько жёсткой, чтобы добавление новой категории требовало масштабной миграции.

⸻

58. JSON_FIELDS

Гибкие дополнительные данные могут храниться в JSON-полях там, где структура действительно может быстро меняться.

Но JSON не должен использоваться вместо нормальной структуры для основных сущностей.

Правило:

stable core → structured columns

variable metadata → flexible structure

⸻

59. INDEXES

Индексы должны создаваться на часто используемых связях и запросах.

Например:

* user_id;
* content_id;
* published_at;
* recommendation_id;
* pattern_id;
* created_at.

Конкретные индексы должны определяться после анализа реальных запросов.

⸻

60. TEMPORAL_QUERIES

Система должна эффективно отвечать на вопросы:

«Что было известно на эту дату?»

и:

«Какой recommendation существовал в этот момент?»

Поэтому timestamps и версии являются не декоративными полями, а частью архитектуры.

⸻

61. SNAPSHOT_PRINCIPLE

Для критических вычисляемых состояний желательно сохранять snapshot.

Например:

* baseline version;
* knowledge state;
* recommendation context;
* decision version.

Это позволяет воспроизводить прошлые решения.

⸻

62. MVP_DATABASE

Для первой версии необязательно физически реализовывать все перечисленные таблицы.

Минимальный набор:

1. users
2. goals
3. external_accounts
4. content
5. content_features
6. performance
7. performance_snapshots
8. baselines
9. patterns
10. pattern_evidence
11. recommendations
12. recommendation_candidates
13. recommendation_reasons
14. user_decisions
15. actions
16. outcomes
17. memory
18. events

Остальные сущности могут появляться по мере развития MVP.

⸻

63. DATABASE SHOULD NOT CONTAIN BUSINESS LOGIC

База данных должна хранить данные и обеспечивать их целостность.

Она не должна становиться местом, где спрятана основная логика Recommendation Engine.

Логика должна находиться в соответствующих backend-модулях.

⸻

64. DATABASE SHOULD NOT BECOME AI MEMORY DUMP

Не следует складывать в одну таблицу огромные текстовые блоки и называть это памятью.

Память должна быть:

* структурированной;
* классифицированной;
* связанной с источниками;
* имеющей confidence;
* обновляемой.

⸻

65. DATA_PROVENANCE

Для важных вычисляемых данных необходимо понимать происхождение:

откуда появился этот вывод?

Например:

pattern

→ evidence

→ content

→ performance.

⸻

66. DATA_VERSIONING

Если алгоритм изменился, новые результаты не должны делать старые результаты недействительными задним числом.

Поэтому важные вычисляемые сущности должны иметь:

* calculation version;
* analysis version;
* decision version.

⸻

67. SCHEMA_MIGRATIONS

Изменение базы должно выполняться через контролируемые migrations.

Нельзя вручную менять production database без отслеживаемой миграции.

⸻

68. BACKUP

Исторические данные являются одним из самых ценных активов продукта.

Необходимо предусмотреть:

* регулярные backups;
* восстановление;
* проверку восстановления;
* защиту от случайной потери.

⸻

69. MULTI_USER_ISOLATION

Архитектура должна быть рассчитана на нескольких пользователей.

Все пользовательские сущности должны быть однозначно связаны с user_id, где это необходимо.

⸻

70. FUTURE_MULTI_PLATFORM

Схема не должна предполагать, что у пользователя когда-либо будет только одна платформа.

Поэтому:

USER

→ EXTERNAL_ACCOUNTS

→ CONTENT

а не:

USER

→ один фиксированный social account.

⸻

71. FUTURE_METRICS

Новые метрики должны добавляться без разрушения старых данных.

Основные текущие метрики:

* reach;
* likes;
* saves;
* followers gained.

Позже могут появиться:

* shares;
* comments;
* watch time;
* completion rate;
* другие показатели.

⸻

72. FUTURE_CONTENT_TYPES

Схема должна позволять добавлять:

* новые форматы;
* новые платформы;
* новые виды контента.

Нельзя проектировать базу так, будто существующие три формата являются вечными.

⸻

73. DATABASE AS SOURCE OF RECORD

База является source of record для:

* фактических данных;
* решений;
* истории;
* связей;
* версий.

Кэш и AI context не являются source of record.

⸻

74. Финальная связь данных

Основная цепочка:

USER

↓

GOAL

↓

CONTENT

↓

PERFORMANCE

↓

BASELINE

↓

PATTERN

↓

RECOMMENDATION

↓

USER_DECISION

↓

ACTION

↓

OUTCOME

↓

MEMORY / KNOWLEDGE UPDATE

↓

NEXT RECOMMENDATION

⸻

75. Главный принцип DATABASE_SCHEMA

База должна отвечать на три вопроса:

WHAT

что произошло?

WHY

на основании каких данных система сделала вывод?

WHAT_NEXT

какое решение было принято и что произошло после него?

⸻

76. Финальный принцип

Не хранить только результат. Хранить путь к результату.

Если система знает только:

«video рекомендуется»

это недостаточно.

Она должна иметь возможность восстановить:

video

→ потому что

pattern X

→ основан на

content A, B, C

→ которые дали

performance X, Y, Z

→ относительно

baseline

→ при текущей

goal

→ с определённым

confidence

→ и определённой

decision_version.

Именно такая структура превращает базу данных из обычного хранилища в надёжный фундамент интеллектуальной системы.