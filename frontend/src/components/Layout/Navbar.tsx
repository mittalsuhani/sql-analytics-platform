import { useLocation } from "react-router-dom";
import { FaDatabase } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();

  const pageNames: Record<string, string> = {
    "/": "Dashboard",
    "/sql": "SQL Workspace",
    "/upload": "Upload Dataset",
    "/query": "Query Editor",
    "/history": "Query History",
    "/top-queries": "Top Queries",
    "/export": "Export Data",
  };

  const currentPage =
    pageNames[location.pathname] || "SQL Analytics";

  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">
          <FaDatabase />
        </div>

        <div className="navbar-brand">
          <h2>SQL Analytics Platform</h2>
          <span>Data intelligence workspace</span>
        </div>
      </div>

      <div className="navbar-center">
        <span className="page-label">
          {currentPage}
        </span>
      </div>

      <div className="navbar-right">
        <div className="workspace-status">
          <span className="status-dot"></span>
          <span>Workspace</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;