import { useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();

  const pageTitles: Record<string, string> = {
    "/": "Dashboard",
    "/sql": "SQL Workspace",
    "/upload": "Upload Dataset",
    "/history": "Query History",
    "/top-queries": "Top Queries",
    "/export": "Export Data",
  };

  const currentPage =
    pageTitles[location.pathname] || "SQL Analytics Platform";

  return (
    <header className="navbar">
      <div>
        <h1>SQL Analytics Platform</h1>
        <p>{currentPage}</p>
      </div>
    </header>
  );
}

export default Navbar;