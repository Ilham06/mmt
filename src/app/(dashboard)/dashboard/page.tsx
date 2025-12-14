"use client";

import Grid from "@mui/material/Grid";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";

import PageWrapper from "@/components/layouts/pageWrapper";
import StatCard from "@/components/ui/dashboard/StatCard";
import IncomeExpenseChart from "@/components/ui/dashboard/IncomeExpenseChart";
import CategoryPieChart from "@/components/ui/dashboard/ExpenseByCategory";
import RecentTransactionTable from "@/components/ui/dashboard/RecentTransactionTable";

import { useGetTransactionStatsQuery } from "@/redux/slices/transactionApi";

export default function DashboardPage() {
  const { data, isLoading } = useGetTransactionStatsQuery({});

  return (
    <PageWrapper title="Dashboard">
      <Grid container spacing={3}>
        {/* SUMMARY */}
        <Grid size={{ xs: 12, md: 4 }}>
          <StatCard
            title="Total Transactions"
            value={isLoading ? "-" : data?.count}
            icon={<AccountBalanceWalletRoundedIcon />}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <StatCard
            title="Income"
            value={
              isLoading
                ? "-"
                : `Rp ${data?.totalIncome.toLocaleString("id-ID")}`
            }
            icon={<TrendingUpRoundedIcon />}
            color="success"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <StatCard
            title="Expense"
            value={
              isLoading
                ? "-"
                : `Rp ${data?.totalExpense.toLocaleString("id-ID")}`
            }
            icon={<TrendingDownRoundedIcon />}
            color="error"
          />
        </Grid>

        {/* CHART */}
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
