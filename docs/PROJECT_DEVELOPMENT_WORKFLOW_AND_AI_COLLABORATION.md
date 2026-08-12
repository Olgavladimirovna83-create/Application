PROJECT_DEVELOPMENT_WORKFLOW_AND_AI_COLLABORATION

1. PURPOSE

This document defines how the project is developed, maintained, reviewed, tested, and evolved by the three primary participants:

1. Product Owner, Olga
2. Architecture and Reasoning AI, ChatGPT
3. Implementation AI, Claude Code

The purpose is to create a development process that minimizes unnecessary manual work while preserving architectural quality, traceability, security, and product coherence.

This document is operational guidance for the development process.

It does not replace the product architecture or technical specifications.

⸻

2. CORE DEVELOPMENT PHILOSOPHY

The project should not be developed through uncontrolled conversational coding.

The project should be developed through:

Specification → Plan → Implementation → Verification → Review → Acceptance → Next Task

The goal is not maximum coding speed.

The goal is:

maximum useful progress with minimum unnecessary human effort and maximum preservation of quality.

⸻

3. THE THREE-PARTICIPANT MODEL

3.1 PRODUCT OWNER, OLGA

Olga is responsible for:

* product vision;
* user experience expectations;
* business priorities;
* product decisions;
* acceptance of important behavioural choices;
* final approval of user-facing functionality.

Olga does not need to make technical decisions that are already determined by the architecture or standard engineering practice.

Olga should not be used as a manual bridge for information that can be stored in the repository.

⸻

4. ARCHITECTURE AND REASONING AI, CHATGPT

ChatGPT acts primarily as:

* system architect;
* product-to-technical translator;
* reasoning layer;
* architectural reviewer;
* consistency checker;
* problem solver;
* technical planning assistant.

ChatGPT is responsible for protecting the original product intent while helping translate it into implementable technical decisions.

ChatGPT should identify opportunities to simplify or automate the development workflow whenever manual work does not add meaningful value.

⸻

5. IMPLEMENTATION AI, CLAUDE CODE

Claude Code acts primarily as:

* implementation agent;
* repository agent;
* coding agent;
* test runner;
* debugging agent;
* refactoring agent;
* documentation updater.

Claude Code should work directly inside the project repository whenever possible.

It should not require the Product Owner to manually copy code between systems.

⸻

6. SINGLE SOURCE OF TRUTH

The repository is the primary operational source of truth for the implementation.

Important project state must be stored in files rather than relying exclusively on conversational memory.

The project should maintain, at minimum:

* CLAUDE.md
* README.md
* CURRENT_STATUS.md
* TASKS.md
* DECISIONS.md
* CHANGELOG.md

Additional architecture and technical specification files remain authoritative for their respective subjects.

⸻

7. CONVERSATIONAL MEMORY IS NOT THE PRIMARY PROJECT MEMORY

Chat history is useful for reasoning and continuity.

However, critical decisions must not exist only in conversation history.

Any decision that can affect future implementation should eventually be recorded in the repository.

This protects the project against:

* context loss;
* model changes;
* long conversations;
* new development sessions;
* switching AI tools;
* onboarding human developers.

⸻

8. CLAUDE.MD

CLAUDE.md contains the operational instructions Claude Code should follow when working on the project.

It should include:

* project purpose;
* architecture principles;
* technical stack;
* repository conventions;
* security requirements;
* testing requirements;
* forbidden behaviours;
* deployment restrictions;
* documentation requirements;
* rules for asking the user questions;
* rules for autonomous work.

Claude Code should read and respect this file before performing significant work.

⸻

9. CURRENT_STATUS.MD

CURRENT_STATUS.md describes the current state of the project.

It should contain:

* current development phase;
* completed milestones;
* active task;
* blocked tasks;
* known issues;
* current environment;
* next recommended task.

It should remain concise.

Its purpose is to allow a new session to understand the current state quickly.

⸻

10. TASKS.MD

TASKS.md contains the development queue.

Tasks should be:

* specific;
* independently understandable;
* ordered;
* testable;
* linked to relevant specifications.

