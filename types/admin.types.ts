export interface AdminDashboardStats {
  totalUsers: number;
  totalProperties: number;
  totalRentalRequests: number;
  totalRevenue: string | number;
  completedPayments: number;

  monthlyRevenue: {
    month: string;
    revenue: number;
  }[];

  rentalRequests: {
    pending: number;
    approved: number;
    active: number;
    completed: number;
    rejected: number;
  };
}

export interface AdminDashboardResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: AdminDashboardStats;
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

export interface GetAllUsersResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: AdminUser[];
}