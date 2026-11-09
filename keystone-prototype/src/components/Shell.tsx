import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useSession } from "../session";
import { OrgSwitcher } from "./OrgSwitcher";

const links = [
  { to: "/", label: "Cases", end: true },
  { to: "/queue", label: "Tasks", end: false },
  { to: "/docs", label: "Help", end: false },
];

export function Shell() {
  const {
    authenticated,
    user,
    company,
    branch,
    companies,
    branches,
    setCompany,
    setBranch,
    logout,
  } = useSession();
  const navigate = useNavigate();

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-shell">
      <aside className="nav">
        <div className="brand">
          <div className="brand-row">
            <span className="brand-mark">Vantage</span>
            <span className="brand-dot" aria-hidden />
            <span className="brand-product">CaseManager</span>
          </div>
        </div>
        <nav className="nav-links" aria-label="Primary">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `nav-link${isActive ? " active" : ""}`
              }
            >
              <span className="nav-ico" aria-hidden>
                {l.label === "Cases" ? "📁" : l.label === "Tasks" ? "☑" : "?"}
              </span>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="nav-footer">Clickable prototype · sample data</div>
      </aside>

      <div className="main-column">
        <header className="top-nav" aria-label="Top">
          <OrgSwitcher />
          <div className="top-nav-spacer" />
          <div className="top-nav-actions">
            <button type="button" className="icon-btn" aria-label="Search">
              ⌕
            </button>
            <div className="avatar" title={user.name}>
              {user.initials}
            </div>
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => {
                logout();
                navigate("/login", { replace: true });
              }}
            >
              Sign out
            </button>
          </div>
        </header>

        <div className="org-bar" aria-label="Company and branch switch">
          <div className="org-bar-row">
            <span className="view-as-label">Company</span>
            <div className="view-as-pills" role="listbox" aria-label="Company">
              {companies.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  role="option"
                  aria-selected={c.id === company.id}
                  className={`view-as-pill${c.id === company.id ? " active" : ""}`}
                  onClick={() => setCompany(c.id)}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
          <div className="org-bar-row">
            <span className="view-as-label">Branch</span>
            <div className="view-as-pills" role="listbox" aria-label="Branch">
              {branches.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  role="option"
                  aria-selected={b.id === branch.id}
                  className={`view-as-pill${b.id === branch.id ? " active" : ""}`}
                  onClick={() => setBranch(b.id)}
                >
                  {b.name}
                  <span className="pill-meta">{b.region}</span>
                </button>
              ))}
            </div>
            <span className="view-as-hint">
              Cases filtered to {company.shortName} · {branch.name}
            </span>
          </div>
        </div>

        <main className="main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
