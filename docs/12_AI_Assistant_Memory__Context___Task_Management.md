Document 12: AI Assistant Memory, Context & Task Management

1. Purpose

The AI Assistant must work as a continuous personal assistant rather than treating every user message as an isolated request.

It should remember the user’s context, ongoing work, previous decisions, unfinished tasks, postponed tasks, preferences, and relevant interaction history.

The assistant should gradually learn to understand the user and use this understanding to make increasingly personalized recommendations.

The final decision always remains with the user.

2. Continuous Context

When the user begins working on a specific task, the assistant should remember it as an active task.

If the user temporarily changes the subject, the assistant can answer the new question without immediately interrupting them.

However, when the assistant detects that the user is moving substantially away from an unfinished task, it should gently remind them about it and ask whether they want to:

* continue the current task;
* switch to the new topic;
* postpone the current task;
* close the task permanently.

The assistant should prevent important unfinished work from being accidentally forgotten without becoming intrusive.

3. Topic Switching

The assistant should be able to distinguish between a temporary distraction and a genuine change of subject.

The user should remain free to ask unrelated questions.

The assistant should not interrupt every new question with a reminder.

If the transition becomes significant, it can say, for example:

“We still have the post we were working on. Do you want to finish it first, or should we switch to Stories?”

The assistant’s role is to maintain continuity, not to control the user.

4. Task States

Tasks should have clear states:

Active
The user is currently working on the task.

Postponed
The user wants to return to the task later.

Closed
The user has decided not to continue with the task.

A closed task should not be automatically suggested again.

5. Reminders

If the user does not specify a deadline, the default reminder logic is:

* first reminder after 1 day;
* second reminder after 3 days;
* after another refusal, offer to either remove the task or postpone it for another 3 days.

If the user specifies their own deadline, the assistant follows that instruction.

For example:

“Let’s come back to this in a week”

means the task should be postponed for one week.

6. Direct Task Management

The user should be able to manage tasks through natural language.

Examples:

* “Put this off for a week”
* “Let’s come back to this tomorrow”
* “Remove this task”
* “Let’s continue”
* “What are we still working on?”
* “What did I forget?”
* “Show me my postponed tasks”

The assistant should interpret these commands and update task status accordingly.

7. The User Should Not Have to Remember Everything

The assistant should carry the responsibility for remembering unfinished work.

The user should not need to remember what they previously wanted to do.

The interface should provide an easy way to retrieve current and postponed tasks.

The exact UI implementation can be decided during UX/UI development.

Possible interaction:

“What are we still working on?”

The assistant then provides a concise list of active and postponed tasks.

8. Learning the User

The assistant should gradually learn about the user through:

* decisions;
* accepted recommendations;
* rejected recommendations;
* preferences;
* goals;
* repeated behavior;
* questions and interactions;
* choices made during content planning.

This information should improve future personalization.

The assistant should aim to act in the user’s best interests and understand the user’s values.

However, its assumptions about the user should never be treated as absolute truth. The user must always be able to correct the assistant.

9. Disagreement with the User

The assistant is allowed to tell the user that it considers a particular decision suboptimal when the available data or context supports that conclusion.

It should:

* clearly state its position;
* briefly explain why;
* respect the user’s final decision;
* continue helping the user execute the chosen direction.

The assistant should not argue indefinitely or attempt to override the user.

10. Choosing the Next Action

After providing analysis or advice, the assistant may offer several possible next steps.

For example:

* learn more about the conclusion;
* see the underlying data;
* see recommended content options;
* discuss the user’s own idea;
* continue the current task;
* switch to another topic.

This keeps the assistant proactive while preserving user control.

11. Unified Event History

The application should maintain one unified history of significant system events.

The history is retained for 3 months.

It may contain events such as:

* changes in priorities;
* changes in recommendations;
* newly detected patterns;
* closed tasks;
* deleted tasks;
* other significant changes in the system’s behavior.

All events should appear in one chronological list.

Examples:

“Today: Likes are no longer a priority metric”

“Yesterday: Task ‘Reels with swimsuits’ was deleted”

The history should record the fact of the event only, without requiring a detailed explanation.

12. Automatic Updating

The analytical system and AI Assistant should continuously maintain current conclusions.

The user should not have to manually approve every change.

When new data shows that a previous conclusion is no longer valid, the system should update it automatically.

When a significant change occurs, the user should receive a short notification.

For example:

“I’ve updated the current priority for likes.”

The notification can lead directly to the unified history.

13. Dynamic Recommendations

Recommendations must not be permanent.

The system should continuously reassess the current situation using new data.

For example:

If likes decline significantly relative to the user’s current norm, the system may recommend content aimed at improving likes.

If likes later recover to an acceptable level, the system should stop treating likes as the main problem.

If multiple metrics decline simultaneously, the system should identify the situation, provide its own conclusion, and let the user decide what to do next.

14. Time Weighting

The assistant and analytical system should account for the fact that newer data is more relevant than older data.

The current agreed principle is:

* the most recent 3 months have the highest weight;
* months 4 to 6 have medium weight;
* data older than 6 months has lower weight.

This prevents old successful periods from permanently dominating the system’s understanding of the user’s current audience and content performance.

15. Core Behavioral Principle

The AI Assistant combines three core qualities:

Memory
It remembers the user, their context, decisions, tasks, and ongoing work.

Initiative
It notices important changes, reminds the user about unfinished work, and suggests useful next steps.

User control
It never takes the final decision away from the user.

The ultimate purpose is not simply to answer questions, but to help the user consistently move forward without losing important ideas, tasks, decisions, or context.