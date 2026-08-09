import { useState } from "react";
import Editor from "@monaco-editor/react";
import api from "../api/api";

interface QueryResults {
  columns: string[];
  rows: any[][];
}

function SQLWorkspace() {
  const [query, setQuery] = useState("SELECT * FROM sales;");
  const [results, setResults] = useState<QueryResults | null>(null);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const executeQuery = async () => {
    if (!query.trim()) {
      setError("Please enter a SQL query.");
      return;
    }

    setLoading(true);
    setError("");
    setResults(null);
    setExecutionTime(null);

    const startTime = performance.now();

    try {
      const response = await api.post("/query", {
        query: query,
      });

      const endTime = performance.now();

      setExecutionTime(
        Number((endTime - startTime).toFixed(2))
      );

      setResults(response.data);
    } catch (err: any) {
      console.error("Query error:", err);

      setExecutionTime(null);

      if (err.response) {
        setError(
          err.response.data?.detail ||
            "Query execution failed."
        );
      } else {
        setError("Unable to connect to the server.");
      }
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setResults(null);
    setError("");
    setExecutionTime(null);
  };

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <h1>SQL Workspace</h1>

      {/* SQL Editor */}
      <div
        style={{
          border: "1px solid #333",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <Editor
          height="300px"
          defaultLanguage="sql"
          theme="vs-dark"
          value={query}
          onChange={(value) => setQuery(value || "")}
          options={{
            minimap: {
              enabled: false,
            },
            fontSize: 16,
            automaticLayout: true,
            wordWrap: "on",
          }}
        />
      </div>

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "15px",
        }}
      >
        <button
          onClick={executeQuery}
          disabled={loading}
          style={{
            padding: "10px 20px",
            borderRadius: "6px",
            border: "none",
            background: "#1976d2",
            color: "white",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "16px",
          }}
        >
          {loading ? "Executing..." : "Execute Query"}
        </button>

        <button
          onClick={clearResults}
          style={{
            padding: "10px 20px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            background: "white",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Clear Results
        </button>
      </div>

      {/* Error */}
      {error && (
        <p
          style={{
            color: "red",
            marginTop: "15px",
          }}
        >
          {error}
        </p>
      )}

      {/* Results */}
      {results && (
        <div style={{ marginTop: "30px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <h2>Query Results</h2>

            <span style={{ color: "#666" }}>
              {results.rows.length} row
              {results.rows.length !== 1 ? "s" : ""} returned
              {executionTime !== null &&
                ` • ${executionTime} ms`}
            </span>
          </div>

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
                  {results.columns.map((column) => (
                    <th
                      key={column}
                      style={{
                        padding: "12px",
                        textAlign: "left",
                        borderBottom: "2px solid #ddd",
                        background: "#f5f5f5",
                      }}
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {results.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((value, columnIndex) => (
                      <td
                        key={columnIndex}
                        style={{
                          padding: "12px",
                          borderBottom: "1px solid #eee",
                        }}
                      >
                        {value === null
                          ? "NULL"
                          : String(value)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default SQLWorkspace;