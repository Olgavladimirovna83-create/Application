45_PRODUCT_DECISION_FRAMEWORK

1. Назначение документа

PRODUCT_DECISION_FRAMEWORK определяет, как система и команда принимают решения о дальнейшем развитии продукта.

Главный принцип:

новая идея не становится приоритетом только потому, что она кажется хорошей. Приоритет должен подтверждаться evidence, user value, технической реализуемостью и соответствием общей стратегии продукта.

⸻

2. DECISION INPUTS

Решения могут основываться на:

* user feedback;
* product metrics;
* recommendation outcomes;
* analytics;
* technical incidents;
* AI evaluations;
* cost;
* market information;
* architectural constraints.

⸻

3. EVIDENCE HIERARCHY

Не все signals имеют одинаковый вес.

Условно:

Strong evidence

Повторяющийся результат на достаточном количестве наблюдений.

Moderate evidence

Повторяющийся signal, но данных пока недостаточно.

Weak evidence

Один или несколько anecdotal signals.

Hypothesis

Предположение без подтверждения.

⸻

4. НЕ ПУТАТЬ ИДЕЮ С ДОКАЗАТЕЛЬСТВОМ

Фраза:

«пользователям это наверняка понравится»

является hypothesis.

Фраза:

«в нескольких независимых cohorts пользователи регулярно просили эту функцию»

является evidence.

⸻

5. DECISION TYPES

Основные решения:

* build;
* improve;
* experiment;
* defer;
* reject;
* investigate.

⸻

6. BUILD

Выбирается, когда:

* проблема подтверждена;
* solution понятен;
* value достаточно высока;
* cost оправдан.

⸻

7. IMPROVE

Используется, если функция уже существует, но:

* качество недостаточно;
* UX плохой;
* outcomes слабые.

⸻

8. EXPERIMENT

Используется, если hypothesis интересна, но evidence недостаточно.

⸻

9. DEFER

Идея сохраняется, но сейчас не является приоритетной.

⸻

10. REJECT

Идея исключается, если:

* не соответствует product direction;
* value недостаточно;
* risks слишком высоки;
* evidence противоречит гипотезе.

Reject не обязательно означает «никогда».

⸻

11. INVESTIGATE

Используется, если сначала необходимо собрать дополнительную информацию.

⸻

12. USER PROBLEM FIRST

Решение должно начинаться не с:

«какую функцию построить?»

а с:

«какую проблему пользователя мы пытаемся решить?»

⸻

13. PROBLEM STATEMENT

Для каждого крупного feature необходимо сформулировать:

* user;
* problem;
* context;
* consequence;
* desired outcome.

⸻

14. EXPECTED VALUE

До разработки необходимо определить:

что должно улучшиться, если feature действительно работает.

⸻

15. SUCCESS METRIC

Каждый significant feature должен иметь metric, по которой можно проверить результат.

⸻

16. GUARDRAILS

Также определяются metrics, которые нельзя ухудшить.

Например:

Feature может увеличить engagement, но не должна:

* резко увеличивать hallucinations;
* ухудшать privacy;
* увеличивать strong negative outcomes.

⸻

17. PRIORITY SCORE

Для internal prioritization можно использовать:

Value × Evidence × Strategic Fit

с учётом:

Cost × Risk × Complexity.

Это не математическая истина, а инструмент сравнения.

⸻

18. VALUE

Оценивается:

* user value;
* business value;
* intelligence value.

⸻

19. EVIDENCE

Чем сильнее evidence, тем выше confidence в приоритете.

⸻

20. STRATEGIC FIT

Feature должен соответствовать основному направлению продукта.

⸻

21. COST

Учитывается не только development cost.

Также:

* infrastructure;
* AI cost;
* maintenance;
* support;
* monitoring.

⸻

22. RISK

Риск может быть:

* technical;
* product;
* privacy;
* security;
* AI;
* operational.

⸻

23. COMPLEXITY

Некоторые features выглядят маленькими, но создают большое количество новых dependencies.

Это необходимо учитывать.

⸻

24. REVERSIBILITY

Важно понимать:

можно ли легко отказаться от решения позже?

Reversible decisions можно принимать быстрее.

Irreversible decisions требуют больше evidence.

⸻

25. ARCHITECTURAL DECISIONS

Архитектурные решения с высокой стоимостью изменения требуют повышенного уровня проверки.

⸻

26. PRODUCT HYPOTHESES

Крупные assumptions должны быть записаны.

Например:

* users want this;
* data source is sufficient;
* AI can solve this reliably;
* outcome can be measured.

⸻

27. HYPOTHESIS STATUS

Каждая hypothesis может иметь:

* untested;
* testing;
* supported;
* weakly supported;
* contradicted;
* invalidated.

⸻

28. INVALIDATED HYPOTHESIS

Если evidence показывает, что assumption неверна:

необходимо менять решение, а не защищать старую идею любой ценой.

⸻

29. DECISION LOG

Крупные product и architecture decisions должны сохраняться.

Для каждой:

* decision;
* date;
* reasoning;
* evidence;
* alternatives;
* consequences.

⸻

30. WHY THIS MATTERS

Через год команда должна понимать:

почему было принято конкретное решение.

⸻

31. ALTERNATIVES

Перед крупным решением необходимо рассмотреть разумные alternatives.

⸻

32. NO FALSE CHOICE

Не нужно создавать искусственные alternatives только ради документации.

⸻

33. EXPERIMENT DESIGN

Эксперимент должен содержать:

* hypothesis;
* target users;
* change;
* baseline;
* success metric;
* guardrails;
* duration;
* evaluation.

⸻

34. SMALL EXPERIMENTS

