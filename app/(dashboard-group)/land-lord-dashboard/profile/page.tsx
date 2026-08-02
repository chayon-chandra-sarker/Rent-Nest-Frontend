"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Mail, MapPin, Pencil, Phone, User } from "lucide-react";

import {
  getMyProfile,
  type UserProfile,
} from "@/service/user.service";

import EditProfileForm from "./EditProfileForm";

const LandlordProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  // ===============================
  // Load Profile
  // ===============================
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getMyProfile();

        setProfile(data);
        setImageError(false);
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  // ===============================
  // Loading
  // ===============================
  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Loading profile...
        </p>
      </div>
    );
  }

  // ===============================
  // Profile Not Found
  // ===============================
  if (!profile) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Failed to load profile.
        </p>
      </div>
    );
  }

  // ===============================
  // Update Profile
  // ===============================
  const handleProfileUpdated = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);

    // নতুন image হলে পুরোনো error state reset
    setImageError(false);

    // Navbar / অন্য component-কে জানাবে
    window.dispatchEvent(
      new CustomEvent("profile-updated", {
        detail: updatedProfile,
      }),
    );
  };

  return (
    <div className="space-y-6">
      {/* ===============================
          Header
      =============================== */}
      <div>
        <h1 className="text-2xl font-bold">
          My Profile
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          View and manage your personal information.
        </p>
      </div>

      {/* ===============================
          Profile Card
      =============================== */}
      <div className="overflow-hidden rounded-2xl border bg-card">
        {/* Cover */}
        <div className="h-32 bg-muted" />

        <div className="px-6 pb-6">
          {/* ===============================
              Profile Image
          =============================== */}
          <div className="-mt-14">
            <div className="flex size-28 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-muted">
              {profile.image && !imageError ? (
                <Image
                  key={profile.image}
                  src={profile.image}
                  alt={profile.name || "Profile"}
                  width={112}
                  height={112}
                  unoptimized
                  priority
                  className="size-full object-cover"
                  onError={() => {
                    console.error(
                      "Profile image failed:",
                      profile.image,
                    );

                    setImageError(true);
                  }}
                />
              ) : (
                <div className="flex size-full items-center justify-center">
                  <User className="size-12 text-muted-foreground" />
                </div>
              )}
            </div>
          </div>

          {/* ===============================
              Name & Role
          =============================== */}
          <div className="mt-4">
            <h2 className="text-xl font-semibold">
              {profile.name}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {profile.role}
            </p>
          </div>

          {/* ===============================
              Contact Information
          =============================== */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {/* Email */}
            <div className="rounded-xl border p-4">
              <div className="flex items-center gap-3">
                <Mail className="size-5 text-muted-foreground" />

                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">
                    Email
                  </p>

                  <p className="truncate text-sm font-medium">
                    {profile.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="rounded-xl border p-4">
              <div className="flex items-center gap-3">
                <Phone className="size-5 text-muted-foreground" />

                <div>
                  <p className="text-xs text-muted-foreground">
                    Phone
                  </p>

                  <p className="text-sm font-medium">
                    {profile.phone || "Not added"}
                  </p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="rounded-xl border p-4 sm:col-span-2">
              <div className="flex items-center gap-3">
                <MapPin className="size-5 text-muted-foreground" />

                <div>
                  <p className="text-xs text-muted-foreground">
                    Address
                  </p>

                  <p className="text-sm font-medium">
                    {profile.address || "Not added"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ===============================
              Edit Profile Button
          =============================== */}
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => setEditOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              <Pencil className="size-4" />
              Edit Profile
            </button>
          </div>

          {/* ===============================
              Edit Profile Modal
          =============================== */}
          {editOpen && (
            <EditProfileForm
              profile={profile}
              onClose={() => setEditOpen(false)}
              onUpdated={handleProfileUpdated}
            />
          )}

          {/* ===============================
              Account Information
          =============================== */}
          <div className="mt-8 border-t pt-6">
            <h3 className="text-sm font-semibold">
              Account Information
            </h3>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {/* Status */}
              <div>
                <p className="text-xs text-muted-foreground">
                  Account Status
                </p>

                <p className="mt-1 text-sm font-medium">
                  {profile.status}
                </p>
              </div>

              {/* Member Since */}
              <div>
                <p className="text-xs text-muted-foreground">
                  Member Since
                </p>

                <p className="mt-1 text-sm font-medium">
                  {new Date(
                    profile.createdAt,
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandlordProfilePage;