PROJECT_CONTEXT_AND_FINAL_STRATEGIC_DECISIONS

1. PURPOSE OF THIS DOCUMENT

This document preserves the most important strategic conclusions, working principles, priorities, and collaboration decisions established during the project’s architecture phase.

It is not a replacement for the numbered architecture documents.

It is a context preservation layer.

Its purpose is to prevent loss of important project reasoning when:

* the ChatGPT conversation becomes very long;
* a new AI session is started;
* Claude Code starts a new context;
* the project is moved to another computer;
* another developer joins;
* an AI provider is changed;
* individual conversations are no longer available.

The repository documentation is the long-term source of truth.

This document preserves the strategic context behind that documentation.

⸻

2. PROJECT DEVELOPMENT PHASE

The project has gone through a deliberate architecture-first phase.

The objective was not to start coding immediately.

The objective was to transform an initial product idea, expressed primarily through natural-language thoughts and vision, into a sufficiently detailed system specification that another developer or AI coding agent can implement without having to repeatedly reinterpret the original idea.

The architecture phase intentionally covered:

* product behaviour;
* data;
* analytics;
* knowledge;
* AI reasoning;
* integrations;
* user decisions;
* security;
* reliability;
* backup and disaster recovery;
* development workflow;
* scalability;
* AI provider abstraction;
* testing;
* deployment considerations.

The numbered architecture documents collectively form the main technical blueprint.

⸻

3. CORE PRODUCT PRINCIPLE

The application is not intended to be merely a data storage system or a dashboard.

Its purpose is to transform collected data into a progressively more useful intellectual system.

The system should move conceptually from:

RAW DATA

↓

STRUCTURED DATA

↓

ANALYTICS

↓

PATTERNS

↓

KNOWLEDGE

↓

RECOMMENDATIONS / INSIGHTS

↓

USER DECISIONS

↓

HISTORICAL LEARNING

The application therefore becomes more valuable as it accumulates structured history and validated knowledge.

⸻

4. DATABASE AS INTELLIGENCE FOUNDATION

The database is not merely a storage layer.

It is the foundation on which the intelligent system operates.

The architecture must therefore preserve relationships between:

* raw information;
* normalized information;
* analytics;
* historical observations;
* conclusions;
* recommendations;
* user decisions;
* knowledge;
* future analyses.

The system should not treat each analysis as an isolated event.

Historical context matters.

⸻

5. KNOWLEDGE MUST BE DISTINGUISHED FROM RAW DATA

The system should distinguish between:

* facts directly obtained from external sources;
* normalized data;
* calculated metrics;
* inferred patterns;
* AI-generated hypotheses;
* validated knowledge;
* recommendations;
* user-confirmed conclusions.

The AI must not silently convert uncertain inference into verified fact.

⸻

6. UNCERTAINTY PRINCIPLE

The system should preserve uncertainty where uncertainty exists.

AI output should distinguish between:

Verified

Information directly supported by available data.

Calculated

Information derived through deterministic computation.

Inferred

A conclusion derived from patterns or incomplete information.

Hypothesis

A possible explanation requiring further validation.

Unknown

Information that cannot currently be established reliably.

The system must never manufacture certainty merely to make an answer sound confident.

⸻

7. USER DECISIONS ARE DATA

A major architectural principle is that user decisions are themselves part of the application’s historical intelligence.

The system should preserve meaningful decisions such as:

* accepted;
* rejected;
* modified;
* deferred.

The reason and context of important decisions should be preserved where appropriate.

A recommendation without knowing what the user eventually did is less valuable than a recommendation connected to its outcome.

⸻

8. HISTORICAL CONTEXT

Historical information is a first-class part of the system.

The application should be able to understand not only:

What is happening now?

but also:

What happened before?

What patterns repeated?

What recommendations were previously made?

What did the user accept or reject?

What changed afterwards?

This is necessary for a system intended to become increasingly intelligent over time.

⸻

9. KNOWLEDGE LAYER IS NOT FULLY REBUILDABLE

Some knowledge may be regenerated from raw data.

However, accumulated intellectual history may not be perfectly reconstructable.

Examples include:

* validated patterns;
* historical conclusions;
* user preferences;
* recommendation history;
* accepted or rejected decisions;
* manually validated knowledge.

Therefore the Knowledge Layer must be treated as important persistent data.

