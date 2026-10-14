import { Link } from "react-router-dom";

const MIX: [string, number][] = [
  ["No Val", 14],
  ["AVM", 39],
  ["Desktop", 28],
  ["Physical", 15],
  ["Specialist", 4],
];

export function MiPage() {
  return (
    <div>
      <header className="page-head">
        <div>
          <h1 className="page-title">Risk MI</h1>
          <p className="page-lede">
            Illustrative pilot metrics for discovery conversations.
          </p>
        </div>
      </header>

      <div className="stack">
        <div className="grid-4">
          {[
            ["63%", "STP rate", "var(--ok)"],
            ["4.2h", "Median decision", "var(--info)"],
            ["11%", "Overrides", "var(--warn)"],
            ["2.1%", "Post-instruct uplift", "var(--ink)"],
          ].map(([value, label, color]) => (
            <div key={label} className="panel stat">
              <div className="stat-label">{label}</div>
              <div className="stat-value" style={{ color }}>
                {value}
              </div>
            </div>
          ))}
        </div>

        <div className="panel panel-pad stack">
          <strong className="small">Route mix (30 days)</strong>
          {MIX.map(([label, pct]) => (
            <div key={label} className="row" style={{ gap: 10 }}>
              <span className="small" style={{ width: 72 }}>
                {label}
              </span>
              <div className="bar-track" style={{ flex: 1 }}>
                <div className="bar-fill" style={{ width: `${pct}%` }} />
              </div>
              <span className="tiny muted" style={{ width: 36 }}>
                {pct}%
              </span>
            </div>
          ))}
        </div>

        <div className="row">
          <Link to="/queue" className="btn btn-primary">
            Open queue
          </Link>
          <Link to="/rules" className="btn">
            Edit rules
          </Link>
          <Link to="/" className="btn btn-ghost">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
