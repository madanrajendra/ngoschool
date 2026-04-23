"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Website Error:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-slate-50">
      <div className="max-w-md w-full text-center space-y-8 animate-fade-in">
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-25" />
          <div className="relative bg-white rounded-full p-6 shadow-xl">
            <AlertCircle className="w-12 h-12 text-red-500" />
          </div>
        </div>
        
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-slate-900">Something went wrong</h1>
          <p className="text-slate-500 font-medium">
            We've encountered an unexpected issue. Don't worry, your data is safe.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-primary text-white px-8 py-3 rounded-2xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
          >
            <RefreshCcw className="w-5 h-5" />
            <span>Try Again</span>
          </button>
          
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white text-slate-700 border border-slate-200 px-8 py-3 rounded-2xl font-bold hover:bg-slate-50 transition-all"
          >
            <Home className="w-5 h-5" />
            <span>Go Home</span>
          </Link>
        </div>

        <div className="pt-8 text-xs text-slate-400">
          Error ID: {error.digest || "Unknown"}
        </div>
      </div>
    </div>
  );
}
