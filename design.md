# SIP Saathi design system

Status: initial visual foundation

SIP Saathi uses a friendly, mobile-first fintech interface inspired by the supplied onboarding references. The product keeps the energetic blue-led feeling, but uses one indigo hue family throughout. The reference images guide layout and tone only. Do not reuse their logo, artwork, copy, or screenshots.

## Design direction

- Audience: people making their first goal-based investment decisions.
- Mood: clear, encouraging, calm, and trustworthy.
- Theme: light by default, with indigo brand blocks where emphasis is needed.
- Layout: one focused question or decision per screen, generous spacing, readable numbers, and a fixed bottom action on mobile.
- Visual language: large condensed headlines, rounded content sheets, segmented progress, outlined inputs, and original monochromatic illustrations.
- Design dials: `DESIGN_VARIANCE 4`, `MOTION_INTENSITY 3`, `VISUAL_DENSITY 4`.

## Screen system

The first screen is the visual anchor. Every later screen should feel like the same product through the same indigo hue, typography, corner radii, button treatment, and spacing rhythm.

### Shared screen structure

1. Top bar with the SIP Saathi mark and a quiet back or close action where needed.
2. Segmented progress for the onboarding questions, with a text alternative such as "Question 2 of 6".
3. One clear headline that asks one question or explains one decision.
4. Short supporting copy in the body font.
5. A single primary action, fixed near the bottom on mobile and safe-area aware.

### Typography plan

- Display candidate: `Barlow Condensed`, semibold, for short headlines and major numbers.
- Body candidate: `DM Sans`, regular and semibold, for labels, explanations, forms, and legal text.
- Data: `DM Sans` with tabular numerals for amounts, percentages, dates, and comparison values.
- Self-host the selected fonts before production. Until then, use the existing `Impact` and system sans-serif fallbacks in the prototype.
- Headline scale: `clamp(3.5rem, 13vw, 8rem)` on hero screens, `clamp(2.4rem, 8vw, 4.5rem)` on form screens, and `2rem` to `3rem` on result screens.
- Body scale: `16px` minimum for normal copy, `14px` minimum for supporting copy, and `12px` only for non-essential metadata.

## Complete screen plan

Build these as one clickable prototype. Use one `screenIndex` and one in-memory answers object first. Do not add a routing library or backend until the visual flow is approved.

| Screen | Purpose | Layout and content | Primary action |
|---|---|---|---|
| 1. Welcome | Establish the product value | Indigo brand surface, original goal-journey illustration, short promise, no account message | Start with your goal |
| 2. How it works | Set expectations and trust | Three short steps: understand the goal, answer context questions, review evidence; privacy and education note | See how it works |
| 3. Goal | Identify the user's intention | Large selectable goal options such as home, education, retirement, or other; one selected state | Continue |
| 4. Target amount | Capture the destination | Large currency input with examples and plain-language helper text | Continue |
| 5. Deadline | Capture the time horizon | Native date input or year selector with a short explanation of time horizon | Continue |
| 6. Monthly amount | Capture investable cash flow | Currency input with optional frequency selector; do not imply affordability or a guaranteed outcome | Continue |
| 7. Existing savings | Understand the starting point | Currency input with a "prefer not to say" path and a clear reason for asking | Continue |
| 8. Liquidity | Protect near-term needs | Selectable answers for emergency access and near-term cash needs; include an education link | Continue |
| 9. Risk and loss capacity | Avoid unsuitable-looking results | Plain-language loss scenarios with explicit labels, no fear-based colour coding, and a "why we ask" explanation | Continue |
| 10. Review | Give control before screening | Summary of every answer, edit actions, no-profile-saved note, and disclaimer | Review research options |
| 11. Screening | Explain the wait | Short indigo transition with accessible status text and a clear list of checks being performed | Automatic transition |
| 12. Research shortlist | Show the first useful result | Three clearly marked synthetic fund cards with reason, category, evidence periods, source date, and demo label | View details |
| 13. Fund detail | Make evidence understandable | Fund identity, 3/5/10-year history, benchmark, consistency, volatility or drawdown, costs, risk, source, and methodology | Add to compare |
| 14. Compare | Support a considered decision | Side-by-side comparison of up to three synthetic funds, with no universal winner or guaranteed language | Start over or continue research |

### Screen-specific visual rhythm

- Screens 1 and 2 use the strongest indigo surfaces and original illustrations.
- Screens 3 to 9 use `brand-050` canvas, a `paper` content sheet, segmented progress, and large form controls.
- Screen 10 uses a calm review sheet with indigo section headings and compact edit links.
- Screen 11 may use a same-hue tonal transition, but must expose a text status and must not fake a real API delay.
- Screens 12 to 14 use quieter white and `brand-050` surfaces so evidence is easier to scan than the onboarding artwork.
- Use one visual illustration per major transition at most. Do not add decorative art to every form screen.

### Page-specific artwork

Never reuse one illustration across the whole flow. Each image must explain the
screen it belongs to and remain inside the indigo palette:

| Screen | Asset direction |
|---|---|
| Welcome | A goal journey or growing future |
| How it works | Three connected steps, from goal to evidence |
| Goal | A choice or marker that represents intention |
| Target amount | A measuring or destination metaphor |
| Deadline | Calendar, horizon, or time marker |
| Risk and loss capacity | A balanced path or protective boundary |
| Results | Calm data-led illustration, used sparingly |

Use original assets in `frontend/public/assets/`. Do not use the supplied
reference screenshots as page backgrounds or repeat a hero image just to fill
space. Illustrations should float directly on the indigo canvas with a soft
same-hue halo. Do not put them inside square cards, bordered tiles, or framed
panels unless a future screen has a specific information reason for it.

### Prototype interaction rules

