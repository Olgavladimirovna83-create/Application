43_TESTING_AND_QUALITY_ASSURANCE

1. Назначение документа

TESTING_AND_QUALITY_ASSURANCE определяет, как проверять качество приложения до и после release.

Главный принцип:

система считается качественной не тогда, когда код работает в идеальном сценарии, а когда она предсказуемо обрабатывает нормальные, ошибочные и неожиданные ситуации.

⸻

2. TESTING LAYERS

Testing разделяется на:

* unit tests;
* integration tests;
* contract tests;
* data tests;
* AI tests;
* end-to-end tests;
* security tests;
* performance tests;
* recovery tests;
* manual UX testing.

⸻

3. UNIT TESTS

Unit tests проверяют отдельные функции и небольшие компоненты.

Особенно важно тестировать:

* calculations;
* transformations;
* validation;
* scoring;
* recommendation rules;
* freshness calculations.

⸻

4. DETERMINISTIC LOGIC

Любая deterministic logic должна иметь predictable test cases.

Если одинаковые входные данные должны давать одинаковый результат, это должно проверяться автоматически.

⸻

5. EDGE CASES

Каждый critical component должен тестироваться не только на обычных данных.

Необходимо учитывать:

* empty data;
* missing values;
* zero values;
* extreme values;
* duplicate records;
* invalid timestamps;
* incomplete datasets.

⸻

6. INTEGRATION TESTS

Проверяют взаимодействие компонентов.

Например:

API

↓

database

↓

queue

↓

worker

↓

analytics

⸻

7. EXTERNAL INTEGRATIONS

Integration tests должны проверять:

* authentication;
* token refresh;
* API requests;
* pagination;
* rate limits;
* error handling;
* disconnect;
* resync.

⸻

8. PROVIDER FAILURE

Система должна тестироваться на:

* timeout;
* 401;
* 403;
* 404;
* 429;
* 500;
* unavailable provider.

⸻

9. CONTRACT TESTS

Contracts между frontend, backend, integrations и AI Layer должны тестироваться отдельно.

Изменение одной стороны не должно незаметно ломать другую.

⸻

10. DATABASE TESTS

Проверять:

* migrations;
* relations;
* constraints;
* indexes;
* uniqueness;
* deletion behaviour;
* data integrity.

⸻

11. MIGRATION TESTS

Каждая database migration должна проверяться:

previous schema → migration → new schema.

⸻

12. ROLLBACK TESTS

Для критических migrations необходимо понимать, можно ли безопасно откатиться.

Если rollback невозможен, это должно быть явно известно до deployment.

⸻

13. DATA PIPELINE TESTS

Проверять весь pipeline:

raw

↓

validated

↓

normalized

↓

stored

↓

analytics-ready

⸻

14. DATA QUALITY TESTS

Автоматически проверять:

* completeness;
* freshness;
* duplicates;
* invalid values;
* unexpected schema changes.

⸻

15. DATA DRIFT

Если структура или характер external data существенно изменился, система должна это обнаружить.

⸻

16. ANALYTICS TESTS

Каждый important metric должен иметь:

* expected input;
* expected output;
* edge cases.

⸻

17. ANALYTICS REPRODUCIBILITY

При одинаковых данных deterministic analytics должна давать одинаковый результат.

⸻

18. RECOMMENDATION TESTS

Recommendation engine должен тестироваться отдельно от AI.

⸻

19. RECOMMENDATION RULES

Проверять:

* correct recommendation;
* incorrect recommendation prevention;
* missing evidence;
* low confidence;
* conflicting signals.

⸻

20. NEGATIVE OUTCOMES

Тестировать все уровни:

* strong positive;
* moderate positive;
* neutral;
* moderate negative;
* strong negative.

⸻

21. CONFIDENCE TESTS

Проверять, что confidence не становится artificially high при недостатке evidence.

⸻

22. FRESHNESS TESTS

Проверять, что более свежие данные получают соответствующий weight там, где freshness имеет значение.

Старая информация не должна автоматически считаться бесполезной.

⸻

23. HISTORICAL TESTS

Historical patterns должны продолжать работать, если они всё ещё релевантны.

⸻

24. AI TESTING

AI требует отдельного testing layer.

Нельзя тестировать AI только через:

«ответ выглядит хорошо».

⸻

25. AI GROUNDING

Проверять:

ответ действительно основан на предоставленном context?

⸻

26. HALLUCINATION TESTS

Создавать сценарии, где:

* данных недостаточно;
* данные противоречат друг другу;
* нужной информации нет.

Правильное поведение:

признать недостаток информации, а не придумать ответ.

⸻

27. UNKNOWN CASE

Если system context не позволяет сделать вывод:

AI должен сообщить об uncertainty.

⸻

28. SOURCE ATTRIBUTION

Если AI использует evidence references, необходимо проверять, что ссылки действительно соответствуют claims.

⸻

29. NUMERICAL ACCURACY

AI не должен самостоятельно придумывать numerical results.

