
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Users,
  Mail,
  ShieldCheck,
  UserCheck,
  UserX,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/service/admin.service";

const UserPage = () => {
  const [search, setSearch] = useState("");

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-users"],
    queryFn: getAllUsers,
  });

  const filteredUsers = useMemo(() => {
    if (!users) return [];

    return users.filter((user) => {
      const value = search.toLowerCase();

      return (
        user.name?.toLowerCase().includes(value) ||
        user.email?.toLowerCase().includes(value) ||
        user.role?.toLowerCase().includes(value) ||
        user.status?.toLowerCase().includes(value)
      );
    });
  }, [users, search]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <div className="h-8 w-48 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="mt-3 h-4 w-72 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-2xl border bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-full bg-slate-200 dark:bg-slate-800" />
                  <div className="flex-1">
                    <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="mt-2 h-3 w-44 rounded bg-slate-200 dark:bg-slate-800" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/50 dark:bg-red-950/20">
            <UserX className="mx-auto size-10 text-red-500" />

            <h2 className="mt-3 text-lg font-semibold text-red-700 dark:text-red-400">
              Failed to load users
            </h2>

            <p className="mt-1 text-sm text-red-600/80 dark:text-red-400/70">
              Something went wrong while fetching user data.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500">
                <Users size={22} />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Users
                </h1>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Manage all RentNest users from one place.
                </p>
              </div>
            </div>
          </div>

          {/* Total Users */}
          <div className="flex items-center gap-3 rounded-2xl border bg-white px-5 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex size-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500">
              <Users size={20} />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Total Users
              </p>

              <p className="text-xl font-bold text-slate-900 dark:text-white">
                {users?.length ?? 0}
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-xl">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search by name, email, role or status..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 ? (
          <div className="rounded-2xl border bg-white px-6 py-16 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">
              <Users size={25} />
            </div>

            <h2 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
              No users found
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Try searching with a different name, email or role.
            </p>
          </div>
        ) : (
          <>
            {/* Result Count */}
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Showing{" "}
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {filteredUsers.length}
                </span>{" "}
                users
              </p>
            </div>

            {/* User Cards */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredUsers.map((user) => {
                const initial = user.name?.charAt(0)?.toUpperCase() || "U";

                const isActive =
                  user.status?.toLowerCase() === "active";

                const isAdmin =
                  user.role?.toLowerCase() === "admin";

                return (
                  <div
                    key={user.id}
                    className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                  >
                    {/* User Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-cyan-500/10 text-lg font-bold text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-400">
                          {initial}
                        </div>

                        <div className="min-w-0">
                          <h2 className="truncate font-semibold text-slate-900 dark:text-white">
                            {user.name}
                          </h2>

                          <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                            <Mail size={14} />
                            <span className="truncate">{user.email}</span>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${
                          isActive
                            ? "bg-emerald-500/10 text-emerald-500"
                            : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        {isActive ? (
                          <UserCheck size={17} />
                        ) : (
                          <UserX size={17} />
                        )}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="my-5 border-t border-slate-100 dark:border-slate-800" />

                    {/* User Info */}
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                          Role
                        </p>

                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                            isAdmin
                              ? "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                              : "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                          }`}
                        >
                          <ShieldCheck size={13} />
                          {user.role}
                        </span>
                      </div>

                      <div className="text-right">
                        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                          Status
                        </p>

                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            isActive
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              : "bg-red-500/10 text-red-600 dark:text-red-400"
                          }`}
                        >
                          {user.status}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserPage;
