import Image from "next/image";
import {
  Mail,
  ShieldCheck,
  UserCheck,
  UserX,
} from "lucide-react";

import UserRoleSelect from "./UserRoleSelect";
import UserStatusButton from "./UserStatusButton";

type User = {
  id: string;
  name?: string;
  email?: string;
  role?: string;
  status?: string;
  image?: string | null;
};

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  const initial =
    user.name?.charAt(0)?.toUpperCase() || "U";

  const isActive =
    user.status?.toUpperCase() === "ACTIVE";

  const role =
    user.role?.toUpperCase() || "TENANT";

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900">

      {/* User Header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">

          {/* Avatar + User Info */}
          <div className="flex min-w-0 items-center gap-3">

            {/* Avatar */}
            <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-cyan-100 text-lg font-bold text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300">

              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "User profile"}
                  width={48}
                  height={48}
                  className="size-full object-cover"
                />
              ) : (
                initial
              )}

            </div>

            {/* Name + Email */}
            <div className="min-w-0">

              <h2 className="truncate text-base font-bold text-slate-900 dark:text-white">
                {user.name || "Unknown User"}
              </h2>

              <div className="mt-1.5 flex min-w-0 items-center gap-2">

                <Mail className="size-4 shrink-0 text-slate-500 dark:text-slate-400" />

                <span className="truncate text-sm font-medium text-slate-700 dark:text-slate-300">
                  {user.email || "No email"}
                </span>

              </div>
            </div>
          </div>

          {/* Status Icon */}
          <div
            className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${
              isActive
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                : "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400"
            }`}
          >
            {isActive ? (
              <UserCheck className="size-5" />
            ) : (
              <UserX className="size-5" />
            )}
          </div>

        </div>

        {/* Divider */}
        <div className="my-5 border-t border-slate-200 dark:border-slate-700" />

        {/* User Details */}
        <div className="grid grid-cols-2 gap-3">

          {/* Role */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">

            <div className="mb-2 flex items-center gap-2">

              <ShieldCheck className="size-4 text-slate-600 dark:text-slate-300" />

              <span className="text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-300">
                Role
              </span>

            </div>

            <UserRoleSelect
              userId={user.id}
              currentRole={role}
            />

          </div>

          {/* Status */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">

            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-300">
              Status
            </p>

            <div className="flex items-center gap-2">

              <span
                className={`size-2.5 rounded-full ${
                  isActive
                    ? "bg-emerald-500"
                    : "bg-red-500"
                }`}
              />

              <span
                className={`text-sm font-bold ${
                  isActive
                    ? "text-emerald-700 dark:text-emerald-400"
                    : "text-red-700 dark:text-red-400"
                }`}
              >
                {isActive ? "ACTIVE" : "BANNED"}
              </span>

            </div>

          </div>
        </div>
      </div>

      {/* Action */}
      <div className="border-t border-slate-200 bg-slate-50 px-5 py-4 dark:border-slate-700 dark:bg-slate-950/40">

        <UserStatusButton
          userId={user.id}
          status={user.status}
        />

      </div>

    </div>
  );
};

export default UserCard;