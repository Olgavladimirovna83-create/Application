46_PRODUCTION_OPERATIONS_AND_RELIABILITY

1. Назначение документа

PRODUCTION_OPERATIONS_AND_RELIABILITY определяет правила эксплуатации приложения после выхода в production.

Главный принцип:

production должна быть управляемой системой, а не просто местом, куда однажды загрузили работающий код.

⸻

2. PRODUCTION OBJECTIVES

Production должна обеспечивать:

* availability;
* reliability;
* observability;
* security;
* recoverability;
* predictable deployments;
* controlled changes.

⸻

3. ENVIRONMENTS

Минимально:

* development;
* test;
* staging;
* production.

⸻

4. ENVIRONMENT ISOLATION

Каждый environment должен иметь отдельные:

* credentials;
* secrets;
* databases;
* integrations;
* configuration.

⸻

5. PRODUCTION DATA

Production data не должна использоваться в development без необходимых safeguards.

⸻

6. DEPLOYMENT

Deployment должен быть:

* reproducible;
* automated where practical;
* logged;
* reversible where possible.

⸻

7. CI/CD

Pipeline должен выполнять:

Code

↓

Tests

↓

Build

↓

Security checks

↓

Deploy

↓

Smoke tests

⸻

8. RELEASE ARTIFACT

Каждый production release должен быть идентифицируемым.

Например:

* version;
* commit;
* build identifier.

⸻

9. CONFIGURATION

Application configuration должна быть отделена от application code.

⸻

10. SECRETS

Secrets должны храниться через dedicated secrets management mechanism.

Не:

* в source code;
* в git;
* в обычных logs;
* в frontend bundle.

⸻

11. FEATURE FLAGS

Для некоторых features желательно использовать feature flags.

Это позволяет:

* постепенно включать functionality;
* ограничивать rollout;
* быстро отключать problematic feature.

⸻

12. ROLLOUT

Изменения могут выпускаться:

* internally;
* для небольшой группы;
* постепенно;
* для всех пользователей.

⸻

13. ROLLBACK

Для каждого критического release должен существовать понятный rollback strategy.

⸻

14. DATABASE CHANGES

Database migrations должны быть:

* versioned;
* tested;
* tracked.

⸻

15. BACKWARD COMPATIBILITY

Если frontend и backend обновляются независимо, API и schema должны поддерживать необходимую backward compatibility.

⸻

16. ZERO-DOWNTIME CHANGES

Если downtime недопустим, schema changes должны выполняться поэтапно.

⸻

17. HEALTH CHECKS

Application должна иметь health checks.

Минимально:

* application health;
* database connectivity;
* critical dependencies.

⸻

18. READINESS

Readiness показывает:

может ли instance принимать traffic.

⸻

19. LIVENESS

Liveness показывает:

работает ли process корректно.

⸻

20. MONITORING

Необходимо отслеживать:

* errors;
* latency;
* throughput;
* resource usage;
* failed jobs;
* external API failures.

⸻

21. SERVICE LEVEL INDICATORS

Основные SLI могут включать:

* availability;
* request latency;
* error rate;
* successful sync rate.

⸻

22. SERVICE LEVEL OBJECTIVES

SLO определяются после появления реального usage pattern.

Не следует заранее создавать искусственно точные numbers без evidence.

⸻

23. ERROR BUDGET

После определения SLO можно использовать error budget для баланса:

reliability

и:

скорости изменений.

⸻

24. LOGGING

Logs должны быть:

* structured;
* searchable;
* timestamped;
* correlated.

⸻

25. CORRELATION ID

Request или workflow должен иметь correlation identifier, позволяющий проследить путь операции через несколько services.

⸻

26. LOG LEVELS

Минимально:

* debug;
* info;
* warning;
* error.

⸻

27. LOG PRIVACY

Logs не должны содержать:

* passwords;
* tokens;
* secrets;
* unnecessary personal information.

⸻

28. ALERTING

Alerts должны создаваться для meaningful failures.

Не следует создавать тысячи alerts, которые команда перестанет замечать.

