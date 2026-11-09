import { Link } from "react-router-dom";
import {
  casesForBranch,
  getCompany,
  slaTone,
  workflowTone,
} from "../data";
import { useSession } from "../session";

export function Dashboard() {
  const { company, branch } = useSession();
  const cases = casesForBranch(branch.id);

  return (
    <div key={branch.id} className="cases-page">
      <header className="page-head">
        <div>
          <h1 className="page-title">Cases</h1>
          <p className="page-lede">
            Showing cases for {company.name} · {branch.name}.
          </p>
        </div>
        <button type="button" className="btn btn-primary">
          + Create case
        </button>
      </header>

      <div className="cases-toolbar">
        <h2 className="cases-count">All cases ({cases.length} results)</h2>
        <div className="cases-toolbar-actions">
          <button type="button" className="btn btn-sm">
            Export data
          </button>
          <button type="button" className="btn btn-sm">
            Filters
          </button>
          <button type="button" className="btn btn-sm">
            Columns
          </button>
        </div>
      </div>

      <div className="table-wrap">
        <table className="cases-table">
          <thead>
            <tr>
              <th>Case ID</th>
              <th>Your fee</th>
              <th>Product</th>
              <th>Company</th>
              <th>Branch</th>
              <th>Property address</th>
              <th>Status</th>
              <th>Last updated</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => (
              <tr key={c.id}>
                <td>
                  <Link className="case-link" to={`/case/${c.id}`}>
                    {c.id}
                  </Link>
                </td>
                <td>{c.fee}</td>
                <td>{c.product}</td>
                <td>{getCompany(branch.companyId)?.name ?? company.name}</td>
                <td>{branch.name}</td>
                <td>
                  <div className="addr-cell">
                    <strong>{c.applicant}</strong>
                    <span>{c.address}</span>
                  </div>
                </td>
                <td>
                  <div className="status-stack">
                    <span className={`status-badge ${workflowTone(c.workflow)}`}>
                      {c.workflow}
                    </span>
                    <span className={`status-badge ${slaTone(c.sla)}`}>
                      {c.sla}
                    </span>
                  </div>
                </td>
                <td>{c.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-foot">
        <span>
          Showing 1 to {cases.length} of {cases.length} results
        </span>
        <span>Rows per page 10 · Page 1 of 1</span>
      </div>
    </div>
  );
}
