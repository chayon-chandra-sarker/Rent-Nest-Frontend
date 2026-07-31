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
import UserError from "@/components/AdminDashboard/Users/UserError";
import UserEmpty from "@/components/AdminDashboard/Users/UserEmpty";
import UserSkeleton from "@/components/AdminDashboard/Users/UserSkeleton";
import UserCard from "@/components/AdminDashboard/Users/UserCard";
import UserSearch from "@/components/AdminDashboard/Users/UserSearch";
import UserHeader from "@/components/AdminDashboard/Users/UserHeader";

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
    return <UserSkeleton></UserSkeleton>;
  }

  if (isError) {
    return <UserError></UserError>;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <UserHeader totalUsers={users?.length ?? 0}></UserHeader>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-xl">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <UserSearch search={search} onSearchChange={setSearch}></UserSearch>
          </div>
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 ? (
          <UserEmpty></UserEmpty>
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
              {filteredUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserPage;
