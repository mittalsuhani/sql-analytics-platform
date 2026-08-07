import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

interface QueryHistory {
  id: number;
  query: string;
  execution_time_ms: number;
}

interface Props {
  queries: QueryHistory[];
}

function TopQueries({ queries }: Props) {
  const topQueries = [...queries]
    .sort((a, b) => b.execution_time_ms - a.execution_time_ms)
    .slice(0, 5);

  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h6">
          Slowest Queries
        </Typography>

        <List>
          {topQueries.map((q) => (
            <ListItem key={q.id}>
              <ListItemText
                primary={q.query}
                secondary={`${q.execution_time_ms.toFixed(2)} ms`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default TopQueries;