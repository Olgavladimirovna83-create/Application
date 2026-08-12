30_SECURITY_PRIVACY

1. Назначение документа

SECURITY_PRIVACY определяет основные требования к безопасности, приватности и защите данных приложения.

Главный принцип:

безопасность должна быть встроена в архитектуру с самого начала, а не добавлена после создания продукта.

⸻

2. ОСНОВНОЙ ПРИНЦИП

Система должна защищать:

* аккаунты пользователей;
* пользовательские данные;
* данные внешних платформ;
* аналитическую историю;
* recommendations;
* AI context;
* API credentials;
* внутреннюю инфраструктуру.

⸻

3. SECURITY BY DESIGN

Каждый новый модуль должен рассматриваться с точки зрения:

* какие данные он получает;
* кто может получить к ним доступ;
* что он может изменить;
* какие последствия будут при компрометации.

⸻

4. LEAST PRIVILEGE

Каждый компонент получает только те права, которые ему действительно необходимы.

Например:

Analytics Service может читать performance.

Но ему не нужны:

* authentication credentials;
* payment data;
* другие пользовательские аккаунты.

⸻

5. USER ISOLATION

Данные разных пользователей должны быть логически изолированы.

Каждый запрос должен выполняться в соответствующем:

user context.

Нельзя получить данные другого пользователя только потому, что известен ID объекта.

⸻

6. AUTHENTICATION

Authentication должен подтверждать личность пользователя.

Возможные механизмы:

* secure session;
* OAuth;
* token-based authentication;
* passwordless authentication.

Конкретный механизм определяется на этапе реализации.

⸻

7. PASSWORDS

Если приложение хранит пароли, они не должны храниться в открытом виде.

Используется современный password hashing mechanism.

Но если authentication полностью делегирован trusted identity provider, хранить пароли внутри приложения вообще не требуется.

⸻

8. SESSION SECURITY

Сессии должны иметь:

* expiration;
* secure storage;
* revocation;
* rotation там, где необходимо.

После logout сессия должна быть корректно инвалидирована.

⸻

9. AUTHORIZATION

Authentication недостаточно.

Каждая операция должна проверять:

имеет ли этот пользователь право выполнять действие?

⸻

10. RESOURCE OWNERSHIP

Перед возвратом любого resource backend должен проверить ownership.

Например:

content_id

сам по себе не является разрешением на получение content.

⸻

11. ROLE MODEL

Если в будущем появятся team accounts, можно добавить роли:

* owner;
* admin;
* editor;
* viewer.

Но для MVP достаточно user-level authorization.

⸻

12. API SECURITY

API должен защищаться от:

* unauthorized access;
* brute force;
* abuse;
* excessive requests;
* malformed input;
* privilege escalation.

⸻

13. RATE LIMITING

Rate limiting применяется как минимум к:

* authentication;
* sensitive endpoints;
* expensive AI operations;
* external sync;
* publishing;
* public endpoints.

⸻

14. INPUT VALIDATION

Все входные данные должны проверяться backend.

Нельзя доверять:

* frontend validation;
* client-side types;
* user-provided IDs;
* user-provided URLs;
* AI-generated values.

⸻

15. OUTPUT VALIDATION

Данные, возвращаемые:

* AI;
* external APIs;
* third-party integrations;

должны проходить validation перед использованием внутри системы.

⸻

16. INJECTION PROTECTION

Система должна защищаться от:

* SQL injection;
* command injection;
* template injection;
* prompt injection;
* XSS;
* других соответствующих injection attacks.

⸻

17. DATABASE SECURITY

Database credentials не должны находиться во frontend.

Database должен быть доступен только через backend services или контролируемый server-side access layer.

⸻

18. DATABASE ENCRYPTION

Чувствительные данные должны защищаться encryption at rest там, где это необходимо.

⸻

19. DATA IN TRANSIT

Передача данных между:

* frontend;
* backend;
* database;
* external providers;

должна использовать защищённые соединения.

⸻

