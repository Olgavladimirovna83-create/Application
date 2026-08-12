29_AI_LAYER

1. Назначение документа

AI_LAYER определяет архитектуру использования искусственного интеллекта внутри приложения.

Главный принцип:

AI является сменным интеллектуальным слоем, а не фундаментом всей системы.

Приложение не должно быть архитектурно привязано к одной конкретной компании, модели или AI-провайдеру.

⸻

2. ОСНОВНОЙ ПРИНЦИП

Остальная система должна обращаться не напрямую к конкретной языковой модели, а к внутреннему интерфейсу:

AI_SERVICE

который уже обращается к:

AI_PROVIDER_ADAPTER

а тот, в свою очередь, к конкретному провайдеру.

Схема:

APPLICATION

↓

AI_SERVICE

↓

AI_PROVIDER_ADAPTER

↓

AI PROVIDER

↓

MODEL

⸻

3. AI PROVIDER

AI Provider может быть любой компанией, предоставляющей подходящую модель через API.

Например:

* OpenAI;
* Anthropic;
* Google;
* другой совместимый provider;
* собственная или self-hosted модель.

Конкретный provider не должен быть зашит в бизнес-логику приложения.

⸻

4. PROVIDER AGNOSTIC ARCHITECTURE

Внутренние модули должны работать с абстракциями.

Например:

Recommendation Engine

не должен знать:

OpenAI API

или:

Anthropic API.

Он должен знать только:

AI_SERVICE.generate(...)

⸻

5. PROVIDER CONFIGURATION

Выбор провайдера должен находиться в конфигурационном слое.

Условно:

AI_PROVIDER = openai

может быть заменён на:

AI_PROVIDER = anthropic

или другой поддерживаемый provider.

При этом остальные компоненты приложения не должны изменяться.

⸻

6. MODEL CONFIGURATION

Отдельно должна существовать конфигурация моделей.

Например:

TEXT_MODEL

VISION_MODEL

REASONING_MODEL

FAST_MODEL

Это позволяет использовать разные модели для разных задач.

⸻

7. ЗАМЕНА ПРОВАЙДЕРА

Замена провайдера должна требовать изменения минимального количества конфигурации и adapter layer.

Не должно требоваться переписывать:

* database;
* Data Pipeline;
* Event System;
* Knowledge Layer;
* Decision Engine;
* frontend;
* user logic.

⸻

8. MULTI_PROVIDER

Архитектура должна позволять одновременно использовать несколько провайдеров.

Например:

FAST_MODEL

→ provider A

REASONING_MODEL

→ provider B

VISION_MODEL

→ provider C.

Это может быть полезно для оптимизации:

* стоимости;
* скорости;
* качества;
* доступности;
* специализации.

⸻

9. TASK_ROUTING

AI Layer должен определять, какая модель нужна конкретной задаче.

Например:

простая классификация

→ fast model.

сложный reasoning

→ reasoning model.

анализ изображения

→ vision-capable model.

⸻

10. AI TASK TYPES

Минимально можно выделить:

* CLASSIFICATION;
* EXTRACTION;
* SUMMARIZATION;
* CONTENT_ANALYSIS;
* VISION_ANALYSIS;
* REASONING;
* GENERATION;
* EXPLANATION.

⸻

11. STRUCTURED OUTPUT

Если результат AI используется другими компонентами системы, предпочтителен структурированный output.

Например:

{
  "topic": "travel",
  "confidence": 0.82
}

а не только:

I think this content is about travel.

⸻

12. AI НЕ ЯВЛЯЕТСЯ SOURCE OF TRUTH

AI не должен автоматически считаться источником истины.

Source of truth зависит от типа информации.

Например:

факт публикации

→ external platform / database.

число просмотров

→ platform data.

AI interpretation

→ derived data.

⸻

13. FACT VS INFERENCE

AI Layer должен различать:

FACT

данные, подтверждённые источником.

INFERENCE

вывод модели.

HYPOTHESIS

предположение, требующее проверки.

Эти категории нельзя смешивать.

⸻

