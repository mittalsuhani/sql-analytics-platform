import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/Layout/Sidebar";
import Navbar from "./components/Layout/Navbar";

import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Query from "./pages/Query";
import History from "./pages/History";
import TopQueries from "./pages/TopQueries";
import Export from "./pages/Export";

import "./App.css";

function App() {
  return (
    <div className="app">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div className="page">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/query" element={<Query />} />
            <Route path="/history" element={<History />} />
            <Route path="/top-queries" element={<TopQueries />} />
            <Route path="/export" element={<Export />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;