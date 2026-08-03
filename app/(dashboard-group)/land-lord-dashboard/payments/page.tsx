
import { getLandlordPayments } from "@/service/landlord-payment.service";
import PaymentList from "../../_components/landlord/PaymentList";


const LandlordPaymentsPage = async () => {
  const payments = await getLandlordPayments();

  return <PaymentList payments={payments} />;
};

export default LandlordPaymentsPage;