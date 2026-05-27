"use client";

import React, { useState, useRef, useEffect, use } from "react";
import Link from "next/link";
import Header from "../../../components/Header";

// Clean footer logo component
function FooterLogo() {
  return (
    <img
      src="/logo.png"
      alt="Ananya Hi Solutions"
      style={{
        height: "42px",
        width: "auto",
        objectFit: "contain",
        display: "block"
      }}
    />
  );
}

// Complete Subservices Dataset
const SUBSERVICES_DETAIL_DATA = {
  // Web Design
  "static": {
    title: "Static Website Design",
    packageName: "Starter Static Package",
    packageSubtitle: "Perfect for Small Businesses & Personal Brands",
    topVisual: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?auto=format&fit=crop&w=1200&q=80",
    bodyVisual: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    whyChoose: "Our static website designs combine lightning-fast loading speeds with robust mobile responsiveness. At Ananya Hi Solutions, we build lightweight, SEO-ready landing pages and portfolio sites that serve as the perfect low-maintenance digital storefront for growing startups.",
    visibleFeatures: [
      "Up to 6 fully responsive web pages",
      "FREE Web Hosting & SSL certificate for 1 year",
      "1 week free post-launch support",
      "Mobile-first responsive UX design framework"
    ],
    lockedFeatures: [
      "Advanced JSON-LD SEO schema integration",
      "Google PageSpeed optimization (90+ Score guaranteed)",
      "Cross-browser and screen compatibility audits"
    ]
  },
  "dynamic": {
    title: "Dynamic Website Design",
    packageName: "Growth Dynamic Package",
    packageSubtitle: "Ideal for Corporate Portals & Content Creators",
    topVisual: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
    bodyVisual: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
    whyChoose: "Dynamic websites are critical for businesses that require real-time content updates, user logins, and interactive features. We construct customized content management systems (CMS) and interactive portals that allow your team to manage data feeds effortlessly.",
    visibleFeatures: [
      "Dynamic Database-driven site architecture",
      "User-friendly custom admin dashboard",
      "Interactive forms & automated email responder setup",
      "SEO-friendly dynamic blog & category routing"
    ],
    lockedFeatures: [
      "Role-based user permissions & secure authentication",
      "Real-time database backups & cloud sync setups",
      "API integrations for newsletter and social feeds"
    ]
  },
  "ecommerce": {
    title: "E-commerce Website Design",
    packageName: "Enterprise E-commerce Package",
    packageSubtitle: "Optimized for Multi-Product Direct-to-Consumer Stores",
    topVisual: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1200&q=80",
    bodyVisual: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    whyChoose: "Scale your online retail sales with a conversion-first digital store. We build fast, secure shopping pipelines equipped with robust product catalog management, secure checkout sequences, and dynamic invoice generation.",
    visibleFeatures: [
      "Unlimited product listings and categories",
      "Secure payment gateways (Stripe, Razorpay, UPI)",
      "Dynamic stock levels and inventory manager dashboard",
      "Discount coupon systems & sales reports"
    ],
    lockedFeatures: [
      "Automated cart abandonment follow-up pipelines",
      "Live courier API and package tracking integrations",
      "Multi-currency support & tax rule calculators"
    ]
  },
  "spa": {
    title: "Single Page Application (SPA)",
    packageName: "Premium SPA Package",
    packageSubtitle: "Highly Interactive, Blazing-Fast Single Page Apps",
    topVisual: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    bodyVisual: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
    whyChoose: "Single Page Applications (SPAs) deliver an instantaneous, desktop-like user experience by reloading content dynamically without page refreshes. We build custom SPAs using React, Next.js, and Vue.js, optimized for performance, interactive animations, and state management.",
    visibleFeatures: [
      "Blazing fast React/Vue/Next.js SPA architecture",
      "Seamless client-side page routing",
      "Fluid state management & micro-interactions",
      "PWA capabilities (offline support, home screen install)"
    ],
    lockedFeatures: [
      "Custom REST/GraphQL API integration layers",
      "Secure OAuth2 / JWT user authentication",
      "Real-time web socket data feeds & notifications"
    ]
  },

  // Digital Marketing
  "seo": {
    title: "Search Engine Optimization (SEO)",
    packageName: "Organic Growth SEO Package",
    packageSubtitle: "Engineered to Dominate Search Engine Results Pages",
    topVisual: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80",
    bodyVisual: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    whyChoose: "Rank organically above competitors for the highest-value search terms in your industry. At Ananya Hi Solutions, our SEO audits, backlink networks, and content strategies yield predictable, compounding organic customer leads.",
    visibleFeatures: [
      "In-depth competitor keyword analysis",
      "On-page content optimization & header tag audits",
      "Google Search Console & GA4 dashboard configuration",
      "Monthly search ranking & keyword visibility reports"
    ],
    lockedFeatures: [
      "Premium authority backlink building campaign",
      "Technical Core Web Vitals audit & speed optimizations",
      "Local SEO Map Pack optimization & review strategy"
    ]
  },
  "smm": {
    title: "Social Media Marketing",
    packageName: "Brand Engagement SMM Package",
    packageSubtitle: "Cultivate High-Value Social Communities",
    topVisual: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80",
    bodyVisual: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    whyChoose: "Build direct relationships with your followers and scale brand authority. We write high-engagement social copy, plan visual post calendars, and run conversion-optimized campaigns across Instagram, LinkedIn, and Facebook.",
    visibleFeatures: [
      "Monthly social media post and story calendar",
      "Custom graphic designs matching brand identity",
      "Hashtag research & target demographic profiling",
      "Community engagement monitoring & follower logs"
    ],
    lockedFeatures: [
      "Viral reel/short video editing & scripting support",
      "LinkedIn thought-leadership article ghostwriting",
      "Influencer outreach & collab campaign management"
    ]
  },
  "google-ads": {
    title: "Google Ads (PPC)",
    packageName: "High-Intent PPC Accelerator",
    packageSubtitle: "Immediate Sales, Traffic, and Conversion Funnels",
    topVisual: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    bodyVisual: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    whyChoose: "Capture prospects at the exact moment they search for your service. We structure laser-targeted paid search, shopping, and display campaigns that reduce your client acquisition cost (CAC) and scale your ROAS.",
    visibleFeatures: [
      "High-intent keyword grouping and match type structure",
      "Persuasive ad copy writing & A/B testing",
      "Negative keyword lists to prevent budget leakage",
      "Conversion pixel and tracking setup"
    ],
    lockedFeatures: [
      "Competitor ad placement bidding algorithms",
      "Custom landing page UI/UX wireframing for conversions",
      "Remarketing audience lists & display retargeting campaigns"
    ]
  },
  "content-marketing": {
    title: "Content Marketing",
    packageName: "Authority Content Package",
    packageSubtitle: "Position Your Brand as the Definitive Voice",
    topVisual: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    bodyVisual: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    whyChoose: "Establish authority and drive organic traffic through informative, search-optimized copy. We create blogs, visual infographics, and downloads that engage users and guide them down your marketing funnel.",
    visibleFeatures: [
      "High-search-volume topic research & clustering",
      "SEO-optimized blog articles & copywriting",
      "Custom infographic concept design & creation",
      "Social media post adaptations for published content"
    ],
    lockedFeatures: [
      "Comprehensive whitepaper and ebook content blueprints",
      "Email newsletter nurturing series sequences",
      "Guest post distribution plan to authority publications"
    ]
  },
  "email-marketing": {
    title: "Email Marketing",
    packageName: "Lifecycle Email Automations",
    packageSubtitle: "Drive Customer Retention & Compounding Sales",
    topVisual: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=1200&q=80",
    bodyVisual: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80",
    whyChoose: "Build loyal customer relationships and automate secondary sales. We set up behavioral email sequences, optimize subject line click rates, and design newsletters that drive consistent traffic to your services.",
    visibleFeatures: [
      "Target list segmentation based on customer actions",
      "A/B split testing of email subject lines",
      "Automated welcome & lead-nurturing email flows",
      "Monthly campaign analytics (Open, CTR, sales)"
    ],
    lockedFeatures: [
      "Abandoned shopping cart auto-recovery sequences",
      "Custom responsive HTML email template designs",
      "CRM customer tag automation and syncing pipelines"
    ]
  },

  // Mobile App
  "ios": {
    title: "iOS Development",
    packageName: "Native iOS App Package",
    packageSubtitle: "Cinematic performance on Apple Devices",
    topVisual: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
    bodyVisual: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80",
    whyChoose: "Deploy native iOS apps constructed in Swift and SwiftUI that capture Apple's design values. We guarantee premium UI animations, strict security integrations, and seamless App Store submission management.",
    visibleFeatures: [
      "Native Apple architecture (Swift, SwiftUI)",
      "Offline database support (CoreData/SQLite)",
      "App Store design layout and guidelines compliance",
      "FaceID/TouchID security authentication setup"
    ],
    lockedFeatures: [
      "In-App purchase systems & Apple Pay integration",
      "Apple Push Notification service (APNs) setup",
      "Crashlytics monitoring & optimization patches"
    ]
  },
  "android": {
    title: "Android App Development",
    packageName: "Native Android App Package",
    packageSubtitle: "Optimized for Diverse Android Screen Layouts",
    topVisual: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80",
    bodyVisual: "https://images.unsplash.com/photo-1531498860502-7c67cf02f657?auto=format&fit=crop&w=800&q=80",
    whyChoose: "Engage billions of worldwide users with Kotlin-based Android apps. We focus on device compatibility, background service optimizations, and standard Google Play Store publishing workflows.",
    visibleFeatures: [
      "Native Google architecture (Kotlin, Jetpack Compose)",
      "Offline sync capabilities & local storage setup",
      "Google Play Console testing and submission",
      "Material Design UI/UX layouts"
    ],
    lockedFeatures: [
      "Third-party REST API and cloud database sync",
      "Google Cloud Messaging push notifications",
      "Multi-window layout and tablet compatibility audits"
    ]
  },

  // eCommerce App
  "single-vendor": {
    title: "Single Vendor Store",
    packageName: "Direct Storefront Package",
    packageSubtitle: "Optimized for Standalone Brand Operations",
    topVisual: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    bodyVisual: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    whyChoose: "Launch a custom-branded storefront that sets you apart from marketplace noise. We build responsive checkout structures, high-performance category filters, and intuitive admin dashboards.",
    visibleFeatures: [
      "Custom branded storefront UI/UX design",
      "Integrated shipping weight calculators",
      "Automated PDF invoice generation and emails",
      "One-click coupon and promotion modules"
    ],
    lockedFeatures: [
      "Custom CRM sync for customer purchase logs",
      "Social media commerce integrations (Instagram shop)",
      "AI-driven product recommendations engine"
    ]
  },
  "multi-vendor": {
    title: "Multi Vendor Marketplace",
    packageName: "Marketplace Hub Package",
    packageSubtitle: "Multi-Merchant Split-fee Ecommerce Platforms",
    topVisual: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80",
    bodyVisual: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80",
    whyChoose: "Build an independent split-fee marketplace like Amazon. We engineer advanced multi-tenant merchant portals where sellers sign up, manage inventory, list catalog items, and view payouts.",
    visibleFeatures: [
      "Merchant onboarding and profile verification panels",
      "Split payment gateway configurations (Stripe Connect)",
      "Global admin control panel with fee settings",
      "Independent seller sales reporting logs"
    ],
    lockedFeatures: [
      "Automated seller commission payout runs",
      "Unified seller rating & review systems",
      "Multi-vendor support ticket routing framework"
    ]
  },

  // Video Production
  "corporate": {
    title: "Corporate Video Production",
    packageName: "Cinematic Company Profiles",
    packageSubtitle: "Documentary-Style Storytelling for Premium Brands",
    topVisual: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
    bodyVisual: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
    whyChoose: "Present your company's core values, story, and executive profile through high-definition cinematic cuts. We structure scripting, location lighting, audio syncs, and multi-camera shoots.",
    visibleFeatures: [
      "Full scriptwriting & cinematic storyboarding",
      "Multi-camera interview setup (4K Resolution)",
      "Professional audio recording & voiceover casting",
      "Company branding & transition overlays"
    ],
    lockedFeatures: [
      "Licensed cinematic music and sound design",
      "Advanced 3D logo animation and intro clips",
      "Color grading and correction mastering runs"
    ]
  },
  "promo": {
    title: "Promotional Marketing Videos",
    packageName: "High-CTR Visual Promos",
    packageSubtitle: "Designed to Maximize Ad CTR and Conversions",
    topVisual: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80",
    bodyVisual: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80",
    whyChoose: "Hook users immediately in the first 3 seconds of their feed. We structure script hooks, visual call-to-actions, and sound mixes to drive sales leads on Facebook, YouTube, and Instagram.",
    visibleFeatures: [
      "Dynamic social ad layout formatting (16:9, 9:16)",
      "High-energy video script hooks formulation",
      "Kinetic text typography & logo overlays",
      "Stock video/image licensing integration"
    ],
    lockedFeatures: [
      "Professional voiceover recording in local languages",
      "Custom sound effects and audio mixing",
      "A/B creative testing edits (Multiple hooks)"
    ]
  },
  "event": {
    title: "Event Coverage & Highlights",
    packageName: "Cinematic Highlight Reels",
    packageSubtitle: "Capture corporate events, conferences, and launches",
    topVisual: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    bodyVisual: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
    whyChoose: "Re-live major summits, press conferences, and corporate launches. Our production crew manages stage lighting audio links, rapid highlight edits, and drone landscape shots.",
    visibleFeatures: [
      "Multi-point venue cameras & coverage log",
      "Rapid turnaround highlight reels (1-3 min)",
      "Stage microphone direct audio integrations",
      "Custom lower-third title overlays"
    ],
    lockedFeatures: [
      "Cinematic aerial drone camera recording",
      "Raw video dump compilation & backup links",
      "Presenter slide synchronized video overlays"
    ]
  },
  "explainer": {
    title: "Product Explainer Videos",
    packageName: "3D & 2D Animated Explainers",
    packageSubtitle: "Simplify Complex Products or Platform Workflows",
    topVisual: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    bodyVisual: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80",
    whyChoose: "Make complex software workflows or manufacturing processes simple to understand. We design character scripts, custom animations, and clean step-by-step product walkthrough animations.",
    visibleFeatures: [
      "Step-by-step workflow scripting & layout",
      "2D/3D character or vector custom animation",
      "Professional voiceover & audio synchronization",
      "Direct screen-capture highlight additions"
    ],
    lockedFeatures: [
      "Custom 3D model renderings of physical products",
      "Interactive video hotspot interface assets",
      "Multi-language caption translations"
    ]
  },
  "social": {
    title: "Social Media Content",
    packageName: "Reels & TikTok Production",
    packageSubtitle: "Engineered for Rapid Social Feed Distribution",
    topVisual: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
    bodyVisual: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
    whyChoose: "Maximize feed views with high-engagement vertical loops. We format scripting hooks, compile kinetic subtitles, and master video cuts to satisfy algorithm placement trends.",
    visibleFeatures: [
      "Vertical video editing (9:16 layout)",
      "Automated kinetic subtitles and emojis",
      "Trending music track selections",
      "Hook-driven script layout structures"
    ],
    lockedFeatures: [
      "Monthly batch shooting direction in Hyderabad",
      "Custom graphic thumbnail master templates",
      "Channel post scheduling & distribution support"
    ]
  },
  "music-video": {
    title: "Music Video Production",
    packageName: "Cinematic Music Reels",
    packageSubtitle: "Full Script-to-Screen Music Video Production",
    topVisual: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80",
    bodyVisual: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80",
    whyChoose: "Bring your tracks to life with cinematic screenplays. Our creative directors script music videos, organize physical locations, master lighting setups, and run color-grading masters.",
    visibleFeatures: [
      "Visual screenplay & concept storyboards",
      "Professional production lighting rigs",
      "Choreography and actor placement direction",
      "High-speed cinematic slow-motion recording"
    ],
    lockedFeatures: [
      "Creative color grading (Multi-point LUTs)",
      "Special visual effects (VFX) composition",
      "Behind-the-scenes documentary package"
    ]
  },
  "short-films": {
    title: "Short Films & Web Series",
    packageName: "Drama & Story Production",
    packageSubtitle: "Full-Cycle Visual Film Productions",
    topVisual: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80",
    bodyVisual: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
    whyChoose: "Turn your scripts into cinematic reality. We manage full-scale actor casting calls, location scouting, set master design, dialogue recordings, and post-production masters.",
    visibleFeatures: [
      "Creative screenplay scripting & breakdown",
      "Professional casting calls & talent onboarding",
      "Cinema-grade camera sets (RED/ARRI systems)",
      "Dialogue sound mastering & foley integration"
    ],
    lockedFeatures: [
      "Custom musical scoring and orchestrations",
      "DCP master conversion for theater play",
      "Film festival submission coordination support"
    ]
  },

  // Software Development
  "crm": {
    title: "CRM Software Development",
    packageName: "Custom CRM Infrastructure",
    packageSubtitle: "Centralize sales logs, client logs, and support databases",
    topVisual: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    bodyVisual: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
    whyChoose: "Off-the-shelf CRMs rarely match custom operational sales flows. We engineer custom client trackers, sales logs, and dashboard tools that sync with WhatsApp and email.",
    visibleFeatures: [
      "Custom sales pipeline & status trackers",
      "Customer communication logs (Email, SMS)",
      "Secure role-based agent authentication",
      "Dynamic CSV client list import & exports"
    ],
    lockedFeatures: [
      "Automated WhatsApp Business API notifications",
      "Sales performance analytics forecasting dashboards",
      "Custom API links to external software panels"
    ]
  },
  "billing": {
    title: "Billing Software Development",
    packageName: "GST POS Billing Engine",
    packageSubtitle: "Invoice logs, Pos portals, and transaction panels",
    topVisual: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    bodyVisual: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    whyChoose: "Automate shop checkouts and invoice filings. We construct POS billing panels that are GST-compliant, record transaction logs, print receipts, and work offline.",
    visibleFeatures: [
      "GST tax calculator & layout invoices",
      "Thermal printer hardware integrations",
      "Cashier shifts & daily ledger summaries",
      "Product barcode scanning capabilities"
    ],
    lockedFeatures: [
      "Offline-first local DB sync to cloud servers",
      "Automated GST report compilation tools",
      "Multiple store stock sync dashboards"
    ]
  },
  "college": {
    title: "College Management System",
    packageName: "Institutional ERP Portal",
    packageSubtitle: "Sync Student logs, marks, fees, and staff logins",
    topVisual: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
    bodyVisual: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
    whyChoose: "Streamline campus operations with a unified institution ERP database. We build secure student panels, fee logging systems, attendance grids, and faculty portals.",
    visibleFeatures: [
      "Secure Student & Faculty login portals",
      "Dynamic Attendance & Marks recording tables",
      "Online fee payment portal integrations",
      "Academic timetable layout schedulers"
    ],
    lockedFeatures: [
      "SMS alerts to parents for student leaves",
      "Library book tracking and barcode logs",
      "Exam report card automated PDF builders"
    ]
  },
  "lms": {
    title: "Learning Management System",
    packageName: "E-Learning Suite Portal",
    packageSubtitle: "Deliver online course videos, quizzes, and files",
    topVisual: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    bodyVisual: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
    whyChoose: "Deliver secure educational courses. We build video player controls, student progress indicators, quiz modules, and digital PDF certificate generators.",
    visibleFeatures: [
      "Secure video course hosting & uploads",
      "Interactive quiz & grading frameworks",
      "Student study progress indicator logs",
      "Student discussions & QA forums"
    ],
    lockedFeatures: [
      "Automated student PDF certificate creators",
      "Dynamic coupon codes and course checkout funnels",
      "Zoom/Google Meet live class schedulers"
    ]
  }
};

