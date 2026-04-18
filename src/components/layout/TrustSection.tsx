"use client";

import { motion } from "framer-motion";
import { ShieldCheck, MessageCircle, Zap, Users, Award, Landmark, CheckCircle2 } from "lucide-react";

const trustPoints = [
  {
    title: "NGO-Focused Experts",
    desc: "Our specialists understand the unique legal, compliance, and operational needs of social organizations.",
    icon: Users,
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "Transparent Process",
    desc: "Clear timelines, honest communication, and absolutely no hidden charges at any stage.",
    icon: ShieldCheck,
    color: "bg-green-50 text-green-600"
  },
  {
    title: "Simple Explanations",
    desc: "We explain complex rules and procedures in easy-to-understand language without legal jargon.",
    icon: MessageCircle,
    color: "bg-purple-50 text-purple-600"
  },
  {
    title: "Dedicated Support",
    desc: "Get personal assistance and a dedicated relationship manager throughout your NGO journey.",
    icon: Zap,
    color: "bg-orange-50 text-orange-600"
  },
  {
    title: "Trusted by Many",
    desc: "Hundreds of NGOs across India trust us for reliable support and long-term guidance.",
    icon: Award,
    color: "bg-yellow-50 text-yellow-600"
  },
  {
    title: "Government Scheme Expertise",
    desc: "We help NGOs identify and apply for the right central and state government schemes with confidence.",
    icon: Landmark,
    color: "bg-primary/10 text-primary"
  }
];

const TrustSection = () => {
  return (
    <section className="section-padding bg-slate-50 overflow-hidden" id="trust">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              className="space-y-4"
            >
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest">
                <CheckCircle2 className="w-4 h-4" />
                <span>Why NGOs Trust Us</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight">
                Why NGOs Trust <span className="text-primary italic">NGO School</span>
              </h2>
              <p className="text-xl text-slate-500 font-medium">
                We are committed to making NGO management simple, transparent, and stress-free, so you can focus on creating real social impact.
              </p>
            </motion.div>

            {/* Grid of Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {trustPoints.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
                >
                  <div className={`w-12 h-12 ${point.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <point.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2 truncate">{point.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                    {point.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotate: 2 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full -z-10 animate-pulse" />
            
            <div className="relative rounded-[60px] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=800&auto=format&fit=crop" 
                alt="Why NGOs Trust Us Illustration" 
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Floating Stats */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-4 lg:-left-8 bg-white p-4 lg:p-6 rounded-2xl lg:rounded-3xl shadow-2xl border border-slate-50 z-20 hidden lg:block"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                  5k+
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-lg">NGOs Assisted</div>
                  <div className="text-sm text-slate-500">Across 28+ States</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default TrustSection;
