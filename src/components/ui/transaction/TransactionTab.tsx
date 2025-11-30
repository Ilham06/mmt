"use client";

import { Tabs, Tab, Chip, Box } from "@mui/material";

export default function TransactionTabs({ value, onChange }: any) {
  const tabs = [
    { label: "All", count: 20 },
    { label: "Income", count: 10 },
    { label: "Expense", count: 6 },
    { label: "Transfer", count: 2 },
  ];

  return (
    <Tabs
      value={value}
      onChange={onChange}
      sx={{
        mt: 3,
        "& .MuiTab-root": {
          textTransform: "none",
          fontSize: 14,
          minWidth: "auto",
          mr: 3,
        },
        "& .MuiTabs-indicator": {
          height: 3,
          borderRadius: 2,
        },
      }}
    >
      {tabs.map((tab, i) => (
        <Tab
          key={i}
          label={
            <Box display="flex" alignItems="center" gap={1}>
              {tab.label}
              <Chip label={tab.count} size="small" />
            </Box>
          }
        />
      ))}
    </Tabs>
  );
}
