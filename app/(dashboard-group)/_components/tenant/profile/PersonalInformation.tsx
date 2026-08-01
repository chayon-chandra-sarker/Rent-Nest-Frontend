"use client";

import {
  User,
  Mail,
  Phone,
  MapPin,
  Pencil,
} from "lucide-react";

import { UserProfile } from "@/service/user.service";

interface PersonalInformationProps {
  profile: UserProfile;
  onEdit: () => void;
}

const PersonalInformation = ({
  profile,
  onEdit,
}: PersonalInformationProps) => {
  return (
    <div className="rounded-3xl border border-border/60 bg-card shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/60 px-5 py-5 sm:px-7">
        <div>
          <h2 className="text-lg font-bold">
            Personal Information
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Your account and contact information.
          </p>
        </div>

        {/* Edit Button */}
        <button
          type="button"
          onClick={onEdit}
          className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold transition hover:bg-muted"
        >
          <Pencil className="size-3.5" />

          <span className="hidden sm:inline">
            Edit Profile
          </span>
        </button>
      </div>

      {/* Information */}
      <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-7">

        {/* Full Name */}
        <div className="rounded-2xl border border-border/60 bg-muted/20 p-4 transition hover:border-primary/20 hover:bg-primary/[0.02]">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <User className="size-5" />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Full Name
              </p>

              <p className="mt-1 truncate text-sm font-semibold">
                {profile.name}
              </p>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="rounded-2xl border border-border/60 bg-muted/20 p-4 transition hover:border-primary/20 hover:bg-primary/[0.02]">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Mail className="size-5" />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Email Address
              </p>

              <p className="mt-1 truncate text-sm font-semibold">
                {profile.email}
              </p>
            </div>
          </div>
        </div>

        {/* Phone */}
        <div className="rounded-2xl border border-border/60 bg-muted/20 p-4 transition hover:border-primary/20 hover:bg-primary/[0.02]">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Phone className="size-5" />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Phone Number
              </p>

              <p className="mt-1 truncate text-sm font-semibold">
                {profile.phone || "Not provided"}
              </p>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="rounded-2xl border border-border/60 bg-muted/20 p-4 transition hover:border-primary/20 hover:bg-primary/[0.02]">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <MapPin className="size-5" />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Address
              </p>

              <p className="mt-1 truncate text-sm font-semibold">
                {profile.address || "Not provided"}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PersonalInformation;