import { useEffect, useState } from "react";
import { CheckCircle, X } from "lucide-react";

export const SuccessNotification = ({ succcess, clearSuccess }) => {
  useEffect(() => {
    if (succcess) {
      const timer = setTimeout(() => {
        clearSuccess(); // clears error after 3s
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [succcess, clearSuccess]);

  if (!succcess) return null;

  return (
    <div className="fixed top-6 right-6 z-50">
      <div
        className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl 
                  bg-green-600/90 text-white shadow-lg backdrop-blur-sm 
                  border border-green-500/40 animate-slide-in"
      >
        {/* Left Section (Icon + Message) */}
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-white" />
          <span className="text-sm font-medium">{succcess}</span>
        </div>

        {/* Close Button */}
        <button
          onClick={clearSuccess}
          className="p-1 rounded-md hover:bg-green-500/30 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
