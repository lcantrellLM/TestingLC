import { Link, Navigate, useParams } from "react-router-dom";
import { DOCS, getDoc } from "../docs/content";

export function DocPage() {
  const { slug = "" } = useParams();
  const doc = getDoc(slug);
  if (!doc) return <Navigate to="/docs" replace />;

  const idx = DOCS.findIndex((d) => d.slug === doc.slug);
  const prev = idx > 0 ? DOCS[idx - 1] : null;
  const next = idx < DOCS.length - 1 ? DOCS[idx + 1] : null;

  return (
    <div>
      <header className="page-head">
        <div>
          <div className="row" style={{ marginBottom: 8 }}>
            <Link to="/docs" className="tiny" style={{ color: "var(--accent)" }}>
              ← All docs
            </Link>
            <span className="pill">
              {String(idx + 1).padStart(2, "0")} / {String(DOCS.length).padStart(2, "0")}
            </span>
          </div>
          <h1 className="page-title">{doc.title}</h1>
          <p className="page-lede">{doc.summary}</p>
        </div>
        {(doc.slug === "rules-engine" || doc.slug === "scoring") && (
          <Link to="/rules" className="btn btn-primary">
            Open Rules workbench
          </Link>
        )}
      </header>

      <article className="doc-article stack">
        {doc.sections.map((section) => (
          <section key={section.heading} className="panel panel-pad stack">
            <h2 className="doc-h2">{section.heading}</h2>
            {section.body ? <p className="doc-p">{section.body}</p> : null}
            {section.bullets ? (
              <ul className="doc-list">
                {section.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            ) : null}
            {section.cards ? (
              <div className="grid-2">
                {section.cards.map((c) => (
                  <div key={c.title} className="field-box">
                    <strong className="small">{c.title}</strong>
                    <p className="small muted" style={{ margin: "6px 0 0" }}>
                      {c.body}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
            {section.table ? (
              <div className="doc-table-wrap">
                <table className="doc-table">
                  <thead>
                    <tr>
                      {section.table.headers.map((h) => (
                        <th key={h}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row, ri) => (
                      <tr key={ri}>
                        {row.map((cell, ci) => (
                          <td key={ci}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
            {section.heading === "Try it in the prototype" ? (
              <Link to="/rules" className="btn btn-primary">
                Open Rules workbench →
              </Link>
            ) : null}
          </section>
        ))}
      </article>

      <div className="row between" style={{ marginTop: 20 }}>
        {prev ? (
          <Link to={`/docs/${prev.slug}`} className="btn btn-ghost">
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/docs/${next.slug}`} className="btn">
            {next.title} →
          </Link>
        ) : (
          <Link to="/queue" className="btn btn-primary">
            Try the prototype →
          </Link>
        )}
      </div>
    </div>
  );
}
