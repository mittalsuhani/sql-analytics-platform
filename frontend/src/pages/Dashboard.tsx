import { useEffect, useState } from "react";
import api from "../api/api";
import StatsGrid from "../components/Dashboard/StatsGrid";
import QueryChart from "../components/Dashboard/QueryChart";


interface DashboardStats {
  total_queries: number;
  average_execution_time: number;
  fastest_query: number;
  slowest_query: number;
}

function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/dashboard/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <h2>Loading dashboard...</h2>;
  }

  if (!stats) {
    return <h2>Unable to load dashboard statistics.</h2>;
  }

  const chartData = [
    { name: "Q1", time: 12 },
    { name: "Q2", time: 18 },
    { name: "Q3", time: 8 },
    { name: "Q4", time: 25 },
    { name: "Q5", time: 15 },
  ];

  return (
    <div>
      <h1>Dashboard</h1>
      <StatsGrid stats={stats} />
      <QueryChart data={chartData} />
    </div>
  );
}

export default Dashboard;