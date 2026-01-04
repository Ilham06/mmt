import ReduxProvider from "@/provider/ReduxProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

/* ================= FONT ================= */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

/* ================= META ================= */
export const metadata: Metadata = {
  title: "Dashboard | Money Tracker",
  description:
    "Pantau pemasukan, pengeluaran, dan saldo dompet kamu secara real-time dalam satu dashboard.",
};

/* ================= LAYOUT ================= */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={inter.variable}>
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