14. CONFIDENCE

AI-derived result может иметь confidence.

Например:

topic = beauty

confidence = 0.91

Но AI confidence не должен автоматически трактоваться как статистическая вероятность истинности.

⸻

15. ANALYTICAL CONFIDENCE

Отдельно существует analytical confidence.

Он может учитывать:

* AI confidence;
* количество данных;
* качество данных;
* consistency;
* recency;
* historical evidence.

Поэтому:

AI confidence ≠ recommendation confidence.

⸻

16. AI HALLUCINATION CONTROL

AI Layer должен минимизировать возможность выдумывания информации.

Главные правила:

* не придумывать отсутствующие факты;
* явно сообщать о недостатке информации;
* не выдавать предположение за факт;
* использовать только переданный context, если задача ограничена context;
* сохранять source information;
* использовать внешние данные, когда задача требует актуальной информации.

⸻

17. NO_DATA_BEHAVIOR

Если информации недостаточно, допустимые результаты:

UNKNOWN

INSUFFICIENT_DATA

LOW_CONFIDENCE

NOT_AVAILABLE.

Недопустимо автоматически генерировать правдоподобное значение.

⸻

18. AI CONTEXT

AI должен получать только тот context, который необходим для конкретной задачи.

Например для recommendation:

* user goal;
* relevant performance;
* relevant patterns;
* current knowledge;
* candidate options.

Не нужно отправлять всю database.

⸻

19. CONTEXT BUILDER

Перед обращением к модели отдельный слой может формировать:

AI_CONTEXT.

Он:

1. выбирает нужные данные;
2. фильтрует ненужные;
3. учитывает свежесть;
4. добавляет evidence;
5. формирует структурированный context.

⸻

20. EVIDENCE-FIRST

Если AI делает аналитический вывод, ему по возможности передаётся evidence.

Например:

не просто:

Videos work well.

а:

12 comparable videos, 8 above baseline, median performance +31%, recent period.

AI интерпретирует evidence, а не заменяет его.

⸻

21. PROMPT LAYER

Prompts должны быть отделены от бизнес-логики.

Не следует размещать длинные prompt templates непосредственно внутри:

Recommendation Engine.

Вместо этого:

Prompt Registry

→ выбирает нужный prompt.

⸻

22. PROMPT VERSIONING

Каждый production prompt должен иметь version.

Например:

recommendation_prompt_v3.

Это позволяет понять, какая инструкция использовалась для конкретного результата.

⸻

23. MODEL VERSIONING

Также должна фиксироваться версия модели.

Например:

model_version.

Это важно, потому что поведение одной и той же модели может изменяться между версиями.

⸻

24. AI RUN

Каждый значимый AI request должен иметь собственный ai_run.

Он может содержать:

* run_id;
* provider;
* model;
* model_version;
* prompt_version;
* input context reference;
* output;
* confidence;
* timestamp;
* latency;
* token usage;
* status.

⸻

25. AI TRACEABILITY

Для важного результата должна существовать цепочка:

recommendation

↓

decision run

↓

AI run

↓

prompt version

↓

model version

↓

context

↓

evidence

↓

source data.

Это позволяет понять:

почему система пришла именно к этому результату.

⸻

26. AI OUTPUT VALIDATION

AI output должен проходить validation до попадания в database или business logic.

Проверяется:

* schema;
* required fields;
* data types;
* allowed values;
* confidence range;
* consistency.

⸻

27. AI OUTPUT MUST NOT BYPASS BUSINESS RULES

AI не должен напрямую менять критическое состояние системы.

Например AI может предложить:

candidate = video.

Но Decision Engine должен решить, допустимо ли это решение.

⸻

28. AI AS ADVISOR

Для критических решений AI преимущественно выступает как:

advisor / analyzer / generator.

А не как единственный источник окончательного решения.

⸻

29. DETERMINISTIC LOGIC

То, что можно надёжно вычислить обычным кодом, не нужно поручать языковой модели.

Например:

* percentage;
* averages;
* ranking;
* date calculations;
* thresholds;
* database constraints.

