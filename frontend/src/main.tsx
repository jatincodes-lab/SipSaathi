import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

type Answers = {
  goal: string;
  targetAmount: string;
  deadline: string;
  monthlyAmount: string;
  savings: string;
  liquidity: string;
  risk: string;
};

type DemoPlan = {
  label: string;
  name: string;
  category: string;
  risk: string;
  horizon: string;
  reason: string;
  evidence: string;
  lowerReturn: number;
  baseReturn: number;
  higherReturn: number;
  volatility: string;
};

const demoPlans: DemoPlan[] = [
  {
    label: "Balanced Advantage",
    name: "Flexi-Cap & Hybrid Balance",
    category: "Hybrid · Moderate allocation",
    risk: "Moderate",
    horizon: "7–10 Yrs",
    reason: "Balances growth exposure with a steadier allocation for longer goals.",
    evidence: "3Y · 5Y · 10Y evidence",
    lowerReturn: 0.07,
    baseReturn: 0.1,
    higherReturn: 0.12,
    volatility: "Moderate movement",
  },
  {
    label: "Equity Diversified",
    name: "Large & Mid-Cap Disciplined Growth",
    category: "Equity · Higher volatility",
    risk: "Moderately high",
    horizon: "10+ Yrs",
    reason: "Adds more growth exposure for a long horizon, with larger possible swings.",
    evidence: "5Y · 10Y evidence",
    lowerReturn: 0.08,
    baseReturn: 0.11,
    higherReturn: 0.14,
    volatility: "Higher movement",
  },
  {
    label: "Passive Index Combo",
    name: "Index Nifty 50 + Target Debt SIP",
    category: "Index · Broad market",
    risk: "Low to moderate",
    horizon: "8–12 Yrs",
    reason: "Uses a broad-market reference and a debt allocation to show a lower-cost trade-off.",
    evidence: "3Y · 5Y evidence",
    lowerReturn: 0.06,
    baseReturn: 0.09,
    higherReturn: 0.11,
    volatility: "Lower movement",
  },
  {
    label: "Multi-Asset Allocation",
    name: "Conservative Capital Accumulator",
    category: "Multi-asset · Defensive mix",
    risk: "Conservative",
    horizon: "5–10 Yrs",
    reason: "Combines different asset types to illustrate a more defensive path.",
    evidence: "3Y · 5Y evidence",
    lowerReturn: 0.05,
    baseReturn: 0.08,
    higherReturn: 0.1,
    volatility: "Lower movement",
  },
];

type ProjectionPoint = {
  label: string;
  invested: number;
  value: number;
};

function buildProjection(monthly: number, stepUp: number, cadence: string, years: number, annualReturn: number) {
  const cadenceMonths = cadence === "Monthly" ? 1 : cadence === "Quarterly" ? 3 : 12;
  const points: ProjectionPoint[] = [];
  let contribution = monthly;
  let invested = 0;
  let value = 0;
  const monthlyReturn = Math.pow(1 + annualReturn, 1 / 12) - 1;

  for (let month = 1; month <= years * 12; month += 1) {
    if (month > 1 && (month - 1) % cadenceMonths === 0) contribution *= 1 + stepUp;
    invested += contribution;
    value = (value + contribution) * (1 + monthlyReturn);
    if (month === 12 || month % 12 === 0 || month === years * 12) {
      points.push({ label: `${Math.ceil(month / 12)}Y`, invested, value });
    }
  }

  return points;
}

function yearsUntil(deadline: string) {
  if (!deadline) return 10;
  const years = (new Date(`${deadline}T00:00:00`).getTime() - Date.now()) / (365.25 * 24 * 60 * 60 * 1000);
  return Math.max(1, Math.min(30, Math.ceil(years)));
}

