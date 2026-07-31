import { Users } from "lucide-react";

const UserEmpty = () => {
  return (
    <div className="rounded-2xl border bg-white px-6 py-16 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">
        <Users size={25} />
      </div>

      <h2 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
        No users found
      </h2>

      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Try searching with a different name, email or role.
      </p>
    </div>
  );
};

export default UserEmpty;