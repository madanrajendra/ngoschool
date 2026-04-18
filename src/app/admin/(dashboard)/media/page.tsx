"use client";

import { useState, useEffect } from "react";
import { Upload, ImageIcon, Copy, Trash2, Search, Loader2 } from "lucide-react";
import { storage, db } from "@/lib/firebase/config";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { collection, addDoc, getDocs, query, orderBy, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast";

export default function MediaPage() {
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, "media"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMediaItems(items);
    } catch (error) {
      console.error("Error fetching media:", error);
      toast.error("Failed to load media items");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image too large. Max 5MB allowed.");
      return;
    }

    setUploading(true);
    const fileName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
    const storageRef = ref(storage, `media/${fileName}`);

    try {
      console.log("Starting upload for:", fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload progress: " + progress + "%");
        },
        (error) => {
          console.error("Firebase Storage Error:", error);
          toast.error(`Upload failed: ${error.message}`);
          setUploading(false);
        },
        async () => {
          console.log("Upload bit finished, getting URL...");
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("Download URL obtained:", downloadURL);
          
          await addDoc(collection(db, "media"), {
            name: file.name,
            url: downloadURL,
            path: storageRef.fullPath,
            size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
            createdAt: serverTimestamp(),
          });
          console.log("Firestore document created.");

          toast.success("Image uploaded successfully!");
          setUploading(false);
          fetchMedia();
        }
      );
    } catch (error: any) {
      console.error("General Upload catch:", error);
      toast.error(`Processing failed: ${error.message}`);
      setUploading(false);
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied to clipboard!");
  };

  const handleDelete = async (item: any) => {
    if (!confirm("Are you sure you want to delete this image permanently?")) return;

    try {
      // Delete from Storage
      const storageRef = ref(storage, item.path);
      await deleteObject(storageRef);

      // Delete from Firestore
      await deleteDoc(doc(db, "media", item.id));

      toast.success("Image deleted successfully");
      fetchMedia();
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete image");
    }
  };

  const filteredMedia = mediaItems.filter(item => 
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 text-slate-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Media Library</h1>
          <p className="text-slate-500 mt-1">Upload and manage images for your website content.</p>
        </div>
        <div className="flex items-center space-x-4">
           <label className="btn-primary flex items-center space-x-2 cursor-pointer disabled:opacity-50">
              {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
              <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
              <input 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={handleUpload}
                disabled={uploading}
              />
           </label>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 flex items-center gap-4">
        <div className="relative flex-grow group">
          <input 
            type="text" 
            placeholder="Search media..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-12 focus:bg-white focus:ring-2 focus:ring-primary focus:outline-none transition-all"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
        </div>
      </div>

      {loading ? (
        <div className="h-64 flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="text-slate-500 font-medium">Loading Media...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredMedia.map((item) => (
            <div key={item.id} className="bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-sm group hover:shadow-xl transition-all">
              <div className="aspect-square relative flex items-center justify-center bg-slate-50">
                <img src={item.url} className="w-full h-full object-cover" alt={item.name} />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                   <button 
                     onClick={() => handleCopyUrl(item.url)}
                     className="p-3 bg-white text-slate-900 rounded-xl hover:bg-primary hover:text-white transition-all shadow-lg"
                     title="Copy URL"
                   >
                     <Copy className="w-4 h-4" />
                   </button>
                   <button 
                     onClick={() => handleDelete(item)}
                     className="p-3 bg-white text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg"
                     title="Delete"
                   >
                     <Trash2 className="w-4 h-4" />
                   </button>
                </div>
              </div>
              <div className="p-4 bg-white border-t border-slate-50">
                 <p className="text-xs font-bold text-slate-800 truncate" title={item.name}>{item.name}</p>
                 <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-widest">{item.size}</p>
              </div>
            </div>
          ))}
          
          <label className="aspect-square rounded-[24px] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors cursor-pointer group">
            <input 
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={handleUpload}
              disabled={uploading}
            />
            <ImageIcon className="w-8 h-8 mb-2 group-hover:text-primary transition-colors" />
            <span className="text-xs font-bold">Add Media</span>
          </label>
        </div>
      )}

      {!loading && filteredMedia.length === 0 && (
         <div className="p-20 text-center bg-white rounded-[40px] border border-slate-100 italic text-slate-400">
            No media items found. Upload your first image!
         </div>
      )}
    </div>
  );
}

