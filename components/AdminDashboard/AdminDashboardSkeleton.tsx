const AdminDashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="flex min-h-screen">

        {/* Sidebar Skeleton */}
        <aside className="hidden w-64 shrink-0 border-r bg-white dark:border-slate-800 dark:bg-slate-900 md:block">
          <div className="flex h-full flex-col">

            <div className="flex h-16 items-center border-b px-6 dark:border-slate-800">
              <div className="h-7 w-28 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
            </div>

            <div className="flex-1 space-y-3 p-4">
              {Array.from({ length: 7 }).map((_, index) => (
                <div
                  key={index}
                  className="flex h-11 items-center gap-3 rounded-xl px-4"
                >
                  <div className="size-5 animate-pulse rounded-md bg-slate-200 dark:bg-slate-700" />

                  <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                </div>
              ))}
            </div>

            <div className="border-t p-4 dark:border-slate-800">
              <div className="flex h-11 items-center gap-3 px-4">
                <div className="size-5 animate-pulse rounded-md bg-slate-200 dark:bg-slate-700" />

                <div className="h-4 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
              </div>
            </div>
          </div>
        </aside>

        {/* Main Skeleton */}
        <main className="min-w-0 flex-1">

          {/* Navbar */}
          <header className="flex h-16 items-center justify-between border-b bg-white px-4 dark:border-slate-800 dark:bg-slate-900 sm:px-6">
            <div className="h-5 w-36 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

            <div className="flex items-center gap-3">
              <div className="hidden space-y-2 sm:block">
                <div className="ml-auto h-4 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                <div className="ml-auto h-3 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              </div>

              <div className="size-10 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
            </div>
          </header>

          <section className="p-4 sm:p-6 lg:p-8">

            {/* Welcome Skeleton */}
            <div className="mb-8">
              <div className="h-8 w-72 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />

              <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            </div>

            {/* Stats Skeleton */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-2xl border bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="size-11 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />

                  <div className="mt-5 h-4 w-28 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                  <div className="mt-2 h-9 w-20 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />

                  <div className="mt-4 h-3 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                </div>
              ))}
            </div>

            {/* Bottom Skeleton */}
            <div className="mt-6 grid gap-5 lg:grid-cols-3">
              <div className="h-64 animate-pulse rounded-2xl border bg-white dark:border-slate-800 dark:bg-slate-900 lg:col-span-2" />

              <div className="h-64 animate-pulse rounded-2xl border bg-white dark:border-slate-800 dark:bg-slate-900" />
            </div>

          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardSkeleton;