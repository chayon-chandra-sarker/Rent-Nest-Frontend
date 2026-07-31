const UserSkeleton = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-8 w-48 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />

          <div className="mt-3 h-4 w-72 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        </div>

        {/* User Cards Skeleton */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-2xl border bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="size-12 rounded-full bg-slate-200 dark:bg-slate-800" />

                {/* User Info */}
                <div className="flex-1">
                  <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800" />

                  <div className="mt-2 h-3 w-44 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>

              {/* Divider */}
              <div className="my-5 h-px bg-slate-200 dark:bg-slate-800" />

              {/* Bottom Info */}
              <div className="flex justify-between">
                <div>
                  <div className="h-3 w-12 rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="mt-2 h-6 w-20 rounded-full bg-slate-200 dark:bg-slate-800" />
                </div>

                <div className="text-right">
                  <div className="ml-auto h-3 w-12 rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="mt-2 ml-auto h-6 w-20 rounded-full bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserSkeleton;