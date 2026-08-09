
"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  LogIn,
  User,
} from "lucide-react";

import ProfileImage from "./ProfileImage";

type ProfileMenuProps = {
  isLoggedIn: boolean;
  profileName: string;
  profileEmail: string;
  profileRole: string;
  profileImage: string | null;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onLogout: () => void;
};

const getProfilePath = (role: string) => {
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

const getDashboardPath = (role: string) => {
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

const ProfileMenu = ({
  isLoggedIn,
  profileName,
  profileEmail,
  profileRole,
  profileImage,
  isOpen,
  onToggle,
  onClose,
  onLogout,
}: ProfileMenuProps) => {
  return (
    <div className="relative">
      {/* Profile Button */}
      {isLoggedIn ? (
        <button
          type="button"
          onClick={onToggle}
          aria-label="Open profile menu"
          aria-expanded={isOpen}
          className="relative size-11 overflow-hidden rounded-full border border-border/70 bg-background transition-all duration-300 hover:border-primary/40 hover:ring-2 hover:ring-primary/10"
        >
          <ProfileImage
            image={profileImage}
            name={profileName}
            size="medium"
          />
        </button>
      ) : (
        <button
          type="button"
          onClick={onToggle}
          aria-label="Open account menu"
          aria-expanded={isOpen}
          className="flex size-11 items-center justify-center rounded-full border border-border/70 bg-background text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
        >
          <User className="size-5" />
        </button>
      )}

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-11 z-50 w-60 overflow-hidden rounded-xl border border-border bg-background shadow-lg">
          {/* User info */}
          <div className="border-b border-border p-3">
            <div className="flex items-center gap-3">
              <div className="relative size-10 shrink-0 overflow-hidden rounded-full bg-primary/10">
                {isLoggedIn ? (
                  <ProfileImage
                    image={profileImage}
                    name={profileName}
                    size="medium"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center text-primary">
                    <User className="size-5" />
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  {profileName}
                </p>

                <p className="truncate text-xs text-muted-foreground">
                  {profileEmail}
                </p>
              </div>
            </div>

            {isLoggedIn && (
              <span className="mt-2 inline-block text-[10px] font-semibold uppercase tracking-wide text-primary">
                {profileRole}
              </span>
            )}
          </div>

          {/* Actions */}
          {isLoggedIn && (
            <div className="p-1.5">
              <Link
                href={getProfilePath(profileRole)}
                onClick={onClose}
                className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground transition hover:bg-muted"
              >
                <User className="size-4" />
                Profile
              </Link>

              <Link
                href={getDashboardPath(profileRole)}
                onClick={onClose}
                className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground transition hover:bg-muted"
              >
                <LayoutDashboard className="size-4" />
                Dashboard
              </Link>
            </div>
          )}

          {/* Login / Logout */}
          <div className="border-t border-border p-1.5">
            {isLoggedIn ? (
              <button
                type="button"
                onClick={onLogout}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/30"
              >
                <LogIn className="size-4" />
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                onClick={onClose}
                className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground transition hover:bg-muted"
              >
                <LogIn className="size-4" />
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;

