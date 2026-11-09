import { Link } from "react-router-dom";
import {
  BRANCHES,
  casesForBranch,
  getCompany,
  statusTone,
} from "../data";
import { useSession } from "../session";

export function Dashboard() {
  const { company, branch, companies, setBranch } = useSession();
  const cases = casesForBranch(branch.id);
  const ready = cases.filter((c) => c.status === "Ready").length;
  const review = cases.filter((c) => c.status === "Needs review").length;
  const overdue = cases.filter((c) => c.status === "Overdue").length;

  return (
    <div key={branch.id} className="dashboard-view">
      <header className="page-head">
        <div>
          <h1 className="page-title">Branch dashboard</h1>
          <p className="page-lede">
            Click a desk below (or the header switcher) to change company /
            branch. The case list updates for that desk.
          </p>
        </div>
        <div className="dashboard-context panel panel-pad">
          <div className="tiny muted">Active context</div>
          <div className="dashboard-context-main">{company.shortName}</div>
          <div className="small">
            {branch.name} · {branch.region}
          </div>
        </div>
      </header>

      <section className="desk-picker" aria-label="Switch desk">
        {companies.map((c) => {
          const desks = BRANCHES.filter((b) => b.companyId === c.id);
          return (
            <div key={c.id} className="desk-picker-group">
              <div className="desk-picker-company">{c.name}</div>
              <div className="desk-picker-row">
                {desks.map((b) => {
                  const count = casesForBranch(b.id).length;
                  const active = b.id === branch.id;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      className={`desk-chip${active ? " active" : ""}`}
                      aria-pressed={active}
                      onClick={() => setBranch(b.id)}
                    >
                      <span className="desk-chip-name">{b.name}</span>
                      <span className="desk-chip-meta">
                        {b.region} · {count} cases
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>

      <div className="grid-3" style={{ marginBottom: 16 }}>
        <div className="panel stat">
          <div className="stat-label">Open cases</div>
          <div className="stat-value">{cases.length}</div>
        </div>
        <div className="panel stat">
          <div className="stat-label">Ready</div>
          <div className="stat-value" style={{ color: "var(--ok)" }}>
            {ready}
          </div>
        </div>
        <div className="panel stat">
          <div className="stat-label">Needs attention</div>
          <div
            className="stat-value"
            style={{ color: overdue ? "var(--danger)" : "var(--warn)" }}
          >
            {review + overdue}
          </div>
        </div>
      </div>

      <div className="row between" style={{ marginBottom: 10 }}>
        <h2 className="doc-h2">
          Case list · {getCompany(branch.companyId)?.shortName} / {branch.name}
        </h2>
        <span className="tiny muted">
          {cases.length} case{cases.length === 1 ? "" : "s"} · click to open
        </span>
      </div>

      {cases.length === 0 ? (
        <div className="panel panel-pad">
          <p className="muted" style={{ margin: 0 }}>
            No cases for this branch yet.
          </p>
        </div>
      ) : (
        <div className="stack">
          {cases.map((c) => (
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
      )}
    </div>
  );
}
