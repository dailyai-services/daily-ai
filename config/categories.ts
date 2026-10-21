import { CategoryInfo } from "@/types/request";

export const CATEGORIES: CategoryInfo[] = [
  {
    id: "Digital & Technology",
    name: "Digital & Technology",
    description: "Websites, mobile apps, custom AI solutions, automation, and software.",
    iconName: "Code",
    popularExamples: [
      "I need a professional website for my business",
      "Build a simple mobile app MVP",
      "Automate invoice processing with AI"
    ]
  },
  {
    id: "Creative",
    name: "Creative & Design",
    description: "Video editing, Instagram reels, graphic design, logos, and photography.",
    iconName: "Sparkles",
    popularExamples: [
      "I need a 30-second Instagram reel edited",
      "Design a minimalist logo for my brand",
      "Create a professional pitch deck presentation"
    ]
  },
  {
    id: "Business",
    name: "Business & Growth",
    description: "Documents, data processing, market research, reports, and marketing.",
    iconName: "Briefcase",
    popularExamples: [
      "Perform competitor research for SaaS pricing",
      "Generate qualified leads for our B2B service",
      "Format and review financial summary reports"
    ]
  },
  {
    id: "Education",
    name: "Education & Learning",
    description: "Personalized tutoring, notes, summaries, study material, and courses.",
    iconName: "GraduationCap",
    popularExamples: [
      "Teach me quantum physics like a beginner",
      "Summarize this 100-page research paper",
      "Create a structured 4-week study plan for Python"
    ]
  },
  {
    id: "Local Services",
    name: "Local Services",
    description: "Real estate, professional photography, repairs, events, and local providers.",
    iconName: "MapPin",
    popularExamples: [
      "Find me a 2BHK apartment near Whitefield under ₹80L",
      "I need an event photographer this Saturday",
      "Find trusted AC repair technicians nearby"
    ]
  },
  {
    id: "Procurement",
    name: "Procurement & Sourcing",
    description: "Bulk products, wholesale suppliers, price comparison, and manufacturing.",
    iconName: "Package",
    popularExamples: [
      "I need 500 units of custom cotton t-shirts at best price",
      "Find certified packaging manufacturers in India",
      "Compare quotes for office ergonomic chairs"
    ]
  }
];

export const ROTATING_PLACEHOLDERS = [
  "I need a website for my new business...",
  "Find me a 2BHK near Whitefield under ₹80 lakh...",
  "I need 500 units of custom packaging...",
  "Teach me quantum physics like I'm a beginner...",
  "I need a 30-second Instagram reel edited...",
  "Find an event photographer for this Saturday...",
  "I need an AI chatbot for customer support...",
  "Convert this document into a structured summary..."
];
