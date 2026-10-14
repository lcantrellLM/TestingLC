import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CASES, type Route } from "../data";
import { useCaseState } from "../state";

const ROUTES: Route[] = [
  "No valuation",
  "AVM",
  "Desktop",
  "Physical",
  "Specialist",
];

const REASONS = [
  "Thin local comps",
  "HCR photo gaps",
  "Credit appetite",
  "Broker escalation",
];

export function OverridePage() {
  const { caseId = "KS-10428" } = useParams();
  const c = CASES.find((x) => x.id === caseId) ?? CASES[0];
  const { setOverride } = useCaseState();
  const navigate = useNavigate();
  const [picked, setPicked] = useState<Route>(c.route);
  const [reason, setReason] = useState(REASONS[0]);

  return (
    <div>
      <header className="page-head">
        <div>
          <h1 className="page-title">Override recommendation</h1>
          <p className="page-lede">
            Engine recommended <strong>{c.route}</strong>. Choose a different
            route and a reason.
          </p>
        </div>
        <Link to={`/case/${c.id}`} className="btn btn-ghost">
          Cancel
        </Link>
      </header>

      <div className="stack">
        <div className="panel panel-pad stack">
          <strong className="small">New route</strong>
          <div className="row">
            {ROUTES.map((r) => (
              <button
                key={r}
                type="button"
                className={`btn btn-sm${picked === r ? " btn-primary" : ""}`}
                onClick={() => setPicked(r)}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="panel panel-pad stack">
          <strong className="small">Reason</strong>
          <div className="row">
            {REASONS.map((r) => (
              <button
                key={r}
                type="button"
                className={`btn btn-sm${reason === r ? " btn-primary" : ""}`}
                onClick={() => setReason(r)}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="field-box">
          <div className="small">
            Mandate check: you may select Desktop or Physical
          </div>
          <div className="tiny muted">
            Dual control required only for No valuation above £500k · Reason
            logged: {reason}
          </div>
        </div>

        <div className="row">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setOverride(c.id, picked);
              navigate(`/case/${c.id}`);
            }}
          >
            Confirm override
          </button>
          <Link to={`/case/${c.id}`} className="btn btn-ghost">
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
