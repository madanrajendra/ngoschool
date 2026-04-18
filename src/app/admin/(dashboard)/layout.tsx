"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  MessageSquare, 
  FileText, 
  Briefcase, 
  Image as ImageIcon, 
  Settings, 
  Users, 
  LogOut,
  ChevronRight
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Enquiries", href: "/admin/enquiries", icon: MessageSquare },
  { name: "Blogs", href: "/admin/blogs", icon: FileText },
  { name: "Media", href: "/admin/media", icon: ImageIcon },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-slate-50">
        {/* Sidebar */}
        <aside className="w-72 bg-slate-900 text-slate-300 hidden lg:flex flex-col fixed h-full z-30">
          <div className="p-8 border-b border-slate-800">
            <Link href="/admin" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                N
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Admin Panel
              </span>
            </Link>
          </div>

          <nav className="flex-grow p-6 space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-2xl transition-all group",
                    isActive 
                      ? "bg-primary text-white shadow-lg shadow-primary/20" 
                      : "hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <div className="flex items-center space-x-4">
                    <item.icon className="w-5 h-5" />
                    <span className="font-semibold">{item.name}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4" />}
                </Link>
              );
            })}
          </nav>

          <div className="p-6 border-t border-slate-800">
            <button
              onClick={logout}
              className="w-full flex items-center space-x-4 p-4 rounded-2xl hover:bg-red-500/10 hover:text-red-500 transition-all text-slate-400 font-semibold"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow lg:ml-72 flex flex-col min-h-screen">
          <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-20">
            <h2 className="text-xl font-bold text-slate-800 uppercase tracking-wider">
              {menuItems.find(i => i.href === pathname)?.name || "Overview"}
            </h2>
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-slate-900">Admin User</div>
                <div className="text-xs text-slate-500">Super Administrator</div>
              </div>
              <div className="w-10 h-10 bg-slate-100 rounded-full border border-slate-200" />
            </div>
          </header>

          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
