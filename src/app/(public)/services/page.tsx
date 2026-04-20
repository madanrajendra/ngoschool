"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, Loader2 } from "lucide-react";
import { getCollection } from "@/lib/firebase/services";
import { CORE_SERVICES } from "@/lib/data/services";

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchServices() {
      try {
        const firebaseData = await getCollection("services", "createdAt");
        
        // Merge firebase services with core services, avoiding duplicates by slug
        const coreServicesWithIds = CORE_SERVICES.map(s => ({ ...s, id: s.slug }));
        const combined = [...firebaseData];
        
        coreServicesWithIds.forEach(core => {
          if (!combined.find(s => s.slug === core.slug)) {
            combined.push(core);
          }
        });

        setServices(combined);
      } catch (error) {
        console.error("Failed to fetch services:", error);
        setServices(CORE_SERVICES);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  const filteredServices = services.filter(service => 
    service.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (service.shortDescription || service.description || "")?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-slate-900 text-white py-12 sm:py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
        <div className="container-custom relative z-10 text-center space-y-4 sm:space-y-8">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold px-4">Our Consultancy Services</h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-xl px-4">
            Professional solutions tailored for the unique challenges of NGOs, Trusts, and Social Enterprises in India.
          </p>
          <div className="max-w-md mx-auto relative group px-4 sm:px-0">
            <input 
              type="text" 
              placeholder="Search for a service..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-full py-3 sm:py-4 px-12 focus:bg-white focus:text-slate-900 focus:outline-none transition-all"
            />
            <Search className="absolute left-8 sm:left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white group-focus-within:text-primary transition-colors" />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="container-custom min-h-[400px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <p className="mt-4 text-slate-500 font-medium">Loading our services...</p>
            </div>
          ) : filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredServices.map((service, i) => (
                <div key={service.id || i} className="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all group flex flex-col h-full">
                  <div className="h-48 sm:h-64 overflow-hidden relative">
                    <img 
                      src={service.image || "https://images.unsplash.com/photo-1554224155-1696413575b8?q=80&w=800&auto=format&fit=crop"} 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <span className="text-white font-semibold">View Details</span>
                    </div>
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col flex-grow">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3 sm:mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                    <p className="text-sm sm:text-base text-slate-600 mb-6 sm:mb-8 flex-grow line-clamp-3">{service.shortDescription || service.description}</p>
                    <Link 
                      href={`/services/${service.slug}`} 
                      className="flex items-center justify-between py-4 border-t border-slate-100 font-bold text-primary group-hover:translate-x-1 transition-transform text-sm sm:text-base"
                    >
                      Explore Service <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-slate-200">
              <p className="text-slate-500 italic">No services found matching your search. Try another term!</p>
            </div>
          )}
        </div>
      </section>

      {/* FAQs Preview or Support section */}
      <section className="section-padding bg-white">
        <div className="container-custom flex flex-col lg:flex-row items-start lg:items-center gap-10 md:gap-16">
          <div className="flex-1 space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">Not sure which service you need?</h2>
            <p className="text-slate-600 text-lg">Our experts can help you audit your current compliance status and suggest the best path forward for your organization.</p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">Request Free Audit</Link>
              <Link href="/about" className="btn-secondary">Learn Our Process</Link>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="bg-primary/5 p-8 rounded-3xl space-y-2">
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm font-medium text-slate-600">Compliance Rate</div>
            </div>
            <div className="bg-secondary/10 p-8 rounded-3xl space-y-2 mt-8">
              <div className="text-3xl font-bold text-secondary">24/7</div>
              <div className="text-sm font-medium text-slate-600">Expert Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

