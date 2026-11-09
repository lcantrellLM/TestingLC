import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  BRANCHES,
  COMPANIES,
  DEMO_USER,
  branchesForCompany,
  getBranch,
  getCompany,
  type Branch,
  type Company,
} from "./data";

const STORAGE_KEY = "keystone.session.v1";

type StoredSession = {
  authenticated: boolean;
  companyId: string;
  branchId: string;
};

type SessionCtx = {
  authenticated: boolean;
  user: typeof DEMO_USER;
  company: Company;
  branch: Branch;
  companies: Company[];
  branches: Branch[];
  login: (email: string, password: string) => { ok: true } | { ok: false; error: string };
  enterDemo: () => void;
  logout: () => void;
  setCompany: (companyId: string) => void;
  setBranch: (branchId: string) => void;
};

const SessionContext = createContext<SessionCtx | null>(null);

function readStored(): StoredSession | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredSession;
  } catch {
    return null;
  }
}

function writeStored(session: StoredSession | null) {
  if (!session) {
    sessionStorage.removeItem(STORAGE_KEY);
    return;
  }
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

function defaultBranchForCompany(companyId: string) {
  return branchesForCompany(companyId)[0]?.id ?? BRANCHES[0].id;
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const stored = readStored();
  const initialCompanyId =
    stored?.companyId && getCompany(stored.companyId)
      ? stored.companyId
      : COMPANIES[0].id;
  const initialBranchId =
    stored?.branchId &&
    getBranch(stored.branchId)?.companyId === initialCompanyId
      ? stored.branchId
      : defaultBranchForCompany(initialCompanyId);

  const [authenticated, setAuthenticated] = useState(
    Boolean(stored?.authenticated),
  );
  const [companyId, setCompanyId] = useState(initialCompanyId);
  const [branchId, setBranchId] = useState(initialBranchId);

  const persist = (next: {
    authenticated: boolean;
    companyId: string;
    branchId: string;
  }) => {
    writeStored(next);
  };

  const value = useMemo<SessionCtx>(() => {
    const company = getCompany(companyId) ?? COMPANIES[0];
    const branch =
      getBranch(branchId) ??
      branchesForCompany(company.id)[0] ??
      BRANCHES[0];
    const companies = COMPANIES.filter((c) =>
      DEMO_USER.companyIds.includes(c.id),
    );
    const branches = branchesForCompany(company.id);

    return {
      authenticated,
      user: DEMO_USER,
      company,
      branch,
      companies,
      branches,
      login: (email, password) => {
        if (!email.trim() || !password.trim()) {
          return { ok: false, error: "Enter email and password to continue." };
        }
        const nextBranch = defaultBranchForCompany(COMPANIES[0].id);
        setAuthenticated(true);
        setCompanyId(COMPANIES[0].id);
        setBranchId(nextBranch);
        persist({
          authenticated: true,
          companyId: COMPANIES[0].id,
          branchId: nextBranch,
        });
        return { ok: true };
      },
      enterDemo: () => {
        const nextBranch = defaultBranchForCompany(COMPANIES[0].id);
        setAuthenticated(true);
        setCompanyId(COMPANIES[0].id);
        setBranchId(nextBranch);
        persist({
          authenticated: true,
          companyId: COMPANIES[0].id,
          branchId: nextBranch,
        });
      },
      logout: () => {
        setAuthenticated(false);
        writeStored(null);
      },
      setCompany: (nextCompanyId) => {
        const nextBranch = defaultBranchForCompany(nextCompanyId);
        setCompanyId(nextCompanyId);
        setBranchId(nextBranch);
        persist({
          authenticated: true,
          companyId: nextCompanyId,
          branchId: nextBranch,
        });
      },
      setBranch: (nextBranchId) => {
        const target = getBranch(nextBranchId);
        if (!target) return;
        setCompanyId(target.companyId);
        setBranchId(nextBranchId);
        persist({
          authenticated: true,
          companyId: target.companyId,
          branchId: nextBranchId,
        });
      },
    };
  }, [authenticated, companyId, branchId]);

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within SessionProvider");
  return ctx;
}
