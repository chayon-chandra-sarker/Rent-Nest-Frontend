
"use client";

import {
  Home,
  Menu,
  X,
  User,
  Settings,
  LogIn,
  ChevronDown,
  LayoutDashboard,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { logOut } from "@/service/logOut";

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

type ProfileImageProps = {
  image: string | null;
  name: string;
  size: "small" | "medium" | "large";
};

/* =====================================================
   PROFILE IMAGE
   IMPORTANT:
   This component MUST stay outside SiteHeader
===================================================== */

const ProfileImage = ({
  image,
  name,
  size,
}: ProfileImageProps) => {
  const [imageError, setImageError] = useState(false);

  const imageSize =
    size === "small"
      ? 32
      : size === "medium"
        ? 40
        : 44;

  const avatarLetter =
    name?.charAt(0)?.toUpperCase() || "U";

  if (!image || imageError) {
    return (
      <div className="flex size-full items-center justify-center font-bold text-primary">
        {avatarLetter}
      </div>
    );
  }

  return (
    <Image
      src={image}
      alt={name || "Profile"}
      fill
      sizes={`${imageSize}px`}
      className="object-cover"
      onError={() => setImageError(true)}
      unoptimized
    />
  );
};

/* =====================================================
   NAV LINKS
===================================================== */

const navLinks = [
  {
    label: "Browse",
    href: "/#featured",
  },
  {
    label: "Categories",
    href: "/#categories",
  },
  {
    label: "How it works",
    href: "/#how-it-works",
  },
  {
    label: "Testimonials",
    href: "/#testimonials",
  },
];

/* =====================================================
   DASHBOARD PATH
===================================================== */

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

/* =====================================================
   SITE HEADER
===================================================== */

export function SiteHeader({ user }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  /*
   * Parent থেকে আসা user-কে initial state হিসেবে রাখা হয়েছে।
   *
   * পরে profile update হলে CustomEvent থেকে currentUser update হবে।
   */
  const [currentUser, setCurrentUser] = useState<IUser>(user);

  /* =====================================================
     PROFILE UPDATE EVENT
  ===================================================== */

  useEffect(() => {
    const handleProfileUpdate = (
      event: Event,
    ) => {
      const customEvent =
        event as CustomEvent<IUserData>;

      if (!customEvent.detail) {
        return;
      }

      setCurrentUser((previousUser) => ({
        ...previousUser,
        success: true,
        data: {
          ...previousUser.data,
          ...customEvent.detail,
        },
      }));
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

  /* =====================================================
     LOGIN STATE
  ===================================================== */

  const isLoggedIn =
    currentUser?.success &&
    !!currentUser?.data;

  const profileImage =
    isLoggedIn
      ? currentUser.data.image
      : null;

  const profileName =
    isLoggedIn
      ? currentUser.data.name
      : "Guest User";

  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout = async () => {
    await logOut();
  };

  /* =====================================================
     MOBILE CLOSE
  ===================================================== */

  const closeMobileMenu = () => {
    setOpen(false);
    setIsProfileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="flex h-16 w-full items-center justify-between px-1">

        {/* =================================================
            LOGO
        ================================================= */}

        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Home className="size-5" />
          </span>

          <span className="text-lg font-extrabold tracking-tight text-foreground">
            RentNest
          </span>
        </Link>

        {/* =================================================
            DESKTOP NAVIGATION
        ================================================= */}

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* =================================================
            DESKTOP PROFILE
        ================================================= */}

        <div className="relative hidden md:block">
          <button
            type="button"
            onClick={() =>
              setIsProfileOpen(
                (value) => !value,
              )
            }
            className="relative size-10 overflow-hidden rounded-xl border border-border bg-primary/10 transition hover:ring-2 hover:ring-primary/30"
            aria-label="Open profile menu"
            aria-expanded={isProfileOpen}
          >
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
          </button>

          {/* =================================================
              DESKTOP DROPDOWN
          ================================================= */}

          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-border bg-background p-2 shadow-xl">

              {/* USER INFO */}

              <div className="border-b border-border px-3 py-3">
                <div className="flex items-center gap-3">

                  {/* DROPDOWN AVATAR */}

                  <div className="relative size-11 shrink-0 overflow-hidden rounded-full bg-primary/10">
                    {isLoggedIn ? (
                      <ProfileImage
                        image={profileImage}
                        name={profileName}
                        size="large"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center font-bold text-primary">
                        <User className="size-5" />
                      </div>
                    )}
                  </div>

                  {/* NAME + EMAIL */}

                  <div className="min-w-0">
                    <p className="truncate font-semibold text-foreground">
                      {profileName}
                    </p>

                    <p className="truncate text-xs text-muted-foreground">
                      {isLoggedIn
                        ? currentUser.data.email
                        : "Please login to continue"}
                    </p>
                  </div>
                </div>

                {/* ROLE */}

                {isLoggedIn && (
                  <span className="mt-3 inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase text-primary">
                    {currentUser.data.role}
                  </span>
                )}
              </div>

              {/* =================================================
                  LOGGED IN MENU
              ================================================= */}

              {isLoggedIn && (
                <div className="py-2">

                  {/* PROFILE */}

                  <Link
                    href="/profile"
                    onClick={() =>
                      setIsProfileOpen(false)
                    }
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition hover:bg-muted"
                  >
                    <User className="size-4" />
                    <span>Profile</span>
                  </Link>

                  {/* DASHBOARD */}

                  <Link
                    href={getDashboardPath(
                      currentUser.data.role,
                    )}
                    onClick={() =>
                      setIsProfileOpen(false)
                    }
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition hover:bg-primary/10 hover:text-primary"
                  >
                    <LayoutDashboard className="size-4" />
                    <span>Dashboard</span>
                  </Link>

                  {/* SETTINGS */}

                  <Link
                    href="/settings"
                    onClick={() =>
                      setIsProfileOpen(false)
                    }
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition hover:bg-muted"
                  >
                    <Settings className="size-4" />
                    <span>Settings</span>
                  </Link>
                </div>
              )}

              {/* =================================================
                  LOGIN / LOGOUT
              ================================================= */}

              <div className="border-t border-border pt-2">
                {isLoggedIn ? (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950"
                  >
                    <LogIn className="size-4" />
                    <span>Logout</span>
                  </button>
                ) : (
                  <Link
                    href="/login"
                    onClick={() =>
                      setIsProfileOpen(false)
                    }
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition hover:bg-muted"
                  >
                    <LogIn className="size-4" />
                    <span>Login</span>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>

        {/* =================================================
            MOBILE MENU BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={() => {
            setOpen(
              (value) => !value,
            );
            setIsProfileOpen(false);
          }}
          className="inline-flex size-10 items-center justify-center rounded-xl border border-border text-foreground transition hover:bg-muted md:hidden"
          aria-label={
            open
              ? "Close menu"
              : "Open menu"
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

      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      <div
        className={cn(
          "overflow-hidden border-t border-border/60 bg-background transition-all duration-300 md:hidden",
          open
            ? "max-h-[700px]"
            : "max-h-0 border-t-0",
        )}
      >
        <div className="flex flex-col gap-1 px-4 py-4">

          {/* NAVIGATION */}

          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={closeMobileMenu}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </a>
          ))}

          {/* ACCOUNT */}

          <div className="mt-2 border-t border-border pt-3">

            <button
              type="button"
              onClick={() =>
                setIsProfileOpen(
                  (value) => !value,
                )
              }
              className="flex w-full items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
              aria-expanded={isProfileOpen}
            >
              <span className="flex min-w-0 items-center gap-3">

                {/* MOBILE AVATAR */}

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
                  {isLoggedIn
                    ? profileName
                    : "Account"}
                </span>
              </span>

              <ChevronDown
                className={cn(
                  "size-4 shrink-0 transition-transform duration-200",
                  isProfileOpen &&
                    "rotate-180",
                )}
              />
            </button>

            {/* =================================================
                MOBILE PROFILE DROPDOWN
            ================================================= */}

            {isProfileOpen && (
              <div className="mt-2 overflow-hidden rounded-xl border border-border bg-muted/30 p-2">

                {/* USER INFO */}

                <div className="border-b border-border px-3 py-3">

                  <div className="flex items-center gap-3">

                    {/* AVATAR */}

                    <div className="relative size-11 shrink-0 overflow-hidden rounded-full bg-primary/10">
                      {isLoggedIn ? (
                        <ProfileImage
                          image={profileImage}
                          name={profileName}
                          size="large"
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center font-bold text-primary">
                          <User className="size-5" />
                        </div>
                      )}
                    </div>

                    {/* NAME + EMAIL */}

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-foreground">
                        {profileName}
                      </p>

                      <p className="truncate text-xs text-muted-foreground">
                        {isLoggedIn
                          ? currentUser.data.email
                          : "Please login to continue"}
                      </p>
                    </div>
                  </div>

                  {/* ROLE */}

                  {isLoggedIn && (
                    <span className="mt-3 inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase text-primary">
                      {currentUser.data.role}
                    </span>
                  )}
                </div>

                {/* OPTIONS */}

                {isLoggedIn && (
                  <div className="py-2">

                    {/* PROFILE */}

                    <Link
                      href="/profile"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-foreground transition hover:bg-muted"
                    >
                      <User className="size-4" />
                      <span>Profile</span>
                    </Link>

                    {/* DASHBOARD */}

                    <Link
                      href={getDashboardPath(
                        currentUser.data.role,
                      )}
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-foreground transition hover:bg-primary/10 hover:text-primary"
                    >
                      <LayoutDashboard className="size-4" />
                      <span>Dashboard</span>
                    </Link>

                    {/* SETTINGS */}

                    <Link
                      href="/settings"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-foreground transition hover:bg-muted"
                    >
                      <Settings className="size-4" />
                      <span>Settings</span>
                    </Link>
                  </div>
                )}

                {/* LOGIN / LOGOUT */}

                <div className="border-t border-border pt-2">
                  {isLoggedIn ? (
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950"
                    >
                      <LogIn className="size-4" />
                      <span>Logout</span>
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-foreground transition hover:bg-muted"
                    >
                      <LogIn className="size-4" />
                      <span>Login</span>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

