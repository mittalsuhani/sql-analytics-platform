import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface QueryPoint {
  name: string;
  time: number;
}

interface Props {
  data: QueryPoint[];
}

function QueryChart({ data }: Props) {
  return (
    <div
      style={{
        width: "100%",
        height: 400,
        background: "white",
        borderRadius: "12px",
        padding: "20px",
        marginTop: "30px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2>Query Execution Time</h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="time"
            stroke="#1976d2"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default QueryChart;