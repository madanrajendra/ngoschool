"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle, Users, Target, Shield, Briefcase, FileText, Phone } from "lucide-react";
import HeroSlider from "@/components/layout/HeroSlider";
import AboutSection from "@/components/layout/AboutSection";
import CTASection from "@/components/layout/CTASection";
import ProcessSection from "@/components/layout/ProcessSection";
import TrustSection from "@/components/layout/TrustSection";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSlider />
      <AboutSection />

      {/* Services Preview */}
      <section className="py-16 sm:py-24 md:py-32 bg-slate-50 overflow-hidden" id="services">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-12 sm:mb-20 space-y-4 sm:space-y-6"
          >
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest">
              <span>Our Services</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-tight">
              End-to-End <span className="text-primary italic">Services for NGOs</span>
            </h2>
            <p className="text-base sm:text-xl text-slate-500 font-medium px-4">
              Discover comprehensive NGO services by NGO School, covering registration, compliance, advisory support, and government scheme guidance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { 
                title: "NGO Registration Services", 
                desc: "NGO School is your trusted partner in establishing a non-profit organization in India (Trust, Society, Section 8).", 
                icon: Briefcase,
                image: "/images/registration.png"
              },
              { 
                title: "Statutory Registrations", 
                desc: "Expert assistance in all government and statutory registrations including DARPAN, FCRA, and more.", 
                icon: Shield,
                image: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?q=80&w=800&auto=format&fit=crop"
              },
              { 
                title: "Income Tax & Compliance", 
                desc: "Stay compliant with income tax regulations. We handle 80G, 12A, and annual filing with precision.", 
                icon: FileText,
                image: "/images/tax_compliance.png"
              },
              { 
                title: "NGO Advisory & Support", 
                desc: "Expert guidance through documentation, activity planning, and strategic NGO consulting for long-term impact.", 
                icon: Users,
                image: "/images/ngo_team_meeting.png"
              },
              { 
                title: "Government Schemes", 
                desc: "End-to-end support for NGOs looking to leverage government schemes and funding opportunities across India.", 
                icon: Target,
                image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop"
              },
              { 
                title: "SSE Registration & Listing", 
                desc: "Unlock real funding opportunities through Social Stock Exchange (SSE) listing. We guide you through the SEBI process.", 
                icon: ArrowRight,
                image: "/images/sse_listing.png"
              }
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative rounded-[32px] sm:rounded-[40px] bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full overflow-hidden"
              >
                {/* Service Image Header */}
                <div className="h-40 sm:h-48 overflow-hidden relative">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className={`w-full h-full ${service.title === "NGO Registration Services" ? 'object-contain bg-slate-50 p-4' : 'object-cover'} group-hover:scale-110 transition-transform duration-700`} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  
                  {/* Floating Icon */}
                  <div className="absolute -bottom-5 right-6 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-2xl flex items-center justify-center shadow-xl group-hover:bg-primary transition-colors duration-500">
                    <service.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary group-hover:text-white" />
                  </div>
                </div>
                
                <div className="p-6 sm:p-8 pt-8 sm:pt-10 flex flex-col flex-grow">
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-sm sm:text-base text-slate-500 leading-relaxed mb-6 flex-grow line-clamp-3">
                    {service.desc}
                  </p>
                  <div className="pt-4 border-t border-slate-50 flex items-center justify-between group-hover:border-primary/20 transition-colors">
                    <Link href="/services" className="text-sm sm:text-base text-slate-900 font-bold flex items-center group-hover:text-primary">
                      Learn More 
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <div className="text-slate-100 group-hover:text-primary/10 transition-colors text-3xl sm:text-4xl font-black">
                      0{i + 1}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ProcessSection />

      <TrustSection />

      {/* Live Projects Preview */}
      <section className="py-16 sm:py-24 bg-white overflow-hidden">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
              className="space-y-3 sm:space-y-4 max-w-2xl px-2"
            >
              <h2 className="text-primary font-bold uppercase tracking-wider text-xs sm:text-sm">Active Funding</h2>
              <h3 className="text-3xl sm:text-5xl font-bold text-slate-900">Live Grant Opportunities</h3>
              <p className="text-base sm:text-lg text-slate-600">Explore the latest CSR grants and government schemes open for applications right now.</p>
            </motion.div>
            <Link href="/live-projects" className="btn-secondary whitespace-nowrap px-8">View All Grants</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { title: "National Health Mission Grant 1", img: "/images/grant1.png" },
              { title: "Public Health Awareness 2026", img: "https://images.unsplash.com/photo-1576089172869-4f5f6f315620?q=80&w=800&auto=format&fit=crop" },
              { title: "Women Empowerment Skills Fund", img: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?q=80&w=800&auto=format&fit=crop" }
            ].map((grant, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-slate-50 p-6 sm:p-8 rounded-[32px] sm:rounded-[40px] border border-slate-100 flex flex-col h-full hover:bg-white hover:shadow-2xl transition-all group"
              >
                <div className="h-40 sm:h-48 rounded-2xl sm:rounded-3xl overflow-hidden mb-6">
                   <img src={grant.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={grant.title} />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">{grant.title}</h4>
                <p className="text-sm text-slate-500 mb-6 flex-grow line-clamp-2">A specialized funding opportunity for NGOs working in rural health and social sectors...</p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-200/50">
                   <div className="text-primary font-bold text-base sm:text-lg">₹25,00,000</div>
                   <Link href="/live-projects" className="w-10 h-10 bg-white shadow-sm rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <ArrowRight className="w-5 h-5" />
                   </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-16 sm:py-24 bg-slate-50 overflow-hidden">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4 px-4"
          >
            <h2 className="text-primary font-bold uppercase tracking-wider text-xs sm:text-sm">Insights & News</h2>
            <h3 className="text-3xl sm:text-5xl font-bold text-slate-900">From Our NGO Experts</h3>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
             {[
               { title: "Step-by-Step Guide to 80G & 12A Registration in 2026", cat: "Compliance", img: "/images/blog_80g.png" },
               { title: "Income Tax Compliance for Indian NGOs", cat: "Funding", img: "/images/blog_tax.png", delay: 0.2 }
             ].map((blog, i) => (
               <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: blog.delay || 0 }}
                className="bg-white p-6 sm:p-8 rounded-[32px] sm:rounded-[40px] shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 md:gap-8 hover:shadow-xl transition-all group"
               >
                  <div className="w-full md:w-40 h-40 rounded-2xl sm:rounded-3xl overflow-hidden flex-shrink-0">
                     <img src={blog.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Blog" />
                  </div>
                  <div className="flex flex-col justify-center space-y-3 sm:space-y-4">
                     <span className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-widest">{blog.cat}</span>
                     <h4 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors">{blog.title}</h4>
                     <Link href="/blogs" className="text-sm sm:text-base text-primary font-bold flex items-center group-hover:translate-x-2 transition-transform">
                        Read Guide <ArrowRight className="w-4 h-4 ml-2" />
                     </Link>
                  </div>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
