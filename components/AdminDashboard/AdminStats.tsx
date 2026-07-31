
"use client";

import {
  Users,
  Building2,
  ClipboardList,
  CreditCard,
  TrendingUp,
  ArrowUpRight,
  Wallet,
  Activity,
} from "lucide-react";

import type { AdminDashboardStats } from "@/types/admin.types";

interface AdminStatsProps {
  data: AdminDashboardStats | undefined;
}

const AdminStats = ({ data }: AdminStatsProps) => {
  const stats = [
    {
      title: "Total Users",
      value: data?.totalUsers ?? 0,
      description: "Registered users",
      icon: Users,
      iconBg: "bg-blue-50 dark:bg-blue-500/10",
      iconColor: "text-blue-600 dark:text-blue-400",
      badge: "Users",
      badgeStyle:
        "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
    },
    {
      title: "Total Properties",
      value: data?.totalProperties ?? 0,
      description: "Properties listed",
      icon: Building2,
      iconBg: "bg-violet-50 dark:bg-violet-500/10",
      iconColor: "text-violet-600 dark:text-violet-400",
      badge: "Listings",
      badgeStyle:
        "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
    },
    {
      title: "Rental Requests",
      value: data?.totalRentalRequests ?? 0,
      description: "Total rental requests",
      icon: ClipboardList,
      iconBg: "bg-orange-50 dark:bg-orange-500/10",
      iconColor: "text-orange-600 dark:text-orange-400",
      badge: "Requests",
      badgeStyle:
        "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
    },
    {
      title: "Total Revenue",
      value: `৳${Number(data?.totalRevenue ?? 0).toLocaleString()}`,
      description: "Platform revenue",
      icon: Wallet,
      iconBg: "bg-emerald-50 dark:bg-emerald-500/10",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      badge: "Revenue",
      badgeStyle:
        "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    },
    {
      title: "Completed Payments",
      value: data?.completedPayments ?? 0,
      description: "Successful payments",
      icon: CreditCard,
      iconBg: "bg-cyan-50 dark:bg-cyan-500/10",
      iconColor: "text-cyan-600 dark:text-cyan-400",
      badge: "Completed",
      badgeStyle:
        "bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400",
    },
  ];

  return (
    <section className="min-h-[calc(100vh-4rem)] bg-slate-50 p-4 dark:bg-slate-950 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* ================= HEADER ================= */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />

              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                System Overview
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Welcome back, Admin
              <span className="ml-2">👋</span>
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
              Monitor your RentNest platform, users, properties,
              rental requests and payments from one place.
            </p>
          </div>

          <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex">
            <div className="flex size-9 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
              <Activity size={18} />
            </div>

            <div>
              <p className="text-xs font-medium text-slate-400">
                Dashboard Status
              </p>

              <p className="text-sm font-semibold text-emerald-600">
                All systems active
              </p>
            </div>
          </div>
        </div>

        {/* ================= STAT CARDS ================= */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
              >
                {/* Top */}
                <div className="flex items-start justify-between">
                  <div
                    className={`flex size-11 items-center justify-center rounded-xl ${stat.iconBg}`}
                  >
                    <Icon size={21} className={stat.iconColor} />
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${stat.badgeStyle}`}
                  >
                    {stat.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="mt-5">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {stat.title}
                  </p>

                  <h2 className="mt-1 truncate text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                    {stat.value}
                  </h2>

                  <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                    {stat.description}
                  </p>
                </div>

                {/* Decorative */}
                <div className="absolute -bottom-8 -right-8 size-24 rounded-full bg-slate-100/70 transition-transform duration-500 group-hover:scale-150 dark:bg-slate-800/30" />
              </div>
            );
          })}
        </div>

        {/* ================= BOTTOM SECTION ================= */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Platform Overview */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-cyan-500">
                  Platform
                </p>

                <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                  RentNest Overview
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  A quick look at your platform activity.
                </p>
              </div>

              <div className="flex size-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
                <TrendingUp size={19} />
              </div>
            </div>

            {/* Overview Items */}
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {/* Users */}
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/40">
                <div className="flex items-center justify-between">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                    <Users size={17} />
                  </div>

                  <ArrowUpRight
                    size={16}
                    className="text-slate-400"
                  />
                </div>

                <p className="mt-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                  Registered Users
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                  {data?.totalUsers ?? 0}
                </p>
              </div>

              {/* Properties */}
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/40">
                <div className="flex items-center justify-between">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                    <Building2 size={17} />
                  </div>

                  <ArrowUpRight
                    size={16}
                    className="text-slate-400"
                  />
                </div>

                <p className="mt-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                  Listed Properties
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                  {data?.totalProperties ?? 0}
                </p>
              </div>

              {/* Payments */}
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/40">
                <div className="flex items-center justify-between">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <CreditCard size={17} />
                  </div>

                  <ArrowUpRight
                    size={16}
                    className="text-slate-400"
                  />
                </div>

                <p className="mt-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                  Completed Payments
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                  {data?.completedPayments ?? 0}
                </p>
              </div>
            </div>
          </div>

          {/* ================= REVENUE CARD ================= */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 p-6 text-white shadow-xl shadow-cyan-500/20">
            {/* Decorative circles */}
            <div className="absolute -right-12 -top-12 size-36 rounded-full bg-white/10" />
            <div className="absolute -bottom-16 -left-10 size-40 rounded-full bg-white/10" />

            <div className="relative">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-100">
                    Financial Summary
                  </p>

                  <h3 className="mt-1 text-lg font-bold">
                    Platform Revenue
                  </h3>
                </div>

                <div className="flex size-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
                  <Wallet size={21} />
                </div>
              </div>

              <div className="mt-8">
                <p className="text-sm text-cyan-100">
                  Total Revenue
                </p>

                <p className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                  ৳{Number(data?.totalRevenue ?? 0).toLocaleString()}
                </p>
              </div>

              <div className="mt-8 border-t border-white/20 pt-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-cyan-100">
                      Completed Payments
                    </p>

                    <p className="mt-1 text-xl font-bold">
                      {data?.completedPayments ?? 0}
                    </p>
                  </div>

                  <div className="flex size-9 items-center justify-center rounded-full bg-white/15">
                    <CreditCard size={16} />
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2.5">
                <span className="flex size-6 items-center justify-center rounded-full bg-white/15">
                  <TrendingUp size={13} />
                </span>

                <span className="text-xs font-medium text-cyan-50">
                  Revenue from successful transactions
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminStats;
