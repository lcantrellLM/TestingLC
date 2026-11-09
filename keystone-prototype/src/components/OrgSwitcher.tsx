import { useEffect, useId, useRef, useState } from "react";
import { BRANCHES, casesForBranch, getCompany } from "../data";
import { useSession } from "../session";

export function OrgSwitcher() {
  const { company, branch, companies, setBranch } = useSession();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const labelId = useId();

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="org-switcher" ref={rootRef}>
      <button
        type="button"
        className="org-switcher-trigger"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={labelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="org-switcher-copy">
          <span className="org-switcher-company">{company.shortName}</span>
          <span className="org-switcher-branch">{branch.name}</span>
        </span>
        <span className="org-switcher-chevron" aria-hidden>
          ▾
        </span>
      </button>

      {open ? (
        <div
          id={labelId}
          className="org-switcher-panel"
          role="dialog"
          aria-label="Switch company or branch"
        >
          {companies.map((c) => {
            const desks = BRANCHES.filter((b) => b.companyId === c.id);
            return (
              <div key={c.id} className="org-switcher-section">
                <div className="org-switcher-label">{c.name}</div>
                <div
                  className="org-switcher-options"
                  role="listbox"
                  aria-label={`${c.shortName} branches`}
                >
                  {desks.map((b) => {
                    const count = casesForBranch(b.id).length;
                    const active = b.id === branch.id;
                    return (
                      <button
                        key={b.id}
                        type="button"
                        role="option"
                        aria-selected={active}
                        className={`org-switcher-option${active ? " active" : ""}`}
                        onClick={() => {
                          setBranch(b.id);
                          setOpen(false);
                        }}
                      >
                        <span>{b.name}</span>
                        <span className="tiny muted">
                          {getCompany(b.companyId)?.shortName} · {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
