"use client";

import { useEffect, useState } from "react";
import { getCollection, deleteDocument, updateDocument } from "@/lib/firebase/services";
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  Globe, 
  Lock,
  Loader2,
  FileText
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

export default function BlogsAdminPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const data = await getCollection("blogs", "createdAt");
      setBlogs(data);
    } catch (error) {
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    try {
      await deleteDocument("blogs", id);
      toast.success("Blog deleted");
      loadBlogs();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const toggleStatus = async (blog: any) => {
    const newStatus = blog.status === 'published' ? 'draft' : 'published';
    try {
      await updateDocument("blogs", blog.id, { status: newStatus });
      toast.success(`Blog moved to ${newStatus}`);
      loadBlogs();
    } catch (error) {
      toast.error("Status update failed");
    }
  };

  const filteredBlogs = blogs.filter(b => 
    b.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Manage Blogs</h1>
          <p className="text-slate-500 mt-1">Publish news and insights for your audience.</p>
        </div>
        <Link href="/admin/blogs/new" className="btn-primary flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>New Article</span>
        </Link>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 flex items-center gap-4">
        <div className="relative flex-grow group">
          <input 
            type="text" 
            placeholder="Search blogs..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-12 focus:bg-white focus:ring-2 focus:ring-primary focus:outline-none transition-all"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
        </div>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center bg-white rounded-[40px]">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden flex flex-col group">
               <div className="h-48 relative">
                  <img 
                    src={blog.featuredImage || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop"} 
                    className="w-full h-full object-cover" 
                    alt={blog.title} 
                  />
                  <div className={cn(
                    "absolute top-6 left-6 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                    blog.status === 'published' ? 'bg-green-500 text-white' : 'bg-slate-500 text-white'
                  )}>
                    {blog.status}
                  </div>
               </div>
               <div className="p-8 space-y-4 flex-grow">
                 <span className="text-xs font-bold text-primary uppercase tracking-widest">{blog.category}</span>
                 <h3 className="text-xl font-bold text-slate-900 leading-tight line-clamp-2">{blog.title}</h3>
                 <p className="text-sm text-slate-500 line-clamp-2">{blog.excerpt}</p>
                 <div className="flex items-center justify-between pt-4 mt-auto">
                    <div className="flex items-center space-x-2">
                       <button 
                         onClick={() => toggleStatus(blog)}
                         className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
                         title={blog.status === 'published' ? 'Unpublish' : 'Publish'}
                       >
                         {blog.status === 'published' ? <Lock className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                       </button>
                       <Link 
                         href={`/blogs/${blog.slug}`} 
                         target="_blank"
                         className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
                       >
                         <Eye className="w-4 h-4" />
                       </Link>
                    </div>
                    <div className="flex items-center space-x-2">
                       <Link 
                         href={`/admin/blogs/edit/${blog.id}`} 
                         className="p-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-900 hover:text-white transition-all"
                       >
                         <Edit3 className="w-4 h-4" />
                       </Link>
                       <button 
                         onClick={() => handleDelete(blog.id)}
                         className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                       >
                         <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                 </div>
               </div>
            </div>
          ))}
          {filteredBlogs.length === 0 && (
            <div className="col-span-full py-20 text-center bg-white rounded-[40px] border border-slate-100 italic text-slate-400">
              No blogs found. Start by creating a new article!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
