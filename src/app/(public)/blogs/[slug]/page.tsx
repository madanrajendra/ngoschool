import { getDocumentBySlug } from "@/lib/firebase/services";
import { Calendar, User, Share2, ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function BlogDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getDocumentBySlug("blogs", slug);

  if (!blog) {
    notFound();
  }

  const data: any = blog;
  const publishDate = data.createdAt?.seconds 
    ? new Date(data.createdAt.seconds * 1000).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric"
      })
    : data.date || "Today";

  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-20 bg-white">
        <div className="container-custom max-w-4xl">
          <Link href="/blogs" className="inline-flex items-center text-primary font-bold mb-10 hover:-translate-x-2 transition-transform">
             <ArrowLeft className="w-5 h-5 mr-2" />
             <span>Back to Blogs</span>
          </Link>
          
          <div className="space-y-8 mb-12">
             <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
                {data.category}
             </div>
             <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">{data.title}</h1>
             <div className="flex flex-wrap items-center gap-6 text-slate-500 font-medium">
                <div className="flex items-center space-x-2">
                   <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                      <User className="w-5 h-5" />
                   </div>
                   <span>{data.author || "Admin"}</span>
                </div>
                <div className="flex items-center space-x-2">
                   <Calendar className="w-5 h-5 opacity-50" />
                   <span>{publishDate}</span>
                </div>
                <div className="flex items-center space-x-2">
                   <Clock className="w-5 h-5 opacity-50" />
                   <span>{Math.ceil((data.content?.length || 1000) / 1000) * 2} min read</span>
                </div>
             </div>
          </div>

          <div className="rounded-[40px] overflow-hidden shadow-2xl mb-16 h-[500px]">
             <img 
               src={data.featuredImage || data.image || "https://images.unsplash.com/photo-1454165833767-131f3693006d?q=80&w=2070&auto=format&fit=crop"} 
               alt={data.title} 
               className="w-full h-full object-cover" 
             />
          </div>

          <div 
            className="prose prose-lg max-w-none prose-slate prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-h3:text-2xl prose-h3:font-bold prose-h3:mt-12 mb-20 blogs-content"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />

          <div className="border-t border-slate-100 pt-10 flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="flex items-center space-x-4">
                <span className="font-bold text-slate-800">Share this article:</span>
                <div className="flex space-x-2">
                   <button className="p-3 bg-slate-50 hover:bg-primary hover:text-white rounded-xl transition-all"><Share2 className="w-5 h-5" /></button>
                </div>
             </div>
             <div className="bg-slate-50 p-8 rounded-3xl flex-grow md:max-w-md">
                <h4 className="font-bold text-slate-900 mb-2">Subscribe to our NGO News</h4>
                <p className="text-sm text-slate-500 mb-4">Get the latest updates on grants and compliance in your inbox.</p>
                <div className="flex gap-2">
                   <input type="email" placeholder="email@ngo.com" className="flex-grow bg-white border border-slate-200 rounded-xl px-4 py-2 focus:outline-none" />
                   <button className="btn-primary py-2 px-6 text-sm">Join</button>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}

