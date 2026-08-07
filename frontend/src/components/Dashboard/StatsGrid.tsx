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
    average_execution_time: number;
    fastest_query: number;
    slowest_query: number;
  };
}

function StatsGrid({ stats }: Props) {
  return (
    <Grid container spacing={3}>
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
          value={`${stats.average_execution_time} ms`}
          icon={<FaClock />}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <StatCard
          title="Fastest"
          value={`${stats.fastest_query} ms`}
          icon={<FaBolt />}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <StatCard
          title="Slowest"
          value={`${stats.slowest_query} ms`}
          icon={<FaStopwatch />}
        />
      </Grid>
    </Grid>
  );
}

export default StatsGrid;