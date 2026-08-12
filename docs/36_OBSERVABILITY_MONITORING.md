36_OBSERVABILITY_MONITORING

1. Назначение документа

OBSERVABILITY_MONITORING определяет, как система понимает собственное состояние, обнаруживает проблемы и позволяет разработчику быстро определить их причину.

Главный принцип:

недостаточно знать, что приложение сломалось, нужно понимать, где, почему и насколько сильно.

⸻

2. OBSERVABILITY VS MONITORING

Monitoring отвечает на вопрос:

«Есть ли проблема?»

Observability помогает ответить:

«Почему возникла проблема?»

Они должны работать вместе.

⸻

3. ОСНОВНЫЕ СИГНАЛЫ

Система должна собирать три основных типа telemetry:

* logs;
* metrics;
* traces.

Дополнительно:

* errors;
* events;
* AI evaluation signals;
* business metrics.

⸻

4. LOGS

Logs фиксируют отдельные события.

Например:

* request received;
* sync started;
* sync failed;
* recommendation created;
* AI request completed.

⸻

5. STRUCTURED LOGGING

Logs должны быть структурированными.

Предпочтительно:

{
  "timestamp": "...",
  "service": "recommendation",
  "level": "error",
  "event": "generation_failed",
  "correlation_id": "..."
}

Это позволяет автоматически искать и группировать ошибки.

⸻

6. LOG LEVELS

Минимально:

* debug;
* info;
* warn;
* error;
* critical.

⸻

7. DEBUG

Используется для детальной диагностики.

В production debug logging должен контролироваться, чтобы не создавать лишний объём данных.

⸻

8. INFO

Нормальные значимые события.

Например:

SYNC_COMPLETED.

⸻

9. WARN

Ситуация необычная, но система продолжает работать.

Например:

DATA_STALE.

⸻

10. ERROR

Операция не выполнена.

Например:

EXTERNAL_API_REQUEST_FAILED.

⸻

11. CRITICAL

Система или важная часть системы находится в серьёзном состоянии.

Например:

DATABASE_UNAVAILABLE.

⸻

12. METRICS

Metrics показывают состояние системы во времени.

Минимально:

* request count;
* error count;
* latency;
* throughput;
* queue size;
* job duration;
* database load;
* AI latency;
* AI error rate.

⸻

13. REQUEST LATENCY

Измеряется:

* average;
* median;
* p95;
* p99.

Среднее значение само по себе недостаточно.

⸻

14. ERROR RATE

Важно отслеживать:

errors / total requests.

Рост error rate может указывать на:

* deployment problem;
* external outage;
* database issue;
* code regression.

⸻

15. THROUGHPUT

Показывает, сколько операций система обрабатывает за единицу времени.

⸻

16. QUEUE METRICS

Для background processing:

* queue length;
* oldest job age;
* processing rate;
* failure rate;
* retry count.

⸻

17. WORKER METRICS

Для workers:

* active jobs;
* completed jobs;
* failed jobs;
* average duration;
* concurrency.

⸻

18. DATABASE METRICS

Минимально:

* connection count;
* query latency;
* error rate;
* storage usage;
* CPU;
* memory;
* slow queries.

⸻

19. STORAGE METRICS

Для object storage:

* storage volume;
* upload failures;
* download failures;
* growth rate.

⸻

20. EXTERNAL API METRICS

Для каждой integration:

* request count;
* success rate;
* error rate;
* latency;
* rate-limit events;
* authentication failures.

⸻

21. AI METRICS

AI Layer должен отслеживаться отдельно.

Например:

* request count;
* latency;
* failures;
* token usage;
* estimated cost;
* provider;
* model;
* structured-output validation failures.

⸻

22. AI QUALITY METRICS

Технической telemetry недостаточно.

Нужно также отслеживать:

* recommendation acceptance;
* rejection;
* modification;
* user feedback;
* evidence validation failures;
* hallucination reports.

⸻

23. COST MONITORING

AI и external API costs должны быть видимыми.

Например:

* cost per user;
* cost per analysis;
* cost per recommendation;
* monthly total.

⸻

24. CORRELATION ID

Каждый значимый request должен иметь:

correlation_id.

Он позволяет связать:

frontend request

↓

API

↓

service

↓

job

↓

AI request

↓

database operation.

⸻

25. TRACE

Trace показывает путь одной операции через систему.

⸻

26. DISTRIBUTED TRACE

Например:

