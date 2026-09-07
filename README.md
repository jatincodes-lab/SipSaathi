# SIP Saathi

SIP Saathi is a goal-based mutual-fund research and investing-education tool for people in India who are new to systematic investing.

## What the MVP does

The user provides:

1. The financial goal and target amount
2. The target date or time horizon
3. The monthly amount they can actually invest
4. Their risk tolerance, existing savings, and need for liquidity

The MVP then:

- Identifies relevant investment categories for the goal
- Screens and compares a small number of funds using transparent criteria
- Shows multi-year performance, consistency, risk, costs, and benchmark context
- Explains why each fund appears on the research shortlist
- Links users to official scheme information for further research
- Offers an optional goal-feasibility check

The MVP does not call any fund “best,” issue a buy/sell instruction, or claim that any return is expected or guaranteed. Named-fund output requires a separate compliance and data-quality review before public launch.

## Why it exists

Many beginners see dozens of funds but do not know how to connect a goal, a deadline, an affordable monthly contribution, and an acceptable level of risk. SIP Saathi narrows the research space and explains the trade-offs without pretending that one past performance number can predict the future.

## Product boundaries

SIP Saathi provides educational information, not investment, financial, tax, or legal advice. It does not execute investments, assess full financial suitability, or replace a qualified professional. Users should review official scheme documents and consider advice from a SEBI-registered investment adviser before investing.

## Project status

This repository currently contains the product documentation, scaling plan, and visual references in [`design/`](design/). Application source code and deployment configuration have not been added yet.

## Planned MVP principles

- Anonymous by default
- Mobile-first and accessible
- Clear screening criteria and dated data sources
- Multi-year context instead of one-year performance chasing
- Scenario ranges instead of return promises
- No affiliate links or paid fund placement in the initial release
- No collection of salary, contact, or portfolio data unless it is necessary, disclosed, and consented to

## Future direction

Possible later work includes saved goals, regional languages, reminders, manual portfolio tracking, and partnerships with qualified advisers. Any direct recommendation, affiliate arrangement, or transaction flow requires a separate compliance and suitability review before implementation.

## Documentation

- [End-to-end build and scaling plan](PROJECT_PLAN.md)
- [Business requirements](BusinessRequirements.md)
- [Feature plan](FEATURES.md)
- [Privacy policy](PRIVACY.md)
- [Legal disclaimer](DISCLAIMER.md)
- [Contributing guide](CONTRIBUTING.md)
- [MIT license](LICENSE.md)

**Made in India for Indian investors.**
