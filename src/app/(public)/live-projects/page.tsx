"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TrendingUp, Users, Award, Calendar, MapPin, IndianRupee, Loader2 } from "lucide-react";
import { getCollection } from "@/lib/firebase/services";

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
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 border-b border-primary/20">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">Live Project &amp; Grant Opportunities</h1>
            <p className="text-xl text-slate-400">Empowering NGOs with real-time government schemes, CSR grants, and capacity-building funds.</p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/10 px-6 py-3 rounded-2xl border border-white/10 flex items-center space-x-3">
                <IndianRupee className="w-5 h-5 text-primary-light" />
                <span className="font-bold">₹52Cr+ Funds Mobilized</span>
              </div>
              <div className="bg-white/10 px-6 py-3 rounded-2xl border border-white/10 flex items-center space-x-3">
                <Award className="w-5 h-5 text-secondary" />
                <span className="font-bold">340+ Successful Grants</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4 lg:mt-0">
            <div className="p-8 bg-primary rounded-3xl space-y-2">
              <div className="text-3xl font-bold">250+</div>
              <div className="text-sm opacity-80">NGOs Partnered</div>
            </div>
            <div className="p-6 sm:p-8 bg-slate-800 rounded-3xl space-y-2 translate-y-4 sm:translate-y-8">
              <div className="text-3xl font-bold">1.2L+</div>
              <div className="text-sm opacity-80">Beneficiaries reached</div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom min-h-[400px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <p className="mt-4 text-slate-500 font-medium">Fetching active opportunities...</p>
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, i) => (
                <div key={project.id || i} className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-slate-100 flex flex-col h-full group">
                  <div className="h-60 relative">
                    <img src={project.image || "/images/grant1.png"} alt={project.title} className="w-full h-full object-cover" />
                    <div className={`absolute top-6 left-6 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${project.status === 'Open' ? 'bg-green-500 text-white' : 'bg-slate-500 text-white'}`}>
                      {project.status || 'Open'}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow space-y-6">
                    <div className="space-y-2">
                      <span className="text-primary font-bold text-xs uppercase tracking-widest">{project.category}</span>
                      <h3 className="text-2xl font-bold text-slate-800 line-clamp-2">{project.title}</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pb-6 border-b border-slate-50">
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-400 flex items-center mb-1">
                          <IndianRupee className="w-3 h-3 mr-1" /> Funding
                        </span>
                        <span className="font-bold text-slate-700">{project.amount}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-400 flex items-center mb-1">
                          <Calendar className="w-3 h-3 mr-1" /> Deadline
                        </span>
                        <span className="font-bold text-slate-700">{project.deadline}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 text-slate-500 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{project.location || 'India'}</span>
                    </div>

                    <Link 
                      href={`/live-projects/${project.id || i}`} 
                      className="btn-primary-outline w-full text-center py-3 border-2 border-primary text-primary font-bold rounded-2xl hover:bg-primary hover:text-white transition-all mt-auto"
                    >
                      View Opportunity
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-slate-200">
              <p className="text-slate-500 italic">No live projects found at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Counter UI */}
      <section className="py-20 bg-white">
        <div className="container-custom grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {[
            { label: "Successful Projects", val: "340+" },
            { label: "Partner NGOs", val: "250+" },
            { label: "Workshops", val: "45+" },
            { label: "Total Reach", val: "1.2L+" },
          ].map((stat, i) => (
            <div key={i} className="text-center space-y-2">
              <div className="text-4xl font-bold text-slate-900">{stat.val}</div>
              <div className="text-slate-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

