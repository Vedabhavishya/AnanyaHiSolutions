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

export default function AboutPage() {
  // Navigation & Scroll State
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // Chat Widget State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: "bot", text: "Hello! Welcome to Ananya Hi Solutions. How can I help you learn more about our company today?" },
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

    setTimeout(() => {
      let reply = "Thank you for reaching out! I've logged your request. Our digital consultants will contact you at info@ananyahisolutions.com shortly, or you can ring us at (+91) 76739-35353.";
      
      const lower = userMsg.toLowerCase();
      if (lower.includes("price") || lower.includes("cost") || lower.includes("package") || lower.includes("quote")) {
        reply = "We offer tailor-made pricing! Our basic web design packages start from very competitive rates. Drop your contact detail and we will email a brochure immediately.";
      } else if (lower.includes("service") || lower.includes("web") || lower.includes("marketing") || lower.includes("app")) {
        reply = "We specialize in Web Design, Digital Marketing, Mobile Apps, eCommerce, Software Development, and Video Production. Our HQ is based in Begumpet, Hyderabad.";
      }
      setChatHistory((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 1000);
  };

  const handleSuggestionClick = (msg) => {
    setChatMessage(msg);
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
            <li><Link href="/about" className="nav-link active">About</Link></li>
            <li><Link href="/#services" className="nav-link">Services</Link></li>
            <li><Link href="/#careers" className="nav-link">Careers</Link></li>
            <li><Link href="/#blog" className="nav-link">Blog</Link></li>
            <li><Link href="/#contact" className="nav-link">Contact us</Link></li>
          </ul>

          <div className="nav-cta">
            <Link href="/#pricing" className="btn btn-primary">Choose Package</Link>
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
            <Link href="/#services" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold border-b pb-2">Services</Link>
            <Link href="/#careers" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold border-b pb-2">Careers</Link>
            <Link href="/#blog" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold border-b pb-2">Blog</Link>
            <Link href="/#contact" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold border-b pb-2">Contact us</Link>
            <Link href="/#pricing" onClick={() => setMobileMenuOpen(false)} className="btn btn-accent text-center mt-4">Choose Package</Link>
          </div>
        )}
      </header>

      {/* 2. About Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content container">
          <h1>About <span>Ananya Hi Solutions</span></h1>
          <p>
            An industry-leading digital agency based in Hyderabad. We deliver high-performance web solutions, scalables mobile apps, and results-driven marketing strategies globally.
          </p>
        </div>
      </section>

      {/* 3. Who We Are Intro Section */}
      <section className="section">
        <div className="container">
          <div className="about-story-grid">
            <div className="about-story-visual">
              <img
                src="/about-collaboration.png"
                alt="Stylized business professionals collaborating"
                className="about-story-image"
              />
            </div>

            <div className="about-story-text">
              <h3>Who We Are</h3>
              <h2>Delivering Premium Digital Experiences Worldwide</h2>
              <p>
                Founded in 2013, Ananya Hi Solutions has evolved into one of Hyderabad's most trusted digital transformation partners. Our journey began with a simple vision: to help businesses harness the power of digital technology to achieve extraordinary growth. Today, we're proud to be a team of 50+ passionate professionals including certified digital marketers, experienced web designers, skilled developers, creative content specialists, and strategic consultants. Each team member brings specialized expertise and unwavering commitment to client success. Our core values drive everything we do: Innovation in every solution, Transparency in all communications, Excellence in execution, and Partnership in relationships. We don't just work for our clients; we work with them as strategic partners invested in their success.
              </p>
              <p>
                Over the years, we've successfully delivered 500+ projects, helping businesses across India and internationally to establish powerful digital presence, generate quality leads, and scale their operations. Our client retention rate of 95% speaks to the lasting relationships we build and the consistent value we deliver.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Mission, Vision, and Values Section */}
      <section className="section section-bg-alt">
        <div className="container">
          <div className="section-header">
            <h2>Our Core Pillars</h2>
            <p>Driving excellence, integrity, and sustainable growth for businesses across all digital landscape.</p>
          </div>

          <div className="about-mission-grid">
            <div className="about-mission-card">
              <div className="about-card-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>
                To empower brands with state-of-the-art web designs, high-performance applications, and result-oriented digital marketing strategies that guarantee growth.
              </p>
            </div>

            <div className="about-mission-card">
              <div className="about-card-icon">👁️</div>
              <h3>Our Vision</h3>
              <p>
                To be a trusted global partner recognized for client-first integrations, top-tier user experiences, scalable engineering frameworks, and transparency.
              </p>
            </div>

            <div className="about-mission-card">
              <div className="about-card-icon">💡</div>
              <h3>Our Values</h3>
              <p>
                Striving for excellence, maintaining absolute integrity and open communication, and continuously innovating our technological stack.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Statistics Showcase Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>By The Numbers</h2>
            <p>A proven track record of helping businesses reach their audience and scale operations.</p>
          </div>

          <div className="about-stats-grid">
            <div className="about-stat-card">
              <div className="about-stat-number">10+</div>
              <div className="about-stat-label">Years of Experience</div>
              <div className="about-stat-desc">Providing premium digital design and development services.</div>
            </div>

            <div className="about-stat-card">
              <div className="about-stat-number">500+</div>
              <div className="about-stat-label">Projects Completed</div>
              <div className="about-stat-desc">Delivering beautiful high-conversion sites and systems globally.</div>
            </div>

            <div className="about-stat-card">
              <div className="about-stat-number">98%</div>
              <div className="about-stat-label">Client Retention</div>
              <div className="about-stat-desc">Building long-term partnerships through stellar support.</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Footer */}
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
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/#careers">Careers</Link></li>
              <li><Link href="/#pricing">Payment Terms</Link></li>
              <li><Link href="/#blog">News</Link></li>
              <li><Link href="/#contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Our Services</h4>
            <ul className="footer-links">
              <li><Link href="/#services?id=web-design">Website Design</Link></li>
              <li><Link href="/#services?id=digital-marketing">Digital Marketing</Link></li>
              <li><Link href="/#services?id=mobile-app">Mobile Application</Link></li>
              <li><Link href="/#services?id=ecommerce-app">eCommerce Application</Link></li>
              <li><Link href="/#services?id=video-production">Video Production</Link></li>
              <li><Link href="/#services?id=software-dev">Software Development</Link></li>
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

      {/* 7. Interactive Chat Widget */}
      <div className="chat-widget-container">
        {!chatOpen && (
          <div className="chat-bubble" onClick={() => setChatOpen(true)}>
            <span>Hi, I'm Ananya 👋</span>
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

        <div className="chat-trigger" onClick={() => setChatOpen(!chatOpen)}>
          <div className="w-full h-full flex items-center justify-center text-3xl">
            👩‍💻
          </div>
        </div>
      </div>
    </div>
  );
}
