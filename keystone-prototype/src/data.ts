export type Route =
  | "No valuation"
  | "AVM"
  | "Desktop"
  | "Physical"
  | "Specialist";

export type CaseItem = {
  id: string;
  address: string;
  product: string;
  ltv: string;
  loan: string;
  risk: number;
  conf: number;
  route: Route;
  hcrDays: number;
  condition: string;
  damp: string;
  status: "Ready" | "Needs review" | "Overdue";
  why: string[];
};

export const CASES: CaseItem[] = [
  {
    id: "KS-10428",
    address: "14 Maple Road, Bristol BS6 5NT",
    product: "5y Fixed · Purchase",
    ltv: "72%",
    loan: "£286,000",
    risk: 24,
    conf: 0.88,
    route: "AVM",
    hcrDays: 42,
    condition: "B",
    damp: "None",
    status: "Ready",
    why: [
      "Condition B · no Cat 3 defects",
      "No active damp · roof fair",
      "AVM confidence 0.91 · 14 comps",
      "Policy RES-STD v3.4 → AVM band",
    ],
  },
  {
    id: "KS-10431",
    address: "3 Lea Close, Manchester M14 7QP",
    product: "2y Fixed · Purchase",
    ltv: "89%",
    loan: "£214,000",
    risk: 61,
    conf: 0.71,
    route: "Physical",
    hcrDays: 18,
    condition: "C",
    damp: "Active",
    status: "Needs review",
    why: [
      "Active damp + timber risk flag",
      "LTV 89% above desktop ceiling",
      "Condition C · Cat 2 roof covering",
      "Hard gate → Physical minimum",
    ],
  },
  {
    id: "KS-10419",
    address: "88 Quay Street, Cardiff CF10 1EA",
    product: "BTL · Remortgage",
    ltv: "65%",
    loan: "£310,000",
    risk: 78,
    conf: 0.64,
    route: "Specialist",
    hcrDays: 11,
    condition: "D",
    damp: "Historic",
    status: "Overdue",
    why: [
      "Structural Cat 3 · movement noted",
      "Surveyor: further investigation",
      "Non-standard rear extension",
      "Hard gate → Specialist",
    ],
  },
];

export type VrmRule = {
  id: string;
  group: "AVM eligibility" | "High-LTV risk flags" | "AVM pass" | "Desktop routing";
  name: string;
  question: string;
  ifYes: string;
  ifNo: string;
  node: string;
  tunable?: "priceCap" | "avmCl" | "flatLtv" | "valueCap";
};

export const VRM_RULES: VrmRule[] = [
  {
    id: "price-band",
    group: "AVM eligibility",
    name: "Purchase price band",
    question: "Is the purchase price ≥ £50k and ≤ £1.3m?",
    ifYes: "Continue AVM path (call AVM)",
    ifNo: "Exit AVM · route to Desktop / Physical tree",
    node: "A",
    tunable: "priceCap",
  },
  {
    id: "scheme-gates",
    group: "AVM eligibility",
    name: "Scheme & instruction exclusions",
    question:
      "Is it a reinspection, Homebuyers / Level 2 / SS / Level 3, shared equity, shared ownership, or new build?",
    ifYes: "Do not call AVM · go to Desktop / specialist path",
    ifNo: "Stay on AVM ruleset",
    node: "A",
  },
  {
    id: "high-ltv-flags",
    group: "High-LTV risk flags",
    name: "High LTV attribute risks",
    question:
      "LTV > 90% AND (bedrooms > 5 OR large plot OR listed OR coastal erosion OR high subsidence OR enviro data unavailable)?",
    ifYes: "Fail AVM gate · escalate toward Desktop / Physical",
    ifNo: "Continue AVM checks",
    node: "A→B",
  },
  {
    id: "avm-cl",
    group: "AVM pass",
    name: "AVM confidence level",
    question: "Is AVM CL ≥ 2.0? (BTL also needs rental CL ≥ 2.0)",
    ifYes: "Eligible for AVM pass (subject to LTV / caps)",
    ifNo: "Go to Desktop ruleset (B)",
    node: "B",
    tunable: "avmCl",
  },
  {
    id: "flat-ltv",
    group: "AVM pass",
    name: "Flat high-LTV floor",
    question: "Is the property a flat AND LTV ≥ 85.01%?",
    ifYes: "Panel 100% to lender Desktop (skip AVM pass)",
    ifNo: "Continue AVM / Desktop banding",
    node: "B",
    tunable: "flatLtv",
  },
  {
    id: "value-cap",
    group: "Desktop routing",
    name: "Value & loan caps",
    question: "Property > £1.3m OR advance ≥ £900k?",
    ifYes: "Leave AVM · Desktop / Physical by product band",
    ifNo: "Remain eligible for lighter route",
    node: "B→C",
    tunable: "valueCap",
  },
  {
    id: "third-party-dv",
    group: "Desktop routing",
    name: "3rd-party desktop (Connells DV)",
    question:
      "LTV ≤ 95%, not transcription, and within 3rd-party value/loan caps (e.g. not flat > £1.5m / BTL > £665k)?",
    ifYes: "Panel to Connells as Desktop Valuation (C)",
    ifNo: "Instruct physical valuation (D) or specialist path",
    node: "C→D",
  },
];

export function statusTone(status: CaseItem["status"]) {
  if (status === "Ready") return "ok";
  if (status === "Needs review") return "warn";
  return "danger";
}

export function riskTone(risk: number) {
  if (risk > 55) return "danger";
  if (risk > 35) return "warn";
  return "ok";
}