20. SECRETS

Secrets не должны находиться:

* в source code;
* в Git;
* в frontend bundle;
* в публичной документации.

⸻

21. SECRET MANAGEMENT

Для production необходимо использовать отдельный secret management mechanism.

Например:

* environment secrets;
* managed secret storage;
* cloud secret manager.

Конкретный инструмент определяется инфраструктурой.

⸻

22. EXTERNAL PLATFORM CREDENTIALS

Access tokens внешних платформ должны храниться отдельно от обычных пользовательских данных.

Frontend не должен получать секретные credentials.

⸻

23. TOKEN ENCRYPTION

Если credentials необходимо сохранять, они должны быть защищены encryption at rest.

Ключи шифрования не должны храниться рядом с зашифрованными credentials без дополнительной защиты.

⸻

24. TOKEN ROTATION

Если external provider поддерживает token rotation, система должна использовать соответствующий механизм.

⸻

25. TOKEN REVOCATION

При disconnect external account:

* credentials должны быть инвалидированы или удалены согласно provider policy;
* account connection должен получить статус disconnected;
* дальнейшие sync jobs должны быть остановлены.

⸻

26. AI PRIVACY

AI Layer должен отправлять внешнему AI provider только необходимые данные.

Не следует отправлять:

* access tokens;
* passwords;
* unnecessary personal information;
* internal secrets;
* unrelated user data.

⸻

27. AI CONTEXT MINIMIZATION

AI context должен быть минимальным, достаточным для выполнения задачи.

Например для анализа публикации не требуется отправлять:

* все данные пользователя;
* credentials;
* историю всех аккаунтов.

⸻

28. PROVIDER POLICY

Для каждого AI provider необходимо заранее знать:

* какие данные передаются;
* как они обрабатываются;
* retention policy;
* возможное использование данных provider;
* регион обработки, если это важно;
* contractual privacy requirements.

⸻

29. PROVIDER SWITCHING

Архитектура должна позволять сменить AI provider, если его:

* privacy policy;
* pricing;
* availability;
* capabilities;
* legal requirements

перестали соответствовать требованиям продукта.

⸻

30. DATA CLASSIFICATION

Данные желательно классифицировать.

Например:

PUBLIC

данные, которые могут быть публичными.

INTERNAL

внутренние данные приложения.

PRIVATE

пользовательские данные.

SENSITIVE

данные, требующие дополнительной защиты.

SECRET

credentials и ключи.

⸻

31. DATA MINIMIZATION

Система должна хранить только те данные, которые имеют реальную ценность для продукта.

Не следует собирать данные:

«на всякий случай».

⸻

32. PURPOSE LIMITATION

Каждый тип данных должен иметь понятную цель использования.

Например:

performance metrics

→ analytics.

external token

→ synchronization.

user preference

→ personalization.

⸻

33. RETENTION

Для каждого класса данных должна существовать retention policy.

Нельзя автоматически хранить всё бесконечно без причины.

⸻

34. HISTORICAL ANALYTICS

При этом аналитическая история может иметь долгий срок хранения, если она действительно необходима для:

* baseline;
* pattern detection;
* long-term learning;
* comparison.

Старые данные могут иметь меньший аналитический вес, но это не означает, что их нужно автоматически удалять.

⸻

35. DELETION

Если пользователь удаляет аккаунт, система должна иметь понятный deletion process.

Нужно определить, какие данные:

* удаляются сразу;
* удаляются асинхронно;
* anonymized;
* сохраняются только при наличии законного основания.

⸻

36. USER DATA EXPORT

Архитектура должна позволять в будущем предоставить пользователю экспорт собственных данных.

Например:

* content;
* performance;
* decisions;
* recommendations;
* preferences.

⸻

37. AUDIT LOG

Критические действия должны логироваться.

Например:

* login;
* external account connected;
* external account disconnected;
* recommendation accepted;
* recommendation rejected;
* important settings changed;
* data deletion requested.

⸻

