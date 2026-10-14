import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CASES } from "../data";

type Tab = "summary" | "defects" | "photos" | "notes";

export function HcrPage() {
  const { caseId = "KS-10428" } = useParams();
  const c = CASES.find((x) => x.id === caseId) ?? CASES[0];
  const [tab, setTab] = useState<Tab>("summary");

  const defects = useMemo(() => {
    if (c.route === "Specialist") {
      return [
        ["Cat 3", "Rear wall cracking / possible movement", "Hard uplift"],
        ["Cat 2", "Roof covering nearing end of life", "Score +12"],
      ];
    }
    if (c.route === "Physical") {
      return [
        ["Cat 2", "Active damp to ground floor rear", "Hard uplift"],
        ["Cat 2", "Roof covering aged / local repair", "Score +10"],
      ];
    }
    return [
      ["Cat 2", "Window seal deterioration (front)", "Score +4"],
      ["Cat 1", "Minor decoration wear", "Ignore"],
    ];
  }, [c.route]);

  return (
    <div>
      <header className="page-head">
        <div>
          <h1 className="page-title">House Condition Report</h1>
          <p className="page-lede">{c.address}</p>
        </div>
        <Link to={`/case/${c.id}`} className="btn btn-ghost">
          Back to decision
        </Link>
      </header>

      <div className="stack">
        <div className="panel panel-pad">
          <div className="small muted">
            Inspected {c.hcrDays} days ago · A. Khan MRICS · Westvale Surveys
          </div>
        </div>

        <div className="tabs">
          {(
            [
              ["summary", "Summary"],
              ["defects", "Defects"],
              ["photos", "Photos"],
              ["notes", "Notes"],
            ] as [Tab, string][]
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={`btn btn-sm${tab === id ? " btn-primary" : ""}`}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "summary" && (
          <div className="grid-2">
            {(
              [
                ["Overall condition", c.condition],
                ["Damp", c.damp],
                [
                  "Structure",
                  c.route === "Specialist" ? "Cat 3 movement" : "No concern",
                ],
                [
                  "Roof",
                  c.condition === "C" || c.condition === "D"
                    ? "Fair / aged"
                    : "Fair",
                ],
                ["Services", "Satisfactory"],
                [
                  "Further investigation",
                  c.route === "Specialist" ? "Yes" : "No",
                ],
              ] as [string, string][]
            ).map(([k, v]) => (
              <div key={k} className="field-box">
                <div className="tiny muted">{k}</div>
                <strong>{v}</strong>
              </div>
            ))}
          </div>
        )}

        {tab === "defects" && (
          <div className="stack">
            {defects.map(([cat, desc, effect]) => (
              <div key={desc} className="panel panel-pad row between">
                <div className="row">
                  <span
                    className={`pill ${cat === "Cat 3" ? "danger" : cat === "Cat 2" ? "warn" : ""}`}
                  >
                    {cat}
                  </span>
                  <span className="small">{desc}</span>
                </div>
                <span className="tiny muted">{effect}</span>
              </div>
            ))}
          </div>
        )}

        {tab === "photos" && (
          <div className="grid-3">
            {[
              "Front elevation",
              "Rear elevation",
              "Roof",
              "Loft",
              "Kitchen",
              "Damp area",
            ].map((label) => (
              <div key={label} className="photo-tile">
                {label}
              </div>
            ))}
          </div>
        )}

        {tab === "notes" && (
          <div className="panel panel-pad">
            <p className="small" style={{ margin: 0 }}>
              {c.route === "Specialist"
                ? "Cracking to rear elevation warrants structural engineer review prior to lending decision. Limitations: loft partially boarded; services not tested."
                : c.route === "Physical"
                  ? "Active damp noted to rear reception. Moisture readings elevated. Recommend physical inspection to confirm extent and any timber involvement."
                  : "Property generally well presented. No further investigation recommended at inspection. Photo set complete including roof and loft."}
            </p>
          </div>
        )}

        <div className="row">
          <Link to={`/case/${c.id}`} className="btn btn-primary">
            Back to decision
          </Link>
          <Link to="/queue" className="btn btn-ghost">
            Queue
          </Link>
        </div>
      </div>
    </div>
  );
}