AI не должен заменять обычную вычислительную логику без причины.

⸻

30. AI FOR INTERPRETATION

AI особенно полезен там, где требуется:

* понимание текста;
* визуальный анализ;
* классификация;
* объяснение;
* генерация;
* работа с неоднозначными данными;
* synthesis нескольких evidence sources.

⸻

31. AI FOR CONTENT ANALYSIS

AI может анализировать:

* captions;
* scripts;
* topics;
* structure;
* visual characteristics;
* tone;
* hooks;
* recurring patterns.

Результаты должны сохраняться как derived features.

⸻

32. AI FOR PATTERN INTERPRETATION

Pattern Engine определяет статистическую или логическую основу pattern.

AI может помочь:

* сформулировать pattern;
* классифицировать его;
* объяснить его;
* найти возможные интерпретации.

AI не должен самостоятельно объявлять закономерность подтверждённой без необходимого evidence.

⸻

33. AI FOR RECOMMENDATIONS

AI может использоваться для:

* synthesis evidence;
* формирования candidate ideas;
* объяснения recommendation;
* генерации контента;
* поиска альтернатив.

Но ranking и final decision должны учитывать deterministic business rules и аналитические данные.

⸻

34. AI FOR EXPLANATIONS

AI может преобразовывать structured evidence:

reason

evidence

confidence

в понятное пользователю объяснение.

Например:

«Я предлагаю этот формат, потому что в последних сопоставимых публикациях он чаще превышал твой baseline».

⸻

35. EXPLANATION MUST NOT INVENT

Если evidence говорит:

moderate confidence

AI не должен говорить:

«Мы точно знаем, что это сработает».

Формулировка должна соответствовать уровню уверенности.

⸻

36. USER TRUST

AI должен:

* честно говорить о неопределённости;
* не скрывать отсутствие данных;
* не создавать ложную уверенность;
* объяснять причины рекомендации;
* различать факт и предположение.

⸻

37. USER DECISION

AI может рекомендовать.

Пользователь принимает окончательное решение, если только конкретная автоматическая функция приложения заранее не предусматривает другое.

После решения пользователя система должна:

* сохранить decision;
* сохранить context;
* при необходимости сохранить modification;
* учитывать outcome позже.

⸻

38. AI LEARNING

AI не должен бесконтрольно «обучаться» на каждом сообщении пользователя.

Learning system должна решать:

* что является сигналом;
* насколько он надёжен;
* какой вес имеет;
* стоит ли изменять knowledge.

⸻

39. USER FEEDBACK

Feedback может быть:

* explicit;
* implicit;
* behavioral.

Например:

«Мне это не подходит»

является explicit feedback.

А:

пользователь регулярно игнорирует определённый тип рекомендаций

может быть implicit signal.

⸻

40. FEEDBACK ≠ FACT

Feedback пользователя не должен автоматически менять объективные performance metrics.

Он является отдельным типом evidence:

USER_PREFERENCE.

⸻

41. MEMORY

AI Layer может обращаться к Memory Layer.

Но memory должна быть:

* структурированной;
* версионируемой;
* связанной с source;
* контролируемой.

AI не должен самостоятельно записывать любое сгенерированное предположение как долговременную память.

⸻

42. MEMORY WRITE POLICY

Перед сохранением memory желательно определить:

* source;
* confidence;
* importance;
* scope;
* timestamp;
* whether user explicitly stated it.

⸻

43. AI SAFETY BOUNDARIES

AI Layer не должен иметь неограниченный доступ к системе.

Доступ должен предоставляться по принципу:

least privilege.

⸻

44. TOOL ACCESS

Если AI может использовать tools, каждый tool должен иметь отдельный contract.

Например:

search

database_query

content_analysis

recommendation_context

external_platform_action.

⸻

45. TOOL PERMISSIONS

AI не должен автоматически получать право:

* удалять данные;
* менять критические настройки;
* публиковать контент;
* совершать финансовые действия.

Такие операции требуют отдельного permission layer.

⸻

46. HUMAN CONFIRMATION

