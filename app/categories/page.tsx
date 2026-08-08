import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories | RentNest",
  description: "Explore rental property categories on RentNest.",
};

const CategoriesPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <section className="px-5 py-16 sm:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
              RentNest
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Property Categories
            </h1>

            <p className="mt-3 max-w-2xl text-muted-foreground">
              Browse properties by category and find the right
              place for your needs.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-10 text-center">
            <h2 className="text-xl font-semibold text-foreground">
              Categories Coming Soon
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Property categories will appear here.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CategoriesPage;