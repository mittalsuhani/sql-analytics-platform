import { useEffect, useState } from "react";
import api from "../api/api";

interface QueryHistory {
  id: number;
  query: string;
  execution_time_ms: number;
  executed_at: string;
}

interface TopQuery {
  query: string;
  count: number;
  averageTime: number;
  fastestTime: number;
  slowestTime: number;
}

function TopQueries() {
  const [topQueries, setTopQueries] = useState<TopQuery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTopQueries = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/history");

      const history: QueryHistory[] = response.data;

      const queryMap = new Map<
        string,
        {
          count: number;
          totalTime: number;
          fastestTime: number;
          slowestTime: number;
        }
      >();

      history.forEach((item) => {
        const query = item.query.trim();
        const executionTime = Number(item.execution_time_ms);

        if (!queryMap.has(query)) {
          queryMap.set(query, {
            count: 0,
            totalTime: 0,
            fastestTime: executionTime,
            slowestTime: executionTime,
          });
        }

        const current = queryMap.get(query)!;

        current.count += 1;
        current.totalTime += executionTime;
        current.fastestTime = Math.min(
          current.fastestTime,
          executionTime
        );
        current.slowestTime = Math.max(
          current.slowestTime,
          executionTime
        );
      });

      const result: TopQuery[] = Array.from(
        queryMap.entries()
      )
        .map(([query, data]) => ({
          query,
          count: data.count,
          averageTime: data.totalTime / data.count,
          fastestTime: data.fastestTime,
          slowestTime: data.slowestTime,
        }))
        .sort((a, b) => b.count - a.count);

      setTopQueries(result);
    } catch (err) {
      console.error("Top queries error:", err);
      setError("Unable to load top queries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopQueries();
  }, []);

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <div>
          <h1>Top Queries</h1>
          <p style={{ color: "#666" }}>
            Most frequently executed SQL queries
          </p>
        </div>

        <button
          onClick={fetchTopQueries}
          disabled={loading}
          style={{
            padding: "10px 18px",
            borderRadius: "6px",
            border: "none",
            background: "#1976d2",
            color: "white",
            cursor: loading
              ? "not-allowed"
              : "pointer",
          }}
        >
          Refresh
        </button>
      </div>

      {loading && (
        <p>Loading top queries...</p>
      )}

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {!loading &&
        !error &&
        topQueries.length === 0 && (
          <div
            style={{
              padding: "30px",
              textAlign: "center",
              border: "1px solid #ddd",
              borderRadius: "8px",
              color: "#666",
            }}
          >
            No query history available.
          </div>
        )}

      {!loading &&
        !error &&
        topQueries.length > 0 && (
          <div
            style={{
              overflowX: "auto",
              border: "1px solid #ddd",
              borderRadius: "8px",
              background: "white",
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
                  <th style={headerStyle}>
                    Rank
                  </th>

                  <th style={headerStyle}>
                    Query
                  </th>

                  <th style={headerStyle}>
                    Executions
                  </th>

                  <th style={headerStyle}>
                    Average Time
                  </th>

                  <th style={headerStyle}>
                    Fastest
                  </th>

                  <th style={headerStyle}>
                    Slowest
                  </th>
                </tr>
              </thead>

              <tbody>
                {topQueries.map(
                  (item, index) => (
                    <tr key={item.query}>
                      <td style={cellStyle}>
                        <strong>
                          #{index + 1}
                        </strong>
                      </td>

                      <td
                        style={{
                          ...cellStyle,
                          fontFamily:
                            "monospace",
                          whiteSpace:
                            "pre-wrap",
                          minWidth: "300px",
                        }}
                      >
                        {item.query}
                      </td>

                      <td style={cellStyle}>
                        {item.count}
                      </td>

                      <td style={cellStyle}>
                        {item.averageTime.toFixed(
                          2
                        )}{" "}
                        ms
                      </td>

                      <td style={cellStyle}>
                        {item.fastestTime.toFixed(
                          2
                        )}{" "}
                        ms
                      </td>

                      <td style={cellStyle}>
                        {item.slowestTime.toFixed(
                          2
                        )}{" "}
                        ms
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
    </div>
  );
}

const headerStyle = {
  padding: "14px",
  textAlign: "left" as const,
  borderBottom: "2px solid #ddd",
  background: "#f5f5f5",
};

const cellStyle = {
  padding: "14px",
  borderBottom: "1px solid #eee",
};

export default TopQueries;