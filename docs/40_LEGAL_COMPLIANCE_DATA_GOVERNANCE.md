40_LEGAL_COMPLIANCE_DATA_GOVERNANCE

1. Назначение документа

LEGAL_COMPLIANCE_DATA_GOVERNANCE определяет базовые правила работы приложения с пользовательскими данными, privacy, consent, retention и legal requirements.

Главный принцип:

система должна собирать и использовать только те данные, которые действительно нужны для заявленной функции, и должна быть прозрачной в отношении того, что происходит с этими данными.

⸻

2. DATA MINIMIZATION

Необходимо собирать только необходимые данные.

Если feature не требует определённого поля:

его не нужно собирать «на всякий случай».

⸻

3. PURPOSE LIMITATION

Для каждого существенного типа данных должно быть понятно:

зачем он нужен.

Например:

performance data используется для analytics и recommendations.

⸻

4. DATA CATEGORIES

Минимально следует различать:

* account data;
* authentication data;
* integration data;
* analytics data;
* content data;
* user preferences;
* AI interaction data;
* system telemetry.

⸻

5. SENSITIVE DATA

Sensitive information должна обрабатываться с повышенными требованиями безопасности и доступа.

Не следует собирать её без реальной необходимости.

⸻

6. PERSONAL DATA

Система должна понимать, какие данные могут считаться personal data в соответствующей юрисдикции.

Конкретные legal requirements должны проверяться юристом перед production launch.

⸻

7. CONSENT

Там, где processing требует consent, система должна:

* получить его;
* сохранить evidence;
* позволить отозвать его, когда это применимо.

⸻

8. CONSENT RECORD

Необходимо хранить:

* what was accepted;
* when;
* version of relevant policy;
* applicable context.

⸻

9. POLICY VERSIONING

Privacy Policy и Terms должны иметь версии.

Это позволяет определить, какую версию пользователь видел или принял.

⸻

10. PRIVACY NOTICE

Пользователь должен иметь понятное объяснение:

* какие данные собираются;
* зачем;
* где используются;
* с кем могут передаваться;
* сколько хранятся;
* какие права доступны.

⸻

11. THIRD-PARTY INTEGRATIONS

При подключении внешней платформы пользователь должен понимать:

что данные могут поступать из этой платформы в приложение.

⸻

12. OAUTH

Для OAuth integrations необходимо использовать безопасный authentication flow.

Система должна запрашивать только необходимые permissions.

⸻

13. MINIMUM PERMISSIONS

Если integration требует:

read

но не требует:

write

не следует запрашивать write permission.

⸻

14. ACCESS TOKENS

Access tokens должны храниться безопасно.

Они не должны:

* попадать в frontend;
* логироваться;
* сохраняться в обычных text fields без защиты.

⸻

15. REFRESH TOKENS

Refresh tokens требуют ещё более строгой защиты, поскольку позволяют получать новые access tokens.

⸻

16. DATA PROCESSING

Для каждого integration должен быть определён:

* источник;
* тип данных;
* цель;
* период хранения;
* способ удаления.

⸻

17. DATA RETENTION

Необходимо определить retention policy.

Разные типы данных могут иметь разные сроки хранения.

⸻

18. HISTORICAL DATA

Historical data может иметь долгосрочную ценность для analytics.

Но срок хранения должен соответствовать:

* legal requirements;
* privacy;
* product value.

⸻

19. AI DATA RETENTION

Необходимо отдельно определить, сколько хранятся:

* prompts;
* context;
* AI outputs;
* evaluation results.

⸻

20. AI PROVIDERS

Если данные передаются внешнему AI provider, пользователь должен получить необходимую информацию об этом в соответствии с применимыми требованиями.

⸻

21. MODEL TRAINING

Нужно явно определить:

используются ли пользовательские данные для training внешней AI model.

Нельзя подразумевать это автоматически.

⸻

22. PROVIDER POLICY

Для каждого AI provider необходимо проверить:

* data handling;
* retention;
* training policy;
* security;
* geographic processing;
* contractual requirements.

⸻

23. AI PROVIDER ABSTRACTION

Архитектура должна позволять заменить provider без переписывания всего AI Layer.

