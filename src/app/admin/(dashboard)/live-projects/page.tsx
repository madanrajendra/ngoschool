"use client";

import { useEffect, useState } from "react";
import { getCollection, deleteDocument } from "@/lib/firebase/services";
import { Plus, Search, Edit3, Trash2, Loader2, Users, IndianRupee } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AdminLiveProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getCollection("liveProjects", "createdAt");
      setProjects(data);
    } catch (error) {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    try {
      await deleteDocument("liveProjects", id);
      toast.success("Project removed");
      loadProjects();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const filtered = projects.filter(p => 
    p.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
         <div>
            <h1 className="text-3xl font-bold text-slate-900">Grant Opportunities</h1>
            <p className="text-slate-500 mt-1">Manage live projects and funding opportunities for NGOs.</p>
         </div>
         <button className="btn-primary flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Add Grant</span>
         </button>
      </div>

      <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100">
         <div className="relative group max-w-md">
            <input 
              type="text" 
              placeholder="Search grants..." 
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
        <div className="space-y-4">
           {filtered.map((project) => (
             <div key={project.id} className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 group">
                <div className="flex items-center space-x-6">
                   <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center">
                      <Users className="w-8 h-8 text-primary" />
                   </div>
                   <div>
                      <h3 className="text-xl font-bold text-slate-900">{project.title}</h3>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-slate-500">
                         <span className="flex items-center"><IndianRupee className="w-4 h-4 mr-1"/> {project.amount}</span>
                         <span className="opacity-30">|</span>
                         <span>Due: {project.deadline}</span>
                      </div>
                   </div>
                </div>
                <div className="flex items-center space-x-6">
                   <span className={cn(
                     "px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest",
                     project.status === 'Open' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'
                   )}>
                      {project.status}
                   </span>
                   <div className="flex items-center space-x-2">
                      <button className="p-3 bg-slate-50 rounded-xl hover:bg-slate-900 hover:text-white transition-all text-slate-400 hover:text-white">
                        <Edit3 className="w-5 h-5" />
                      </button>
                      <button 
                         onClick={() => handleDelete(project.id)}
                         className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                   </div>
                </div>
             </div>
           ))}
           {filtered.length === 0 && (
             <div className="py-20 text-center bg-white rounded-[40px] border border-slate-100 italic text-slate-400">
               No grants found. Add your first funding opportunity!
             </div>
           )}
        </div>
      )}
    </div>
  );
}

// Minimalistic helper within same file since I didn't export cn in a way that works everywhere yet if I missed it
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
