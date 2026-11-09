import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useSession } from "../session";
import { OrgSwitcher } from "./OrgSwitcher";

const links = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/queue", label: "Queue", end: false },
  { to: "/rules", label: "Rules", end: false },
  { to: "/mi", label: "MI", end: false },
  { to: "/docs", label: "Docs", end: false },
  { to: "/explore", label: "Explore", end: false },
];

export function Shell() {
  const { authenticated, user, logout } = useSession();
  const navigate = useNavigate();

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-shell">
      <aside className="nav">
        <div className="brand">
          <div className="brand-mark">Keystone</div>
          <div className="brand-sub">Property risk · UK mortgages</div>
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
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="nav-footer">
          Signed in as {user.name}
          <br />
          Prototype only · company &amp; branch switcher
        </div>
      </aside>
      <div className="main-column">
        <header className="top-nav" aria-label="Top">
          <div className="top-nav-brand">Keystone</div>
          <nav className="top-nav-links">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `top-nav-link${isActive ? " active" : ""}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="top-nav-actions">
            <OrgSwitcher />
            <div className="top-nav-user">
              <div className="top-nav-user-name">{user.name}</div>
              <div className="tiny muted">{user.role}</div>
            </div>
            <button
              type="button"
              className="btn btn-sm btn-ghost"
              onClick={() => {
                logout();
                navigate("/login", { replace: true });
              }}
            >
              Sign out
            </button>
          </div>
        </header>
        <main className="main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
