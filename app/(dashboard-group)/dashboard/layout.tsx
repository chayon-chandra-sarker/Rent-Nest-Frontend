
"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  FileText,
  CreditCard,
  User,
  LogOut,
} from "lucide-react";
import { logOut } from "@/service/logOut";

interface DashboardLayoutProps {
  children: ReactNode;
}

const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Properties",
    href: "/dashboard/properties",
    icon: Home,
  },
  {
    label: "My Rentals",
    href: "/dashboard/rentals",
    icon: FileText,
  },
  {
    label: "Payments",
    href: "/dashboard/payments",
    icon: CreditCard,
  },
  {
    label: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r bg-card lg:block">
          <div className="sticky top-0 flex h-screen flex-col">

            {/* Logo */}
            <div className="border-b p-6">
              <Link
                href="/dashboard"
                className="text-xl font-bold text-primary"
              >
                RentNest
              </Link>

              <p className="mt-1 text-xs text-muted-foreground">
                User Dashboard
              </p>
            </div>

            {/* Menu */}
            <nav className="flex-1 space-y-1 p-4">
              {menuItems.map((item) => {
                const Icon = item.icon;

                // Dashboard এর জন্য exact match
                // অন্য page এর জন্য pathname শুরু হয়েছে কিনা check
                const isActive =
                  item.href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-primary/10 font-semibold text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Icon className="size-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Logout */}
            <div className="border-t p-4 dark:border-slate-800">
              <button
                onClick={logOut}
                type="button"
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950"
              >
                <LogOut className="size-5" />
                Logout
              </button>
            </div>

          </div>
        </aside>

        {/* Main Content */}
        <main className="min-w-0 flex-1">
          <div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;

