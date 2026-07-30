export interface AdminDashboardStats {
  totalUsers: number;
  totalProperties: number;
  totalRentalRequests: number;
  totalRevenue: string;
  completedPayments: number;
}

export interface AdminDashboardResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: AdminDashboardStats;
}

export const getAdminDashboardStats =
  async (): Promise<AdminDashboardStats> => {
    const response = await fetch("/api/admin/dashboard", {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(
        "Failed to fetch admin dashboard statistics"
      );
    }

    const result: AdminDashboardResponse =
      await response.json();

    return result.data;
  };