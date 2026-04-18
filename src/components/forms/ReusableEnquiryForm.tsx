"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { addDocument } from "@/lib/firebase/services";
import { Send, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const enquirySchema = z.object({
  name: z.string().min(2, "Name required"),
  phone: z.string().min(10, "Invalid phone"),
  service: z.string().min(1, "Select a service"),
});

type EnquiryFormProps = {
  title?: string;
  subtitle?: string;
  light?: boolean;
};

export default function ReusableEnquiryForm({ 
  title = "Quick Enquiry", 
  subtitle = "Tell us what you need and we'll call you back.",
  light = false
}: EnquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(enquirySchema),
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await addDocument("enquiries", {
        ...data,
        email: "quick@enquiry.com", // Placeholder for quick form
        organizationName: "N/A",
        message: "Quick interest form submitted",
        interestedService: data.service,
        status: "new",
      });
      toast.success("We received your interest!");
      reset();
    } catch (error) {
      toast.error("Failed to send. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`p-8 rounded-[40px] ${light ? 'bg-white shadow-xl border border-slate-100' : 'bg-slate-900 text-white shadow-2xl'}`}>
      <div className="space-y-2 mb-8">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className={`text-sm ${light ? 'text-slate-500' : 'text-slate-400'}`}>{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <input
            {...register("name")}
            placeholder="Your Name"
            className={`w-full px-4 py-3 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
              light ? 'bg-slate-50 text-slate-900 border border-slate-100' : 'bg-white/10 text-white border border-white/10'
            }`}
          />
          {errors.name && <p className="text-red-500 text-[10px] ml-2">{(errors.name as any).message}</p>}
        </div>

        <div className="space-y-1">
          <input
            {...register("phone")}
            placeholder="Phone Number"
            className={`w-full px-4 py-3 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
              light ? 'bg-slate-50 text-slate-900 border border-slate-100' : 'bg-white/10 text-white border border-white/10'
            }`}
          />
          {errors.phone && <p className="text-red-500 text-[10px] ml-2">{(errors.phone as any).message}</p>}
        </div>

        <div className="space-y-1">
          <select
            {...register("service")}
            className={`w-full px-4 py-3 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none ${
              light ? 'bg-slate-50 text-slate-900 border border-slate-100' : 'bg-white/10 text-white border border-white/10'
            }`}
          >
            <option value="">Interested Service</option>
            <option value="NGO Registration">NGO Registration</option>
            <option value="80G & 12A">80G & 12A Filing</option>
            <option value="CSR Funding">CSR Funding</option>
            <option value="Other">Other Support</option>
          </select>
          {errors.service && <p className="text-red-500 text-[10px] ml-2">{(errors.service as any).message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary py-3 flex items-center justify-center space-x-2 text-sm mt-4 shadow-xl shadow-primary/20"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Send Interest</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
