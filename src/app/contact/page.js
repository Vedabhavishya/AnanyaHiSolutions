"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Header from "../components/Header";

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

export default function ContactPage() {
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Subscription State
  const [subEmail, setSubEmail] = useState("");
  const [subSuccess, setSubSuccess] = useState(false);

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState(0);



  // Chat Widget State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: "bot", text: "Hello! Welcome to Ananya Hi Solutions. I am Ananya, your digital assistant. How can I help you contact our team today?" },
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
        reply = "We offer tailor-made pricing! Our basic web design packages start from very competitive rates. Drop your contact details right here in our message form and we will email a brochure immediately.";
      } else if (lower.includes("service") || lower.includes("web") || lower.includes("marketing") || lower.includes("app")) {
        reply = "We specialize in Web Design, Digital Marketing, Mobile Apps, eCommerce solutions, Software Development, and Video Production. You can fill out the form on this page to request a detailed call!";
      } else if (lower.includes("location") || lower.includes("address") || lower.includes("office")) {
        reply = "We are located at: 401 Sravya Vatika, Greenlands, Begumpet, Hyderabad, Telangana-500016. Clicking the location card above will open Google Maps directly!";
      }
      setChatHistory((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 1000);
  };

  const handleSuggestionClick = (msg) => {
    setChatMessage(msg);
  };

  // Form submit handler
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.message) return;
    
    // Simulate API Submission
    setFormSubmitted(true);
  };

  // Subscription submit handler
  const handleSubscribeSubmit = (e) => {
    e.preventDefault();
    if (!subEmail.trim()) return;
    setSubSuccess(true);
    setSubEmail("");
    setTimeout(() => {
      setSubSuccess(false);
    }, 5000);
  };

  // Custom FAQs
  const faqs = [
    {
      q: "What are your standard business hours in Hyderabad?",
      a: "Our standard office hours are Monday through Saturday, from 9:30 AM to 6:30 PM (IST). However, our digital support agents are available for critical queries online.",
    },
    {
      q: "How long does it take for Ananya Hi Solutions to respond to a project inquiry?",
      a: "We value your time! Our consultants typically review and respond to all email or form submissions within 2-4 business hours, providing a detailed response or scheduling a discovery call.",
    },
    {
      q: "Can I schedule a face-to-face consultation at your Begumpet office?",
      a: "Yes, absolutely! We welcome our clients to visit our headquarters at Sravya Vatika, Begumpet for in-person discussions. Please call us or send an email ahead to schedule a slot so we can ensure the appropriate technical lead is present.",
    },
    {
      q: "Do you offer free cost estimates or project proposals?",
      a: "Yes! We provide complete, customized digital strategies and itemized project quotes at absolutely zero cost. After our initial discovery call, our analysts will prepare a proposal outlining recommended frameworks, design layouts, and schedules.",
    },
    {
      q: "What is your primary method of communication during project execution?",
      a: "We believe in complete transparency. We set up dedicated communication channels via Slack or WhatsApp groups, and coordinate weekly milestone reviews through Zoom or Google Meet. Clients are also assigned a dedicated Account Manager.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Header & Navigation Bar */}
      <Header activePage="contact" />

      {/* 2. Contact Hero Section */}
      <section className="page-hero">
        <div 
          className="page-hero-bg" 
          style={{ backgroundImage: "url('/images/hero/video-production.png')" }}
        />
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content container animate-slide-in">
          <h1>Contact <span>Ananya Hi Solutions</span></h1>
          <p>
            Have a project idea or looking to accelerate your digital growth? Get in touch with our tech consultants. We design custom high-performance web, app, and marketing solutions.
          </p>
        </div>
      </section>

      {/* 3. Call, Location & Email Cards — White Background, no extra spacing */}
      <section className="contact-channels-section">
        <div className="container">
          <div className="contact-channels-grid" style={{ marginTop: 0 }}>

            {/* Phone Channel Card */}
            <div className="channel-card">
              <a href="tel:7673935353" className="w-full flex flex-col items-center">
                <div className="channel-icon-wrapper" title="Click to call">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <h3 className="channel-title">Call Us Today</h3>
                <p className="channel-desc">Talk directly to our experts to get quick consultations and quotes.</p>
                <span className="channel-link">76739 35353</span>
              </a>
            </div>

            {/* Location Channel Card */}
            <div className="channel-card">
              <a
                href="https://maps.google.com/?q=401+Sravya+Vatika,+Greenlands,+Begumpet,+Hyderabad,+Telangana-500016"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex flex-col items-center"
              >
                <div className="channel-icon-wrapper" title="Open Google Maps">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h3 className="channel-title">Visit Our Headquarters</h3>
                <p className="channel-desc">401 Sravya Vatika, Greenlands, Begumpet, Hyderabad, Telangana-500016</p>
                <span className="channel-link">Open Google Maps</span>
              </a>
            </div>

            {/* Email Channel Card */}
            <div className="channel-card">
              <a href="mailto:info@ananyahisolutions.com" className="w-full flex flex-col items-center">
                <div className="channel-icon-wrapper" title="Compose Email">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <h3 className="channel-title">Email Us Anytime</h3>
                <p className="channel-desc">Send us your technical designs, requirements sheets, or business inquiries.</p>
                <span className="channel-link">info@ananyahisolutions.com</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Send Us a Message — Grey Background */}
      <section className="contact-form-section" style={{ backgroundColor: "#f4f7f9" }}>
        <div className="container">
          <div className="contact-form-container">
            {!formSubmitted ? (
              <>
                <div className="contact-form-title">
                  <h2>Send Us a Message</h2>
                  <p>Provide your details below, and one of our dedicated digital analysts will review your query immediately.</p>
                </div>
                <form onSubmit={handleFormSubmit}>
                  <div className="contact-form-grid">
                    <div className="form-group">
                      <label className="form-label" htmlFor="contactName">Your Name *</label>
                      <input
                        id="contactName"
                        type="text"
                        required
                        placeholder="e.g. John Doe"
                        className="form-input"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="contactPhone">Phone Number *</label>
                      <input
                        id="contactPhone"
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        className="form-input"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <div className="form-group form-group-full">
                      <label className="form-label" htmlFor="contactEmail">Email Address *</label>
                      <input
                        id="contactEmail"
                        type="email"
                        required
                        placeholder="e.g. name@company.com"
                        className="form-input"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div className="form-group form-group-full">
                      <label className="form-label" htmlFor="contactMessage">Your Message *</label>
                      <textarea
                        id="contactMessage"
                        required
                        placeholder="Tell us about your project, technology requirements, or business goals..."
                        className="form-textarea"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      />
                    </div>
                  </div>
                  <button type="submit" className="form-submit-btn">Send Message</button>
                </form>
              </>
            ) : (
              <div className="form-success-overlay">
                <div className="success-icon-badge">✓</div>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you, <strong>{formData.name}</strong>. Your message has been received. Our digital consultants will analyze your request and contact you at <strong>{formData.email}</strong> shortly.</p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: "", phone: "", email: "", message: "" });
                  }}
                  className="btn btn-outline"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. FAQ Section — White Background */}
      <section className="section" style={{ background: "var(--white)" }}>
        <div className="container">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Here are quick and transparent answers to the most common questions regarding project timelines, support, and consultation.</p>
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

      {/* 6. Subscribe to Us — Grey Background */}
      <section className="subscribe-section">
        <div className="container">
          <div className="subscribe-card">
            <div className="subscribe-content">
              <div className="subscribe-text">
                <h3>Subscribe To Us</h3>
                <p>Stay updated on custom industry tech insights, design patterns, search algorithm updates, and agency announcements!</p>
              </div>
              <div className="subscribe-form-wrapper">
                <form onSubmit={handleSubscribeSubmit} className="subscribe-form">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    className="subscribe-input"
                    value={subEmail}
                    onChange={(e) => setSubEmail(e.target.value)}
                  />
                  <button type="submit" className="subscribe-btn">Subscribe</button>
                </form>
                {subSuccess && (
                  <div className="subscribe-success">
                    ✓ Thank you! You&apos;ve successfully subscribed to our newsletter.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Stay Connected — Blue Gradient */}
      <section className="stay-connected-section">
        <div className="stay-connected-inner">
          <h2>Stay Connected</h2>
          <p>Follow us on social media for updates, tips &amp; offers!</p>
          <div className="stay-connected-icons">
            {/* Facebook */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="sc-icon-link" aria-label="Facebook">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="sc-icon-link" aria-label="Instagram">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            {/* WhatsApp */}
            <a href="https://wa.me/917673935353" target="_blank" rel="noopener noreferrer" className="sc-icon-link" aria-label="WhatsApp">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.86L.057 23.859a.5.5 0 0 0 .609.61l6.101-1.497A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.52-5.16-1.427l-.36-.214-3.742.918.946-3.658-.235-.376A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="sc-icon-link" aria-label="LinkedIn">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="footer">
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

      {/* 8. Interactive Chat Widget */}
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
              onClick={() => handleSuggestionClick("Show Office location")}
              className="text-xs bg-slate-100 hover:bg-primary-blue hover:text-white transition-all text-slate-700 px-3 py-1.5 rounded-full font-medium"
            >
              📍 Office location
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
