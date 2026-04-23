import { getDocumentBySlug, getCollection } from "@/lib/firebase/services";
import { CheckCircle, ArrowRight, Shield, Award, Users, Briefcase, FileText, Target } from "lucide-react";
import { CORE_SERVICES } from "@/lib/data/services";
import Link from "next/link";
import { notFound } from "next/navigation";
import SafeImage from "@/components/ui/SafeImage";

export async function generateStaticParams() {
  const services = await getCollection("services");
  const slugs = services.map((s: any) => ({ slug: s.slug }));
  
  // Also include core services
  CORE_SERVICES.forEach(s => {
    if (!slugs.find(existing => existing.slug === s.slug)) {
      slugs.push({ slug: s.slug });
    }
  });
  
  return slugs;
}

export default async function ServiceDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getDocumentBySlug("services", slug);

  // Use core service as fallback if not in firestore
  const fallback = CORE_SERVICES.find(s => s.slug === slug);

  const data: any = service || fallback;

  if (!data) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      <section className="bg-slate-50 py-20 border-b border-slate-100">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-grow space-y-6">
               <nav className="flex text-sm text-slate-500 space-x-2">
                <Link href="/" className="hover:text-primary">Home</Link>
                <span>/</span>
                <Link href="/services" className="hover:text-primary">Services</Link>
                <span>/</span>
                <span className="text-slate-900 font-medium">{data.title}</span>
              </nav>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">{data.title}</h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">{data.fullDescription}</p>
              <Link href="/contact" className="btn-primary inline-block">Enquire for this Service</Link>
            </div>
            <div className="w-full md:w-[450px] flex-shrink-0">
               <div className="rounded-[40px] overflow-hidden shadow-2xl border-8 border-white p-2 bg-slate-100">
                  <SafeImage 
                    src={data.image} 
                    fallbackSrc="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop"
                    alt={data.title} 
                    className="w-full h-[300px] object-cover rounded-[32px]"
                  />
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-3 gap-16">
           <div className="lg:col-span-2 space-y-12">
              <div className="space-y-6">
                 <h2 className="text-3xl font-bold text-slate-900">Key Benefits</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.benefits?.map((benefit: string, i: number) => (
                      <div key={i} className="flex items-start space-x-3 p-6 bg-slate-50 rounded-2xl group hover:bg-primary/5 transition-colors">
                         <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                         <span className="text-slate-700 font-medium">{benefit}</span>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="space-y-6">
                 <h2 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
                 <div className="space-y-4">
                    {data.faqs?.map((faq: any, i: number) => (
                      <div key={i} className="border border-slate-100 rounded-3xl p-8 hover:shadow-md transition-shadow">
                         <h4 className="text-lg font-bold text-slate-900 mb-2">{faq.q}</h4>
                         <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="space-y-8">
              <div className="bg-slate-900 text-white p-10 rounded-[40px] space-y-8">
                 <h3 className="text-2xl font-bold">Why Choose Us?</h3>
                 <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                       <Shield className="w-6 h-6 text-primary-light" />
                       <div className="text-sm font-bold">100% Guaranteed Compliance</div>
                    </div>
                    <div className="flex items-center space-x-4">
                       <Award className="w-6 h-6 text-secondary" />
                       <div className="text-sm font-bold">Expert CA/CS Consultation</div>
                    </div>
                    <div className="flex items-center space-x-4">
                       <Users className="w-6 h-6 text-orange-400" />
                       <div className="text-sm font-bold">Dedicated Relationship Manager</div>
                    </div>
                 </div>
                 <hr className="border-white/10" />
                 <div className="space-y-4">
                    <p className="text-sm text-slate-400 font-medium">Have a specific requirement?</p>
                    <Link href="/contact" className="w-full text-center bg-white text-slate-900 font-bold py-4 rounded-2xl flex items-center justify-center space-x-2 hover:bg-primary-light hover:text-white transition-all">
                       <span>Get a Custom Quote</span>
                       <ArrowRight className="w-4 h-4" />
                    </Link>
                 </div>
              </div>


           </div>
        </div>
      </section>
    </div>
  );
}
