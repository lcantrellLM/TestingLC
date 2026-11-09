import { useEffect, useId, useRef, useState } from "react";
import { casesForBranch } from "../data";
import { useSession } from "../session";

export function OrgSwitcher() {
  const {
    company,
    branch,
    companies,
    branches,
    setCompany,
    setBranch,
  } = useSession();
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
          <span className="org-switcher-kicker">Company / branch</span>
          <span className="org-switcher-value">
            {company.shortName} · {branch.name}
          </span>
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
          <div className="org-switcher-section">
            <div className="org-switcher-label">Company</div>
            <div className="org-switcher-options" role="listbox" aria-label="Company">
              {companies.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  role="option"
                  aria-selected={c.id === company.id}
                  className={`org-switcher-option${c.id === company.id ? " active" : ""}`}
                  onClick={() => setCompany(c.id)}
                >
                  <span>{c.name}</span>
                  <span className="tiny muted">{c.shortName}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="org-switcher-section">
            <div className="org-switcher-label">Branch</div>
            <div className="org-switcher-options" role="listbox" aria-label="Branch">
              {branches.map((b) => {
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
                      {b.region} · {count} cases
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
