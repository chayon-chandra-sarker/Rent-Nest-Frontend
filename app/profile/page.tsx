import { redirect } from "next/navigation";
import { getMe } from "@/service/getMe";

const ProfilePage = async () => {
  const user = await getMe();

  if (!user?.success || !user?.data) {
    redirect("/login");
  }

  switch (user.data.role?.toUpperCase()) {
    case "ADMIN":
      redirect("/admin-dashboard/profile");

    case "LANDLORD":
      redirect("/land-lord-dashboard/profile");

    case "TENANT":
      redirect("/dashboard/profile");

    default:
      redirect("/login");
  }
};

export default ProfilePage;