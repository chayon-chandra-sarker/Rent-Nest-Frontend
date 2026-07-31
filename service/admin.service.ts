
import type {
  AdminDashboardStats,
  AdminDashboardResponse,
  AdminUser,
  GetAllUsersResponse,
} from "@/types/admin.types";

export const getAdminDashboardStats =
  async (): Promise<AdminDashboardStats> => {
    const response = await fetch("/api/admin/dashboard", {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch admin dashboard statistics");
    }

    const result: AdminDashboardResponse =
      await response.json();

    return result.data;
  };

export const getAllUsers = async (): Promise<AdminUser[]> => {
  const response = await fetch("/api/admin/users", {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const result: GetAllUsersResponse =
    await response.json();

  return result.data;
};

