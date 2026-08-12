35_TESTING_QUALITY_CONTROL

1. Назначение документа

TESTING_QUALITY_CONTROL определяет, как проверяется корректность, стабильность и предсказуемость приложения.

Главный принцип:

система должна быть проверена не только на то, что она работает в идеальном сценарии, но и на то, что она правильно ведёт себя при ошибках, неполных данных и неожиданных ситуациях.

⸻

2. ОСНОВНОЙ ПРИНЦИП

Каждый важный компонент должен иметь проверяемое поведение.

Нельзя считать систему надёжной только потому, что интерфейс выглядит правильно.

⸻

3. TESTING LAYERS

Тестирование разделяется на:

* unit tests;
* integration tests;
* API tests;
* end-to-end tests;
* data tests;
* AI tests;
* security tests;
* performance tests;
* regression tests.

⸻

4. UNIT TESTS

Unit tests проверяют отдельные функции и небольшие модули.

Например:

* calculations;
* validation;
* scoring;
* recommendation rules;
* data transformations.

⸻

5. BUSINESS LOGIC

Особое внимание уделяется business logic.

Например:

если baseline рассчитывается неправильно, весь последующий AI analysis может стать неправильным.

Поэтому такие функции должны иметь большое покрытие тестами.

⸻

6. INTEGRATION TESTS

Integration tests проверяют взаимодействие компонентов.

Например:

API

↓

Database

↓

Analytics

↓

Recommendation.

⸻

7. API TESTS

Каждый критический endpoint должен проверяться на:

* valid input;
* invalid input;
* missing authentication;
* insufficient permissions;
* malformed data;
* edge cases.

⸻

8. AUTHORIZATION TESTS

Необходимо проверять не только:

может ли пользователь получить свои данные

но и:

не может ли он получить чужие данные.

⸻

9. USER ISOLATION TEST

Критический сценарий:

User A

не должен иметь возможность получить:

User B data.

Это должно проверяться автоматически.

⸻

10. DATABASE TESTS

Database logic должна проверяться на:

* constraints;
* relations;
* migrations;
* unique rules;
* deletion behaviour;
* data integrity.

⸻

11. MIGRATION TESTS

Каждая migration должна проверяться на:

* successful execution;
* expected schema;
* existing data compatibility;
* rollback strategy, если rollback поддерживается.

⸻

12. DATA PIPELINE TESTS

Data pipeline должен проверяться на:

* missing data;
* duplicated data;
* malformed data;
* delayed data;
* unexpected values;
* partial synchronization.

⸻

13. EXTERNAL API TESTS

Интеграции должны проверяться не только при success response.

Также:

* timeout;
* rate limit;
* authentication failure;
* malformed response;
* provider outage;
* changed response structure.

⸻

14. MOCKS

Внешние API могут заменяться mocks в автоматических тестах.

Но периодически необходимы реальные integration tests там, где это разрешено и безопасно.

⸻

15. AI TESTING

AI нельзя тестировать только как обычную deterministic function.

Необходимо проверять:

* structure;
* correctness;
* grounding;
* hallucination risk;
* consistency;
* refusal behaviour;
* uncertainty.

⸻

16. AI OUTPUT VALIDATION

AI output должен проверяться schema validation.

Например AI должен вернуть:

{
  "recommendation": "...",
  "confidence": 0.72,
  "evidence": []
}

Если структура неправильная, результат не должен автоматически попадать в production logic.

⸻

17. AI GROUNDING TESTS

Если AI утверждает:

«14 похожих публикаций показали лучший результат»

система должна проверить, действительно ли эти данные существуют.

⸻

18. NO FABRICATION TEST

AI не должен придумывать:

* metrics;
* evidence;
* sources;
* user history;
* actions;
* events.

Если данных нет:

«insufficient evidence».

⸻

19. UNCERTAINTY TESTS

Проверяется, умеет ли AI корректно отвечать:

«Я не знаю»

или:

«данных недостаточно».

⸻

20. PROMPT INJECTION TESTS

AI Layer должен тестироваться на попытки изменить system behaviour через:

* user content;
* external content;
* imported text;
* malicious instructions.

⸻

21. TOOL PERMISSION TESTS

Если AI имеет tools:

проверяется, что AI не может вызвать tool, для которого у него нет permission.

⸻

22. DESTRUCTIVE ACTION TESTS

Особенно тщательно тестируются:

* delete;
* publish;
* disconnect;
* account changes;
* destructive automation.

⸻

23. END-TO-END TESTS

E2E tests проходят полный пользовательский сценарий.

