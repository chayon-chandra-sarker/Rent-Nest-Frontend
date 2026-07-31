export interface AdminDashboardStats {
  totalUsers: number;
  totalProperties: number;
  totalRentalRequests: number;
  totalRevenue: string;
  completedPayments: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "TENANT" | "LANDLORD" | "ADMIN";
  status: "ACTIVE" | "BANNED";
  phone: string | null;
  image: string | null;
  address: string | null;
  createdAt: string;
}

export interface AdminDashboardResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: AdminDashboardStats;
}

export interface GetAllUsersResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: AdminUser[];
}