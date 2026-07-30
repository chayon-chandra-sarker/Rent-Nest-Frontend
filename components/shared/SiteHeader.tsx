"use client";

import { useState } from "react";
import { Home, Menu, X, User, Settings, LogIn, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { logOut } from "@/service/logOut";
import { toast } from "sonner";

type IUser = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
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
};

type NavbarProps = {
  user: IUser;
};

const navLinks = [
  { label: "Browse", href: "#featured" },
  { label: "Categories", href: "#categories" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
];

export function SiteHeader({ user }: NavbarProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const isLoggedIn = user?.success && !!user?.data;

  const handleLogout = async () => {
    const res = await logOut();

    if (res.success) {
      toast.success(res.message);
      setIsProfileOpen(false);
      setOpen(false);

      router.push("/");
      router.refresh();
    } else {
      toast.error(res.message || "Logout failed");
    }
  };

  const closeMobileMenu = () => {
    setOpen(false);
    setIsProfileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Home className="size-5" />
          </span>

          <span className="text-lg font-extrabold tracking-tight text-foreground">
            RentNest
          </span>
        </Link>

        {/* Desktop Navigation */}
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

        {/* Desktop Profile */}
        <div className="relative hidden md:block">
          <button
            type="button"
            onClick={() => setIsProfileOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-xl border border-border text-foreground transition hover:bg-muted"
            aria-label="Open profile menu"
            aria-expanded={isProfileOpen}
          >
            <User className="size-5" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-64 rounded-xl border border-border bg-background p-2 shadow-lg">
              {/* User Info */}
              <div className="border-b border-border px-3 py-3">
                <p className="font-semibold text-foreground">
                  {isLoggedIn ? user.data.name : "Guest User"}
                </p>

                <p className="truncate text-xs text-muted-foreground">
                  {isLoggedIn ? user.data.email : "Please login to continue"}
                </p>
              </div>

              {/* Profile Menu */}
              <div className="py-2">
                {isLoggedIn && (
                  <>
                    <Link
                      href="/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-muted"
                    >
                      <User className="size-4" />
                      Profile
                    </Link>

                    <Link
                      href="/settings"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-muted"
                    >
                      <Settings className="size-4" />
                      Settings
                    </Link>
                  </>
                )}
              </div>

              {/* Login / Logout */}
              <div className="border-t border-border pt-2">
                {isLoggedIn ? (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-muted"
                  >
                    <LogIn className="size-4" />
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-muted"
                  >
                    <LogIn className="size-4" />
                    Login
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => {
            setOpen((v) => !v);
            setIsProfileOpen(false);
          }}
          className="inline-flex size-10 items-center justify-center rounded-xl border border-border text-foreground md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-border/60 bg-background md:hidden",
          open ? "max-h-[600px]" : "max-h-0 border-t-0"
        )}
      >
        <div className="flex flex-col gap-1 px-4 py-4">
          {/* Navigation */}
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={closeMobileMenu}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </a>
          ))}

          <div className="mt-2 border-t border-border pt-3">
            {/* Mobile Profile Button */}
            <button
              type="button"
              onClick={() => setIsProfileOpen((v) => !v)}
              className="flex w-full items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-semibold text-foreground"
              aria-expanded={isProfileOpen}
            >
              <span className="flex items-center gap-3">
                <User className="size-5" />

                <span>
                  {isLoggedIn ? user.data.name : "Account"}
                </span>
              </span>

              <ChevronDown
                className={cn(
                  "size-4 transition-transform",
                  isProfileOpen && "rotate-180"
                )}
              />
            </button>

            {/* Mobile Profile Dropdown */}
            {isProfileOpen && (
              <div className="mt-2 rounded-xl border border-border bg-muted/30 p-2">
                {/* User Info */}
                <div className="border-b border-border px-3 py-3">
                  <p className="font-semibold text-foreground">
                    {isLoggedIn ? user.data.name : "Guest User"}
                  </p>

                  <p className="truncate text-xs text-muted-foreground">
                    {isLoggedIn
                      ? user.data.email
                      : "Please login to continue"}
                  </p>
                </div>

                {/* Logged In Options */}
                {isLoggedIn && (
                  <>
                    <Link
                      href="/profile"
                      onClick={closeMobileMenu}
                      className="mt-2 flex items-center gap-3 rounded-lg px-3 py-3 text-sm hover:bg-muted"
                    >
                      <User className="size-4" />
                      Profile
                    </Link>

                    <Link
                      href="/settings"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm hover:bg-muted"
                    >
                      <Settings className="size-4" />
                      Settings
                    </Link>
                  </>
                )}

                {/* Login / Logout */}
                <div className="mt-2 border-t border-border pt-2">
                  {isLoggedIn ? (
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm hover:bg-muted"
                    >
                      <LogIn className="size-4" />
                      Logout
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm hover:bg-muted"
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
    </header>
  );
}