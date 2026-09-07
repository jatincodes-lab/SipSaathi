# Features

## MVP

### 1. Goal and investor context

The user enters:

- Goal type or a custom goal
- Target amount in INR
- Target date or time horizon
- Monthly amount they can invest
- Risk tolerance and capacity for loss
- Existing savings and need for access to the money

Salary is optional context; monthly investable capacity is the important affordability input.

### 2. Goal-based fund screener

The screener maps the goal and time horizon to relevant categories, then compares a small shortlist of funds using:

- 3-, 5-, and 10-year performance where available
- Rolling-return consistency
- Volatility and maximum drawdown
- Benchmark comparison
- Expense ratio and exit load
- Risk level and portfolio composition
- Source and last-updated date

The result is a research shortlist with plain-language reasons. It must not use “best fund,” past-year-only ranking, or a direct buy instruction.

### 3. Optional goal check

The user may check whether their target and monthly contribution are broadly aligned. This screen shows assumptions, inflation, and illustrative scenarios; it does not determine whether an investment is suitable.

### 4. Category education

The app explains liquidity, volatility, time horizon, and possible loss of capital. Emergency and near-term goals receive a prominent liquidity and capital-preservation warning. The app must not imply that an equity-oriented product is appropriate for emergency money.

### 5. Research links

Users may open official AMC, AMFI, or other authoritative scheme-information pages. Every displayed data point must include its source and last-updated date.

The initial release has no affiliate links, paid placement, or transaction execution.

### 6. Safety and accessibility

- Clear educational disclaimer beside results
- No guarantees, “best fund,” or one-year-winner language
- Keyboard navigation and readable colour contrast
- Mobile-first responsive layout
- No account required for the screener
- Rate limiting and input validation at any network boundary

## Later, only after validation

### V2: Better planning

- Multiple goals with prioritisation
- Emergency-fund progress
- Optional saved goals with explicit consent
- Income and expense context
- Improvements to the required MVP risk and loss-capacity questions

### V3: Research and access

- A larger dated, quality-checked fund-research directory
- Regional languages, starting with Hindi
- Educational articles with reviewed sources
- Optional reminders with opt-in contact details
- Manual portfolio tracking with deletion and export controls

Named-fund suggestions in the MVP are intended as research shortlists; this label does not decide their regulatory treatment. The actual screening behaviour is covered by the agreed public-launch review. Direct personalised recommendations, affiliate links, and transaction flows require a separate legal, compliance, conflict-of-interest, and suitability review.

## Explicitly out of scope for the MVP

- Direct personalised investment, tax, or legal advice
- Guaranteed or “expected” fund returns
- Auto-SIP setup or payment processing
- Portfolio access or account aggregation
- Collection of email, phone, account statements, or transaction histories; a transient existing-savings amount is part of screening
- AI-generated investment recommendations

## Priority

| Feature | User value | Effort | Priority |
|---|---:|---:|---:|
| Goal and investor inputs | High | Low | MVP |
| Fund screener and comparison | High | High | MVP |
| Optional goal check | Medium | Medium | MVP |
| Category education | High | Low | MVP |
| Disclaimer and source dates | High | Low | MVP |
| Multiple goals | High | Medium | Later |
| Risk and loss-capacity questions | High | Medium | MVP |
| Larger research directory | Medium | High | Later |
| Regional languages | Medium | Medium | Later |
| Reminders and portfolio tracking | Medium | High | Later |
| Direct recommendations or transaction flow | Unclear | Very high | Compliance review first |

## Internal platform work

The MVP also needs a data-quality/review console, background imports and metric calculation, Redis caching of published fund data, durable job retries, n8n operational workflows, and managed load balancing. These support the user features; see [PROJECT_PLAN.md](PROJECT_PLAN.md) for the implementation sequence and deployment stages.