- Back returns to the previous screen without clearing answers.
- Continue is disabled only when the current required answer is missing, with visible guidance explaining why.
- Review edit controls return to the correct screen and preserve all other answers.
- Screening uses local synthetic data and a short deterministic transition. It must be labelled as a demo.
- Results include empty, no-match, and error states even before a real API exists.
- The prototype has no saved profile, tracking, login, payment, or real fund recommendation.

## Monochromatic colour system

The brand hue is locked to indigo at `244deg`. Every brand token is a shade or tint of that hue.

| Token | Value | Use |
|---|---|---|
| `brand-950` | `hsl(244 55% 14%)` | Deep text, dark brand surface, pressed state |
| `brand-900` | `hsl(244 62% 24%)` | Strong text, dark cards, focus outline |
| `brand-800` | `hsl(244 70% 32%)` | High-emphasis control and hover state |
| `brand-700` | `hsl(244 78% 40%)` | Secondary action and selected outline |
| `brand-600` | `hsl(244 84% 50%)` | Primary CTA, progress fill, main brand block |
| `brand-500` | `hsl(244 86% 60%)` | Active transition and illustration detail |
| `brand-400` | `hsl(244 88% 70%)` | Soft illustration highlight |
| `brand-300` | `hsl(244 84% 80%)` | Focus halo and selected border |
| `brand-200` | `hsl(244 78% 89%)` | Progress track and input tint |
| `brand-100` | `hsl(244 70% 95%)` | Information panels and notice surfaces |
| `brand-050` | `hsl(244 55% 98%)` | App canvas and quiet surface tint |
| `paper` | `hsl(244 30% 99%)` | Main content surface and light text |
| `ink` | `hsl(244 45% 10%)` | Body copy and financial data |
| `muted` | `hsl(244 18% 42%)` | Supporting copy |
| `line` | `hsl(244 30% 86%)` | Borders and dividers |

### CSS token starter

```css
:root {
  --brand-950: hsl(244 55% 14%);
  --brand-900: hsl(244 62% 24%);
  --brand-800: hsl(244 70% 32%);
  --brand-700: hsl(244 78% 40%);
  --brand-600: hsl(244 84% 50%);
  --brand-500: hsl(244 86% 60%);
  --brand-400: hsl(244 88% 70%);
  --brand-300: hsl(244 84% 80%);
  --brand-200: hsl(244 78% 89%);
  --brand-100: hsl(244 70% 95%);
  --brand-050: hsl(244 55% 98%);
  --paper: hsl(244 30% 99%);
  --ink: hsl(244 45% 10%);
  --muted: hsl(244 18% 42%);
  --line: hsl(244 30% 86%);
}
```

## Colour usage rules

- Primary CTA: `brand-950` background with `brand-100` text. Hover: `brand-900`. Pressed: `brand-800`. Keep buttons inside the indigo scale; do not use white as a button fill.
- Disabled CTA: `brand-200` background with `brand-800` text. It must not look interactive.
- Canvas: `brand-050`. Content sheets: `paper`. Borders: `line`.
- Main text: `ink`. Supporting text: `muted`. Never use muted text for essential instructions, amounts, or warnings.
- A gradient is allowed only within the indigo family, for example `brand-700` to `brand-400`. Do not use multi-colour gradients or gradient text.
- Do not introduce separate green, red, orange, purple, or blue status colours. Use the indigo scale with explicit labels, icons, and supporting text for success, warning, and error states.
- Colour never communicates fund quality, safety, or expected return by itself.

## Typography

- Display: a licensed condensed sans-serif for short onboarding headlines.
- Body: a readable sans-serif for explanations, labels, and legal text.
- Financial data: readable sans-serif with tabular numerals where available.
- Headlines should state one clear question or decision. Avoid decorative all-caps for long explanations.
- Keep essential copy short. Explain methodology and risk in plain language.

## Components

### Buttons

- One primary action per screen.
- Minimum touch target: `44px`.
- Use visible `:focus-visible` rings with `brand-900` or `brand-300` against the current surface.
- Button labels must remain on one line at common mobile widths.

### Forms

- Use visible labels, not placeholder-only labels.
- Input border: `line`; focused border: `brand-700`; focused ring: `brand-300`.
- Preserve entered values and show validation text next to the field.
- “Why we ask” links should be available for savings, liquidity, risk, and loss-capacity questions.

### Progress

- Use a segmented progress indicator for onboarding.
- Filled segment: `brand-600`; unfilled segment: `brand-200`.
- Include a text alternative such as “Question 2 of 6” for screen readers.

### Fund results

- Use white or `brand-050` surfaces with indigo hierarchy, not colour-coded performance cards.
- Show return period, benchmark, consistency, volatility or drawdown, expense ratio, source date, and methodology link together.
- Never imply that the highest historical return is automatically the best choice.

## Shape, spacing, and motion

- Use one radius scale: `12px` for controls, `20px` for sheets, `28px` for major brand surfaces.
- Use an 8px spacing base, with larger vertical gaps between questions and sections.
- Use short slide/fade transitions for question changes and restrained feedback after actions.
- Honour `prefers-reduced-motion`; reduced motion must still preserve context and focus.
- Respect mobile safe areas and keep the primary action above the device home indicator.

## Accessibility checks

- Test every foreground/background pair for WCAG AA before implementation is considered complete.
- Do not rely on colour, illustration, position, or shape alone to communicate meaning.
- Support keyboard navigation, visible focus, screen-reader labels, zoom, and reduced motion.
- Test both light and dark system preferences if dark mode is implemented. Keep the same indigo hue family in both modes.

## Implementation rule

This file is the colour and visual source of truth. If a new component needs a colour not listed here, first ask whether an existing indigo shade or tint can express the state. Add a new colour only after a documented accessibility and product-meaning review.