⸻

10. EXTERNAL DATA PROVIDERS ARE NOT THE CORE OF THE SYSTEM

External platforms such as Instagram are data providers.

They should not become the architectural foundation of the entire application.

The application should isolate external integrations behind connector/provider boundaries.

This means that changes in an external API should ideally affect the relevant connector rather than require reconstruction of the entire intelligence system.

⸻

11. INSTAGRAM INTEGRATION

Instagram is expected to be one of the important external data sources.

The integration should be designed around official APIs and permissions.

The system must not assume that every piece of Instagram data is automatically available.

Available data depends on:

* account type;
* Meta configuration;
* permissions;
* API version;
* review requirements;
* platform restrictions;
* currently supported endpoints.

The application must therefore distinguish between:

requested data

and

actually available data.

⸻

12. EXTERNAL API TRUST MODEL

External platforms should be treated as potentially changing dependencies.

The architecture should tolerate:

* API changes;
* permission changes;
* unavailable fields;
* temporary outages;
* rate limits;
* revoked authorization;
* expired credentials.

The application should degrade gracefully where possible.

⸻

13. AI PROVIDER INDEPENDENCE

The intelligence layer should not unnecessarily depend on one AI company.

AI providers should be treated as replaceable infrastructure where practical.

Provider-specific implementations should be isolated behind suitable abstraction boundaries.

Changing the provider should not require rewriting the application’s entire intelligence layer.

⸻

14. AI IS A COMPONENT, NOT THE ENTIRE APPLICATION

The application should not become dependent on the assumption that one particular LLM will always behave identically.

Critical deterministic behaviour should remain in conventional software wherever possible.

LLMs should primarily perform tasks for which probabilistic reasoning is useful.

Examples:

* interpretation;
* classification;
* pattern analysis;
* explanation;
* recommendation generation;
* synthesis.

Deterministic code should handle:

* validation;
* persistence;
* permissions;
* calculations where exactness is required;
* business rules that must not vary;
* security controls.

⸻

15. AI OUTPUT MUST BE TRACEABLE

Where practical, important AI-generated conclusions should retain enough context to understand:

* which data was used;
* when analysis occurred;
* which model/provider was used;
* what type of analysis was performed;
* whether the result was validated;
* whether the user accepted or rejected it.

The system should avoid creating an opaque stream of unexplained AI conclusions.

⸻

16. AI ANALYSIS SHOULD BECOME MORE USEFUL OVER TIME

The long-term value proposition depends partly on accumulated history.

A new user may initially receive generic analysis.

A user with months of structured history should receive increasingly contextual analysis.

The system should therefore favour:

personalized historical reasoning

over repeatedly treating every analysis as if the user were completely new.

⸻

17. USER CONTROL

AI assists the user.

It does not automatically become the final authority on important user decisions unless explicitly designed and approved for that purpose.

The user remains in control of:

* important decisions;
* personal data;
* integrations;
* major product behaviour.

⸻

18. PRODUCT OWNER ROLE

Olga is the Product Owner.

Her primary responsibilities are:

* product vision;
* desired behaviour;
* priorities;
* acceptance;
* important business decisions;
* personal preferences concerning product behaviour.

She should not be required to perform unnecessary technical work merely because the development environment makes it possible.

⸻

19. MINIMUM HUMAN INTERVENTION

The development process should deliberately minimize Olga’s mechanical workload.

Olga should not repeatedly:

* copy code;
* move files between AI systems;
* restate architecture;
* explain the same product idea;
* manually inspect raw terminal output;
* answer technical questions that documentation already resolves.

Her intervention should be concentrated on decisions that actually require her.

⸻

20. CHATGPT ROLE

ChatGPT serves as an independent architecture and reasoning layer.

Its responsibilities include:

* architecture;
* reasoning;
* product-to-technical translation;
* consistency checking;
* independent review;
* identifying contradictions;
* identifying unnecessary complexity;
* protecting original product intent;
* proposing workflow optimization.

ChatGPT should not be treated as an infallible authority.

Its recommendations should also be reviewable.

⸻

21. CLAUDE CODE ROLE

Claude Code is the primary implementation environment.

It should be capable of operating as an autonomous development orchestrator.

It may use specialized subagents for roles such as:

