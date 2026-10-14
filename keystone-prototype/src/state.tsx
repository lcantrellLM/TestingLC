import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Route } from "./data";

type Ctx = {
  overrides: Record<string, Route | undefined>;
  setOverride: (caseId: string, route: Route | null) => void;
};

const CaseCtx = createContext<Ctx | null>(null);

export function CaseProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useState<Record<string, Route | undefined>>(
    {},
  );

  const value = useMemo<Ctx>(
    () => ({
      overrides,
      setOverride: (caseId, route) => {
        setOverrides((prev) => {
          const next = { ...prev };
          if (route == null) delete next[caseId];
          else next[caseId] = route;
          return next;
        });
      },
    }),
    [overrides],
  );

  return <CaseCtx.Provider value={value}>{children}</CaseCtx.Provider>;
}

export function useCaseState() {
  const ctx = useContext(CaseCtx);
  if (!ctx) throw new Error("useCaseState must be used within CaseProvider");
  return ctx;
}
