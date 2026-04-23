"use client";

import Link from "next/link";
import { FileSearch, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-white">
      <div className="max-w-xl w-full text-center space-y-12">
        <div className="relative">
          <div className="text-[180px] font-black text-slate-50 leading-none select-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="bg-primary/10 p-8 rounded-[40px] animate-bounce-slow">
                <FileSearch className="w-20 h-20 text-primary" />
             </div>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Page Not Found</h1>
          <p className="text-xl text-slate-500 font-medium max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
           <Link 
             href="/" 
             className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-slate-900 text-white px-10 py-5 rounded-3xl font-black hover:bg-primary hover:shadow-2xl transition-all"
           >
              <Home className="w-6 h-6" />
              <span>Back to Home</span>
           </Link>
           <button 
             onClick={() => typeof window !== 'undefined' && window.history.back()}
             className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-slate-50 text-slate-700 px-10 py-5 rounded-3xl font-black hover:bg-slate-100 transition-all border border-slate-200"
           >
              <ArrowLeft className="w-6 h-6" />
              <span>Go Back</span>
           </button>
        </div>

        <div className="pt-12 grid grid-cols-3 gap-8 border-t border-slate-100">
           <div>
              <div className="text-2xl font-black text-slate-900">20+</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Services</div>
           </div>
           <div>
              <div className="text-2xl font-black text-slate-900">10k+</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">NGOs Assisted</div>
           </div>
           <div>
              <div className="text-2xl font-black text-slate-900">100%</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Compliance</div>
           </div>
        </div>
      </div>
    </div>
  );
}
