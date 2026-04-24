import { Briefcase, Shield, FileText, Users, Target, ArrowRight } from "lucide-react";

export const CORE_SERVICES = [
  { 
    id: "trust-registration",
    slug: "trust-registration",
    title: "TRUST REGISTRATION",
    shortDescription: "Start your NGO legally with our professional Trust Registration service in India. We help you register a public charitable trust under the Indian Trusts framework with complete legal support.",
    fullDescription: "Launch your non-profit journey the right way with end-to-end trust registration support. From trust deed drafting to documentation, PAN, bank account setup, and 12A/80G readiness, we handle each compliance step so your NGO starts on a legally strong foundation.",
    icon: "Briefcase",
    image: "/images/trust-registration.png",
    benefits: [
      "Trust deed drafting and legal review",
      "Name approval and documentation support",
      "Registrar filing and process coordination",
      "PAN and bank account assistance",
      "12A and 80G registration readiness guidance"
    ],
    faqs: [
      { q: "How many trustees are required?", a: "The requirement can vary by state, but generally at least two to three trustees are needed." },
      { q: "How long does trust registration take?", a: "It usually takes around 10 to 20 working days, depending on state processes and document readiness." }
    ]
  },
  { 
    id: "ngo-website-development",
    slug: "ngo-website-development",
    title: "NGO Website Development",
    shortDescription: "Build a professional NGO website to showcase your mission, projects, and impact with donation-ready and mobile-friendly design.",
    fullDescription: "We create modern, secure, and conversion-focused websites for NGOs. From storytelling pages and live projects to enquiry forms and SEO setup, our team delivers a complete digital presence that helps build donor trust and improve outreach.",
    icon: "FileText",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1200&auto=format&fit=crop",
    benefits: [
      "Custom NGO-focused website design",
      "Mobile responsive and fast-loading pages",
      "Donation/enquiry form integration",
      "SEO-friendly structure and content support",
      "Admin-friendly content update setup"
    ],
    faqs: [
      { q: "Can you include donation and enquiry forms?", a: "Yes, we can integrate donation and enquiry workflows based on your requirements." },
      { q: "Will the website work on mobile?", a: "Yes, all websites are fully responsive across mobile, tablet, and desktop devices." }
    ]
  },
  {
    id: "ngo-registration",
    slug: "ngo-registration",
    title: "NGO Registration Services", 
    shortDescription: "NGO School is your trusted partner in establishing a non-profit organization in India (Trust, Society, Section 8).", 
    fullDescription: "We provide comprehensive registration services for all types of non-profit organizations in India. Whether you want to start a Trust, a Society, or a Section 8 Company, our experts guide you through the entire legal process, ensuring compliance with state and central regulations.",
    icon: "Briefcase",
    image: "/images/registration.png",
    benefits: [
      "Expert legal documentation by CA/CS professionals",
      "End-to-end guidance on choosing the right structure",
      "PAN & TAN application included",
      "Support for Niti Aayog (Darpan) portal registration",
      "Transparent fee structure with no hidden costs"
    ],
    faqs: [
      { q: "How long does it take?", a: "Trust registration takes 10-15 days, while Section 8 Company takes 20-30 days." },
      { q: "What documents are required?", a: "ID proof, Address proof, Rent agreement/property documents for office, and photos of members." }
    ]
  },
  { 
    id: "statutory-registrations",
    slug: "statutory-registrations",
    title: "Statutory Registrations", 
    shortDescription: "Expert assistance in all government and statutory registrations including DARPAN, FCRA, and more.", 
    fullDescription: "Stay legal and eligible for funding with our statutory registration services. We handle everything from NITI Aayog DARPAN registration to FCRA compliance, ensuring your NGO meets all government mandates.",
    icon: "Shield",
    image: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?q=80&w=800&auto=format&fit=crop",
    benefits: [
        "NITI Aayog DARPAN Registration",
        "FCRA New Registration & Renewal",
        "Professional Tax Registration",
        "Shop & Establishment License",
        "MSME/Udyam Registration for NGOs"
    ],
    faqs: [
        { q: "What is DARPAN registration?", a: "It's a mandatory registration for NGOs to apply for government grants and schemes." },
        { q: "Who needs FCRA?", a: "Any NGO that wants to receive foreign contributions must have an FCRA registration." }
    ]
  },
  { 
    id: "income-tax-compliance",
    slug: "income-tax-compliance",
    title: "Income Tax & Compliance", 
    shortDescription: "Stay compliant with income tax regulations. We handle 80G, 12A, and annual filing with precision.", 
    fullDescription: "Exempt your income and provide tax benefits to your donors with 12A and 80G registrations. Our team ensures your annual filings and audits are completed on time to maintain your tax-exempt status.",
    icon: "FileText",
    image: "/images/tax_compliance.png",
    benefits: [
        "12A Registration for Tax Exemption",
        "80G Registration for Donor Tax Benefits",
        "CSR-1 Registration for Funding Eligibility",
        "Annual Income Tax Filing (ITR-7)",
        "Audit Support through Empanelled CAs"
    ],
    faqs: [
        { q: "Is 80G registration lifetime?", a: "No, both 12A and 80G now requires periodic renewal under the new IT rules." },
        { q: "Can we apply for 80G immediately?", a: "Yes, you can apply for provisional 80G immediately after registration." }
    ]
  },
  { 
    id: "ngo-advisory-support",
    slug: "ngo-advisory-support",
    title: "NGO Advisory & Support", 
    shortDescription: "Expert guidance through documentation, activity planning, and strategic NGO consulting for long-term impact.", 
    fullDescription: "Move beyond just paperwork. Our advisory services help you structure your social programs, manage your team, and build a sustainable impact model for your non-profit organization.",
    icon: "Users",
    image: "/images/ngo_team_meeting.png",
    benefits: [
        "Project Proposal Writing",
        "Impact Assessment Studies",
        "Staff Training & HR Policy Support",
        "Documentation & Activity Reporting",
        "Internal Control & Governance Systems"
    ],
    faqs: [
        { q: "Do you help with fundraising?", a: "We provide strategy and documentation support for fundraising, including project proposals." }
    ]
  },
  { 
    id: "government-schemes",
    slug: "government-schemes",
    title: "Government Schemes", 
    shortDescription: "End-to-end support for NGOs looking to leverage government schemes and funding opportunities across India.", 
    fullDescription: "Access government resources effectively. We identify relevant central and state schemes for your NGO and assist with the application, documentation, and follow-up process.",
    icon: "Target",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop",
    benefits: [
        "Scheme Identification & Eligibility Check",
        "Online Application Support",
        "Documentation & Project Report (DPR)",
        "Presentation & Defense Preparation",
        "Grant Utilization Audits"
    ],
    faqs: [
        { q: "Which schemes are most popular?", a: "Skill India (PMKVY), National Health Mission, and Minority Welfare schemes are highly active." }
    ]
  },
  { 
    id: "sse-registration-listing",
    slug: "sse-registration-listing",
    title: "SSE Registration & Listing", 
    shortDescription: "Unlock real funding opportunities through Social Stock Exchange (SSE) listing. We guide you through the SEBI process.", 
    fullDescription: "Position your NGO on India's Social Stock Exchange. We help you navigate the registration process on NSE/BSE SSE platforms, ensuring you meet the transparency and social impact reporting standards.",
    icon: "ArrowRight",
    image: "/images/sse_listing.png",
    benefits: [
        "SSE Eligibility Assessment",
        "Zero Coupon Zero Principal (ZCZP) Issuance",
        "Social Audit Coordination",
        "Annual Impact Disclosure Support",
        "Listing Maintenance & Compliance"
    ],
    faqs: [
        { q: "What is ZCZP?", a: "It is an instrument used by NGOs to raise funds on the Social Stock Exchange without repayment of interest or principal." }
    ]
  }
];
