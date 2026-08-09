export const getProfilePath = (role: string) => {
  switch (role.toUpperCase()) {
    case "ADMIN":
      return "/admin-dashboard/profile";

    case "LANDLORD":
      return "/land-lord-dashboard/profile";

    case "TENANT":
      return "/dashboard/profile";

    default:
      return "/dashboard/profile";
  }
};

export const getDashboardPath = (role: string) => {
  switch (role.toUpperCase()) {
    case "ADMIN":
      return "/admin-dashboard";

    case "LANDLORD":
      return "/land-lord-dashboard";

    case "TENANT":
      return "/dashboard";

    default:
      return "/dashboard";
  }
};