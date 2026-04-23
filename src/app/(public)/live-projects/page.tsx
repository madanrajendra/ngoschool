"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TrendingUp, Users, Award, Calendar, MapPin, IndianRupee, Loader2, ArrowRight, Shield, Target, FileText, CheckCircle } from "lucide-react";
import { getCollection } from "@/lib/firebase/services";
import { motion } from "framer-motion";

export default function LiveProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getCollection("projects", "createdAt");
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <div className="flex flex-col bg-white">
      {/* Hero Section - High Fidelity */}
      <section className="bg-slate-900 text-white py-24 sm:py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20 scale-110" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-900" />
        
        <div className="container-custom relative z-10 text-center space-y-12">
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-2xl px-8 py-3 rounded-full border border-white/20 shadow-2xl"
           >
             <div className="w-2 h-2 bg-primary-light rounded-full animate-pulse" />
             <span className="text-xs font-black uppercase tracking-[0.3em] text-primary-light">Grant Ecosystem 2026</span>
           </motion.div>
           
           <div className="space-y-6">
             <motion.h1 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-5xl sm:text-7xl md:text-9xl font-black leading-[0.9] tracking-tighter"
             >
               Funding <span className="text-primary-light italic">Simplified.</span>
             </motion.h1>
             
             <motion.p 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="text-xl sm:text-2xl text-slate-400 max-w-4xl mx-auto font-medium leading-relaxed"
             >
               Bridging the gap between grassroots NGOs and transformative CSR funds with expert guidance and real-time grant discovery.
             </motion.p>
           </div>
           
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="flex flex-wrap justify-center gap-6 pt-8"
           >
              {[
                { label: "Active Grants", val: "150+" },
                { label: "Success Rate", val: "84%" },
                { label: "States Covered", val: "22+" }
              ].map((stat, i) => (
                <div key={i} className="px-8 py-4 bg-white/5 border border-white/10 backdrop-blur-xl rounded-[24px]">
                   <div className="text-3xl font-black text-white">{stat.val}</div>
                   <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
           </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 bg-white relative">
        <div className="container-custom">
           {/* Spotlight Section */}
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-8 bg-slate-900 rounded-[56px] p-10 md:p-16 text-white relative overflow-hidden group shadow-2xl"
              >
                <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
                <div className="relative z-10 space-y-12">
                   <div className="space-y-6">
                      <div className="inline-flex px-5 py-2 bg-primary/20 rounded-full text-primary-light font-black text-xs uppercase tracking-[0.2em]">Featured Premium Opportunity</div>
                      <h3 className="text-4xl md:text-6xl font-black leading-tight italic">NITI Aayog – Women Livelihood Incubation Fund</h3>
                      <p className="text-xl text-slate-400 font-medium max-w-2xl">A flagship government initiative designed to empower women-led grassroots social enterprises with technical and financial backing.</p>
                   </div>
                   
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 py-10 border-y border-white/10">
                      <div className="space-y-2">
                         <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Support Threshold</div>
                         <div className="text-4xl font-black text-primary-light">₹25,00,000</div>
                      </div>
                      <div className="space-y-2">
                         <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Final Deadline</div>
                         <div className="text-3xl font-black">June 15, 2025</div>
                      </div>
                   </div>
                   
                   <Link href="/contact" className="inline-flex items-center space-x-4 bg-white text-slate-900 px-10 py-5 rounded-[24px] font-black hover:bg-primary-light hover:text-white transition-all group/btn shadow-xl">
                      <span>Apply Now & Get Guided</span>
                      <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform" />
                   </Link>
                </div>
              </motion.div>

              <div className="lg:col-span-4 space-y-8">
                 <div className="bg-slate-50 p-10 rounded-[56px] border border-slate-100 flex flex-col items-start space-y-8 hover:shadow-2xl transition-all h-1/2">
                    <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-primary shadow-xl">
                       <Target className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                       <h4 className="text-2xl font-black text-slate-900">CSR Call 2026</h4>
                       <p className="text-slate-500 font-medium leading-relaxed">Open calls from top 100 Indian corporate houses for social sectors.</p>
                    </div>
                    <span className="text-xs font-black text-green-600 bg-green-50 px-4 py-2 rounded-full uppercase tracking-widest">Applications Open</span>
                 </div>
                 
                 <div className="bg-primary/5 p-10 rounded-[56px] border border-primary/10 flex flex-col items-start space-y-8 hover:shadow-2xl transition-all h-1/2">
                    <div className="w-16 h-16 bg-primary rounded-3xl flex items-center justify-center text-white shadow-xl">
                       <Award className="w-8 h-8" />
                    </div>
                    <div className="space-y-2 text-primary">
                       <h4 className="text-2xl font-black">Innovation Hub</h4>
                       <p className="font-medium leading-relaxed">Financial support for tech-enabled social innovation projects in TN & MH.</p>
                    </div>
                    <Link href="/contact" className="text-primary font-black flex items-center group">View Details <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" /></Link>
                 </div>
              </div>
           </div>

           {/* Live Feed Header */}
           <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
              <div className="space-y-2 text-center md:text-left">
                 <h2 className="text-4xl font-black text-slate-900">Grant <span className="text-primary italic">Live Feed</span></h2>
                 <p className="text-slate-500 font-medium uppercase tracking-[0.2em] text-xs">Updated 2 hours ago</p>
              </div>
           </div>

           {loading ? (
             <div className="flex flex-col items-center justify-center py-32 bg-slate-50 rounded-[64px] border-2 border-dashed border-slate-100">
               <Loader2 className="w-12 h-12 text-primary animate-spin" />
               <p className="mt-4 text-slate-400 font-black uppercase tracking-widest text-xs">Syncing with grant database...</p>
             </div>
           ) : projects.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
               {projects.map((project, i) => (
                 <motion.div 
                   key={project.id || i}
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   className="group bg-white rounded-[56px] p-8 border border-slate-100 hover:shadow-[0_32px_80px_-20px_rgba(0,0,0,0.12)] transition-all flex flex-col h-full overflow-hidden"
                 >
                   <div className="h-60 rounded-[40px] overflow-hidden mb-10 relative bg-slate-50">
                     <img 
                       src={project.image || "https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=800&auto=format&fit=crop"} 
                       alt={project.title} 
                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                       onError={(e) => {
                         (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=800&auto=format&fit=crop";
                       }}
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                     <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-full shadow-2xl">
                       {project.status || 'Active'}
                     </div>
                   </div>
                   
                   <div className="space-y-6 flex-grow">
                     <div className="space-y-3">
                        <span className="text-primary font-black text-[10px] uppercase tracking-[0.3em]">{project.category || "General Grant"}</span>
                        <h3 className="text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2 leading-tight">{project.title}</h3>
                     </div>
                     <p className="text-slate-500 font-medium leading-relaxed line-clamp-2 text-sm">{project.shortDescription || "Specialized funding opportunity for registered NGOs with 3+ years experience..."}</p>
                     
                     <div className="grid grid-cols-2 gap-6 pt-8 border-t border-slate-50">
                        <div className="space-y-1">
                           <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Support Up To</div>
                           <div className="text-xl font-black text-slate-900">{project.amount || "₹25.0L"}</div>
                        </div>
                        <div className="space-y-1 text-right">
                           <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Closing date</div>
                           <div className="text-lg font-bold text-slate-700">{project.deadline || "TBA"}</div>
                        </div>
                     </div>
                   </div>

                   <Link 
                     href={`/live-projects/${project.id || i}`} 
                     className="mt-10 flex items-center justify-between bg-slate-50 group-hover:bg-primary group-hover:text-white px-8 py-5 rounded-[24px] transition-all"
                   >
                     <span className="font-black text-sm">Review Full Details</span>
                     <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                   </Link>
                 </motion.div>
               ))}
             </div>
           ) : (
             <div className="text-center py-32 bg-slate-50 rounded-[64px] border-2 border-dashed border-slate-100 flex flex-col items-center space-y-6">
                <Shield className="w-16 h-16 text-slate-200" />
                <p className="text-slate-500 font-bold italic">No live projects found in the current cycle.</p>
             </div>
           )}
        </div>
      </section>

      {/* Dynamic Offerings Recap */}
      <section className="py-24 sm:py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="container-custom relative z-10">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-10">
                 <div className="space-y-6">
                    <div className="inline-flex items-center space-x-2 text-primary-light font-black uppercase tracking-[0.2em] text-xs">
                       <Award className="w-4 h-4" />
                       <span>Institutional Support</span>
                    </div>
                    <h2 className="text-5xl sm:text-7xl font-black leading-none tracking-tighter">Your partner in <span className="text-primary-light italic underline decoration-primary-light underline-offset-8">Social Impact.</span></h2>
                    <p className="text-xl text-slate-400 font-medium leading-relaxed">We don't just find grants; we build sustainable ecosystems for NGOs to thrive and dominate their social mission.</p>
                 </div>
                 
                 <div className="flex flex-wrap gap-4">
                    <Link href="/contact" className="bg-white text-slate-900 px-10 py-5 rounded-full font-black hover:bg-primary-light hover:text-white transition-all shadow-2xl">Consult Project Experts</Link>
                    <Link href="/services" className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-full font-black hover:bg-white/10 transition-all">Explore All Services</Link>
                 </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                 {[
                   { title: "AI Discovery", val: "Matching NGOs with 500+ daily grant signals." },
                   { title: "Technical Review", val: "Ensuring 100% compliance before submission." },
                   { title: "Donor Connect", val: "Direct bridges with CSR foundations and Trusts." },
                   { title: "Impact Audits", val: "Professional social audit and report preparation." }
                 ].map((box, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, scale: 0.95 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     transition={{ delay: i * 0.1 }}
                     className="p-8 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-sm"
                   >
                      <h4 className="text-xl font-bold text-primary-light mb-2">{box.title}</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">{box.val}</p>
                   </motion.div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* Premium Stats Footer Bar */}
      <div className="bg-white py-12 border-b border-slate-100">
         <div className="container-custom">
            <div className="flex flex-wrap justify-between items-center gap-12 sm:gap-20 opacity-30 grayscale saturate-0">
               <div className="text-2xl font-black italic tracking-tighter text-slate-900 border-r border-slate-200 pr-12 last:border-0 uppercase">Transparency First</div>
               <div className="text-2xl font-black italic tracking-tighter text-slate-900 border-r border-slate-200 pr-12 last:border-0 uppercase">Impact Driven</div>
               <div className="text-2xl font-black italic tracking-tighter text-slate-900 border-r border-slate-200 pr-12 last:border-0 uppercase">Grassroots Reach</div>
               <div className="text-2xl font-black italic tracking-tighter text-slate-900 border-r border-slate-200 pr-12 last:border-0 uppercase">Donor Trusted</div>
            </div>
         </div>
      </div>
    </div>
  );
}
