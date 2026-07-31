import { Users } from "lucide-react";

interface UserHeaderProps {
  totalUsers: number;
}

const UserHeader = ({ totalUsers }: UserHeaderProps) => {
  return (
    <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      {/* Title */}
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
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Total Users
          </p>

          <p className="text-xl font-bold text-slate-900 dark:text-white">
            {totalUsers}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;