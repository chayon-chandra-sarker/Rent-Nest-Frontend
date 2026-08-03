"use client";

import { useEffect, useState } from "react";
import { Loader2, XCircle } from "lucide-react";

import { getMyProfile, UserProfile } from "@/service/user.service";

import ProfileHeader from "./profile/ProfileHeader";
import PersonalInformation from "./profile/PersonalInformation";
import AccountInformation from "./profile/AccountInformation";


import ProfileEditForm from "./profile/ProfileEditForm";
import BecomeLandlordCard from "./profile/BecomeLandlordCard";

const TenantProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMyProfile();

        setProfile(data);
        setImageError(false);
      } catch (error) {
        console.error("Fetch profile error:", error);

        setError(
          error instanceof Error ? error.message : "Failed to load profile",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <section className="rounded-3xl border border-border/60 bg-card p-10 shadow-sm">
        <div className="flex min-h-[400px] flex-col items-center justify-center">
          <Loader2 className="size-9 animate-spin text-primary" />

          <p className="mt-4 text-sm font-medium text-muted-foreground">
            Loading profile...
          </p>
        </div>
      </section>
    );
  }

  if (error || !profile) {
    return (
      <section className="rounded-3xl border border-destructive/20 bg-card p-10 shadow-sm">
        <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-destructive/10">
            <XCircle className="size-7 text-destructive" />
          </div>

          <h2 className="mt-5 text-lg font-bold">Failed to load profile</h2>

          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            {error || "Profile information is not available."}
          </p>
        </div>
      </section>
    );
  }

  return (
  <section className="space-y-6">
    <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm">
      <ProfileHeader
        profile={profile}
        imageError={imageError}
        setImageError={setImageError}
      />
    </div>

    <BecomeLandlordCard
      role={profile.role}
    />

    {isEditing && (
      <ProfileEditForm
        profile={profile}
        onClose={() => setIsEditing(false)}
        onUpdated={(updatedProfile) => {
          setProfile(updatedProfile);
          setImageError(false);
        }}
      />
    )}

    <PersonalInformation
      profile={profile}
      onEdit={() => {
        setIsEditing(true);
      }}
    />

    <AccountInformation profile={profile} />
  </section>
);
};

export default TenantProfile;
