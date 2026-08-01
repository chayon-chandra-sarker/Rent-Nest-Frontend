
"use client";

import {
  CalendarDays,
  ShieldCheck,
} from "lucide-react";

import { UserProfile } from "@/service/user.service";

interface AccountInformationProps {
  profile: UserProfile;
}

const AccountInformation = ({
  profile,
}: AccountInformationProps) => {
  const formatDate = (date: string) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="rounded-3xl border border-border/60 bg-card shadow-sm">
      {/* Header */}
      <div className="border-b border-border/60 px-5 py-5 sm:px-7">
        <h2 className="text-lg font-bold">
          Account Information
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Basic information about your RentNest account.
        </p>
      </div>

      {/* Information */}
      <div className="grid gap-4 p-5 sm:grid-cols-3 sm:p-7">

        {/* Role */}
        <div className="rounded-2xl border border-border/60 p-4 transition duration-200 hover:border-primary/20 hover:bg-primary/[0.02]">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheck className="size-5" />
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Role
              </p>

              <p className="mt-1 text-sm font-bold">
                {profile.role}
              </p>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="rounded-2xl border border-border/60 p-4 transition duration-200 hover:border-emerald-500/20 hover:bg-emerald-500/[0.02]">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
              <ShieldCheck className="size-5" />
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Account Status
              </p>

              <p className="mt-1 text-sm font-bold">
                {profile.status}
              </p>
            </div>
          </div>
        </div>

        {/* Joined */}
        <div className="rounded-2xl border border-border/60 p-4 transition duration-200 hover:border-primary/20 hover:bg-primary/[0.02]">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <CalendarDays className="size-5" />
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Joined
              </p>

              <p className="mt-1 text-sm font-bold">
                {formatDate(profile.createdAt)}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AccountInformation;

