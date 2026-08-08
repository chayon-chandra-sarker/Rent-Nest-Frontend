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

  const profileName = isLoggedIn ? effectiveUserData.name : "Guest User";

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
      {/* Full-width navbar background */}
      <div className="w-full border-b border-border/60 bg-background/95 backdrop-blur-xl">
        <div className="flex h-[80px] w-full items-center justify-between px-5 sm:px-8 lg:px-12 xl:px-16">
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenus}
            className="group flex items-center gap-3"
          >
            <span className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[0_8px_25px_rgba(0,220,229,0.22)] transition-all duration-300 group-hover:scale-105">
              <Home className="size-5" />
            </span>

            <span className="text-[22px] font-extrabold tracking-tight text-foreground">
              RentNest
            </span>
          </Link>

          {/* Navigation */}
          <NavLinks />

          {/* Right actions */}
          <div className="flex items-center gap-2.5">
            <ThemeToggle />

            <ProfileMenu
              isLoggedIn={isLoggedIn}
              profileName={profileName}
              profileEmail={profileEmail}
              profileRole={profileRole}
              profileImage={profileImage}
              isOpen={isProfileOpen}
              onToggle={() => setIsProfileOpen((value) => !value)}
              onClose={() => setIsProfileOpen(false)}
              onLogout={handleLogout}
            />

            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="inline-flex size-11 items-center justify-center rounded-xl border border-border/70 bg-background text-foreground transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 md:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        open={open}
        isProfileOpen={isProfileOpen}
        isLoggedIn={isLoggedIn}
        profileName={profileName}
        profileEmail={profileEmail}
        profileRole={profileRole}
        profileImage={profileImage}
        onProfileToggle={() => setIsProfileOpen((value) => !value)}
        onClose={closeMenus}
        onLogout={handleLogout}
      />
    </header>
  );
}
