import Link from "next/link";
import { Mail, Phone } from "lucide-react";

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
              We empower NGOs across India by simplifying registrations, compliance, and government schemes, so you can focus on creating meaningful social impact.
            </p>
            <div className="flex items-center space-x-3">
              <Link href="#" className="hover:text-primary transition-colors p-2 bg-slate-800 rounded-lg" aria-label="Facebook">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                  <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.9 3.78-3.9 1.1 0 2.25.2 2.25.2v2.47H15.2c-1.25 0-1.64.78-1.64 1.58V12h2.8l-.45 2.9h-2.35v6.99A10 10 0 0 0 22 12z" />
                </svg>
              </Link>
              <Link href="#" className="hover:text-primary transition-colors p-2 bg-slate-800 rounded-lg" aria-label="Instagram">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm8.5 1.8h-8.5A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95z" />
                  <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4zM17.6 6.4a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z" />
                </svg>
              </Link>
              <Link href="#" className="hover:text-primary transition-colors p-2 bg-slate-800 rounded-lg" aria-label="YouTube">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                  <path d="M23.5 7.2a3 3 0 0 0-2.1-2.1C19.6 4.5 12 4.5 12 4.5s-7.6 0-9.4.6A3 3 0 0 0 .5 7.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.8.6 9.4.6 9.4.6s7.6 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-4.8zM9.6 15.4V8.6L15.8 12l-6.2 3.4z" />
                </svg>
              </Link>
              <Link href="#" className="hover:text-primary transition-colors p-2 bg-slate-800 rounded-lg" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                  <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.03-3.03-1.85-3.03-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.62 0 4.29 2.38 4.29 5.48v6.26zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Our Services</Link></li>
              <li><Link href="/live-projects" className="hover:text-primary transition-colors">Live Projects</Link></li>
              <li><Link href="/blogs" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/terms-condition" className="hover:text-primary transition-colors">Terms &amp; Condition</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Our Services</h3>
            <ul className="space-y-4">
              <li><Link href="/services" className="hover:text-primary transition-colors">NGO Registration Services</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Government &amp; Statutory Registrations for NGOs</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Income Tax &amp; Compliance for NGOs | NGO Solution</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">NGO Advisory &amp; Support Services | NGO Solution</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Government Schemes &amp; Projects for NGOs</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">TRUST REGISTRATION</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">SSE Registration &amp; Listing for NGOs in India</Link></li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Emails</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <a href="mailto:help@ngoschool.com" className="hover:text-primary transition-colors">help@ngoschool.com</a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <a href="mailto:support@ngoschool.com" className="hover:text-primary transition-colors">support@ngoschool.com</a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <a href="tel:9511409795" className="hover:text-primary transition-colors">9511409795</a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <a href="tel:9473992171" className="hover:text-primary transition-colors">9473992171</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© {currentYear} NGO School. All Rights Reserved.</p>
           <div className="flex space-x-6 mt-4 md:mt-0">
             <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
             <Link href="/terms-condition" className="hover:text-white transition-colors">Terms &amp; Condition</Link>
             <Link href="/admin/login" className="hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest border border-slate-700 px-3 py-1 rounded-md">Admin Login</Link>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
