"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle, Users, Target, Shield, Briefcase, FileText, Phone, IndianRupee, Award, MapPin, Mail, Send, Loader2 } from "lucide-react";
import HeroSlider from "@/components/layout/HeroSlider";
import AboutSection from "@/components/layout/AboutSection";
import CTASection from "@/components/layout/CTASection";
import ProcessSection from "@/components/layout/ProcessSection";
import TrustSection from "@/components/layout/TrustSection";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { addDocument, getCollection } from "@/lib/firebase/services";
import { CORE_SERVICES } from "@/lib/data/services";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";

// Icon mapping helper
const IconMap: any = { Briefcase, Shield, FileText, Users, Target, ArrowRight };
const homeContactSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
  organizationName: z.string().min(2, "Organization name is required"),
  interestedService: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

type HomeContactFormValues = z.infer<typeof homeContactSchema>;

export default function HomePage() {
  const [services, setServices] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HomeContactFormValues>({
    resolver: zodResolver(homeContactSchema),
  });

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch Services
        const firebaseData = await getCollection("services", "createdAt") as any[];
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

  const onSubmitContact = async (data: HomeContactFormValues) => {
    setIsSubmittingContact(true);
    try {
      await addDocument("enquiries", {
        ...data,
        status: "new",
      });
      toast.success("Enquiry submitted successfully! We will contact you soon.");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmittingContact(false);
    }
  };

  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* Premium Hero */}
      <div className="relative group">
        <HeroSlider />
      </div>

      {/* Hero Stats (non-overlay) */}
      <section className="bg-slate-50">
        <div className="container-custom py-4 sm:py-6">
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-900 rounded-2xl p-4 sm:p-5 shadow-xl"
          >
             {[
               { label: "Funds Mobilized", val: "₹52Cr+", icon: IndianRupee },
               { label: "NGOs Empowered", val: "250+", icon: Users },
               { label: "Successful Grants", val: "340+", icon: Award },
               { label: "States Present", val: "22+", icon: MapPin }
             ].map((stat, i) => (
               <div key={i} className="flex items-center gap-2 sm:gap-3 lg:border-r lg:last:border-r-0 border-white/10 lg:pr-2">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-primary/20 rounded-lg flex items-center justify-center text-primary-light">
                     <stat.icon className="w-4 h-4" />
                  </div>
                  <div className="text-white min-w-0">
                     <div className="text-sm sm:text-base font-black leading-none">{stat.val}</div>
                     <div className="text-[10px] uppercase tracking-tight opacity-80 font-bold">{stat.label}</div>
                  </div>
               </div>
             ))}
          </motion.div>
        </div>
      </section>

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
                  src={service.image || "https://images.unsplash.com/photo-1554224155-1696413575b8?q=80&w=800&auto=format&fit=crop"} 
                  className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-1000 group-hover:opacity-30" 
                  alt={service.title} 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1554224155-1696413575b8?q=80&w=800&auto=format&fit=crop";
                  }}
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
                   <div className="flex items-center justify-between gap-3">
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center px-4 py-2 rounded-xl border border-white/60 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
                      >
                        Get Help
                      </Link>
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-white text-slate-900 font-semibold text-sm hover:bg-primary-light hover:text-white transition-colors"
                      >
                        Explore Now
                      </Link>
                   </div>
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

      {/* Premium Blog Recap */}
      <section className="py-24 sm:py-32 bg-white overflow-hidden" id="blogs">
        <div className="container-custom">
          <div className="mb-10 sm:mb-14 text-center">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900">Blogs</h2>
            <p className="text-slate-500 mt-3">Latest insights, guides, and updates for NGOs</p>
          </div>
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

      <section className="py-20 sm:py-24 bg-slate-50 border-y border-slate-100" id="contact">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary">
                  <Phone className="w-7 h-7" />
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-slate-900">
                  Contact Us
                </h2>
                <p className="text-slate-600 text-lg">
                  Fill the form and our team will reach out quickly to help with registrations, compliance, and funding support.
                </p>
              </div>

              <div className="space-y-4">
                <a href="tel:9511409795" className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200">
                  <span className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="text-sm text-slate-500">Call Us Anytime</p>
                    <p className="text-lg font-bold text-slate-900">9511409795</p>
                  </div>
                </a>
                <a href="mailto:help@ngoschool.com" className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200">
                  <span className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="text-sm text-slate-500">Email Us Anytime</p>
                    <p className="text-lg font-bold text-slate-900">help@ngoschool.com</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 shadow-xl border border-slate-200">
              <form onSubmit={handleSubmit(onSubmitContact)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Full Name</label>
                    <input {...register("name")} placeholder="Enter your name" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-primary focus:outline-none transition-all" />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Email Address</label>
                    <input {...register("email")} placeholder="info@yourorg.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-primary focus:outline-none transition-all" />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Phone Number</label>
                    <input {...register("phone")} placeholder="+91 XXXXX XXXXX" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-primary focus:outline-none transition-all" />
                    {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Organization Name</label>
                    <input {...register("organizationName")} placeholder="Enter your NGO name" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-primary focus:outline-none transition-all" />
                    {errors.organizationName && <p className="text-red-500 text-xs">{errors.organizationName.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Service Interested In</label>
                  <select {...register("interestedService")} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-primary focus:outline-none transition-all appearance-none">
                    <option value="">Select a service</option>
                    <option value="ngo-reg">NGO Registration</option>
                    <option value="80g-12a">80G & 12A Filing</option>
                    <option value="csr">CSR Funding</option>
                    <option value="compliance">Annual Compliance</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                  {errors.interestedService && <p className="text-red-500 text-xs">{errors.interestedService.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Message</label>
                  <textarea {...register("message")} rows={4} placeholder="How can we help you?" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-primary focus:outline-none transition-all resize-none" />
                  {errors.message && <p className="text-red-500 text-xs">{errors.message.message}</p>}
                </div>

                <button type="submit" disabled={isSubmittingContact} className="w-full btn-primary py-4 flex items-center justify-center space-x-3 text-base sm:text-lg">
                  {isSubmittingContact ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