Расчёты должны по возможности выполняться deterministic code, а AI должен интерпретировать результат.

⸻

30. STRUCTURED OUTPUT

AI output должен проходить schema validation.

⸻

31. INVALID AI OUTPUT

Если AI возвращает invalid structured output:

* не показывать его пользователю как validated result;
* выполнить retry, если это безопасно;
* либо вернуть controlled fallback.

⸻

32. PROMPT REGRESSION

Изменение system prompt может изменить поведение AI.

Поэтому critical prompt changes должны проходить regression testing.

⸻

33. MODEL REGRESSION

Замена AI model/provider может изменить:

* accuracy;
* style;
* latency;
* cost;
* behaviour.

Перед переключением необходимо провести comparison.

⸻

34. GOLDEN DATASET

Создать набор заранее проверенных scenarios.

Каждый scenario содержит:

* input;
* relevant context;
* expected properties of output.

Не обязательно фиксировать exact wording AI response.

⸻

35. EVALUATION CRITERIA

AI response можно оценивать по:

* factual grounding;
* relevance;
* completeness;
* uncertainty;
* recommendation quality;
* safety;
* consistency.

⸻

36. LLM AS JUDGE

AI-based evaluation может использоваться как дополнительный инструмент.

Но он не должен быть единственным quality gate для критических решений.

⸻

37. HUMAN REVIEW

Для наиболее важных AI behaviour changes желательно иметь human review.

⸻

38. AI COST TESTING

Проверять:

* token usage;
* request frequency;
* average cost;
* expensive scenarios.

⸻

39. AI LATENCY

Измерять:

* average;
* p95;
* p99, если масштаб системы оправдывает это.

⸻

40. END-TO-END TEST

Главный пользовательский сценарий:

register

↓

connect

↓

sync

↓

analyze

↓

receive insight

↓

receive recommendation

↓

make decision

↓

record outcome

⸻

41. FAILURE E2E

Также должен существовать сценарий:

external provider unavailable

↓

system detects failure

↓

user receives meaningful status

↓

system retries or degrades gracefully.

⸻

42. DEGRADED MODE

Проверять работу системы при недоступности отдельных компонентов.

Например:

AI unavailable

↓

analytics continues working.

⸻

43. SECURITY TESTING

Проверять:

* authentication;
* authorization;
* privilege escalation;
* token exposure;
* secret exposure;
* injection;
* unsafe input;
* data isolation.

⸻

44. USER DATA ISOLATION

Особенно важно проверить:

User A не может получить data User B.

⸻

45. ADMIN ACCESS

Проверять, что administrative permissions действительно ограничивают доступ.

⸻

46. API SECURITY

Проверять:

* authentication;
* authorization;
* rate limiting;
* malformed input;
* excessive payloads.

⸻

47. PRIVACY TESTING

Проверять:

* deletion;
* export;
* consent;
* access control;
* log masking;
* retention rules.

⸻

48. DELETION TEST

После deletion необходимо проверить, что соответствующие данные действительно больше не используются application workflows.

Backup behaviour проверяется отдельно согласно retention policy.

⸻

49. PERFORMANCE TESTING

Проверять:

* API latency;
* database latency;
* queue throughput;
* sync performance;
* AI latency.

⸻

50. LOAD TESTING

Нагрузка должна постепенно увеличиваться.

Не нужно начинать с огромных synthetic loads, если MVP ещё не имеет реального usage pattern.

⸻

51. CONCURRENCY

Проверять одновременные:

* sync jobs;
* user requests;
* recommendation generation;
* background jobs.

⸻

52. IDEMPOTENCY TESTS

Повторная обработка одного события не должна создавать некорректное состояние.

⸻

53. QUEUE TESTING

Проверять:

* retry;
* dead-letter behaviour;
* duplicate jobs;
* delayed jobs;
* failed jobs.

⸻

54. BACKGROUND JOB TESTING

Worker должен корректно обрабатывать:

* success;
* temporary failure;
* permanent failure;
* timeout.

⸻

55. BACKUP TESTING

Необходимо тестировать не только создание backup, но и restore.

⸻

56. RESTORE TEST

Периодически:

backup

↓

restore

↓

integrity validation

⸻

57. DISASTER TESTING

Проверять критические failure scenarios:

* database unavailable;
* storage unavailable;
* provider unavailable;
* AI provider unavailable;
* queue failure;
* deployment failure.

⸻

58. ROLLBACK TEST

Проверять, что application можно вернуть на предыдущую стабильную версию там, где это предусмотрено архитектурой.

⸻

59. RELEASE TESTING

Перед production release:

* automated tests;
* migration validation;
* smoke tests;
* critical E2E;
* monitoring verification;
* rollback readiness.

⸻

60. SMOKE TEST

После deployment проверить минимум:

* application starts;
* database available;
* authentication works;
* critical API works;
* critical user flow works.

⸻

61. CANARY / LIMITED RELEASE

Если инфраструктура позволяет, новая версия сначала доступна ограниченной группе пользователей.

