import { useEffect, useState } from "react";
import { AlertCircle, X } from "lucide-react";

export const ErrorNotification = ({ error, clearError }) => {
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError(); // clears error after 3s
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  if (!error) return null;

  return (
    <div className="fixed top-6 right-6 z-50">
      <div
        className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl 
                  bg-red-600/90 text-white shadow-lg backdrop-blur-sm 
                  border border-red-500/40 animate-slide-in"
      >
        {/* Left Section (Icon + Message) */}
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-white" />
          <span className="text-sm font-medium">{error}</span>
        </div>

        {/* Close Button */}
        <button
          onClick={clearError}
          className="p-1 rounded-md hover:bg-red-500/30 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
