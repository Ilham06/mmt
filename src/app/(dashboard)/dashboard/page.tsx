"use client";

import Grid from "@mui/material/Grid";


import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import StatCard from "@/components/ui/dashboard/StatCard";
import IncomeExpenseChart from "@/components/ui/dashboard/IncomeExpenseChart";
import CategoryPieChart from "@/components/ui/dashboard/ExpenseByCategory";
import RecentTransactionTable from "@/components/ui/dashboard/RecentTransactionTable";
import PageWrapper from "@/components/layouts/pageWrapper";

export default function DashboardPage() {
  return (
    <PageWrapper title="Dashboard">
      <Grid container spacing={3}>
      {/* SUMMARY CARDS */}
      <Grid size={{ xs: 12, md: 4 }}>
        <StatCard
          title="Total Balance"
          value="Rp 12.450.000"
          icon={<AccountBalanceWalletRoundedIcon />}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <StatCard
          title="Income (This Month)"
          value="Rp 5.300.000"
          icon={<TrendingUpRoundedIcon />}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <StatCard
          title="Expense (This Month)"
          value="Rp 2.100.000"
          icon={<TrendingDownRoundedIcon />}
        />
      </Grid>

      {/* CHARTS */}
      <Grid size={{ xs: 12, md: 8 }}>
        <IncomeExpenseChart />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <CategoryPieChart />
      </Grid>

      {/* TABLE */}
      <Grid size={{ xs: 12 }}>
        <RecentTransactionTable />
      </Grid>
    </Grid>
    </PageWrapper>
  );
}
