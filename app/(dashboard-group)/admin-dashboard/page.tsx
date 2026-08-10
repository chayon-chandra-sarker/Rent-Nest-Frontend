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

  if (isLoading) {
    return <AdminDashboardSkeleton />;
  }

  if (isError) {
    return <AdminDashboardError onRetry={() => refetch()} />;
  }


  if (!data) {
    return <AdminDashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />

      <AdminStats data={data} />
    </div>
  );
};

export default AdminDashboard;