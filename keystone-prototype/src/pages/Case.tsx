import { Link, useParams } from "react-router-dom";
import { CASES, riskTone } from "../data";
import { useCaseState } from "../state";

export function CasePage() {
  const { caseId = "KS-10428" } = useParams();
  const c = CASES.find((x) => x.id === caseId) ?? CASES[0];
  const { overrides } = useCaseState();
  const shownRoute = overrides[c.id] ?? c.route;

  return (
    <div>
      <header className="page-head">
        <div>
          <h1 className="page-title">Case {c.id}</h1>
          <p className="page-lede">{c.address}</p>
        </div>
        <Link to="/queue" className="btn btn-ghost">
          Back to queue
        </Link>
      </header>

      <div className="stack">
        <div className="panel panel-pad">
          <div className="small muted">
            {c.product} · Loan {c.loan} · LTV {c.ltv} · HCR {c.hcrDays} days old
          </div>
        </div>

        <div className="grid-3">
          <div className="panel stat">
            <div className="stat-label">Property risk</div>
            <div
              className="stat-value"
              style={{
                color:
                  riskTone(c.risk) === "danger"
                    ? "var(--danger)"
                    : riskTone(c.risk) === "warn"
                      ? "var(--warn)"
                      : "var(--ok)",
              }}
            >
              {c.risk}
            </div>
          </div>
          <div className="panel stat">
            <div className="stat-label">Confidence</div>
            <div
              className="stat-value"
              style={{
                color: c.conf < 0.75 ? "var(--warn)" : "var(--info)",
              }}
            >
              {c.conf.toFixed(2)}
            </div>
          </div>
          <div className="panel stat">
            <div className="stat-label">
              {overrides[c.id] ? "Route (overridden)" : "Recommended route"}
            </div>
            <div className="stat-value" style={{ fontSize: "1.35rem" }}>
              {shownRoute}
            </div>
          </div>
        </div>

        <p className="small muted" style={{ margin: 0 }}>
          {overrides[c.id]
            ? `Engine said ${c.route} · you selected ${overrides[c.id]}`
            : "Engine recommendation — accept, override, or inspect the HCR."}
        </p>

        <div className="panel panel-pad stack">
          <strong>Why this route</strong>
          {c.why.map((w) => (
            <div key={w} className="small">
              · {w}
            </div>
          ))}
        </div>

        <hr className="divider" />

        <div className="row">
          <Link
            to={`/case/${c.id}/instruct`}
            className="btn btn-primary"
          >
            Accept {shownRoute}
          </Link>
          <Link to={`/case/${c.id}/override`} className="btn">
            Override…
          </Link>
          <Link to={`/case/${c.id}/hcr`} className="btn">
            View HCR
          </Link>
          <Link to="/queue" className="btn btn-ghost">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