POST /analyze

↓

Analytics Service

↓

Data Pipeline

↓

AI Service

↓

Database

↓

Recommendation Service.

Trace должен позволить увидеть, где возникла задержка.

⸻

27. USER CONTEXT

Telemetry может содержать user context, но только минимально необходимый и без раскрытия sensitive data.

⸻

28. NO SECRETS IN TELEMETRY

Нельзя логировать:

* passwords;
* API keys;
* access tokens;
* refresh tokens;
* encryption keys.

⸻

29. PII CONTROL

Personal information в telemetry должна быть минимизирована.

⸻

30. BUSINESS EVENTS

Помимо технических событий нужно отслеживать значимые product events.

Например:

* recommendation created;
* recommendation accepted;
* recommendation rejected;
* action completed;
* outcome measured;
* pattern established.

⸻

31. BUSINESS METRICS

Это позволяет понимать не только:

«работает ли сервер?»

но и:

«работает ли продукт?»

⸻

32. PRODUCT HEALTH

Можно отслеживать:

* active users;
* recommendation engagement;
* action completion;
* analysis usage;
* retention;
* feature usage.

⸻

33. DATA HEALTH

Для data pipeline:

* freshness;
* completeness;
* duplication;
* invalid records;
* synchronization failures.

⸻

34. FRESHNESS MONITORING

Если данные давно не обновлялись:

система должна обнаружить это до того, как stale data начнёт использоваться в reasoning.

⸻

35. DATA QUALITY ALERT

Например:

если внешний API внезапно возвращает намного меньше записей, чем обычно, система должна создать warning.

⸻

36. ANOMALY DETECTION

Необычные изменения в metrics могут автоматически помечаться.

Например:

* sudden error spike;
* sudden traffic drop;
* unusual AI cost;
* abnormal database load.

⸻

37. ALERTING

Alert создаётся, когда событие требует вмешательства.

⸻

38. ALERT SEVERITY

Минимально:

INFO

Наблюдение.

WARNING

Потенциальная проблема.

ERROR

Проблема требует проверки.

CRITICAL

Немедленное внимание.

⸻

39. ALERT FATIGUE

Слишком большое количество alerts делает систему бесполезной.

Поэтому alert должен создаваться только при наличии actionable problem.

⸻

40. ALERT DEDUPLICATION

Одна и та же проблема не должна создавать сотни одинаковых alerts.

⸻

41. ALERT GROUPING

Связанные alerts могут объединяться.

Например:

если database недоступна, десятки API errors могут быть сгруппированы вокруг одной причины.

⸻

42. ALERT ESCALATION

Если проблема не решается:

WARNING

↓

ERROR

↓

CRITICAL.

⸻

43. ON-CALL

На раннем этапе отдельная on-call команда может не требоваться.

Но должен существовать понятный способ реагировать на critical incidents.

⸻

44. INCIDENT CREATION

Critical alert может автоматически создать incident.

⸻

45. INCIDENT DATA

Incident должен содержать:

* start time;
* affected services;
* severity;
* current status;
* detected signal;
* relevant logs;
* relevant traces.

⸻

46. INCIDENT LIFECYCLE

DETECTED

↓

INVESTIGATING

↓

MITIGATING

↓

RESOLVED

↓

POSTMORTEM

⸻

47. HEALTH DASHBOARD

Для разработчика должен существовать общий health dashboard.

Например:

* API;
* database;
* workers;
* queues;
* integrations;
* AI;
* storage.

⸻

48. SERVICE HEALTH

Каждый важный service должен иметь:

* health;
* latency;
* errors;
* throughput.

⸻

49. DEPLOYMENT MONITORING

После deployment система должна особенно внимательно отслеживать:

* error rate;
* latency;
* crashes;
* job failures;
* business regressions.

⸻

50. RELEASE COMPARISON

Желательно сравнивать:

до deployment

и:

после deployment.

Это помогает обнаружить regression.

⸻

51. CANARY MONITORING

Если используется gradual release, новая версия может наблюдаться отдельно.

⸻

52. FEATURE FLAG MONITORING

Для feature flag можно измерять:

* usage;
* errors;
* performance;
* user feedback.

⸻

53. AI PROVIDER MONITORING

Если используется несколько AI providers, telemetry должна позволять сравнивать:

* latency;
* cost;
* failures;
* output validation;
* user outcomes.

⸻

54. PROVIDER OUTAGE

При недоступности одного provider система должна:

* обнаружить outage;
* прекратить бессмысленные retries;
* использовать fallback, если предусмотрен;
* сохранить failed state;
* восстановить работу после восстановления provider.

⸻

55. AI QUALITY DEGRADATION

Даже если AI API технически работает, качество может ухудшаться.

Поэтому необходимо отслеживать:

* user rejection;
* unsupported claims;
* evidence mismatch;
* unexpected output structure.

⸻

56. RECOMMENDATION HEALTH

Recommendation system можно оценивать через:

* acceptance rate;
* rejection rate;
* modification rate;
* outcome quality;
* confidence calibration.

⸻

57. CONFIDENCE MONITORING

Если recommendations с высоким confidence регулярно отклоняются или не дают ожидаемого результата, система должна сигнализировать о возможной проблеме calibration.

⸻

58. KNOWLEDGE HEALTH

Для Knowledge Layer можно отслеживать:

* количество active patterns;
* stale patterns;
* conflicting knowledge;
* recently updated knowledge;
* low-confidence knowledge.

⸻

59. KNOWLEDGE CONFLICTS

Если новые данные противоречат существующему knowledge:

система должна создавать сигнал для review.

⸻

60. DATA PIPELINE HEALTH

Pipeline должен иметь собственные metrics:

* ingestion rate;
* transformation failures;
* processing delay;
* incomplete datasets.

⸻

61. EVENT SYSTEM HEALTH

Для event infrastructure:

* event throughput;
* processing latency;
* failed events;
* retry count;
* dead-letter queue size.

⸻

62. DEAD-LETTER QUEUE

Events, которые не удалось обработать после допустимого количества retries, должны попадать в отдельное место для диагностики.

⸻

63. LOG RETENTION

Logs должны храниться ограниченное время согласно:

* operational requirements;
* privacy requirements;
* cost.

⸻

64. TELEMETRY COST

Observability сама потребляет ресурсы.

Поэтому необходимо контролировать:

* log volume;
* trace sampling;
* metric cardinality;
* storage.

⸻

65. TRACE SAMPLING

Не каждый request обязательно должен сохраняться с полной детализацией.

Для обычных операций можно использовать sampling.

Ошибки и critical requests могут сохраняться полностью.

⸻

66. DASHBOARD PRINCIPLE

Dashboard не должен показывать сотни метрик без приоритета.

Сначала:

что сломалось?

Затем:

где?

Затем:

почему?

⸻

67. DEVELOPER EXPERIENCE

Разработчик должен иметь возможность пройти путь:

Alert

↓

Service

↓

Trace

↓

Log

↓

Root Cause

без ручного поиска по десяткам систем.

⸻

68. USER-FACING STATUS

Некоторые observability signals могут использоваться для пользовательского статуса.

Например:

«Instagram sync temporarily unavailable».

Но технические детали остаются внутри developer monitoring.

⸻

69. PRIVACY

Observability должна соответствовать требованиям:

30_SECURITY_PRIVACY.

⸻

70. TESTING

Observability должна тестироваться.

Например:

при критической ошибке должен появляться соответствующий log и alert.

⸻

71. FAILURE OF OBSERVABILITY

Если monitoring сам перестал работать, это тоже должно быть обнаруживаемо.

⸻

72. MVP OBSERVABILITY

Для MVP достаточно:

* structured logs;
* error tracking;
* basic metrics;
* health checks;
* basic alerts;
* database monitoring;
* background job monitoring;
* AI usage monitoring.

⸻

73. ПОЗДНЕЕ

При росте можно добавить:

* distributed tracing;
* advanced anomaly detection;
* sophisticated dashboards;
* automated incident response;
* advanced AI quality monitoring.

⸻

74. FINAL OBSERVABILITY MODEL

APPLICATION

↓

LOGS

METRICS

TRACES

BUSINESS EVENTS

AI QUALITY

↓

MONITORING

↓

ALERT

↓

INCIDENT

↓

ROOT CAUSE

↓

FIX

↓

REGRESSION TEST

⸻

75. ФИНАЛЬНЫЙ ПРИНЦИП

Хорошая observability превращает проблему:

«что-то не работает»

в конкретный ответ:

«после последнего deployment увеличилась задержка recommendation service, проблема возникает только при определённом типе AI request, а источник ошибки находится в конкретной integration».

Именно такая прозрачность позволяет масштабировать сложную систему, не превращая её поддержку в угадайку.