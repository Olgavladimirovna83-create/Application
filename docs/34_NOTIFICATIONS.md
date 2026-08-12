34_NOTIFICATIONS

1. Назначение документа

NOTIFICATIONS определяет систему уведомлений приложения и правила, по которым система решает, когда пользователю действительно стоит сообщить о событии.

Главный принцип:

уведомление должно помогать пользователю принять решение или не пропустить что-то важное, а не просто сообщать о каждом событии системы.

⸻

2. ОСНОВНОЙ ПРИНЦИП

Не каждое системное событие является notification.

Например:

SYNC_COMPLETED

может быть техническим событием.

Но только если синхронизация действительно важна пользователю сейчас, оно превращается в notification.

⸻

3. EVENT ≠ NOTIFICATION

Архитектура должна разделять:

System Event

↓

Notification Decision

↓

Notification

Это предотвращает notification overload.

⸻

4. NOTIFICATION SOURCES

Уведомления могут возникать из:

* synchronization;
* analytics;
* recommendations;
* patterns;
* AI;
* actions;
* system events;
* security events.

⸻

5. NOTIFICATION PRIORITY

Минимально:

LOW

Информационное событие.

MEDIUM

Событие, которое может быть полезно пользователю.

HIGH

Событие, требующее внимания.

CRITICAL

Событие, связанное с безопасностью или серьёзной проблемой.

⸻

6. LOW NOTIFICATIONS

Например:

«Синхронизация завершена».

Такое уведомление не должно прерывать работу пользователя.

⸻

7. MEDIUM NOTIFICATIONS

Например:

«Мы заметили изменение в performance последних публикаций».

Пользователь может посмотреть позже.

⸻

8. HIGH NOTIFICATIONS

Например:

«Обнаружена заметная закономерность, которая может повлиять на следующие рекомендации».

⸻

9. CRITICAL NOTIFICATIONS

Используются редко.

Например:

* security incident;
* account compromise;
* critical integration issue;
* destructive operation requiring attention.

⸻

10. ACTIONABILITY

Хорошее notification отвечает:

Что произошло?

Почему это важно?

Что я могу сделать?

⸻

11. ПЛОХОЕ УВЕДОМЛЕНИЕ

Не:

«Pattern detected».

Лучше:

«Мы заметили возможную закономерность в формате X. Посмотреть evidence».

⸻

12. NOTIFICATION CONTENT

Каждое важное notification должно иметь:

* title;
* short explanation;
* timestamp;
* priority;
* optional action;
* optional source.

⸻

13. DEEP LINK

Notification должно вести непосредственно к соответствующему месту приложения.

Например:

notification

↓

Pattern page

а не:

notification

↓

Dashboard

⸻

14. ACTION BUTTONS

При необходимости notification может иметь:

* View;
* Review;
* Accept;
* Reject;
* Retry;
* Connect;
* Resolve.

⸻

15. НЕ ПЕРЕГРУЖАТЬ ACTIONS

Notification не должно превращаться в мини-приложение.

Сложные решения выполняются на соответствующем экране.

⸻

16. IN-APP NOTIFICATIONS

Основной канал уведомлений:

in-app notification center.

Он хранит историю уведомлений.

⸻

17. PUSH NOTIFICATIONS

Push используется только для действительно полезных событий.

Например:

* important recommendation;
* major performance change;
* completed long-running analysis;
* critical integration problem.

⸻

18. EMAIL

Email может использоваться для:

* важных summaries;
* security;
* account events;
* periodic reports;
* long-form insights.

⸻

19. CHANNEL PREFERENCE

Пользователь может выбирать:

* in-app;
* push;
* email.

Для некоторых security notifications возможность отключения может отсутствовать.

⸻

20. NOTIFICATION CENTER

Notification Center должен позволять:

* видеть unread;
* видеть read;
* фильтровать;
* открывать;
* архивировать.

⸻

21. READ STATUS

Минимально:

UNREAD

READ

При необходимости:

ARCHIVED

⸻

22. UNREAD COUNT

Unread count должен показывать только действительно релевантные уведомления.

Не следует считать каждое техническое событие.

⸻

23. GROUPING

Повторяющиеся события должны объединяться.

