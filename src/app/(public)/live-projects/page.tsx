"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, Award, Loader2, ArrowRight, Target, FileText, CheckCircle } from "lucide-react";
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
      <section className="bg-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10" />
        <div className="container-custom relative z-10 text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black">Live Funding &amp; Grants</h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-light">Live Project &amp; Grant Opportunities</h2>
          <p className="text-slate-300 max-w-3xl mx-auto text-base sm:text-xl">
            Empowering NGOs with real-time government schemes, CSR grants, and capacity-building funds.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors"
            >
              Get Grant Alerts
            </Link>
            <Link
              href="/admin/login"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-white/40 text-white font-bold hover:bg-white/10 transition-colors"
            >
              NGO Dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Our Impact</h2>
            <h3 className="text-xl sm:text-2xl font-semibold text-primary mt-2">Making a Difference Together</h3>
            <p className="text-slate-600 mt-3">Real numbers, real change - see how we&apos;re transforming the NGO ecosystem</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
            {[
              { value: "250+", title: "NGOs Partnered", note: "Across 22 states", icon: Users },
              { value: "180+", title: "Successful Grants", note: "Approved in 2024", icon: Award },
              { value: "1.2L+", title: "Beneficiaries Reached", note: "Through partner NGOs", icon: Target },
              { value: "45+", title: "Training Workshops", note: "Capacity building", icon: CheckCircle },
            ].map((stat, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6">
                <stat.icon className="w-6 h-6 text-primary mb-3" />
                <div className="text-2xl sm:text-3xl font-black text-slate-900">{stat.value}</div>
                <div className="font-semibold text-slate-800 mt-1">{stat.title}</div>
                <div className="text-sm text-slate-500">{stat.note}</div>
              </div>
            ))}
          </div>

          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">What We Offer</h2>
            <h3 className="text-xl sm:text-2xl font-semibold text-primary mt-2">Comprehensive Support for NGOs</h3>
            <p className="text-slate-600 mt-3">End-to-end assistance from grant discovery to project implementation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white border border-slate-200 rounded-3xl p-8">
              <Target className="w-8 h-8 text-primary mb-4" />
              <h4 className="text-2xl font-bold text-slate-900 mb-3">Grant Discovery</h4>
              <p className="text-slate-600">AI-powered matching with 500+ government schemes, CSR funds, and international grants.</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-3xl p-8">
              <FileText className="w-8 h-8 text-primary mb-4" />
              <h4 className="text-2xl font-bold text-slate-900 mb-3">Proposal Support</h4>
              <p className="text-slate-600">Expert guidance, templates, and reviews to craft winning grant proposals.</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-3xl p-8">
              <CheckCircle className="w-8 h-8 text-primary mb-4" />
              <h4 className="text-2xl font-bold text-slate-900 mb-3">Impact Tracking</h4>
              <p className="text-slate-600">Monitor project milestones, compliance, and report generation for donors.</p>
            </div>
          </div>

          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Live Project &amp; Grant Opportunities</h2>
          </div>

           {loading ? (
             <div className="flex flex-col items-center justify-center py-24 bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-100">
               <Loader2 className="w-12 h-12 text-primary animate-spin" />
               <p className="mt-4 text-slate-500 font-medium">Loading live opportunities...</p>
             </div>
           ) : projects.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {projects.map((project, i) => (
                 <motion.div 
                   key={project.id || i}
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   className="group bg-white rounded-[32px] p-6 border border-slate-200 hover:shadow-xl transition-all flex flex-col h-full overflow-hidden"
                 >
                   <div className="h-52 rounded-2xl overflow-hidden mb-6 relative bg-slate-50">
                     <img 
                       src={project.image || "https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=800&auto=format&fit=crop"} 
                       alt={project.title} 
                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                       onError={(e) => {
                         (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=800&auto=format&fit=crop";
                       }}
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                     <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full">
                       {project.status || 'Active'}
                     </div>
                   </div>
                   
                   <div className="space-y-4 flex-grow">
                     <div className="space-y-2">
                        <span className="text-primary font-black text-[10px] uppercase tracking-[0.3em]">{project.category || "General Grant"}</span>
                        <h3 className="text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2 leading-tight">{project.title}</h3>
                     </div>
                     <p className="text-slate-600 leading-relaxed line-clamp-2 text-sm">{project.shortDescription || "Specialized funding opportunity for registered NGOs with 3+ years experience..."}</p>
                     
                     <div className="grid grid-cols-2 gap-4 pt-5 border-t border-slate-100">
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
                     className="mt-6 flex items-center justify-between bg-slate-50 group-hover:bg-primary group-hover:text-white px-5 py-4 rounded-xl transition-all"
                   >
                     <span className="font-black text-sm">Review Full Details</span>
                     <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                   </Link>
                 </motion.div>
               ))}
             </div>
           ) : (
             <div className="text-center py-24 bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-100 flex flex-col items-center space-y-4">
                <p className="text-slate-500 font-bold italic">No live projects found in the current cycle.</p>
             </div>
           )}
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-slate-900 text-white">
        <div className="container-custom">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl font-black">Success Stories</h2>
            <h3 className="text-xl sm:text-2xl font-semibold text-primary-light mt-2">Trusted by Leading NGOs</h3>
            <p className="text-slate-300 mt-3">Hear from organizations that transformed their impact with our support</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              {
                quote: "\"NGO Solution helped us secure ₹45 Lakhs from the Ministry of Women & Child Development. Their grant alerts and proposal review were game-changers!\"",
                name: "Priya Sharma",
                role: "Director, Saksham Foundation",
              },
              {
                quote: "\"The live project dashboard and scheme filters saved us hours of research. We've applied to 12 schemes in just 3 months!\"",
                name: "Amit Patel",
                role: "CEO, Gramin Vikas Sansthan",
              },
              {
                quote: "\"Exceptional support team and timely updates on new grants. Our CSR partnerships increased by 200% after joining.\"",
                name: "Dr. Meera Nair",
                role: "Founder, Heal India Initiative",
              },
            ].map((story, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-8">
                <p className="text-slate-200 leading-relaxed">{story.quote}</p>
                <div className="mt-6">
                  <h4 className="font-bold text-white">{story.name}</h4>
                  <p className="text-sm text-slate-400">{story.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-colors">
              Partner With Us
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