A task should not require rediscovering the architecture from scratch.

⸻

11. DECISIONS.MD

DECISIONS.md records important product and architectural decisions.

Each decision should contain:

* decision identifier;
* date;
* context;
* options considered;
* selected option;
* reason;
* consequences.

Once a decision is accepted, future implementation should respect it unless the decision is explicitly superseded.

⸻

12. DEVELOPMENT WORKFLOW

Every significant task should follow:

TASK

↓

PLAN

↓

IMPLEMENT

↓

TEST

↓

SELF-FIX

↓

REPORT

↓

REVIEW

↓

ACCEPT OR REWORK

↓

UPDATE STATUS

↓

NEXT TASK

⸻

13. TASK DEFINITION

Before implementation begins, the task must have:

* clear objective;
* relevant specification;
* expected behaviour;
* acceptance criteria.

If these already exist in project documentation, Claude Code should use them rather than asking the user to restate them.

⸻

14. PLAN FIRST

For significant tasks Claude Code should first inspect:

* repository;
* relevant documentation;
* current implementation;
* existing tests;
* previous decisions.

It should then create a concise implementation plan.

The plan should identify:

* files likely to change;
* architectural implications;
* tests required;
* possible risks;
* user decisions required, if any.

⸻

15. MINIMIZE USER QUESTIONS

Claude Code should not ask Olga questions that can be answered from:

* existing specifications;
* CLAUDE.md;
* DECISIONS.md;
* established architecture;
* standard engineering practice.

The user should only be interrupted when a genuine product, business, security, credential, or unresolved architectural decision is required.

⸻

16. IMPLEMENTATION

After the plan is accepted or determined to be unambiguous, Claude Code should implement the task.

Implementation should remain within the existing architecture.

Claude Code should not introduce architectural changes merely because they are technically convenient.

⸻

17. SELF-VERIFICATION

After implementation Claude Code should automatically run appropriate checks.

Depending on the task, these may include:

* unit tests;
* integration tests;
* end-to-end tests;
* type checking;
* linting;
* build;
* migration validation;
* security checks.

⸻

18. SELF-FIX

When a test or implementation check fails, Claude Code should first attempt to diagnose and fix the problem independently.

It should not immediately interrupt Olga for ordinary technical errors.

⸻

19. FAILURE LIMIT

Claude Code should not enter an uncontrolled loop of repeated attempts.

After a reasonable number of unsuccessful attempts, it should stop and report:

* what failed;
* what was attempted;
* likely cause;
* what remains unresolved;
* what decision or assistance is required.

⸻

20. REQUIRED TASK REPORT

After every significant task Claude Code must create a concise task report.

The report must include:

STATUS

Completed / Partially Completed / Blocked / Failed

SUMMARY

What was implemented.

FILES CHANGED

Important files created or modified.

TESTS

Tests executed and results.

WARNINGS

Known limitations or warnings.

ARCHITECTURE CHANGES

Whether architecture was changed.

USER ACTION REQUIRED

Yes / No.

If yes, explain exactly what Olga must do.

NEXT TASK

Recommended next development step.

⸻

21. REPORT QUALITY

Reports should be concise.

Olga should not need to read raw terminal output or thousands of lines of code to understand whether a task succeeded.

Technical details should remain available in the repository when required.

⸻

22. ARCHITECTURAL REVIEW

After significant milestones, ChatGPT should review the implementation against:

* architecture;
* product intent;
* data model;
* security;
* integrations;
* AI behaviour;
* testing;
* scalability.

The review should identify:

* violations;
* inconsistencies;
* unnecessary complexity;
* missing safeguards;
* opportunities for optimization.

⸻

23. PRODUCT REVIEW

Olga should primarily review:

* user experience;
* wording;
* workflows;
* visual behaviour;
* usefulness;
* whether the application behaves as intended.

She should not be required to review implementation details unless they affect product behaviour.

⸻

24. AUTOMATED QUALITY GATES

The development process should use automated checks wherever practical.

Examples:

* tests;
* type checking;
* linting;
* build verification;
* schema validation;
* API contract validation;
* security scanning.

