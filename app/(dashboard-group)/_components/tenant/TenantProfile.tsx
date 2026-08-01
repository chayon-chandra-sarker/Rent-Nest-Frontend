
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  CalendarDays,
  Pencil,
  Loader2,
  XCircle,
} from "lucide-react";

import {
  getMyProfile,
  UserProfile,
} from "@/service/user.service";

const TenantProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState(false);

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
          error instanceof Error
            ? error.message
            : "Failed to load profile"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const formatDate = (date: string) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // =========================
  // LOADING
  // =========================

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

  // =========================
  // ERROR
  // =========================

  if (error || !profile) {
    return (
      <section className="rounded-3xl border border-destructive/20 bg-card p-10 shadow-sm">
        <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-destructive/10">
            <XCircle className="size-7 text-destructive" />
          </div>

          <h2 className="mt-5 text-lg font-bold">
            Failed to load profile
          </h2>

          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            {error || "Profile information is not available."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">

      {/* =========================
          PROFILE HEADER
      ========================= */}

      <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm">

        {/* Cover */}

        <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-background sm:h-40" />

        <div className="px-5 pb-6 sm:px-8">

          <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">

            <div className="flex items-end gap-4">

              {/* =========================
                  PROFILE IMAGE
              ========================= */}

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

              {/* =========================
                  NAME & EMAIL
              ========================= */}

              <div className="pb-1 min-w-0">

                <h1 className="truncate text-xl font-bold tracking-tight sm:text-2xl">
                  {profile.name}
                </h1>

                <p className="mt-1 truncate text-sm text-muted-foreground">
                  {profile.email}
                </p>

              </div>

            </div>

            {/* =========================
                STATUS
            ========================= */}

            <div className="flex w-fit items-center gap-2 self-start rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400 sm:self-auto">

              <span className="size-2 rounded-full bg-emerald-500" />

              {profile.status}

            </div>

          </div>

        </div>

      </div>

      {/* =========================
          PERSONAL INFORMATION
      ========================= */}

      <div className="rounded-3xl border border-border/60 bg-card shadow-sm">

        <div className="flex items-center justify-between border-b border-border/60 px-5 py-5 sm:px-7">

          <div>
            <h2 className="text-lg font-bold">
              Personal Information
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Your account and contact information.
            </p>
          </div>

          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold transition duration-200 hover:bg-muted"
          >
            <Pencil className="size-3.5" />

            <span className="hidden sm:inline">
              Edit Profile
            </span>
          </button>

        </div>

        <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-7">

          {/* NAME */}

          <div className="rounded-2xl border border-border/60 bg-muted/20 p-4 transition duration-200 hover:border-primary/20 hover:bg-primary/[0.02]">

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

          {/* EMAIL */}

          <div className="rounded-2xl border border-border/60 bg-muted/20 p-4 transition duration-200 hover:border-primary/20 hover:bg-primary/[0.02]">

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

          {/* PHONE */}

          <div className="rounded-2xl border border-border/60 bg-muted/20 p-4 transition duration-200 hover:border-primary/20 hover:bg-primary/[0.02]">

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

          {/* ADDRESS */}

          <div className="rounded-2xl border border-border/60 bg-muted/20 p-4 transition duration-200 hover:border-primary/20 hover:bg-primary/[0.02]">

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

      {/* =========================
          ACCOUNT INFORMATION
      ========================= */}

      <div className="rounded-3xl border border-border/60 bg-card shadow-sm">

        <div className="border-b border-border/60 px-5 py-5 sm:px-7">

          <h2 className="text-lg font-bold">
            Account Information
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Basic information about your RentNest account.
          </p>

        </div>

        <div className="grid gap-4 p-5 sm:grid-cols-3 sm:p-7">

          {/* ROLE */}

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

          {/* STATUS */}

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

          {/* JOINED */}

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

    </section>
  );
};

export default TenantProfile;

