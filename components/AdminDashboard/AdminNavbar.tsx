
"use client";

const AdminNavbar = () => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white/90 px-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90 sm:px-6">
      {/* Left Side */}
      <div>
        <p className="text-[11px] font-medium uppercase tracking-wider text-cyan-500">
          Overview
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Admin Dashboard
        </h2>
      </div>

      {/* Admin Profile */}
      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            Admin
          </p>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Administrator
          </p>
        </div>

        <div className="flex size-10 items-center justify-center rounded-full border-2 border-cyan-100 bg-cyan-50 font-bold text-cyan-600 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-400">
          A
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;

