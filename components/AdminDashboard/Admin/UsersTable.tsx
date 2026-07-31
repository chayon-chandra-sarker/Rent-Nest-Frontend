"use client";

import { useEffect, useState } from "react";
import {
  MapPin,
  Mail,
  Phone,
  User,
} from "lucide-react";
import Image from "next/image";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  phone: string | null;
  image: string | null;
  address: string | null;
  createdAt: string;
}

export default function UsersTable() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/admin/users", {
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok || !data?.success) {
          throw new Error(
            data?.message || "Failed to fetch users"
          );
        }

        setUsers(data.data || []);
      } catch (error) {
        console.error("Fetch users error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="rounded-3xl border bg-card p-8 text-center">
        <p className="text-sm text-muted-foreground">
          Loading users...
        </p>
      </div>
    );
  }

  return (
    <section className="overflow-hidden rounded-3xl border bg-card shadow-sm">
      {/* Header */}
      <div className="border-b p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold">
              All Users
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage all tenants, landlords and admins.
            </p>
          </div>

          <div className="w-fit rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            {users.length} Users
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/30 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Address</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => {
              const avatarLetter =
                user.name?.charAt(0)?.toUpperCase() || "U";

              return (
                <tr
                  key={user.id}
                  className="border-b last:border-b-0 transition hover:bg-muted/20"
                >
                  {/* User */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary/10 font-bold text-primary">
                        {user.image ? (
                          <Image
                            src={user.image}
                            alt={user.name || "User profile"}
                            fill
                            sizes="44px"
                            className="object-cover"
                          />
                        ) : (
                          avatarLetter
                        )}
                      </div>

                      {/* User Info */}
                      <div className="min-w-0">
                        <p className="truncate font-semibold">
                          {user.name}
                        </p>

                        <p className="truncate text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-6 py-5">
                    <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase text-primary">
                      {user.role}
                    </span>
                  </td>

                  {/* Contact */}
                  <td className="px-6 py-5">
                    <div className="space-y-1 text-sm">
                      <p className="flex items-center gap-2">
                        <Mail className="size-3.5 text-muted-foreground" />
                        {user.email}
                      </p>

                      {user.phone && (
                        <p className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="size-3.5" />
                          {user.phone}
                        </p>
                      )}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
                        user.status?.toUpperCase() ===
                        "ACTIVE"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      <span
                        className={`size-2 rounded-full ${
                          user.status?.toUpperCase() ===
                          "ACTIVE"
                            ? "bg-emerald-500"
                            : "bg-destructive"
                        }`}
                      />

                      {user.status}
                    </span>
                  </td>

                  {/* Address */}
                  <td className="px-6 py-5">
                    {user.address ? (
                      <span className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="size-4" />
                        {user.address}
                      </span>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        Not provided
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="divide-y md:hidden">
        {users.map((user) => {
          const avatarLetter =
            user.name?.charAt(0)?.toUpperCase() || "U";

          return (
            <div key={user.id} className="p-5">
              {/* User Header */}
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary/10 font-bold text-primary">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User profile"}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  ) : (
                    avatarLetter
                  )}
                </div>

                {/* User Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">
                      {user.name}
                    </h3>

                    <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-bold uppercase text-primary">
                      {user.role}
                    </span>
                  </div>

                  <p className="mt-1 flex items-center gap-1.5 truncate text-sm text-muted-foreground">
                    <Mail className="size-3.5" />
                    {user.email}
                  </p>
                </div>
              </div>

              {/* User Details */}
              <div className="mt-4 grid gap-3 text-sm">
                {/* Status */}
                <div className="flex items-center justify-between rounded-xl bg-muted/30 p-3">
                  <span className="text-muted-foreground">
                    Status
                  </span>

                  <span
                    className={`flex items-center gap-2 font-semibold ${
                      user.status?.toUpperCase() ===
                      "ACTIVE"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-destructive"
                    }`}
                  >
                    <span
                      className={`size-2 rounded-full ${
                        user.status?.toUpperCase() ===
                        "ACTIVE"
                          ? "bg-emerald-500"
                          : "bg-destructive"
                      }`}
                    />

                    {user.status}
                  </span>
                </div>

                {/* Phone */}
                {user.phone && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="size-4" />
                    {user.phone}
                  </div>
                )}

                {/* Address */}
                {user.address && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="size-4" />
                    {user.address}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {users.length === 0 && (
        <div className="p-10 text-center">
          <User className="mx-auto size-10 text-muted-foreground" />

          <p className="mt-3 font-medium">
            No users found
          </p>
        </div>
      )}
    </section>
  );
}