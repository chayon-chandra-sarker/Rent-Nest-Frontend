import { ReactNode } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Home,
  FileText,
  CreditCard,
  User,
  LogOut,
} from "lucide-react";
import { logOut } from "@/service/logOut";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r bg-card lg:block">
          <div className="sticky top-0 flex h-screen flex-col">
            {/* Logo */}
            <div className="border-b p-6">
              <Link
                href="/dashboard"
                className="text-xl font-bold text-primary"
              >
                RentNest
              </Link>

              <p className="mt-1 text-xs text-muted-foreground">
                Tenant Dashboard
              </p>
            </div>

            {/* Menu */}
            <nav className="flex-1 space-y-1 p-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 rounded-xl bg-primary/10 px-4 py-3 text-sm font-semibold text-primary"
              >
                <LayoutDashboard className="size-5" />
                Dashboard
              </Link>

              <Link
                href="/dashboard/properties"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                <Home className="size-5" />
                Properties
              </Link>

              <Link
                href="/dashboard/rentals"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                <FileText className="size-5" />
                My Rentals
              </Link>

              <Link
                href="/dashboard/payments"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                <CreditCard className="size-5" />
                Payments
              </Link>

              <Link
                href="/dashboard/profile"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                <User className="size-5" />
                Profile
              </Link>
            </nav>
            <div className="border-t p-4 dark:border-slate-800">
              <button
              onClick={logOut}
                type="button"
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950"
              >
                <LogOut className="size-5" />
                Logout
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="min-w-0 flex-1">
          <div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
