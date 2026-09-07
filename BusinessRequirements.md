# Business Requirements Document

## 1. Executive summary

### 1.1 Project

**SIP Saathi** is a goal-based mutual-fund research and investing-education tool for Indian beginners.

### 1.2 Vision

Help a beginner connect a financial goal, a deadline, and an affordable monthly contribution without overwhelming them with fund choices or presenting education as personal advice.

### 1.3 Problem

Beginners often know that SIPs exist but do not know:

- How much they can safely contribute each month
- Whether their target is feasible by a chosen date
- How inflation and market uncertainty affect the target
- Which investment-category trade-offs matter
- Where to find reliable scheme information

Existing investment platforms can expose users to many products before they understand the planning basics. Unverified market statistics are excluded from the requirements until primary, verifiable sources are added.

### 1.4 MVP solution

The user provides the goal, target amount, deadline, monthly investable surplus, risk tolerance, existing savings, and liquidity need. SIP Saathi then:

1. Identifies relevant investment categories
2. Screens a small shortlist of funds using transparent criteria
3. Shows multi-year performance, consistency, risk, costs, and benchmark context
4. Explains why each fund appears on the research shortlist
5. Optionally checks whether the goal and contribution are broadly aligned
6. Links to authoritative scheme information for research

The MVP does not call any fund “best,” issue a buy/sell instruction, execute an investment, or claim that a return is expected or guaranteed. Named-fund output requires a separate compliance and data-quality review before public launch.

### 1.5 Positioning

SIP Saathi is a planning and education tool, not an investment adviser, distributor, broker, or investment execution platform. Legal and compliance review is required before any named recommendation, affiliate arrangement, or transaction feature is launched.

## 2. Goals and validation

### 2.1 MVP goals

- Test whether beginners understand the research shortlist and its reasons
- Help users compare funds without relying on one-year performance
- Help users identify an affordable monthly contribution when they choose to use the goal check
- Reduce confusion about basic category trade-offs
- Learn which goals and languages deserve further investment
- Keep the first release anonymous and inexpensive

### 2.2 Pilot measures

During the first pilot, measure:

- Completion rate from landing page to result
- Percentage of users who understand the result in a short survey
- Screener and optional goal-check reuse rate
- Reported change in confidence, without claiming that users invested
- Error rate and time to result
- Most common goal types and requested languages

Do not set MAU, revenue, NPS, or “market leader” targets until real usage provides a baseline.

### 2.3 Success condition

The MVP is worth extending if users can complete the flow, understand the assumptions, and say the result helps them plan. User investment conversions are not a success metric until the regulatory and suitability model is reviewed.

## 3. Target users

### 3.1 Primary audience

- First-job earners who are beginning to plan
- People with a specific medium- or long-term goal
- Users who need simple explanations in English or an Indian regional language
- Independent learners who want to research before speaking to a professional

### 3.2 Not the initial audience

- Users seeking a guaranteed return
- Users needing urgent emergency liquidity
- Users asking the tool to manage or execute their portfolio
- Users who need comprehensive tax, insurance, estate, or debt advice

### 3.3 Example user

Rahul earns INR 25,000 per month and wants to buy a bike in two years. Instead of assuming that 20% of his salary is affordable, the app asks how much he can actually set aside, the target amount, and how much loss or delay he could tolerate. It shows relevant categories and a transparent research shortlist with supporting data. It does not tell him to buy a fund.

## 4. Functional requirements

### FR-1: Goal input

The user can select a common goal or enter a custom label, target amount, and target date. A preset goal must not silently impose an unsuitable horizon or target.

### FR-2: Monthly investable surplus

The user enters the amount they can contribute each month after essential expenses and debt payments. Salary may be collected only as optional context and must not be treated as disposable income.

### FR-3: Risk and liquidity context

The user answers questions about comfort with losses, capacity to absorb loss, existing savings, and when the money may be needed. These questions are required in the MVP. Contradictory answers produce clarification rather than an automatic shortlist. Results must clearly say that this is not a complete risk-profile or suitability assessment.

### FR-4: Goal-based fund screening

The system maps the goal and user context to relevant categories and compares a small fund shortlist. It must use:

- 3-, 5-, and 10-year performance where available
- Rolling-return consistency
- Volatility and maximum drawdown
- Benchmark comparison
- Expense ratio and exit load
- Risk level and portfolio composition
- Source and last-updated date

The system must not rank funds using only the previous year’s performance.

### FR-5: Optional goal check

The user may compare their target, deadline, and monthly contribution using visible inflation and illustrative return assumptions. The result must show uncertainty and must not determine product suitability.

### FR-6: Category education

The result explains liquidity, volatility, time horizon, and capital-loss risks. Emergency and near-term goals must prioritise a warning about access and capital preservation; the product must not imply that an equity-oriented fund is suitable for emergency money.

### FR-7: Research links

Links must go to official AMC, AMFI, or other authoritative pages. Displayed data requires a source and “last updated” date. The MVP has no affiliate tracking or paid placement.

### FR-8: Disclaimer

The disclaimer must appear beside the result, state that the output is educational, and explain that users should review scheme documents and seek qualified advice where appropriate.

### FR-9: Anonymous use

The screener works without an account. The API processes screening inputs transiently; do not persist raw financial answers in databases, caches, logs, or automation workflows. The optional goal check can run in the browser. Any aggregate analytics must be separately documented and, where required, consent-based.

## 5. Out of scope for MVP

- Direct personalised buy/sell recommendations
- Past-year-only fund ranking
- Auto-SIP setup, payments, or order execution
- Portfolio aggregation or current NAV tracking
- Personalised tax, insurance, debt, or estate planning
- AI or machine-learning recommendations
- Email, phone, WhatsApp, account statements, or transaction-history collection; a transient existing-savings amount is part of screening
- Affiliate links, paid placement, or premium subscriptions

