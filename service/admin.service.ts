import type {
  AdminDashboardStats,
  AdminDashboardResponse,
  AdminUser,
  GetAllUsersResponse,
} from "@/types/admin.types";

export const getAdminDashboardStats =
  async (): Promise<AdminDashboardStats> => {
    const response = await fetch("/api/admin/dashboard", {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch admin dashboard statistics");
    }

    const result: AdminDashboardResponse = await response.json();

    return result.data;
  };

export const getAllUsers = async (): Promise<AdminUser[]> => {
  const response = await fetch("/api/admin/users", {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const result: GetAllUsersResponse = await response.json();

  return result.data;
};

export const updateUserRole = async (
  userId: string,
  role: "TENANT" | "LANDLORD" | "ADMIN",
) => {
  const response = await fetch(`/api/admin/users/${userId}/role`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      role,
    }),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to update user role");
  }

  return result.data;
};

export const updateUserStatus = async (
  userId: string,
  status: "ACTIVE" | "BANNED",
) => {
  const response = await fetch(`/api/admin/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      status,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);

    throw new Error(
      error?.message || "Failed to update user status",
    );
  }

  const result = await response.json();

  return result.data;
};