import { Link } from "react-router-dom";
import { DOCS } from "../docs/content";

export function DocsIndex() {
  return (
    <div>
      <header className="page-head">
        <div>
          <h1 className="page-title">Design docs</h1>
          <p className="page-lede">
            The product thinking pack from the first design pass — vision,
            journey, architecture, rules, scoring, configs and regulation.
            Jump back to the clickable UI anytime from the left nav.
          </p>
        </div>
        <Link to="/queue" className="btn">
          Open queue →
        </Link>
      </header>

      <div className="stack">
        {DOCS.map((doc, i) => (
          <Link
            key={doc.slug}
            to={`/docs/${doc.slug}`}
            className="panel panel-pad home-card"
          >
            <div className="row between">
              <div className="stack" style={{ gap: 6, minWidth: 0, flex: 1 }}>
                <div className="row">
                  <span className="pill">{String(i + 1).padStart(2, "0")}</span>
                  <strong>{doc.title}</strong>
                </div>
                <span className="small muted">{doc.summary}</span>
              </div>
              <span className="small" style={{ color: "var(--accent)" }}>
                Read →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