* Architect;
* Builder;
* Tester;
* Reviewer;
* Security Reviewer;
* Documentation Agent.

The exact division can evolve according to practical experience.

⸻

22. CLAUDE AUTONOMY MODEL

Claude should operate autonomously when the required decision is already defined by:

* specifications;
* architecture;
* CLAUDE.md;
* DECISIONS.md;
* established engineering principles.

It should not ask Olga to approve routine technical decisions.

⸻

23. GREEN / YELLOW / RED DECISION MODEL

GREEN

Routine technical implementation.

Claude continues autonomously.

Examples:

* creating a standard service;
* adding tests;
* refactoring within established boundaries;
* fixing ordinary bugs;
* updating documentation.

YELLOW

A technical ambiguity exists, but a safe solution can be selected using existing project principles.

Claude may proceed if the decision:

* does not contradict documented requirements;
* is reversible;
* does not introduce major architectural consequences;
* does not affect security or user ownership.

The decision should be documented.

RED

Human intervention required.

Examples:

* product decision;
* unresolved architecture conflict;
* security-sensitive ambiguity;
* credential entry;
* external authorization;
* destructive operation;
* production-impacting irreversible action;
* legally or commercially significant decision.

Claude stops and requests Olga’s action or decision.

⸻

24. INDEPENDENT REVIEW MODEL

ChatGPT should not review every line of code.

That would create unnecessary bottlenecks.

Instead, ChatGPT should perform deeper reviews at meaningful points.

Important review moments include:

* completion of major architectural milestones;
* completion of major integrations;
* completion of the AI intelligence layer;
* major database changes;
* security-sensitive milestones;
* pre-production release;
* unexpected architectural deviation;
* persistent Claude failure;
* situations where Olga feels that something is wrong.

⸻

25. WHY INDEPENDENT REVIEW EXISTS

Claude may simultaneously act as:

* architect;
* implementer;
* tester;
* reviewer.

That provides speed and autonomy.

However, it creates a potential blind spot because one system is evaluating decisions it helped create.

An independent ChatGPT review provides a second reasoning layer.

The goal is not:

ChatGPT is always right and Claude is always wrong.

The goal is:

two independent reasoning processes reduce the chance that a coherent but incorrect decision survives unnoticed.

⸻

26. REPOSITORY PRINCIPLE

The repository is the project’s persistent operational memory.

It is not merely a bridge between AI systems.

It contains:

* source code;
* architecture;
* specifications;
* decisions;
* workflow;
* task state;
* test information;
* operational documentation.

⸻

27. LOCAL AND REMOTE REPOSITORY

The project will normally have:

Local repository

A project directory on Olga’s computer where Claude Code works.

and:

Remote repository

A service such as GitHub that stores a synchronized copy and Git history.

The local repository is where implementation occurs.

The remote repository provides persistence, collaboration, history, backup, and portability.

⸻

28. CHAT IS NOT THE REPOSITORY

ChatGPT does not automatically have access to the local filesystem.

Therefore the project must not depend on the assumption that ChatGPT can directly see the local repository.

Where direct file access is available, it may be used.

Otherwise, repository documentation remains the canonical source that can be supplied or connected when needed.

⸻

29. SOURCE OF TRUTH HIERARCHY

The intended hierarchy is:

1. Explicit accepted product decisions
2. Current architecture/specification documents
3. DECISIONS.md
4. CLAUDE.md operational rules
5. Current implementation
6. Task reports
7. Conversation history

Conversation history is useful context but should not override documented project decisions.

⸻

30. DOCUMENTATION OVER MEMORY

Important project knowledge should be written down.

The project should never rely on:

“The AI remembers that we discussed this.”

Instead:

“The repository records that we decided this.”

This is especially important because very long AI conversations cannot be treated as permanent, complete memory.

⸻

31. DEVELOPMENT WORKFLOW

The preferred development loop is:

SPECIFICATION

↓

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

INDEPENDENT REVIEW WHEN APPROPRIATE

↓

ACCEPT

↓

UPDATE STATUS

↓

NEXT TASK

⸻

32. REQUIRED CLAUDE REPORT

After every significant task Claude should provide a structured report containing:

* status;
* summary;
* files changed;
* tests;
* warnings;
* architecture changes;
* user action required;
* next task.

This reporting requirement is mandatory.

