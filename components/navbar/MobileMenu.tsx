"use client";

import Link from "next/link";
import { ChevronDown, LayoutDashboard, LogIn, User } from "lucide-react";
import { cn } from "@/lib/utils";

import ProfileImage from "./ProfileImage";
import NavLinks from "./NavLinks";

type MobileMenuProps = {
  open: boolean;
  isProfileOpen: boolean;
  isLoggedIn: boolean;
  profileName: string;
  profileEmail: string;
  profileRole: string;
  profileImage: string | null;
  onProfileToggle: () => void;
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

const MobileMenu = ({
  open,
  isProfileOpen,
  isLoggedIn,
  profileName,
  profileEmail,
  profileRole,
  profileImage,
  onProfileToggle,
  onClose,
  onLogout,
}: MobileMenuProps) => {
  return (
    <div
      className={cn(
        "overflow-hidden border-t border-border bg-background transition-all duration-200 md:hidden",
        open ? "max-h-[600px]" : "max-h-0 border-t-0",
      )}
    >
      <div className="space-y-3 px-4 py-4">
        <NavLinks mobile onClick={onClose} />

        <div className="border-t border-border pt-3">
          <button
            type="button"
            onClick={onProfileToggle}
            className="flex w-full items-center justify-between rounded-lg border border-border px-3 py-2.5 text-sm font-medium"
          >
            <span className="flex min-w-0 items-center gap-3">
              <div className="relative size-8 shrink-0 overflow-hidden rounded-full bg-primary/10">
                {isLoggedIn ? (
                  <ProfileImage
                    image={profileImage}
                    name={profileName}
                    size="small"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center text-primary">
                    <User className="size-4" />
                  </div>
                )}
              </div>

              <span className="truncate">
                {isLoggedIn ? profileName : "Account"}
              </span>
            </span>

            <ChevronDown
              className={cn(
                "size-4 transition-transform",
                isProfileOpen && "rotate-180",
              )}
            />
          </button>

          {isProfileOpen && (
            <div className="mt-2 rounded-lg border border-border bg-muted/20 p-2">
              <div className="border-b border-border px-2 py-3">
                <p className="truncate text-sm font-semibold">
                  {profileName}
                </p>

                <p className="truncate text-xs text-muted-foreground">
                  {profileEmail}
                </p>

                {isLoggedIn && (
                  <span className="mt-2 inline-block text-[10px] font-semibold uppercase text-primary">
                    {profileRole}
                  </span>
                )}
              </div>

              {isLoggedIn && (
                <div className="py-1">
                  <Link
                    href={getProfilePath(profileRole)}
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-md px-2 py-2.5 text-sm hover:bg-muted"
                  >
                    <User className="size-4" />
                    Profile
                  </Link>

                  <Link
                    href={getDashboardPath(profileRole)}
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-md px-2 py-2.5 text-sm hover:bg-muted"
                  >
                    <LayoutDashboard className="size-4" />
                    Dashboard
                  </Link>
                </div>
              )}

              <div className="border-t border-border pt-1">
                {isLoggedIn ? (
                  <button
                    type="button"
                    onClick={onLogout}
                    className="flex w-full items-center gap-3 rounded-md px-2 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                  >
                    <LogIn className="size-4" />
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/login"
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-md px-2 py-2.5 text-sm hover:bg-muted"
                  >
                    <LogIn className="size-4" />
                    Login
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;