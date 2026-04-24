"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { getCollection } from "@/lib/firebase/services";
import { CORE_SERVICES } from "@/lib/data/services";

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const firebaseData = await getCollection("services", "createdAt") as any[];
        
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

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-slate-900 text-white py-10 sm:py-12 md:py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold px-4">Services</h1>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="container-custom min-h-[400px]">
          <div className="max-w-4xl mb-12 sm:mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Our Services</h2>
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-800">End-to-End Services for NGOs</h3>
            <p className="text-slate-600 text-base sm:text-lg">
              Discover comprehensive NGO services by NGO Solution, covering registration, compliance, advisory support, and government scheme guidance to help your organization grow with confidence.
            </p>
          </div>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <p className="mt-4 text-slate-500 font-medium">Loading our services...</p>
            </div>
          ) : services.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {services.map((service, i) => (
                <div key={service.id || i} className="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all group flex flex-col h-full">
                  <div className="h-48 sm:h-64 overflow-hidden relative">
                    <img 
                      src={service.image || "https://images.unsplash.com/photo-1554224155-1696413575b8?q=80&w=800&auto=format&fit=crop"} 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1554224155-1696413575b8?q=80&w=800&auto=format&fit=crop";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <span className="text-white font-semibold">View Details</span>
                    </div>
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col flex-grow">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3 sm:mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                    <p className="text-sm sm:text-base text-slate-600 mb-6 sm:mb-8 flex-grow line-clamp-3">{service.shortDescription || service.description}</p>
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center px-4 py-2 rounded-xl border border-primary text-primary font-semibold text-sm hover:bg-primary/10 transition-colors"
                      >
                        Get Help
                      </Link>
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-slate-800 text-white font-semibold text-sm hover:bg-slate-700 transition-colors"
                      >
                        Explore Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-slate-200">
              <p className="text-slate-500 italic">No services found right now. Please check again shortly.</p>
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