Для потенциально необратимых действий может требоваться подтверждение пользователя.

Например:

AI предлагает публикацию.

↓

Пользователь подтверждает.

↓

Система публикует.

⸻

47. AI COST CONTROL

AI requests должны учитывать стоимость.

Можно использовать:

* более дешёвую модель для простых задач;
* caching;
* batching;
* context reduction;
* reusing previous analysis.

⸻

48. AI CACHE

Если один и тот же неизменившийся context обрабатывается повторно одной и той же моделью и prompt version, результат может кэшироваться там, где это безопасно.

⸻

49. AI FALLBACK

Если основной provider недоступен, система может использовать fallback provider.

Например:

Provider A

↓

failure

↓

Provider B.

Но fallback должен учитывать совместимость результата.

⸻

50. PROVIDER FAILURE

Если все подходящие providers недоступны:

AI operation получает:

AI_UNAVAILABLE.

Система не должна подменять отсутствующий AI результат выдуманным.

⸻

51. PROVIDER ABSTRACTION

Каждый provider должен реализовывать общий internal contract.

Условно:

generate()

analyze()

extract()

embed() при необходимости.

Конкретные возможности могут отличаться.

⸻

52. CAPABILITY REGISTRY

Система должна знать, какие возможности доступны у конкретной модели.

Например:

Capability	Model A	Model B
Text	yes	yes
Vision	yes	no
Structured output	yes	yes
Reasoning	high	medium

Это позволяет выбирать подходящую модель автоматически.

⸻

53. MODEL ROUTER

Отдельный Model Router может выбирать модель на основании:

* task type;
* capability;
* quality;
* latency;
* cost;
* availability.

⸻

54. НЕОБЯЗАТЕЛЬНАЯ ОПТИМИЗАЦИЯ

На раннем этапе можно использовать одну модель.

Архитектура всё равно должна позволять добавить routing позже.

⸻

55. AI OBSERVABILITY

Необходимо отслеживать:

* latency;
* errors;
* token usage;
* estimated cost;
* model;
* provider;
* task;
* success rate.

⸻

56. AI QUALITY MONITORING

Можно отслеживать:

* structured output validity;
* human acceptance;
* recommendation usefulness;
* hallucination reports;
* correction frequency.

⸻

57. MODEL EVALUATION

Перед заменой модели необходимо сравнивать её на заранее определённом evaluation set.

Проверяются:

* accuracy;
* consistency;
* structured output;
* latency;
* cost;
* failure rate.

⸻

58. MODEL SWITCHING

Смена модели не должна автоматически менять бизнес-логику.

Можно провести:

Model A

vs

Model B

на одинаковом наборе задач.

После оценки выбрать подходящую модель.

⸻

59. A/B MODEL TESTING

При необходимости разные модели могут получать одинаковые задачи.

Результаты сохраняются отдельно.

Это позволяет объективно сравнивать providers.

⸻

60. AI DATA PRIVACY

Передача данных внешнему provider должна соответствовать privacy requirements приложения.

Необходимые данные должны быть минимизированы.

⸻

61. SENSITIVE DATA FILTER

Перед отправкой context внешней модели можно использовать фильтр, удаляющий ненужные персональные или чувствительные данные.

⸻

62. PROVIDER CONTRACT

Для каждого provider должны быть известны:

* API endpoint;
* authentication mechanism;
* supported models;
* capabilities;
* pricing;
* rate limits;
* retention policy;
* privacy characteristics.

Эти параметры не должны быть разбросаны по бизнес-коду.

⸻

63. AI CONFIGURATION

Условная конфигурация:

AI_PROVIDER=openai
TEXT_MODEL=...
VISION_MODEL=...
REASONING_MODEL=...
FAST_MODEL=...

При смене provider:

AI_PROVIDER=anthropic

остальная система продолжает использовать тот же AI_SERVICE.

⸻

64. ВАЖНАЯ ОГОВОРКА

Замена provider не означает, что абсолютно все функции гарантированно останутся идентичными.

Разные модели могут иметь:

