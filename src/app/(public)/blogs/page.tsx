"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Calendar, User, ArrowRight, Loader2 } from "lucide-react";
import { getCollection } from "@/lib/firebase/services";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const data: any = await getCollection("blogs", "createdAt");
        // Only show published blogs on public site
        setBlogs(data.filter((blog: any) => blog.status === 'published'));
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(b => 
    b.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-slate-50 py-14 sm:py-20">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-slate-900">Expert Insights &amp; News</h1>
              <p className="text-xl text-slate-600">The latest updates on NGO laws, funding opportunities, and management best practices in India.</p>
            </div>
            <div className="relative w-full md:w-80">
              <input 
                type="text" 
                placeholder="Search articles..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl py-3 px-12 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <p className="text-slate-500 font-medium">Loading insights...</p>
            </div>
          ) : filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredBlogs.map((blog, i) => (
                <article key={blog.id || i} className="group flex flex-col h-full">
                  <div className="relative h-64 mb-8 rounded-[40px] overflow-hidden">
                    <img 
                      src={blog.featuredImage || blog.image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop"} 
                      alt={blog.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md text-primary font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-full">
                      {blog.category}
                    </div>
                  </div>
                  <div className="flex-grow space-y-4">
                    <div className="flex items-center space-x-4 text-sm text-slate-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(blog.createdAt?.seconds * 1000).toLocaleDateString() || blog.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{blog.author || "Admin"}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-slate-600 line-clamp-3">
                      {blog.excerpt}
                    </p>
                  </div>
                  <div className="mt-8 pt-8 border-t border-slate-100">
                    <Link 
                      href={`/blogs/${blog.slug}`} 
                      className="inline-flex items-center font-bold text-primary group-hover:translate-x-2 transition-transform"
                    >
                      Read Full Article <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-[40px] border border-dashed border-slate-200">
              <p className="text-slate-500 italic">No articles found matching your criteria.</p>
            </div>
          )}

          {!loading && filteredBlogs.length > 0 && (
            <div className="mt-20 flex justify-center">
               <div className="flex items-center space-x-2">
                  <button className="w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center font-bold bg-primary text-white border-primary">1</button>
               </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
