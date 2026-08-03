
"use client";

import { useEffect, useState } from "react";

import {
  getMyRentalRequests,
  MyRentalRequest,
} from "@/service/rental.service";

import {
  getMyPayments,
  MyPayment,
} from "@/service/payment.service";

import TenantStats from "@/app/(dashboard-group)/_components/tenant/TenantStats";
import QuickActions from "@/app/(dashboard-group)/_components/tenant/QuickActions";
import RecentRentals from "@/app/(dashboard-group)/_components/tenant/RecentRentals";
import RecentPayments from "@/app/(dashboard-group)/_components/tenant/RecentPayments";

const UserDashboard = () => {
  const [rentalRequests, setRentalRequests] = useState<
    MyRentalRequest[]
  >([]);

  const [payments, setPayments] = useState<MyPayment[]>([]);

  const [rentalLoading, setRentalLoading] =
    useState(true);

  const [paymentLoading, setPaymentLoading] =
    useState(true);

  useEffect(() => {
    const fetchRentalRequests = async () => {
      try {
        const data = await getMyRentalRequests();

        setRentalRequests(data);
      } catch (error) {
        console.error(
          "Failed to fetch rental requests:",
          error
        );
      } finally {
        setRentalLoading(false);
      }
    };

    fetchRentalRequests();
  }, []);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await getMyPayments();

        setPayments(data);
      } catch (error) {
        console.error(
          "Failed to fetch payments:",
          error
        );
      } finally {
        setPaymentLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const totalRequests = rentalRequests.length;

  const approvedRequests = rentalRequests.filter(
    (request) => request.status === "APPROVED"
  ).length;

  const totalPaymentAmount = payments
    .filter(
      (payment) =>
        payment.status?.toUpperCase() === "COMPLETED"
    )
    .reduce(
      (total, payment) =>
        total + Number(payment.amount || 0),
      0
    );

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back 👋
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your rentals, payments and requests
          from here.
        </p>
      </div>

      <TenantStats
        rentalLoading={rentalLoading}
        paymentLoading={paymentLoading}
        totalRequests={totalRequests}
        approvedRequests={approvedRequests}
        totalPaymentAmount={totalPaymentAmount}
      />
      <QuickActions />

      <div className="grid gap-6 lg:grid-cols-2">

        <RecentRentals
          rentalRequests={rentalRequests}
          loading={rentalLoading}
        />

        <RecentPayments
          payments={payments}
          loading={paymentLoading}
        />

      </div>

    </div>
  );
};

export default UserDashboard;

