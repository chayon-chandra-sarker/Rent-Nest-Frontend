"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAdminDashboardStats } from "@/service/admin.service";
import AdminNavbar from "@/components/AdminDashboard/AdminNavbar";
import AdminStats from "@/components/AdminDashboard/AdminStats";
import AdminDashboardSkeleton from "../../../components/AdminDashboard/AdminDashboardSkeleton";
import AdminDashboardError from "@/components/AdminDashboard/AdminDashboardError";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: getAdminDashboardStats,
  });

  // Loading Skeleton
  if (isLoading) {
    return <AdminDashboardSkeleton></AdminDashboardSkeleton>;
  }
  
  // Error UI
  if (isError) {
    return (
      <AdminDashboardError onRetry={() => refetch()}></AdminDashboardError>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="flex min-h-screen">
        <main className="min-w-0 flex-1">
          <AdminNavbar onMenuClick={() => setIsSidebarOpen(true)}></AdminNavbar>
          <AdminStats data={data}></AdminStats>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
