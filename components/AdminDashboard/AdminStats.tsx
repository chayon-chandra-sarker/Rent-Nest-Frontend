"use client";

import {
  Users,
  Building2,
  ClipboardList,
  CreditCard,
  TrendingUp,
} from "lucide-react";

import type { AdminDashboardStats } from "@/types/admin.types";

interface AdminStatsProps {
  data: AdminDashboardStats | undefined;
}

const AdminStats = ({ data }: AdminStatsProps) => {
  return (
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

      {/* Stats Cards */}
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

      {/* Bottom Section */}
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {/* Platform Overview */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Platform Overview</h3>

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
              <p className="text-xs text-slate-500">Users</p>

              <p className="mt-1 text-xl font-bold">
                {data?.totalUsers ?? 0}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
              <p className="text-xs text-slate-500">Properties</p>

              <p className="mt-1 text-xl font-bold">
                {data?.totalProperties ?? 0}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
              <p className="text-xs text-slate-500">Payments</p>

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
  );
};

export default AdminStats;