38. AUDIT LOG PRIVACY

Audit logs также содержат данные и должны защищаться.

Они не должны превращаться в неограниченное хранилище персональной информации.

⸻

39. SECURITY EVENTS

Система должна фиксировать события:

* failed authentication;
* suspicious activity;
* repeated authorization failures;
* abnormal API usage;
* credential errors;
* unexpected external access.

⸻

40. MONITORING

Security monitoring должен позволять обнаруживать:

* необычные spikes;
* repeated failures;
* unusual access patterns;
* compromised credentials;
* suspicious requests.

⸻

41. ALERTING

Критические security events должны иметь alert mechanism.

Например:

много неудачных authentication attempts.

или:

unexpected external API activity.

⸻

42. BACKUPS

Критические данные должны иметь backups.

Backup policy должна учитывать:

* frequency;
* retention;
* encryption;
* restoration testing.

⸻

43. BACKUP SECURITY

Backup не должен быть менее защищён, чем production database.

⸻

44. DISASTER RECOVERY

Система должна иметь план восстановления после:

* database failure;
* infrastructure outage;
* corrupted data;
* compromised credentials;
* external service outage.

⸻

45. RECOVERY TESTING

Backup считается полезным только если из него реально можно восстановиться.

Поэтому restoration необходимо периодически тестировать.

⸻

46. EXTERNAL SERVICE FAILURE

Если внешняя платформа недоступна:

приложение не должно терять уже сохранённые данные.

Например:

Instagram API unavailable

не должно означать:

database unavailable.

⸻

47. AI PROVIDER FAILURE

Если AI provider недоступен:

система должна сохранять существующие:

* data;
* analytics;
* knowledge;
* recommendations.

AI operation может перейти в:

AI_UNAVAILABLE.

⸻

48. FAIL-SAFE PRINCIPLE

При неопределённости система должна предпочитать:

не выполнить действие

вместо:

выполнить потенциально неправильное действие.

Особенно это относится к:

* publishing;
* deletion;
* account changes;
* external mutations.

⸻

49. USER CONFIRMATION

Для потенциально необратимых действий может требоваться явное подтверждение пользователя.

⸻

50. AI ACTION PERMISSIONS

AI не должен автоматически иметь права на критические операции.

Например:

AI может предложить:

publish_content.

Но отдельный permission layer решает, можно ли выполнить это действие.

⸻

51. PROMPT INJECTION

Поскольку система работает с пользовательским контентом, текст внутри этого контента может содержать инструкции, адресованные AI.

Такие инструкции должны рассматриваться как:

untrusted input.

AI не должен автоматически воспринимать пользовательский контент как системную команду.

⸻

52. TOOL ISOLATION

Если AI имеет доступ к tools, каждый tool должен иметь отдельные разрешения.

Например:

read_analytics

не означает:

delete_content.

⸻

53. READ VS WRITE

По возможности AI tools должны разделяться на:

* read;
* write;
* destructive.

Destructive operations требуют наиболее строгого контроля.

⸻

54. EXTERNAL URLS

Если пользователь или AI предоставляет URL для обработки, система должна валидировать:

* scheme;
* domain;
* access policy;
* redirects;
* content type.

Нельзя без контроля позволять backend обращаться к произвольным внутренним адресам.

⸻

55. FILE SECURITY

Если приложение принимает файлы, необходимо проверять:

* size;
* type;
* extension;
* content;
* malware risk;
* storage permissions.

⸻

56. LOG SECURITY

Логи не должны содержать:

* passwords;
* access tokens;
* refresh tokens;
* secret keys;
* полный sensitive payload без необходимости.

⸻

57. ERROR MESSAGES

Ошибки для пользователя не должны раскрывать внутреннюю инфраструктуру.

Например:

не показывать:

PostgreSQL connection failed on internal host...

Вместо этого:

Something went wrong. Please try again later.

Технические детали остаются во внутренних логах.

⸻

58. SECURITY HEADERS

Web application должна использовать подходящие security headers.

