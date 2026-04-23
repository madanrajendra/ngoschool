import { getDocument, getCollection } from "@/lib/firebase/services";
import { IndianRupee, Calendar, MapPin, CheckCircle, ArrowRight, Share2, Award, Users } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const projects = await getCollection("projects");
  return projects.map((p: any) => ({
    slug: p.id,
  }));
}

export default async function ProjectDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project: any = await getDocument("projects", slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/20 -skew-x-12 translate-x-1/2" />
        <div className="container-custom relative z-10">
           <Link href="/live-projects" className="inline-flex items-center text-primary-light font-bold mb-8 hover:-translate-x-2 transition-transform text-sm uppercase tracking-widest">
             <IndianRupee className="w-4 h-4 mr-2" />
             <span>Back to Grants</span>
           </Link>
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
              <div className="space-y-6">
                 <div className="inline-flex items-center space-x-2 bg-green-500 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                    {project.status}
                 </div>
                 <h1 className="text-4xl md:text-5xl font-bold leading-tight">{project.title}</h1>
                 <div className="flex flex-wrap gap-6 text-slate-300">
                    <div className="flex items-center space-x-2">
                       <IndianRupee className="w-5 h-5 text-primary-light" />
                       <span className="font-bold text-white text-xl">{project.amount}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                       <Calendar className="w-5 h-5 opacity-50" />
                       <span className="font-medium">Due: {project.deadline}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                       <MapPin className="w-5 h-5 opacity-50" />
                       <span className="font-medium">{project.location}</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-3 gap-16">
           <div className="lg:col-span-2 space-y-12">
              <div className="rounded-[40px] overflow-hidden shadow-2xl h-[400px] bg-slate-100">
                 <img 
                   src={project.image || "https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=1200&auto=format&fit=crop"} 
                   alt={project.title} 
                   className="w-full h-full object-cover"
                   onError={(e) => {
                     (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=1200&auto=format&fit=crop";
                   }}
                 />
              </div>

              <div className="space-y-6">
                 <h2 className="text-3xl font-bold text-slate-900">Project Overview</h2>
                 <p className="text-slate-600 text-lg leading-relaxed">{project.fullDetails}</p>
              </div>

              <div className="space-y-6">
                 <h2 className="text-3xl font-bold text-slate-900">Eligibility Criteria</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.eligibility?.map((item: string, i: number) => (
                      <div key={i} className="flex items-start space-x-3 p-6 bg-slate-50 rounded-2xl">
                         <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                         <span className="text-slate-700 font-medium">{item}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="space-y-8">
              <div className="bg-slate-50 border border-slate-100 p-10 rounded-[40px] space-y-8">
                 <h3 className="text-2xl font-bold text-slate-900 text-center">Ready to Apply?</h3>
                 <p className="text-center text-slate-500">We assist NGOs in proposal writing and documentation for this specific grant.</p>
                 <Link href="/contact" className="w-full btn-primary py-4 text-center">
                    Get Application Support
                 </Link>
                 <div className="flex items-center justify-center space-x-4">
                    <button className="flex items-center space-x-2 text-slate-400 hover:text-primary transition-colors font-bold text-sm">
                       <Share2 className="w-4 h-4" />
                       <span>Share</span>
                    </button>
                 </div>
              </div>

              <div className="bg-primary text-white p-8 rounded-[40px] space-y-6">
                 <div className="flex items-center space-x-4">
                    <Award className="w-8 h-8 opacity-50" />
                    <div>
                       <div className="font-bold">340+ Grants</div>
                       <div className="text-xs opacity-80 uppercase tracking-widest font-bold">Successfully Managed</div>
                    </div>
                 </div>
                 <div className="flex items-center space-x-4">
                    <Users className="w-8 h-8 opacity-50" />
                    <div>
                       <div className="font-bold">250+ Partners</div>
                       <div className="text-xs opacity-80 uppercase tracking-widest font-bold">In Our Network</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
