import { Link } from "react-router-dom";
import { CASES, statusTone } from "../data";

export function Queue() {
  return (
    <div>
      <header className="page-head">
        <div>
          <h1 className="page-title">Underwriter queue</h1>
          <p className="page-lede">
            Click a case to open the route decision.
          </p>
        </div>
      </header>

      <div className="stack">
        {CASES.map((c) => (
          <Link
            key={c.id}
            to={`/case/${c.id}`}
            className="panel panel-pad case-card"
          >
            <div className="row between">
              <div className="stack" style={{ gap: 6, minWidth: 0, flex: 1 }}>
                <div className="row">
                  <strong>{c.id}</strong>
                  <span className={`pill ${statusTone(c.status)}`}>
                    {c.status}
                  </span>
                  <span className="pill accent">{c.route}</span>
                </div>
                <div className="small muted">{c.address}</div>
                <div className="tiny muted mono">
                  {c.product} · LTV {c.ltv} · Risk {c.risk} · Conf {c.conf}
                </div>
              </div>
              <span className="small" style={{ color: "var(--accent)" }}>
                Open →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
