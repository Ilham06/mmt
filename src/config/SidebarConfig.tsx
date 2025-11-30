import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import WalletRoundedIcon from "@mui/icons-material/WalletRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

export const sidebarConfig = [
  { title: "Dashboard", path: "/dashboard", icon: <DashboardRoundedIcon /> },
  { title: "Transactions", path: "/transactions", icon: <ReceiptLongRoundedIcon /> },
  { title: "Wallets", path: "/wallets", icon: <WalletRoundedIcon /> },
  { title: "Categories", path: "/categories", icon: <CategoryRoundedIcon /> },
  { title: "Reports", path: "/reports", icon: <InsightsRoundedIcon /> },
  { title: "Settings", path: "/settings", icon: <SettingsRoundedIcon /> },
];
