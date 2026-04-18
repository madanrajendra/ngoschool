"use client";

import { useState } from "react";
import { Save, Globe, Phone, Mail, MapPin, Share2, Smartphone } from "lucide-react";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Settings updated successfully!");
    }, 1000);
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Site Settings</h1>
          <p className="text-slate-500 mt-1">Manage global website configuration and contact details.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={loading}
          className="btn-primary flex items-center space-x-3 px-8"
        >
          {loading ? 'Saving...' : (
            <>
              <Save className="w-5 h-5" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* General Settings */}
        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 space-y-8">
           <div className="flex items-center space-x-4 pb-6 border-b border-slate-50">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                 <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">General Info</h3>
           </div>
           <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Website Name</label>
                <input type="text" defaultValue="NGO School" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Site Tagline</label>
                <input type="text" defaultValue="India's Trusted NGO Support Partner" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Footer Text</label>
                <textarea rows={3} defaultValue="Helping social organizations manage registrations, compliance, and government schemes with ease." className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none" />
              </div>
           </div>
        </div>

        {/* Contact Settings */}
        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 space-y-8">
           <div className="flex items-center space-x-4 pb-6 border-b border-slate-50">
              <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center">
                 <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Contact Details</h3>
           </div>
           <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Phone Number</label>
                <div className="relative group">
                   <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-secondary transition-colors" />
                   <input type="text" defaultValue="" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-12 py-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Email Address</label>
                <div className="relative group">
                   <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-secondary transition-colors" />
                   <input type="email" defaultValue="" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-12 py-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Office Location</label>
                <div className="relative group">
                   <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-secondary transition-colors" />
                   <input type="text" defaultValue="Dwarka Mor, Delhi" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-12 py-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary transition-all" />
                </div>
              </div>
           </div>
        </div>

        {/* Social Links */}
        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 space-y-8 md:col-span-2">
           <div className="flex items-center space-x-4 pb-6 border-b border-slate-50">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center">
                 <Share2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Social Presence</h3>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Facebook URL</label>
                <input type="text" placeholder="https://facebook.com/..." className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">LinkedIn URL</label>
                <input type="text" placeholder="https://linkedin.com/company/..." className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Twitter URL</label>
                <input type="text" placeholder="https://twitter.com/..." className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Instagram URL</label>
                <input type="text" placeholder="https://instagram.com/..." className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
