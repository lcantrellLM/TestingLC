import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { VRM_RULES } from "../data";

const GROUPS = [
  "All",
  "AVM eligibility",
  "High-LTV risk flags",
  "AVM pass",
  "Desktop routing",
] as const;

export function RulesPage() {
  const [selectedId, setSelectedId] = useState("avm-cl");
  const [groupFilter, setGroupFilter] =
    useState<(typeof GROUPS)[number]>("All");
  const [enabled, setEnabled] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(VRM_RULES.map((r) => [r.id, true])),
  );
  const [priceCap, setPriceCap] = useState("1.3m");
  const [avmCl, setAvmCl] = useState("2.0");
  const [flatLtv, setFlatLtv] = useState("85.01");
  const [valueCap, setValueCap] = useState("1.3m");

  const selected = VRM_RULES.find((r) => r.id === selectedId) ?? VRM_RULES[0];
  const visible =
    groupFilter === "All"
      ? VRM_RULES
      : VRM_RULES.filter((r) => r.group === groupFilter);

  const question = useMemo(() => {
    if (selected.id === "price-band") {
      return `Is the purchase price ≥ £50k and ≤ £${priceCap === "900k" ? "900k" : "1.3m"}?`;
    }
    if (selected.id === "avm-cl") {
      return `Is AVM CL ≥ ${avmCl}? (BTL also needs rental CL ≥ ${avmCl})`;
    }
    if (selected.id === "flat-ltv") {
      return `Is the property a flat AND LTV ≥ ${flatLtv}%?`;
    }
    if (selected.id === "value-cap") {
      return `Property > £${valueCap === "900k" ? "900k" : "1.3m"} OR advance ≥ £900k?`;
    }
    return selected.question;
  }, [selected, priceCap, avmCl, flatLtv, valueCap]);

  const mix = useMemo(() => {
    let avmShare = 34;
    let deskShare = 30;
    let physShare = 16;
    if (avmCl !== "2.0") {
      avmShare -= 8;
      deskShare += 6;
      physShare += 2;
    }
    if (flatLtv === "80" && enabled["flat-ltv"]) {
      avmShare -= 5;
      deskShare += 5;
    }
    if (priceCap === "900k" || valueCap === "900k") {
      avmShare -= 6;
      deskShare += 3;
      physShare += 3;
    }
    if (!enabled["high-ltv-flags"]) {
      avmShare += 4;
      physShare -= 2;
      deskShare -= 2;
    }
    if (!enabled["avm-cl"]) {
      avmShare = Math.max(8, avmShare - 12);
      deskShare += 8;
      physShare += 4;
    }
    const parts: [string, number][] = [
      ["No Val", 8],
      ["AVM", avmShare],
      ["Desktop", deskShare],
      ["Physical", physShare],
      ["Specialist", 4],
    ];
    const total = parts.reduce((s, [, n]) => s + n, 0) || 1;
    return parts.map(([label, n]) => [label, Math.round((n / total) * 100)] as [
      string,
      number,
    ]);
  }, [avmCl, flatLtv, priceCap, valueCap, enabled]);

  return (
    <div>
      <header className="page-head">
        <div>
          <h1 className="page-title">Rules workbench</h1>
          <p className="page-lede">
            VRM Ruleset v15 · Phase 8 DRAFT — flow nodes A → B → C → D (AVM →
            lender Desktop → 3rd-party DV → Physical).
          </p>
        </div>
        <span className="pill">7 sample rules</span>
      </header>

      <div className="stack">
        <div className="row">
          {GROUPS.map((g) => (
            <button
              key={g}
              type="button"
              className={`btn btn-sm${groupFilter === g ? " btn-primary" : ""}`}
              onClick={() => setGroupFilter(g)}
            >
              {g}
            </button>
          ))}
        </div>

        <div className="grid-2">
          <div className="stack">
            {visible.map((rule) => {
              const on = enabled[rule.id] !== false;
              const active = rule.id === selected.id;
              return (
                <button
                  key={rule.id}
                  type="button"
                  className={`panel panel-pad rule-card${active ? " active" : ""}`}
                  onClick={() => setSelectedId(rule.id)}
                >
                  <div className="stack" style={{ gap: 6 }}>
                    <div className="row between">
                      <div className="row">
                        <span className="pill">Node {rule.node}</span>
                        <span className="tiny muted">{rule.group}</span>
                      </div>
                      <span
                        className="tiny"
                        style={{
                          color: on ? "var(--accent)" : "var(--muted)",
                          fontWeight: 600,
                        }}
                      >
                        {on ? "On" : "Off"}
                      </span>
                    </div>
                    <strong>{rule.name}</strong>
                    <span className="small muted">{rule.question}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="panel panel-pad stack">
            <div className="row between">
              <div>
                <strong>{selected.name}</strong>
                <div className="tiny muted">
                  {selected.group} · flowchart node {selected.node}
                </div>
              </div>
              <button
                type="button"
                className={`btn btn-sm${enabled[selected.id] !== false ? " btn-primary" : ""}`}
                onClick={() =>
                  setEnabled((prev) => ({
                    ...prev,
                    [selected.id]: !(prev[selected.id] !== false),
                  }))
                }
              >
                {enabled[selected.id] !== false ? "Enabled" : "Disabled"}
              </button>
            </div>

            <div className="field-box">
              <div className="tiny muted">IF (question)</div>
              <div className="small" style={{ fontWeight: 600 }}>
                {question}
              </div>
            </div>

            <div className="grid-2">
              <div className="field-box">
                <div className="tiny muted">YES →</div>
                <div className="small">{selected.ifYes}</div>
              </div>
              <div className="field-box">
                <div className="tiny muted">NO →</div>
                <div className="small">{selected.ifNo}</div>
              </div>
            </div>

            {selected.tunable === "priceCap" && (
              <div className="stack" style={{ gap: 6 }}>
                <strong className="small">
                  Price ceiling (v15 draft: increased to £1.3m)
                </strong>
                <div className="row">
                  {["900k", "1.3m"].map((v) => (
                    <button
                      key={v}
                      type="button"
                      className={`btn btn-sm${priceCap === v ? " btn-primary" : ""}`}
                      onClick={() => setPriceCap(v)}
                    >
                      £{v}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selected.tunable === "avmCl" && (
              <div className="stack" style={{ gap: 6 }}>
                <strong className="small">Minimum AVM confidence level</strong>
                <div className="row">
                  {["2.0", "3.0", "3.5"].map((v) => (
                    <button
                      key={v}
                      type="button"
                      className={`btn btn-sm${avmCl === v ? " btn-primary" : ""}`}
                      onClick={() => setAvmCl(v)}
                    >
                      CL ≥ {v}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selected.tunable === "flatLtv" && (
              <div className="stack" style={{ gap: 6 }}>
                <strong className="small">Flat LTV floor (desktop panel)</strong>
                <div className="row">
                  {["80", "85.01", "90"].map((v) => (
                    <button
                      key={v}
                      type="button"
                      className={`btn btn-sm${flatLtv === v ? " btn-primary" : ""}`}
                      onClick={() => setFlatLtv(v)}
                    >
                      ≥ {v}%
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selected.tunable === "valueCap" && (
              <div className="stack" style={{ gap: 6 }}>
                <strong className="small">Property value cap</strong>
                <div className="row">
                  {["900k", "1.3m"].map((v) => (
                    <button
                      key={v}
                      type="button"
                      className={`btn btn-sm${valueCap === v ? " btn-primary" : ""}`}
                      onClick={() => setValueCap(v)}
                    >
                      £{v}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <p className="tiny muted" style={{ margin: 0 }}>
              Structure mirrors the Phase 8 draft: binary questions, Y/N
              branches, and explicit next nodes (B Desktop, C 3rd-party DV, D
              Physical).
            </p>
          </div>
        </div>

        <div className="panel panel-pad stack">
          <strong className="small">
            Simulated route mix (toy — reacts to toggles / thresholds)
          </strong>
          {mix.map(([label, pct]) => (
            <div key={label} className="stack" style={{ gap: 4 }}>
              <div className="row between">
                <span className="small">{label}</span>
                <span className="tiny muted">{pct}%</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${pct}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="row">
          <Link to="/queue" className="btn">
            Try a case with this appetite →
          </Link>
          <Link to="/docs/rules-engine" className="btn btn-ghost">
            Read rules engine design
          </Link>
        </div>
      </div>
    </div>
  );
}
