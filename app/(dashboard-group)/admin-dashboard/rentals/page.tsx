import RentalRequestsTable from "@/components/AdminDashboard/RentalRequests/RentalRequestsTable";

const RentalRequestsPage = () => {
  return (
    <main className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-7xl">
        <RentalRequestsTable />
      </div>
    </main>
  );
};

export default RentalRequestsPage;