⸻

24. DATA LOCATION

Если существуют требования к geographic data processing, система должна знать:

где физически обрабатываются и хранятся данные.

⸻

25. CROSS-BORDER TRANSFER

Передача данных между юрисдикциями должна соответствовать применимым legal requirements.

Конкретные механизмы должны быть подтверждены специалистом по compliance.

⸻

26. USER RIGHTS

В зависимости от применимого законодательства пользователь может иметь права на:

* access;
* correction;
* deletion;
* portability;
* restriction;
* objection.

Набор прав зависит от конкретной юрисдикции и ситуации.

⸻

27. DATA EXPORT

Пользователь должен иметь возможность запросить export своих данных, если это требуется применимым законодательством или предусмотрено продуктом.

⸻

28. DATA DELETION

Должен существовать контролируемый процесс удаления пользовательских данных.

⸻

29. CASCADE DELETION

При удалении account необходимо определить, какие связанные данные также удаляются.

Например:

* integrations;
* preferences;
* recommendations;
* user-generated content.

⸻

30. BACKUPS AND DELETION

Нужно отдельно определить, как requests на deletion взаимодействуют с backup retention.

⸻

31. DATA CORRECTION

Пользователь должен иметь возможность исправить relevant account information, если это применимо.

⸻

32. AUDIT LOG

Для критических действий необходимо хранить audit trail.

Например:

* account deletion;
* permission change;
* integration connection;
* security event;
* administrative action.

⸻

33. AUDIT LOG PROTECTION

Audit logs нельзя свободно изменять обычным пользователям.

⸻

34. ADMIN ACCESS

Administrative access должен быть:

* ограниченным;
* authenticated;
* logged;
* reviewed.

⸻

35. INTERNAL ACCESS

Employees или developers не должны получать доступ к пользовательским данным просто потому, что технически могут.

Access должен быть основан на необходимости.

⸻

36. ROLE-BASED ACCESS

Минимально:

* user;
* support;
* developer;
* administrator.

Реальные роли могут быть расширены по мере роста.

⸻

37. SUPPORT ACCESS

Support должен видеть только необходимые данные.

Для чувствительных данных желательно использовать masking.

⸻

38. DEVELOPMENT DATA

Production user data не следует копировать в development environment без крайней необходимости и соответствующих safeguards.

⸻

39. TEST DATA

Для automated tests предпочтительны synthetic или anonymized datasets.

⸻

40. LOG PRIVACY

Logs не должны содержать:

* passwords;
* tokens;
* secrets;
* unnecessary personal data.

⸻

41. ANALYTICS PRIVACY

Product analytics должна собирать только необходимые события.

⸻

42. TRACKING TRANSPARENCY

Если используется third-party analytics или tracking, пользователь должен получать соответствующую информацию и controls там, где это требуется.

⸻

43. COOKIES

Если приложение использует cookies, необходимо определить:

* essential;
* analytics;
* marketing;
* preferences.

И соответствующие consent requirements.

⸻

44. SECURITY INCIDENT

Должен существовать процесс обработки data breach.

Минимально:

Detect

↓

Contain

↓

Investigate

↓

Assess impact

↓

Notify when legally required

↓

Remediate

⸻

45. BREACH LOG

Security incidents должны документироваться.

⸻

46. VENDOR MANAGEMENT

Для внешних providers необходимо знать:

* что они делают;
* какие данные получают;
* какие security measures используют;
* какие contractual terms применяются.

⸻

47. DATA PROCESSORS

Если внешняя организация обрабатывает personal data от имени приложения, соответствующие contractual requirements должны быть проверены.

⸻

48. SUBPROCESSORS

Если provider использует собственных subprocessors, это также должно учитываться в vendor review.

⸻

49. TERMS OF SERVICE

Terms должны описывать:

* service;
* user responsibilities;
* limitations;
* acceptable use;
* account termination;
* liability framework.

Финальная юридическая формулировка должна быть подготовлена или проверена юристом.

⸻

50. AI DISCLAIMERS

AI recommendations не должны автоматически подаваться как гарантированный профессиональный совет.

Если конкретная функция относится к чувствительной или регулируемой области, необходимо определить дополнительные safeguards.