⸻

29. ALERT PRIORITIES

Например:

Critical

Immediate response.

High

Rapid investigation.

Medium

Normal operational response.

Low

Review during routine maintenance.

⸻

30. ALERT QUALITY

Каждый critical alert должен отвечать:

* что произошло;
* где;
* насколько серьёзно;
* когда началось;
* что можно проверить.

⸻

31. INCIDENT MANAGEMENT

Базовый процесс:

Detect

↓

Assess

↓

Contain

↓

Recover

↓

Verify

↓

Document

⸻

32. INCIDENT OWNER

Каждый серьёзный incident должен иметь ответственного.

⸻

33. INCIDENT COMMUNICATION

Для серьёзных incidents должна существовать понятная коммуникация между ответственными людьми.

⸻

34. USER IMPACT

При incident необходимо определить:

* affected users;
* affected data;
* affected functionality;
* duration.

⸻

35. DEGRADED MODE

Если отдельный компонент недоступен, приложение должно по возможности продолжать работать без него.

⸻

36. AI FAILURE

Если AI provider недоступен:

необходимо определить fallback behaviour.

Например:

* показать existing analytics;
* сохранить pending request;
* временно отключить AI explanation.

⸻

37. EXTERNAL API FAILURE

Если integration provider недоступен:

* retry;
* status;
* delayed sync;
* user notification, если необходимо.

⸻

38. QUEUE FAILURE

Background jobs не должны silently disappear.

Необходимо иметь:

* durable queue;
* retry state;
* failure state;
* monitoring.

⸻

39. DEAD LETTER

Jobs, которые невозможно обработать автоматически, должны попадать в controlled failure state.

⸻

40. DATABASE FAILURE

Необходимо определить:

* detection;
* retry;
* failover, если предусмотрен;
* recovery.

⸻

41. STORAGE FAILURE

Аналогично необходимо определить behaviour при недоступности storage.

⸻

42. RATE LIMITING

Для external providers и собственных API необходимо учитывать rate limits.

⸻

43. BACKPRESSURE

При росте нагрузки система должна уметь ограничивать processing вместо неконтролируемого накопления нагрузки.

⸻

44. RESOURCE LIMITS

Workers и services должны иметь controlled resource limits.

⸻

45. COST MONITORING

Необходимо отслеживать:

* infrastructure cost;
* database cost;
* storage;
* external APIs;
* AI usage.

⸻

46. AI COST CONTROL

AI requests могут контролироваться через:

* rate limits;
* caching;
* model selection;
* context limits;
* retry limits.

⸻

47. COST ANOMALIES

Резкий рост AI или infrastructure cost должен создавать investigation signal.

⸻

48. PERFORMANCE REGRESSION

После release необходимо отслеживать:

* latency changes;
* CPU;
* memory;
* database load;
* AI latency.

⸻

49. CAPACITY

Capacity planning основывается на реальном usage.

Не нужно преждевременно строить infrastructure для нагрузки, которой пока нет.

⸻

50. SCALING

Scaling может происходить по:

* users;
* requests;
* background jobs;
* integrations;
* data volume.

⸻

51. HORIZONTAL SCALING

Stateless application components желательно проектировать так, чтобы их можно было масштабировать горизонтально.

⸻

52. STATE

State, который должен сохраняться между instances, хранится во внешнем persistent layer.

⸻

53. CACHE

Cache используется для:

* performance;
* reducing repeated work;
* reducing external API calls.

Но cache не должен становиться единственным источником critical data.

⸻

54. CACHE INVALIDATION

Для каждого critical cache необходимо понимать:

* TTL;
* invalidation;
* stale behaviour.

⸻

55. DATA FRESHNESS

Production monitoring должен отслеживать freshness critical datasets.

⸻

56. SYNC MONITORING

Для integrations необходимо видеть:

* last successful sync;
* current sync status;
* failures;
* retry count.

⸻

57. AI MONITORING

Необходимо отслеживать:

* request count;
* latency;
* errors;
* token usage;
* cost;
* provider availability.

⸻

