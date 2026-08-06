import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>SQL Analytics</h2>

      <ul>
        <li><NavLink to="/">Dashboard</NavLink></li>
        <li><NavLink to="/upload">Upload CSV</NavLink></li>
        <li><NavLink to="/query">Query Editor</NavLink></li>
        <li><NavLink to="/history">Query History</NavLink></li>
        <li><NavLink to="/top-queries">Top Queries</NavLink></li>
        <li><NavLink to="/export">Export</NavLink></li>
      </ul>
    </aside>
  );
}

export default Sidebar;