Например вместо:

5 отдельных уведомлений о синхронизации

можно показать:

«5 синхронизаций завершено».

⸻

24. DEDUPLICATION

Одинаковое событие не должно создавать множество одинаковых notifications.

⸻

25. COOLDOWN

Для некоторых типов notification может использоваться cooldown.

Например:

один и тот же pattern не должен уведомлять пользователя каждый час.

⸻

26. FREQUENCY CONTROL

Пользователь может выбрать:

* instant;
* daily summary;
* weekly summary;
* minimal.

⸻

27. QUIET HOURS

Пользователь может установить quiet hours.

Low и medium notifications в это время могут быть отложены.

⸻

28. CRITICAL OVERRIDE

Critical security notifications могут обходить quiet hours.

⸻

29. DIGEST

Несколько небольших insights можно объединять в digest.

Например:

«Сегодня мы заметили 4 изменения в твоём контенте».

⸻

30. DAILY DIGEST

Daily digest может содержать:

* important changes;
* recommendations;
* completed analyses;
* relevant patterns.

⸻

31. WEEKLY DIGEST

Weekly digest может показывать:

* major trends;
* strongest results;
* weak areas;
* emerging patterns;
* unresolved recommendations.

⸻

32. PERSONALIZATION

Notification system учитывает:

* user preferences;
* importance;
* history;
* interaction frequency.

⸻

33. IMPORTANCE LEARNING

Если пользователь регулярно игнорирует определённый тип notifications, система может снизить его priority.

Но security и critical notifications не должны исчезать из-за этого.

⸻

34. USER FEEDBACK

Пользователь может указать:

«Слишком много таких уведомлений».

Это становится сигналом для notification preferences.

⸻

35. AI-GENERATED NOTIFICATIONS

AI может помогать формулировать notification.

Но:

AI не должен самостоятельно решать, что пользователь обязательно должен получить notification.

Notification policy определяется application logic.

⸻

36. AI CONFIDENCE

Если notification основано на AI inference, backend должен передавать уровень уверенности и evidence.

⸻

37. NO FALSE URGENCY

AI не должен использовать искусственно тревожные формулировки.

Не:

«Срочно! Ты теряешь аудиторию!»

если данные этого не подтверждают.

⸻

38. FACTUAL LANGUAGE

Формулировки должны соответствовать имеющимся данным.

Если есть только сигнал:

«Мы заметили возможное изменение».

Если evidence сильнее:

«Performance заметно изменился относительно baseline».

⸻

39. POSITIVE NOTIFICATIONS

Положительные notifications также должны быть конкретными.

Не:

«Ты молодец!»

Лучше:

«Этот формат показал результат выше твоего обычного диапазона».

⸻

40. SUPPORTIVE FEEDBACK

При негативных результатах notification должен быть честным, но не демотивирующим.

Например:

«Последний результат ниже baseline. При этом hook остаётся одной из самых стабильных сильных сторон твоего контента».

⸻

41. RECOMMENDATION NOTIFICATION

Если появилась важная recommendation:

«У нас появилась новая рекомендация на основе последних данных».

↓

Review recommendation

⸻

42. PATTERN NOTIFICATION

Если появился emerging pattern:

«Мы заметили возможную закономерность. Пока confidence умеренный, поэтому предлагаем проверить её ещё раз».

⸻

43. PATTERN STRENGTHENED

Если существующий pattern получил новые evidence:

«Предыдущая закономерность получила дополнительное подтверждение».

⸻

44. PATTERN WEAKENED

Если pattern начинает терять силу:

«Результаты по этой закономерности стали менее стабильными».

⸻

45. OLD KNOWLEDGE REVISIT

Если новая информация меняет старый вывод:

«Мы пересмотрели предыдущий вывод, потому что появились новые данные».

⸻

46. USER-REJECTED IDEA REVISIT

Если ранее отклонённая идея снова становится актуальной:

notification должно объяснить причину.

Например:

«Ты раньше отклоняла эту идею. Я возвращаюсь к ней, потому что новые результаты изменили evidence».

⸻

47. SYNC NOTIFICATIONS

Если synchronization завершилась успешно:

