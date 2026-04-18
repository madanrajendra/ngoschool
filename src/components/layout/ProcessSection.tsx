"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    title: "Share Your Requirement",
    desc: "Tell us about your NGO goals, current status, and requirements. This helps us understand your mission and plan the right solution.",
    image: "/images/requirement_step.png",
    number: "01"
  },
  {
    title: "Documentation & Planning",
    desc: "We prepare all required documents and guide you through the complete registration and compliance process with precision.",
    image: "https://images.unsplash.com/photo-1574950578143-858c6fc58922?q=80&w=800&auto=format&fit=crop",
    number: "02"
  },
  {
    title: "Execution & Support",
    desc: "We handle approvals, compliance, and provide ongoing support to help your NGO grow smoothly and maintain its impact.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop",
    number: "03"
  }
];

const ProcessSection = () => {
  return (
    <section className="py-16 sm:py-24 md:py-32 bg-white overflow-hidden" id="process">
      <div className="container-custom">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 md:mb-16 gap-6 md:gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl space-y-4"
          >
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest">
              <span>Our Process</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight">
              Simple Steps to <span className="text-primary italic">NGO Success</span>
            </h2>
            <p className="text-lg text-slate-500 font-medium">
              Our streamlined process makes NGO registration and compliance hassle-free, transparent, and stress-free.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="pb-2"
          >
            <Link 
              href="/contact" 
              className="inline-flex items-center space-x-3 bg-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all group"
            >
              <span>Enquiry Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-slate-100 mb-12 md:mb-20" />

        {/* Steps */}
        <div className="space-y-16 sm:space-y-24 md:space-y-32">
          {steps.map((step, i) => (
            <div key={i} className={`flex flex-col ${i % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 sm:gap-12 md:gap-24 relative`}>
              {/* Large Background Number - hidden on mobile to prevent overflow */}
              <div className={`absolute top-0 ${i % 2 !== 0 ? 'left-0' : 'right-0'} pointer-events-none select-none opacity-0 sm:opacity-10 lg:opacity-40`}>
                <span className="text-[6rem] sm:text-[10rem] md:text-[14rem] lg:text-[18rem] font-black text-slate-200 leading-none">
                  {step.number}
                </span>
              </div>

              {/* Image Side */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, x: i % 2 !== 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full md:w-1/2 relative z-10"
              >
                <div className="aspect-[4/3] rounded-[24px] sm:rounded-[32px] md:rounded-[40px] overflow-hidden shadow-2xl">
                  <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                </div>
              </motion.div>

              {/* Text Side */}
              <motion.div 
                initial={{ opacity: 0, x: i % 2 !== 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full md:w-1/2 space-y-4 sm:space-y-6 relative z-10"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary text-white rounded-xl sm:rounded-2xl flex items-center justify-center font-bold text-base sm:text-xl mb-2 sm:mb-4">
                  {step.number}
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                  {step.title}
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-slate-500 leading-relaxed">
                  {step.desc}
                </p>
                <Link href="/contact" className="inline-flex items-center text-primary font-bold group">
                  Get Started <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
