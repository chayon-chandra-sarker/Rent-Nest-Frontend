import LandlordProperties from "@/app/(dashboard-group)/_components/landlord/LandlordProperties";
import LandlordStats from "@/app/(dashboard-group)/_components/landlord/LandlordStats";

const LandLordDashboard = () => {
  return (
    <div className="space-y-8">
      <LandlordStats />

      <LandlordProperties />
    </div>
  );
};

export default LandLordDashboard;