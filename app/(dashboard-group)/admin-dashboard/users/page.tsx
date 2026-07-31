
"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/service/admin.service";
import UserError from "@/components/AdminDashboard/Users/UserError";
import UserEmpty from "@/components/AdminDashboard/Users/UserEmpty";
import UserSkeleton from "@/components/AdminDashboard/Users/UserSkeleton";
import UserCard from "@/components/AdminDashboard/Users/UserCard";
import UserSearch from "@/components/AdminDashboard/Users/UserSearch";
import UserHeader from "@/components/AdminDashboard/Users/UserHeader";
import UserPagination from "@/components/AdminDashboard/Users/UserPagination";

const UserPage = () => {
  const [search, setSearch] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 6;

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-users"],
    queryFn: getAllUsers,
  });

  // Search / Filter Users
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

  // Total Pages
  const totalPages = Math.ceil(
    filteredUsers.length / usersPerPage
  );

  // Current Page Starting Index
  const startIndex =
    (currentPage - 1) * usersPerPage;

  // Current Page Users
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  // Loading
  if (isLoading) {
    return <UserSkeleton />;
  }

  // Error
  if (isError) {
    return <UserError />;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">

        <UserHeader
          totalUsers={users?.length ?? 0}
        />

        <div className="mb-6">
          <div className="relative max-w-xl">

            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <UserSearch
              search={search}
              onSearchChange={(value) => {
                setSearch(value);
                setCurrentPage(1);
              }}
            />

          </div>
        </div>

        {filteredUsers.length === 0 ? (
          <UserEmpty />
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-slate-500 dark:text-slate-400">

                Showing{" "}

                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {startIndex + 1}
                </span>

                {" - "}

                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {Math.min(
                    startIndex + usersPerPage,
                    filteredUsers.length
                  )}
                </span>

                {" of "}

                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {filteredUsers.length}
                </span>

                {" users"}

              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

              {currentUsers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                />
              ))}

            </div>

            <UserPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />

          </>
        )}

      </div>
    </div>
  );
};

export default UserPage;