Automation should reduce human review effort without replacing necessary human judgement.

⸻

25. USER ACTION REQUIRED

A task should be marked USER ACTION REQUIRED only when Olga must personally perform an action.

Examples:

* OAuth authorization;
* Meta account confirmation;
* accepting an external service agreement;
* entering credentials;
* choosing between genuine product alternatives;
* reviewing user-facing behaviour.

⸻

26. USER ACTION FORMAT

When user action is required, the report must state:

WHAT

What must be done.

WHY

Why it is required.

WHERE

Where the action should be performed.

EXPECTED RESULT

What should happen after the action.

No unnecessary technical instructions should be given.

⸻

27. AUTONOMOUS WORK

Claude Code may work autonomously when:

* the task is clearly specified;
* required decisions already exist;
* changes remain within allowed scope;
* no production risk is involved;
* automated verification is available.

⸻

28. AUTONOMOUS WORK RESTRICTIONS

Claude Code must stop and request assistance when:

* a product decision is required;
* architecture is genuinely ambiguous;
* credentials are required;
* security-sensitive behaviour is unclear;
* destructive action is proposed;
* production data may be affected;
* an external service requires manual approval;
* existing decisions conflict.

⸻

29. NIGHT / LONG-RUN WORK

Long-running autonomous development sessions are allowed in development or controlled staging environments.

Night runs should use a predefined task queue.

Example:

NIGHT QUEUE

1. Complete authentication tests
2. Implement Instagram callback
3. Add integration tests
4. Improve error handling
5. Update documentation

Claude Code should process tasks sequentially.

⸻

30. NIGHT RUN SAFETY

During autonomous overnight work Claude Code must not:

* modify production data;
* delete production data;
* deploy unreviewed production changes;
* modify billing;
* change critical external account settings;
* make irreversible architectural decisions;
* bypass security controls.

⸻

31. NIGHT RUN STOP CONDITIONS

Claude Code must stop when:

* a user decision is required;
* a credential is required;
* a test remains unresolved after reasonable attempts;
* a destructive operation is proposed;
* architecture is unclear;
* external approval is required.

⸻

32. MORNING REVIEW

After a long-running session, the first action should be reading the task report and current status.

The morning review should identify:

* completed tasks;
* failed tasks;
* blocked tasks;
* tests;
* warnings;
* user actions;
* next task.

⸻

33. DEVELOPMENT ENVIRONMENTS

The project should maintain separation between:

* development;
* test;
* staging;
* production.

Autonomous coding should default to development.

⸻

34. PRODUCTION PROTECTION

Production must not be treated as a coding playground.

Production changes require explicit deployment procedures and appropriate verification.

⸻

35. GIT

Git should provide:

* history;
* rollback;
* branches;
* traceability;
* controlled integration.

Significant tasks should produce identifiable commits.

⸻

36. COMMIT PRINCIPLE

Commits should represent meaningful, reviewable units of work.

Avoid enormous commits containing unrelated changes.

⸻

37. STAGING

Before production, important functionality should be deployed to staging.

Olga should use staging as the primary environment for realistic product review.

⸻

38. PRODUCTION RELEASE

Production release should occur only after:

* tests pass;
* critical issues are resolved;
* architecture is reviewed;
* staging behaviour is accepted;
* deployment is understood;
* rollback is available.

⸻

39. REVIEW ESCALATION

The normal escalation path is:

Claude Code

↓

technical self-resolution

↓

ChatGPT

↓

architectural / reasoning resolution

↓

Olga

↓

product / business / ownership decision

This keeps Olga from being unnecessarily involved in technical problems.

⸻

40. OPTIMIZATION PRINCIPLE

Whenever a repetitive manual operation appears, the team should ask:

Can this be automated without reducing quality or security?

Examples:

* copying reports;
* synchronizing task status;
* generating changelogs;
* running tests;
* updating documentation;
* checking consistency;
* preparing deployment reports.

⸻

41. NO MANUAL BRIDGE PRINCIPLE

Olga should not act as a human API between systems when the same information can safely be stored in or retrieved from the repository.

Manual copy-paste should be treated as a workflow smell when it becomes repetitive.

