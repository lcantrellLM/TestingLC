export type DocSection = {
  heading: string;
  body?: string;
  bullets?: string[];
  table?: { headers: string[]; rows: string[][] };
  cards?: { title: string; body: string }[];
};

export type DocPage = {
  slug: string;
  title: string;
  summary: string;
  sections: DocSection[];
};

export const DOCS: DocPage[] = [
  {
    slug: "vision",
    title: "Product vision",
    summary:
      "HCR-first valuation risk for UK mortgages — lightest defensible route before offer.",
    sections: [
      {
        heading: "North star",
        body: "Keystone is a pre-application valuation risk platform for UK mortgage lenders. It ingests a seller-commissioned House Condition Report (HCR) — structured to RICS Level 2 Home Survey depth — alongside property, market, historic valuation, borrower and lender-policy data, then recommends the lightest defensible valuation route before an offer is made.",
      },
      {
        heading: "Problem today",
        body: "Risk assessment starts after application. Valuation routing is reactive, duplicative and slow. Physical surveys are over-instructed; AVMs are under-trusted where condition evidence already exists.",
      },
      {
        heading: "Future state",
        body: "Condition evidence exists at listing. Lenders consume a standardised HCR payload, score property risk, and route to No Val / AVM / Desktop / Physical / Specialist with full explainability and override audit.",
      },
      {
        heading: "Design principle",
        body: "Prefer the least intrusive valuation that still meets lender risk appetite and regulatory expectations — with HCR quality and currency as first-class gates.",
      },
      {
        heading: "How HCR changes risk assessment",
        table: {
          headers: ["Question", "Keystone approach"],
          rows: [
            [
              "How is HCR incorporated?",
              "As a structured evidence object (condition grades, defects, damp, structure, roof, services, photos, commentary) scored before borrower LTV gates fire.",
            ],
            [
              "What increases risk?",
              "Structural concerns, active damp, roof failure indicators, unsafe services, incomplete photos, surveyor caveats, age/construction mismatches, flood/subsidence overlays.",
            ],
            [
              "What reduces further inspection?",
              "Recent RICS-comparable HCR, good/fair condition, no Category 3 defects, verified photos, AVM confidence above threshold, low LTV, stable market comps.",
            ],
            [
              "How are lender rules configured?",
              "Policy packs: product × LTV × property type × HCR age × defect severity × geography. Versioned, simulated, dual-controlled.",
            ],
            [
              "What explainability is required?",
              "Fired rules, contribution scores, data lineage, photo/defect evidence links, alternative routes considered, override rationale.",
            ],
          ],
        },
      },
      {
        heading: "Value by stakeholder",
        cards: [
          {
            title: "Lender",
            body: "Earlier collateral view, configurable appetite, lower valuation cost, clearer MI for Board/PRA, consistent routing across channels.",
          },
          {
            title: "Valuer / panel",
            body: "Richer instruction packs, fewer aborted visits, better triage of specialist work, desktop valuations grounded in HCR media.",
          },
          {
            title: "Borrower",
            body: "Faster offers when property evidence is strong; fewer mid-process surprises from late physical surveys.",
          },
          {
            title: "Seller / agent",
            body: "One HCR supports multiple buyers/lenders; defects disclosed early; reduced renegotiation after late surveys.",
          },
        ],
      },
    ],
  },
  {
    slug: "journey",
    title: "End-to-end user journey",
    summary:
      "Risk moves left of application — HCR at listing, score at application, instruct with evidence.",
    sections: [
      {
        heading: "Stages",
        table: {
          headers: ["Stage", "Primary user", "What happens"],
          rows: [
            [
              "1. Listing",
              "Seller / agent",
              "Commission HCR from RICS surveyor; report uploaded to Keystone HCR Vault.",
            ],
            [
              "2. Normalise",
              "Keystone ingest",
              "Map free-text + structured fields to HCR schema; extract defects, grades, photos, confidence.",
            ],
            [
              "3. Enrich",
              "Data services",
              "Attach EPC, flood, mining, title, comps, historic vals, crime, planning overlays.",
            ],
            [
              "4. Application",
              "Borrower / broker",
              "Mortgage app references UPRN/address; Keystone binds HCR + borrower LTV/product.",
            ],
            [
              "5. Score & route",
              "Rules engine",
              "Evaluate policy pack; emit route + confidence + explanation object.",
            ],
            [
              "6. Decide",
              "Underwriter / STP",
              "Auto-accept within mandate or review queue with override controls.",
            ],
            [
              "7. Instruct",
              "Valuation ops",
              "If needed, instruct AVM/desktop/physical/specialist with HCR pack attached.",
            ],
            [
              "8. Close loop",
              "Risk & MI",
              "Compare route vs outcome; feed challenger models and policy simulation.",
            ],
          ],
        },
      },
      {
        heading: "Straight-through path",
        body: "Fresh HCR (≤90 days), Condition A/B, no Cat 3 defects, LTV ≤75%, AVM confidence ≥0.85, standard construction, non-high-risk postcode → STP offer path; underwriter notified via exception MI only.",
      },
      {
        heading: "Exception path",
        body: "Structural concern, active damp with timber risk, thatch/non-standard, HCR >180 days or incomplete photos, LTV >90%, or surveyor caveat “further investigation recommended” → queued for UW review; specialist instruction pack pre-built.",
      },
      {
        heading: "Consent & data sharing",
        body: "Seller grants multi-lender HCR reuse at listing. Buyer/lender access is purpose-limited, time-bound and logged (UK GDPR + Consumer Duty evidence).",
      },
    ],
  },
  {
    slug: "architecture",
    title: "System architecture",
    summary:
      "HCR Vault (evidence) → Features → Rules Engine (decision) → Instruction Bus (action).",
    sections: [
      {
        heading: "Logical flow",
        body: "HCR and property land in ingest; market, historic valuation and borrower enrich features; policy drives rules; explainability feeds UW/STP then instruction.",
        bullets: [
          "HCR Vault & schema mapper (RICS L2-aligned)",
          "Property Enrichment (UPRN, flood, mining, EPC)",
          "Market & Comp Engine",
          "Historic Valuation Store",
          "Configurable Rules / VRM Engine",
          "Confidence & Challenger Models",
          "Explainability & Audit Ledger",
          "Instruction Orchestrator (AVM / Desktop / Physical)",
        ],
      },
      {
        heading: "Integration surface",
        bullets: [
          "Lender LOS / mortgage origination APIs",
          "Broker platforms (DIP/FMA hooks)",
          "AVM providers",
          "Panel manager / CMS valuation firms",
          "Land Registry / Ordnance Survey",
          "Flood / Environment Agency overlays",
          "Document vault / e-sign for HCR consent",
        ],
      },
      {
        heading: "HCR data object (canonical)",
        table: {
          headers: ["Domain", "Example fields", "Risk use"],
          rows: [
            [
              "Identity",
              "UPRN, address, inspection date, surveyor RICS no.",
              "Currency & provenance gates",
            ],
            [
              "Characteristics",
              "Type, age band, construction, floors, tenure",
              "Non-standard / eligibility",
            ],
            [
              "Condition",
              "Element grades A–D/H, overall condition",
              "Primary score drivers",
            ],
            [
              "Defects",
              "Cat 1/2/3, location, remediation estimate",
              "Hard stops & uplifts",
            ],
            [
              "Damp / structure / roof",
              "Indicators, severity, further inv. flags",
              "Route to physical/specialist",
            ],
            [
              "Services",
              "Electrics, gas, drainage observations",
              "Safety & specialist triggers",
            ],
            [
              "Media",
              "Geo-tagged photos, annotated diagrams",
              "Desktop enablement / QA",
            ],
            [
              "Commentary",
              "Surveyor narrative, limitations, caveats",
              "NLP risk tags + UW context",
            ],
          ],
        },
      },
    ],
  },
  {
    slug: "rules-engine",
    title: "Rules engine design",
    summary:
      "VRM-style layers: data quality → hard gates → score → route bands → confidence uplift → mandate.",
    sections: [
      {
        heading: "Evaluation order",
        table: {
          headers: ["Layer", "Behaviour", "Example"],
          rows: [
            [
              "0. Data quality",
              "Fail closed if HCR incomplete / unverified surveyor",
              "Missing roof photos → cannot recommend No Val",
            ],
            [
              "1. Hard gates",
              "Force minimum route regardless of score",
              "Structural Cat 3 → Specialist minimum",
            ],
            [
              "2. Risk scoring",
              "0–100 property risk + confidence 0–1",
              "Damp + age + LTV contributions",
            ],
            [
              "3. Route bands",
              "Map score × LTV × product to route",
              "Score 22, LTV 70% → AVM",
            ],
            [
              "4. Confidence gate",
              "If confidence below threshold, uplift route one step",
              "AVM conf 0.71 → Desktop",
            ],
            [
              "5. Mandate / STP",
              "Auto-apply or queue by authority matrix",
              "Junior UW cannot approve No Val above £500k",
            ],
          ],
        },
      },
      {
        heading: "Rule anatomy",
        bullets: [
          "IF — conditions on features (HCR, property, market, borrower, product)",
          "THEN — action: add score, set floor route, block STP, require evidence",
          "BECAUSE — human-readable reason code for audit",
          "META — owner, effective dates, simulation impact, dual-control flag",
        ],
      },
      {
        heading: "HCR findings → risk direction",
        table: {
          headers: ["Finding", "Risk effect", "Typical route impact"],
          rows: [
            [
              "Structural movement / cracking Cat 3",
              "Hard uplift",
              "Specialist (structural)",
            ],
            [
              "Active rising/penetrating damp + timber",
              "Hard uplift",
              "Physical or Specialist",
            ],
            [
              "Roof covering failure / safety risk",
              "Hard uplift",
              "Physical minimum",
            ],
            [
              "Multiple Cat 2 defects, no Cat 3",
              "Score +15–25",
              "Desktop or Physical",
            ],
            [
              "Condition A/B, no damp, recent HCR",
              "Score −20–35",
              "Enables No Val / AVM",
            ],
            [
              "Complete geo-tagged photo set",
              "Confidence +0.1–0.2",
              "Supports Desktop over Physical",
            ],
          ],
        },
      },
      {
        heading: "Try it in the prototype",
        body: "Open the Rules workbench to click sample rules shaped like the VRM Phase 8 draft (nodes A→B→C→D).",
      },
    ],
  },
  {
    slug: "scoring",
    title: "Risk scoring model",
    summary:
      "Dual output: Property Risk Score (0–100) and Decision Confidence (0–1).",
    sections: [
      {
        heading: "Dual output",
        body: "Route selection uses both score and confidence. Confidence shortfalls force uplift even when score is low.",
      },
      {
        heading: "Score composition (illustrative)",
        table: {
          headers: ["Factor group", "Weight", "Inputs", "Notes"],
          rows: [
            [
              "HCR condition & defects",
              "35%",
              "Element grades, Cat 1–3, damp, structure, roof",
              "Largest single driver",
            ],
            [
              "HCR quality & currency",
              "15%",
              "Age of report, photo coverage, surveyor status",
              "Feeds confidence more than score",
            ],
            [
              "Collateral / LTV / product",
              "20%",
              "LTV, product type, loan size, BTL vs residential",
              "Hard gates often dominate",
            ],
            [
              "Property characteristics",
              "15%",
              "Age, construction, tenure, floors, location risk",
              "Non-standard construction",
            ],
            [
              "Market & historic valuation",
              "15%",
              "AVM FSD, comp depth, prior vals, price volatility",
              "Supports No Val / AVM",
            ],
          ],
        },
      },
      {
        heading: "Confidence calculation",
        body: "Confidence ≈ f(HCR completeness, surveyor assurance, photo coverage, data recency, AVM FSD/agreement, market liquidity, address match quality, model agreement between champion & challenger). Below lender threshold → automatic one-step route uplift and UW visibility.",
      },
    ],
  },
  {
    slug: "decision-trees",
    title: "Example decision trees",
    summary:
      "Product-specific trees: mainstream, high LTV, BTL, non-standard construction.",
    sections: [
      {
        heading: "Tree A — Mainstream residential",
        bullets: [
          "Prefer No Val / AVM when HCR strong and LTV ≤75%",
          "Desktop default for mid risk or thin comps",
          "Physical for condition C+, active damp, or high LTV",
        ],
      },
      {
        heading: "Tree B — High LTV / First-time buyer",
        bullets: [
          "No Val disabled above 85% LTV",
          "AVM only with HCR ≤60 days and Condition A",
          "Any Cat 2 roof/damp → Physical floor",
        ],
      },
      {
        heading: "Tree C — BTL / portfolio",
        bullets: [
          "HCR mandatory for HMO / multi-unit",
          "Desktop allowed with strong rental comps",
          "Specialist for HMOs failing fire/services observations",
        ],
      },
      {
        heading: "Tree D — Non-standard construction",
        bullets: [
          "AVM/No Val blocked for PRC, timber frame exceptions, thatch",
          "HCR used to scope specialist (not replace it)",
          "Desktop only for confirmed reinstated PRC with warranty",
        ],
      },
    ],
  },
  {
    slug: "lender-configs",
    title: "Example lender configurations",
    summary:
      "Same HCR, different appetite — high-street, building society, challenger packs.",
    sections: [
      {
        heading: "High-street residential (balanced)",
        body: "Optimises for speed with moderate physical reduction; No Val capped at 75% LTV.",
        table: {
          headers: ["Route", "Configuration summary"],
          rows: [
            [
              "No valuation",
              "LTV ≤70%, Cond A, HCR ≤60d, AVM conf ≥0.90, standard const.",
            ],
            ["AVM", "LTV ≤80%, Cond A/B, no active damp, HCR ≤90d"],
            ["Desktop", "LTV ≤90%, Cond B/C, photo coverage ≥0.85"],
            [
              "Physical",
              "Active damp OR Cond C with Cat2 roof OR LTV >90%",
            ],
            [
              "Specialist",
              "Structural Cat3 / non-standard / thatch / unresolved movement",
            ],
          ],
        },
      },
      {
        heading: "Building society (conservative)",
        body: "No Val disabled. Strong preference for Desktop when HCR present; physical still common above 85% LTV.",
        table: {
          headers: ["Route", "Configuration summary"],
          rows: [
            ["No valuation", "Not permitted"],
            ["AVM", "LTV ≤65%, Cond A only, dual AVM agreement"],
            ["Desktop", "Default when HCR ≤120d and no Cat3"],
            ["Physical", "LTV >85% or any damp indicator"],
            [
              "Specialist",
              "Same hard gates + local clay subsidence overlays",
            ],
          ],
        },
      },
      {
        heading: "Challenger digital lender (speed)",
        body: "Aggressive STP using HCR; specialist still hard-gated. Higher model monitoring burden.",
        table: {
          headers: ["Route", "Configuration summary"],
          rows: [
            [
              "No valuation",
              "LTV ≤75%, Cond A/B, HCR ≤45d, rich photos, flood low",
            ],
            ["AVM", "LTV ≤85% with HCR; auto-instruct if conf ≥0.85"],
            ["Desktop", "Thin comps OR Cond C without damp"],
            ["Physical", "Engine score >55 or confidence <0.70"],
            [
              "Specialist",
              "Structural / services unsafe / HMO fire flags",
            ],
          ],
        },
      },
    ],
  },
  {
    slug: "explainability",
    title: "Explainability & overrides",
    summary:
      "Decision objects for audit, plus mandate-aware underwriter overrides.",
    sections: [
      {
        heading: "Explainability object (per case)",
        table: {
          headers: ["Field", "Example"],
          rows: [
            ["decision_id", "dec_9f2a…"],
            ["recommended_route", "AVM"],
            ["risk_score / confidence", "24 / 0.88"],
            [
              "fired_rules",
              "HCR_FRESH, COND_B, AVM_CONF_OK, LTV_BAND_2",
            ],
            ["suppressed_routes", "No Val (LTV band policy)"],
            ["evidence_refs", "hcr_…, photos[12], avm_…"],
            ["model_versions", "policy RES-STD@3.4, scorer@1.12"],
          ],
        },
      },
      {
        heading: "Manual underwriter overrides",
        cards: [
          {
            title: "Within mandate",
            body: "Single-user override with reason code; immediate effect; sampled QA.",
          },
          {
            title: "Above mandate",
            body: "Dual control; case locked pending senior; engine recommendation preserved.",
          },
          {
            title: "System learning",
            body: "Track override → valuation delta → default proxy to retune weights.",
          },
        ],
      },
    ],
  },
  {
    slug: "risks-future",
    title: "Risks, regulation & future",
    summary:
      "Consumer Duty, PRA, surveyor reliance, GDPR — and where the product can go next.",
    sections: [
      {
        heading: "Risks & regulatory considerations",
        table: {
          headers: ["Theme", "Consideration", "Product mitigation"],
          rows: [
            [
              "FCA Consumer Duty",
              "Borrowers must not be harmed by opaque or unfair valuation routing",
              "Explainability, consistent policy application, outcome monitoring",
            ],
            [
              "PRA / IRB collateral",
              "Models and overrides must be governed; HCR is not a valuation unless policy says so",
              "Clear separation of condition evidence vs valuation opinion; model risk framework",
            ],
            [
              "Surveyor liability",
              "HCR prepared for sale may not be addressed to lender",
              "Reliance letters, terms of use, panel accreditation, purpose limitation",
            ],
            [
              "UK GDPR / DPA",
              "Seller data reused across lenders and buyers",
              "Consent orchestration, retention limits, access audit",
            ],
            [
              "Conflict / bias",
              "Seller-paid surveyor incentive risk",
              "QA sampling, anomaly detection, photo forensics, panel rotation",
            ],
            [
              "Stale evidence",
              "Property condition changes between HCR and completion",
              "Freshness gates, material change declarations, random re-inspect",
            ],
          ],
        },
      },
      {
        heading: "Future innovation",
        cards: [
          {
            title: "Near-term",
            body: "Industry HCR JSON standard; photo CV for damp/roof; desktop valuation in-platform; broker-visible route likelihood at DIP.",
          },
          {
            title: "Medium-term",
            body: "Continuous monitoring to completion; affordability joined to collateral risk; shared HCR passport; parametric insurance from defect classes.",
          },
          {
            title: "Advanced decisioning",
            body: "Challenger ML constrained by rules floors; causal uplift for inspect vs not; synthetic comps with uncertainty bands.",
          },
          {
            title: "Ecosystem",
            body: "Agent CMS plugins at listing; conveyancer defect escrow; green retrofit overlays linked to EPC + HCR.",
          },
        ],
      },
      {
        heading: "Adoption path",
        body: "Start with remortgage + low-LTV purchase pilots using panel-issued HCRs, measure physical inspection reduction and down-valuation avoidance, then extend to purchase-at-listing once reliance wording and data standards are settled.",
      },
    ],
  },
  {
    slug: "design-answers",
    title: "Design question answers",
    summary: "Quick reference answers to the eight original design questions.",
    sections: [
      {
        heading: "Answers",
        table: {
          headers: ["#", "Question", "Answer"],
          rows: [
            [
              "1",
              "How is HCR incorporated?",
              "Canonical evidence object scored before valuation instruction; gates currency, completeness and defect severity.",
            ],
            [
              "2",
              "What increases risk?",
              "Structural Cat 3, active damp/timber, roof failure, unsafe services, non-standard construction, incomplete media, surveyor caveats.",
            ],
            [
              "3",
              "What reduces inspection need?",
              "Recent Condition A/B HCR, no further-investigation flags, strong photo set, high AVM agreement, low LTV, stable comps.",
            ],
            [
              "4",
              "How are lender rules configured?",
              "Versioned policy packs: gates → weights → route bands → confidence uplift → mandate.",
            ],
            [
              "5",
              "What explainability?",
              "Fired rules, contributions, evidence refs, suppressed routes, model versions.",
            ],
            [
              "6",
              "How is confidence calculated?",
              "Blend of HCR quality, recency, identity match, market/AVM certainty, champion/challenger agreement.",
            ],
            [
              "7",
              "How do overrides work?",
              "Reason-coded, mandate-aware, dual-controlled when needed, closed-loop to MI.",
            ],
            [
              "8",
              "Regulatory considerations?",
              "Consumer Duty, PRA model risk, surveyor reliance, GDPR consent, seller-pay bias, staleness.",
            ],
          ],
        },
      },
    ],
  },
];

export function getDoc(slug: string) {
  return DOCS.find((d) => d.slug === slug);
}
