
import EditProfileForm from "@/components/Profile/EditProfileForm";
import { getMyProfile } from "@/lib/actions/profile.query";

export default async function EditProfilePage() {
  const profile = await getMyProfile();

  const user = profile?.data;

  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-2xl">
        <EditProfileForm
          currentName={user?.name || ""}
          currentPhone={user?.phone || null}
          currentAddress={user?.address || null}
          currentImage={user?.image || null}
        />
      </div>
    </main>
  );
}

