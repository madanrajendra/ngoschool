"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { addDocument } from "@/lib/firebase/services";
import { ArrowLeft, Save, Image as ImageIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

const blogSchema = z.object({
  title: z.string().min(5, "Title is too short"),
  slug: z.string().min(3, "Slug is required"),
  category: z.string().min(1, "Category is required"),
  excerpt: z.string().min(10, "Excerpt is too short"),
  content: z.string().min(20, "Content is needed"),
  author: z.string().min(2, "Author is required"),
  featuredImage: z.string().url("Invalid image URL").optional().or(z.literal("")),
});

type BlogFormValues = z.infer<typeof blogSchema>;

export default function NewBlogPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      category: "Compliance",
      author: "Admin",
    }
  });

  const title = watch("title");
  
  // Auto-generate slug
  const generateSlug = () => {
    if (title) {
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setValue("slug", slug);
    }
  };

  const onSubmit = async (data: BlogFormValues) => {
    setLoading(true);
    try {
      await addDocument("blogs", {
        ...data,
        status: "draft",
        publishedAt: null,
      });
      toast.success("Blog created successfully!");
      router.push("/admin/blogs");
    } catch (error) {
      toast.error("Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
           <Link href="/admin/blogs" className="p-3 bg-white shadow-sm rounded-2xl hover:bg-slate-50 transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-500" />
           </Link>
           <div>
              <h1 className="text-3xl font-bold text-slate-900">Create New Blog</h1>
              <p className="text-slate-500 mt-1">Draft a new article for your NGO audience.</p>
           </div>
        </div>
        <button 
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
          className="btn-primary flex items-center space-x-3 px-8"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          <span>Save Post</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {/* Main Content Form */}
         <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 space-y-8">
               <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Article Title</label>
                    <input 
                      {...register("title")} 
                      onBlur={generateSlug}
                      placeholder="e.g. How to get 80G registration..." 
                      className="w-full text-2xl font-bold bg-slate-50 border-none rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-primary transition-all outline-none" 
                    />
                    {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Content (Rich Text / HTML)</label>
                    <textarea 
                      {...register("content")} 
                      rows={12} 
                      placeholder="Write your article here. Supports HTML tags." 
                      className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-primary transition-all outline-none resize-none font-mono text-sm" 
                    />
                    {errors.content && <p className="text-red-500 text-xs">{errors.content.message}</p>}
                  </div>
               </div>
            </div>

            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 space-y-6">
                <h3 className="text-xl font-bold text-slate-800">SEO & Metadata</h3>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Article Excerpt</label>
                    <textarea 
                      {...register("excerpt")} 
                      rows={3} 
                      placeholder="A short summary of the blog post for search results." 
                      className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-primary transition-all outline-none resize-none" 
                    />
                    {errors.excerpt && <p className="text-red-500 text-xs">{errors.excerpt.message}</p>}
                </div>
            </div>
         </div>

         {/* Sidebar Form */}
         <div className="space-y-8">
            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 space-y-8">
                <h3 className="text-xl font-bold text-slate-800">Publishing Info</h3>
                
                <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Article Slug</label>
                      <input 
                        {...register("slug")} 
                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-xs font-mono text-slate-500 focus:bg-white focus:outline-none" 
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Category</label>
                      <select {...register("category")} className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:bg-white focus:outline-none">
                         <option value="Compliance">Compliance</option>
                         <option value="Funding">Funding</option>
                         <option value="Legal">Legal</option>
                         <option value="Operations">Operations</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Author Name</label>
                      <input {...register("author")} className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:bg-white focus:outline-none" />
                    </div>
                </div>
            </div>

            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 space-y-6">
                <h3 className="text-xl font-bold text-slate-800">Featured Image</h3>
                <div className="aspect-video rounded-3xl bg-slate-50 border-2 border-dashed border-slate-100 flex flex-col items-center justify-center text-slate-400 p-4">
                   {watch("featuredImage") ? (
                      <img src={watch("featuredImage")} className="w-full h-full object-cover rounded-2xl" alt="Preview" />
                   ) : (
                      <>
                        <ImageIcon className="w-10 h-10 mb-2 opacity-20" />
                        <span className="text-xs text-center">Enter public image URL below or upload in Media section first</span>
                      </>
                   )}
                </div>
                <input 
                  {...register("featuredImage")} 
                  placeholder="Paste image URL here" 
                  className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-xs focus:bg-white focus:outline-none" 
                />
            </div>
         </div>
      </div>
    </div>
  );
}