⸻

42. CONTEXT PRESERVATION

Important information should be written once and reused.

The same decision should not be manually repeated across:

* ChatGPT;
* Claude Code;
* documentation;
* task descriptions.

Where possible, systems should reference the canonical repository document.

⸻

43. CHANGE PROPAGATION

When a major architectural decision changes, the affected specifications should be identified and updated systematically.

A change should not silently modify one part of the system while leaving contradictory documentation elsewhere.

⸻

44. QUALITY OVER SPEED

Speed is valuable only when quality is preserved.

The project must not sacrifice:

* correctness;
* security;
* traceability;
* maintainability;
* architectural coherence

for the appearance of rapid progress.

⸻

45. DEFINITION OF DONE

A task is complete only when:

* implementation exists;
* relevant tests pass;
* acceptance criteria are satisfied;
* documentation is updated where necessary;
* task report exists;
* status is updated.

⸻

46. MILESTONE ACCEPTANCE

A milestone is complete only after:

Implementation

✓

Automated verification

✓

Architectural review

✓

Product review

✓

Documentation

✓

⸻

47. COMMUNICATION STYLE

Communication between the three participants should be:

* concise;
* explicit;
* structured;
* decision-oriented.

Long technical explanations should be provided only when they materially help a decision.

⸻

48. NO UNNECESSARY REWORK

Existing working functionality should not be rewritten merely for stylistic preference.

Changes should have a clear reason:

* bug;
* security;
* maintainability;
* performance;
* architecture;
* product requirement.

⸻

49. NO ARCHITECTURAL DRIFT

Claude Code must not gradually replace the designed architecture with a different architecture through a series of individually convenient decisions.

Any significant architectural deviation must be explicitly identified.

⸻

50. PRODUCT INTENT PROTECTION

Technical implementation must preserve the original product intent.

When technical convenience conflicts with a clearly documented product requirement, the conflict must be surfaced rather than silently resolved in favour of convenience.

⸻

51. AI PROVIDER INDEPENDENCE

AI providers should be treated as replaceable infrastructure where practical.

The application should avoid unnecessary coupling to a single model provider.

Provider-specific functionality should remain behind appropriate abstraction boundaries.

⸻

52. EXTERNAL INTEGRATION PRINCIPLE

External platforms such as Instagram should be treated as providers rather than foundations of the core intelligence system.

Changes in an external API should ideally require modification of the corresponding connector rather than reconstruction of the entire application.

⸻

53. DATA TRUST

AI analysis must distinguish between:

* verified data;
* inferred information;
* historical information;
* incomplete information;
* uncertain conclusions.

The AI should never present an unsupported inference as a verified fact.

⸻

54. AI QUALITY

AI-generated recommendations should be evaluated through:

* representative test cases;
* known scenarios;
* regression evaluations;
* factual consistency checks;
* confidence assessment;
* outcome feedback.

⸻

55. HUMAN CONTROL

The AI system assists decision-making.

It does not automatically replace the Product Owner’s judgement unless explicitly designed and approved for a specific automated action.

⸻

56. DEVELOPMENT LOOP

The long-term development loop is:

SPECIFY

↓

PLAN

↓

BUILD

↓

TEST

↓

REVIEW

↓

RELEASE

↓

OBSERVE

↓

LEARN

↓

IMPROVE

↓

SPECIFY AGAIN

⸻

57. FINAL OPERATING PRINCIPLE

The project should progressively move toward a state where:

Olga spends more time making valuable product decisions and less time performing mechanical technical operations.

ChatGPT should spend more effort on:

architecture, reasoning, consistency, review, and optimization.

Claude Code should spend more effort on:

implementation, testing, debugging, and repository maintenance.

Automation should absorb repetitive coordination wherever possible.

The system must become more efficient as the project grows, not more dependent on manual coordination.

⸻

58. CORE PHILOSOPHY

The ultimate objective is not to make the three participants work harder.

It is to make the system of collaboration work smarter.

Human vision

architectural reasoning

AI implementation

automated verification

=

high-quality software development with minimal unnecessary human effort.