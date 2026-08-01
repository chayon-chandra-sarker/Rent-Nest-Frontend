
"use client";

import Image from "next/image";
import { User } from "lucide-react";

import { UserProfile } from "@/service/user.service";

interface ProfileHeaderProps {
  profile: UserProfile;
  imageError: boolean;
  setImageError: (value: boolean) => void;
}

const ProfileHeader = ({
  profile,
  imageError,
  setImageError,
}: ProfileHeaderProps) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm">
      {/* Cover */}
      <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-background sm:h-40" />

      <div className="px-5 pb-6 sm:px-8">
        <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            {/* Profile Image */}
            <div className="relative flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-3xl border-4 border-card bg-primary/10 text-primary shadow-lg sm:size-28">
              {profile.image && !imageError ? (
                <Image
                  src={profile.image}
                  alt={`${profile.name}'s profile`}
                  fill
                  priority
                  sizes="(max-width: 640px) 96px, 112px"
                  className="object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <User className="size-10" />
              )}
            </div>

            {/* Name & Email */}
            <div className="min-w-0 pb-1">
              <h1 className="truncate text-xl font-bold tracking-tight sm:text-2xl">
                {profile.name}
              </h1>

              <p className="mt-1 truncate text-sm text-muted-foreground">
                {profile.email}
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="flex w-fit items-center gap-2 self-start rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400 sm:self-auto">
            <span className="size-2 rounded-full bg-emerald-500" />

            {profile.status}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;

