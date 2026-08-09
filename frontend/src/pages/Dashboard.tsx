import { useEffect, useState } from "react";
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

  const fetchStats = async () => {
    try {
      const statsResponse = await api.get("/dashboard/stats");
      const historyResponse = await api.get("/history");

      setStats(statsResponse.data);
      setQueries(historyResponse.data);
    } catch (error) {
      console.error("Dashboard error:", error);
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
      time: Number(
        query.execution_time_ms.toFixed(2)
      ),
    }));

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <StatsGrid stats={stats} />

      <QueryChart data={chartData} />

      <RecentQueries queries={queries} />

      <TopQueries queries={queries} />
    </div>
  );
}

export default Dashboard;