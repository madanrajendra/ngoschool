import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="relative">
        <div className="w-16 h-16 bg-primary/10 rounded-full animate-pulse" />
        <Loader2 className="absolute top-0 left-0 w-16 h-16 text-primary animate-spin" />
      </div>
      <div className="mt-8 space-y-2 text-center">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">NGO School</h2>
        <p className="text-sm text-slate-400 font-medium animate-pulse">Loading content...</p>
      </div>
    </div>
  );
}
