"use client";

import { useEffect, useState } from "react";
import { getCollection, addDocument, updateDocument, deleteDocument } from "@/lib/firebase/services";
import { Plus, Search, Edit3, Trash2, Loader2, Users, IndianRupee, X, Calendar, Target, Globe } from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLiveProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getCollection("projects", "createdAt");
      setProjects(data);
    } catch (error) {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteDocument("projects", id);
      toast.success("Project deleted successfully");
      loadProjects();
    } catch (error) {
      toast.error("Failed to delete project");
    }
  };

  const handleOpenModal = (project: any = null) => {
    if (project) {
      setCurrentProject(project);
    } else {
      setCurrentProject({
        title: "",
        category: "Central Scheme",
        amount: "₹25,00,000",
        deadline: "June 15, 2025",
        status: "Open",
        shortDescription: "",
        fullDetails: "",
        eligibility: [],
        image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=800&auto=format&fit=crop"
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (currentProject.id) {
        await updateDocument("projects", currentProject.id, currentProject);
        toast.success("Project updated");
      } else {
        await addDocument("projects", { ...currentProject, createdAt: new Date().toISOString() });
        toast.success("Project added");
      }
      setIsModalOpen(false);
      loadProjects();
    } catch (error) {
      toast.error("Failed to save project");
    } finally {
      setIsSaving(false);
    }
  };

  const filtered = projects.filter(p => 
    p.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Grant Pipeline</h1>
            <p className="text-slate-500 mt-1 font-medium">Control the visibility and details of live funding opportunities.</p>
         </div>
         <button 
           onClick={() => handleOpenModal()}
           className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black flex items-center space-x-3 hover:bg-primary transition-all shadow-xl hover:scale-105"
         >
            <Plus className="w-6 h-6" />
            <span>New Offering</span>
         </button>
      </div>

      <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
         <div className="relative group w-full md:max-w-md">
            <input 
              type="text" 
              placeholder="Search by grant title..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-12 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
         </div>
         <div className="flex items-center space-x-4">
            <div className="h-10 w-px bg-slate-200 hidden md:block" />
            <div className="text-sm font-bold text-slate-500 uppercase tracking-widest bg-slate-100 px-4 py-2 rounded-xl">
               Total: {projects.length}
            </div>
         </div>
      </div>

      {loading ? (
        <div className="h-96 flex items-center justify-center bg-white rounded-[48px] border border-slate-100">
           <div className="flex flex-col items-center space-y-4">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Accessing projects...</p>
           </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           {filtered.map((project) => (
             <motion.div 
               layout
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               key={project.id} 
               className="bg-white p-6 rounded-[48px] shadow-sm border border-slate-100 hover:shadow-2xl transition-all group relative overflow-hidden"
             >
                <div className="flex items-start justify-between">
                   <div className="flex items-center space-x-6">
                      <div className="w-20 h-20 bg-slate-50 rounded-3xl overflow-hidden flex-shrink-0 border border-slate-100">
                         <img src={project.image || "https://images.unsplash.com/photo-1544027993-37dbfe43562a"} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className="space-y-1">
                         <div className="flex items-center space-x-3">
                            <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full">{project.category}</span>
                            <span className={cn(
                              "text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
                              project.status === 'Open' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'
                            )}>
                               {project.status}
                            </span>
                         </div>
                         <h3 className="text-xl font-black text-slate-900 group-hover:text-primary transition-colors line-clamp-1">{project.title}</h3>
                         <div className="flex items-center space-x-6 text-sm font-medium text-slate-400">
                            <span className="flex items-center text-slate-900"><IndianRupee className="w-4 h-4 mr-1 text-primary"/> {project.amount}</span>
                            <span className="flex items-center"><Calendar className="w-4 h-4 mr-1"/> {project.deadline}</span>
                         </div>
                      </div>
                   </div>
                   
                   <div className="flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                      <button 
                        onClick={() => handleOpenModal(project)}
                        className="p-3 bg-slate-900 text-white rounded-2xl hover:scale-110 transition-all shadow-xl"
                      >
                        <Edit3 className="w-5 h-5" />
                      </button>
                      <button 
                         onClick={() => handleDelete(project.id)}
                         className="p-3 bg-red-500 text-white rounded-2xl hover:scale-110 transition-all shadow-xl"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                   </div>
                </div>
                {project.shortDescription && (
                  <p className="mt-6 text-slate-500 text-sm line-clamp-2 italic font-medium leading-relaxed bg-slate-50 p-4 rounded-3xl border border-slate-100">
                    "{project.shortDescription}"
                  </p>
                )}
             </motion.div>
           ))}
           
           {filtered.length === 0 && (
             <div className="lg:col-span-2 py-32 text-center bg-white rounded-[64px] border-2 border-dashed border-slate-100">
                <Target className="w-16 h-16 text-slate-100 mx-auto mb-4" />
                <p className="italic text-slate-400 font-bold">No active grants found matching your search.</p>
             </div>
           )}
        </div>
      )}

      {/* Editor Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[48px] shadow-2xl flex flex-col"
            >
               <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-white relative z-10">
                  <div className="flex items-center space-x-4">
                     <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                        <Plus className="w-6 h-6" />
                     </div>
                     <div>
                        <h2 className="text-3xl font-black text-slate-900">{currentProject?.id ? 'Edit Opportunity' : 'Launch New Grant'}</h2>
                        <p className="text-slate-500 text-sm font-medium">Capture details for the live NGO funding feed.</p>
                     </div>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="p-3 bg-slate-100 rounded-full hover:bg-slate-900 hover:text-white transition-all">
                     <X className="w-6 h-6" />
                  </button>
               </div>

               <div className="flex-grow overflow-y-auto p-10 bg-slate-50/50">
                  <form id="project-form" onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-6 md:col-span-2">
                        <label className="block space-y-2">
                           <span className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Grant Title</span>
                           <input 
                             required
                             type="text" 
                             value={currentProject?.title}
                             onChange={(e) => setCurrentProject({...currentProject, title: e.target.value})}
                             placeholder="e.g. NITI Aayog - Women Livelihood Incubation Fund"
                             className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-6 focus:ring-4 focus:ring-primary/10 transition-all font-bold text-lg"
                           />
                        </label>
                     </div>

                     <div className="space-y-6">
                        <label className="block space-y-2">
                           <span className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Fund Category</span>
                           <select 
                             value={currentProject?.category}
                             onChange={(e) => setCurrentProject({...currentProject, category: e.target.value})}
                             className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-6 focus:ring-4 focus:ring-primary/10 transition-all font-bold"
                           >
                              <option>Central Scheme</option>
                              <option>State Government</option>
                              <option>CSR Foundation</option>
                              <option>International Grant</option>
                              <option>Social Enterprise Fund</option>
                           </select>
                        </label>

                        <label className="block space-y-2">
                           <span className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Support Amount</span>
                           <div className="relative">
                              <input 
                                required
                                type="text" 
                                value={currentProject?.amount}
                                onChange={(e) => setCurrentProject({...currentProject, amount: e.target.value})}
                                placeholder="₹25,00,000"
                                className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-6 focus:ring-4 focus:ring-primary/10 transition-all font-black text-primary"
                              />
                              <IndianRupee className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary opacity-40" />
                           </div>
                        </label>
                     </div>

                     <div className="space-y-6">
                        <label className="block space-y-2">
                           <span className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Application Deadline</span>
                           <div className="relative">
                              <input 
                                required
                                type="text" 
                                value={currentProject?.deadline}
                                onChange={(e) => setCurrentProject({...currentProject, deadline: e.target.value})}
                                placeholder="June 15, 2025"
                                className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-6 focus:ring-4 focus:ring-primary/10 transition-all font-bold"
                              />
                              <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                           </div>
                        </label>

                        <label className="block space-y-2">
                           <span className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Live Status</span>
                           <div className="flex p-1 bg-white border border-slate-200 rounded-2xl">
                              {['Open', 'Closed'].map((s) => (
                                <button
                                  key={s}
                                  type="button"
                                  onClick={() => setCurrentProject({...currentProject, status: s})}
                                  className={cn(
                                    "flex-1 py-3 rounded-xl text-sm font-black transition-all",
                                    currentProject?.status === s ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-900"
                                  )}
                                >
                                  {s}
                                </button>
                              ))}
                           </div>
                        </label>
                     </div>

                      <div className="space-y-6 md:col-span-2">
                        <label className="block space-y-2">
                           <span className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Cover Image URL</span>
                           <div className="relative">
                              <input 
                                type="text" 
                                value={currentProject?.image}
                                onChange={(e) => setCurrentProject({...currentProject, image: e.target.value})}
                                placeholder="https://..."
                                className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-6 focus:ring-4 focus:ring-primary/10 transition-all font-medium text-slate-600"
                              />
                              <Globe className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                           </div>
                        </label>

                        <label className="block space-y-2">
                           <span className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Short Description (Internal)</span>
                           <textarea 
                             rows={2}
                             value={currentProject?.shortDescription}
                             onChange={(e) => setCurrentProject({...currentProject, shortDescription: e.target.value})}
                             placeholder="Brief overview for the landing page..."
                             className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-6 focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                           />
                        </label>

                        <label className="block space-y-2">
                           <span className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Project Details</span>
                           <textarea 
                             rows={6}
                             value={currentProject?.fullDetails}
                             onChange={(e) => setCurrentProject({...currentProject, fullDetails: e.target.value})}
                             placeholder="Comprehensive overview of the grant, objectives, and requirements..."
                             className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-6 focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                           />
                        </label>

                        <label className="block space-y-2">
                           <span className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Eligibility Criteria (one per line)</span>
                           <textarea 
                             rows={4}
                             value={currentProject?.eligibility?.join('\n')}
                             onChange={(e) => setCurrentProject({...currentProject, eligibility: e.target.value.split('\n')})}
                             placeholder="e.g. Must be a registered Trust&#10;Minimum 3 years experience&#10;FCRA required..."
                             className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-6 focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                           />
                        </label>
                     </div>
                  </form>
               </div>

               <div className="p-10 border-t border-slate-100 flex items-center justify-between bg-white relative z-10">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="text-slate-500 font-bold hover:text-slate-900 transition-colors"
                  >
                     Discard Changes
                  </button>
                  <button 
                    form="project-form"
                    disabled={isSaving}
                    type="submit"
                    className="bg-slate-900 text-white px-12 py-5 rounded-[24px] font-black flex items-center space-x-3 hover:bg-primary transition-all shadow-2xl disabled:opacity-50"
                  >
                     {isSaving ? (
                        <>
                           <Loader2 className="w-5 h-5 animate-spin" />
                           <span>Processing...</span>
                        </>
                     ) : (
                        <span>Publish Grant</span>
                     )}
                  </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
