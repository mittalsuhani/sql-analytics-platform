import { Grid } from "@mui/material";
import {
  FaDatabase,
  FaClock,
  FaBolt,
  FaStopwatch,
} from "react-icons/fa";

import StatCard from "./StatCard";

interface Props {
  stats: {
    total_queries: number;
    average_execution_time_ms: number;
    fastest_query_ms: number;
    slowest_query_ms: number;
  };
}

function StatsGrid({ stats }: Props) {
  return (
    <>
      <Grid size={{ xs: 12, md: 3 }}>
        <StatCard
          title="Total Queries"
          value={stats.total_queries}
          icon={<FaDatabase />}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <StatCard
          title="Average Time"
          value={`${stats.average_execution_time_ms.toFixed(2)} ms`}
          icon={<FaClock />}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <StatCard
          title="Fastest"
          value={`${stats.fastest_query_ms.toFixed(2)} ms`}
          icon={<FaBolt />}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <StatCard
          title="Slowest"
          value={`${stats.slowest_query_ms.toFixed(2)} ms`}
          icon={<FaStopwatch />}
        />
      </Grid>
    </>
  );
}

export default StatsGrid;