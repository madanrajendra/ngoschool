"use client";

import { useState, useEffect } from "react";
import { getCollection } from "@/lib/firebase/services";
import { ImageIcon, Maximize2, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GalleryPage() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const data = await getCollection("media", "createdAt") as any[];
        setImages(data);
      } catch (error) {
        console.error("Gallery fetch failed:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center space-x-2 bg-primary/20 text-primary-light px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-primary/30">
              <ImageIcon className="w-4 h-4" />
              <span>Visual Journey</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">Our Media Gallery</h1>
            <p className="text-xl text-slate-400 font-medium">Capturing moments of change, empowerment, and NGO excellence across India.</p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          {loading ? (
            <div className="h-96 flex flex-col items-center justify-center space-y-4">
               <Loader2 className="w-12 h-12 text-primary animate-spin" />
               <p className="text-slate-500 font-medium">Fetching Gallery Moments...</p>
            </div>
          ) : images.length > 0 ? (
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
              {images.map((image, idx) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="relative group cursor-pointer break-inside-avoid rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all"
                  onClick={() => setSelectedImage(image)}
                >
                  <img 
                    src={image.url} 
                    alt={image.name} 
                    className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="p-4 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/30">
                      <Maximize2 className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-bold text-sm truncate">{image.name}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-40">
               <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                  <ImageIcon className="w-10 h-10" />
               </div>
               <h3 className="text-2xl font-bold text-slate-900">Gallery is Empty</h3>
               <p className="text-slate-500 mt-2">Check back later for updates on our mission.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/95 flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-10 h-10" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl w-full h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.url} 
                className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl shadow-primary/20" 
                alt={selectedImage.name} 
              />
              <div className="mt-8 text-center space-y-2">
                <h2 className="text-2xl font-bold text-white">{selectedImage.name}</h2>
                <p className="text-slate-400 font-medium">Uploaded on {new Date(selectedImage.createdAt?.seconds * 1000).toLocaleDateString()}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
