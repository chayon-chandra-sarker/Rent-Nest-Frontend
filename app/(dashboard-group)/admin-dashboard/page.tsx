
"use client";

import { useQuery } from "@tanstack/react-query";

import { getAdminDashboardStats } from "@/service/admin.service";

import AdminNavbar from "@/components/AdminDashboard/AdminNavbar";
import AdminStats from "@/components/AdminDashboard/AdminStats";
import AdminDashboardSkeleton from "@/components/AdminDashboard/AdminDashboardSkeleton";
import AdminDashboardError from "@/components/AdminDashboard/AdminDashboardError";

const AdminDashboard = () => {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: getAdminDashboardStats,
  });

  // Loading State
  if (isLoading) {
    return <AdminDashboardSkeleton />;
  }

  // Error State
  if (isError) {
    return (
      <AdminDashboardError
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <main className="min-w-0 flex-1">
        {/* Dashboard Navbar */}
        <AdminNavbar />

        {/* Dashboard Stats */}
        <AdminStats data={data} />
      </main>
    </div>
  );
};

export default AdminDashboard;

