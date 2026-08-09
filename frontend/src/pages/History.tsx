import { useEffect, useState } from "react";
import api from "../api/api";

interface QueryHistory {
  id: number;
  query: string;
  execution_time_ms: number;
  executed_at: string;
}

function History() {
  const [queries, setQueries] = useState<QueryHistory[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchHistory = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/history");

      setQueries(response.data);
    } catch (err) {
      console.error(err);
      setError("Unable to load query history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const filteredQueries = queries.filter((item) =>
    item.query.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div style={{ padding: "30px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>Query History</h1>

        <button
          onClick={fetchHistory}
          style={{
            padding: "10px 18px",
            borderRadius: "6px",
            border: "none",
            background: "#1976d2",
            color: "white",
            cursor: "pointer",
          }}
        >
          Refresh
        </button>
      </div>

      <input
        type="text"
        placeholder="Search queries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "20px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          boxSizing: "border-box",
        }}
      />

      {loading && <p>Loading history...</p>}

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {!loading && !error && filteredQueries.length === 0 && (
        <p>No queries found.</p>
      )}

      {!loading && !error && filteredQueries.length > 0 && (
        <div
          style={{
            overflowX: "auto",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th style={headerStyle}>ID</th>
                <th style={headerStyle}>Query</th>
                <th style={headerStyle}>Execution Time</th>
                <th style={headerStyle}>Executed At</th>
              </tr>
            </thead>

            <tbody>
              {filteredQueries.map((item) => (
                <tr key={item.id}>
                  <td style={cellStyle}>{item.id}</td>

                  <td
                    style={{
                      ...cellStyle,
                      fontFamily: "monospace",
                    }}
                  >
                    {item.query}
                  </td>

                  <td style={cellStyle}>
                    {Number(item.execution_time_ms).toFixed(2)} ms
                  </td>

                  <td style={cellStyle}>
                    {formatDate(item.executed_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && (
        <p style={{ marginTop: "15px", color: "#666" }}>
          Showing {filteredQueries.length} of {queries.length} queries
        </p>
      )}
    </div>
  );
}

const headerStyle = {
  padding: "12px",
  textAlign: "left" as const,
  borderBottom: "2px solid #ddd",
  background: "#f5f5f5",
};

const cellStyle = {
  padding: "12px",
  borderBottom: "1px solid #eee",
};

export default History;