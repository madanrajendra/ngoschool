"use client";

import Link from "next/link";
import { 
  TrendingUp, 
  HeartHandshake, 
  Gem, 
  Building2, 
  FileText, 
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Users,
  Award,
  Target,
  CheckCircle
} from "lucide-react";
import { motion } from "framer-motion";

export default function LiveProjectsPage() {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* Original Hero Banner */}
      <section className="bg-slate-900 text-white py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-green-600/10" />
        <div className="container-custom relative z-10 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="text-5xl sm:text-7xl font-black tracking-tight">Live Funding & Grants</h1>
            <h2 className="text-2xl sm:text-4xl font-bold text-green-400">Live Project & Grant Opportunities</h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 max-w-3xl mx-auto text-lg sm:text-xl font-medium"
          >
            Empowering NGOs with real-time government schemes, CSR grants, and capacity-building funds.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-4 rounded-2xl bg-green-600 text-white font-black text-lg hover:bg-green-700 transition-all shadow-xl shadow-green-900/20"
            >
              Get Grant Alerts
            </Link>
            <Link
              href="/admin/login"
              className="inline-flex items-center justify-center px-10 py-4 rounded-2xl border-2 border-white/20 text-white font-black text-lg hover:bg-white/10 transition-all"
            >
              NGO Dashboard
            </Link>
          </motion.div>
        </div>
      </section>

      {/* New "Unlock Grants" Featured Section */}
      <section className="relative py-24 sm:py-32 bg-slate-50/50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-10">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-green-50/80 backdrop-blur-sm text-green-700 rounded-full text-sm font-bold border border-green-100 shadow-sm"
              >
                <div className="p-1 bg-green-600 rounded-md">
                  <TrendingUp className="w-3.5 h-3.5 text-white" />
                </div>
                Active since 2018 · Trusted by 250+ grassroots orgs
              </motion.div>
              
              <div className="space-y-6">
                <h2 className="text-5xl sm:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                  Unlock Grants,<br />
                  <span className="text-slate-900">Accelerate Impact</span>
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed max-w-xl font-medium">
                  From central schemes to state-level initiatives, we curate and simplify funding opportunities for NGOs, trusts, and social enterprises. Stay ahead with real-time alerts and expert guidance.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-10 sm:gap-16 pt-4">
                <div className="flex items-center gap-5">
                  <div className="text-green-600 font-black text-5xl tracking-tighter opacity-30 select-none">Rs</div>
                  <div>
                    <div className="text-4xl font-black text-slate-900 tracking-tight">₹52Cr+</div>
                    <div className="text-slate-500 font-bold text-sm uppercase tracking-wider">Funds mobilized</div>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="p-4 bg-green-50 rounded-2xl text-green-600 shadow-inner">
                     <HeartHandshake className="w-9 h-9" />
                  </div>
                  <div>
                    <div className="text-4xl font-black text-slate-900 tracking-tight">340+</div>
                    <div className="text-slate-500 font-bold text-sm uppercase tracking-wider">Projects supported</div>
                  </div>
                </div>
              </div>

              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-10 py-5 bg-slate-900 text-white rounded-full font-black text-lg hover:bg-slate-800 hover:shadow-2xl transition-all group"
              >
                Join the network
                <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right Cards Layout */}
            <div className="lg:col-span-6 grid grid-cols-1 gap-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white rounded-[40px] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-green-600" />
                <div className="flex items-start justify-between mb-8">
                   <div className="p-4 bg-green-600 text-white rounded-[20px] shadow-lg shadow-green-200">
                      <Gem className="w-9 h-9" />
                   </div>
                   <div className="px-5 py-2 bg-green-50 text-green-600 rounded-full text-xs font-black uppercase tracking-[0.2em]">
                     Spotlight Grant
                   </div>
                </div>
                <div className="space-y-6">
                   <h3 className="text-3xl font-bold text-slate-900 leading-snug">
                    NITI Aayog – Women Livelihood Incubation Fund
                   </h3>
                   <p className="text-slate-500 font-medium text-base">
                      Last date: June 15, 2025 <span className="mx-2 text-slate-300">•</span> Up to ₹25 Lakhs support
                   </p>
                   <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-green-600 h-full w-3/4 rounded-full" />
                   </div>
                   <Link href="#" className="inline-flex items-center text-green-600 font-black text-base hover:gap-3 transition-all">
                      Learn more <ChevronRight className="w-5 h-5 ml-1" />
                   </Link>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="bg-white rounded-[40px] p-10 shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col items-center text-center space-y-5">
                  <div className="p-4 bg-green-600 text-white rounded-[20px] shadow-lg shadow-green-100">
                     <FileText className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                     <h4 className="text-xl font-bold text-slate-900">CSR Project Proposals</h4>
                     <p className="text-green-600 font-bold text-sm bg-green-50 px-4 py-1 rounded-full inline-block">Open now</p>
                  </div>
                </div>
                <div className="bg-white rounded-[40px] p-10 shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col items-center text-center space-y-5">
                  <div className="p-4 bg-green-600 text-white rounded-[20px] shadow-lg shadow-green-100">
                     <Building2 className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                     <h4 className="text-xl font-bold text-slate-900">State Innovation Fund</h4>
                     <p className="text-slate-500 font-bold text-sm">Maharashtra, TN</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Impact Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900">Our Impact</h2>
            <h3 className="text-xl sm:text-2xl font-bold text-green-600">Making a Difference Together</h3>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium">Real numbers, real change - see how we're transforming the NGO ecosystem</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "250+", title: "NGOs Partnered", note: "Across 22 states", icon: Users },
              { value: "180+", title: "Successful Grants", note: "Approved in 2024", icon: Award },
              { value: "1.2L+", title: "Beneficiaries Reached", note: "Through partner NGOs", icon: Target },
              { value: "45+", title: "Training Workshops", note: "Capacity building", icon: CheckCircle },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-50 rounded-[32px] p-8 border border-slate-100 hover:border-green-200 hover:bg-white hover:shadow-xl transition-all group"
              >
                <stat.icon className="w-10 h-10 text-green-600 mb-6 group-hover:scale-110 transition-transform" />
                <div className="text-4xl font-black text-slate-900 mb-2">{stat.value}</div>
                <div className="text-lg font-bold text-slate-800">{stat.title}</div>
                <div className="text-slate-500 font-medium mt-1">{stat.note}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900">What We Offer</h2>
            <h3 className="text-xl sm:text-2xl font-bold text-green-600">Comprehensive Support for NGOs</h3>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium">End-to-end assistance from grant discovery to project implementation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm"
            >
              <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-green-100">
                <Target className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-4">Grant Discovery</h4>
              <p className="text-slate-600 leading-relaxed font-medium">AI-powered matching with 500+ government schemes, CSR funds, and international grants.</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm"
            >
              <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-green-100">
                <FileText className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-4">Proposal Support</h4>
              <p className="text-slate-600 leading-relaxed font-medium">Expert guidance, templates, and reviews to craft winning grant proposals.</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm"
            >
              <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-green-100">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-4">Impact Tracking</h4>
              <p className="text-slate-600 leading-relaxed font-medium">Monitor project milestones, compliance, and report generation for donors.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="container-custom">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900">Success Stories</h2>
            <h3 className="text-xl sm:text-2xl font-bold text-green-600">Trusted by Leading NGOs</h3>
            <p className="text-slate-500 font-medium">Hear from organizations that transformed their impact with our support</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "\"NGO Solution helped us secure ₹45 Lakhs from the Ministry of Women & Child Development. Their grant alerts and proposal review were game-changers!\"",
                name: "Priya Sharma",
                role: "Director, Saksham Foundation"
              },
              {
                quote: "\"The live project dashboard and scheme filters saved us hours of research. We've applied to 12 schemes in just 3 months!\"",
                name: "Amit Patel",
                role: "CEO, Gramin Vikas Sansthan"
              },
              {
                quote: "\"Exceptional support team and timely updates on new grants. Our CSR partnerships increased by 200% after joining.\"",
                name: "Dr. Meera Nair",
                role: "Founder, Heal India Initiative"
              },
            ].map((story, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-50 rounded-[40px] p-10 space-y-8 relative group border border-transparent hover:border-green-100 hover:bg-white hover:shadow-2xl transition-all duration-500"
              >
                <div className="flex gap-1 text-green-600">
                  {[...Array(5)].map((_, i) => <Gem key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-xl font-bold text-slate-900 leading-relaxed italic">
                  {story.quote}
                </p>
                <div className="pt-6 border-t border-slate-200 flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-black">
                    {story.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900">{story.name}</h4>
                    <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">{story.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-3 bg-green-600 text-white px-12 py-5 rounded-full font-black text-lg hover:bg-green-700 hover:shadow-2xl hover:scale-105 transition-all shadow-xl shadow-green-200"
            >
              Partner With Us
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pre-footer CTA */}
      <section className="pb-24">
        <div className="container-custom">
          <div className="bg-slate-900 rounded-[60px] p-12 sm:p-24 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-96 h-96 bg-green-600/20 rounded-full blur-[120px]" />
             <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]" />
             
             <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
               <h2 className="text-4xl sm:text-6xl font-black text-white leading-tight">
                 Ready to Scale Your <br /> NGO's Impact?
               </h2>
               <p className="text-slate-400 text-xl font-medium">
                 Join 250+ organizations already using our platform to discover and secure funding.
               </p>
               <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/contact" className="px-10 py-5 bg-green-600 text-white rounded-full font-black text-lg hover:bg-green-700 transition-all w-full sm:w-auto">
                    Get Started Now
                  </Link>
                  <Link href="/services" className="px-10 py-5 bg-white/10 text-white border border-white/20 rounded-full font-black text-lg hover:bg-white/20 transition-all w-full sm:w-auto">
                    Explore Services
                  </Link>
               </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}



