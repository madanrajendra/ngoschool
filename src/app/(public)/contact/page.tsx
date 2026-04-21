"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { addDocument } from "@/lib/firebase/services";
import toast from "react-hot-toast";

const contactSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
  organizationName: z.string().min(2, "Organization name is required"),
  interestedService: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      await addDocument("enquiries", {
        ...data,
        status: "new",
      });
      toast.success("Enquiry submitted successfully! We will contact you soon.");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-slate-50 py-14 sm:py-20 border-b border-slate-100">
        <div className="container-custom">
          <div className="text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-slate-900">Get in Touch</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Have questions about NGO registration or compliance? Our team is here to help you every step of the way.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">Contact Information</h2>
              <p className="text-slate-600 text-lg">
                Reach out to us through any of these channels or fill out the form, and our representative will get back to you within 24 hours.
              </p>
            </div>



            <div className="space-y-6">
              <div className="p-8 bg-slate-900 text-white rounded-[40px] flex items-start space-x-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-primary/40 transition-colors" />
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-bold">Head Office</h4>
                  <p className="text-slate-300 leading-relaxed">
                    B1/3, matiala road, nanahe park,<br />
                    Delhi 110059
                  </p>
                </div>
              </div>

              <div className="p-8 bg-slate-900 text-white rounded-[40px] flex items-start space-x-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-primary/40 transition-colors" />
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-bold">Email Us</h4>
                  <p className="text-slate-300 leading-relaxed">
                    <a href="mailto:Help@ngoschool.com" className="hover:text-primary transition-colors">
                      Help@ngoschool.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 md:p-12 shadow-2xl border border-slate-100">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Full Name</label>
                  <input
                    {...register("name")}
                    placeholder="Enter your name"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                  />
                  {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Email Address</label>
                  <input
                    {...register("email")}
                    placeholder="info@yourorg.com"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                  />
                  {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Phone Number</label>
                  <input
                    {...register("phone")}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                  />
                  {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Organization Name</label>
                  <input
                    {...register("organizationName")}
                    placeholder="Enter your NGO name"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                  />
                  {errors.organizationName && <p className="text-red-500 text-xs">{errors.organizationName.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Service Interested In</label>
                <select
                  {...register("interestedService")}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-primary focus:outline-none transition-all appearance-none"
                >
                  <option value="">Select a service</option>
                  <option value="ngo-reg">NGO Registration</option>
                  <option value="80g-12a">80G & 12A Filing</option>
                  <option value="csr">CSR Funding</option>
                  <option value="compliance">Annual Compliance</option>
                  <option value="other">Other Inquiry</option>
                </select>
                {errors.interestedService && <p className="text-red-500 text-xs">{errors.interestedService.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Message</label>
                <textarea
                  {...register("message")}
                  rows={4}
                  placeholder="How can we help you?"
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-primary focus:outline-none transition-all resize-none"
                />
                {errors.message && <p className="text-red-500 text-xs">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-4 flex items-center justify-center space-x-3 text-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Sending Enquiry...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-6 h-6" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
