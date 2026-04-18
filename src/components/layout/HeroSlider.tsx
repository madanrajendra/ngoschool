"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1594608661623-aa0bd3a67d28?q=80&w=2071&auto=format&fit=crop",
    label: "COMPLETE NGO ASSISTANCE PLATFORM",
    heading: "Managing Your NGO, Simplified Under One Roof",
    subtext: "From registration to compliance and funding, we handle everything so you focus on impact.",
    cta: "Register Now",
    link: "/contact"
  },
  {
    image: "/images/ngo_team_meeting.png",
    label: "EXPERT ADVISORY",
    heading: "Your Vision, Our Professional Support",
    subtext: "Transforming social change through specialized consulting and dedicated relationship management.",
    cta: "Explore Services",
    link: "/services"
  }
];

export default function HeroSlider() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: "100svh", minHeight: "600px" }}>
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1500}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
          el: ".swiper-pagination-custom",
        }}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative w-full h-full overflow-hidden bg-slate-900">
            {/* Background Image Container */}
            <div className="absolute inset-0 z-0">
               <motion.div
                 initial={{ scale: 1.1 }}
                 animate={{ scale: 1 }}
                 transition={{ duration: 10, ease: "linear" }}
                 className="absolute inset-0 bg-cover bg-center"
                 style={{ backgroundImage: `url(${slide.image})` }}
               />
               {/* Darkened Overlay for Readability */}
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-slate-900/30 z-10" />
               <div className="absolute inset-0 bg-slate-900/30 z-10" />
            </div>

            {/* Content Section */}
            <div className="container-custom relative z-20 h-full flex items-center pt-12 sm:pt-0">
              <div className="w-full max-w-4xl space-y-4 sm:space-y-6 md:space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="inline-block px-3 py-1 sm:px-4 sm:py-2 bg-primary/20 backdrop-blur-md text-primary font-bold text-[10px] sm:text-xs tracking-widest uppercase rounded-full border border-primary/30">
                    {slide.label}
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.15] sm:leading-[1.1] tracking-tight"
                >
                  {slide.heading.split(' ').map((word, i) => (
                    word === 'Simplified' ? <span key={i} className="text-primary italic">Simplified </span> : word + ' '
                  ))}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-base sm:text-xl md:text-2xl text-slate-200 leading-relaxed font-medium max-w-2xl line-clamp-3 sm:line-clamp-none"
                >
                  {slide.subtext}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 pt-2 sm:pt-4"
                >
                  <Link
                    href={slide.link}
                    className="btn-primary py-3 px-8 sm:py-4 sm:px-10 text-center text-base sm:text-lg shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all font-bold"
                  >
                    {slide.cta}
                  </Link>
                  <Link
                    href="/about"
                    className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold py-3 px-8 sm:py-4 sm:px-10 text-center rounded-2xl hover:bg-white/20 transition-all text-base sm:text-lg"
                  >
                    About Us
                  </Link>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination Container */}
      <div className="swiper-pagination-custom absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex space-x-3 !w-auto"></div>
      
      {/* Bottom accent for section transition */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-50 to-transparent z-20 pointer-events-none opacity-40" />
    </section>
  );
}
