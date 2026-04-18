"use client";

import { useEffect, useState } from "react";
import { 
  MessageSquare, 
  FileText, 
  Clock,
  CheckCircle,
  MoreVertical,
  Loader2,
  ExternalLink
} from "lucide-react";
import { getCollection } from "@/lib/firebase/services";
import Link from "next/link";

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [blogData, enquiryData] = await Promise.all([
          getCollection("blogs", "createdAt"),
          getCollection("enquiries", "createdAt")
        ]);
        setBlogs(blogData);
        setEnquiries(enquiryData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const stats = [
    { title: "Total Enquiries", value: enquiries.length.toString(), icon: MessageSquare, color: "bg-blue-500" },
    { title: "Active Blogs", value: blogs.filter(b => b.status === "published").length.toString(), icon: FileText, color: "bg-purple-500" },
  ];

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-slate-500 font-medium">Loading Dashboard Data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[32px] shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex items-start justify-between">
            <div className="space-y-4">
              <div className={stat.color + " w-12 h-12 rounded-2xl flex items-center justify-center text-white"}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="text-slate-500 text-sm font-medium">{stat.title}</p>
                <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Enquiries */}
        <div className="lg:col-span-2 bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-800">Recent Enquiries</h3>
            <Link href="/admin/enquiries" className="text-primary font-bold text-sm">View All</Link>
          </div>
          <div className="divide-y divide-slate-50">
            {enquiries.slice(0, 5).map((enquiry) => (
              <div key={enquiry.id} className="p-8 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold uppercase">
                    {enquiry.name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{enquiry.name}</h4>
                    <p className="text-sm text-slate-500">{enquiry.organizationName} • {enquiry.interestedService}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right hidden sm:block">
                    <div className="text-sm font-bold text-slate-900">
                      {enquiry.createdAt?.seconds 
                        ? new Date(enquiry.createdAt.seconds * 1000).toLocaleDateString()
                        : "Recent"}
                    </div>
                    <div className="inline-flex items-center space-x-1 text-xs text-blue-500 font-bold bg-blue-50 px-2 py-0.5 rounded">
                      <Clock className="w-3 h-3" />
                      <span>{enquiry.status || "New"}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {enquiries.length === 0 && (
              <div className="p-20 text-center text-slate-400 italic">
                No enquiries yet.
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-8">
          <div className="bg-primary p-10 rounded-[40px] text-white space-y-6 shadow-xl shadow-primary/20">
            <h3 className="text-2xl font-bold leading-tight">Quick Actions</h3>
            <div className="space-y-4">
              <Link href="/admin/blogs/new" className="w-full bg-white/10 hover:bg-white/20 text-white font-bold p-4 rounded-2xl border border-white/20 transition-all flex items-center justify-center space-x-3">
                <FileText className="w-5 h-5" />
                <span>Publish New Blog</span>
              </Link>
              <Link href="/" target="_blank" className="w-full bg-white/10 hover:bg-white/20 text-white font-bold p-4 rounded-2xl border border-white/20 transition-all flex items-center justify-center space-x-3">
                <ExternalLink className="w-5 h-5" />
                <span>View Live Site</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>

  );
}