It allows the development process to remain observable without requiring Olga to monitor Claude continuously.

⸻

33. SINGLE SOURCE OF OPERATIONAL STATE

The project should maintain files such as:

* CLAUDE.md
* CURRENT_STATUS.md
* TASKS.md
* DECISIONS.md
* CHANGELOG.md

These files should be updated as development progresses.

⸻

34. AUTOMATION PRINCIPLE

Whenever Olga is repeatedly performing a mechanical operation, the team should ask:

Can this be automated without reducing quality or security?

Manual copy-paste between AI systems is considered a workflow smell when it becomes repetitive.

The long-term goal is to make the repository the communication layer rather than Olga.

⸻

35. DEVELOPMENT SHOULD BECOME MORE EFFICIENT OVER TIME

The project should not become increasingly dependent on Olga’s manual coordination as complexity grows.

Instead:

early phase:

more human explanation

later phase:

more documented rules

later still:

more autonomous implementation

The system should become increasingly self-organizing while retaining appropriate human control.

⸻

36. NIGHT / LONG-RUN DEVELOPMENT

Claude may be allowed to work for extended periods in development or staging environments.

A predefined task queue can be processed autonomously.

Claude should stop if it reaches a RED condition.

Production-changing or destructive actions should not be performed autonomously.

⸻

37. TESTING PHILOSOPHY

Testing is not a final stage performed after all coding.

Testing occurs continuously.

The expected loop is:

write → test → diagnose → fix → test again

Tests should become part of the implementation process.

⸻

38. DEFINITION OF DONE

A task is not considered complete merely because code exists.

It is complete when:

* implementation exists;
* relevant tests pass;
* acceptance criteria are met;
* necessary documentation is updated;
* task report exists;
* project status is updated.

⸻

39. STAGING BEFORE PRODUCTION

Important functionality should be tested in staging before production.

Olga’s product-level acceptance should primarily happen in staging.

This allows realistic review without exposing unfinished changes to production users or production data.

⸻

40. PRODUCTION PRINCIPLE

Production is not a development environment.

Production changes require:

* verification;
* appropriate review;
* controlled deployment;
* rollback capability.

⸻

41. QUALITY OVER SPEED

The project’s primary optimization target is not raw coding speed.

The desired optimization is:

maximum useful progress without sacrificing architecture, security, correctness, maintainability, or product intent.

A faster implementation that creates future instability is not considered progress.

⸻

42. FIRST RESULTS

The expected path to first visible results is:

Architecture complete

↓

Repository setup

↓

Claude Code configuration

↓

Development task decomposition

↓

Initial implementation

↓

Automated tests

↓

Local application

↓

Staging

↓

First usable product

The first milestone is not production scale.

The first milestone is a functioning, testable application that can be opened, used, and reviewed.

⸻

43. PRODUCT DEPLOYMENT MODEL

The eventual application may be deployed as a hosted web application or another appropriate architecture depending on the final technical stack.

The deployment model should be selected after the architecture and MVP requirements are finalized.

The application should not be assumed to be either permanently free or permanently paid at the architecture stage.

Monetization can be designed after product validation.

⸻

44. BUSINESS STRATEGY

The possibility of scaling the product and monetizing it is considered a legitimate future objective.

However, the project should not prematurely optimize the architecture for a hypothetical large business.

The initial system should establish:

* real user value;
* reliable data;
* useful analysis;
* repeatable workflows;
* evidence of demand.

Scaling infrastructure can follow validated demand.

⸻

45. MVP VS SCALE

The architecture should distinguish between:

MVP requirements

and

future scale requirements.

The MVP should not carry unnecessary infrastructure complexity merely because a future large-scale system might need it.

However, the architecture should avoid decisions that make future evolution unnecessarily difficult.

⸻

46. RESILIENCE

The system should assume that failures will eventually occur.

Therefore it should include appropriate:

* backups;
* monitoring;
* restore procedures;
* degraded modes;
* recovery documentation.

The recovery strategy should be proportional to product maturity and actual risk.

⸻

47. BACKUP PRINCIPLE

A backup is considered real only when it can actually be restored into a working system.

Creating a backup file is not sufficient.

Restore testing is therefore part of backup reliability.

⸻

48. SECURITY

Security is a foundational concern rather than a final feature.

Important principles include:

