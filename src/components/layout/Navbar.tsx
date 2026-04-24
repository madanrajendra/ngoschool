"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Live Projects", href: "/live-projects" },
    { name: "Blogs", href: "/blogs" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav 
      className={cn(
        "fixed w-full z-50 transition-all duration-500",
        scrolled 
          ? "bg-slate-900/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] py-3 border-b border-white/10" 
          : "bg-transparent py-6"
      )}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
              N
            </div>
            <span className="text-base sm:text-xl font-bold tracking-tight text-white">
              NGO School
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-bold uppercase tracking-wide transition-all hover:text-primary relative group text-white/90"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
            <Link 
              href="/contact" 
              className={cn(
                "btn-primary px-8 py-3 rounded-full font-bold uppercase tracking-wide text-[11px] transition-all",
                scrolled 
                  ? "bg-primary shadow-lg shadow-primary/20" 
                  : "bg-white text-primary border-transparent hover:bg-primary hover:text-white"
              )}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white transition-colors"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={cn(
        "md:hidden absolute w-full bg-slate-900/95 backdrop-blur-2xl shadow-2xl transition-all duration-500 overflow-hidden border-t border-white/5",
        isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="px-6 py-12 space-y-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-2xl font-bold text-white/90 hover:text-primary transition-colors border-b border-white/5 pb-6"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-8">
            <Link 
              href="/contact" 
              onClick={() => setIsOpen(false)}
              className="btn-primary block text-center py-5 rounded-3xl font-bold text-xl shadow-2xl shadow-primary/40"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