Конкретный набор определяется frontend infrastructure.

⸻

59. DEPENDENCY SECURITY

Third-party dependencies должны:

* регулярно обновляться;
* проверяться на известные уязвимости;
* удаляться, если больше не используются.

⸻

60. SUPPLY CHAIN SECURITY

Для production желательно:

* lock dependencies;
* контролировать build process;
* ограничивать неожиданные package changes;
* защищать CI/CD credentials.

⸻

61. CI/CD SECURITY

Production deployment credentials должны быть отделены от developer credentials.

⸻

62. ENVIRONMENTS

Минимально:

* development;
* staging;
* production.

Production secrets не должны использоваться в development.

⸻

63. STAGING

Staging должен максимально приближаться к production архитектурно, но использовать безопасные тестовые данные.

⸻

64. TEST DATA

Production personal data не следует без необходимости копировать в development или staging.

⸻

65. SECURITY TESTING

Необходимо предусмотреть:

* authentication tests;
* authorization tests;
* API validation tests;
* injection tests;
* secret leakage checks;
* dependency vulnerability scanning.

⸻

66. PRIVACY TESTING

Также необходимо проверять:

* user isolation;
* deletion;
* export;
* AI context minimization;
* absence of credentials in logs;
* правильность data retention.

⸻

67. INCIDENT RESPONSE

В случае security incident должна существовать процедура:

1. обнаружить;
2. ограничить;
3. определить масштаб;
4. устранить;
5. восстановить;
6. проверить;
7. документировать;
8. предотвратить повторение.

⸻

68. SECURITY OWNERSHIP

Даже если приложение маленькое, должна существовать понятная ответственность за:

* credentials;
* infrastructure;
* backups;
* dependencies;
* security incidents.

⸻

69. MVP SECURITY

Для MVP обязательно:

* secure authentication;
* authorization;
* user isolation;
* encrypted transport;
* secure secret storage;
* external token protection;
* input validation;
* API rate limiting;
* database access control;
* basic logging;
* backups;
* AI context minimization.

⸻

70. ПОЗДНЕЕ

По мере роста можно добавить:

* advanced threat detection;
* dedicated security monitoring;
* WAF;
* penetration testing;
* advanced secret management;
* granular team permissions;
* security analytics;
* automated compliance tooling.

⸻

71. КРИТИЧЕСКОЕ ПРАВИЛО

Нельзя защищать только интерфейс.

Frontend может скрыть кнопку.

Но backend должен всё равно проверить permission.

⸻

72. КРИТИЧЕСКОЕ ПРАВИЛО №2

Нельзя считать AI доверенным источником.

AI output должен проходить validation и соответствовать permissions.

⸻

73. КРИТИЧЕСКОЕ ПРАВИЛО №3

Чем более чувствительны данные, тем меньше компонентов должны иметь к ним доступ.

⸻

74. КРИТИЧЕСКОЕ ПРАВИЛО №4

Система должна быть безопасной даже при частичном отказе одного компонента.

Компрометация или недоступность одного provider не должна автоматически компрометировать всю систему.

⸻

75. КРИТИЧЕСКОЕ ПРАВИЛО №5

Приватность является частью архитектуры продукта.

Она должна учитываться при проектировании:

* database;
* API;
* AI Layer;
* Event System;
* Data Pipeline;
* integrations;
* logging.

⸻

76. ФИНАЛЬНАЯ МОДЕЛЬ

USER

↓

AUTHENTICATION

↓

AUTHORIZATION

↓

API

↓

DOMAIN SERVICES

↓

DATA / ANALYTICS / AI

При этом каждый слой получает только необходимые ему права.

⸻

77. ФИНАЛЬНЫЙ ПРИНЦИП

Приложение должно следовать простой архитектурной логике:

минимум данных → минимум доступа → максимум контроля → полная трассируемость критических действий.

Безопасность не должна мешать продукту работать, но продукт не должен жертвовать безопасностью ради удобства архитектуры.