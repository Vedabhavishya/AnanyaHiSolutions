"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

// Crisp Inline SVG Logo Component
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

// Service Icon SVG Mapper Helper
function renderServiceIcon(iconName) {
  switch (iconName) {
    case "globe":
    default:
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      );
    case "trending-up":
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 6l-9.5 9.5-5-5L1 18" />
          <path d="M17 6h6v6" />
        </svg>
      );
    case "smartphone":
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      );
    case "shopping-cart":
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      );
    case "video":
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="23 7 16 12 23 17 23 7" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
      );
    case "code":
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
          <line x1="12" y1="4" x2="12" y2="20" />
        </svg>
      );
  }
}

export default function Home() {
  // Navigation & Scroll State
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hero Carousel State
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselSlides = [
    {
      title: "We Elevate Your <span>Digital Presence</span>",
      desc: "Empowering businesses through cutting-edge web design, software solutions, and result-oriented digital marketing strategies that guarantee measurable success.",
      bg: "linear-gradient(135deg, rgba(5, 46, 71, 0.95) 0%, rgba(15, 117, 188, 0.6) 100%)",
      btn1: "Explore Services",
      btn2: "Choose Package",
    },
    {
      title: "Crafting High-Performance <span>Mobile Apps</span>",
      desc: "Stunning, scalable, and intuitive mobile solutions tailored for iOS and Android platforms to keep your customers engaged and ahead of competitors.",
      bg: "linear-gradient(135deg, rgba(5, 46, 71, 0.95) 0%, rgba(100, 132, 156, 0.7) 100%)",
      btn1: "Get a Quote",
      btn2: "View Portfolio",
    },
    {
      title: "Scale Your Sales with <span>eCommerce</span>",
      desc: "Turn your retail business into a global digital powerhouse with robust shopping carts, high conversion optimizations, and seamless checkout pipelines.",
      bg: "linear-gradient(135deg, rgba(7, 60, 90, 0.95) 0%, rgba(245, 130, 32, 0.5) 100%)",
      btn1: "Start Selling",
      btn2: "Learn More",
    },
    {
      title: "Next-Gen <span>Software Solutions</span>",
      desc: "Enterprise-grade custom software architectures engineered with modern frameworks to streamline your operations and maximize productivity.",
      bg: "linear-gradient(135deg, rgba(5, 46, 71, 0.95) 0%, rgba(15, 117, 188, 0.7) 100%)",
      btn1: "Consult Experts",
      btn2: "Tech Stack",
    },
    {
      title: "Dominate Search with <span>Digital Marketing</span>",
      desc: "Result-driven SEO, Google Ads, and high-impact social media campaigns meticulously tuned to supercharge your ROI and online authority.",
      bg: "linear-gradient(135deg, rgba(7, 60, 90, 0.95) 0%, rgba(245, 130, 32, 0.65) 100%)",
      btn1: "Boost Rankings",
      btn2: "Contact Us",
    },
  ];

  // Auto scroll carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [carouselSlides.length]);

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

  // ----------------------------------------------------
  // DYNAMIC FETCH STATES
  // ----------------------------------------------------
  const [services, setServices] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [blogs, setBlogs] = useState([]);

  // Frontend Careers Modals states
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);
  const [applyLoading, setApplyLoading] = useState(false);

  // Application fields
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [applicantPortfolio, setApplicantPortfolio] = useState("");
  const [applicantMessage, setApplicantMessage] = useState("");
  const [resumeName, setResumeName] = useState("");

  // Frontend Blogs Modals states
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showBlogModal, setShowBlogModal] = useState(false);

  // Fetch dynamic content on mount
  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        const [resServices, resJobs, resBlogs] = await Promise.all([
          fetch("/api/services"),
          fetch("/api/jobs"),
          fetch("/api/blogs")
        ]);

        if (resServices.ok) {
          const dataServices = await resServices.json();
          setServices(dataServices);
        }
        if (resJobs.ok) {
          const dataJobs = await resJobs.json();
          setJobs(dataJobs);
        }
        if (resBlogs.ok) {
          const dataBlogs = await resBlogs.json();
          setBlogs(dataBlogs);
        }
      } catch (err) {
        console.error("Failed to load dynamic database components:", err);
      }
    };

    fetchHomepageData();
  }, []);

  // Client Onboarding Process State
  const [activeStep, setActiveStep] = useState(0);
  const processSteps = [
    {
      num: 1,
      title: "Discovery & Analysis",
      detail: "We kick off our collaboration with a thorough discovery phase, analyzing your business landscape, defining requirements, and mapping key project goals.",
      icon: "🔍",
    },
    {
      num: 2,
      title: "Strategy & Planning",
      detail: "Our technical architects and strategists design a custom project blueprint, selecting optimal frameworks, database layouts, and project milestones.",
      icon: "📋",
    },
    {
      num: 3,
      title: "Design & Development",
      detail: "Our creative designers and Next.js developers bring the vision to life, building responsive interfaces and robust backend integration with premium visuals.",
      icon: "💻",
    },
    {
      num: 4,
      title: "Testing & Optimization",
      detail: "We run exhaustive multi-device tests, optimize SEO tags, inspect load times, and implement security protocols to guarantee flawless launch status.",
      icon: "🛡️",
    },
    {
      num: 5,
      title: "Launch & Support",
      detail: "We deploy the systems to your cloud environments, organize onboarding training, and provide ongoing updates to fuel your startup's growth.",
      icon: "🚀",
    },
  ];

  // Tools State
  const tools = [
    { name: "Google Analytics", logo: "/tools/google-analytics.svg", desc: "User Traffic Auditing" },
    { name: "Google Search Console", logo: "/tools/google-search-console.svg", desc: "SEO Indexing Control" },
    { name: "Google Ads", logo: "/tools/google-ads.svg", desc: "Targeted Paid Traffic" },
    { name: "Bing Webmaster", logo: "/tools/bing-webmaster.svg", desc: "Search Engine Presence" },
    { name: "Facebook Ads", logo: "/tools/facebook-ads.svg", desc: "Social Media Campaigns" },
    { name: "SE Ranking", logo: "/tools/se-ranking.svg", desc: "Rank Tracking & Audits" },
    { name: "Canva", logo: "/tools/canva.svg", desc: "Branded Creative Graphics" },
    { name: "Hootsuite", logo: "/tools/hootsuite.svg", desc: "Social Scheduler Panel" },
    { name: "Grammarly", logo: "/tools/grammarly.svg", desc: "Flawless Copywriting Checks" },
    { name: "Moz", logo: "/tools/moz.svg", desc: "Domain Authority & SEO" },
  ];

  // Reviews State
  const reviews = [
    {
      name: "Rajesh Kumar",
      role: "Founder, TechVibe Solutions",
      stars: 5,
      text: "Ananya Hi Solutions completely transformed our legacy platform. Their web design is outstanding, sleek, and loading speeds have drastically improved, which immediately raised our conversion rates by 42%!",
      initials: "RK",
    },
    {
      name: "Sarah D'Souza",
      role: "Global Marketing Director, Elevate Retail",
      stars: 5,
      text: "The search rankings speak for themselves. Their digital marketing gurus boosted our organic visibility by 150% in under three months! A highly communicative and reliable partner.",
      initials: "SD",
    },
    {
      name: "Vignesh Rao",
      role: "CTO, QuickCart Logistics",
      stars: 5,
      text: "Their mobile app development is pure art. They created a highly responsive shopping interface using Next.js APIs that our clients absolutely love. Extremely clean code structures.",
      initials: "VR",
    },
    {
      name: "Priyanka Sharma",
      role: "Brand Director, MedLife Systems",
      stars: 5,
      text: "From complete UI/UX wireframing to custom software integration, the crew at Ananya Hi Solutions proved to be technical giants. Highly professional, responsive, and creative.",
      initials: "PS",
    },
  ];

  // FAQ State
  const [activeFaq, setActiveFaq] = useState(0);
  const faqs = [
    {
      q: "What services does Ananya Hi Solutions provide in Hyderabad?",
      a: "Ananya Hi Solutions offers comprehensive digital services including website design and development, digital marketing (SEO, PPC, social media), mobile application development, e-commerce solutions, video production, and custom software development. We provide end-to-end digital transformation solutions for businesses of all sizes.",
    },
    {
      q: "How does Ananya Hi Solutions ensure quality in digital marketing campaigns?",
      a: "We employ data-driven strategies with continuous monitoring and optimization. Our certified digital marketing experts use advanced analytics, A/B testing, and industry-leading tools to track KPIs, measure ROI, and refine campaigns for maximum performance. We provide transparent monthly reports showing measurable results.",
    },
    {
      q: "What makes Ananya Hi Solutions different from other digital agencies in Hyderabad?",
      a: "Our key differentiators include 10+ years of proven experience, a team of certified experts, integrated service offerings under one roof, customized solutions rather than templates, transparent pricing, dedicated account management, and a proven track record of delivering measurable ROI for clients across diverse industries.",
    },
    {
      q: "How long does it typically take to complete a website design project?",
      a: "Project timelines vary based on complexity and requirements. A standard business website takes 4-6 weeks, while complex e-commerce platforms or custom web applications may take 8-12 weeks. We provide detailed project timelines during consultation and maintain regular communication throughout the development process.",
    },
    {
      q: "What industries does Ananya Hi Solutions specialize in serving?",
      a: "We have extensive experience serving diverse industries including e-commerce, healthcare, education, real estate, manufacturing, finance, technology startups, hospitality, and professional services. Our adaptable approach allows us to understand unique industry challenges and deliver tailored solutions that drive results in any sector.",
    },
  ];

  // Chat Widget State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: "bot", text: "Hello! Welcome to Ananya Hi Solutions. I am Ananya, your digital assistant. How can I help you grow your business today?" },
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, chatOpen]);

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userMsg = chatMessage;
    setChatHistory((prev) => [...prev, { sender: "user", text: userMsg }]);
    setChatMessage("");

    // Simulate intelligent helper responses
    setTimeout(() => {
      let reply = "Thank you for reaching out! I've logged your request. Our digital consultants will contact you at info@ananyahisolutions.com shortly, or you can ring us at (+91) 76739-35353.";
      
      const lower = userMsg.toLowerCase();
      if (lower.includes("price") || lower.includes("cost") || lower.includes("package") || lower.includes("quote")) {
        reply = "We offer tailor-made pricing! Our basic web design packages start from very competitive rates, and customized software packages depend on features. Please drop your email or WhatsApp number and I will have a custom quote dispatched to you instantly!";
      } else if (lower.includes("service") || lower.includes("web") || lower.includes("marketing") || lower.includes("app")) {
        reply = "We specialize in Web Design, Digital Marketing, Mobile Apps, eCommerce solutions, Software Development, and Video Production. Which specific solution are you looking to implement first?";
      } else if (lower.includes("job") || lower.includes("career") || lower.includes("hire") || lower.includes("work")) {
        reply = "We are always on the hunt for passionate developers, SEO wizards, and content creators! Please email your updated CV to info@ananyahisolutions.com and our HR team will review it.";
      } else if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
        reply = "Hi there! I am thrilled to assist you. Tell me, are we looking to develop a beautiful website, optimize your SEO, or build custom software?";
      }

      setChatHistory((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 1000);
  };

  const handleSuggestionClick = (text) => {
    setChatHistory((prev) => [...prev, { sender: "user", text: text }]);
    setTimeout(() => {
      let reply = "";
      if (text.includes("Web Design")) {
        reply = "Our web designs are engineered with Next.js for maximum performance, premium visual aesthetics, responsive views, and seamless search engine crawling. Would you like a free UI audit of your current site?";
      } else if (text.includes("Marketing")) {
        reply = "Our Digital Marketing covers Google Search, social media retargeting, and full-funnel content design. We focus purely on conversion rates and ROI. Do you have a monthly budget in mind?";
      } else if (text.includes("Contact info")) {
        reply = "You can visit our headquarters at: 401 Sravya Vatika, Greenlands, Begumpet, Hyderabad, Telangana-500016. Alternatively, call us at (+91) 76739-35353 or email info@ananyahisolutions.com.";
      }
      setChatHistory((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Header & Navigation Bar */}
      <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
          <a href="#home" className="flex items-center">
            <Logo />
          </a>

          {/* Desktop Nav Links */}
          <ul className="nav-links">
            <li><a href="#home" className="nav-link active">Home</a></li>
            <li><Link href="/about" className="nav-link">About</Link></li>
            <li><a href="#services" className="nav-link">Services</a></li>
            <li><a href="#careers" className="nav-link">Careers</a></li>
            <li><a href="#blog" className="nav-link">Blog</a></li>
            <li><Link href="/contact" className="nav-link">Contact us</Link></li>
          </ul>

          <div className="nav-cta">
            <a href="#pricing" className="btn btn-primary">Choose Package</a>
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
            <a href="#home" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold border-b pb-2">Home</a>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold border-b pb-2">About</Link>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold border-b pb-2">Services</a>
            <a href="#careers" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold border-b pb-2">Careers</a>
            <a href="#blog" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold border-b pb-2">Blog</a>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold border-b pb-2">Contact us</Link>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="btn btn-accent text-center mt-4">Choose Package</a>
          </div>
        )}
      </header>

      {/* 2. Hero Carousel Banners */}
      <section id="home" className="hero-carousel">
        {carouselSlides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === activeSlide ? "active" : ""}`}
            style={{ background: slide.bg }}
          >
            <div className="carousel-overlay"></div>
            <div className="carousel-content">
              <h1
                className="carousel-title"
                dangerouslySetInnerHTML={{ __html: slide.title }}
              />
              <p className="carousel-desc">{slide.desc}</p>
              <div className="carousel-buttons">
                <a href="#services" className="btn btn-accent">{slide.btn1}</a>
                <a href="#pricing" className="btn btn-outline" style={{ color: "#fff", borderColor: "#fff" }}>{slide.btn2}</a>
              </div>
            </div>
          </div>
        ))}

        {/* Controls */}
        <button
          className="carousel-nav-btn carousel-prev"
          onClick={() => setActiveSlide((prev) => (prev === 0 ? carouselSlides.length - 1 : prev - 1))}
          aria-label="Previous Slide"
        >
          ‹
        </button>
        <button
          className="carousel-nav-btn carousel-next"
          onClick={() => setActiveSlide((prev) => (prev + 1) % carouselSlides.length)}
          aria-label="Next Slide"
        >
          ›
        </button>

        {/* Indicators */}
        <div className="carousel-dots">
          {carouselSlides.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === activeSlide ? "active" : ""}`}
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 3. Services Provided as Cards (DYNAMIC FROM DATABASE) */}
      <section id="services" className="section section-bg-alt">
        <div className="container">
          <div className="section-header">
            <h2>Our Core Services</h2>
            <p>We deliver cutting-edge digital experiences engineered to skyrocket efficiency and brand value.</p>
          </div>

          <div className="services-grid">
            {services.length === 0 ? (
              <div className="text-center py-8 col-span-full">
                <span className="spinner-dashboard"></span>
                <p className="text-slate-400 mt-4">Connecting with databases...</p>
              </div>
            ) : (
              services.map((item) => (
                <div key={item.id} className="service-card glass">
                  <div className="service-icon-wrapper">
                    {renderServiceIcon(item.iconName)}
                  </div>
                  <h3 className="service-title">{item.title}</h3>
                  <p className="service-desc">{item.desc}</p>
                  <Link href={`/contact?service=${item.id}`} className="service-learn-more">
                    Learn More <span>→</span>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 4. Client Onboarding Process Section (Curvy SVG Path) */}
      <section id="process" className="process-section">
        <div className="container">
          <div className="section-header">
            <h2>Client Onboarding Process</h2>
            <p>A structured, collaborative onboarding journey designed to deliver tailored digital solutions with maximum precision.</p>
          </div>

          {/* Interactive Curvy Wave Container */}
          <div className="process-container">
            {/* SVG Curvy wave path matching Image 2 */}
            <svg className="process-svg-container" width="1200" height="450" viewBox="0 0 1200 450">
              <path
                id="wavePath"
                className="process-svg-path"
                d="M 60,240 C 200,320 280,100 370,120 C 470,140 540,360 635,320 C 720,285 780,100 890,140 C 980,170 1020,330 1140,230"
              />
              {/* Paper Plane Flying along path */}
              <g className="process-paper-plane">
                <path
                  d="M1.94 13.91L29.6 1.15c.67-.3 1.45.2 1.34.93L26.68 28.5a.69.69 0 0 1-1.12.44L16.48 21.6 11.23 27a.5.5 0 0 1-.85-.35v-5.62l15.3-15.82c.16-.16-.06-.41-.26-.27L6.87 18.9 1.14 14.65a.69.69 0 0 1 .8-1.14z"
                  fill="var(--primary-blue)"
                />
              </g>
            </svg>

            {/* Interactive Steps positioned dynamically */}
            {processSteps.map((step, idx) => (
              <div
                key={step.num}
                className={`process-step process-step-${step.num} ${idx === activeStep ? "active" : ""}`}
                onMouseEnter={() => setActiveStep(idx)}
              >
                <span className="process-step-num">0{step.num}</span>
                <div className="process-node">
                  {step.num}
                </div>
                <div className="process-icon">{step.icon}</div>
                <h4 className="process-step-title">{step.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Tools We Use Section (Marquee / Grid) */}
      <section id="tools" className="section section-bg-alt">
        <div className="container">
          <div className="section-header">
            <h2>Core Technology Stack</h2>
            <p>We leverage industry-leading tools to provide robust tracking, high designs, and superior execution speeds.</p>
          </div>

          <div className="tools-grid">
            {tools.map((tool, idx) => (
              <div key={idx} className="tool-card" title={`${tool.name} - ${tool.desc}`}>
                <img src={tool.logo} alt={tool.name} className="tool-logo-img" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Review cards */}
      <section id="reviews" className="section">
        <div className="container">
          <div className="section-header">
            <h2>Success Stories</h2>
            <p>Hear what business owners and technology directors are saying about partnerships with our agency.</p>
          </div>

          <div className="reviews-grid">
            {reviews.map((rev, idx) => (
              <div key={idx} className="review-card">
                <div className="review-stars">
                  {Array.from({ length: rev.stars }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="review-text">"{rev.text}"</p>
                <div className="review-author">
                  <div className="review-avatar">
                    {rev.initials}
                  </div>
                  <div className="review-info">
                    <h4>{rev.name}</h4>
                    <p>{rev.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. DYNAMIC CAREERS / JOBS SECTION */}
      <section id="careers" className="careers-section section">
        <div className="container">
          <div className="section-header">
            <h2>Careers at Ananya</h2>
            <p>Join our Begumpet, Hyderabad team and engineer advanced digital architectures for global clients.</p>
          </div>

          <div className="careers-grid">
            {jobs.length === 0 ? (
              <div className="text-center py-10 w-full col-span-full">
                <p className="text-slate-400 italic">No job openings are currently published. Check back later!</p>
              </div>
            ) : (
              jobs.map((job) => (
                <div key={job.id} className="job-card-frontend">
                  <div className="job-card-frontend-header">
                    <h3 className="job-card-frontend-title">{job.title}</h3>
                    <div className="job-card-frontend-badges">
                      <span className="badge-frontend dept">{job.department}</span>
                      <span className="badge-frontend type">{job.type}</span>
                    </div>
                  </div>
                  
                  <div className="job-card-frontend-meta">
                    <div className="meta-item-frontend">
                      <span>📍</span> <span>{job.location}</span>
                    </div>
                    <div className="meta-item-frontend">
                      <span>💼</span> <span>{job.experience}</span>
                    </div>
                  </div>

                  <p className="job-card-frontend-desc">
                    {job.description.length > 150 ? `${job.description.slice(0, 150)}...` : job.description}
                  </p>

                  <button
                    onClick={() => {
                      setSelectedJob(job);
                      setShowApplyModal(true);
                      setApplySuccess(false);
                      setResumeName("");
                      setApplicantName("");
                      setApplicantEmail("");
                      setApplicantPhone("");
                      setApplicantPortfolio("");
                      setApplicantMessage("");
                    }}
                    className="job-card-frontend-btn"
                  >
                    View Details & Apply
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 8. DYNAMIC BLOG / NEWS SECTION */}
      <section id="blog" className="blog-section section">
        <div className="container">
          <div className="section-header">
            <h2>Insights & Tech Updates</h2>
            <p>Explore high-fidelity web design guidelines, local SEO insights, and enterprise software engineering tips.</p>
          </div>

          <div className="blog-grid">
            {blogs.length === 0 ? (
              <div className="text-center py-10 w-full col-span-full">
                <p className="text-slate-400 italic">No news updates have been published yet. Stay tuned!</p>
              </div>
            ) : (
              blogs.map((post) => (
                <div key={post.id} className="blog-card-frontend">
                  <div className="blog-card-img-wrapper">
                    <div className="blog-card-img-placeholder"></div>
                    <span className="blog-card-img-text">{post.category ? post.category.slice(0, 3) : "AHS"}</span>
                    <span className="blog-card-img-badge">{post.category || "News"}</span>
                  </div>
                  
                  <div className="blog-card-frontend-content">
                    <div>
                      <div className="blog-card-frontend-meta">
                        <span>📅 {post.date}</span>
                        <span>✍️ {post.author || "Ananya Team"}</span>
                      </div>
                      <h3 className="blog-card-frontend-title">{post.title}</h3>
                      <p className="blog-card-frontend-summary">{post.summary}</p>
                    </div>
                    
                    <button
                      onClick={() => {
                        setSelectedBlog(post);
                        setShowBlogModal(true);
                      }}
                      className="blog-card-frontend-link cursor-pointer bg-transparent border-none text-left p-0"
                    >
                      Read Full Article <span>→</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 9. Frequently Asked Questions (FAQ) */}
      <section id="faq" className="section section-bg-alt">
        <div className="container">
          <div className="section-header">
            <h2>Have Questions?</h2>
            <p>Get quick, comprehensive answers about how we design, market, and develop your custom solutions.</p>
          </div>

          <div className="faq-container">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`faq-item ${idx === activeFaq ? "active" : ""}`}
              >
                <button
                  className="faq-question"
                  onClick={() => setActiveFaq(idx === activeFaq ? -1 : idx)}
                >
                  <span>{faq.q}</span>
                  <span className="faq-toggle-icon">+</span>
                </button>
                <div
                  className="faq-answer"
                  style={{ maxHeight: idx === activeFaq ? "250px" : "0" }}
                >
                  <div className="faq-answer-content">
                    <p>{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Worldwide Delivery Map Section */}
      <section id="worldwide" className="worldwide-section">
        <div className="container">
          <div className="section-header">
            <h2>Project delivere worldwide</h2>
            <p>Delivering high-performance digital solutions globally from our headquarters in Hyderabad.</p>
          </div>

          <div className="map-container" style={{ position: 'relative' }}>
            <img 
              src="/world-map.svg?v=3" 
              alt="World Map" 
              className="map-svg" 
              style={{ width: '100%', height: 'auto', display: 'block', opacity: 1 }} 
            />

            {/* Headquarters Node - Hyderabad (Pulsing tech blue glow) */}
            <div 
              className="map-pin" 
              style={{ 
                position: 'absolute', 
                left: '73.24%', 
                top: '53.07%', 
                transform: 'translate(-50%, -50%)',
                zIndex: 10
              }}
            >
              <svg width="60" height="60" viewBox="-30 -30 60 60" style={{ overflow: 'visible', display: 'block' }} xmlns="http://www.w3.org/2000/svg">
                <circle cx="0" cy="0" r="25" className="map-pin-pulse-blue" />
                <circle cx="0" cy="0" r="8" className="map-pin-core-blue" />
                {/* Visual Label */}
                <g transform="translate(12, -12)">
                  <rect x="0" y="0" width="82" height="24" rx="4" fill="var(--dark-deep)" opacity="0.9" />
                  <text x="6" y="16" fill="#ffffff" fontFamily="var(--font-sans)" fontWeight="700" fontSize="10">HYDERABAD</text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Footer (Matching Image 5) */}
      <footer id="contact" className="footer">
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
              <li><a href="#home">Home</a></li>
              <li><Link href="/about">About Us</Link></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#pricing">Payment Terms</a></li>
              <li><a href="#blog">News</a></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Our Services</h4>
            <ul className="footer-links">
              <li><a href="#services?id=web-design">Website Design</a></li>
              <li><a href="#services?id=digital-marketing">Digital Marketing</a></li>
              <li><a href="#services?id=mobile-app">Mobile Application</a></li>
              <li><a href="#services?id=ecommerce-app">eCommerce Application</a></li>
              <li><a href="#services?id=video-production">Video Production</a></li>
              <li><a href="#services?id=software-dev">Software Development</a></li>
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

            {/* Social Icons */}
            <div className="footer-socials">
              <a href="https://facebook.com" className="footer-social-link" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="https://instagram.com" className="footer-social-link" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="https://linkedin.com" className="footer-social-link" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          <p>© 2025 Ananya Hi Solutions. All Rights Reserved.</p>
        </div>
      </footer>

      {/* 12. Interactive Chat Widget ("Hi, I'm Ananya 👋") */}
      <div className="chat-widget-container">
        {/* Closed speech bubble helper */}
        {!chatOpen && (
          <div className="chat-bubble" onClick={() => setChatOpen(true)}>
            <span>Hi, I'm Ananya 👋</span>
          </div>
        )}

        {/* Chat window panel */}
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

          {/* Quick Click Suggestions */}
          <div className="flex flex-wrap gap-2 p-3 bg-white border-t border-slate-100">
            <button
              onClick={() => handleSuggestionClick("Tell me about Web Design")}
              className="text-xs bg-slate-100 hover:bg-primary-blue hover:text-white transition-all text-slate-700 px-3 py-1.5 rounded-full font-medium"
            >
              🌐 Web Design
            </button>
            <button
              onClick={() => handleSuggestionClick("Tell me about Digital Marketing")}
              className="text-xs bg-slate-100 hover:bg-primary-blue hover:text-white transition-all text-slate-700 px-3 py-1.5 rounded-full font-medium"
            >
              📈 Marketing
            </button>
            <button
              onClick={() => handleSuggestionClick("Show Contact info")}
              className="text-xs bg-slate-100 hover:bg-primary-blue hover:text-white transition-all text-slate-700 px-3 py-1.5 rounded-full font-medium"
            >
              📞 Contact details
            </button>
          </div>

          <form onSubmit={handleSendChat} className="chat-footer">
            <input
              type="text"
              placeholder="Ask me something..."
              className="chat-input"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
            />
            <button type="submit" className="chat-send-btn" aria-label="Send message">
              ➤
            </button>
          </form>
        </div>

        {/* Trigger Button with Ananya Logo Badge */}
        <div className="chat-trigger" onClick={() => setChatOpen(!chatOpen)}>
          <div className="w-full h-full flex items-center justify-center text-3xl">
            👩‍💻
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------
         FRONTEND POPUP PORTALS / MODALS
         ---------------------------------------------------- */}

      {/* 13. Careers Apply Modal Overlay */}
      {showApplyModal && selectedJob && (
        <div className="frontend-modal-overlay animate-fade-in" onClick={() => setShowApplyModal(false)}>
          <div className="frontend-modal-card animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="frontend-modal-header">
              <h3>Apply for {selectedJob.title}</h3>
              <button className="frontend-modal-close" onClick={() => setShowApplyModal(false)}>✕</button>
            </div>
            
            <div className="frontend-modal-body">
              {applySuccess ? (
                <div className="apply-success-overlay">
                  <div className="success-badge-icon">✓</div>
                  <h3>Application Submitted!</h3>
                  <p>
                    Thank you for applying, {applicantName}! Our Begumpet recruitment crew will review your credentials and contact you at {applicantEmail} within 2-3 business days.
                  </p>
                  <button onClick={() => setShowApplyModal(false)} className="apply-submit-btn w-full">
                    Close Window
                  </button>
                </div>
              ) : (
                <>
                  <div className="apply-job-header-info">
                    <h4>{selectedJob.title}</h4>
                    <p>Department: {selectedJob.department} | Location: {selectedJob.location} | Type: {selectedJob.type}</p>
                  </div>
                  
                  <div className="job-details-group">
                    <h5>Role Description</h5>
                    <p className="text-sm text-slate-300 leading-relaxed mb-6">{selectedJob.description}</p>
                    
                    {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                      <>
                        <h5>Candidate Requirements</h5>
                        <ul className="job-requirements-list">
                          {selectedJob.requirements.map((req, idx) => (
                            <li key={idx}>{req}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                  
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setApplyLoading(true);
                      setTimeout(() => {
                        setApplyLoading(false);
                        setApplySuccess(true);
                      }, 1200);
                    }}
                    className="apply-form"
                  >
                    <div className="apply-form-group">
                      <label htmlFor="appl-name">Full Name</label>
                      <input
                        id="appl-name"
                        type="text"
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    
                    <div className="apply-form-group">
                      <label htmlFor="appl-email">Email Address</label>
                      <input
                        id="appl-email"
                        type="email"
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        placeholder="name@example.com"
                        required
                      />
                    </div>
                    
                    <div className="apply-form-group">
                      <label htmlFor="appl-phone">Phone / WhatsApp Number</label>
                      <input
                        id="appl-phone"
                        type="tel"
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        placeholder="+91 XXXXX-XXXXX"
                        required
                      />
                    </div>

                    <div className="apply-form-group">
                      <label htmlFor="appl-portfolio">Portfolio URL (Optional)</label>
                      <input
                        id="appl-portfolio"
                        type="url"
                        value={applicantPortfolio}
                        onChange={(e) => setApplicantPortfolio(e.target.value)}
                        placeholder="https://github.com/yourusername"
                      />
                    </div>
                    
                    <div className="apply-form-group">
                      <label>Upload Resume / CV (PDF/Word)</label>
                      <div className="file-input-wrapper">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          required
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setResumeName(e.target.files[0].name);
                            }
                          }}
                        />
                        <span className="file-input-label">
                          {resumeName ? `📄 ${resumeName}` : "📁 Upload PDF or Word Document"}
                        </span>
                      </div>
                    </div>
                    
                    <div className="apply-form-group">
                      <label htmlFor="appl-msg">Cover Letter / Message</label>
                      <textarea
                        id="appl-msg"
                        value={applicantMessage}
                        onChange={(e) => setApplicantMessage(e.target.value)}
                        placeholder="Why do you want to join Ananya Hi Solutions? Tell us about your background..."
                        rows="3"
                      ></textarea>
                    </div>
                    
                    <button type="submit" className="apply-submit-btn" disabled={applyLoading}>
                      {applyLoading ? "Submitting application..." : "Submit Application"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 14. Blog News Article Modal Overlay */}
      {showBlogModal && selectedBlog && (
        <div className="frontend-modal-overlay animate-fade-in" onClick={() => setShowBlogModal(false)}>
          <div className="frontend-modal-card animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="frontend-modal-header">
              <h3>Article Insights</h3>
              <button className="frontend-modal-close" onClick={() => setShowBlogModal(false)}>✕</button>
            </div>
            
            <div className="frontend-modal-body">
              <article className="blog-modal-article">
                <h2>{selectedBlog.title}</h2>
                
                <div className="blog-modal-meta">
                  <span className="blog-modal-category">{selectedBlog.category || "General"}</span>
                  <span>📅 Published: {selectedBlog.date}</span>
                  <span>✍️ Author: {selectedBlog.author || "Ananya Solutions Team"}</span>
                </div>
                
                <div className="blog-modal-content">
                  {selectedBlog.content}
                </div>
              </article>
              
              <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col gap-4">
                <p className="text-sm text-slate-400">
                  Looking to implement these exact tech secrets or SEO growth strategies in your own company? Let's consult!
                </p>
                <Link
                  href="/contact"
                  onClick={() => setShowBlogModal(false)}
                  className="btn btn-accent text-center w-full"
                  style={{ textDecoration: 'none' }}
                >
                  ✉️ Book a Free Strategy Session
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
