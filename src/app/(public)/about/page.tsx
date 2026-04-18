import { Shield, Target, Heart, CheckCircle, Phone, Mail } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="bg-slate-50 py-20 border-b border-slate-100">
        <div className="container-custom">
          <div className="flex flex-col space-y-4">
            <nav className="flex text-sm text-slate-500 space-x-2">
              <Link href="/" className="hover:text-primary">Home</Link>
              <span>/</span>
              <span className="text-slate-900 font-medium">About Us</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-slate-900">Empowering India&apos;s Social Sector</h1>
            <p className="text-xl text-slate-600 max-w-2xl">
              NGO School was founded with a single mission: to provide world-class professional support to the heartbeat of our nation—the NGOs.
            </p>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section-padding bg-white">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="/images/ngo_team_meeting.png" 
                alt="Our Team" 
                className="w-full h-[280px] sm:h-[380px] md:h-[500px] object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-primary text-white p-5 sm:p-8 rounded-xl sm:rounded-2xl shadow-xl">
              <div className="text-2xl sm:text-4xl font-bold mb-1">10+</div>
              <div className="text-sm font-medium opacity-80">Years of Excellence</div>
            </div>
          </div>
          <div className="space-y-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">Trusted by 100+ NGOs Across India</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              We understand that running an NGO is about passion and mission, but managing it requires precision and compliance. Our team of experts takes the burden of paperwork and legal complexities off your shoulders.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Transparency", desc: "Clear pricing and honest advice.", icon: Shield },
                { title: "Mission-Driven", desc: "Your social goals are our priority.", icon: Target },
                { title: "Expert Support", desc: "Chartered Accountants & NGO Experts.", icon: CheckCircle },
                { title: "Social Impact", desc: "Helping you maximize every Rupee.", icon: Heart },
              ].map((item, i) => (
                <div key={i} className="flex flex-col space-y-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-800">{item.title}</h4>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Cards */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-slate-900">Why NGOs Trust Us</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">We provide specialized services designed specifically for the unique needs of the voluntary sector.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "NGO-Focused Experts", text: "Our entire team is dedicated solely to the social sector, ensuring specialized knowledge." },
              { title: "Transparent Process", text: "Real-time updates on your application status with no hidden fees or surprises." },
              { title: "Simple Explanations", text: "We translate complex legal jargon into simple, actionable steps for your board." },
              { title: "Dedicated Support", text: "You get a dedicated relationship manager who knows your organization's history." },
              { title: "Trusted by Many", text: "Join a network of over 100 successful NGOs that have scaled with our support." },
              { title: "Government Expertise", text: "Deep understanding of Niti Aayog, FCRA, and other government portals." },
            ].map((value, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-lg font-bold text-slate-900 mb-4">{value.title}</h4>
                <p className="text-slate-600">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="bg-primary rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 md:p-20 text-center relative overflow-hidden">
            <div className="relative z-10 space-y-8">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white">Let&apos;s Build a Stronger NGO Together</h2>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">

              </div>
              <div className="pt-4">
                <Link href="/contact" className="btn-secondary">
                  Contact Us Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
