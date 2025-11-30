import { Card, CardContent, Typography, Box } from "@mui/material";

export default function StatCard({ title, value, icon }: any) {
  return (
    <Card
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        border: "1px solid #eee",
      }}
    >
      <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "primary.light",
            color: "primary.main",
          }}
        >
          {icon}
        </Box>

        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {value}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
