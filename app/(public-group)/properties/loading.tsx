import { Building2, Loader2 } from "lucide-react";

const PropertiesLoading = () => {
  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="h-4 w-32 animate-pulse rounded bg-muted" />

          <div className="mt-3 h-10 w-64 animate-pulse rounded-lg bg-muted" />

          <div className="mt-3 h-4 w-80 animate-pulse rounded bg-muted" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="aspect-[4/3] animate-pulse bg-muted" />

              <div className="space-y-4 p-5">
                <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />

                <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />

                <div className="flex gap-3">
                  <div className="h-4 w-16 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-16 animate-pulse rounded bg-muted" />
                </div>

                <div className="flex justify-between">
                  <div className="h-6 w-24 animate-pulse rounded bg-muted" />

                  <div className="h-9 w-28 animate-pulse rounded-lg bg-muted" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex min-h-20 items-center justify-center">
          <Loader2 className="size-6 animate-spin text-primary" />
        </div>
      </section>
    </main>
  );
};

export default PropertiesLoading;