⸻

62. RELEASE MONITORING

После release наблюдать:

* error rate;
* latency;
* failed jobs;
* AI behaviour;
* cost;
* user-facing failures.

⸻

63. AUTOMATIC ROLLBACK

Для определённых технических failures можно предусмотреть automatic rollback.

Но его не следует применять бездумно к AI quality issues, если проблема требует анализа.

⸻

64. UX TESTING

Manual testing должен проверять:

* clarity;
* onboarding;
* navigation;
* recommendation comprehension;
* error messages;
* empty states.

⸻

65. EMPTY STATES

Пользователь должен понимать, что делать, если:

* данных ещё нет;
* sync не завершён;
* insight пока не найден;
* recommendation отсутствует.

⸻

66. ERROR MESSAGES

Ошибка должна объяснять:

* что произошло;
* что пользователь может сделать;
* требуется ли действие пользователя.

⸻

67. НЕ ОБВИНЯТЬ ПОЛЬЗОВАТЕЛЯ

Вместо:

«You entered invalid data»

предпочтительно:

«We couldn’t process this data because…»

если проблема не обязательно вызвана пользователем.

⸻

68. ACCESSIBILITY TESTING

Проверять:

* keyboard navigation;
* readable text;
* focus states;
* semantic structure;
* screen-reader compatibility, где применимо.

⸻

69. TEST ENVIRONMENTS

Минимально:

* local;
* test;
* staging;
* production.

⸻

70. TEST DATA

Test data должна быть:

* synthetic;
* anonymized;
* controlled.

Production user data не должна использоваться в тестах без необходимых safeguards.

⸻

71. TEST ISOLATION

Test environment не должна случайно:

* отправлять real notifications;
* изменять production data;
* выполнять реальные external actions.

⸻

72. TEST SECRETS

Использовать отдельные credentials для test environments.

⸻

73. CI TESTING

Pull request должен запускать relevant automated tests.

⸻

74. QUALITY GATE

Critical tests должны пройти до merge или release.

⸻

75. TEST COVERAGE

Coverage используется как indicator, а не как единственная мера качества.

100% coverage не гарантирует отсутствие bugs.

⸻

76. BUG PRIORITY

Bugs классифицируются по severity:

Critical

Система или critical data серьёзно повреждены.

High

Ключевая функция существенно нарушена.

Medium

Функция работает неправильно, но есть workaround.

Low

Незначительная проблема.

⸻

77. RELEASE BLOCKERS

Critical и определённые High severity issues должны блокировать release.

⸻

78. REGRESSION TESTING

После исправления critical bug добавляется regression test, чтобы проблема не повторилась.

⸻

79. TEST DOCUMENTATION

Для critical workflows должны существовать:

* automated tests;
* expected behaviour;
* failure scenarios.

⸻

80. QUALITY DASHBOARD

По мере роста можно создать внутренний quality dashboard.

Он показывает:

* test status;
* production errors;
* AI evaluation;
* latency;
* reliability;
* incidents.

⸻

81. QUALITY OVER TIME

Quality должна измеряться не только перед launch.

Она должна отслеживаться постоянно.

⸻

82. MODEL CHANGE PROCESS

Перед сменой AI model:

baseline

↓

new model evaluation

↓

comparison

↓

cost/performance review

↓

limited release

↓

monitoring

⸻

83. PROMPT CHANGE PROCESS

Перед значимым изменением prompt:

golden dataset

↓

regression

↓

human review

↓

release

⸻

84. DATA SCHEMA CHANGE PROCESS

Перед изменением schema:

* migration test;
* backward compatibility review;
* data integrity check;
* rollback assessment.

⸻

85. INTEGRATION CHANGE PROCESS

Перед изменением provider:

* contract tests;
* authentication tests;
* sample data comparison;
* error handling tests.

⸻

86. QUALITY INCIDENT

Если production обнаруживает серьёзную ошибку:

Detect

↓

Contain

↓

Fix

↓

Verify

↓

Regression test

↓

Document

⸻

87. POSTMORTEM

Для серьёзных incidents фиксируются:

* cause;
* impact;
* timeline;
* detection;
* resolution;
* prevention.

⸻

88. FINAL QUALITY MODEL

CODE

↓

TEST

↓

INTEGRATE

↓

VALIDATE DATA

↓

VALIDATE AI

↓

E2E

↓

SECURITY

↓

STAGING

↓

RELEASE

↓

MONITOR

↓

LEARN

⸻

89. ФИНАЛЬНЫЙ ПРИНЦИП

Главная задача QA не в том, чтобы доказать:

«система никогда не ошибается».

Это невозможно.

Задача QA:

сделать ошибки обнаруживаемыми, контролируемыми, воспроизводимыми и максимально безопасными для пользователя.

Особенно для AI-системы необходимо тестировать не только качество красивого ответа, но и способность системы честно сказать:

«я не знаю», когда имеющихся данных недостаточно для надёжного вывода.