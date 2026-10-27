"use client";

import React from "react";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
      {/* Sidebar for desktop/tablet */}
      <div className="hidden md:block">
        <AdminSidebar />
      </div>

      {/* Main Admin Workspace View */}
      <main className="flex-1 min-w-0 bg-surface-light dark:bg-surface-dark overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
