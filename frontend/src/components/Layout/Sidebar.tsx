import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">
        SQL Analytics
      </div>

      <ul className="sidebar-menu">
        <li>
          <NavLink to="/" end>
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/sql">
            SQL Workspace
          </NavLink>
        </li>

        <li>
          <NavLink to="/upload">
            Upload Dataset
          </NavLink>
        </li>

        <li>
          <NavLink to="/history">
            Query History
          </NavLink>
        </li>

        <li>
          <NavLink to="/top-queries">
            Top Queries
          </NavLink>
        </li>

        <li>
          <NavLink to="/export">
            Export Data
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;