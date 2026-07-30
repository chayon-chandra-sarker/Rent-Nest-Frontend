"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Building2,
  Tags,
  ClipboardList,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  X,
  TrendingUp,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAdminDashboardStats } from "@/service/admin.service";
import { logOut } from "@/service/logOut";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: getAdminDashboardStats,
  });

  // =========================
  // Loading Skeleton
  // =========================
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="flex min-h-screen">
          {/* Sidebar Skeleton */}
          <aside className="hidden w-64 shrink-0 border-r bg-white dark:border-slate-800 dark:bg-slate-900 md:block">
            <div className="flex h-full flex-col">
              <div className="flex h-16 items-center border-b px-6 dark:border-slate-800">
                <div className="h-7 w-28 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
              </div>

              <div className="flex-1 space-y-3 p-4">
                {Array.from({ length: 7 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex h-11 items-center gap-3 rounded-xl px-4"
                  >
                    <div className="size-5 animate-pulse rounded-md bg-slate-200 dark:bg-slate-700" />
                    <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                  </div>
                ))}
              </div>

              <div className="border-t p-4 dark:border-slate-800">
                <div className="flex h-11 items-center gap-3 px-4">
                  <div className="size-5 animate-pulse rounded-md bg-slate-200 dark:bg-slate-700" />
                  <div className="h-4 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                </div>
              </div>
            </div>
          </aside>

          {/* Main Skeleton */}
          <main className="min-w-0 flex-1">
            <header className="flex h-16 items-center justify-between border-b bg-white px-4 dark:border-slate-800 dark:bg-slate-900 sm:px-6">
              <div className="h-5 w-36 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

              <div className="flex items-center gap-3">
                <div className="hidden space-y-2 sm:block">
                  <div className="ml-auto h-4 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="ml-auto h-3 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                </div>

                <div className="size-10 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
              </div>
            </header>

            <section className="p-4 sm:p-6 lg:p-8">
              {/* Welcome Skeleton */}
              <div className="mb-8">
                <div className="h-8 w-72 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />

                <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              </div>

              {/* Stats Skeleton */}
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="size-11 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />

                    <div className="mt-5 h-4 w-28 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                    <div className="mt-2 h-9 w-20 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />

                    <div className="mt-4 h-3 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  </div>
                ))}
              </div>

              {/* Bottom Skeleton */}
              <div className="mt-6 grid gap-5 lg:grid-cols-3">
                <div className="h-64 animate-pulse rounded-2xl border bg-white dark:border-slate-800 dark:bg-slate-900 lg:col-span-2" />

                <div className="h-64 animate-pulse rounded-2xl border bg-white dark:border-slate-800 dark:bg-slate-900" />
              </div>
            </section>
          </main>
        </div>
      </div>
    );
  }

  // =========================
  // Error UI
  // =========================
  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6 dark:bg-slate-950">
        <div className="w-full max-w-md rounded-2xl border bg-white p-8 text-center shadow-lg dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-red-50 text-red-500 dark:bg-red-500/10">
            <X size={28} />
          </div>

          <h2 className="mt-5 text-xl font-bold">
            Failed to load dashboard
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            We could&apos;t load the dashboard statistics. Please try again.
          </p>

          <button
            onClick={() => refetch()}
            className="mt-6 rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="flex min-h-screen">

        {/* =========================================
            MOBILE OVERLAY
        ========================================= */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* =========================================
            MOBILE SIDEBAR
        ========================================= */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r bg-white shadow-xl transition-transform duration-300 dark:border-slate-800 dark:bg-slate-900 md:hidden ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col">

            {/* Mobile Logo */}
            <div className="flex h-16 items-center justify-between border-b px-5 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="flex size-9 items-center justify-center rounded-xl bg-cyan-500 font-bold text-white shadow-lg shadow-cyan-500/20">
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
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Close sidebar"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 space-y-1.5 p-4">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="flex w-full items-center gap-3 rounded-xl bg-cyan-500 px-4 py-3 text-left text-white shadow-lg shadow-cyan-500/20"
              >
                <LayoutDashboard size={19} />
                <span className="text-sm font-medium">Dashboard</span>
              </button>

              <button
                onClick={() => setIsSidebarOpen(false)}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <Users size={19} />
                <span className="text-sm font-medium">Users</span>
              </button>

              <button
                onClick={() => setIsSidebarOpen(false)}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <Building2 size={19} />
                <span className="text-sm font-medium">Properties</span>
              </button>

              <button
                onClick={() => setIsSidebarOpen(false)}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <Tags size={19} />
                <span className="text-sm font-medium">Categories</span>
              </button>

              <button
                onClick={() => setIsSidebarOpen(false)}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <ClipboardList size={19} />
                <span className="text-sm font-medium">Rentals</span>
              </button>

              <button
                onClick={() => setIsSidebarOpen(false)}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <CreditCard size={19} />
                <span className="text-sm font-medium">Payments</span>
              </button>

              <button
                onClick={() => setIsSidebarOpen(false)}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <Settings size={19} />
                <span className="text-sm font-medium">Settings</span>
              </button>
            </nav>

            {/* Mobile Logout */}
            <div className="border-t p-4 dark:border-slate-800">
              <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/40">
                <LogOut size={19} />
                Logout
              </button>
            </div>
          </div>
        </aside>

        {/* =========================================
            DESKTOP SIDEBAR
        ========================================= */}
        <aside className="hidden w-64 shrink-0 border-r bg-white dark:border-slate-800 dark:bg-slate-900 md:block">
          <div className="flex h-full flex-col">

            {/* Logo */}
            <div className="flex h-16 items-center border-b px-6 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="flex size-9 items-center justify-center rounded-xl bg-cyan-500 text-sm font-bold text-white shadow-lg shadow-cyan-500/20">
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
              <button className="group flex w-full items-center gap-3 rounded-xl bg-cyan-500 px-4 py-3 text-left text-white shadow-lg shadow-cyan-500/20 transition">
                <LayoutDashboard size={19} />
                <span className="text-sm font-medium">Dashboard</span>
              </button>

              <button className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-600 transition hover:bg-cyan-50 hover:text-cyan-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-cyan-400">
                <Users size={19} />
                <span className="text-sm font-medium">Users</span>
              </button>

              <button className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-600 transition hover:bg-cyan-50 hover:text-cyan-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-cyan-400">
                <Building2 size={19} />
                <span className="text-sm font-medium">Properties</span>
              </button>

              <button className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-600 transition hover:bg-cyan-50 hover:text-cyan-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-cyan-400">
                <Tags size={19} />
                <span className="text-sm font-medium">Categories</span>
              </button>

              <button className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-600 transition hover:bg-cyan-50 hover:text-cyan-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-cyan-400">
                <ClipboardList size={19} />
                <span className="text-sm font-medium">Rentals</span>
              </button>

              <button className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-600 transition hover:bg-cyan-50 hover:text-cyan-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-cyan-400">
                <CreditCard size={19} />
                <span className="text-sm font-medium">Payments</span>
              </button>

              <button className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-600 transition hover:bg-cyan-50 hover:text-cyan-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-cyan-400">
                <Settings size={19} />
                <span className="text-sm font-medium">Settings</span>
              </button>
            </nav>

            {/* Desktop Admin Profile */}
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

              <button onClick={logOut}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/40">
                <LogOut size={17} />
                Logout
              </button>
            </div>
          </div>
        </aside>

        {/* =========================================
            MAIN AREA
        ========================================= */}
        <main className="min-w-0 flex-1">

          {/* Top Navbar */}
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white/90 px-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90 sm:px-6">

            <div className="flex items-center gap-3">

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 md:hidden"
                aria-label="Open sidebar"
              >
                <Menu size={24} />
              </button>

              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-cyan-500">
                  Overview
                </p>

                <h2 className="text-lg font-bold">
                  Admin Dashboard
                </h2>
              </div>
            </div>

            {/* Admin Profile */}
            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold">
                  Admin
                </p>

                <p className="text-xs text-slate-500">
                  Administrator
                </p>
              </div>

              <div className="flex size-10 items-center justify-center rounded-full border-2 border-cyan-100 bg-cyan-50 font-bold text-cyan-600 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-400">
                A
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <section className="p-4 sm:p-6 lg:p-8">

            {/* Welcome */}
            <div className="mb-8">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    Welcome back, Admin 👋
                  </h1>

                  <p className="mt-2 text-sm text-slate-500">
                    Here&apos;s what&apos;s happening with RentNest today.
                  </p>
                </div>

                <div className="hidden rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:block">
                  Dashboard Overview
                </div>
              </div>
            </div>

            {/* =====================================
                STAT CARDS
            ===================================== */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">

              {/* Users */}
              <div className="group rounded-2xl border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-start justify-between">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                    <Users size={21} />
                  </div>

                  <span className="rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-semibold text-green-600 dark:bg-green-500/10 dark:text-green-400">
                    Active
                  </span>
                </div>

                <p className="mt-5 text-sm font-medium text-slate-500">
                  Total Users
                </p>

                <h3 className="mt-1 text-3xl font-bold tracking-tight">
                  {data?.totalUsers ?? 0}
                </h3>

                <p className="mt-2 text-xs text-slate-400">
                  Registered users
                </p>
              </div>

              {/* Properties */}
              <div className="group rounded-2xl border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-start justify-between">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                    <Building2 size={21} />
                  </div>

                  <span className="rounded-full bg-purple-50 px-2.5 py-1 text-[11px] font-semibold text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                    Listed
                  </span>
                </div>

                <p className="mt-5 text-sm font-medium text-slate-500">
                  Total Properties
                </p>

                <h3 className="mt-1 text-3xl font-bold tracking-tight">
                  {data?.totalProperties ?? 0}
                </h3>

                <p className="mt-2 text-xs text-slate-400">
                  Available properties
                </p>
              </div>

              {/* Rentals */}
              <div className="group rounded-2xl border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-start justify-between">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                    <ClipboardList size={21} />
                  </div>

                  <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-semibold text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                    Requests
                  </span>
                </div>

                <p className="mt-5 text-sm font-medium text-slate-500">
                  Rental Requests
                </p>

                <h3 className="mt-1 text-3xl font-bold tracking-tight">
                  {data?.totalRentalRequests ?? 0}
                </h3>

                <p className="mt-2 text-xs text-slate-400">
                  Total rental requests
                </p>
              </div>

              {/* Revenue */}
              <div className="group rounded-2xl border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-start justify-between">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <CreditCard size={21} />
                  </div>

                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                    Revenue
                  </span>
                </div>

                <p className="mt-5 text-sm font-medium text-slate-500">
                  Total Revenue
                </p>

                <h3 className="mt-1 text-3xl font-bold tracking-tight">
                  ৳{Number(data?.totalRevenue ?? 0).toLocaleString()}
                </h3>

                <p className="mt-2 text-xs text-slate-400">
                  Total platform revenue
                </p>
              </div>

              {/* Payments */}
              <div className="group rounded-2xl border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-start justify-between">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
                    <CreditCard size={21} />
                  </div>

                  <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-semibold text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
                    Success
                  </span>
                </div>

                <p className="mt-5 text-sm font-medium text-slate-500">
                  Completed Payments
                </p>

                <h3 className="mt-1 text-3xl font-bold tracking-tight">
                  {data?.completedPayments ?? 0}
                </h3>

                <p className="mt-2 text-xs text-slate-400">
                  Successfully completed
                </p>
              </div>
            </div>

            {/* =====================================
                BOTTOM SECTION
            ===================================== */}
            <div className="mt-6 grid gap-5 lg:grid-cols-3">

              {/* Platform Overview */}
              <div className="rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">
                      Platform Overview
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Quick summary of your RentNest platform.
                    </p>
                  </div>

                  <div className="flex size-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
                    <TrendingUp size={19} />
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">

                  <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
                    <p className="text-xs text-slate-500">
                      Users
                    </p>

                    <p className="mt-1 text-xl font-bold">
                      {data?.totalUsers ?? 0}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
                    <p className="text-xs text-slate-500">
                      Properties
                    </p>

                    <p className="mt-1 text-xl font-bold">
                      {data?.totalProperties ?? 0}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
                    <p className="text-xs text-slate-500">
                      Payments
                    </p>

                    <p className="mt-1 text-xl font-bold">
                      {data?.completedPayments ?? 0}
                    </p>
                  </div>

                </div>
              </div>

              {/* Revenue Summary */}
              <div className="rounded-2xl bg-cyan-500 p-6 text-white shadow-lg shadow-cyan-500/20">

                <div className="flex size-11 items-center justify-center rounded-xl bg-white/15">
                  <CreditCard size={21} />
                </div>

                <p className="mt-6 text-sm font-medium text-cyan-100">
                  Total Platform Revenue
                </p>

                <h3 className="mt-1 text-3xl font-bold">
                  ৳{Number(data?.totalRevenue ?? 0).toLocaleString()}
                </h3>

                <div className="mt-6 border-t border-white/20 pt-4">
                  <p className="text-xs text-cyan-100">
                    Completed Payments
                  </p>

                  <p className="mt-1 text-xl font-bold">
                    {data?.completedPayments ?? 0}
                  </p>
                </div>

              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;