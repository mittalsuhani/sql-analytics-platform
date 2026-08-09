import { useState } from "react";
import api from "../api/api";

function Export() {
  const [query, setQuery] = useState("SELECT * FROM sales;");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleExport = async () => {
    if (!query.trim()) {
      setError("Please enter a SQL query.");
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await api.post(
        "/query/export",
        {
          query: query,
        },
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], {
        type: "text/csv",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "query_results.csv";

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

      setMessage("CSV exported successfully!");
    } catch (err: any) {
      console.error("Export error:", err);

      setError("Unable to export query results.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      <h1>Export Data</h1>

      <div
        style={{
          padding: "25px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          background: "#fff",
        }}
      >
        <h2>Export Query Results</h2>

        <p style={{ color: "#666" }}>
          Enter a SQL query and download its results as a CSV file.
        </p>

        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={8}
          style={{
            width: "100%",
            padding: "12px",
            boxSizing: "border-box",
            fontFamily: "monospace",
            fontSize: "15px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            resize: "vertical",
          }}
        />

        <button
          onClick={handleExport}
          disabled={loading}
          style={{
            marginTop: "15px",
            padding: "12px 24px",
            border: "none",
            borderRadius: "6px",
            background: "#1976d2",
            color: "white",
            fontSize: "16px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Exporting..." : "Export CSV"}
        </button>

        {message && (
          <p
            style={{
              marginTop: "15px",
              color: "green",
            }}
          >
            {message}
          </p>
        )}

        {error && (
          <p
            style={{
              marginTop: "15px",
              color: "red",
            }}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default Export;