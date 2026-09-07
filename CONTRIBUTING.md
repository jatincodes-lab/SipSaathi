# Contributing to SIP Saathi

Thank you for helping make investing education clearer for Indian beginners.

## Current project status

This repository currently contains product documentation and an MVP plan. There is no application source code or automated test suite yet. Please do not assume that the planned stack or deployment setup already exists.

See [PROJECT_PLAN.md](PROJECT_PLAN.md) for the proposed React/.NET architecture, PostgreSQL and Redis usage, worker/queue design, n8n workflows, build order, and deployment checks. Implement screening and financial metrics in the versioned backend domain logic; n8n handles operational automation.

## Ways to contribute

### Report a problem

Include:

- A clear description
- Steps to reproduce, if applicable
- Expected and actual behavior
- Device, browser, and language
- Screenshots or calculation inputs when useful

Do not include real account numbers, identity documents, contact details, or private financial information.

### Improve the product plan

Useful proposals explain:

- Which beginner problem is being solved
- Why the current MVP does not already solve it
- What safety, privacy, data, and compliance risks it introduces
- The smallest test that could validate the idea

### Documentation changes

Keep claims sourced, assumptions visible, and examples clearly illustrative. Do not add named-fund recommendations, return promises, affiliate language, or personal-data collection without an explicit compliance and privacy review.

## Pull requests

1. Keep each change focused.
2. Update the relevant Markdown documentation.
3. Check internal links and calculation examples.
4. Explain the user problem and validation evidence.
5. Do not commit secrets or real user data.

When application code is added, the repository should add its actual setup instructions and a small automated check for non-trivial calculation logic.

## Code of conduct

Be respectful, inclusive, and specific. Do not harass, mislead, or publish another person's private information.

## Contact

Maintainer and issue-tracker details will be published when the repository is opened for external contributions.