export default function SubserviceDetailPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { id, subId } = params;

  // Retrieve subservice data, fallback to static website design if missing
  const data = SUBSERVICES_DETAIL_DATA[subId] || SUBSERVICES_DETAIL_DATA["static"];

  // State for package unlocking flow
  const [unlocked, setUnlocked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: ""
  });

  // State for inline lead capture form (when no package exists)
  const [inlineSuccess, setInlineSuccess] = useState(false);
  const [inlineSubmitting, setInlineSubmitting] = useState(false);
  const [inlineData, setInlineData] = useState({
    name: "",
    email: "",
    phone: "",
    source: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInlineChange = (e) => {
    const { name, value } = e.target;
    setInlineData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUnlockSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    
    // Simulate API registration and lead capture
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setUnlocked(true);
    }, 1200);
  };

  const handleInlineSubmit = (e) => {
    e.preventDefault();
    if (!inlineData.name || !inlineData.email || !inlineData.phone) {
      alert("Please fill in all required fields.");
      return;
    }
    setInlineSubmitting(true);

    // Simulate API lead capture
    setTimeout(() => {
      setInlineSubmitting(false);
      setInlineSuccess(true);
      // Reset form
      setInlineData({
        name: "",
        email: "",
        phone: "",
        source: ""
      });
    }, 1200);
  };

  const closeModal = () => {
    setModalOpen(false);
    // Reset success screen once closed, keeping the unlocked state active
    setSuccess(false);
  };

  // List of subservices that have defined packages
  const SUBSERVICES_WITH_PACKAGES = ["static", "dynamic", "ecommerce", "seo", "smm", "google-ads", "spa"];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Header */}
      <Header activePage="services" />

      {/* 2. Top Header Visual Banner */}
      <section className="subservice-banner-section" style={{ background: "var(--dark-deep)", paddingTop: "140px", paddingBottom: "60px" }}>
        <div className="container" style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <div className="subservice-banner-wrapper" style={{ position: "relative", width: "100%", height: "350px", borderRadius: "20px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.3)", marginBottom: "40px", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <img 
              src={data.topVisual} 
              alt={data.title} 
              style={{ width: "100%", height: "100%", objectFit: "cover" }} 
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(5,46,71,0.1) 0%, rgba(5,46,71,0.6) 100%)" }}></div>
          </div>
          <h1 className="subservice-detail-title" style={{ fontFamily: "var(--font-headings)", color: "var(--white)", fontSize: "2.8rem", fontWeight: "800" }}>
            {data.title}
          </h1>
        </div>
      </section>

      {/* 3. Why Choose Ananya Hi Solutions Section */}
      <section className="why-choose-subservice bg-white" style={{ padding: "80px 0", borderBottom: "1px solid #f1f5f9" }}>
        <div className="container" style={{ maxWidth: "850px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-headings)", color: "var(--dark-deep)", fontSize: "2.2rem", fontWeight: "800", marginBottom: "24px" }}>
            Why Choose Ananya Hi Solutions for {data.title}
          </h2>
          <div style={{ width: "60px", height: "4px", background: "var(--accent-orange)", margin: "0 auto 30px auto", borderRadius: "10px" }}></div>
          <p style={{ color: "var(--secondary-slate)", fontSize: "1.15rem", lineHeight: "1.8", margin: 0, textAlign: "justify" }}>
            {data.whyChoose}
          </p>
        </div>
      </section>

      {/* 4. What We Provide Section */}
      <section className="what-we-provide-section bg-white" style={{ padding: "80px 0", borderBottom: "1px solid #f1f5f9" }}>
        <div className="container" style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 24px" }}>
          <div className="text-center mb-12">
            <h2 style={{ fontFamily: "var(--font-headings)", color: "var(--dark-deep)", fontSize: "2.2rem", fontWeight: "800", marginBottom: "16px" }}>
              What We Provide in {data.title}
            </h2>
            <div style={{ width: "60px", height: "4px", background: "var(--primary-blue)", margin: "0 auto", borderRadius: "10px" }}></div>
          </div>
          
          <div className="what-we-provide-grid">
            {[...data.visibleFeatures, ...data.lockedFeatures].map((feat, idx) => (
              <div key={idx} className="provide-card" style={{ display: "flex", alignItems: "center", gap: "16px", background: "#f8fafc", padding: "18px 24px", borderRadius: "12px", border: "1px solid #f1f5f9", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
                <span className="provide-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "24px", height: "24px", background: "rgba(15,117,188,0.1)", borderRadius: "50%", color: "var(--primary-blue)", fontSize: "14px", fontWeight: "bold", flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: "1.05rem", color: "var(--dark-deep)", fontWeight: "500" }}>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Choose Package / Consultation Lead Form Section */}
      <section className="package-details-section" style={{ padding: "100px 0", background: "var(--light-gray)" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          
          {SUBSERVICES_WITH_PACKAGES.includes(subId) ? (
            // CASE A: Subservice has a package (Show hover sliding card in centered container)
            <div>
              <div className="text-center mb-16">
                <h2 style={{ fontFamily: "var(--font-headings)", color: "var(--dark-deep)", fontSize: "2.4rem", fontWeight: "800", marginBottom: "16px" }}>
                  🎁 Choose Package
                </h2>
                <p style={{ color: "var(--secondary-slate)", fontSize: "1.15rem", maxWidth: "700px", margin: "0 auto" }}>
                  Select our highly specialized, result-oriented {data.title} package. Hover to view features and unlock details.
                </p>
              </div>

              <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
                <div className="package-card-premium" style={{ width: "100%", maxWidth: "380px" }}>
                  {/* Card Background image */}
                  <div 
                    className="package-card-bg"
                    style={{ backgroundImage: `url('${data.bodyVisual}')` }}
                  />
                  
                  {/* Shadow overlay gradient */}
                  <div className="package-card-overlay" />

                  {/* Default visible title at bottom */}
                  <div className="package-card-title-default">
                    <h3 style={{ color: "var(--white)" }}>{data.packageName}</h3>
                    <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.8)", margin: "4px 0 0 0" }}>{data.packageSubtitle}</p>
                    <div className="package-card-underline" />
                  </div>

                  {/* Sliding Hover Panel */}
                  <div className="package-card-hover-panel">
                    <div className="package-hover-header">
                      <h3>{data.packageName}</h3>
                      <div style={{ width: "40px", height: "3px", background: "var(--accent-orange)", margin: "0 auto", borderRadius: "10px" }} />
                    </div>

                    {/* Features list */}
                    <ul className="package-hover-features">
                      {data.visibleFeatures.map((feat, idx) => (
                        <li key={idx} className="package-hover-feature-item">
                          {feat}
                        </li>
                      ))}
                      {data.lockedFeatures.map((feat, idx) => (
                        <li 
                          key={idx} 
                          className="package-hover-feature-item"
                          style={{
                            filter: unlocked ? "none" : "blur(4px)",
                            opacity: unlocked ? 1 : 0.45,
                            transition: "all 0.5s ease"
                          }}
                        >
                          {feat}
                        </li>
                      ))}
                    </ul>

                    {/* Unlock / Success Button */}
                    <button 
                      onClick={() => {
                        if (!unlocked) setModalOpen(true);
                      }}
                      className="package-hover-btn"
                      disabled={unlocked}
                      style={{
                        background: unlocked ? "#10b981" : "var(--white)",
                        color: unlocked ? "var(--white)" : "var(--primary-blue)",
                        cursor: unlocked ? "default" : "pointer",
                        border: "none",
                        width: "100%"
                      }}
                    >
                      {unlocked ? "🎉 Unlocked Successfully" : "🔒 Unlock Full Details"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // CASE B: Subservice has no package (Show Consultation Lead Form inline matching screenshot)
            <div style={{ maxWidth: "720px", margin: "0 auto" }}>
              <div className="text-center mb-12">
                <h2 style={{ fontFamily: "var(--font-headings)", color: "var(--dark-deep)", fontSize: "2.2rem", fontWeight: "800", marginBottom: "16px" }}>
                  💬 Enquire Us
                </h2>
                <p style={{ color: "var(--secondary-slate)", fontSize: "1.1rem" }}>
                  Fill out the form below to enquire about our {data.title} services. Our experts will get back to you shortly.
                </p>
              </div>

              {inlineSuccess ? (
                <div style={{ background: "#ffffff", borderRadius: "16px", padding: "50px 30px", textAlign: "center", border: "1px solid #e2e8f0", boxShadow: "0 10px 25px rgba(5,46,71,0.05)" }}>
                  <div style={{ width: "60px", height: "60px", background: "#e6f4ea", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px auto", color: "#10b981", fontSize: "30px" }}>
                    ✓
                  </div>
                  <h3 style={{ fontFamily: "var(--font-headings)", color: "var(--dark-deep)", fontSize: "1.45rem", fontWeight: "800", marginBottom: "12px" }}>
                    Request Submitted Successfully!
                  </h3>
                  <p style={{ color: "var(--secondary-slate)", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "24px" }}>
                    Thank you! We have received your query. An expert from Ananya Hi Solutions will reach out to you shortly.
                  </p>
                  <button 
                    onClick={() => setInlineSuccess(false)}
                    style={{
                      background: "var(--primary-blue)",
                      color: "var(--white)",
                      padding: "10px 24px",
                      borderRadius: "30px",
                      fontWeight: "700",
                      border: "none",
                      cursor: "pointer"
                    }}
                  >
                    Send Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInlineSubmit} style={{ background: "#ffffff", borderRadius: "20px", padding: "40px 30px", border: "1px solid #e2e8f0", boxShadow: "0 10px 30px rgba(5,46,71,0.04)" }}>
                  <div className="subservice-inline-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px", marginBottom: "30px" }}>
                    
                    {/* Full Name */}
                    <div>
                      <label style={{ display: "block", fontSize: "0.95rem", fontWeight: "700", color: "var(--dark-deep)", marginBottom: "8px" }}>Full Name</label>
                      <div className="inline-input-wrapper" style={{ position: "relative" }}>
                        <span className="inline-input-icon" style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", zIndex: 5 }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                        </span>
                        <input 
                          type="text" 
                          name="name"
                          required
                          value={inlineData.name}
                          onChange={handleInlineChange}
                          placeholder="Enter your name"
                          style={{ width: "100%", padding: "14px 16px 14px 48px", border: "1px solid #cbd5e1", borderRadius: "10px", fontSize: "0.95rem", background: "var(--white)", color: "var(--dark-deep)" }}
                        />
                      </div>
                    </div>

                    {/* Email Address */}
                    <div>
                      <label style={{ display: "block", fontSize: "0.95rem", fontWeight: "700", color: "var(--dark-deep)", marginBottom: "8px" }}>Email Address</label>
                      <div className="inline-input-wrapper" style={{ position: "relative" }}>
                        <span className="inline-input-icon" style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", zIndex: 5 }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                          </svg>
                        </span>
                        <input 
                          type="email" 
                          name="email"
                          required
                          value={inlineData.email}
                          onChange={handleInlineChange}
                          placeholder="Enter your email"
                          style={{ width: "100%", padding: "14px 16px 14px 48px", border: "1px solid #cbd5e1", borderRadius: "10px", fontSize: "0.95rem", background: "var(--white)", color: "var(--dark-deep)" }}
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label style={{ display: "block", fontSize: "0.95rem", fontWeight: "700", color: "var(--dark-deep)", marginBottom: "8px" }}>Phone Number</label>
                      <div className="inline-input-wrapper" style={{ position: "relative" }}>
                        <span className="inline-input-icon" style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", zIndex: 5 }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                          </svg>
                        </span>
                        <input 
                          type="tel" 
                          name="phone"
                          required
                          value={inlineData.phone}
                          onChange={handleInlineChange}
                          placeholder="Enter your phone"
                          style={{ width: "100%", padding: "14px 16px 14px 48px", border: "1px solid #cbd5e1", borderRadius: "10px", fontSize: "0.95rem", background: "var(--white)", color: "var(--dark-deep)" }}
                        />
                      </div>
                    </div>

                    {/* How did you hear about us? */}
                    <div>
                      <label style={{ display: "block", fontSize: "0.95rem", fontWeight: "700", color: "var(--dark-deep)", marginBottom: "8px" }}>How did you hear about us?</label>
                      <div className="inline-input-wrapper" style={{ position: "relative" }}>
                        <span className="inline-input-icon" style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", zIndex: 5 }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 12v8a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-8H4z" />
                            <path d="M10 6h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4V6z" />
                            <path d="M16 8l4-3v14l-4-3" />
                            <line x1="2" y1="10" x2="4" y2="10" />
                            <line x1="2" y1="14" x2="4" y2="14" />
                          </svg>
                        </span>
                        <select 
                          name="source"
                          value={inlineData.source}
                          onChange={handleInlineChange}
                          style={{ width: "100%", padding: "14px 16px 14px 48px", border: "1px solid #cbd5e1", borderRadius: "10px", fontSize: "0.95rem", background: "var(--white)", color: "var(--dark-deep)" }}
                        >
                          <option value="">-- Select Source --</option>
                          <option value="google">Google Search</option>
                          <option value="social">Social Media (Instagram/LinkedIn/Facebook)</option>
                          <option value="referral">Friend/Referral</option>
                          <option value="ads">Advertisement</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                  </div>

                  <button 
                    type="submit" 
                    disabled={inlineSubmitting}
                    style={{
                      width: "100%",
                      background: "var(--accent-orange)",
                      color: "var(--white)",
                      padding: "16px",
                      borderRadius: "10px",
                      fontWeight: "700",
                      fontSize: "1rem",
                      border: "none",
                      cursor: inlineSubmitting ? "not-allowed" : "pointer",
                      boxShadow: "var(--shadow-orange)",
                      opacity: inlineSubmitting ? 0.8 : 1,
                      transition: "all 0.2s"
                    }}
                  >
                    {inlineSubmitting ? "Submitting..." : "Get Free Consultation"}
                  </button>
                </form>
              )}
            </div>
          )}

        </div>
      </section>

      {/* 6. Lead Capture Modal */}
      {modalOpen && (
        <div className="modal-overlay" style={{ position: "fixed", inset: 0, background: "rgba(3,24,37,0.7)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: "20px" }}>
          <div className="modal-content" style={{ background: "#ffffff", borderRadius: "20px", width: "100%", maxWidth: "480px", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)", overflow: "hidden", position: "relative" }}>
            
            {/* Close Button */}
            <button 
              onClick={closeModal}
              style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", fontSize: "20px", color: "var(--secondary-slate)", cursor: "pointer", fontWeight: "bold" }}
            >
              ✕
            </button>

            {!success ? (
              <form onSubmit={handleUnlockSubmit} style={{ padding: "40px 30px" }}>
                <h3 style={{ fontFamily: "var(--font-headings)", color: "var(--dark-deep)", fontSize: "1.45rem", fontWeight: "800", marginBottom: "8px", textAlign: "center" }}>
                  Unlock Package Details
                </h3>
                <p style={{ color: "var(--secondary-slate)", fontSize: "0.9rem", textAlign: "center", marginBottom: "28px" }}>
                  Enter your details to instantly view our comprehensive checklists and pricing models.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", color: "var(--dark-deep)", marginBottom: "6px" }}>Full Name *</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe"
                      style={{ width: "100%", padding: "12px 16px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "0.95rem", color: "var(--dark-deep)" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", color: "var(--dark-deep)", marginBottom: "6px" }}>Email Address *</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. john@company.com"
                      style={{ width: "100%", padding: "12px 16px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "0.95rem", color: "var(--dark-deep)" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", color: "var(--dark-deep)", marginBottom: "6px" }}>Phone Number *</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 98765 43210"
                      style={{ width: "100%", padding: "12px 16px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "0.95rem", color: "var(--dark-deep)" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", color: "var(--dark-deep)", marginBottom: "6px" }}>Company Name (Optional)</label>
                    <input 
                      type="text" 
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="e.g. Acme Corp"
                      style={{ width: "100%", padding: "12px 16px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "0.95rem", color: "var(--dark-deep)" }}
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={submitting}
                  style={{
                    width: "100%",
                    background: "var(--accent-orange)",
                    color: "var(--white)",
                    padding: "14px",
                    borderRadius: "8px",
                    fontWeight: "700",
                    fontSize: "0.95rem",
                    border: "none",
                    cursor: submitting ? "not-allowed" : "pointer",
                    boxShadow: "var(--shadow-orange)",
                    opacity: submitting ? 0.8 : 1,
                    transition: "all 0.2s"
                  }}
                >
                  {submitting ? "Processing..." : "Unlock Full Packages"}
                </button>
              </form>
            ) : (
              <div style={{ padding: "50px 30px", textAlign: "center" }}>
                <div style={{ width: "60px", height: "60px", background: "#e6f4ea", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px auto", color: "#10b981", fontSize: "30px" }}>
                  ✓
                </div>
                <h3 style={{ fontFamily: "var(--font-headings)", color: "var(--dark-deep)", fontSize: "1.45rem", fontWeight: "800", marginBottom: "12px" }}>
                  Successfully Unlocked!
                </h3>
                <p style={{ color: "var(--secondary-slate)", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "24px" }}>
                  Thank you! The package feature list has been fully updated and is now fully visible behind this modal.
                </p>
                <button 
                  onClick={closeModal}
                  style={{
                    background: "var(--primary-blue)",
                    color: "var(--white)",
                    padding: "10px 24px",
                    borderRadius: "6px",
                    fontWeight: "700",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  View Details
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 7. Footer */}
      <footer className="footer mt-auto">
        <div className="footer-container">
          <div className="footer-brand">
            <FooterLogo />
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
              <li><Link href="/services/ecommerce-app">Ecommerce Application</Link></li>
              <li><Link href="/services/video-production">Video Production</Link></li>
              <li><Link href="/services/software-development">Software Development</Link></li>
              <li><Link href="/services/aeo">AEO (Answer Engine)</Link></li>
              <li><Link href="/services/geo">GEO (Google Engine)</Link></li>
              <li><Link href="/services/youtube-seo">YouTube SEO</Link></li>
              <li><Link href="/services/youtube-ads">YouTube Ads</Link></li>
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

        <div className="footer-bottom">
          <p>© 2026 Ananya Hi Solutions. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
