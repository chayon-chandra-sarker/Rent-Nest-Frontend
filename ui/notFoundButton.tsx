"use client"
import { ArrowLeft } from "lucide-react";


const NotFoundButton = () => {
  return (
    <div>
      <button
        onClick={() => window.history.back()}
        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full border border-gray-300 bg-white text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-all"
      >
        <ArrowLeft size={17} />
        Go Back
      </button>
    </div>
  );
};

export default NotFoundButton;
