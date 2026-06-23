import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { to: "/dashboard", end: true, icon: "🏠", label: "Dashboard" },
  { to: "/leadlistscreen", icon: "📋", label: "Leads" },
  { to: "/salesagentmanagementscreen", icon: "👤", label: "Agents" },
  { to: "/reportscreen", icon: "📊", label: "Reports" },
  { to: "/settings", icon: "⚙️", label: "Settings" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    closeMenu();
    navigate("/");
  };

  return (
    <>
      <button
        type="button"
        className="mobile-menu-toggle"
        onClick={() => setIsMenuOpen((open) => !open)}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
      >
        <span className="mobile-menu-toggle-icon" aria-hidden="true">
          {isMenuOpen ? "✕" : "☰"}
        </span>
      </button>

      {isMenuOpen && (
        <button
          type="button"
          className="mobile-menu-backdrop"
          onClick={closeMenu}
          aria-label="Close menu"
        />
      )}

      <aside
        className={`dashboard-sidebar${isMenuOpen ? " dashboard-sidebar--open" : ""}`}
      >
        <div className="sidebar-header">
          <h3>Navigation</h3>
          <button
            type="button"
            className="sidebar-close-btn"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {navItems.map(({ to, end, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              isActive ? "removeLine active" : "removeLine"
            }
            onClick={closeMenu}
          >
            <span>{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}

        <button
          type="button"
          className="removeLine sidebar-logout"
          onClick={handleLogout}
        >
          <span>🚪</span>
          <span>Log out</span>
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
