"use client";

import {
  LayoutDashboard,
  Users,
  Building2,
  Tags,
  ClipboardList,
  CreditCard,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import Link from "next/link";
import { logOut } from "@/service/logOut";

interface AdminSidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
}

const AdminSidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
}: AdminSidebarProps) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r bg-white shadow-xl transition-transform duration-300 dark:border-slate-800 dark:bg-slate-900 md:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">

          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b px-5 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-xl bg-cyan-500 font-bold text-white">
                R
              </div>

              <div>
                <h1 className="text-lg font-bold">
                  Rent<span className="text-cyan-500">Nest</span>
                </h1>

                <p className="text-[10px] uppercase tracking-wider text-slate-400">
                  Admin Panel
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsSidebarOpen(false)}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X size={20} />
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex-1 space-y-1.5 p-4">
            <Link
              href="/admin-dashboard"
              onClick={() => setIsSidebarOpen(false)}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <LayoutDashboard size={19} />
              <span className="text-sm font-medium">Dashboard</span>
            </Link>

            <Link
              href="/admin-dashboard/users"
              onClick={() => setIsSidebarOpen(false)}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <Users size={19} />
              <span className="text-sm font-medium">Users</span>
            </Link>

            <Link
              href="/admin-dashboard/properties"
              onClick={() => setIsSidebarOpen(false)}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <Building2 size={19} />
              <span className="text-sm font-medium">Properties</span>
            </Link>

            <Link
              href="/admin-dashboard/categories"
              onClick={() => setIsSidebarOpen(false)}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <Tags size={19} />
              <span className="text-sm font-medium">Categories</span>
            </Link>

            <Link
              href="/admin-dashboard/rentals"
              onClick={() => setIsSidebarOpen(false)}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <ClipboardList size={19} />
              <span className="text-sm font-medium">Rentals</span>
            </Link>

            <Link
              href="/admin-dashboard/payments"
              onClick={() => setIsSidebarOpen(false)}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <CreditCard size={19} />
              <span className="text-sm font-medium">Payments</span>
            </Link>

            <Link
              href="/admin-dashboard/settings"
              onClick={() => setIsSidebarOpen(false)}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <Settings size={19} />
              <span className="text-sm font-medium">Settings</span>
            </Link>
          </nav>

          {/* Mobile Logout */}
          <div className="border-t p-4 dark:border-slate-800">
            <button
              onClick={logOut}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
            >
              <LogOut size={19} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r bg-white dark:border-slate-800 dark:bg-slate-900 md:block">
        <div className="flex h-full flex-col">

          {/* Logo */}
          <div className="flex h-16 items-center border-b px-6 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-xl bg-cyan-500 text-sm font-bold text-white">
                R
              </div>

              <div>
                <h1 className="text-lg font-bold tracking-tight">
                  Rent<span className="text-cyan-500">Nest</span>
                </h1>

                <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                  Admin Panel
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="flex-1 space-y-1.5 p-4">

            <Link
              href="/admin-dashboard"
              className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-cyan-50 hover:text-cyan-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-cyan-400"
            >
              <LayoutDashboard size={19} />
              <span className="text-sm font-medium">Dashboard</span>
            </Link>

            <Link
              href="/admin-dashboard/users"
              className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-cyan-50 hover:text-cyan-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-cyan-400"
            >
              <Users size={19} />
              <span className="text-sm font-medium">Users</span>
            </Link>

            <Link
              href="/admin-dashboard/properties"
              className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-cyan-50 hover:text-cyan-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-cyan-400"
            >
              <Building2 size={19} />
              <span className="text-sm font-medium">Properties</span>
            </Link>

            <Link
              href="/admin-dashboard/categories"
              className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-cyan-50 hover:text-cyan-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-cyan-400"
            >
              <Tags size={19} />
              <span className="text-sm font-medium">Categories</span>
            </Link>

            <Link
              href="/admin-dashboard/rentals"
              className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-cyan-50 hover:text-cyan-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-cyan-400"
            >
              <ClipboardList size={19} />
              <span className="text-sm font-medium">Rentals</span>
            </Link>

            <Link
              href="/admin-dashboard/payments"
              className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-cyan-50 hover:text-cyan-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-cyan-400"
            >
              <CreditCard size={19} />
              <span className="text-sm font-medium">Payments</span>
            </Link>

            <Link
              href="/admin-dashboard/settings"
              className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-cyan-50 hover:text-cyan-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-cyan-400"
            >
              <Settings size={19} />
              <span className="text-sm font-medium">Settings</span>
            </Link>

          </nav>

          {/* Admin Profile */}
          <div className="mx-4 mb-4 rounded-2xl border bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-cyan-100 font-bold text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
                A
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">
                  Admin
                </p>

                <p className="truncate text-xs text-slate-500">
                  Administrator
                </p>
              </div>
            </div>

            <button
              onClick={logOut}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;