⸻

51. NO GUARANTEED OUTCOMES

Система не должна обещать результат, который невозможно гарантировать.

Например:

не:

«Эта рекомендация гарантированно увеличит performance».

а:

«Исторические данные показывают положительный сигнал, но результат не гарантирован».

⸻

52. EVIDENCE LANGUAGE

Язык AI должен соответствовать strength of evidence.

Например:

«данные показывают»

при сильном evidence,

и:

«возможная закономерность»

при слабом evidence.

⸻

53. AUTOMATED DECISIONS

Если система принимает решения, которые могут иметь значимые последствия для пользователя, необходимо отдельно проверить applicable legal requirements.

⸻

54. HUMAN OVERSIGHT

Для потенциально значимых automated decisions может потребоваться human review или возможность пользовательского вмешательства.

⸻

55. USER CONTROL

AI не должен скрытно принимать значимые решения за пользователя.

Пользователь должен понимать:

* что предложено;
* почему;
* какие последствия возможны.

⸻

56. CHILDREN

Если сервис потенциально доступен несовершеннолетним, необходимо отдельно определить:

* age requirements;
* consent;
* data processing;
* parental requirements.

⸻

57. ACCESSIBILITY

Legal compliance включает также применимые accessibility requirements.

UX должен учитывать accessibility с самого начала.

⸻

58. DOCUMENTATION

Compliance documentation должна храниться отдельно и иметь version control.

⸻

59. DATA INVENTORY

Необходимо иметь карту:

какие данные

↓

где находятся

↓

кто имеет доступ

↓

зачем используются

↓

сколько хранятся

↓

как удаляются.

⸻

60. DATA FLOW MAP

Для каждого важного data flow должно быть понятно:

Source

↓

Processing

↓

Storage

↓

AI / Analytics

↓

Output

↓

Deletion / Retention

⸻

61. PRIVACY BY DESIGN

Privacy не должна добавляться после создания продукта.

Она должна учитываться на этапе архитектуры.

⸻

62. SECURITY BY DESIGN

Аналогично security.

Не:

сначала построить, потом защищать

а:

строить сразу с необходимыми security boundaries.

⸻

63. MINIMUM VIABLE COMPLIANCE

До production launch необходимо определить минимум:

* Privacy Policy;
* Terms;
* consent flows, где нужны;
* data retention;
* deletion;
* access control;
* security incident process;
* vendor review;
* user rights process.

⸻

64. LEGAL REVIEW

Перед публичным запуском необходимо получить юридическую проверку применимых требований.

AI не заменяет юридического специалиста.

⸻

65. JURISDICTION

Legal requirements зависят от:

* страны компании;
* стран пользователей;
* типа данных;
* типа продукта;
* используемых providers.

Поэтому нельзя считать один набор правил универсальным.

⸻

66. CHANGE MANAGEMENT

Если меняется:

* AI provider;
* data usage;
* integration;
* tracking;
* retention;
* privacy policy;

необходимо проверить, требует ли это обновления consent или legal documentation.

⸻

67. USER COMMUNICATION

Если важные правила обработки данных меняются, пользователь должен получить понятное уведомление там, где это требуется.

⸻

68. DATA GOVERNANCE

Data governance определяет ownership и ответственность за разные категории данных.

⸻

69. DATA OWNER

Для каждого critical data domain должен быть определён ответственный.

Например:

* account data;
* analytics;
* knowledge;
* AI evaluation.

⸻

70. FINAL DATA GOVERNANCE MODEL

COLLECT

↓

CLASSIFY

↓

PURPOSE

↓

PROTECT

↓

USE

↓

MONITOR

↓

RETAIN

↓

EXPORT / DELETE

⸻

71. ФИНАЛЬНЫЙ ПРИНЦИП

Доверие к интеллектуальной системе строится не только на качестве её рекомендаций.

Оно строится ещё и на понимании пользователем:

какие данные система использует, зачем она их использует, кто может к ним получить доступ, как долго они сохраняются и что произойдёт, если пользователь решит уйти.

Поэтому privacy, security и data governance являются не внешним юридическим приложением к продукту, а частью его архитектуры.