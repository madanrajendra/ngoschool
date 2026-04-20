"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle, Users, Target, Shield, Briefcase, FileText, Phone, IndianRupee, Award, MapPin } from "lucide-react";
import HeroSlider from "@/components/layout/HeroSlider";
import AboutSection from "@/components/layout/AboutSection";
import CTASection from "@/components/layout/CTASection";
import ProcessSection from "@/components/layout/ProcessSection";
import TrustSection from "@/components/layout/TrustSection";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getCollection } from "@/lib/firebase/services";
import { CORE_SERVICES } from "@/lib/data/services";

// Icon mapping helper
const IconMap: any = { Briefcase, Shield, FileText, Users, Target, ArrowRight };

export default function HomePage() {
  const [services, setServices] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch Services
        const firebaseData = await getCollection("services", "createdAt");
        const combined = [...firebaseData];
        CORE_SERVICES.forEach(core => {
          if (!combined.find(s => s.slug === core.slug)) {
             combined.push({ ...core, icon: IconMap[core.icon] || Briefcase });
          }
        });
        setServices(combined.map(s => ({
          ...s,
          icon: typeof s.icon === 'string' ? (IconMap[s.icon] || Briefcase) : (s.icon || Briefcase)
        })));

        // Fetch Projects
        const projectsData = await getCollection("projects", "createdAt");
        setProjects(projectsData);
      } catch (error) {
        setServices(CORE_SERVICES.map(s => ({ ...s, icon: IconMap[s.icon] || Briefcase })));
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* Premium Hero with Overlay Stats */}
      <div className="relative group">
        <HeroSlider />
        <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none">
           <div className="container-custom pb-12 sm:pb-20">
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="hidden lg:grid grid-cols-4 gap-6 bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-[40px] shadow-2xl pointer-events-auto"
              >
                 {[
                   { label: "Funds Mobilized", val: "₹52Cr+", icon: IndianRupee },
                   { label: "NGOs Empowered", val: "250+", icon: Users },
                   { label: "Successful Grants", val: "340+", icon: Award },
                   { label: "States Present", val: "22+", icon: MapPin }
                 ].map((stat, i) => (
                   <div key={i} className="flex items-center space-x-4 border-r last:border-0 border-white/10 px-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary-light">
                         <stat.icon className="w-6 h-6" />
                      </div>
                      <div className="text-white">
                         <div className="text-2xl font-black">{stat.val}</div>
                         <div className="text-xs uppercase tracking-tighter opacity-70 font-bold">{stat.label}</div>
                      </div>
                   </div>
                 ))}
              </motion.div>
           </div>
        </div>
      </div>

      {/* Trust Marquee */}
      <div className="bg-slate-50 py-10 border-y border-slate-100 relative overflow-hidden">
        <div className="container-custom">
           <div className="flex flex-col md:flex-row items-center justify-between gap-8 opacity-60 grayscale hover:grayscale-0 transition-all">
              <span className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">Trusted By Organizations Nationwide</span>
              <div className="flex flex-wrap justify-center gap-12 sm:gap-20">
                 {/* Replace with actual partner logos later */}
                 <div className="text-2xl font-black text-slate-300 italic tracking-tighter">NITI AAYOG</div>
                 <div className="text-2xl font-black text-slate-300 italic tracking-tighter">NABARD</div>
                 <div className="text-2xl font-black text-slate-300 italic tracking-tighter">MSME</div>
                 <div className="text-2xl font-black text-slate-300 italic tracking-tighter">CSR FUND</div>
              </div>
           </div>
        </div>
      </div>

      <AboutSection />

      {/* High-Fidelity Services Showcase */}
      <section className="py-24 sm:py-32 bg-white relative" id="services">
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-slate-50 to-white pointer-events-none" />
        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-20 gap-10">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 max-w-xl"
            >
              <div className="inline-flex px-4 py-2 bg-primary/10 rounded-full text-primary font-black text-xs uppercase tracking-[0.2em]">Our Ecosystem</div>
              <h2 className="text-4xl sm:text-7xl font-black text-slate-900 leading-[0.95]">Impact <span className="text-primary italic">Driven</span> Services</h2>
            </motion.div>
            <p className="text-xl text-slate-500 font-medium max-w-lg leading-relaxed">
              We bridge the gap between NGOs and funding opportunities with institutional-grade registration, legal, and advisory support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 6).map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative h-[420px] rounded-[48px] overflow-hidden bg-slate-900 shadow-2xl"
              >
                <img 
                  src={service.image} 
                  className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-1000 group-hover:opacity-30" 
                  alt={service.title} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                
                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                   <div className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center text-primary-light mb-6 group-hover:bg-primary transition-all duration-500">
                      <service.icon className="w-8 h-8" />
                   </div>
                   <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-primary-light transition-colors">{service.title}</h4>
                   <p className="text-slate-400 text-sm leading-relaxed mb-8 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      {service.desc || service.shortDescription}
                   </p>
                   <Link href={`/services/${service.slug}`} className="inline-flex items-center space-x-3 text-white font-black group-hover:translate-x-2 transition-transform">
                      <span>Explore Service</span>
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                   </Link>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-20 text-center">
             <Link href="/services" className="inline-flex items-center space-x-4 bg-slate-900 text-white px-10 py-5 rounded-full font-black hover:bg-primary hover:scale-105 transition-all shadow-2xl group">
                <span>View All Specialized Services</span>
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-slate-900 transition-all">
                   <ArrowRight className="w-4 h-4" />
                </div>
             </Link>
          </div>
        </div>
      </section>

      <ProcessSection />

      <TrustSection />

      {/* Premium Grant Feed Preview */}
      <section className="py-24 sm:py-32 bg-slate-900 text-white relative overflow-hidden" id="live-projects">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 -skew-x-12 translate-x-1/2 blur-[150px]" />
        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4 text-center md:text-left"
            >
              <div className="inline-flex items-center space-x-2 text-primary-light font-black uppercase tracking-[0.3em] text-xs">
                <div className="w-2 h-2 bg-primary-light rounded-full animate-ping" />
                <span>Active Funding Opportunities</span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-black">Live <span className="text-primary-light italic">Grants</span> Feed</h2>
            </motion.div>
            <Link href="/live-projects" className="bg-white text-slate-900 px-12 py-5 rounded-full font-black hover:bg-primary-light hover:text-white transition-all shadow-2xl hover:scale-105">
               Access All Grants
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-[48px] p-8 hover:bg-white/10 transition-all group flex flex-col h-full"
              >
                <div className="h-48 rounded-[32px] overflow-hidden mb-8 relative">
                   <img src={project.image || "/images/grant1.png"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={project.title} />
                   <div className="absolute bottom-4 left-4 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full">Open now</div>
                </div>
                <h4 className="text-2xl font-bold mb-4 line-clamp-2">{project.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow line-clamp-2">{project.shortDescription || "Unlock critical funding for your social mission..."}</p>
                
                <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                   <div className="text-primary-light font-black text-xl">₹{project.amount ? project.amount.split('₹')[1] || project.amount : '25L'}</div>
                   <Link href="/live-projects" className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-primary-light transition-all">
                      <ArrowRight className="w-6 h-6" />
                   </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Blog Recap */}
      <section className="py-24 sm:py-32 bg-white overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div className="space-y-10">
                <div className="space-y-6">
                   <span className="text-primary font-black uppercase tracking-[0.3em] text-sm">RESOURCES & LEARNING</span>
                   <h2 className="text-4xl sm:text-7xl font-black text-slate-900 leading-none">Insights From <span className="text-primary italic">NGO Experts</span></h2>
                   <p className="text-xl text-slate-500 font-medium">Deep dives into compliance, registration strategies, and social impact measurement.</p>
                </div>
                <Link href="/blogs" className="inline-flex items-center space-x-4 text-slate-900 font-black group">
                   <span>View Knowledge Base</span>
                   <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center group-hover:bg-primary transition-all">
                      <ArrowRight className="w-6 h-6" />
                   </div>
                </Link>
             </div>
             
             <div className="space-y-8">
                {[
                  { title: "Step-by-Step Guide to 80G", cat: "Compliance", delay: 0 },
                  { title: "Income Tax Compliance 2026", cat: "Tax Law", delay: 0.1 }
                ].map((blog, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: blog.delay }}
                    className="p-8 rounded-[40px] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all group cursor-pointer"
                  >
                     <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-black text-primary uppercase tracking-widest">{blog.cat}</span>
                        <div className="text-slate-200 group-hover:text-primary transition-colors">
                           <ArrowRight className="w-8 h-8" />
                        </div>
                     </div>
                     <h4 className="text-2xl sm:text-3xl font-bold text-slate-900 group-hover:text-primary transition-colors leading-tight">{blog.title}</h4>
                  </motion.div>
                ))}
             </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
