"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  ClipboardList,
  CreditCard,
  User,
  Home,
  X,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logOut } from "@/service/logOut";

interface LandlordSidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

const menuItems = [
  {
    label: "Dashboard",
    href: "/land-lord-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Properties",
    href: "/land-lord-dashboard/properties",
    icon: Building2,
  },
  {
    label: "Rental Requests",
    href: "/land-lord-dashboard/rental-requests",
    icon: ClipboardList,
  },
  {
    label: "Payments",
    href: "/land-lord-dashboard/payments",
    icon: CreditCard,
  },
  {
    label: "Profile",
    href: "/land-lord-dashboard/profile",
    icon: User,
  },
];

const LandlordSidebar = ({
  mobileOpen = false,
  onClose,
}: LandlordSidebarProps) => {
  const pathname = usePathname();

  return (
    <>
      <aside className="hidden h-screen w-64 shrink-0 border-r border-border/60 bg-card lg:sticky lg:top-0 lg:flex lg:flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-border/60 px-5">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Home className="size-5" />
            </span>

            <span className="text-lg font-extrabold tracking-tight">
              RentNest
            </span>
          </Link>
        </div>

        {/* Sidebar Header */}
        <div className="px-4 pt-6">
          <p className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Landlord Panel
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-4 py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.href ||
              (item.href !== "/land-lord-dashboard" &&
                pathname.startsWith(`${item.href}/`));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="size-4 shrink-0" />

                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t p-4 dark:border-slate-800">
          <button
            onClick={logOut}
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={onClose}
          />

          {/* Sidebar */}
          <aside className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-border/60 bg-card shadow-xl lg:hidden">
            {/* Header */}
            <div className="flex h-16 items-center justify-between border-b border-border/60 px-5">
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center gap-2"
              >
                <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Home className="size-5" />
                </span>

                <span className="text-lg font-extrabold tracking-tight">
                  RentNest
                </span>
              </Link>

              <button
                type="button"
                onClick={onClose}
                className="flex size-9 items-center justify-center rounded-xl border border-border transition hover:bg-muted"
                aria-label="Close sidebar"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Header */}
            <div className="px-4 pt-6">
              <p className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Landlord Panel
              </p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 px-4 py-4">
              {menuItems.map((item) => {
                const Icon = item.icon;

                const isActive =
                  pathname === item.href ||
                  (item.href !== "/land-lord-dashboard" &&
                    pathname.startsWith(`${item.href}/`));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <Icon className="size-4 shrink-0" />

                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Bottom */}
            <div className="border-t p-4 dark:border-slate-800">
              <button
                onClick={logOut}
                type="button"
                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </aside>
        </>
      )}
    </>
  );
};

export default LandlordSidebar;
