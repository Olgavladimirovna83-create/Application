> ⚠️ SUPERSEDED — см. DECISIONS.md, D-0002. Актуальная версия: `13_RECOMMENDATION_ENGINE.md`.
> Этот файл сохранён для истории, на него не следует ссылаться в новых задачах.

06_RECOMMENDATION_ENGINE

Purpose

The Recommendation Engine transforms the results of the user’s personal analytical system into a clear, useful collection of recommendations.

The application does not create content, publish content, or make decisions for the user.

Its function ends with providing information, analysis, and recommendations.

The user remains fully responsible for deciding what content to create, when to create it, and whether to follow any recommendation.

⸻

1. Daily Account Overview

When the user opens the application, the first section should present a summary of the account’s key performance metrics for the previous day.

The exact list of metrics will be defined separately in the Metrics Framework.

The purpose of this section is to give the user an immediate understanding of the current state of the account without requiring them to analyse raw statistics themselves.

The system should present the relevant metrics clearly and concisely.

⸻

2. Latest Publication Analysis

After the general account statistics, the system should analyse the user’s most recent publication.

For example:

Yesterday’s post currently has X likes, X comments, X saves, X shares and X followers generated.

The system should then compare the publication with relevant previous publications.

The comparison should be format-specific.

If the latest publication is a carousel:

→ compare it with the user’s four previous relevant carousels.

If the latest publication is a Reel:

→ compare it with the user’s four previous relevant Reels.

If the latest publication is another format:

→ compare it with the four most relevant previous publications of the same format.

The purpose is to avoid misleading comparisons between fundamentally different types of content.

⸻

3. Recent Performance Summary

After analysing the latest publication, the system should provide a short interpretation of the user’s recent overall performance.

The system should consider a broader recent period rather than evaluating the account based only on one publication.

For example:

Yesterday’s performance was broadly in line with your recent average.

or:

Your content performed slightly above your average over the past two weeks.

The exact comparison period and statistical methodology will be defined separately.

The user should be able to see the underlying statistics if they want to examine the analysis in greater detail.

⸻

4. Identification of Current Weaknesses

The system should identify metrics that appear to be underperforming relative to the user’s own historical performance.

For example:

Your like performance has declined recently compared with your normal level.

This does not mean that the system should automatically treat the lowest metric as the most important one.

The system should interpret the metric within the user’s broader growth objective and the personal analytical algorithm.

The purpose is to identify areas that may deserve attention.

⸻

5. Recommendation of an Area of Focus

After identifying a potentially important weakness or opportunity, the system may recommend that the user focus on a particular metric or type of performance.

For example:

Your like performance has weakened recently. Over the next few weeks, it may be useful to intentionally include more content formats that have historically generated strong like performance for your account.

The recommendation may concern a longer period rather than only the next publication.

The system should therefore be capable of identifying a strategic area of focus for the coming days or weeks.

⸻

6. Recommendations Based on the User’s Own Content

Once an area of focus has been identified, the system should use the user’s historical content data to find relevant examples.

For example, if the system identifies likes as an area worth improving, it should analyse the user’s historically successful posts according to the previously defined Analytical Engine methodology.

It may then identify patterns such as:

* specific formats that repeatedly generate strong likes;
* specific subjects;
* specific visual characteristics;
* specific types of personal content;
* specific storytelling approaches;
* or other recurring characteristics.

The system can then present examples of content directions that have historically worked well for this particular user.

For example:

Posts featuring your dog have repeatedly generated strong like performance.

Your sunset and travel content has also historically performed above your average for likes.

These recommendations must be derived from the user’s own data rather than generic assumptions.

⸻

7. Connection to the Analytical Engine

The Recommendation Engine does not independently determine which content should be recommended.

It uses the Analytical Engine and the user’s personal algorithm.

The process is:

Current Statistics

→ Latest Publication Analysis

→ Recent Performance Analysis

→ Identify Potential Weakness or Opportunity

→ Select Relevant Metric or Area of Focus

→ Run the Personal Analytical Algorithm

→ Analyse Relevant Historical Publications

→ Identify Successful Patterns

→ Present Evidence-Based Content Directions

The Recommendation Engine is therefore the presentation and decision-support layer built on top of the deeper analytical system.

⸻

8. Recommendation Output

At the current stage, the Recommendation Engine should remain intentionally simple.

The desired output is:

A. Current State

A concise summary of what is happening with the account.

B. Latest Publication

A comparison of the most recent publication with four relevant previous publications of the same format.

C. Recent Trend

A short interpretation of the account’s recent overall performance.

D. Area Requiring Attention

Identification of a metric or performance area that may currently deserve attention.

E. Recommended Direction

A concise explanation of what the user could focus on over the coming period.

F. Relevant Content Examples

Examples of the user’s own historically successful content that may be useful for addressing the identified area.

⸻

9. No Content Creation

The Recommendation Engine must not create the final content for the user.

It may describe useful content directions or patterns, but the user remains responsible for turning those recommendations into actual content.

For example, the system may say:

Consider using more personal content featuring your dog because this type of content has historically generated strong likes for your account.

It should not automatically produce the finished Reel, caption, script, or post unless such functionality is intentionally added to the product in the future.

⸻

10. No Automated Decision-Making

The system provides recommendations only.

It does not decide:

* what the user must post;
* when the user must post;
* which recommendation the user must follow;
* which strategy the user must choose;
* or whether a recommendation should ultimately be implemented.

The user reviews the information and makes the final decision.

⸻

11. Future Expansion

This is the initial version of the Recommendation Engine.

The current MVP should remain focused on the core workflow:

Understand the current state → identify what deserves attention → explain why → recommend a direction → show evidence from the user’s own successful content.

Additional functionality may be introduced later when real-world use reveals a clear need for it.

The system should not be unnecessarily complicated before the core analytical and recommendation process has been validated.