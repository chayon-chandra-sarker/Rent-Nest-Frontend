
import {
  Home,
  Loader2,
} from "lucide-react";

import { MyRentalRequest } from "@/service/rental.service";

interface RecentRentalsProps {
  rentalRequests: MyRentalRequest[];
  loading: boolean;
}

const RecentRentals = ({
  rentalRequests,
  loading,
}: RecentRentalsProps) => {

  const approvedRequests = rentalRequests.filter(
    (request) => request.status === "APPROVED"
  );

  return (
    <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">

      <div className="flex items-center justify-between">

        <div>
          <h2 className="font-bold">
            Recent Rentals
          </h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Your latest rental activity
          </p>
        </div>

        <Home className="size-5 text-muted-foreground" />

      </div>

      {loading ? (
        <div className="mt-8 flex justify-center">
          <Loader2 className="size-5 animate-spin text-primary" />
        </div>
      ) : approvedRequests.length > 0 ? (
        <div className="mt-6 space-y-3">

          {approvedRequests
            .slice(0, 3)
            .map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 p-4 transition-colors hover:bg-muted/40"
              >
                <div className="min-w-0">

                  <p className="truncate text-sm font-semibold">
                    {request.property.title}
                  </p>

                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {request.property.location}
                  </p>

                </div>

                <span className="ml-3 shrink-0 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-500">
                  Approved
                </span>
              </div>
            ))}

        </div>
      ) : (
        <div className="mt-8 text-center">

          <p className="text-sm text-muted-foreground">
            No rental activity yet.
          </p>

        </div>
      )}

    </div>
  );
};

export default RecentRentals;