58. AI QUALITY MONITORING

Technical monitoring недостаточен.

Также необходимо периодически оценивать:

* grounding;
* hallucinations;
* recommendation quality;
* confidence calibration.

⸻

59. MODEL CHANGE

При изменении AI provider или model:

baseline

↓

evaluation

↓

limited rollout

↓

monitoring

⸻

60. PROMPT CHANGE

Prompt changes должны проходить regression evaluation.

⸻

61. DATA SCHEMA MONITORING

Неожиданные external schema changes должны обнаруживаться автоматически там, где возможно.

⸻

62. API VERSIONING

При необходимости breaking changes должны использовать versioning или controlled migration.

⸻

63. DEPENDENCY MANAGEMENT

Dependencies должны:

* фиксироваться;
* регулярно обновляться;
* проверяться на security issues.

⸻

64. SECURITY PATCHING

Critical security updates имеют повышенный priority.

⸻

65. MAINTENANCE WINDOWS

Planned maintenance должна быть заранее определена, если она может повлиять на users.

⸻

66. BACKUPS

Backups должны быть:

* automated;
* monitored;
* protected;
* tested.

⸻

67. RESTORE

Backup считается полезным только после подтверждения, что из него действительно можно восстановить систему.

⸻

68. DISASTER RECOVERY

Необходимо определить:

* RPO;
* RTO;

когда system scale и business requirements делают эти показатели meaningful.

⸻

69. RPO

Recovery Point Objective определяет допустимую потерю данных по времени.

⸻

70. RTO

Recovery Time Objective определяет допустимое время восстановления.

⸻

71. BUSINESS CONTINUITY

Для critical functionality должен существовать recovery plan.

⸻

72. RUNBOOKS

Для повторяющихся incidents должны существовать короткие runbooks.

Например:

* database unavailable;
* AI provider unavailable;
* integration token expired;
* queue stuck;
* high error rate.

⸻

73. ON-CALL

При росте production system может потребоваться on-call responsibility.

⸻

74. INCIDENT POSTMORTEM

После серьёзного incident:

* cause;
* impact;
* timeline;
* resolution;
* prevention.

⸻

75. BLAMELESS CULTURE

Postmortem должен искать:

что в системе позволило ошибке произойти и остаться незамеченной

а не:

кого обвинить.

⸻

76. OPERATIONAL DOCUMENTATION

Документация должна включать:

* deployment;
* rollback;
* recovery;
* integrations;
* configuration;
* incidents.

⸻

77. CHANGE MANAGEMENT

Critical changes должны быть:

* documented;
* reviewable;
* traceable.

⸻

78. EMERGENCY CHANGE

Emergency change допускается при:

* security incident;
* severe outage;
* data corruption;
* critical production failure.

После него documentation должна быть обновлена.

⸻

79. PRODUCTION READINESS

Перед запуском необходимо подтвердить:

* monitoring;
* alerts;
* backup;
* restore;
* security;
* rollback;
* incident process.

⸻

80. PRODUCTION CHECKLIST

Минимальный checklist:

Code

✓

Tests

✓

Security

✓

Monitoring

✓

Backup

✓

Rollback

✓

Recovery

✓

Documentation

✓

⸻

81. RELIABILITY PRINCIPLE

Надёжность не означает:

никогда не ломаться.

Она означает:

быстро обнаруживать проблемы, ограничивать их влияние и предсказуемо восстанавливаться.

⸻

82. FINAL PRODUCTION LOOP

DEPLOY

↓

OBSERVE

↓

DETECT

↓

RESPOND

↓

RECOVER

↓

LEARN

↓

IMPROVE

⸻

83. ФИНАЛЬНЫЙ ПРИНЦИП

Production должна быть частью архитектуры, а не последним этапом после разработки.

Система считается зрелой не тогда, когда она успешно работает в идеальных условиях, а тогда, когда команда понимает:

что произойдёт при сбое, как это будет обнаружено, как ограничить последствия, как восстановиться и как сделать так, чтобы следующая версия была надёжнее предыдущей.