* разные capabilities;
* разные context limits;
* разное качество;
* разные форматы tool calling;
* разную скорость;
* разные цены.

Поэтому AI Layer должен проверять capabilities перед routing.

⸻

65. AI CONTRACT

Внутренний контракт должен описывать:

INPUT

→ task

→ context

→ constraints

→ required output schema.

OUTPUT

→ result

→ confidence

→ model metadata

→ provenance

→ status.

⸻

66. AI RUN FAILURE

Каждый AI run должен иметь понятный status:

* completed;
* failed;
* timeout;
* provider_unavailable;
* validation_failed;
* insufficient_data.

⸻

67. AI DOES NOT CONTROL DATABASE

AI не должен напрямую выполнять произвольные SQL commands.

Database access должен идти через контролируемые сервисы и repositories.

⸻

68. AI DOES NOT CONTROL DOMAIN STATE

AI не должен самостоятельно менять:

* baseline;
* pattern status;
* recommendation status;
* user settings.

Он может предложить изменение.

Domain layer решает, допустимо ли оно.

⸻

69. AI + DETERMINISTIC SYSTEM

Идеальная архитектура:

DATABASE

→ факты

ANALYTICS

→ расчёты

KNOWLEDGE

→ накопленные закономерности

AI

→ interpretation / synthesis / generation

DECISION ENGINE

→ финальное решение

⸻

70. AI ROLE IN THE SYSTEM

AI должен быть:

умным интерпретатором и помощником принятия решений.

Он не должен быть:

чёрным ящиком, которому передана вся система.

⸻

71. MVP AI ARCHITECTURE

Для первой версии достаточно:

AI_SERVICE

↓

ONE_PROVIDER_ADAPTER

↓

ONE_OR_MORE_MODELS

при наличии:

* structured outputs;
* validation;
* prompt versioning;
* model versioning;
* AI run logging;
* confidence;
* provider abstraction.

⸻

72. FUTURE AI ARCHITECTURE

Позже можно добавить:

* multiple providers;
* model routing;
* fallback;
* vision models;
* embeddings;
* retrieval;
* advanced agents;
* evaluation pipelines;
* model A/B testing;
* specialized models.

⸻

73. КРИТИЧЕСКОЕ ПРАВИЛО

Если обычный код может выполнить задачу надёжнее, дешевле и предсказуемее, задача должна выполняться обычным кодом, а не AI.

AI используется там, где он действительно добавляет ценность.

⸻

74. КРИТИЧЕСКОЕ ПРАВИЛО №2

AI не должен скрывать неопределённость.

Если система не знает:

она говорит, что не знает.

Если evidence слабый:

confidence должен отражать это.

Если данные противоречивы:

противоречие должно сохраняться.

⸻

75. КРИТИЧЕСКОЕ ПРАВИЛО №3

Провайдер AI является заменяемой инфраструктурной зависимостью.

Приложение должно быть способно заменить provider без перестройки бизнес-логики.

⸻

76. КРИТИЧЕСКОЕ ПРАВИЛО №4

Каждый важный AI результат должен быть воспроизводимым настолько, насколько это возможно.

Система должна знать:

* какая модель использовалась;
* какая версия;
* какой prompt;
* какой context;
* какие evidence;
* когда был сделан run.

⸻

77. ФИНАЛЬНАЯ СХЕМА

APPLICATION

↓

AI_SERVICE

↓

MODEL_ROUTER

↓

PROVIDER_ADAPTER

↓

PROVIDER

↓

MODEL

↓

STRUCTURED OUTPUT

↓

VALIDATION

↓

DOMAIN / ANALYTICS / DECISION LAYER

⸻

78. ФИНАЛЬНЫЙ ПРИНЦИП

Приложение не должно быть построено вокруг конкретного AI.

Оно должно быть построено вокруг собственной системы данных, знаний, правил и решений, внутри которой AI является мощным, но заменяемым интеллектуальным компонентом.

Сегодня это может быть один provider.

Завтра другой.

Послезавтра несколько одновременно.

Архитектура приложения при этом остаётся той же.