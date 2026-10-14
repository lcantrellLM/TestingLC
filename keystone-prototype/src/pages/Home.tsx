import { Link } from "react-router-dom";

const cards = [
  {
    to: "/docs",
    title: "Read the design docs",
    blurb:
      "Vision, journey, architecture, rules, scoring, lender configs and regulation — the full thinking pack.",
  },
  {
    to: "/queue",
    title: "Work a case",
    blurb:
      "Open the underwriter queue, review a recommendation, override or instruct.",
  },
  {
    to: "/case/KS-10428/hcr",
    title: "Inspect an HCR",
    blurb:
      "Browse condition grades, defects, damp and photos behind the score.",
  },
  {
    to: "/rules",
    title: "Tweak lender rules",
    blurb:
      "Browse a VRM-style ruleset, open a rule, flip levers, watch route mix move.",
  },
  {
    to: "/mi",
    title: "Glance at MI",
    blurb: "Route mix, STP rate and override heat — discovery dashboard.",
  },
];

export function Home() {
  return (
    <div>
      <header className="page-head">
        <div>
          <h1 className="page-title">What do you want to explore?</h1>
          <p className="page-lede">
            A clickable mid-fi prototype of HCR-first valuation routing. Nothing
            here is wired to live lending systems — it is for shaping the idea.
          </p>
        </div>
      </header>

      <div className="grid-2">
        {cards.map((c) => (
          <Link key={c.to} to={c.to} className="panel panel-pad home-card stack">
            <strong>{c.title}</strong>
            <span className="small muted">{c.blurb}</span>
            <span className="small" style={{ color: "var(--accent)" }}>
              Open →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
