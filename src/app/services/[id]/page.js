"use client";

import React, { useState, useEffect, useRef, use } from "react";
import Link from "next/link";

// Crisp Logo Component
function Logo({ className = "", light = false }) {
  return (
    <img
      src="/logo.png"
      alt="Ananya Hi Solutions"
      className={`nav-logo-img ${className}`}
      style={{
        height: "42px",
        width: "auto",
        objectFit: "contain",
        display: "block"
      }}
    />
  );
}

// Detailed Data mapping for all services, subtypes, packages, and premium visual components
const SERVICES_DETAIL_DATA = {
  "web-design": {
    title: "Website Design",
    subtitle: "Premium User Interfaces & Responsive Digital Architectures",
    description: "Crafting beautiful, blazing-fast, and responsive web portals that match your brand identity and convert random visitors into premium customers.",
    gradient: "linear-gradient(135deg, #052e47 0%, #0d619c 100%)",
    types: [
      {
        id: "static",
        title: "Static Website Design",
        desc: "Ultra-fast loading, secure, and cost-effective websites ideal for startups, portfolios, and marketing landing pages.",
        features: ["100% Secure & Static HTML5", "Responsive Mobile-First UI", "Pristine SEO Architecture", "Premium Custom Icons", "Fast Delivery in 5 Days"],
        badge: "Fastest Load Speed",
        icon: "⚡"
      },
      {
        id: "dynamic",
        title: "Dynamic Website Design",
        desc: "Database-driven corporate websites, news portals, and real estate systems equipped with intuitive admin panels.",
        features: ["Dynamic Admin CMS Panel", "Interactive Search & Filters", "Automatic Blog/News Feeds", "Third-Party API Integrations", "Secure Database System"],
        badge: "Highly Scalable",
        icon: "🚀"
      },
      {
        id: "ecommerce",
        title: "E-Commerce Website Design",
        desc: "Fully functional online shopping architectures designed to drive sales, manage stock, and receive secure payments.",
        features: ["Shopping Cart & Wishlist", "Multi-Gateway Payments", "Robust Order Management", "Coupon & Discount Engine", "Advanced Sales Analytics"],
        badge: "Sales Focused",
        icon: "🛒"
      }
    ],
    packages: [
      { name: "Starter Web", price: "₹14,999", duration: "One-time", desc: "Best for new startups or personal landing pages.", features: ["3 High-End Landing Pages", "100% Responsive Design", "Basic SEO Optimization", "Contact Form Integration", "1 Year Domain & Hosting Support"] },
      { name: "Corporate Pro", price: "₹34,999", duration: "One-time", desc: "For established brands requiring custom features.", features: ["Up to 10 Dynamic Pages", "Custom Admin Dashboard", "Blog & Newsletter Integration", "Advanced SEO & Speed Auditing", "Live Chat Support Setup"] },
      { name: "Enterprise E-Com", price: "₹64,999", duration: "One-time", desc: "High-volume online retail store setups.", features: ["Unlimited Products Support", "Secure Payment Gateway", "Inventory & Order Tracking", "Discount & Coupon Engine", "Priority 24/7 Tech Maintenance"] }
    ]
  },
  "digital-marketing": {
    title: "Digital Marketing",
    subtitle: "Data-Driven ROI & Global Brand Authority",
    description: "Multiply your leads, brand awareness, and revenue streams with search optimization, social campaigns, and interactive copywriting.",
    gradient: "linear-gradient(135deg, #0f75bc 0%, #f58220 100%)",
    types: [
      {
        id: "seo",
        title: "Search Engine Optimization (SEO)",
        desc: "Rank on Page 1 of Google organically using advanced keyword research, on-page optimization, and premium link acquisition strategies.",
        features: ["In-Depth Competitor Analysis", "Technical Core Web Vital Audits", "On-Page Metadata Rewriting", "High-Quality Backlink Building", "Hyderabad Local SEO Focus"],
        badge: "Long-Term Organic ROI",
        icon: "🔍"
      },
      {
        id: "smm",
        title: "Social Media Marketing (SMM)",
        desc: "Create engaging brand experiences across Instagram, LinkedIn, and Facebook to foster massive customer loyalty.",
        features: ["Social Content Calendars", "Premium Graphic Creative Assets", "Active Reels & Shorts Production", "Audience Engagement Moderation", "Influencer Collaboration Strategies"],
        badge: "Brand Engagement",
        icon: "📱"
      },
      {
        id: "google-ads",
        title: "Google Ads (PPC)",
        desc: "Intercept immediate, high-intent buyers looking directly for your services with ROI-focused search and display campaigns.",
        features: ["High-Intent Keyword Mapping", "A/B Testing Ad Copies", "Conversion Funnel Setups", "Negative Keyword Filtering", "Monthly Return-on-Ad-Spend Audits"],
        badge: "Immediate Lead Generation",
        icon: "📈"
      },
      {
        id: "content-marketing",
        title: "Content Marketing",
        desc: "Build absolute industry authority and nurture client trust with deep educational blogs and dynamic infographics.",
        features: ["Search-Optimized Copywriting", "Viral Infographic Graphics", "Premium Ebooks & Whitepapers", "Newsletter Campaign Writing", "Brand Narrative Architecture"],
        badge: "Thought Leadership",
        icon: "✍️"
      },
      {
        id: "email-marketing",
        title: "Email Marketing",
        desc: "Automate high-converting email newsletters and nurture leads through personalized CRM drip campaigns.",
        features: ["Automated Funnel Workflows", "Stunning Responsive Layouts", "A/B Subject Line Analysis", "Advanced List Segmentation", "High Open & Click Audits"],
        badge: "Retention Maximizer",
        icon: "✉️"
      }
    ],
    packages: [
      { name: "Local Growth", price: "₹19,999", duration: "Month", desc: "Perfect for local businesses wanting organic map presence.", features: ["Hyderabad Local SEO", "5 Keywords Top Rankings", "2 Social Media Posts / Week", "Google Business Setup", "Monthly Lead Report"] },
      { name: "Brand Catalyst", price: "₹39,999", duration: "Month", desc: "Comprehensive campaign spanning search and social platforms.", features: ["15 Keywords SEO Campaign", "Complete Social Media Management", "Google & Meta Ads Strategy", "2 High-Quality Blogs / Month", "Dedicated Account Manager"] },
      { name: "Market Leader", price: "₹74,999", duration: "Month", desc: "Dominate search, paid acquisitions, and content channels.", features: ["30 Keywords SEO Dominance", "Full Content & Email Funnels", "Unlimited Paid Ad Account Management", "Weekly Competitor Intelligence", "Custom Video Graphics Support"] }
    ]
  },
  "mobile-app": {
    title: "Mobile Application",
    subtitle: "Fluid Performance & Elite Native App Engineering",
    description: "Engineering stunning, feature-rich iOS and Android mobile solutions tailored to match client requirements and retain users.",
    gradient: "linear-gradient(135deg, #052e47 0%, #2f80ed 100%)",
    types: [
      {
        id: "ios",
        title: "iOS Application Development",
        desc: "Custom Apple app ecosystem engineering using native Swift for smooth UI navigation and secure device utility.",
        features: ["Swift & SwiftUI Engineering", "Apple Design Guideline Alignment", "Store Kit Purchase Subscriptions", "CoreData Local Storage", "Biometric FaceID Security"],
        badge: "Elite Apple Performance",
        icon: "🍏"
      },
      {
        id: "android",
        title: "Android App Development",
        desc: "Responsive Kotlin-based application setups designed to run fluidly on thousands of Android phone variants.",
        features: ["Kotlin Native Codebases", "Jetpack Compose Modern UI", "Firebase Realtime Integration", "Google Play Store Submission", "Offline-First Offline Syncs"],
        badge: "Massive Global Reach",
        icon: "🤖"
      }
    ],
    packages: [
      { name: "Single App Basic", price: "₹99,999", duration: "One-time", desc: "Simple utility or business profile app.", features: ["Kotlin or Swift Native Code", "Up to 6 UI Screen Layouts", "Firebase Authentication", "Push Notifications Panel", "3 Months Post-Launch Support"] },
      { name: "Cross-Platform Pro", price: "₹1,89,999", duration: "One-time", desc: "Single React Native/Flutter build for both iOS and Android.", features: ["Shared Fluid Codebase", "Up to 15 UI Screen Designs", "Payment Gateway Integration", "Custom API Backend Linkage", "6 Months Priority Maintenance"] },
      { name: "Enterprise Custom", price: "₹3,49,999", duration: "One-time", desc: "High-security app with advanced synchronization and admin.", features: ["Native iOS + Android Frameworks", "Unlimited UI Screens", "Offline Sync & CoreData", "Realtime WebSockets Chat", "1 Year SLA Support Contract"] }
    ]
  },
  "ecommerce-app": {
    title: "eCommerce Application",
    subtitle: "Scalable Storefronts & Blazing-Fast Checkout Pipelines",
    description: "Launch multi-vendor marketplaces or brand online boutiques with automated stock alerts, secure checkouts, and custom delivery logs.",
    gradient: "linear-gradient(135deg, #0a4c7b 0%, #f58220 100%)",
    types: [
      {
        id: "single-vendor",
        title: "Single Vendor Store",
        desc: "Launch your brand's digital flagship boutique with personalized design schemes, advanced filter search, and simple order tracking.",
        features: ["Exclusive Custom Brand UI", "Automated Inventory Tracking", "Integrated WhatsApp Checkout", "Customer Reward Point System", "Blazing-Fast Loading Rates"],
        badge: "High Conversion",
        icon: "🛍️"
      },
      {
        id: "multi-vendor",
        title: "Multi-Vendor Marketplace",
        desc: "An Amazon-like digital marketplace where sellers register, create stores, manage inventory, and share split commissions automatically.",
        features: ["Vendor Management Portals", "Automated Split Payout Rules", "Individual Storefront Pages", "Admin Fee Commissions Settings", "Robust Multi-Cart Checkouts"],
        badge: "Highly Disruptive",
        icon: "🏢"
      }
    ],
    packages: [
      { name: "Growth Boutique", price: "₹49,999", duration: "One-time", desc: "Perfect for single brands scaling up online sales.", features: ["Custom Next.js Storefront", "Up to 500 Dynamic Products", "Razorpay / Stripe Integration", "Stock & Tax Auto-Calculation", "Admin Shipping Label Tool"] },
      { name: "Marketplace Master", price: "₹1,49,999", duration: "One-time", desc: "Multi-seller platform equipped with full vendor cycles.", features: ["Multi-Vendor Onboarding Module", "Seller Commissions Dashboard", "Split Stripe Connect Payments", "Vendor SLA Shipping Matrix", "Unified Customer Chat Panel"] },
      { name: "Enterprise Hyperlocal", price: "₹2,79,999", duration: "One-time", desc: "High-scale delivery store with advanced mapping.", features: ["Live Driver Tracking Map", "Geo-Targeted Store Allocations", "Advanced Redis Caching APIs", "ERP & Warehousing Syncs", "24/7 Server Escalation Support"] }
    ]
  },
  "video-production": {
    title: "Video Production",
    subtitle: "Cinematic Visual Storytelling & Viral Commercial Spots",
    description: "Create cinematic company promotions, product explainers, and engaging social loops that instantly capture viewer attention.",
    gradient: "linear-gradient(135deg, #1b2838 0%, #0d619c 100%)",
    types: [
      {
        id: "corporate",
        title: "Corporate Video Production",
        desc: "Cinematic and polished profiles, executive interviews, and workplace documentaries designed to establish corporate values.",
        features: ["Multi-Camera 4K Cinematic Filming", "Professional Scriptwriting Guides", "Premium Voiceover Artists", "Branded Animated Logo Overlays", "Full Color Grading & Mastery"],
        badge: "B2B Trust Builder",
        icon: "🎥"
      },
      {
        id: "promo",
        title: "Promotional Marketing Videos",
        desc: "Attention-grabbing ad creatives engineered specifically to convert online viewers into active buyers.",
        features: ["Hook-Oriented Visual Scripting", "Vibrant Dynamic Editing Schemes", "Licensed Background Track Mastery", "Premium Product Action Filming", "Subtitle Typography Optimization"],
        badge: "High Conversion",
        icon: "🔥"
      },
      {
        id: "event",
        title: "Event Coverage & Highlights",
        desc: "Vibrant, high-energy cinematic review packages for corporate meetups, product launches, and conferences.",
        features: ["Gimbal & Drone Aerial Footage", "Dynamic Rapid Cut Soundtracks", "Sponsor Showcase Highlights", "Same-Day Teaser Editing", "High-Fidelity Audio Feeds"],
        badge: "Brand Momentum",
        icon: "🎉"
      },
      {
        id: "explainer",
        title: "Product Explainer Videos",
        desc: "Clean 3D/2D animation sequences outlining how complex software or machinery functions in under 60 seconds.",
        features: ["Custom Narrative Scripting", "3D Animation Render Blocks", "UI Walkthrough Screencasts", "Dynamic Interactive Icons", "Localized Language Subtitles"],
        badge: "Clarify Utility",
        icon: "💡"
      },
      {
        id: "social-content",
        title: "Social Media Vertical Loops",
        desc: "Short vertical content (Reels/TikToks) designed for viral distribution on Instagram, YouTube Shorts, and Facebook.",
        features: ["Rapid Editing Hook Layouts", "Trending Dynamic Sound Design", "Visual Graphic Text Prompts", "Batch Production Shoot Plans", "Platform Algorithm Tuning"],
        badge: "Viral Reach",
        icon: "📱"
      },
      {
        id: "music-video",
        title: "Music Video Production",
        desc: "Creative narrative screenplays and synchronized performance cuts tailored specifically for musical artists.",
        features: ["Creative Conceptual Direction", "Advanced Visual Effects (VFX)", "Set Lighting Design Architecture", "Synchronized Audio Edits", "Cinema Camera Lens Packages"],
        badge: "Artistic Excellence",
        icon: "🎵"
      },
      {
        id: "short-films",
        title: "Short Films & Web Series",
        desc: "Full cinematic screenplay execution from storyboard mapping to casting, final sound editing, and coloring.",
        features: ["Complete Script Doctoring", "Vast Cast Audition Support", "Multi-Location Shooting Logs", "Dynamic Foley Sound FX", "Color-Matched Grading Suite"],
        badge: "Cinematic Scope",
        icon: "🎬"
      }
    ],
    packages: [
      { name: "Social Content Bundle", price: "₹24,999", duration: "One-time", desc: "Batch of high-end vertical reels.", features: ["5 vertical videos (Reels/Shorts)", "Custom Hook Copywriting", "Vibrant Subtitle Layouts", "Background Audio Sourcing", "Fast 7-Day Turnaround"] },
      { name: "Brand Cinematic", price: "₹59,999", duration: "One-time", desc: "Elite profile video for website and pitches.", features: ["2-Minute 4K Cinematic Video", "Professional Script Sourcing", "Professional Voiceover Artist", "Licensed Music Sourcing", "Color Grading & Sound Foley"] },
      { name: "Premium Explainer", price: "₹89,999", duration: "One-time", desc: "High-fidelity custom explainer animations.", features: ["90-Second 3D/2D Animated Video", "Custom Visual Storyboarding", "Professional Native Voiceover", "Dynamic Custom Sound SFX", "Multi-Language Output Options"] }
    ]
  },
  "software-development": {
    title: "Software Development",
    subtitle: "Enterprise-Grade Architectures & Automated Pipelines",
    description: "Scale your corporate operations with custom Billing engines, CRMs, College ERPs, and secure Learning Management Systems.",
    gradient: "linear-gradient(135deg, #052e47 0%, #0d619c 100%)",
    types: [
      {
        id: "crm",
        title: "CRM Software Development",
        desc: "Tailored customer pipelines that enable sales reps to track leads, manage notes, and automate emails.",
        features: ["Custom Lead Pipeline Statuses", "Automated WhatsApp API Syncuries", "Detailed Team Activity Logs", "Advanced Lead Scoring Analytics", "API Integrations for Ad Accounts"],
        badge: "Sales Performance",
        icon: "👥"
      },
      {
        id: "billing",
        title: "Billing & POS Software Development",
        desc: "Lightning-fast billing portals with inventory tracking, digital invoicing, GST logs, and secure receipts.",
        features: ["GST-Compliant Invoicing", "Barcode Reader Integrations", "Realtime Inventory Alerts", "Offline-First Billing Logs", "Daily PDF Sales Reports"],
        badge: "Operations Center",
        icon: "💳"
      },
      {
        id: "college",
        title: "College & School ERP",
        desc: "Comprehensive database system connecting student cycles, assignments, gradebooks, and staff rosters.",
        features: ["Student & Staff Portal Access", "Digital Gradebook Sync Layouts", "Fee Payment Collection Gateways", "Live Bus GPS Route Logs", "Exam Timetable Generators"],
        badge: "Institutional Scalability",
        icon: "🏫"
      },
      {
        id: "lms",
        title: "Learning Management System (LMS)",
        desc: "Secure educational platforms with high-end video streaming, custom quizzes, and digital certificates.",
        features: ["Video Encrypted Streaming", "Automated Digital Certificates", "Dynamic Student Quizzing Sheets", "Interactive Lecture Discussion Boards", "Subscription Pricing Plans Support"],
        badge: "EdTech Innovation",
        icon: "🎓"
      }
    ],
    packages: [
      { name: "Billing POS Standard", price: "₹39,999", duration: "One-time", desc: "Fast offline-first retail billing software.", features: ["Custom Invoice Layout Templates", "Barcode Scanner Linkage Support", "Realtime Stock Alerts Alerting", "PDF Daily Report Generation", "1 Year Local Data Backups"] },
      { name: "Enterprise ERP Portal", price: "₹1,49,999", duration: "One-time", desc: "Highly robust dashboard tailored for organizations.", features: ["Admin & User Dual Dashboards", "Automated Daily Database Backups", "Advanced API Integrations", "Encrypted SSL Encryptions", "Custom SLA Response Contract"] },
      { name: "Premium LMS EdTech", price: "₹2,49,999", duration: "One-time", desc: "Launch your own custom education channel.", features: ["Encrypted Video DRM Sourcing", "Automated Certification Engine", "Stripe & Razorpay Subscriptions", "Student Quiz Grade Cards", "24/7 Priority Support SLAs"] }
    ]
  },
  "aeo": {
    title: "AEO (Answer Engine)",
    subtitle: "Conversational AI Optimization for LLM Search Engine Prompts",
    description: "Engineering your online content footprints so you rank as the primary answer cited inside ChatGPT Search, Gemini, Claude, and Perplexity AI.",
    gradient: "linear-gradient(135deg, #052e47 0%, #10b981 100%)",
    types: [
      {
        id: "aeo-core",
        title: "Answer Engine Optimization",
        desc: "Structuring content architectures into easily digestible formats that conversational LLMs index and reference for user search prompts.",
        features: ["LLM Corpus Readability Structuring", "FAQ Semantic Tag Markup", "Third-Party Database Citations Boost", "Highly Structured Keyphrase Placement", "AI Search Visibility Audit Reports"],
        badge: "Future-Proof Marketing",
        icon: "🤖"
      },
      {
        id: "voice",
        title: "Voice Search Optimization",
        desc: "Target conversational voice search requests initiated on Apple Siri, Google Assistant, and Amazon Alexa devices.",
        features: ["Natural Conversational Copywriting", "Featured Snippet Position Hijacking", "Highly Targeted Long-Tail Keyphrases", "Fast Local Business Citation Logs", "JSON Schema Markup Auditing"],
        badge: "Voice Search Ready",
        icon: "🎙️"
      }
    ],
    packages: [
      { name: "AEO Launchpad", price: "₹29,999", duration: "Month", desc: "Begin your artificial intelligence optimization strategy.", features: ["5 Keyphrase AI Optimizations", "JSON Schema Tag Placement", "FAQ Content Writing Sourcing", "Monthly Perplexity Index Auditing", "AI Citations Growth Reports"] },
      { name: "AEO Authority Pro", price: "₹59,999", duration: "Month", desc: "Dominate search prompts across ChatGPT, Gemini, and Claude.", features: ["15 Keyphrase Optimizations", "Third-Party Citation Network Building", "Comprehensive Schema Markup Overhaul", "Voice Search Target Keyphrases", "Priority AI Corpus Audits"] }
    ]
  },
  "geo": {
    title: "GEO (Google Engine)",
    subtitle: "Generative Search Experience (SGE) Overhaul",
    description: "Position your business at the pinnacle of Google Search Generative Experience overlays, securing direct traffic before links are even clicked.",
    gradient: "linear-gradient(135deg, #0f75bc 0%, #10b981 100%)",
    types: [
      {
        id: "geo-core",
        title: "Google Engine Optimization (GEO)",
        desc: "Overhauling content models to align with Google's SGE criteria, ensuring placement in AI summaries.",
        features: ["SGE Snapshot Citation Targeting", "Structured Entity-Relationship Writing", "Topic Clustering Core Pages", "Authoritative Citation Sourcing", "Algorithmic Rank Tracking Logs"],
        badge: "SGE Dominance",
        icon: "🌐"
      },
      {
        id: "local-geo",
        title: "Local Google Optimization",
        desc: "Rank in regional Hyderabad Google Maps listings, matching local search intent perfectly.",
        features: ["Google Maps Ranking Strategy", "Review Profile Optimization Campaigns", "Localized Landing Pages Design", "Structured Citation Listings Sync", "Begumpet & Hyderabad Local SEO"],
        badge: "Hyper-Local Dominance",
        icon: "📍"
      }
    ],
    packages: [
      { name: "GEO Standard", price: "₹24,999", duration: "Month", desc: "Begin optimizing for Google's SGE.", features: ["3 Main Landing Page Overhauls", "Structured Schema Placement", "Google Maps Listing Optimizations", "AI Summary Placement Audits", "Monthly SGE Traffic Reports"] },
      { name: "GEO Enterprise", price: "₹49,999", duration: "Month", desc: "Dominate both local search maps and AI summary overlays.", features: ["8 Complex Page SGE Overhauls", "Advanced Topic Clustering Guides", "Local Citation Syndication Building", "Dedicated Competitor Analysis Logs", "Weekly Rank Tracking Auditing"] }
    ]
  },
  "youtube-seo": {
    title: "Youtube SEO",
    subtitle: "Unlock Massive Organic YouTube Algorithmic Traffic",
    description: "Boost video discovery and recommendation frequency with calculated keyword tags, structured transcripts, and optimized playlist hierarchies.",
    gradient: "linear-gradient(135deg, #ef4444 0%, #1b2838 100%)",
    types: [
      {
        id: "yt-metadata",
        title: "Video Metadata & Tag Optimization",
        desc: "Optimize title, description hooks, and algorithmic tag pools for instant visibility in searches and recommended sidebars.",
        features: ["High-Volume Search Tag Sourcing", "Click-Inducing Title Concepting", "Structured Video Chapters Setup", "Interactive Link Placements Setup", "Algorithmic Index Tag Mapping"],
        badge: "High Click-Through",
        icon: "📊"
      },
      {
        id: "yt-authority",
        title: "Channel Keyword Authority",
        desc: "Re-engineering overall channel layouts, descriptions, and playlists to trigger recommendation algorithms.",
        features: ["Cohesive Playlist Architecture Plans", "Channel Banner Keyphrase Overhauls", "Automatic Captions Optimization", "Cross-Platform Video Backlinking", "YouTube Studio Analytic Audits"],
        badge: "Channel Authority Boost",
        icon: "👑"
      }
    ],
    packages: [
      { name: "Starter Channel Pack", price: "₹14,999", duration: "One-time", desc: "Perfect to optimize initial video catalog.", features: ["5 Existing Videos Overhauled", "Keyword Research Sourcing", "Custom Video Descriptions Sourcing", "Playlist Architecture Layouts", "Channel Keyword Tag Tuning"] },
      { name: "Channel Growth Master", price: "₹29,999", duration: "Month", desc: "Ongoing management to scale video organic reaches.", features: ["10 Videos Optimized / Month", "Ongoing CTR Thumbnail Guidance", "Custom Video Chapters Layouts", "Video Script Hook Copywriting", "Competitor Channel Intelligence Reports"] }
    ]
  },
  "youtube-ads": {
    title: "Youtube Ads",
    subtitle: "Laser-Targeted Video Campaign Pipelines",
    description: "Launch TrueView in-stream ad funnels designed to convert passive viewers into premium leads for your products.",
    gradient: "linear-gradient(135deg, #ef4444 0%, #f58220 100%)",
    types: [
      {
        id: "yt-instream",
        title: "TrueView In-Stream & Bumper Ads",
        desc: "Setup hook-oriented video ad formats that bypass skippable restrictions, driving immediate click conversions.",
        features: ["Attention-Hook Video Concepts", "Platform Ad Account Configs", "Laser Audience Interest Tuning", "Re-marketing Video Campaign Setup", "CPA Bid Budget Allocations"],
        badge: "Maximize Conversions",
        icon: "🎯"
      },
      {
        id: "yt-audience",
        title: "Target Audience Campaigns",
        desc: "Identify and target custom segments, channels, and search terms to display your video ads to high-intent buyers.",
        features: ["Demographic Interest Placements", "Competitor Video Placements Sourcing", "Keyword Search Audience Targeting", "A/B Video Creative Auditing", "Daily Budget Scaling Auditing"],
        badge: "Precision Targeting",
        icon: "🎯"
      }
    ],
    packages: [
      { name: "Ad Campaign Starter", price: "₹19,999", duration: "Month", desc: "Launch first targeted video ad campaign.", features: ["1 High-Converting Video Ad Setup", "Demographic Interest Targeting Setup", "Conversion Pixel Integration Sourcing", "Ad Copy Hook Placement", "Weekly Performance Auditing Reports"] },
      { name: "YouTube Ads Dominance", price: "₹39,999", duration: "Month", desc: "Fully managed multi-audience scale campaigns.", features: ["3 Dynamic Video Ad Setups", "Competitor Channel Video Targetings", "A/B Creative Hook Analytics", "Remarketing Funnel Architectures", "Dedicated Campaigns Manager Support"] }
    ]
  }
};

