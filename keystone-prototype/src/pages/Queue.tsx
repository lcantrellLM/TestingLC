import { Link } from "react-router-dom";
import { casesForBranch, slaTone } from "../data";
import { useSession } from "../session";

export function Queue() {
  const { company, branch } = useSession();
  const cases = casesForBranch(branch.id).filter(
    (c) => c.sla !== "Within SLA" || c.status !== "Ready",
  );

  return (
    <div key={branch.id}>
      <header className="page-head">
        <div>
          <h1 className="page-title">Tasks</h1>
          <p className="page-lede">
            Attention items for {company.shortName} · {branch.name}.
          </p>
        </div>
      </header>

      <div className="stack">
        {cases.length === 0 ? (
          <div className="detail-card">No open tasks for this desk.</div>
        ) : (
          cases.map((c) => (
            <Link key={c.id} to={`/case/${c.id}`} className="task-row">
              <div>
                <strong>{c.id}</strong>
                <div className="small muted">{c.address}</div>
              </div>
              <span className={`status-badge ${slaTone(c.sla)}`}>{c.sla}</span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
