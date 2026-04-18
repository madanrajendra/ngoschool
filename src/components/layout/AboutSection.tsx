"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Heart } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center">
          
          {/* Left Side: Overlapping Images */}
          <div className="relative order-2 lg:order-1 mt-6 lg:mt-0">
            <div className="relative z-10 grid grid-cols-12 gap-4">
              {/* Main Background Image (Top Left) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false }}
                className="col-span-12 lg:col-span-8 rounded-[24px] lg:rounded-[40px] overflow-hidden shadow-2xl"
              >
                <img 
                  src="/images/ngo_team_meeting.png" 
                  alt="NGO Team Meeting" 
                  className="w-full h-[260px] sm:h-[300px] lg:h-[400px] object-cover"
                />
              </motion.div>
              
              {/* Overlapping Image (Bottom Right) - hidden on small screens */}
              <motion.div 
                initial={{ opacity: 0, x: 50, y: 50 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: false }}
                className="hidden lg:block col-span-7 col-start-5 -mt-32 rounded-[40px] overflow-hidden shadow-2xl border-8 border-white -skew-y-1"
              >
                <img 
                  src="https://images.unsplash.com/photo-1574950578143-858c6fc58922?q=80&w=1200&auto=format&fit=crop" 
                  alt="Documentation Support" 
                  className="w-full h-[350px] object-cover"
                />
              </motion.div>
            </div>

            {/* Floating Experience Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut",
                opacity: { duration: 0.8 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              viewport={{ once: false }}
              className="absolute top-1/2 -translate-y-1/2 -left-1 sm:-left-4 lg:-left-12 z-20 bg-white p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex items-center space-x-2 sm:space-x-3 lg:space-x-4 max-w-[155px] sm:max-w-[190px] lg:max-w-xs border border-slate-50"
            >
              <div className="w-9 h-9 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-primary" />
              </div>
              <div>
                <p className="text-slate-800 font-bold leading-tight text-[10px] sm:text-xs lg:text-sm">
                  10+ years of experience supporting NGOs across India.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Content */}
          <div className="order-1 lg:order-2 space-y-6 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
            >
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-bold text-xs tracking-widest uppercase rounded-full">
                ABOUT US
              </span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, x: 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: false }}
              className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight"
            >
              India&apos;s Trusted <span className="text-primary italic">NGO Support</span> Partner
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, x: 90 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: false }}
              className="text-base md:text-lg text-slate-600 leading-relaxed font-medium"
            >
              We are India&apos;s trusted NGO assistance platform, helping social organizations manage registrations, compliance, and government schemes with ease. Our goal is to reduce paperwork stress so you can focus on your social mission.
            </motion.p>

            {/* Feature Blocks */}
            <div className="space-y-6 md:space-y-8 pt-2 md:pt-4">
              <motion.div 
                initial={{ opacity: 0, x: 110 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: false }}
                className="flex items-start space-x-4 sm:space-x-5 group"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-50 rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-primary transition-all duration-300 flex-shrink-0">
                  <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-primary group-hover:text-white" />
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900">End-to-End NGO Support</h4>
                  <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                    From NGO registration to ongoing compliance, we provide complete guidance tailored to all types of NGOs.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 130 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: false }}
                className="flex items-start space-x-4 sm:space-x-5 group"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-50 rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-primary transition-all duration-300 flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-primary group-hover:text-white" />
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900">Trusted by 100+ NGOs Across India</h4>
                  <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                    With transparent pricing and a dedicated relationship manager, we deliver reliable support to NGOs in every state.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
