import { UserX } from "lucide-react";

const UserError = () => {
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
};

export default UserError;