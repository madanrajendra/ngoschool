"use client";

import { motion } from "framer-motion";
import { Handshake, ArrowRight } from "lucide-react";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="relative py-16 sm:py-24 md:py-48 overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        
        {/* Subtle abstract shapes */}
        <motion.div 
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-10 w-24 h-24 border-2 border-primary/10 rounded-3xl rotate-12 hidden lg:block" 
        />
        <motion.div 
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, -10, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-10 w-16 h-16 bg-primary/5 rounded-full hidden lg:block" 
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-6 py-2.5 rounded-full border border-primary/20 shadow-sm shadow-primary/5"
          >
            <Handshake className="w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-[0.2em]">Partner With Us</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1]"
          >
            Simplify NGO Management & <span className="text-primary italic">Focus on Your Mission</span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500 leading-relaxed font-medium mx-auto max-w-2xl px-4"
          >
            Let us handle registrations, compliance, and government scheme applications. Together, we can empower social organizations to create meaningful impact across India.
          </motion.p>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              delay: 0.3
            }}
            className="pt-6"
          >
            <Link 
              href="/contact" 
              className="inline-flex items-center space-x-3 bg-primary text-white px-7 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg shadow-[0_20px_40px_rgba(22,163,74,0.3)] hover:shadow-[0_25px_50px_rgba(22,163,74,0.4)] hover:-translate-y-1 transition-all group"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CTASection;
