"use client";

import { logOut } from "@/service/logOut";
import { Home, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";
import ProfileMenu from "./ProfileMenu";
import ThemeToggle from "./ThemeToggle";

type IUserData = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  phone: string;
  image: string;
  address: string;
  createdAt: string;
  updatedAt: string;
};

type IUser = {
  success: boolean;
  statusCode: number;
  message: string;
  data: IUserData;
};

type NavbarProps = {
  user: IUser;
};

export function SiteHeader({ user }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState<IUserData | null>(null);

  useEffect(() => {
    const handleProfileUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<IUserData>;

      if (customEvent.detail) {
        setUpdatedProfile(customEvent.detail);
      }
    };

    window.addEventListener("profile-updated", handleProfileUpdate);

    return () => {
      window.removeEventListener("profile-updated", handleProfileUpdate);
    };
  }, []);

  const effectiveUserData = updatedProfile
    ? {
        ...user.data,
        ...updatedProfile,
      }
    : user.data;

  const isLoggedIn = user?.success === true && !!user?.data;

  const profileImage = isLoggedIn ? effectiveUserData.image : null;

  const profileName = isLoggedIn
    ? effectiveUserData.name
    : "Guest User";

  const profileEmail = isLoggedIn
    ? effectiveUserData.email
    : "Please login to continue";

  const profileRole = isLoggedIn ? effectiveUserData.role : "";

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const closeMenus = () => {
    setOpen(false);
    setIsProfileOpen(false);
  };

  const toggleMobileMenu = () => {
    setOpen((value) => !value);
    setIsProfileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Navbar */}
      <div className="w-full border-b border-border/60 bg-background/95 backdrop-blur-xl">
        <div
          className="
            mx-auto flex h-16 w-full items-center
            justify-between gap-3
            px-4
            sm:h-[72px] sm:px-6
            md:px-8
            lg:h-20 lg:px-10
            xl:px-12
            2xl:px-16
          "
        >
          {/* ================= LOGO ================= */}
          <Link
            href="/"
            onClick={closeMenus}
            className="
              group flex shrink-0 items-center gap-2
              sm:gap-3
            "
          >
            <span
              className="
                flex size-9 items-center justify-center
                rounded-xl bg-primary
                text-primary-foreground
                shadow-[0_8px_25px_rgba(0,220,229,0.22)]
                transition-all duration-300
                group-hover:scale-105
                sm:size-10 sm:rounded-xl
                lg:size-11 lg:rounded-2xl
              "
            >
              <Home className="size-4 sm:size-5" />
            </span>

            <span
              className="
                text-lg font-extrabold tracking-tight
                text-foreground
                sm:text-xl
                lg:text-[22px]
              "
            >
              RentNest
            </span>
          </Link>

          {/* ================= DESKTOP NAVIGATION ================= */}
          <div className="hidden md:flex md:flex-1 md:justify-center">
            <NavLinks
              isLoggedIn={isLoggedIn}
              role={profileRole}
            />
          </div>

          {/* ================= RIGHT ACTIONS ================= */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 lg:gap-2.5">
            {/* Theme */}
            <ThemeToggle />

            {/* Profile */}
            <div className="hidden sm:block">
              <ProfileMenu
                isLoggedIn={isLoggedIn}
                profileName={profileName}
                profileEmail={profileEmail}
                profileRole={profileRole}
                profileImage={profileImage}
                isOpen={isProfileOpen}
                onToggle={() =>
                  setIsProfileOpen((value) => !value)
                }
                onClose={() => setIsProfileOpen(false)}
                onLogout={handleLogout}
              />
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="
                inline-flex size-9 items-center justify-center
                rounded-lg
                border border-border/70
                bg-background
                text-foreground
                transition-all duration-300
                hover:border-primary/40
                hover:bg-primary/5
                sm:size-10 sm:rounded-xl
                md:hidden
              "
            >
              {open ? (
                <X className="size-4 sm:size-5" />
              ) : (
                <Menu className="size-4 sm:size-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <MobileMenu
        open={open}
        isProfileOpen={isProfileOpen}
        isLoggedIn={isLoggedIn}
        profileName={profileName}
        profileEmail={profileEmail}
        profileRole={profileRole}
        profileImage={profileImage}
        onProfileToggle={() =>
          setIsProfileOpen((value) => !value)
        }
        onClose={closeMenus}
        onLogout={handleLogout}
      />
    </header>
  );
}