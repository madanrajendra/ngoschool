"use client";

import { useEffect, useState } from "react";
import { getCollection, deleteDocument } from "@/lib/firebase/services";
import { Plus, Search, Edit3, Trash2, Loader2, Briefcase } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AdminServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const data = await getCollection("services", "createdAt");
      setServices(data);
    } catch (error) {
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    try {
      await deleteDocument("services", id);
      toast.success("Service removed");
      loadServices();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const filtered = services.filter(s => 
    s.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
         <div>
            <h1 className="text-3xl font-bold text-slate-900">NGO Services</h1>
            <p className="text-slate-500 mt-1">Manage the consultancy services offered on your platform.</p>
         </div>
         <button className="btn-primary flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Add Service</span>
         </button>
      </div>

      <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100">
         <div className="relative group max-w-md">
            <input 
              type="text" 
              placeholder="Search services..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-12 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
         </div>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center bg-white rounded-[40px]">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {filtered.map((service) => (
             <div key={service.id} className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 group">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-all">
                   <Briefcase className="w-8 h-8 text-primary group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                <p className="text-sm text-slate-500 line-clamp-2 mb-8">{service.shortDescription}</p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                   <span className="text-xs font-bold text-green-500 uppercase tracking-widest">{service.status || 'Active'}</span>
                   <div className="flex items-center space-x-2">
                      <button className="p-2 bg-slate-50 rounded-lg hover:bg-slate-900 hover:text-white transition-all">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(service.id)}
                        className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                   </div>
                </div>
             </div>
           ))}
           {filtered.length === 0 && (
             <div className="col-span-full py-20 text-center bg-white rounded-[40px] border border-slate-100 italic text-slate-400">
               No services found. Add your first service to get started!
             </div>
           )}
        </div>
      )}
    </div>
  );
}
