
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { getMyProfile } from "@/lib/actions/profile.query";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import ProfileInfo from "@/components/Profile/ProfileInfo";

export default async function ProfilePage() {
  const profile = await getMyProfile();

  const user = profile?.data;

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-xl border bg-card px-4 py-2.5 text-sm font-medium transition-all hover:bg-accent"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </div>

        {/* Profile Header */}
        <ProfileHeader
          name={user?.name || ""}
          email={user?.email || ""}
          role={user?.role || ""}
          status={user?.status || ""}
          address={user?.address || null}
          image={user?.image || null}
        />

        {/* Profile Information */}
        <ProfileInfo
          name={user?.name || ""}
          email={user?.email || ""}
          role={user?.role || ""}
          status={user?.status || ""}
          phone={user?.phone || null}
          address={user?.address || null}
          createdAt={user?.createdAt || ""}
        />
      </div>
    </main>
  );
}