Например:

Signup

↓

Connect account

↓

Sync

↓

Analytics

↓

Recommendation

↓

Accept

↓

Action

↓

Outcome

↓

Learning

⸻

24. CRITICAL USER FLOWS

E2E tests должны покрывать наиболее важные сценарии.

Не обязательно тестировать каждый пиксель каждого экрана.

⸻

25. FRONTEND TESTS

Frontend должен проверяться на:

* rendering;
* interaction;
* form validation;
* loading states;
* error states;
* responsive behaviour;
* accessibility.

⸻

26. ACCESSIBILITY TESTS

Минимально:

* keyboard navigation;
* focus;
* labels;
* semantic HTML;
* contrast;
* screen reader compatibility.

⸻

27. ERROR STATE TESTING

Каждый важный экран должен быть протестирован в состояниях:

* success;
* loading;
* empty;
* error;
* unavailable;
* stale.

⸻

28. PARTIAL FAILURE TESTS

Например:

AI unavailable.

Frontend всё равно должен корректно показывать analytics.

⸻

29. BACKGROUND JOB TESTS

Проверяются:

* successful execution;
* retry;
* failure;
* timeout;
* cancellation;
* duplicate execution.

⸻

30. IDEMPOTENCY TESTS

Если одна и та же job выполняется дважды, система не должна случайно создать два одинаковых результата.

⸻

31. EVENT TESTS

Проверяется:

* event creation;
* event delivery;
* duplicate events;
* missing events;
* event ordering там, где порядок важен.

⸻

32. NOTIFICATION TESTS

Проверяется:

* правильный recipient;
* priority;
* deduplication;
* cooldown;
* channel;
* read status;
* expiration.

⸻

33. SECURITY TESTS

Минимально:

* authentication;
* authorization;
* user isolation;
* injection;
* secret exposure;
* rate limiting;
* session handling.

⸻

34. DEPENDENCY SECURITY

Third-party dependencies должны периодически проверяться на известные vulnerabilities.

⸻

35. PERFORMANCE TESTS

Необходимо измерять:

* API latency;
* database performance;
* queue throughput;
* worker processing;
* AI latency;
* frontend loading.

⸻

36. LOAD TESTING

Load testing используется для определения поведения системы при росте нагрузки.

⸻

37. STRESS TESTING

Stress testing проверяет, что происходит, когда система получает нагрузку выше ожидаемой.

⸻

38. FAILURE TESTING

Нужно проверять:

что происходит, если:

* database недоступна;
* AI provider недоступен;
* external API недоступен;
* queue остановлена;
* storage недоступен.

⸻

39. RECOVERY TESTING

После отказа система должна корректно восстановиться.

⸻

40. BACKUP RESTORE TEST

Backup считается рабочим только после успешного восстановления в тестовой среде.

⸻

41. REGRESSION TESTING

После каждого значимого изменения необходимо проверять, что старые функции продолжают работать.

⸻

42. GOLDEN DATASETS

Для analytics и AI полезно создавать фиксированные datasets с известным ожидаемым поведением.

Например:

известный набор performance data должен давать предсказуемый baseline.

⸻

43. AI GOLDEN DATASET

Для AI сохраняются примеры:

* input context;
* expected structure;
* acceptable output range;
* known limitations.

Цель не в том, чтобы AI выдавал каждый раз идентичный текст.

Цель:

сохранять корректность reasoning и structure.

⸻

44. AI EVALUATION

AI quality может оцениваться по:

* factual grounding;
* evidence accuracy;
* recommendation relevance;
* uncertainty calibration;
* consistency;
* usefulness.

⸻

45. HUMAN REVIEW

Для новых AI features желательно использовать human review.

Особенно:

* recommendations;
* automated actions;
* new reasoning flows.

⸻

46. AI REGRESSION

Изменение:

* model;
* prompt;
* context;
* provider;
* tool;

не должно незаметно ухудшить качество.

Поэтому AI evaluation запускается повторно.

⸻

47. MODEL SWITCH TEST

Если AI provider заменяется, система должна проверять:

* schema compatibility;
* quality;
* latency;
* cost;
* privacy requirements.

⸻

48. DATA QUALITY SCORE

Для важных data pipelines можно вычислять quality indicators.

Например:

* completeness;
* freshness;
* consistency;
* duplication rate.

⸻

49. DATA ANOMALIES

Необычные значения должны выявляться.

Например:

если API внезапно сообщает performance в 100 раз выше обычного, система должна рассмотреть возможность ошибки данных.

⸻

