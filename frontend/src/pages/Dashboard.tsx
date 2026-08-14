import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";

import api from "../api/api";

import StatsGrid from "../components/Dashboard/StatsGrid";
import QueryChart from "../components/Dashboard/QueryChart";
import RecentQueries from "../components/Dashboard/RecentQueries";
import TopQueries from "../components/Dashboard/TopQueries";

interface DashboardStats {
  total_queries: number;
  average_execution_time_ms: number;
  fastest_query_ms: number;
  slowest_query_ms: number;
}

interface QueryHistory {
  id: number;
  query: string;
  execution_time_ms: number;
  executed_at: string;
}

function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    total_queries: 0,
    average_execution_time_ms: 0,
    fastest_query_ms: 0,
    slowest_query_ms: 0,
  });

  const [queries, setQueries] = useState<QueryHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError("");

      const [statsResponse, historyResponse] = await Promise.all([
        api.get("/dashboard/stats"),
        api.get("/history"),
      ]);

      setStats(statsResponse.data);
      setQueries(historyResponse.data);
    } catch (error) {
      console.error("Dashboard error:", error);
      setError("Unable to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const chartData = queries
    .slice()
    .reverse()
    .map((query) => ({
      name: `Q${query.id}`,
      time: Number(query.execution_time_ms.toFixed(2)),
    }));

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <CircularProgress />
        <Typography color="text.secondary">
          Loading dashboard...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 1400,
        mx: "auto",
        px: { xs: 2, md: 4 },
        py: 4,
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 0.5,
          }}
        >
          Dashboard
        </Typography>

        <Typography color="text.secondary">
          Monitor your SQL queries and database performance.
        </Typography>
      </Box>

      {/* Error */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Statistics */}
      <StatsGrid stats={stats} />

      {/* Execution Chart */}
      <QueryChart data={chartData} />

      {/* Bottom Section */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "2fr 1fr",
          },
          gap: 3,
          mt: 3,
        }}
      >
        <RecentQueries queries={queries} />

        <TopQueries queries={queries} />
      </Box>
    </Box>
  );
}

export default Dashboard;