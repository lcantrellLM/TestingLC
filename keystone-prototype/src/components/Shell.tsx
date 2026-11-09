import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { BRANCHES, deskLabel } from "../data";
import { useSession } from "../session";

const links = [
  { to: "/", label: "Cases", end: true },
  { to: "/queue", label: "Tasks", end: false },
  { to: "/docs", label: "Help", end: false },
];

export function Shell() {
  const { authenticated, user, company, branch, setBranch, logout } =
    useSession();
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

        <div className="view-as-bar" aria-label="Company and branch switcher">
          <span className="view-as-label">View as</span>
          <div className="view-as-pills">
            {BRANCHES.map((b) => (
              <button
                key={b.id}
                type="button"
                className={`view-as-pill${b.id === branch.id ? " active" : ""}`}
                aria-pressed={b.id === branch.id}
                onClick={() => setBranch(b.id)}
              >
                {deskLabel(b)}
              </button>
            ))}
          </div>
          <span className="view-as-hint">
            Branch-filtered case list · {company.shortName}
          </span>
        </div>

        <main className="main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