## 6. Non-functional requirements

### 6.1 Usability

- Mobile-first responsive layout
- Maximum three steps to reach a result
- Plain language; explain terms such as CAGR, NAV, and volatility
- Keyboard access, readable contrast, and screen-reader labels
- Users can edit assumptions and recalculate

### 6.2 Trust

- Show calculation assumptions, source dates, and limitations
- Never use “best fund,” “safe return,” or guaranteed-return wording
- Do not rank products by commission
- Keep an audit trail for all externally sourced screening data

### 6.3 Security and privacy

- Validate inputs at every network boundary
- Use parameterized database access if a database is introduced
- Enforce HTTPS in deployment
- Apply rate limiting only where a network API exists
- Minimise retention and provide deletion controls before storing personal data

### 6.4 Performance

Use the staged architecture and test targets in [PROJECT_PLAN.md](PROJECT_PLAN.md): ASP.NET Core API and worker, PostgreSQL, Redis, durable background jobs, n8n operational automation, and managed load balancing. Compute fund metrics in the background and serve published snapshots. Initial public-load target: 100 API requests/second for 30 minutes, p95 below 500 ms and fewer than 1% unexpected 5xx responses. These are proposed acceptance targets, not measured capacity.

## 7. Data requirements

### 7.1 MVP data

The MVP needs goal categories, fund metadata, historical performance data, screening criteria, educational copy, and authoritative links. Every fund field needs a verified source and last-updated date.

### 7.2 Fund-screening data quality

Each screened fund must have a scheme identifier, name, category, plan type, risk information, relevant costs, taxation notes, performance periods, source, and last-updated date. MFapi or any other source must be checked to confirm that it actually supplies each required field; NAV data alone is not enough. Missing or stale required data excludes a fund from the relevant screening cohort. Optional longer-history metrics may display as unavailable. Freshness depends on each source's trading/disclosure calendar; see [PROJECT_PLAN.md](PROJECT_PLAN.md).

### 7.3 User data

No account or persistent user profile is required for the MVP. Financial context is processed transiently by the screening API and excluded from logs and caches. Future saved goals, reminders, or portfolio tracking require a new privacy review, explicit consent, access/deletion controls, and a retention policy.

## 8. Commercial model

The first release is a validation product, not a revenue forecast.

Possible future models are:

- Paid educational content
- Optional planning features
- Transparent partnerships with qualified advisers
- Affiliate links only after compliance review and clear conflict disclosure

Affiliate revenue must never influence educational outputs or product ordering. Any projected revenue requires observed traffic and conversion data rather than assumed percentages.

## 9. Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Users interpret scenarios as promises | High | Use ranges, inflation, assumptions, and prominent limitations |
| A shortlist is mistaken for personal advice | High | Use research language, show criteria and limitations, and complete legal review before public named-fund output |
| Emergency money is directed toward volatile products | High | Treat liquidity and capital preservation as first-class constraints |
| Data becomes stale or incomplete | High | Show source dates, validate fields, and provide official links |
| Affiliate incentives create distrust | High | Keep the MVP independent; disclose and separate commercial ranking later |
| Low adoption | Medium | Interview and pilot with real beginners before expanding features |
| Scope expands too early | Medium | Ship only the screener, comparison, optional goal check, education, and disclaimer first |

## 10. Delivery plan

### Phase 0: Validate

- Interview 10–20 target users
- Test the wording and screening criteria with a qualified financial professional
- Confirm historical-data sources and legal position
- Prototype the screener and comparison in a simple page

### Phase 1: MVP

- Goal, investor-context, and surplus inputs
- Fund screening and transparent comparison
- Optional goal check with scenarios and inflation
- Category education and disclaimer
- Mobile accessibility
- Basic anonymous measurement only if documented

### Phase 2: Evidence-led improvements

- Multiple goals
- Refine the required MVP risk and loss-capacity questions based on pilot feedback
- Regional language support
- Saved goals only after privacy review

### Phase 3: Separate regulated/commercial work

- Larger fund-research directory
- Adviser partnerships
- Affiliate links
- Portfolio tracking or investment execution

Each Phase 3 item requires its own compliance, privacy, and data-quality approval.

## 11. Budget and architecture

The working architecture is React/TypeScript, ASP.NET Core on .NET 10, PostgreSQL, Redis, Service Bus, a separate worker, n8n for operations, and Azure managed hosting/load balancing. [PROJECT_PLAN.md](PROJECT_PLAN.md) defines the component responsibilities, deployment stages, build sequence, and scaling triggers.

Budget for managed database/cache, queue, compute, CDN/load balancing, monitoring, backups, automation, and fund/benchmark licensing. Quote the pilot and public high-availability configurations separately before provisioning; no free-tier assumption is made.

## 12. Stakeholders

- Founder/developer: product, implementation, and operations
- Target users: usability feedback and validation
- Qualified financial/compliance reviewer: safety and regulatory review
- Data providers: only where source quality and usage rights are verified
- Hosting providers: infrastructure only

## 13. Open decisions before launch

- Which data sources cover the required fields and allow their intended use?
- Which category eligibility rules and comparison conventions will be approved?
- What budget, deployment region, and recovery objectives will be adopted?
- Which assumptions and inflation source will the optional goal check use?
- Which analytics, if any, are necessary?
- Who performs the legal and financial review?
- Which official sources can be maintained reliably?
- What real user evidence justifies each future feature?

**Document version:** 3.0  
**Last updated:** September 7, 2026
