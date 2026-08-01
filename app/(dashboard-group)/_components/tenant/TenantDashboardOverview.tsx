
"use client";

import { useEffect, useState } from "react";
import {
  ClipboardList,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";
import { getMyRentalRequests, MyRentalRequest } from "@/service/rental.service";



const TenantDashboardOverview = () => {
  const [requests, setRequests] = useState<MyRentalRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getMyRentalRequests();

        setRequests(data);
      } catch (error) {
        console.error(
          "Failed to fetch rental requests:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const totalRequests = requests.length;

  const approvedRequests = requests.filter(
    (request) => request.status === "APPROVED"
  ).length;

  const pendingRequests = requests.filter(
    (request) => request.status === "PENDING"
  ).length;

  const rejectedRequests = requests.filter(
    (request) => request.status === "REJECTED"
  ).length;

  const stats = [
    {
      title: "Total Requests",
      value: totalRequests,
      description: "All rental requests",
      icon: ClipboardList,
      iconClass: "bg-primary/10 text-primary",
    },
    {
      title: "Approved",
      value: approvedRequests,
      description: "Approved rental requests",
      icon: CheckCircle2,
      iconClass: "bg-emerald-500/10 text-emerald-500",
    },
    {
      title: "Pending",
      value: pendingRequests,
      description: "Waiting for approval",
      icon: Clock3,
      iconClass: "bg-amber-500/10 text-amber-500",
    },
    {
      title: "Rejected",
      value: rejectedRequests,
      description: "Rejected requests",
      icon: XCircle,
      iconClass: "bg-red-500/10 text-red-500",
    },
  ];

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                <div className="h-8 w-12 animate-pulse rounded bg-muted" />
              </div>

              <div className="size-11 animate-pulse rounded-xl bg-muted" />
            </div>

            <div className="mt-4 h-3 w-32 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="group rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>

                <p className="mt-2 text-3xl font-bold tracking-tight">
                  {stat.value}
                </p>
              </div>

              <div
                className={`flex size-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${stat.iconClass}`}
              >
                <Icon className="size-5" />
              </div>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              {stat.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default TenantDashboardOverview;