обычно достаточно low-priority status.

Если synchronization failed:

может потребоваться medium или high priority.

⸻

48. INTEGRATION FAILURE

Например:

«Не удалось обновить данные Instagram. Последняя успешная синхронизация была 3 часа назад».

⸻

49. STALE DATA

Если данные становятся слишком старыми:

«Некоторые рекомендации могут быть основаны на устаревших данных».

Это notification должно быть связано с freshness policy.

⸻

50. AI JOB COMPLETE

Если AI analysis занял время:

«Анализ завершён».

↓

View analysis

⸻

51. AI FAILURE

Если AI operation не удалась:

«Не удалось завершить AI-анализ. Твои данные сохранены, можно попробовать снова».

⸻

52. ACTION COMPLETE

После выполнения действия:

«Действие завершено. Результат будет оцениваться по мере поступления данных».

⸻

53. OUTCOME READY

Когда достаточно данных для оценки:

«Появились результаты для оценки последнего действия».

⸻

54. SECURITY NOTIFICATIONS

Security events имеют отдельный priority policy.

Например:

* new login;
* suspicious activity;
* credential issue;
* external account change.

⸻

55. SECURITY LANGUAGE

Security notification должно быть:

* конкретным;
* спокойным;
* actionable.

Не следует создавать панику без основания.

⸻

56. NOTIFICATION LIFECYCLE

Каждое notification имеет lifecycle:

CREATED

↓

DELIVERED

↓

READ

↓

ACTIONED

или:

DISMISSED

⸻

57. NOTIFICATION DATA MODEL

Минимально notification хранит:

* notification_id;
* user_id;
* type;
* priority;
* title;
* body;
* source;
* entity_id;
* created_at;
* read_at;
* actioned_at;
* status.

⸻

58. EXPIRATION

Некоторые notifications могут устаревать.

Например:

«Новая рекомендация»

после принятия уже не должна считаться актуальной.

⸻

59. STALE NOTIFICATION

Если notification больше не актуально, оно может получить статус:

EXPIRED.

⸻

60. NOTIFICATION SECURITY

Notification не должна раскрывать sensitive information через:

* push preview;
* email subject;
* browser notification.

⸻

61. EMAIL SECURITY

Чувствительные детали могут требовать перехода в приложение вместо полного раскрытия в email.

⸻

62. PUSH SECURITY

На lock screen не следует показывать лишние private details.

⸻

63. ACCESS CONTROL

Notification должна быть доступна только владельцу соответствующего user context.

⸻

64. MULTI-ACCOUNT

Если пользователь управляет несколькими accounts, notification должно ясно показывать:

к какому account оно относится.

⸻

65. NOTIFICATION SOURCE

При необходимости:

Instagram

Analytics

AI

System

Security

⸻

66. USER CONTROL

Пользователь должен иметь возможность контролировать большую часть обычных notifications.

Но система может ограничивать отключение критических security events.

⸻

67. NOTIFICATION FATIGUE

Основная опасность notification system:

слишком много уведомлений приводит к тому, что пользователь перестаёт замечать важные.

Поэтому лучше:

меньше, но полезнее.

⸻

68. PRIORITY RULE

Если есть сомнение:

не отправлять notification, если событие не требует внимания пользователя.

Событие всё равно может остаться доступным в истории системы.

⸻

69. NOTIFICATION VS INSIGHT

Insight может существовать внутри приложения без notification.

Notification используется только тогда, когда insight достаточно важен, чтобы прервать или изменить пользовательский workflow.

⸻

70. FINAL MODEL

EVENT

↓

RELEVANCE

↓

PRIORITY

↓

DEDUPLICATION

↓

USER PREFERENCE

↓

CHANNEL

↓

NOTIFICATION

↓

USER ACTION

↓

FEEDBACK

⸻

71. ФИНАЛЬНЫЙ ПРИНЦИП

Система уведомлений должна работать как фильтр между огромным количеством событий приложения и ограниченным вниманием пользователя.

Её задача не в том, чтобы сообщать всё.

Её задача:

в нужный момент обратить внимание пользователя именно на то, что действительно может помочь ему понять ситуацию, принять решение или воспользоваться возможностью.