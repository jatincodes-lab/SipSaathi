import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function App() {
  const [screen, setScreen] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12>(1);
  const [goal, setGoal] = useState("");

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
        goal={goal}
        onGoalChange={setGoal}
        onBack={() => setScreen(2)}
        onNext={() => setScreen(4)}
      />
    );
  }

  if (screen === 4) {
    return (
      <TargetAmountScreen
        onBack={() => setScreen(3)}
        onNext={() => setScreen(5)}
      />
    );
  }

  if (screen === 5) {
    return (
      <DeadlineScreen
        onBack={() => setScreen(4)}
        onNext={() => setScreen(6)}
      />
    );
  }

  if (screen === 6) {
    return (
      <MonthlyAmountScreen
        onBack={() => setScreen(5)}
        onNext={() => setScreen(7)}
      />
    );
  }

  if (screen === 7) {
    return (
      <ExistingSavingsScreen
        onBack={() => setScreen(6)}
        onNext={() => setScreen(8)}
      />
    );
  }

  if (screen === 8) {
    return (
      <LiquidityScreen
        onBack={() => setScreen(7)}
        onNext={() => setScreen(9)}
      />
    );
  }

  if (screen === 9) {
    return (
      <RiskScreen
        onBack={() => setScreen(8)}
        onNext={() => setScreen(10)}
      />
    );
  }

  if (screen === 10) {
    return <ReviewScreen goal={goal} onBack={() => setScreen(9)} onNext={() => setScreen(11)} />;
  }

  if (screen === 11) {
    return <ScreeningScreen onNext={() => setScreen(12)} />;
  }

  if (screen === 12) {
    return <ResearchShortlistScreen onBack={() => setScreen(10)} />;
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
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  const [target, setTarget] = useState("");
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
                setTarget(event.target.value);
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
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  const [deadline, setDeadline] = useState("");
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
                setDeadline(event.target.value);
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
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  const [monthlyAmount, setMonthlyAmount] = useState("");
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
                  setMonthlyAmount(event.target.value);
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
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  const [savings, setSavings] = useState("");
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
                  setSavings(event.target.value);
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
                setSavings("");
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
                setSavings("");
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
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  const [liquidity, setLiquidity] = useState("");
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
                  setLiquidity(item.value);
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
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  const [risk, setRisk] = useState("");
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
                  setRisk(item.value);
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
  goal,
  onBack,
  onNext,
}: {
  goal: string;
  onBack: () => void;
  onNext: () => void;
}) {
  const [notice, setNotice] = useState("");
  const goalLabel =
    goal === "home"
      ? "Buy a home"
      : goal === "education"
        ? "Education"
        : goal === "retirement"
          ? "Retirement"
          : goal === "other"
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

function ResearchShortlistScreen({ onBack }: { onBack: () => void }) {
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

  return (
    <main className="shortlist-screen">
      <header className="topbar shortlist-screen__topbar">
        <button className="back-button" type="button" onClick={onBack}>
          Back
        </button>
        <span className="info-screen__progress">12 / 14</span>
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
          {funds.map((fund, index) => (
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
              <button className="text-button" type="button" disabled>
                Details coming next
              </button>
            </article>
          ))}
        </div>

        <p className="shortlist-disclaimer">
          Research and education only. Fund names, performance, and dates on
          this screen are synthetic prototype examples.
        </p>
      </section>
    </main>
  );
}

export default App;

createRoot(document.getElementById("root")!).render(<App />);
