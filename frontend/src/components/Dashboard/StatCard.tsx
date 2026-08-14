import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
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
        height: "100%",
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 4px 18px rgba(0, 0, 0, 0.06)",
        transition: "all 0.2s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.10)",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            {title}
          </Typography>

          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "action.hover",
              color: "primary.main",
              fontSize: 18,
            }}
          >
            {icon}
          </Box>
        </Box>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            letterSpacing: -0.5,
          }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default StatCard;