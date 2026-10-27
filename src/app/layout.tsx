import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { AppShell } from "@/components/layout/AppShell";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

export const metadata: Metadata = {
  title: "FairShift | Multilingual Workforce Fairness Platform for India (UN SDG 8)",
  description:
    "Mobile-first workforce fairness, shift clarity, safety resolution, and fatigue prevention platform for construction and healthcare workers in India.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased selection:bg-teal-500 selection:text-white">
        <AppProvider>
          <AppShell>{children}</AppShell>
          <MobileBottomNav />
        </AppProvider>
      </body>
    </html>
  );
}
