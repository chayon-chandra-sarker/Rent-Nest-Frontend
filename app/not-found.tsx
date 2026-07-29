import Link from "next/link";
import { Home } from "lucide-react";
import NotFoundButton from "../ui/notFoundButton";

const NotFound = () => {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="w-full max-w-lg text-center">
        {/* 404 */}
        <div className="mb-6">
          <h1 className="text-[120px] sm:text-[160px] font-black leading-none tracking-tight text-teal-500">
            404
          </h1>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Page Not Found
          </h2>

          <p className="text-sm sm:text-base text-gray-500 max-w-md mx-auto leading-relaxed">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. The
            page may have been moved, deleted, or the URL may be incorrect.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full bg-teal-500 text-white font-semibold text-sm hover:bg-teal-600 transition-all shadow-sm"
          >
            <Home size={17} />
            Back to Home
          </Link>

          <NotFoundButton></NotFoundButton>
        </div>

        {/* Footer */}
        <p className="mt-10 text-xs text-gray-400">
          RentNest &copy; {new Date().getFullYear()}
        </p>
      </div>
    </main>
  );
};

export default NotFound;
