import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

interface QueryHistory {
  id: number;
  query: string;
  execution_time_ms: number;
  executed_at: string;
}

interface Props {
  queries: QueryHistory[];
}

function RecentQueries({ queries }: Props) {
  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Recent Queries
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Query</TableCell>
              <TableCell>Execution Time</TableCell>
              <TableCell>Executed At</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {queries.map((q) => (
              <TableRow key={q.id}>
                <TableCell>{q.id}</TableCell>

                <TableCell
                  sx={{
                    maxWidth: 350,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {q.query}
                </TableCell>

                <TableCell>
                  {q.execution_time_ms.toFixed(2)} ms
                </TableCell>

                <TableCell>
                  {new Date(q.executed_at).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default RecentQueries;