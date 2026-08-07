import { Card, CardContent, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        height: "100%",
      }}
    >
      <CardContent>
        <Typography
          color="text.secondary"
          gutterBottom
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          {icon}
          {title}
        </Typography>

        <Typography
          variant="h4"
          fontWeight="bold"
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default StatCard;