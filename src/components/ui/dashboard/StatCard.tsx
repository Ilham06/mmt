import { Card, CardContent, Typography, Box } from "@mui/material";

export default function StatCard({
  title,
  value,
  icon,
  color = "primary",
}: any) {
  return (
    <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #eee" }}>
      <CardContent sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            bgcolor: `${color}.light`,
            color: '#FFF',
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h6" fontWeight={700}>
            {value}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
