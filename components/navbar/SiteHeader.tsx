"use client";

import { logOut } from "@/service/logOut";
import { Home, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavLinks from "./NavLinks";
import ThemeToggle from "./ThemeToggle";
import ProfileMenu from "./ProfileMenu";
import MobileMenu from "./MobileMenu";


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

  const [updatedProfile, setUpdatedProfile] =
    useState<IUserData | null>(null);

  useEffect(() => {
    const handleProfileUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<IUserData>;

      if (customEvent.detail) {
        setUpdatedProfile(customEvent.detail);
      }
    };

    window.addEventListener(
      "profile-updated",
      handleProfileUpdate,
    );

    return () => {
      window.removeEventListener(
        "profile-updated",
        handleProfileUpdate,
      );
    };
  }, []);

  const effectiveUserData = updatedProfile
    ? {
        ...user.data,
        ...updatedProfile,
      }
    : user.data;

  const isLoggedIn =
    user?.success === true && !!user?.data;

  const profileImage = isLoggedIn
    ? effectiveUserData.image
    : null;

  const profileName = isLoggedIn
    ? effectiveUserData.name
    : "Guest User";

  const profileEmail = isLoggedIn
    ? effectiveUserData.email
    : "Please login to continue";

  const profileRole = isLoggedIn
    ? effectiveUserData.role
    : "";

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
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={closeMenus}
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Home className="size-4" />
          </span>

          <span className="text-lg font-bold tracking-tight">
            RentNest
          </span>
        </Link>

        {/* Desktop navigation */}
        <NavLinks />

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Theme */}
          <ThemeToggle />

          {/* Desktop profile */}
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

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-border md:hidden"
            aria-label={
              open ? "Close menu" : "Open menu"
            }
            aria-expanded={open}
          >
            {open ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
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