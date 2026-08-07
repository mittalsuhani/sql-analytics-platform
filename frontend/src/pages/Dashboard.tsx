import { useEffect, useState } from "react";
import api from "../api/api";
import { Grid } from "@mui/material";
import StatsGrid from "../components/Dashboard/StatsGrid";
import QueryChart from "../components/Dashboard/QueryChart";
import RecentQueries from "../components/Dashboard/RecentQueries";
import TopQueries from "../components/Dashboard/TopQueries";


interface DashboardStats {
  total_queries: number;
  average_execution_time: number;
  fastest_query: number;
  slowest_query: number;
}

interface QueryHistory {
  id: number;
  query: string;
  execution_time_ms: number;
  executed_at: string;
}

function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [queries, setQueries] = useState<QueryHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsResponse = await api.get("/dashboard/stats");
        setStats(statsResponse.data);

        const historyResponse = await api.get("/history");
        setQueries(historyResponse.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <h2>Loading Dashboard...</h2>;
  }

  if (!stats) {
    return <h2>Unable to load dashboard.</h2>;
  }

  const chartData = queries
    .slice()
    .reverse()
    .map((query) => ({
      name: `Q${query.id}`,
      time: Number(query.execution_time_ms.toFixed(2)),
    }));

  return (
    <div style={{ padding: "30px" }}>
      <h1>Dashboard</h1>

      <StatsGrid stats={stats} />

      <QueryChart data={chartData} />

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <RecentQueries queries={queries} />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <TopQueries queries={queries} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;