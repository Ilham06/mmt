import { Stack, Typography } from "@mui/material";

export function FieldLabel({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <Stack spacing={0.5}>
      <Typography fontWeight={600}>{title}</Typography>
      {description && (
        <Typography variant="caption" color="text.secondary">
          {description}
        </Typography>
      )}
    </Stack>
  );
}
