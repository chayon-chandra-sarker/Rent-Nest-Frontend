import {
  Mail,
  ShieldCheck,
  UserCheck,
  UserX,
} from "lucide-react";

type User = {
  id: string;
  name?: string;
  email?: string;
  role?: string;
  status?: string;
};

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  const initial = user.name?.charAt(0)?.toUpperCase() || "U";

  const isActive = user.status?.toLowerCase() === "active";

  const isAdmin = user.role?.toLowerCase() === "admin";

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      {/* User Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          {/* Avatar */}
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-cyan-500/10 text-lg font-bold text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-400">
            {initial}
          </div>

          {/* Name & Email */}
          <div className="min-w-0">
            <h2 className="truncate font-semibold text-slate-900 dark:text-white">
              {user.name}
            </h2>

            <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
              <Mail size={14} />

              <span className="truncate">
                {user.email}
              </span>
            </div>
          </div>
        </div>

        {/* Status Icon */}
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
        {/* Role */}
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

        {/* Status */}
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
};

export default UserCard;