import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="dashboard-sidebar">
      <h3>Workspace</h3>

      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          isActive ? "removeLine active" : "removeLine"
        }
      >
        <span>🏠</span>
        <span>Dashboard</span>
      </NavLink>

      <NavLink
        to="/leadlistscreen"
        className={({ isActive }) =>
          isActive ? "removeLine active" : "removeLine"
        }
      >
        <span>📋</span>
        <span>Leads</span>
      </NavLink>

      <NavLink
        to="/salesagentmanagementscreen"
        className={({ isActive }) =>
          isActive ? "removeLine active" : "removeLine"
        }
      >
        <span>👤</span>
        <span>Agents</span>
      </NavLink>

      <NavLink
        to="/reportscreen"
        className={({ isActive }) =>
          isActive ? "removeLine active" : "removeLine"
        }
      >
        <span>📊</span>
        <span>Reports</span>
      </NavLink>

      <NavLink
        to="/settings"
        className={({ isActive }) =>
          isActive ? "removeLine active" : "removeLine"
        }
      >
        <span>⚙️</span>
        <span>Settings</span>
      </NavLink>
    </aside>
  );
};

export default Sidebar;