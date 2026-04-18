"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Welcome back, Admin!");
      router.push("/admin");
    } catch (error: any) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="absolute inset-0 bg-primary/10 mix-blend-overlay pointer-events-none" />
      
      <div className="w-full max-w-md animate-fade-in relative z-10">
        <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-12">
          <div className="flex flex-col items-center space-y-4 mb-12">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-slate-900">Admin Portal</h1>
              <p className="text-slate-500 mt-2">Sign in to manage NGO School</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
              <div className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-12 py-4 focus:bg-white focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                  placeholder="admin@ngoschool.org"
                  required
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
              <div className="relative group">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-12 py-4 focus:bg-white focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 flex items-center justify-center space-x-3 text-lg"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <span>Access Dashboard</span>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-400 mt-10">
            Protected area. Authorized access only.
          </p>

        </div>
      </div>
    </div>
  );
}
