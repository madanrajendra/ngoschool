"use client";

import { useEffect, useState } from "react";
import { 
  getCollection, 
  updateDocument, 
  deleteDocument 
} from "@/lib/firebase/services";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Phone, 
  Trash2, 
  CheckCircle2, 
  Clock,
  Loader2,
  MessageSquare
} from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadEnquiries();
  }, []);

  const loadEnquiries = async () => {
    try {
      const data = await getCollection("enquiries", "createdAt");
      setEnquiries(data);
    } catch (error) {
      toast.error("Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateDocument("enquiries", id, { status: newStatus });
      toast.success(`Marked as ${newStatus}`);
      loadEnquiries();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      await deleteDocument("enquiries", id);
      toast.success("Enquiry deleted");
      loadEnquiries();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const filteredEnquiries = enquiries.filter(req => 
    req.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.organizationName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* List Header */}
      <div className="bg-white p-8 rounded-[40px] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-100">
        <div className="flex-grow max-w-xl w-full relative group">
          <input 
            type="text" 
            placeholder="Search by name, email or NGO..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-12 focus:bg-white focus:ring-2 focus:ring-primary focus:outline-none transition-all"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 hover:bg-slate-100 transition-colors">
            <Filter className="w-5 h-5" />
            <span>Filter</span>
          </button>
          <button className="btn-primary">
            Export Records
          </button>
        </div>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center bg-white rounded-[40px]">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
      ) : (
        <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="p-8 font-bold text-slate-500 uppercase text-xs tracking-widest">Client / Org</th>
                  <th className="p-8 font-bold text-slate-500 uppercase text-xs tracking-widest">Service</th>
                  <th className="p-8 font-bold text-slate-500 uppercase text-xs tracking-widest">Date</th>
                  <th className="p-8 font-bold text-slate-500 uppercase text-xs tracking-widest">Status</th>
                  <th className="p-8 font-bold text-slate-500 uppercase text-xs tracking-widest text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEnquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="p-8">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-bold">
                          {enquiry.name?.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{enquiry.name}</div>
                          <div className="text-sm text-slate-500">{enquiry.organizationName}</div>
                          <div className="flex items-center space-x-3 mt-1 text-xs">
                             <span className="flex items-center text-slate-400">
                               <Mail className="w-3 h-3 mr-1" /> {enquiry.email}
                             </span>
                             <span className="flex items-center text-slate-400">
                               <Phone className="w-3 h-3 mr-1" /> {enquiry.phone}
                             </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-8">
                      <span className="px-4 py-1.5 bg-slate-100 text-slate-700 rounded-full text-xs font-bold uppercase">
                        {enquiry.interestedService}
                      </span>
                    </td>
                    <td className="p-8 text-sm text-slate-500">
                      {enquiry.createdAt?.toDate ? enquiry.createdAt.toDate().toLocaleDateString() : "Just now"}
                    </td>
                    <td className="p-8">
                       <select 
                         value={enquiry.status || 'new'} 
                         onChange={(e) => handleStatusChange(enquiry.id, e.target.value)}
                         className={cn(
                           "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border-none cursor-pointer",
                           enquiry.status === 'closed' ? 'bg-green-100 text-green-700' : 
                           enquiry.status === 'contacted' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                         )}
                       >
                         <option value="new">New</option>
                         <option value="contacted">Contacted</option>
                         <option value="closed">Closed</option>
                       </select>
                    </td>
                    <td className="p-8">
                      <div className="flex items-center justify-center space-x-2">
                         <button 
                           onClick={() => handleDelete(enquiry.id)}
                           className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                         >
                           <Trash2 className="w-5 h-5" />
                         </button>
                         <button className="p-3 bg-slate-50 text-slate-500 rounded-xl hover:bg-primary hover:text-white transition-all">
                           <MoreVertical className="w-5 h-5" />
                         </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredEnquiries.length === 0 && (
            <div className="p-20 text-center space-y-4">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                <MessageSquare className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">No enquiries found</h4>
              <p className="text-slate-500">When users contact you, their enquiries will appear here.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
