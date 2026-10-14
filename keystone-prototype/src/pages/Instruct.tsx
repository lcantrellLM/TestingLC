import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CASES } from "../data";
import { useCaseState } from "../state";

export function InstructPage() {
  const { caseId = "KS-10428" } = useParams();
  const c = CASES.find((x) => x.id === caseId) ?? CASES[0];
  const { overrides } = useCaseState();
  const route = overrides[c.id] ?? c.route;
  const [done, setDone] = useState(false);

  const sla =
    route === "AVM" || route === "No valuation"
      ? "instant / same day"
      : route === "Desktop"
        ? "4 business hours"
        : route === "Physical"
          ? "5 business days"
          : "panel specialist — TBA";

  if (done) {
    return (
      <div>
        <header className="page-head">
          <div>
            <h1 className="page-title">Instruction sent</h1>
          </div>
        </header>
        <div className="panel panel-pad toast stack">
          <strong>
            {route} instructed for {c.id}
          </strong>
          <span className="small muted">
            HCR pack attached · panel/AVM notified · audit logged
          </span>
          <div className="row">
            <Link to="/queue" className="btn btn-primary">
              Back to queue
            </Link>
            <Link to="/mi" className="btn">
              View MI
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <header className="page-head">
        <div>
          <h1 className="page-title">Instruct {route}</h1>
          <p className="page-lede">
            Case {c.id} · {c.address}
          </p>
        </div>
        <Link to={`/case/${c.id}`} className="btn btn-ghost">
          Cancel
        </Link>
      </header>

      <div className="stack">
        <div className="small muted">SLA target: {sla}</div>

        <div className="panel panel-pad stack">
          <strong className="small">Attachments</strong>
          {[
            "HCR structured JSON",
            "HCR PDF",
            "Photo bundle",
            "Title / UPRN summary",
          ].map((a) => (
            <div key={a} className="list-check small">
              <span aria-hidden>✓</span> {a}
            </div>
          ))}
        </div>

        <div className="row">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setDone(true)}
          >
            Send instruction
          </button>
          <Link to={`/case/${c.id}`} className="btn btn-ghost">
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