* least privilege;
* secure credential handling;
* encryption;
* access control;
* auditability;
* secret rotation;
* safe external integrations;
* protection against destructive operations.

⸻

49. EXTERNAL AUTHORIZATION

Actions such as Meta / Instagram authorization may require Olga’s direct participation.

These are legitimate RED/user-action events.

Claude should not attempt to bypass them.

⸻

50. USER DATA

User data should be treated as valuable and sensitive.

The application should define:

* ownership;
* access;
* retention;
* deletion;
* backup implications;
* integration disconnect behaviour.

⸻

51. DATA DELETION

Deletion behaviour must be explicit.

Production deletion and backup retention are separate concerns.

Privacy requirements must determine the final implementation.

⸻

52. DEGRADED MODE

Where possible, the application should continue providing useful functionality when a non-core dependency is unavailable.

For example:

AI unavailable

should not necessarily mean:

entire application unavailable.

⸻

53. EXTERNAL DEPENDENCY ISOLATION

External services may fail.

Therefore connectors should expose clear internal interfaces and handle:

* timeouts;
* rate limits;
* revoked access;
* invalid responses;
* temporary outages;
* API changes.

⸻

54. ARCHITECTURAL STABILITY

Claude must not gradually replace the planned architecture through a series of individually convenient technical decisions.

Significant deviations must be surfaced and documented.

⸻

55. PRODUCT INTENT PROTECTION

The original product vision is more important than implementation convenience.

If Claude identifies a simpler technical solution that changes intended user behaviour, it must not silently adopt that solution.

The conflict should be surfaced.

⸻

56. NO UNNECESSARY REWORK

Existing working functionality should not be rewritten merely because another implementation is stylistically preferable.

Changes should have a meaningful reason such as:

* bug;
* security;
* performance;
* maintainability;
* architecture;
* product requirement.

⸻

57. DECISION RECORDING

Important decisions should be recorded in DECISIONS.md.

A decision should include:

* context;
* options;
* selected option;
* reason;
* consequences.

The objective is to prevent future AI sessions from reopening already resolved questions without reason.

⸻

58. HANDOFF PRINCIPLE

The project should eventually be understandable by a developer who was not present during today’s conversations.

A competent developer should be able to enter the repository and understand:

* what the product is;
* why it exists;
* how it works;
* how to run it;
* how to test it;
* what has been decided;
* what remains to be built.

⸻

59. AI MODEL REPLACEMENT

The project should not depend on one model’s personality, memory, or undocumented behaviour.

A future developer should be able to replace:

* Claude;
* ChatGPT;
* another LLM provider;

without losing the project’s accumulated knowledge.

The repository should preserve the actual project intelligence.

⸻

60. FINAL COLLABORATION MODEL

The intended mature system is:

OLGA

Product Owner
Vision
Priorities
Acceptance
Human decisions

↓

CHATGPT

Independent architecture and reasoning
Strategic review
Consistency
Product-intent protection

↓

CLAUDE CODE

Development orchestrator
Architecture execution
Implementation
Testing
Debugging
Documentation

↓

SUBAGENTS

Specialized technical roles

↓

REPOSITORY

Code
Specifications
Decisions
Tasks
Status
History
Tests
Operational knowledge

↓

STAGING

Realistic product validation

↓

PRODUCTION

Controlled release

⸻

61. FINAL PRINCIPLE

The project should be designed so that Olga does not have to become a full-time software engineer in order to successfully own and develop the product.

Her limited programming experience is not itself a reason the project cannot succeed.

The architecture and workflow should compensate by:

* documenting decisions;
* automating repetitive work;
* using AI for implementation;
* using independent review;
* testing continuously;
* preserving project context;
* requiring human intervention only where human judgement is genuinely necessary.

The objective is not to hide complexity from Olga.

The objective is to ensure that she spends her effort on the parts where her understanding of the product is uniquely valuable.

⸻

62. FINAL PROJECT PHILOSOPHY

The project is built around four complementary capabilities:

Human vision

determines what should exist.

Architectural reasoning

determines how the vision should become a coherent system.

AI implementation

turns the system into working software.

Automated verification

checks that the implementation behaves as intended.

The repository preserves the accumulated result.

No single participant is expected to be perfect.

The system is designed so that weaknesses in one layer can be detected by another.

That is the core reason for the three-layer collaboration model.