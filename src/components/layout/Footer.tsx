import Link from "next/link";
import { Mail, Phone, MapPin, MessageCircle, Send, Globe, Camera } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 sm:pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-10 sm:mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                N
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                NGO School
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed">
              India&apos;s leading NGO consultancy platform. We help organizations grow through professional registration, compliance, and funding support.
            </p>
            <div className="flex space-x-4">
              {[MessageCircle, Send, Globe, Camera].map((Icon, i) => (
                <Link key={i} href="#" className="hover:text-primary transition-colors p-2 bg-slate-800 rounded-lg">
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Our Services</Link></li>
              <li><Link href="/live-projects" className="hover:text-primary transition-colors">Live Projects</Link></li>
              <li><Link href="/blogs" className="hover:text-primary transition-colors">Blog & News</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Services</h3>
            <ul className="space-y-4">
              <li><Link href="/services" className="hover:text-primary transition-colors">NGO Registration</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Compliance Audit</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">80G & 12A Filing</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">CSR Funding</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">FCRA Registration</Link></li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">

              <li className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Dwarka Mor, Delhi, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© {currentYear} NGO School. All Rights Reserved.</p>
           <div className="flex space-x-6 mt-4 md:mt-0">
             <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
             <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
             <Link href="/admin/login" className="hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest border border-slate-700 px-3 py-1 rounded-md">Admin Login</Link>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
