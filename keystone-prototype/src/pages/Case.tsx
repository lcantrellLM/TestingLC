import { Link, useParams } from "react-router-dom";
import { findCase, getBranch, getCompany, slaTone, workflowTone } from "../data";
import { useCaseState } from "../state";

export function CasePage() {
  const { caseId = "KS-10428" } = useParams();
  const c = findCase(caseId);
  const branch = getBranch(c.branchId);
  const company = branch ? getCompany(branch.companyId) : undefined;
  const { overrides } = useCaseState();
  const shownRoute = overrides[c.id] ?? c.route;

  return (
    <div className="case-detail">
      <div className="case-detail-top">
        <Link to="/" className="back-link">
          ← Back to cases
        </Link>
        <div className="row">
          <Link to={`/case/${c.id}/override`} className="btn btn-sm">
            Actions
          </Link>
        </div>
      </div>

      <header className="case-detail-head">
        <div>
          <h1 className="page-title">{c.address}</h1>
          <p className="page-lede">
            Case ID: {c.id} · {c.product}
          </p>
          <div className="status-stack horizontal">
            <span className={`status-badge ${workflowTone(c.workflow)}`}>
              {c.workflow}
            </span>
            <span className={`status-badge ${slaTone(c.sla)}`}>{c.sla}</span>
          </div>
        </div>
      </header>

      <div className="case-tabs" aria-label="Case sections">
        <span className="case-tab active">Case details</span>
        <span className="case-tab">Activity</span>
        <span className="case-tab">Reports</span>
      </div>

      <div className="case-grid">
        <div className="stack">
          <section className="detail-card">
            <h2 className="detail-card-title">Job details</h2>
            <dl className="detail-fields">
              <div>
                <dt>Case ID</dt>
                <dd>{c.id}</dd>
              </div>
              <div>
                <dt>Product</dt>
                <dd>{c.product}</dd>
              </div>
              <div>
                <dt>Fee</dt>
                <dd>{c.fee}</dd>
              </div>
              <div>
                <dt>Loan / LTV</dt>
                <dd>
                  {c.loan} · {c.ltv}
                </dd>
              </div>
              <div>
                <dt>Company</dt>
                <dd>{company?.name ?? "—"}</dd>
              </div>
              <div>
                <dt>Branch</dt>
                <dd>{branch?.name ?? "—"}</dd>
              </div>
              <div>
                <dt>Recommended route</dt>
                <dd>{shownRoute}</dd>
              </div>
              <div>
                <dt>SLA</dt>
                <dd>{c.sla}</dd>
              </div>
            </dl>
          </section>
        </div>

        <div className="stack">
          <section className="detail-card">
            <h2 className="detail-card-title">Property details</h2>
            <dl className="detail-fields">
              <div>
                <dt>Address</dt>
                <dd>{c.address}</dd>
              </div>
              <div>
                <dt>Condition</dt>
                <dd>{c.condition}</dd>
              </div>
              <div>
                <dt>Damp</dt>
                <dd>{c.damp}</dd>
              </div>
              <div>
                <dt>Property risk</dt>
                <dd>{c.risk}</dd>
              </div>
              <div>
                <dt>Confidence</dt>
                <dd>{c.conf.toFixed(2)}</dd>
              </div>
            </dl>
          </section>

          <section className="detail-card">
            <h2 className="detail-card-title">Applicant details</h2>
            <dl className="detail-fields">
              <div>
                <dt>Name</dt>
                <dd>{c.applicant}</dd>
              </div>
              <div>
                <dt>HCR age</dt>
                <dd>{c.hcrDays} days</dd>
              </div>
            </dl>
          </section>
        </div>

        <div className="stack">
          {c.sla !== "Within SLA" ? (
            <div className={`sla-banner ${slaTone(c.sla)}`}>
              {c.sla}: review needed for this desk
            </div>
          ) : null}

          <section className="detail-card">
            <h2 className="detail-card-title">Why this route</h2>
            <ul className="why-list">
              {c.why.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </section>

          <section className="detail-card">
            <h2 className="detail-card-title">Next actions</h2>
            <div className="stack" style={{ gap: 8 }}>
              <Link to={`/case/${c.id}/instruct`} className="btn btn-primary">
                Accept {shownRoute}
              </Link>
              <Link to={`/case/${c.id}/override`} className="btn">
                Override…
              </Link>
              <Link to={`/case/${c.id}/hcr`} className="btn">
                View HCR
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