50. DO NOT LEARN FROM CORRUPTED DATA

Критическое правило:

если данные имеют подозрительное качество, они не должны автоматически становиться новым knowledge.

⸻

51. TEST ENVIRONMENTS

Tests должны использовать безопасные test accounts и datasets.

Production credentials не используются в обычных automated tests.

⸻

52. TEST DATA PRIVACY

Test data не должна содержать реальные sensitive user data без необходимости.

⸻

53. CI QUALITY GATES

Перед merge или deployment могут проверяться:

* tests;
* lint;
* type checking;
* security scan;
* build.

⸻

54. CRITICAL TESTS

Некоторые тесты блокируют deployment.

Например:

* authentication broken;
* database migration broken;
* user isolation broken;
* critical API unavailable.

⸻

55. NON-CRITICAL TESTS

Некоторые проблемы могут быть logged без блокировки deployment.

Это зависит от severity.

⸻

56. TEST PRIORITY

Тестирование должно быть пропорционально риску.

Самые строгие тесты применяются к:

* security;
* money, если появится;
* data integrity;
* destructive operations;
* AI actions;
* user isolation.

⸻

57. TEST COVERAGE

Coverage является полезным показателем, но не самоцелью.

100% coverage не означает 100% качества.

⸻

58. EDGE CASES

Нужно специально тестировать:

* empty input;
* huge input;
* duplicate data;
* missing data;
* unexpected characters;
* expired tokens;
* delayed events;
* simultaneous actions.

⸻

59. CONCURRENCY

Система должна корректно обрабатывать ситуации, когда два действия происходят одновременно.

Например:

два worker process не должны дважды применить одну destructive operation.

⸻

60. RACE CONDITIONS

Критические state transitions должны защищаться от race conditions.

⸻

61. TIME-BASED TESTS

Система должна корректно работать при:

* timezone differences;
* daylight saving changes;
* month boundaries;
* year boundaries;
* delayed events.

⸻

62. HISTORICAL DATA TESTS

Analytics должна корректно работать с:

* старой информацией;
* новой информацией;
* missing periods;
* different data density.

⸻

63. FRESHNESS TESTS

Система должна правильно определять:

* fresh;
* aging;
* stale data.

И учитывать freshness при reasoning.

⸻

64. USER DECISION TESTS

Проверяется, что:

ACCEPT

REJECT

MODIFY

DEFER

имеют разные последствия.

⸻

65. LEARNING TESTS

Если пользователь отклоняет recommendation, knowledge не должно автоматически становиться:

«recommendation was wrong».

Нужно учитывать контекст решения.

⸻

66. FEEDBACK TESTS

User feedback должен попадать в правильный domain context.

Например:

«не подходит моему стилю»

не должно интерпретироваться как:

«performance prediction incorrect».

⸻

67. EXPLAINABILITY TESTS

Если система показывает explanation, её claims должны соответствовать underlying data.

⸻

68. NO CONTRADICTORY UI

Frontend не должен одновременно показывать:

«high confidence»

и:

«insufficient evidence».

⸻

69. QUALITY LEVELS

Каждый major feature может иметь:

Experimental

ещё тестируется.

Beta

доступен ограниченно.

Stable

прошёл необходимые проверки.

Deprecated

больше не развивается.

⸻

70. RELEASE CHECKLIST

Перед production release:

* tests passed;
* migrations verified;
* security checks passed;
* monitoring active;
* rollback available;
* backup available;
* critical flows verified.

⸻

71. POST-RELEASE MONITORING

После release необходимо наблюдать:

* error rate;
* latency;
* job failures;
* AI quality signals;
* user feedback.

⸻

72. INCIDENT FEEDBACK LOOP

Каждый серьёзный incident должен приводить к:

исправлению

и, где возможно:

новому automated test.

⸻

73. QUALITY PRINCIPLE

Ошибка, которая однажды произошла и может повториться, должна по возможности превратиться в regression test.

⸻

74. FINAL TESTING MODEL

CODE

↓

UNIT

↓

INTEGRATION

↓

E2E

↓

SECURITY

↓

PERFORMANCE

↓

AI EVALUATION

↓

STAGING

↓

PRODUCTION

↓

MONITORING

↓

FEEDBACK

↓

REGRESSION TEST

⸻

75. ФИНАЛЬНЫЙ ПРИНЦИП

Качество приложения определяется не отсутствием ошибок.

Оно определяется тем, насколько хорошо система:

обнаруживает ошибки, ограничивает их последствия, восстанавливается после них и учится не допускать их снова.