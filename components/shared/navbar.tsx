"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, X, User, Settings, LogIn, ChevronDown } from "lucide-react";
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
export default function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const isLoggedIn = user?.success && user?.data;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const handleLogout = async () => {
    const res = await logOut();

    if (res.success) {
      toast.success(res.message);
      router.push("/");
      router.refresh();
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-10 xl:px-16">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tight">
          Rent<span className="text-primary">Nest</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Home
          </Link>

          <Link
            href="/properties"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Find a Home
          </Link>

          <Link
            href="/categories"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Categories
          </Link>

          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            About
          </Link>
        </nav>

        {/* Desktop Profile */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted transition"
          >
            <User className="h-4 w-4" />
            Profile
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                isProfileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-64 rounded-xl border bg-background p-2 shadow-lg">
              {/* User Info */}
              <div className="border-b px-3 py-3">
                <p className="font-semibold">
                  {user?.data?.name || "User Name"}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {user?.data?.email || "User Email"}
                </p>
              </div>

              {/* Menu */}
              <div className="py-2">
                <Link
                  href="/profile"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-muted"
                >
                  <User className="h-4 w-4" />
                  Profile
                </Link>

                <Link
                  href="/settings"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-muted"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </div>

              {/* Bottom Login */}
              <div className="border-t pt-2">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-muted"
                  >
                    <LogIn className="h-4 w-4" />
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-muted"
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="rounded-lg border p-2 md:hidden"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-t md:hidden">
          <div className="space-y-1 px-4 py-4">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-3 text-sm font-medium hover:bg-muted"
            >
              Home
            </Link>

            <Link
              href="/properties"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-3 text-sm font-medium hover:bg-muted"
            >
              Find a Home
            </Link>

            <Link
              href="/categories"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-3 text-sm font-medium hover:bg-muted"
            >
              Categories
            </Link>

            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-3 text-sm font-medium hover:bg-muted"
            >
              About
            </Link>

            <div className="my-3 border-t" />

            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex w-full items-center justify-between rounded-lg border px-4 py-3 text-sm font-medium"
            >
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </span>

              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isProfileOpen && (
              <div className="mt-2 rounded-lg border bg-muted/30 p-2">
                {/* User */}
                <div className="border-b px-3 py-3">
                  <p className="font-semibold">
                    {user?.data?.name || "User Name"}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {user?.data?.email || "User Email"}
                  </p>
                </div>

                <Link
                  href="/profile"
                  className="mt-2 flex items-center gap-3 rounded-lg px-3 py-3 text-sm hover:bg-muted"
                >
                  <User className="h-4 w-4" />
                  Profile
                </Link>

                <Link
                  href="/settings"
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm hover:bg-muted"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>

                <div className="mt-2 border-t pt-2">
                  {isLoggedIn ? (
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm hover:bg-muted"
                    >
                      <LogIn className="h-4 w-4" />
                      Logout
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm hover:bg-muted"
                    >
                      <LogIn className="h-4 w-4" />
                      Login
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
