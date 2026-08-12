PROJECT_MASTER_CONTEXT

1. PURPOSE

This repository contains the complete architectural and strategic foundation of the project.

The project was deliberately designed through an architecture-first process before implementation.

The documents in this repository are not independent notes.

Together they form one coherent system specification.

⸻

2. HOW TO READ THIS REPOSITORY

The repository contains several types of information.

Architecture documents

These define how the application itself should work.

They are authoritative for their respective technical domains.

Strategic context

PROJECT_CONTEXT_AND_FINAL_STRATEGIC_DECISIONS.md

This document preserves the important reasoning, principles, priorities, and final conclusions established during the architecture phase.

Development workflow

PROJECT_DEVELOPMENT_WORKFLOW_AND_AI_COLLABORATION.md

This document defines how the project is developed and how Olga, ChatGPT, Claude Code, and the repository interact.

These documents should be read before making major architectural or implementation decisions.

⸻

3. SOURCE OF TRUTH

The repository is the long-term source of truth.

Conversation history must not be treated as the only source of project knowledge.

If something important was decided during a conversation, it should eventually exist in repository documentation.

When documentation and conversation history conflict, the current accepted repository decision should normally take precedence.

If documentation itself is contradictory, the contradiction must be identified rather than silently guessed away.

⸻

4. PRODUCT OWNER

Olga is the Product Owner.

Her responsibilities include:

* product vision;
* priorities;
* user-facing behaviour;
* business decisions;
* acceptance;
* decisions requiring personal authorization.

Olga should not be used as a manual information bridge between AI systems when the information can be stored in the repository.

⸻

5. DEVELOPMENT MODEL

Claude Code is the primary autonomous implementation environment.

Claude may internally organize development through specialized agents or roles such as:

* Architect;
* Builder;
* Tester;
* Reviewer;
* Security Reviewer;
* Documentation Agent.

Claude should resolve routine technical questions autonomously when the answer is already determined by the repository.

It should stop only when genuine human input is required.

⸻

6. CHATGPT ROLE

ChatGPT is an independent architecture and reasoning reviewer.

ChatGPT is not intended to supervise every line of code.

Its primary purpose is to provide:

* architectural review;
* independent reasoning;
* consistency checking;
* product-intent protection;
* strategic problem solving;
* identification of risks;
* identification of unnecessary complexity;
* review of major milestones.

This independence is intentional.

Claude may act as architect, implementer, tester, and reviewer inside the development environment.

ChatGPT provides an additional external reasoning layer when appropriate.

⸻

7. HUMAN INTERVENTION

The project is intentionally designed to minimize unnecessary human mechanical work.

Olga should primarily be involved when something requires:

* product judgement;
* business judgement;
* personal authorization;
* credentials;
* external account authorization;
* security-sensitive decisions;
* irreversible actions.

Routine technical work should remain autonomous.

⸻

8. QUALITY PRINCIPLE

The project prioritizes:

1. correctness;
2. architectural coherence;
3. security;
4. maintainability;
5. traceability;
6. product intent;
7. speed.

Speed matters, but not at the expense of the previous principles.

⸻

9. NO ARCHITECTURAL DRIFT

Implementation must remain consistent with the documented architecture.

Claude must not gradually replace the planned system with a different architecture through a series of convenient local decisions.

Significant deviations must be explicitly identified and documented.

⸻

10. NO UNNECESSARY COMPLEXITY

The project should not build large-scale infrastructure before the product requires it.

MVP architecture should be sufficient for the intended first version while preserving reasonable paths toward future expansion.

⸻

11. AI PROVIDER INDEPENDENCE

The system should avoid unnecessary dependence on one AI provider.

AI providers are infrastructure components.

The application should isolate provider-specific behaviour where practical.

⸻

12. DATA AND KNOWLEDGE

The application is designed not merely as a data store.

Its conceptual progression is:

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

RECOMMENDATIONS

↓

USER DECISIONS

↓

HISTORICAL LEARNING

Historical context and user decisions are part of the long-term value of the system.

⸻

13. UNCERTAINTY

The system must distinguish between:

* verified information;
* calculated information;
* inferred information;
* hypotheses;
* unknown information.

AI must not silently convert uncertain inference into fact.

⸻

14. EXTERNAL INTEGRATIONS

External platforms such as Instagram are providers of data and capabilities.

They must not become the foundation of the core intelligence architecture.

External integrations should be isolated behind appropriate connectors.

The application must not assume that external platforms will always provide every requested field or capability.

⸻

15. TESTING

Testing is continuous.

The expected development cycle is:

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

ACCEPT / REWORK

↓

NEXT TASK

A task is not complete merely because code exists.

⸻

16. REQUIRED CLAUDE REPORT

After every significant task Claude must provide a structured report containing:

* status;
* summary;
* files changed;
* tests;
* warnings;
* architecture changes;
* user action required;
* next task.

This report is part of the project’s operating process.

⸻

17. CURRENT STATE

Before continuing development, the project should maintain a concise:

CURRENT_STATUS.md

This file should identify:

* current phase;
* completed milestones;
* active task;
* blocked tasks;
* known issues;
* next recommended action.

⸻

18. IMPORTANT RULE FOR FUTURE AI SESSIONS

Do not assume that missing conversational context means the project has lost its decisions.

Read the repository first.

The intended behaviour is:

DOCUMENTATION

↓

UNDERSTAND CURRENT STATE

↓

IDENTIFY NEXT TASK

↓

IMPLEMENT

↓

VERIFY

↓

REPORT

Only unresolved questions should return to Olga.

⸻

19. FINAL PRINCIPLE

This repository is the project’s persistent memory.

The goal is that a future developer or AI can enter the project without having participated in the original conversations and still understand:

* what the product is;
* why it exists;
* how it should work;
* what has already been decided;
* how it should be developed;
* what remains to be built.

The project should become progressively more autonomous without becoming less controlled.

Human vision provides direction.

Architecture provides structure.

AI implementation provides execution.

Automated verification provides confidence.

The repository preserves the accumulated knowledge of the entire system.