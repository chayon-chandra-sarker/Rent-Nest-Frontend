"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import LandlordSidebar from "@/app/(dashboard-group)/_components/landlord/LandlordSidebar";

interface LandlordDashboardLayoutProps {
  children: React.ReactNode;
}

const LandlordDashboardLayout = ({
  children,
}: LandlordDashboardLayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        <LandlordSidebar
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />
        <div className="min-w-0 flex-1">
          {/* Mobile Header */}
          <header className="sticky top-0 z-30 flex h-16 items-center border-b border-border/60 bg-background/90 px-4 backdrop-blur-md lg:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex size-10 items-center justify-center rounded-xl border border-border transition hover:bg-muted"
              aria-label="Open sidebar"
            >
              <Menu className="size-5" />
            </button>

            <div className="ml-3">
              <p className="text-sm font-bold">
                Landlord Dashboard
              </p>

              <p className="text-xs text-muted-foreground">
                Manage your properties
              </p>
            </div>
          </header>

          {/* Page Content */}
          <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default LandlordDashboardLayout;