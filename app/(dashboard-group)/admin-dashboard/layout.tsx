"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building2,
  Tags,
  ClipboardList,
  CreditCard,
  LogOut,
  Menu,
  X,
  MessageSquare,
  User,
  UserRoundCheck,
} from "lucide-react";
import { logOut } from "@/service/logOut";

const menuItems = [
  {
    label: "Overview",
    href: "/admin-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    href: "/admin-dashboard/users",
    icon: Users,
  },
  {
    label: "Properties",
    href: "/admin-dashboard/properties",
    icon: Building2,
  },
  {
    label: "Categories",
    href: "/admin-dashboard/categories",
    icon: Tags,
  },
  {
    label: "Rentals",
    href: "/admin-dashboard/rentals",
    icon: ClipboardList,
  },
  {
    label: "Payments",
    href: "/admin-dashboard/payments",
    icon: CreditCard,
  },
  {
  label: "Reviews",
  href: "/admin-dashboard/reviews",
  icon: MessageSquare,
},
{
  label: "Landlord Requests",
  href: "/admin-dashboard/landlord-requests",
  icon: UserRoundCheck,
},
{
  label: "Profile",
  href: "/admin-dashboard/profile",
  icon: User,
},
];

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="flex min-h-screen">
        {/* ================= DESKTOP SIDEBAR ================= */}
        <aside className="hidden w-64 shrink-0 border-r bg-white dark:border-slate-800 dark:bg-slate-900 md:block">
          <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex h-16 items-center border-b px-6 dark:border-slate-800">
              <Link
                href="/admin-dashboard"
                className="text-xl font-bold text-cyan-500"
              >
                Admin Dashboard
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2 p-4">
              {menuItems.map((item) => {
                const Icon = item.icon;

                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-cyan-500 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    }`}
                  >
                    <Icon size={20} />
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
                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </aside>

        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        <aside
          className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r bg-white shadow-xl transition-transform duration-300 dark:border-slate-800 dark:bg-slate-900 md:hidden ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col">
            {/* Mobile Logo */}
            <div className="flex h-16 items-center justify-between border-b px-5 dark:border-slate-800">
              <Link
                href="/admin-dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-bold text-cyan-500"
              >
                Admin Dashboard
              </Link>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex size-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 space-y-2 overflow-y-auto p-4">
              {menuItems.map((item) => {
                const Icon = item.icon;

                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-cyan-500 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    }`}
                  >
                    <Icon size={20} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Logout */}
            <div className="border-t p-4 dark:border-slate-800">
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          {/* Mobile Top Bar */}
          <div className="sticky top-0 z-30 flex h-14 items-center border-b bg-white px-4 dark:border-slate-800 dark:bg-slate-900 md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex size-10 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              aria-label="Open menu"
            >
              <Menu size={23} />
            </button>

            <h1 className="ml-3 text-base font-bold text-slate-900 dark:text-white">
              Admin Dashboard
            </h1>
          </div>

          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
