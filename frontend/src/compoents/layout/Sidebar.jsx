import { NavLink } from "react-router-dom";
const nav = [
  ["⌂", "Overview", "/"],
  ["▰", "Endpoints", "/endpoints"],
  ["⚙", "Settings", "/settings"],
  ["", "Logout", "/logout"],
];
export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-mark">✦</span>
        <span>API Sentinel</span>
      </div>
      <nav>
        {nav.map(([i, n, to]) => (
          <NavLink end={to === "/"} key={n} to={to} className="nav-link">
            <b>{i}</b>
            {n}
          </NavLink>
        ))}
      </nav>
      <div className="side-foot">
        <span>⌁</span>
        <strong>
          API Monitoring
          <br />
          Platform
        </strong>
        <small>v1.0.0</small>
      </div>
    </aside>
  );
}