export default function ServiceDetailPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { id } = params;

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // Chat Widget State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: "bot", text: "Hello! Welcome to Ananya Hi Solutions. I can guide you through our specialized packages for this service. How can I help you today?" },
  ]);
  const messagesEndRef = useRef(null);
  const pricingSectionRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, chatOpen]);

  // Handle scroll event for Header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const data = SERVICES_DETAIL_DATA[id] || SERVICES_DETAIL_DATA["web-design"];

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userMsg = chatMessage;
    setChatHistory((prev) => [...prev, { sender: "user", text: userMsg }]);
    setChatMessage("");

    setTimeout(() => {
      let reply = `Our packages for ${data.title} are tailor-made for high performance. Drop your details here and a consultant will email a custom brochure immediately!`;
      const lower = userMsg.toLowerCase();
      if (lower.includes("price") || lower.includes("cost") || lower.includes("package") || lower.includes("pricing")) {
        reply = `For ${data.title}, we offer three standard pricing tiers. Let me know your business objectives and I can recommend the perfect package for you!`;
      }
      setChatHistory((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 1000);
  };

  const scrollToPricing = () => {
    pricingSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Header & Navigation Bar */}
      <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>

          {/* Desktop Nav Links */}
          <ul className="nav-links">
            <li><Link href="/" className="nav-link">Home</Link></li>
            <li><Link href="/about" className="nav-link">About</Link></li>
            <li><Link href="/services" className="nav-link active">Services</Link></li>
            <li><Link href="/careers" className="nav-link">Careers</Link></li>
            <li><Link href="/blog" className="nav-link">Blog</Link></li>
            <li><Link href="/contact" className="nav-link">Contact us</Link></li>
          </ul>

          <div className="nav-cta">
            <button onClick={scrollToPricing} className="btn btn-primary">Choose Package</button>
          </div>

          {/* Mobile Menu Icon Toggle */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 top-[70px] bg-white z-[999] flex flex-col p-6 gap-6 shadow-lg md:hidden animate-slide-in">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold border-b pb-2">Home</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold border-b pb-2">About</Link>
            <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold border-b pb-2">Services</Link>
            <Link href="/careers" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold border-b pb-2">Careers</Link>
            <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold border-b pb-2">Blog</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold border-b pb-2">Contact us</Link>
            <button onClick={() => { setMobileMenuOpen(false); scrollToPricing(); }} className="btn btn-accent text-center mt-4 w-full">Choose Package</button>
          </div>
        )}
      </header>

      {/* 2. Hero Banner Section */}
      <section className="contact-hero" style={{ background: data.gradient || "radial-gradient(circle at 50% 50%, #052e47 0%, #031825 100%)" }}>
        <div className="contact-hero-content container animate-slide-in">
          <h1>Our {data.title} <span>Solutions</span></h1>
          <p className="max-w-[750px] mx-auto text-lg text-slate-100 opacity-90 mb-8">
            {data.description}
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button onClick={scrollToPricing} className="btn btn-accent px-8 py-3.5 font-bold shadow-lg transition-transform hover:-translate-y-0.5">
              Choose Package
            </button>
            <Link href="/contact" className="btn btn-outline px-8 py-3.5 font-bold text-white border-white transition-all hover:bg-white hover:text-slate-900">
              Request Free Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Sub-services / Different Types Related Pages */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-header text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900">Specialized Services Under {data.title}</h2>
            <p className="text-slate-600 mt-3">Explore different types and architectures tailored specifically for your operational goals.</p>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex justify-center border-b border-slate-100 mb-10 overflow-x-auto pb-1 gap-2 flex-nowrap md:flex-wrap">
            {data.types.map((type, idx) => (
              <button
                key={type.id}
                onClick={() => setActiveTab(idx)}
                className={`px-5 py-3.5 font-semibold text-sm rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
                  idx === activeTab
                    ? "border-primary-blue text-primary-blue bg-blue-50/20 font-bold"
                    : "border-transparent text-slate-500 hover:text-slate-950 hover:bg-slate-50/50"
                }`}
              >
                <span className="mr-2">{type.icon}</span> {type.title}
              </button>
            ))}
          </div>

          {/* Active Tab Service Display Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50/50 rounded-2xl border border-slate-100 p-8 md:p-12 animate-slide-in">
            <div className="lg:col-span-7">
              <span className="inline-block bg-primary-blue/10 text-primary-blue font-bold px-4 py-1.5 rounded-full text-xs mb-4 uppercase tracking-wider">
                {data.types[activeTab].badge}
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
                {data.types[activeTab].title}
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                {data.types[activeTab].desc}
              </p>

              <h4 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wider">Key Features included:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {data.types[activeTab].features.map((feat, i) => (
                  <li key={i} className="flex items-center text-slate-600 text-sm font-medium">
                    <span className="text-green-500 mr-2.5 text-base">✓</span> {feat}
                  </li>
                ))}
              </ul>

              <Link href={`/contact?service=${id}&type=${data.types[activeTab].id}`} className="btn btn-primary inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm">
                Get a Custom Quote <span>→</span>
              </Link>
            </div>

            {/* Premium Interactive Visual Box Side */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[360px] aspect-square rounded-2xl relative overflow-hidden flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-2xl">
                {/* Custom glowing dynamic SVGs matching service type */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(15,117,188,0.2),transparent_70%)]" />
                <span className="text-7xl mb-6 select-none filter drop-shadow-[0_4px_12px_rgba(245,130,32,0.3)] animate-bounce">
                  {data.types[activeTab].icon}
                </span>
                <h4 className="text-white font-extrabold text-xl text-center relative z-10">{data.types[activeTab].title}</h4>
                <p className="text-slate-400 text-xs text-center mt-3 max-w-[240px] leading-relaxed relative z-10">
                  Fully compliant with Begumpet Headquarters high-fidelity digital production standards.
                </p>
                <div className="mt-6 flex gap-1 relative z-10">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Packages Section (Choose Package) */}
      <section ref={pricingSectionRef} className="section section-bg-alt border-t border-slate-100">
        <div className="container">
          <div className="section-header text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900">Choose Your {data.title} Package</h2>
            <p className="text-slate-600 mt-3">Select the standard deployment model suited to power your startup or corporate system.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.packages.map((pkg, idx) => (
              <div key={idx} className={`pricing-card relative flex flex-col p-8 bg-white border rounded-2xl transition-all hover:shadow-xl ${
                idx === 1 ? "border-primary-blue shadow-lg scale-105" : "border-slate-200"
              }`}>
                {idx === 1 && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary-blue text-white font-bold text-xs px-4 py-1 rounded-full uppercase tracking-wider">
                    Recommended
                  </span>
                )}
                <h3 className="font-extrabold text-xl text-slate-900 mb-2">{pkg.name}</h3>
                <p className="text-slate-500 text-xs mb-6 min-h-[32px]">{pkg.desc}</p>
                <div className="flex items-baseline gap-1 mb-6 border-b border-slate-100 pb-6">
                  <span className="text-4xl font-extrabold text-slate-900">{pkg.price}</span>
                  <span className="text-slate-500 text-sm">/ {pkg.duration}</span>
                </div>
                <ul className="flex flex-col gap-3.5 mb-8 flex-grow">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-start text-sm text-slate-600">
                      <span className="text-primary-blue font-bold mr-2 text-base">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/contact?service=${id}&package=${pkg.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`btn text-center py-3 rounded-lg font-bold text-sm transition-all ${
                    idx === 1
                      ? "btn-primary shadow-blue-glow"
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                >
                  Choose Package
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <footer className="footer mt-auto">
        <div className="footer-container">
          <div className="footer-brand">
            <Logo light={true} className="footer-logo-svg" />
            <p className="footer-desc mt-4">
              We are a professional Web Design & Digital Marketing agency in Hyderabad, delivering creative solutions that help businesses grow online.
            </p>
          </div>

          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/contact">Payment Terms</Link></li>
              <li><Link href="/blog">News</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Our Services</h4>
            <ul className="footer-links">
              <li><Link href="/services/web-design">Website Design</Link></li>
              <li><Link href="/services/digital-marketing">Digital Marketing</Link></li>
              <li><Link href="/services/mobile-app">Mobile Application</Link></li>
              <li><Link href="/services/ecommerce-app">eCommerce Application</Link></li>
              <li><Link href="/services/video-production">Video Production</Link></li>
              <li><Link href="/services/software-development">Software Development</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Contact Us</h4>
            <ul className="footer-contact">
              <li className="footer-contact-item">
                <span className="footer-contact-icon">📍</span>
                <span>401 Sravya Vatika, Greenlands,<br />Begumpet, Hyderabad, Telangana-500016</span>
              </li>
              <li className="footer-contact-item">
                <span className="footer-contact-icon">📞</span>
                <span>(+91) 76739-35353</span>
              </li>
              <li className="footer-contact-item">
                <span className="footer-contact-icon">✉️</span>
                <span>info@ananyahisolutions.com</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          <p>© 2025 Ananya Hi Solutions. All Rights Reserved.</p>
        </div>
      </footer>

      {/* 6. Interactive Chat Widget */}
      <div className="chat-widget-container">
        {!chatOpen && (
          <div className="chat-bubble" onClick={() => setChatOpen(true)}>
            <span>Need Help? 👋</span>
          </div>
        )}

        <div className={`chat-box ${chatOpen ? "open" : ""}`}>
          <div className="chat-header">
            <div className="chat-header-user">
              <div className="chat-header-avatar flex items-center justify-center font-bold text-slate-800 text-[20px]">
                👩‍💻
              </div>
              <div className="chat-header-info">
                <h4>Ananya</h4>
                <p>Online | Digital Assistant</p>
              </div>
            </div>
            <button
              className="chat-header-close"
              onClick={() => setChatOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          <div className="chat-messages">
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`chat-msg ${
                  msg.sender === "bot" ? "chat-msg-received" : "chat-msg-sent"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendChat} className="chat-footer">
            <input
              type="text"
              placeholder="Ask about our packages..."
              className="chat-input"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
            />
            <button type="submit" className="chat-send-btn" aria-label="Send message">
              ➤
            </button>
          </form>
        </div>

        <div className="chat-trigger" onClick={() => setChatOpen(!chatOpen)}>
          <div className="w-full h-full flex items-center justify-center text-3xl">
            👩‍💻
          </div>
        </div>
      </div>
    </div>
  );
}
