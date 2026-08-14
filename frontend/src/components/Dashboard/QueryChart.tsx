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
      padding: "24px",
      marginTop: "30px",
      boxShadow: "0 4px 18px rgba(0,0,0,0.06)",
      border: "1px solid #e5e7eb",
      boxSizing: "border-box",
    }}
    >
      <h2>Query Execution Time</h2>

      {data.length === 0 ? (
        <p>No query history available yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height="85%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis
              label={{
                value: "Time (ms)",
                angle: -90,
                position: "insideLeft",
              }}
            />

            <Tooltip
              formatter={(value) => [`${value} ms`, "Execution Time"]}
            />

            <Line
              type="monotone"
              dataKey="time"
              stroke="#1976d2"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default QueryChart;