Если hypothesis можно проверить маленьким экспериментом:

не нужно сразу строить полноценную систему.

⸻

35. MVP PRINCIPLE

Сначала:

validate

потом:

scale.

⸻

36. FEEDBACK WEIGHT

Feedback пользователя имеет значение, но один пользователь не определяет весь product direction.

⸻

37. REPEATED FEEDBACK

Повторяющийся feedback от разных users имеет больший вес.

⸻

38. SILENT USERS

Отсутствие feedback не означает отсутствие проблемы.

Нужно учитывать:

* abandonment;
* low usage;
* churn;
* feature avoidance.

⸻

39. NEGATIVE SIGNALS

Особенно внимательно анализировать:

* repeated rejection;
* repeated modification;
* low trust;
* negative outcomes;
* high abandonment.

⸻

40. STRONG NEGATIVE OUTCOMES

Если recommendation регулярно приводит к strong negative outcomes:

priority должна быть:

investigate → contain → improve

а не:

scale.

⸻

41. AI QUALITY DECISIONS

AI feature нельзя масштабировать только потому, что пользователям нравится его conversational style.

Необходимо учитывать:

* factual grounding;
* outcome quality;
* hallucinations;
* confidence calibration.

⸻

42. MODEL SELECTION

Выбор AI model должен учитывать:

* quality;
* latency;
* cost;
* reliability;
* privacy;
* required capabilities.

⸻

43. PROVIDER REPLACEMENT

AI provider может быть заменён, если другой provider обеспечивает лучшее сочетание:

quality + cost + reliability + requirements.

⸻

44. NO PROVIDER LOCK-IN

Архитектура должна минимизировать unnecessary dependency на одного AI provider.

⸻

45. DATA DECISIONS

Если качество данных ухудшается:

необходимо сначала исправить data pipeline.

Не следует пытаться решить плохие данные более сложным AI.

⸻

46. KNOWLEDGE DECISIONS

Если recommendation quality не улучшается несмотря на большое количество history:

необходимо проверить:

* relevance;
* freshness;
* evidence;
* weighting;
* retrieval.

⸻

47. FRESHNESS DECISIONS

Если свежие данные регулярно оказываются более predictive:

freshness weighting может быть усилен.

Если historical patterns сохраняют ценность:

они не должны автоматически удаляться.

⸻

48. RECOMMENDATION DECISIONS

Если recommendations часто:

* rejected;
* modified;

необходимо определить:

problem в recommendation, timing, explanation или user context?

⸻

49. OUTCOME DECISIONS

Если outcome не наблюдается:

не считать recommendation автоматически successful или unsuccessful.

Сначала определить:

можно ли вообще измерить outcome?

⸻

50. UNKNOWN OUTCOME

Допустимый статус:

unknown / insufficient evidence.

Это лучше, чем искусственно назначать positive или negative.

⸻

51. DECISION CONFIDENCE

Каждое крупное decision может иметь:

* high confidence;
* medium confidence;
* low confidence.

⸻

52. LOW CONFIDENCE DECISIONS

Low confidence decision желательно:

* проверить экспериментом;
* ограничить rollout;
* собрать дополнительные данные.

⸻

53. HIGH CONFIDENCE DOES NOT MEAN CERTAINTY

Confidence отражает strength of evidence, а не абсолютную гарантию.

⸻

54. DECISION REVIEW

Крупные решения периодически пересматриваются.

Особенно если:

* assumptions изменились;
* evidence накопилось;
* technology изменилась;
* cost изменился.

⸻

55. NO DECISION DRIFT

Пересмотр не должен происходить хаотично.

Нужно сравнивать:

old decision

с:

new evidence.

⸻

56. CHANGE CONTROL

Изменение critical architecture или data model должно проходить review.

⸻

57. EXCEPTIONS

Emergency changes допускаются при:

* security incident;
* severe outage;
* critical data corruption.

После emergency change документация обновляется.

⸻

58. PRODUCT ROADMAP UPDATE

После значимого decision:

roadmap должна быть обновлена.

⸻

59. BACKLOG UPDATE

Отложенные features:

* сохраняются;
* получают reason;
* могут быть пересмотрены позже.

⸻

60. DECISION TREE

Базовая логика:

Есть подтверждённая проблема?

Нет →

не строить.

Да →

Есть достаточное evidence?

Нет →

experiment / investigate.

Да →

Value выше cost и risk?

Нет →

defer / reject.

Да →

build.

⸻

61. POST-BUILD REVIEW

После release необходимо проверить:

получили ли мы тот результат, который ожидали?

⸻

62. EXPECTED VS ACTUAL

Сравнивать:

* expected outcome;
* actual outcome.

⸻

63. LEARNING

Если результат отличается от ожиданий:

это не обязательно failure.

Это новая information.

⸻

64. PRODUCT LEARNING

Каждый significant experiment должен увеличивать понимание:

* users;
* problem;
* data;
* AI;
* system.

⸻

65. FINAL DECISION LOOP

QUESTION

↓

HYPOTHESIS

↓

EVIDENCE

↓

DECISION

↓

IMPLEMENT

↓

MEASURE

↓

OUTCOME

↓

LEARN

↓

REASSESS

⸻

66. ФИНАЛЬНЫЙ ПРИНЦИП

Продукт не должен развиваться по принципу:

«мы придумали, значит строим».

Он должен развиваться по принципу:

«мы сформулировали гипотезу, проверили её настолько, насколько это возможно на данном этапе, приняли решение, измерили результат и готовы изменить решение, если новые данные покажут, что мы ошибались».

Именно этот принцип позволяет системе развиваться интеллектуально, не превращая архитектуру и roadmap в набор неподтверждённых предположений.