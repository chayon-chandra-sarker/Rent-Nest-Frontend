import CategoriesTable from "@/components/AdminDashboard/Categories/CategoriesTable";

const CategoriesPage = () => {
  return (
    <main className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-7xl">
        <CategoriesTable />
      </div>
    </main>
  );
};

export default CategoriesPage;