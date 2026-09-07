# Privacy Policy

**MVP status:** This policy describes the intended privacy behavior of the documentation-stage MVP. It must be updated to match the actual hosting, analytics, and storage implementation before launch.

**Last updated:** September 7, 2026

## 1. What SIP Saathi is

SIP Saathi is a goal-based mutual-fund research and investing-education tool. The MVP does not require a user account. Its API processes screening answers transiently; the optional goal calculator can run in the browser.

## 2. Information handled by the MVP

The browser and screening API may temporarily handle:

- Goal type, target amount, and target date
- Monthly amount the user says they can invest
- Risk tolerance, loss capacity, existing-savings amount, and liquidity answers
- Calculation assumptions and result values

Screening inputs are transmitted over HTTPS for transient API processing. They must not be persisted in PostgreSQL, Redis, n8n execution history, analytics, URLs, or request/error logs, or connected to a user identity in the MVP. Public fund facts and calculated historical metrics are stored and cached separately. The service does not intentionally ask users for a name, email address, phone number, bank details, account credentials, or portfolio statement.

Hosting, security, or error-monitoring providers may create ordinary technical logs such as IP address, browser, and request time. We will document those providers and retention periods before launch instead of promising that infrastructure collects no logs.

## 3. Analytics

No product analytics are required for the screener to work. If aggregated measurement is added, we will document what is collected, why it is needed, which provider receives it, and whether consent is required. Analytics must not include raw salary, contact details, or identifiable financial history unless a new privacy review approves it.

## 4. Future features

Saved goals, reminders, portfolio tracking, or personalised features may require personal or financial information. Before enabling them, we will:

1. Explain the data and purpose clearly
2. Obtain consent where required
3. Provide access, correction, deletion, and opt-out controls
4. Set a retention period
5. Review security and applicable privacy obligations
6. Update this policy before collection begins

## 5. Sharing

The MVP does not sell or share screening inputs for advertising or fund marketing. The planned Azure edge, API, and monitoring infrastructure processes requests and technical operational data. The final provider list, regions, and retention settings must be disclosed before launch. n8n receives internal job/status summaries rather than user financial inputs. Third-party research links have their own privacy policies; SIP Saathi does not control them.

## 6. Security

We will use HTTPS for deployed services, validate all network inputs, limit access to any stored data, keep dependencies updated, and avoid storing data that the MVP does not need. Security measures will be matched to the actual implementation rather than claimed in advance.

## 7. Children

The service is designed for adults making their own financial decisions and is not directed at children under 18.

## 8. Your choices

Users can use the screener and optional calculator without creating an account. If persistent personal profiles are introduced later, the service will provide the choices and rights required by applicable law, including deletion and withdrawal of optional communications.

## 9. Changes

We will update this policy when the data practices change and display the new effective date. The policy must be reviewed before adding analytics, accounts, reminders, portfolio tracking, or monetisation.

## 10. Contact

Official privacy-contact details will be published before public launch. The current repository contains no live user-data service.
