import { NavLink, Outlet } from "react-router-dom";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/queue", label: "Queue" },
  { to: "/rules", label: "Rules" },
  { to: "/mi", label: "MI" },
];

export function Shell() {
  return (
    <div className="app-shell">
      <aside className="nav">
        <div className="brand">
          <div className="brand-mark">Keystone</div>
          <div className="brand-sub">Property risk · UK mortgages</div>
        </div>
        <nav className="nav-links">
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
          Prototype only · VRM-inspired rules · HCR-first routing
        </div>
      </aside>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