function compactCurrency(value: number) {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${Math.round(value / 1000)}k`;
  return formatCurrency(value);
}

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function formatCurrency(value: number) {
  return currencyFormatter.format(Math.max(0, Math.round(value)));
}

function formatDeadline(value: string) {
  if (!value) return "June 2035";
  return new Intl.DateTimeFormat("en-IN", { month: "long", year: "numeric" }).format(
    new Date(`${value}T00:00:00`),
  );
}

function App() {
  const [screen, setScreen] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16>(1);
  const [answers, setAnswers] = useState<Answers>({
    goal: "",
    targetAmount: "",
    deadline: "",
    monthlyAmount: "",
    savings: "",
    liquidity: "",
    risk: "",
  });
  const [selectedFund, setSelectedFund] = useState("SIP Saathi Balanced Growth");
  const [selectedPlans, setSelectedPlans] = useState([demoPlans[0].name, demoPlans[1].name]);

  function updateAnswer(key: keyof Answers, value: string) {
    setAnswers((current) => ({ ...current, [key]: value }));
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    const frame = window.requestAnimationFrame(() => {
      document.querySelector<HTMLElement>("[data-screen-title]")?.focus();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [screen]);

  if (screen === 2) {
    return (
      <HowItWorksScreen
        onBack={() => setScreen(1)}
        onNext={() => setScreen(3)}
      />
    );
  }

  if (screen === 3) {
    return (
      <GoalScreen
        goal={answers.goal}
        onGoalChange={(value) => updateAnswer("goal", value)}
        onBack={() => setScreen(2)}
        onNext={() => setScreen(4)}
      />
    );
  }

  if (screen === 4) {
    return (
      <TargetAmountScreen
        target={answers.targetAmount}
        onTargetChange={(value) => updateAnswer("targetAmount", value)}
        onBack={() => setScreen(3)}
        onNext={() => setScreen(5)}
      />
    );
  }

  if (screen === 5) {
    return (
      <DeadlineScreen
        deadline={answers.deadline}
        onDeadlineChange={(value) => updateAnswer("deadline", value)}
        onBack={() => setScreen(4)}
        onNext={() => setScreen(6)}
      />
    );
  }

  if (screen === 6) {
    return (
      <MonthlyAmountScreen
        monthlyAmount={answers.monthlyAmount}
        onMonthlyAmountChange={(value) => updateAnswer("monthlyAmount", value)}
        onBack={() => setScreen(5)}
        onNext={() => setScreen(7)}
      />
    );
  }

  if (screen === 7) {
    return (
      <ExistingSavingsScreen
        savings={answers.savings}
        onSavingsChange={(value) => updateAnswer("savings", value)}
        onBack={() => setScreen(6)}
        onNext={() => setScreen(8)}
      />
    );
  }

  if (screen === 8) {
    return (
      <LiquidityScreen
        liquidity={answers.liquidity}
        onLiquidityChange={(value) => updateAnswer("liquidity", value)}
        onBack={() => setScreen(7)}
        onNext={() => setScreen(9)}
      />
    );
  }

  if (screen === 9) {
    return (
      <RiskScreen
        risk={answers.risk}
        onRiskChange={(value) => updateAnswer("risk", value)}
        onBack={() => setScreen(8)}
        onNext={() => setScreen(10)}
      />
    );
  }

  if (screen === 10) {
    return <ReviewScreen answers={answers} onBack={() => setScreen(9)} onNext={() => setScreen(11)} />;
  }

  if (screen === 11) {
    return <ScreeningScreen onNext={() => setScreen(12)} />;
  }

  if (screen === 12) {
    return (
      <DashboardScreen
        answers={answers}
        onOpenPlans={() => setScreen(13)}
        onEditGoal={() => setScreen(3)}
      />
    );
  }

  if (screen === 13) {
    return (
      <ResearchShortlistScreen
        onBack={() => setScreen(12)}
        onCompare={(fundNames) => {
          setSelectedPlans(fundNames);
          setScreen(16);
        }}
        onViewDetails={(fundName) => {
          setSelectedFund(fundName);
          setScreen(14);
        }}
      />
    );
  }

  if (screen === 14) {
    return (
      <FundDetailScreen
        fundName={selectedFund}
        onBack={() => setScreen(13)}
        onViewProjection={() => setScreen(15)}
        onCompare={() => {
          setSelectedPlans([selectedFund, demoPlans.find((plan) => plan.name !== selectedFund)?.name || demoPlans[0].name]);
          setScreen(16);
        }}
      />
    );
  }

  if (screen === 15) {
    return (
      <ProjectionScreen
        fundName={selectedFund}
        answers={answers}
        onBack={() => setScreen(14)}
        onCompare={() => {
          setSelectedPlans([selectedFund, demoPlans.find((plan) => plan.name !== selectedFund)?.name || demoPlans[0].name]);
          setScreen(16);
        }}
      />
    );
  }

  if (screen === 16) {
    return <CompareScreen planNames={selectedPlans} answers={answers} onBack={() => setScreen(13)} />;
  }

  return (
    <main className="welcome-screen">
      <div className="welcome-screen__glow" aria-hidden="true" />

      <header className="topbar">
        <a className="wordmark" href="/" aria-label="SIP Saathi home">
          <span className="wordmark__mark" aria-hidden="true">
            <span />
            <span />
          </span>
          <span>SIP Saathi</span>
        </a>
        <p className="topbar__note">Research, made clearer</p>
      </header>

      <section className="welcome-content" aria-labelledby="welcome-title">
        <div className="welcome-copy">
          <p className="eyebrow">Goal-based fund research</p>
          <h1 id="welcome-title" data-screen-title tabIndex={-1}>Invest toward something real.</h1>
          <p className="welcome-copy__body">
            Tell us what you are planning for. We will help you research funds
            using clear, long-term evidence.
          </p>
          <div className="welcome-copy__actions">
            <button
              className="primary-button"
              type="button"
              onClick={() => setScreen(2)}
            >
              Start with your goal
              <span aria-hidden="true">↗</span>
            </button>
            <p className="action-note">No account required to explore.</p>
          </div>
        </div>

        <div className="welcome-art" aria-hidden="true">
          <div className="welcome-art__halo" />
          <img
            src="/assets/goal-journey.png"
            alt=""
            width="716"
            height="716"
          />
        </div>
      </section>

      <footer className="footer-note">
        <span>01</span>
        <span className="footer-note__line" />
        <span>Start with a goal, not a product.</span>
      </footer>
    </main>
  );
}

function HowItWorksScreen({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <main className="info-screen">
      <header className="topbar info-screen__topbar">
        <button className="back-button" type="button" onClick={onBack}>
          <span aria-hidden="true">←</span>
          Back
        </button>
        <span className="info-screen__progress">02 / 14</span>
      </header>

      <section className="info-card" aria-labelledby="how-it-works-title">
        <div className="info-card__copy">
          <p className="eyebrow info-card__eyebrow">A clearer starting point</p>
          <h1 id="how-it-works-title" data-screen-title tabIndex={-1}>Your goal comes first.</h1>
          <p className="info-card__intro">
            A few honest answers help us organise the research around what you
            are trying to do.
          </p>

          <ol className="step-list">
            <li className="step">
              <span className="step__number">01</span>
              <span>
                <strong>Start with the plan</strong>
                <small>Tell us what you are saving for and when you need it.</small>
              </span>
            </li>
            <li className="step">
              <span className="step__number">02</span>
              <span>
                <strong>Add your context</strong>
                <small>Share what you can invest and how much loss you can handle.</small>
              </span>
            </li>
            <li className="step">
              <span className="step__number">03</span>
              <span>
                <strong>Review the evidence</strong>
                <small>Compare funds using long-term performance, risk, and costs.</small>
              </span>
            </li>
          </ol>

          <p className="privacy-note">
            Your answers stay in this session during the prototype. SIP Saathi
            is for research and education, not a guaranteed recommendation.
          </p>

          <button className="primary-button info-card__button" type="button" onClick={onNext}>
            Let&apos;s set your goal
            <span aria-hidden="true">↗</span>
          </button>
        </div>

        <div className="info-card__visual" aria-hidden="true">
          <div className="visual-stamp">GOAL FIRST</div>
          <img src="/assets/how-it-works.png" alt="" width="716" height="716" />
          <div className="visual-caption">
            <span>01</span>
            <span>Understand before you invest.</span>
          </div>
        </div>
      </section>
    </main>
  );
}

function GoalScreen({
  goal,
  onGoalChange,
  onBack,
  onNext,
}: {
  goal: string;
  onGoalChange: (goal: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const [notice, setNotice] = useState("");
  const goals = [
    { value: "home", label: "Buy a home", note: "A place of your own" },
    { value: "education", label: "Education", note: "For you or your family" },
    { value: "retirement", label: "Retirement", note: "Build future freedom" },
    { value: "other", label: "Something else", note: "Tell us in your own way" },
  ];

  function continueFromGoal() {
    if (!goal) {
      setNotice("Choose a goal to continue.");
      return;
    }
    onNext();
  }

  return (
    <main className="goal-screen">
      <header className="topbar goal-screen__topbar">
        <button className="back-button" type="button" onClick={onBack}>
          Back
        </button>
        <span className="info-screen__progress">03 / 14</span>
      </header>

      <section className="goal-content" aria-labelledby="goal-title">
        <div className="goal-heading">
          <p className="eyebrow">Your first filter</p>
          <h1 id="goal-title" data-screen-title tabIndex={-1}>What are you investing toward?</h1>
          <p>The right research starts with the reason behind the money.</p>
        </div>

        <div className="goal-options" role="group" aria-label="Investment goals">
          {goals.map((item) => (
            <button
              className={`goal-option${goal === item.value ? " goal-option--selected" : ""}`}
              key={item.value}
              type="button"
              aria-pressed={goal === item.value}
              onClick={() => {
                onGoalChange(item.value);
                setNotice("");
              }}
            >
              <span className="goal-option__mark" aria-hidden="true" />
              <span>
                <strong>{item.label}</strong>
                <small>{item.note}</small>
              </span>
              <span className="goal-option__check" aria-hidden="true">
                {goal === item.value ? "Selected" : ""}
              </span>
            </button>
          ))}
        </div>

        <div className="goal-actions">
          <button
            className="primary-button"
            type="button"
            disabled={!goal}
            onClick={continueFromGoal}
          >
            Continue
          </button>
          <p className="action-note" role="status" aria-live="polite">
            {notice || "You can change this later."}
          </p>
        </div>
      </section>
    </main>
  );
}

function TargetAmountScreen({
  target,
  onTargetChange,
  onBack,
  onNext,
}: {
  target: string;
  onTargetChange: (target: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const [notice, setNotice] = useState("");
  const hasValidTarget = Number(target) > 0;

  function continueFromTarget() {
    if (!hasValidTarget) return;
    onNext();
  }

  return (
    <main className="target-screen">
      <header className="topbar target-screen__topbar">
        <button className="back-button" type="button" onClick={onBack}>
          Back
        </button>
        <span className="info-screen__progress">04 / 14</span>
      </header>

      <section className="target-content" aria-labelledby="target-title">
        <div className="target-heading">
          <p className="eyebrow">The destination</p>
          <h1 id="target-title" data-screen-title tabIndex={-1}>How much will you need?</h1>
          <p>Give us a rough target. It can change as your plan becomes clearer.</p>
        </div>

        <div className="target-form">
          <label htmlFor="target-amount">Target amount</label>
          <div className={`amount-field${hasValidTarget ? " amount-field--active" : ""}`}>
            <span aria-hidden="true">₹</span>
            <input
              id="target-amount"
              name="targetAmount"
              type="number"
              inputMode="decimal"
              min="1"
              step="1000"
              placeholder="10,00,000"
              value={target}
              onChange={(event) => {
                onTargetChange(event.target.value);
                setNotice("");
              }}
              aria-describedby="target-help"
            />
          </div>
          <p id="target-help" className="target-help">
            An estimate is enough for now. We are using this to understand the shape of your goal.
          </p>
          <details className="why-ask">
            <summary>Why we ask</summary>
            <p>Your target helps us explain what the time horizon and monthly amount may need to support.</p>
          </details>
        </div>

        <div className="target-actions">
          <button
            className="primary-button"
            type="button"
            disabled={!hasValidTarget}
            onClick={continueFromTarget}
          >
            Continue
          </button>
          <p className="action-note" role="status" aria-live="polite">
            {notice || "You can edit this later."}
          </p>
        </div>
      </section>
    </main>
  );
}

function DeadlineScreen({
  deadline,
  onDeadlineChange,
  onBack,
  onNext,
}: {
  deadline: string;
  onDeadlineChange: (deadline: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const [notice, setNotice] = useState("");

  function continueFromDeadline() {
    if (!deadline) return;
    onNext();
  }

  return (
    <main className="deadline-screen">
      <header className="topbar deadline-screen__topbar">
        <button className="back-button" type="button" onClick={onBack}>
          Back
        </button>
        <span className="info-screen__progress">05 / 14</span>
      </header>

      <section className="deadline-content" aria-labelledby="deadline-title">
        <div className="deadline-copy">
          <p className="eyebrow">The time horizon</p>
          <h1 id="deadline-title" data-screen-title tabIndex={-1}>When will you need this money?</h1>
          <p>
            A longer runway changes the kind of evidence worth looking at. Pick
            the date you are planning around.
          </p>

          <div className="date-form">
            <label htmlFor="deadline-date">Target date</label>
            <input
              id="deadline-date"
              name="deadline"
              type="date"
              value={deadline}
              min={new Date().toISOString().slice(0, 10)}
              onChange={(event) => {
                onDeadlineChange(event.target.value);
                setNotice("");
              }}
              aria-describedby="deadline-help"
            />
            <p id="deadline-help">
              This is a planning date, not a promise that a fund will reach a
              particular amount by then.
            </p>
          </div>

          <details className="why-ask deadline-why-ask">
            <summary>Why we ask</summary>
            <p>
              Time horizon helps us compare performance over periods that match
              the way you may use the money.
            </p>
          </details>

          <div className="deadline-actions">
            <button
              className="primary-button"
              type="button"
              disabled={!deadline}
              onClick={continueFromDeadline}
            >
              Continue
            </button>
            <p className="action-note" role="status" aria-live="polite">
              {notice || "You can edit this later."}
            </p>
          </div>
        </div>

        <div className="deadline-visual" aria-hidden="true">
          <div className="visual-stamp">TIME MATTERS</div>
          <img src="/assets/time-horizon.png" alt="" width="716" height="716" />
          <div className="visual-caption">
            <span>02</span>
            <span>Plan for the date, not the hype.</span>
          </div>
        </div>
      </section>
    </main>
  );
}

function MonthlyAmountScreen({
  monthlyAmount,
  onMonthlyAmountChange,
  onBack,
  onNext,
}: {
  monthlyAmount: string;
  onMonthlyAmountChange: (monthlyAmount: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const [notice, setNotice] = useState("");
  const hasValidAmount = Number(monthlyAmount) > 0;

  function continueFromMonthlyAmount() {
    if (!hasValidAmount) return;
    onNext();
  }

  return (
    <main className="monthly-screen">
      <header className="topbar monthly-screen__topbar">
        <button className="back-button" type="button" onClick={onBack}>
          Back
        </button>
        <span className="info-screen__progress">06 / 14</span>
      </header>

      <section className="monthly-content" aria-labelledby="monthly-title">
        <div className="monthly-copy">
          <p className="eyebrow">The monthly rhythm</p>
          <h1 id="monthly-title" data-screen-title tabIndex={-1}>How much can you invest each month?</h1>
          <p>
            Choose an amount that feels comfortable to keep up. Consistency
            matters more than stretching for a bigger number.
          </p>

          <div className="monthly-form">
            <label htmlFor="monthly-amount">Monthly amount</label>
            <div className={`amount-field${hasValidAmount ? " amount-field--active" : ""}`}>
              <span aria-hidden="true">₹</span>
              <input
                id="monthly-amount"
                name="monthlyAmount"
                type="number"
                inputMode="decimal"
                min="1"
                step="500"
                placeholder="10,000"
                value={monthlyAmount}
                onChange={(event) => {
                  onMonthlyAmountChange(event.target.value);
                  setNotice("");
                }}
                aria-describedby="monthly-help"
              />
            </div>
            <p id="monthly-help" className="monthly-help">
              This is a planning input. It is not a commitment or a promise of
              future returns.
            </p>
          </div>

          <details className="why-ask monthly-why-ask">
            <summary>Why we ask</summary>
            <p>
              Your monthly amount helps put the target and deadline into the
              same context when you review the research.
            </p>
          </details>

          <div className="monthly-actions">
            <button
              className="primary-button"
              type="button"
              disabled={!hasValidAmount}
              onClick={continueFromMonthlyAmount}
            >
              Continue
            </button>
            <p className="action-note" role="status" aria-live="polite">
              {notice || "You can edit this later."}
            </p>
          </div>
        </div>

        <div className="monthly-visual" aria-hidden="true">
          <div className="visual-stamp">KEEP IT COMFORTABLE</div>
          <img
            src="/assets/monthly-contribution.png"
            alt=""
            width="716"
            height="716"
          />
          <div className="visual-caption">
            <span>03</span>
            <span>Small steps can stay in motion.</span>
          </div>
        </div>
      </section>
    </main>
  );
}

function ExistingSavingsScreen({
  savings,
  onSavingsChange,
  onBack,
  onNext,
}: {
  savings: string;
  onSavingsChange: (savings: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const [choice, setChoice] = useState<"zero" | "prefer-not-to-say" | "amount" | "">("");
  const [notice, setNotice] = useState("");
  const hasValidAmount = choice === "amount" && Number(savings) > 0;
  const canContinue = choice === "zero" || choice === "prefer-not-to-say" || hasValidAmount;

  function continueFromSavings() {
    if (!canContinue) {
      setNotice("Enter an amount or choose an option to continue.");
      return;
    }
    onNext();
  }

  return (
    <main className="savings-screen">
      <header className="topbar savings-screen__topbar">
        <button className="back-button" type="button" onClick={onBack}>
          Back
        </button>
        <span className="info-screen__progress">07 / 14</span>
      </header>

      <section className="savings-content" aria-labelledby="savings-title">
        <div className="savings-copy">
          <p className="eyebrow">The starting point</p>
          <h1 id="savings-title" data-screen-title tabIndex={-1}>Have you already saved for this goal?</h1>
          <p>
            Knowing where you are starting helps keep the rest of the picture
            grounded.
          </p>

          <div className="savings-form">
            <label htmlFor="savings-amount">Existing savings</label>
            <div className={`amount-field${hasValidAmount ? " amount-field--active" : ""}`}>
              <span aria-hidden="true">₹</span>
              <input
                id="savings-amount"
                name="existingSavings"
                type="number"
                inputMode="decimal"
                min="1"
                step="1000"
                placeholder="0"
                value={savings}
                onFocus={() => setChoice("amount")}
                onChange={(event) => {
                  onSavingsChange(event.target.value);
                  setChoice("amount");
                  setNotice("");
                }}
                aria-describedby="savings-help"
              />
            </div>
            <p id="savings-help" className="savings-help">
              Include only money already set aside for this goal.
            </p>
          </div>

          <div className="savings-options" role="group" aria-label="Existing savings options">
            <button
              className={`choice-button${choice === "zero" ? " choice-button--selected" : ""}`}
              type="button"
              aria-pressed={choice === "zero"}
              onClick={() => {
                setChoice("zero");
                onSavingsChange("");
                setNotice("");
              }}
            >
              I&apos;m starting from zero
            </button>
            <button
              className={`choice-button${choice === "prefer-not-to-say" ? " choice-button--selected" : ""}`}
              type="button"
              aria-pressed={choice === "prefer-not-to-say"}
              onClick={() => {
                setChoice("prefer-not-to-say");
                onSavingsChange("");
                setNotice("");
              }}
            >
              Prefer not to say
            </button>
          </div>

          <details className="why-ask savings-why-ask">
            <summary>Why we ask</summary>
            <p>
              Existing savings changes how much of the goal may still need to
              be planned for. You can skip this question.
            </p>
          </details>

          <div className="savings-actions">
            <button
              className="primary-button"
              type="button"
              disabled={!canContinue}
              onClick={continueFromSavings}
            >
              Continue
            </button>
            <p className="action-note" role="status" aria-live="polite">
              {notice || "You can edit this later."}
            </p>
          </div>
        </div>

        <div className="savings-visual" aria-hidden="true">
          <div className="visual-stamp">START WHERE YOU ARE</div>
          <img src="/assets/starting-savings.png" alt="" width="716" height="716" />
          <div className="visual-caption">
            <span>04</span>
            <span>Every plan has a starting point.</span>
          </div>
        </div>
      </section>
    </main>
  );
}

function LiquidityScreen({
  liquidity,
  onLiquidityChange,
  onBack,
  onNext,
}: {
  liquidity: string;
  onLiquidityChange: (liquidity: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const [notice, setNotice] = useState("");
  const options = [
    {
      value: "soon",
      label: "I may need it soon",
      note: "I want easy access within the next year",
    },
    {
      value: "some",
      label: "I may need some of it",
      note: "Part of it may be needed before the goal date",
    },
    {
      value: "later",
      label: "I can leave it invested",
      note: "I have other savings for near-term needs",
    },
    {
      value: "unsure",
      label: "I am not sure yet",
      note: "Help me understand this trade-off",
    },
  ];

  function continueFromLiquidity() {
    if (!liquidity) {
      setNotice("Choose the option that feels closest.");
      return;
    }
    onNext();
  }

  return (
    <main className="liquidity-screen">
      <header className="topbar liquidity-screen__topbar">
        <button className="back-button" type="button" onClick={onBack}>
          Back
        </button>
        <span className="info-screen__progress">08 / 14</span>
      </header>

      <section className="liquidity-content" aria-labelledby="liquidity-title">
        <div className="liquidity-copy">
          <p className="eyebrow">Keep a little room</p>
          <h1 id="liquidity-title" data-screen-title tabIndex={-1}>Might you need this money sooner?</h1>
          <p>
            Money needed soon should be treated differently from money that can
            stay invested for the long term.
          </p>

          <div className="liquidity-options" role="group" aria-label="Liquidity needs">
            {options.map((item) => (
              <button
                className={`liquidity-option${liquidity === item.value ? " liquidity-option--selected" : ""}`}
                key={item.value}
                type="button"
                aria-pressed={liquidity === item.value}
                onClick={() => {
                  onLiquidityChange(item.value);
                  setNotice("");
                }}
              >
                <span className="liquidity-option__mark" aria-hidden="true" />
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.note}</small>
                </span>
                <span className="liquidity-option__check" aria-hidden="true">
                  {liquidity === item.value ? "Selected" : ""}
                </span>
              </button>
            ))}
          </div>

          <details className="why-ask liquidity-why-ask">
            <summary>Why we ask</summary>
            <p>
              It is useful to separate emergency or near-term money from a
              long-term goal. This answer helps us explain that difference.
            </p>
          </details>

          <div className="liquidity-actions">
            <button
              className="primary-button"
              type="button"
              disabled={!liquidity}
              onClick={continueFromLiquidity}
            >
              Continue
            </button>
            <p className="action-note" role="status" aria-live="polite">
              {notice || "You can edit this later."}
            </p>
          </div>
        </div>

        <div className="liquidity-visual" aria-hidden="true">
          <img src="/assets/liquidity-access.png" alt="" width="716" height="716" />
        </div>
      </section>
    </main>
  );
}

function RiskScreen({
  risk,
  onRiskChange,
  onBack,
  onNext,
}: {
  risk: string;
  onRiskChange: (risk: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const [notice, setNotice] = useState("");
  const options = [
    {
      value: "protect",
      label: "I would want to protect it",
      note: "A temporary loss would make me uncomfortable",
    },
    {
      value: "wait",
      label: "I could wait it out",
      note: "I understand values can move up and down",
    },
    {
      value: "long-term",
      label: "I am focused on the long term",
      note: "I can stay invested through bigger swings",
    },
    {
      value: "unsure",
      label: "I am not sure yet",
      note: "Show me what the trade-off means",
    },
  ];

  function continueFromRisk() {
    if (!risk) {
      setNotice("Choose the answer that feels closest.");
      return;
    }
    onNext();
  }

  return (
    <main className="risk-screen">
      <header className="topbar risk-screen__topbar">
        <button className="back-button" type="button" onClick={onBack}>
          Back
        </button>
        <span className="info-screen__progress">09 / 14</span>
      </header>

      <section className="risk-content" aria-labelledby="risk-title">
        <div className="risk-copy">
          <p className="eyebrow">The uncomfortable question</p>
          <h1 id="risk-title" data-screen-title tabIndex={-1}>What would you do if this temporarily lost value?</h1>
          <p>
            Markets move. This helps us show research that matches how much
            uncertainty you can realistically sit with.
          </p>

          <div className="risk-options" role="group" aria-label="Loss capacity options">
            {options.map((item) => (
              <button
                className={`risk-option${risk === item.value ? " risk-option--selected" : ""}`}
                key={item.value}
                type="button"
                aria-pressed={risk === item.value}
                onClick={() => {
                  onRiskChange(item.value);
                  setNotice("");
                }}
              >
                <span className="risk-option__mark" aria-hidden="true" />
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.note}</small>
                </span>
                <span className="risk-option__check" aria-hidden="true">
                  {risk === item.value ? "Selected" : ""}
                </span>
              </button>
            ))}
          </div>

          <details className="why-ask risk-why-ask">
            <summary>Why we ask</summary>
            <p>
              Historical returns do not arrive in a straight line. This answer
              helps us explain risk and loss clearly alongside performance.
            </p>
          </details>

          <div className="risk-actions">
            <button
              className="primary-button"
              type="button"
              disabled={!risk}
              onClick={continueFromRisk}
            >
              Continue
            </button>
            <p className="action-note" role="status" aria-live="polite">
              {notice || "There is no right answer."}
            </p>
          </div>
        </div>

        <div className="risk-visual" aria-hidden="true">
          <img src="/assets/risk-balance.png" alt="" width="716" height="716" />
        </div>
      </section>
    </main>
  );
}

function ReviewScreen({
  answers: userAnswers,
  onBack,
  onNext,
}: {
  answers: Answers;
  onBack: () => void;
  onNext: () => void;
}) {
  const [notice, setNotice] = useState("");
  const goalLabel =
    userAnswers.goal === "home"
      ? "Buy a home"
      : userAnswers.goal === "education"
        ? "Education"
        : userAnswers.goal === "retirement"
          ? "Retirement"
          : userAnswers.goal === "other"
            ? "Something else"
            : "Your selected goal";
  const answers = [
    ["Goal", goalLabel],
    ["Target amount", "₹10,00,000"],
    ["Target date", "June 2035"],
    ["Monthly amount", "₹10,000"],
    ["Existing savings", "₹1,50,000"],
    ["Liquidity", "I can leave it invested"],
    ["Loss capacity", "I could wait it out"],
  ];

  return (
    <main className="review-screen">
      <header className="topbar review-screen__topbar">
        <button className="back-button" type="button" onClick={onBack}>
          Back
        </button>
        <span className="info-screen__progress">10 / 14</span>
      </header>

      <section className="review-content" aria-labelledby="review-title">
        <div className="review-copy">
          <p className="eyebrow">A quick check</p>
          <h1 id="review-title" data-screen-title tabIndex={-1}>Does this look right?</h1>
          <p>
            Take a moment to check the context before we prepare the research
            view.
          </p>

          <div className="review-list" aria-label="Your answers">
            {answers.map(([label, value]) => (
              <div className="review-row" key={label}>
                <span>
                  <small>{label}</small>
                  <strong>{value}</strong>
                </span>
                <button
                  className="edit-button"
                  type="button"
                  onClick={() => setNotice(`${label} can be edited from its question.`)}
                >
                  Edit
                </button>
              </div>
            ))}
          </div>

          <p className="review-demo-note">
            The values shown here are prototype examples until all answers are
            connected to shared session state.
          </p>

          <p className="review-disclaimer">
            Your answers are used for this session only. The next view is
            research and education, not a guaranteed recommendation.
          </p>

          <div className="review-actions">
            <button className="primary-button" type="button" onClick={onNext}>
              Show my research options
            </button>
            <p className="action-note" role="status" aria-live="polite">
              {notice || "You can still go back and change something."}
            </p>
          </div>
        </div>

        <div className="review-visual" aria-hidden="true">
          <img src="/assets/review-answers.png" alt="" width="716" height="716" />
        </div>
      </section>
    </main>
  );
}

function ScreeningScreen({ onNext }: { onNext: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onNext, 900);
    return () => window.clearTimeout(timer);
  }, [onNext]);

  return (
    <main className="screening-screen" aria-busy="true">
      <header className="topbar screening-screen__topbar">
        <span className="wordmark">
          <span className="wordmark__mark" aria-hidden="true">
            <span />
            <span />
          </span>
          <span>SIP Saathi</span>
        </span>
        <span className="info-screen__progress">11 / 14</span>
      </header>

      <section className="screening-content" aria-labelledby="screening-title">
        <p className="eyebrow">A clear path to the shortlist</p>
        <h1 id="screening-title" data-screen-title tabIndex={-1}>Preparing your research.</h1>
        <p className="screening-intro">
          We are organising the results around your goal, time horizon, and
          comfort with risk.
        </p>
        <ul className="screening-checks" aria-label="Research checks">
          <li><span aria-hidden="true">01</span>Matching the goal and time horizon</li>
          <li><span aria-hidden="true">02</span>Checking long-term evidence and consistency</li>
          <li><span aria-hidden="true">03</span>Showing costs, risks, and source dates</li>
        </ul>
        <p className="screening-status" role="status">Using synthetic demo data for this prototype.</p>
      </section>
    </main>
  );
}

function DashboardScreen({
  answers,
  onOpenPlans,
  onEditGoal,
}: {
  answers: Answers;
  onOpenPlans: () => void;
  onEditGoal: () => void;
}) {
  const goalLabel =
    answers.goal === "home"
      ? "Buy a home"
      : answers.goal === "education"
        ? "Education"
        : answers.goal === "retirement"
          ? "Retirement"
          : answers.goal === "other"
            ? "Something else"
            : "Your goal";
  const target = Number(answers.targetAmount) || 1000000;
  const savings = Number(answers.savings) || 0;
  const monthly = Number(answers.monthlyAmount) || 4000;
  const remaining = Math.max(target - savings, 0);
  const progress = Math.min((savings / target) * 100, 100);
  const liquidityLabel =
    answers.liquidity === "soon"
      ? "Near-term access"
      : answers.liquidity === "some"
        ? "Some access"
        : answers.liquidity === "later"
          ? "Long-term"
          : "Still exploring";
  const riskLabel =
    answers.risk === "protect"
      ? "Protect first"
      : answers.risk === "wait"
        ? "Could wait out swings"
        : answers.risk === "long-term"
          ? "Long-term focus"
          : "Still exploring";
  const plans = [
    ["Balanced Advantage", "Flexi-Cap & Hybrid Balance", "Moderate", "7–10 Yrs"],
    ["Equity Diversified", "Large & Mid-Cap Disciplined Growth", "Mod-High", "10+ Yrs"],
    ["Passive Index Combo", "Index Nifty 50 + Target Debt SIP", "Low-Mod", "8–12 Yrs"],
    ["Multi-Asset Allocation", "Conservative Capital Accumulator", "Conservative", "5–10 Yrs"],
  ];

  return (
    <main className="dashboard-screen">
      <header className="app-header">
        <a className="wordmark app-header__wordmark" href="/" aria-label="SIP Saathi home">
          <span className="wordmark__mark" aria-hidden="true">
            <span />
            <span />
          </span>
          <span>SIP Saathi</span>
        </a>
        <div className="app-header__controls">
          <button className="goal-chip" type="button" onClick={onEditGoal}>
            <span aria-hidden="true">◎</span>
            {goalLabel} · {formatDeadline(answers.deadline).split(" ").at(-1)}
          </button>
          <button className="profile-button" type="button" aria-label="Open profile">
            <span aria-hidden="true">•</span>
          </button>
        </div>
      </header>

      <section className="dashboard-content" aria-labelledby="dashboard-title">
        <div className="dashboard-heading">
          <p className="dashboard-kicker">Primary goal path</p>
          <h1 id="dashboard-title" data-screen-title tabIndex={-1}>Your {goalLabel.toLowerCase()}.</h1>
          <p>One calm place to understand the goal, the SIP plan, and the trade-offs.</p>
        </div>

        <section className="goal-summary-card" aria-label="Goal summary">
          <div className="goal-summary-card__topline">
            <span>Target corpus</span>
            <span className="funded-badge">{Math.round(progress)}% funded</span>
          </div>
          <strong>{formatCurrency(target)}</strong>
          <p>Target: {formatDeadline(answers.deadline)} · Long-term planning horizon</p>
          <div className="goal-progress" aria-label={`${Math.round(progress)} percent funded`}>
            <span style={{ width: `${progress}%` }} />
          </div>
          <div className="goal-summary-card__stats">
            <span>Current savings<strong>{formatCurrency(savings)}</strong></span>
            <span>Still needed<strong>{formatCurrency(remaining)}</strong></span>
          </div>
          <div className="capacity-note">
            <span aria-hidden="true">↗</span>
            <span>Capacity: {formatCurrency(monthly)} / month · 5% quarterly step-up</span>
          </div>
        </section>

        <div className="dashboard-actions">
          <button className="secondary-action" type="button" onClick={onEditGoal}>Edit goal</button>
          <button className="secondary-action" type="button" onClick={onOpenPlans}>Goal health check</button>
          <button className="secondary-action" type="button" onClick={onOpenPlans}>Methodology</button>
        </div>

        <section className="sip-overview" aria-labelledby="sip-overview-title">
          <div className="section-heading-row">
            <div>
              <p className="dashboard-kicker">Your current plan</p>
              <h2 id="sip-overview-title">Planned SIP contribution</h2>
            </div>
            <button className="text-button" type="button" onClick={onOpenPlans}>Edit</button>
          </div>
          <div className="sip-overview__body">
            <div>
              <span>Monthly amount</span>
              <strong>{formatCurrency(monthly)}</strong>
            </div>
            <div>
              <span>Step-up rule</span>
              <strong>5% quarterly</strong>
            </div>
          </div>
          <p className="sip-overview__note">This is a planning amount, not an investment or payment instruction.</p>
        </section>

        <section className="research-section" aria-labelledby="research-title">
          <div className="section-heading-row">
            <div>
              <p className="dashboard-kicker">Research-based plans</p>
              <h2 id="research-title">Explore your options</h2>
            </div>
            <span className="section-count">4 options</span>
          </div>
          <p className="section-intro">Grouped around your {formatDeadline(answers.deadline).split(" ").at(-1)} goal timeline and your comfort with loss.</p>
          <div className="plan-preview-list">
            {plans.map(([type, name, risk, horizon]) => (
              <article className="plan-preview" key={name}>
                <div className="plan-preview__topline">
                  <span className="plan-type">{type}</span>
                  <span className="plan-icon" aria-hidden="true">↗</span>
                </div>
                <h3>{name}</h3>
                <div className="plan-preview__meta">
                  <span>Risk<strong>{risk}</strong></span>
                  <span>Horizon<strong>{horizon}</strong></span>
                  <span>Initial SIP<strong>{formatCurrency(monthly)}</strong></span>
                </div>
                <p>Compare evidence, cost, volatility, and liquidity before making a decision.</p>
                <button className="primary-button plan-preview__button" type="button" onClick={onOpenPlans}>
                  View projection <span aria-hidden="true">→</span>
                </button>
              </article>
            ))}
          </div>
        </section>

        <aside className="education-note">
          <strong>Educational research tool</strong>
          <span>Projections are illustrative. Mutual fund values can fall, and no return is guaranteed.</span>
        </aside>
      </section>

      <nav className="app-navigation" aria-label="App navigation">
        <button className="app-navigation__item app-navigation__item--active" type="button">
          <span aria-hidden="true">⌂</span>Dashboard
        </button>
        <button className="app-navigation__item" type="button" onClick={onOpenPlans}>
          <span aria-hidden="true">◇</span>Plans
        </button>
        <button className="app-navigation__item" type="button" disabled>
          <span aria-hidden="true">◈</span>Compare
        </button>
        <button className="app-navigation__item" type="button" disabled>
          <span aria-hidden="true">▤</span>Learn
        </button>
      </nav>
    </main>
  );
}

function FundDetailScreen({
  fundName,
  onBack,
  onViewProjection,
  onCompare,
}: {
  fundName: string;
  onBack: () => void;
  onViewProjection: () => void;
  onCompare: () => void;
}) {
  const metrics = [
    ["3-year", "11.8%", "Annualised return"],
    ["5-year", "13.2%", "Annualised return"],
    ["10-year", "12.6%", "Annualised return"],
    ["Volatility", "14.9%", "Annualised movement"],
    ["Max drawdown", "−18.4%", "Largest observed fall"],
    ["Expense ratio", "0.42%", "Illustrative cost"],
  ];

  return (
    <main className="detail-screen">
      <header className="topbar detail-screen__topbar">
        <button className="back-button" type="button" onClick={onBack}>
          Back
        </button>
        <span className="info-screen__progress">14 / 14</span>
      </header>

      <section className="detail-content" aria-labelledby="detail-title">
        <div className="detail-heading">
          <p className="eyebrow">Fund detail · Demo example</p>
          <h1 id="detail-title" data-screen-title tabIndex={-1}>{fundName}</h1>
          <p className="detail-category">Hybrid · Moderate allocation</p>
          <p>
            This view shows how evidence can be read together. The figures are
            synthetic and are not a prediction or recommendation.
          </p>
        </div>

        <div className="metric-grid" aria-label="Illustrative fund metrics">
          {metrics.map(([label, value, note]) => (
            <div className="metric" key={label}>
              <small>{label}</small>
              <strong>{value}</strong>
              <span>{note}</span>
            </div>
          ))}
        </div>

        <div className="detail-lower">
          <div>
            <h2>What to notice</h2>
            <p>
              Longer periods can add context, but they do not remove loss or
              change. Compare the full history, costs, category, and your own
              time horizon together.
            </p>
          </div>
          <div>
            <h2>Source and method</h2>
            <p>
              Synthetic dataset · as of Jun 2025 · illustrative methodology
              version 0.1
            </p>
          </div>
        </div>

        <div className="detail-actions">
          <button className="primary-button" type="button" onClick={onViewProjection}>
            View SIP projection
          </button>
          <button className="secondary-action" type="button" onClick={onCompare}>Compare plans</button>
          <p className="detail-disclaimer">
            Research and education only. Review official scheme documents before
            making any investment decision.
          </p>
        </div>
      </section>
    </main>
  );
}

function ResearchShortlistScreen({
  onBack,
  onCompare,
  onViewDetails,
}: {
  onBack: () => void;
  onCompare: (fundNames: string[]) => void;
  onViewDetails: (fundName: string) => void;
}) {
  const funds = [
    {
      name: "SIP Saathi Balanced Growth",
      category: "Hybrid · Moderate allocation",
      reason: "Included for its balanced exposure and longer evidence window.",
      evidence: "3Y · 5Y · 10Y evidence",
    },
    {
      name: "SIP Saathi Steady Index",
      category: "Index · Broad market",
      reason: "Included as a lower-cost reference for comparing broad-market exposure.",
      evidence: "3Y · 5Y evidence",
    },
    {
      name: "SIP Saathi Long View",
      category: "Equity · Higher volatility",
      reason: "Included to show the trade-off between longer horizons and larger swings.",
      evidence: "5Y · 10Y evidence",
    },
  ];
  const [compareSelection, setCompareSelection] = useState(demoPlans.slice(0, 2).map((fund) => fund.name));

  return (
    <main className="shortlist-screen">
      <header className="topbar shortlist-screen__topbar">
        <button className="back-button" type="button" onClick={onBack}>
          Back
        </button>
        <span className="info-screen__progress">13 / 14</span>
      </header>

      <section className="shortlist-content" aria-labelledby="shortlist-title">
        <div className="shortlist-heading">
          <p className="eyebrow">Your research shortlist</p>
          <h1 id="shortlist-title" data-screen-title tabIndex={-1}>Three ways to explore the trade-off.</h1>
          <p>
            These synthetic examples are grouped around your answers. They are
            here to help you compare evidence, not to tell you what to buy.
          </p>
        </div>

        <div className="shortlist-list">
          {demoPlans.map((fund, index) => (
            <article className="fund-card" key={fund.name}>
              <div className="fund-card__topline">
                <span className="fund-card__number">0{index + 1}</span>
                <span className="demo-badge">Demo example</span>
              </div>
              <h2>{fund.name}</h2>
              <p className="fund-card__category">{fund.category}</p>
              <p>{fund.reason}</p>
              <div className="fund-card__meta">
                <span>{fund.evidence}</span>
                <span>As of Jun 2025</span>
              </div>
              <button className="text-button" type="button" onClick={() => onViewDetails(fund.name)}>
                View evidence details
              </button>
              <label className="compare-toggle">
                <input
                  type="checkbox"
                  checked={compareSelection.includes(fund.name)}
                  onChange={(event) => {
                    if (event.target.checked && compareSelection.length < 2) {
                      setCompareSelection([...compareSelection, fund.name]);
                    } else if (!event.target.checked) {
                      setCompareSelection(compareSelection.filter((name) => name !== fund.name));
                    }
                  }}
                />
                Compare
              </label>
            </article>
          ))}
        </div>

        <div className="shortlist-compare-bar">
          <span>{compareSelection.length} of 2 plans selected</span>
          <button
            className="primary-button"
            type="button"
            disabled={compareSelection.length !== 2}
            onClick={() => onCompare(compareSelection)}
          >
            Compare plans
          </button>
        </div>

        <p className="shortlist-disclaimer">
          Research and education only. Fund names, performance, and dates on
          this screen are synthetic prototype examples.
        </p>
      </section>
    </main>
  );
}

type ProjectionSeries = {
  name: string;
  points: ProjectionPoint[];
  color: string;
};

function ProjectionGraph({ series, target }: { series: ProjectionSeries[]; target: number }) {
  const points = series[0]?.points || [];
  const values = series.flatMap((item) => item.points.flatMap((point) => [point.value, point.invested]));
  const maxValue = Math.max(target, ...values, 1);
  const x = (index: number) => 42 + (index / Math.max(points.length - 1, 1)) * 516;
  const y = (value: number) => 220 - (value / maxValue) * 180;
  const linePoints = (items: ProjectionPoint[], key: "invested" | "value") =>
    items.map((point, index) => `${x(index)},${y(point[key])}`).join(" ");

  return (
    <div className="projection-chart">
      <div className="projection-chart__legend">
        <span><i className="legend-dot legend-dot--invested" />Invested</span>
        {series.map((item) => <span key={item.name}><i className="legend-dot" style={{ background: item.color }} />{item.name}</span>)}
        <span><i className="legend-dot legend-dot--target" />Target</span>
      </div>
      <svg viewBox="0 0 600 260" role="img" aria-label="Illustrative SIP projection graph">
        {[0, 1, 2, 3].map((row) => {
          const value = maxValue * (row / 3);
          return (
            <g key={row}>
              <line x1="42" x2="558" y1={y(value)} y2={y(value)} stroke="hsl(244 30% 88%)" strokeDasharray="3 4" />
              <text x="34" y={y(value) + 4} textAnchor="end" fill="hsl(244 18% 42%)" fontSize="10">{compactCurrency(value)}</text>
            </g>
          );
        })}
        <line x1="42" x2="558" y1={y(target)} y2={y(target)} stroke="hsl(244 18% 42%)" strokeDasharray="6 5" />
        <text x="550" y={y(target) - 7} textAnchor="end" fill="hsl(244 18% 42%)" fontSize="10">Target {compactCurrency(target)}</text>
        <polyline points={linePoints(points, "invested")} fill="none" stroke="hsl(244 45% 10%)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
        {series.map((item) => (
          <g key={item.name}>
            <polyline points={linePoints(item.points, "value")} fill="none" stroke={item.color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
            {item.points.map((point, index) => (
              <circle key={`${item.name}-${point.label}`} cx={x(index)} cy={y(point.value)} r="4" fill="var(--paper)" stroke={item.color} strokeWidth="2" />
            ))}
          </g>
        ))}
        {points.map((point, index) => <text key={point.label} x={x(index)} y="246" textAnchor="middle" fill="hsl(244 18% 42%)" fontSize="10">{point.label}</text>)}
      </svg>
    </div>
  );
}

function ProjectionControls({
  monthly,
  onMonthlyChange,
  stepUp,
  onStepUpChange,
  cadence,
  onCadenceChange,
  scenario,
  onScenarioChange,
}: {
  monthly: number;
  onMonthlyChange: (value: number) => void;
  stepUp: number;
  onStepUpChange: (value: number) => void;
  cadence: string;
  onCadenceChange: (value: string) => void;
  scenario: string;
  onScenarioChange: (value: string) => void;
}) {
  return (
    <div className="projection-controls">
      <label>
        Monthly SIP
        <span className="currency-input"><span aria-hidden="true">₹</span><input type="number" min="500" step="500" value={monthly} onChange={(event) => onMonthlyChange(Number(event.target.value) || 0)} /></span>
      </label>
      <div className="control-group">
        <span>Step-up rate</span>
        <div className="control-options">
          {[3, 5, 10].map((value) => <button className={stepUp === value ? "control-option control-option--active" : "control-option"} key={value} type="button" onClick={() => onStepUpChange(value)}>{value}%</button>)}
        </div>
      </div>
      <div className="control-group">
        <span>Step-up cadence</span>
        <div className="control-options">
          {["Monthly", "Quarterly", "Yearly"].map((value) => <button className={cadence === value ? "control-option control-option--active" : "control-option"} key={value} type="button" onClick={() => onCadenceChange(value)}>{value}</button>)}
        </div>
      </div>
      <div className="control-group">
        <span>Illustrative return scenario</span>
        <div className="control-options control-options--scenarios">
          {["lower", "base", "higher"].map((value) => <button className={scenario === value ? "control-option control-option--active" : "control-option"} key={value} type="button" onClick={() => onScenarioChange(value)}>{value[0].toUpperCase() + value.slice(1)}</button>)}
        </div>
      </div>
    </div>
  );
}

function ProjectionScreen({
  fundName,
  answers,
  onBack,
  onCompare,
}: {
  fundName: string;
  answers: Answers;
  onBack: () => void;
  onCompare: () => void;
}) {
  const plan = demoPlans.find((item) => item.name === fundName) || demoPlans[0];
  const [monthly, setMonthly] = useState(Number(answers.monthlyAmount) || 4000);
  const [stepUp, setStepUp] = useState(5);
  const [cadence, setCadence] = useState("Quarterly");
  const [scenario, setScenario] = useState("base");
  const years = yearsUntil(answers.deadline);
  const rate = scenario === "lower" ? plan.lowerReturn : scenario === "higher" ? plan.higherReturn : plan.baseReturn;
  const points = buildProjection(monthly, stepUp / 100, cadence, years, rate);
  const target = Number(answers.targetAmount) || 1000000;
  const yearOne = points[0] || { invested: 0, value: 0 };
  const goalPoint = points[points.length - 1] || yearOne;
  const cadenceMonths = cadence === "Monthly" ? 1 : cadence === "Quarterly" ? 3 : 12;
  const contributionAtPoint = (pointIndex: number) => monthly * Math.pow(1 + stepUp / 100, Math.floor((pointIndex * 12) / cadenceMonths));

  return (
    <main className="projection-screen">
      <header className="app-header projection-screen__header">
        <button className="back-button" type="button" onClick={onBack}>Back</button>
        <span className="projection-header-title">SIP projection</span>
        <span className="projection-header-label">Illustrative</span>
      </header>
      <section className="projection-content" aria-labelledby="projection-title">
        <div className="projection-heading">
          <p className="dashboard-kicker">{plan.label} · {plan.risk} risk</p>
          <h1 id="projection-title" data-screen-title tabIndex={-1}>{plan.name}</h1>
          <p>See how contribution choices can change the path toward {formatDeadline(answers.deadline)}.</p>
        </div>
        <ProjectionControls monthly={monthly} onMonthlyChange={setMonthly} stepUp={stepUp} onStepUpChange={setStepUp} cadence={cadence} onCadenceChange={setCadence} scenario={scenario} onScenarioChange={setScenario} />
        <div className="projection-note">A {stepUp}% {cadence.toLowerCase()} step-up increases future contributions. Check the later monthly amounts before choosing a plan.</div>
        <section className="projection-card" aria-label="Illustrative projection">
          <div className="projection-card__headline"><span>Illustrative value at goal date</span><strong>{formatCurrency(goalPoint.value)}</strong></div>
          <div className="projection-card__subline"><span>{Math.round(rate * 100)}% scenario assumption · {years} year horizon</span><span>Target {formatCurrency(target)}</span></div>
          <ProjectionGraph series={[{ name: plan.label, points, color: "#3B32E9" }]} target={target} />
        </section>
        <div className="projection-summary-grid">
          <div><span>After one year</span><strong>{formatCurrency(yearOne.value)}</strong><small>{formatCurrency(yearOne.invested)} invested</small></div>
          <div><span>At goal date</span><strong>{formatCurrency(goalPoint.value)}</strong><small>{formatCurrency(goalPoint.invested)} invested</small></div>
        </div>
        <div className="projection-table-wrap">
          <div className="section-heading-row"><h2>Milestone view</h2><span className="section-count">Base calculation</span></div>
          <table className="projection-table"><thead><tr><th>Point</th><th>SIP</th><th>Invested</th><th>Illustrative value</th></tr></thead><tbody>{points.filter((_, index) => index === 0 || index === points.length - 1 || index % 2 === 0).map((point, index) => <tr key={point.label}><th>{point.label}</th><td>{formatCurrency(contributionAtPoint(index))}</td><td>{formatCurrency(point.invested)}</td><td>{formatCurrency(point.value)}</td></tr>)}</tbody></table>
        </div>
        <div className="projection-actions"><button className="primary-button" type="button" onClick={onCompare}>Compare with another plan</button><p>Research and education only. These values are illustrative, not guaranteed.</p></div>
      </section>
    </main>
  );
}

function CompareScreen({
  planNames,
  answers,
  onBack,
}: {
  planNames: string[];
  answers: Answers;
  onBack: () => void;
}) {
  const plans = planNames.map((name) => demoPlans.find((plan) => plan.name === name)).filter((plan): plan is DemoPlan => Boolean(plan)).slice(0, 2);
  const comparePlans = plans.length === 2 ? plans : demoPlans.slice(0, 2);
  const [monthly, setMonthly] = useState(Number(answers.monthlyAmount) || 4000);
  const [stepUp, setStepUp] = useState(5);
  const [cadence, setCadence] = useState("Quarterly");
  const [scenario, setScenario] = useState("base");
  const years = yearsUntil(answers.deadline);
  const target = Number(answers.targetAmount) || 1000000;
  const series = comparePlans.map((plan, index) => {
    const rate = scenario === "lower" ? plan.lowerReturn : scenario === "higher" ? plan.higherReturn : plan.baseReturn;
    return { plan, points: buildProjection(monthly, stepUp / 100, cadence, years, rate), rate, color: index === 0 ? "#3B32E9" : "#716CF0" };
  });

  return (
    <main className="compare-screen">
      <header className="app-header compare-screen__header"><button className="back-button" type="button" onClick={onBack}>Back</button><span className="projection-header-title">Compare plans</span><span className="projection-header-label">2 selected</span></header>
      <section className="compare-content" aria-labelledby="compare-title">
        <div className="projection-heading"><p className="dashboard-kicker">Same goal · different trade-offs</p><h1 id="compare-title" data-screen-title tabIndex={-1}>Two paths to compare.</h1><p>Keep the monthly plan the same and compare how risk and illustrative scenarios change the path.</p></div>
        <ProjectionControls monthly={monthly} onMonthlyChange={setMonthly} stepUp={stepUp} onStepUpChange={setStepUp} cadence={cadence} onCadenceChange={setCadence} scenario={scenario} onScenarioChange={setScenario} />
        <section className="projection-card compare-card" aria-label="Plan comparison graph"><div className="projection-card__headline"><span>Illustrative value at goal date</span><strong>{formatCurrency(series[0].points.at(-1)?.value || 0)} <small>vs {formatCurrency(series[1].points.at(-1)?.value || 0)}</small></strong></div><div className="projection-card__subline"><span>{scenario[0].toUpperCase() + scenario.slice(1)} scenario · {years} year horizon</span><span>Target {formatCurrency(target)}</span></div><ProjectionGraph series={series.map((item) => ({ name: item.plan.label, points: item.points, color: item.color }))} target={target} /></section>
        <div className="compare-plan-grid">{series.map((item) => <article className="compare-plan" key={item.plan.name}><div className="compare-plan__title"><span className="legend-dot" style={{ background: item.color }} /><h2>{item.plan.label}</h2></div><p>{item.plan.name}</p><dl><div><dt>Risk</dt><dd>{item.plan.risk}</dd></div><div><dt>Scenario</dt><dd>{Math.round(item.rate * 100)}%</dd></div><div><dt>Goal-date value</dt><dd>{formatCurrency(item.points.at(-1)?.value || 0)}</dd></div><div><dt>Movement</dt><dd>{item.plan.volatility}</dd></div></dl></article>)}</div>
        <section className="compare-table-wrap"><h2>Side-by-side details</h2><table className="compare-table"><tbody><tr><th>Monthly SIP</th>{series.map((item) => <td key={item.plan.name}>{formatCurrency(monthly)}</td>)}</tr><tr><th>Step-up</th>{series.map((item) => <td key={item.plan.name}>{stepUp}% {cadence.toLowerCase()}</td>)}</tr><tr><th>After one year</th>{series.map((item) => <td key={item.plan.name}>{formatCurrency(item.points[0]?.value || 0)}</td>)}</tr><tr><th>At goal date</th>{series.map((item) => <td key={item.plan.name}>{formatCurrency(item.points.at(-1)?.value || 0)}</td>)}</tr><tr><th>Risk and movement</th>{series.map((item) => <td key={item.plan.name}>{item.plan.risk} · {item.plan.volatility}</td>)}</tr></tbody></table></section>
        <p className="projection-disclaimer">The higher line is not automatically the right choice. Returns are uncertain, and this comparison uses synthetic data for education.</p>
      </section>
    </main>
  );
}

export default App;

createRoot(document.getElementById("root")!).render(<App />);
