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

export default function CareersPage() {
  const [jobs, setJobs] = useState([]);

  // Details Modal state
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Chat Widget State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: "bot", text: "Hello! Welcome to Ananya Hi Solutions. I am Ananya, your digital assistant. How can I help you find your dream job today?" },
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, chatOpen]);



  // Fetch jobs on mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs");
        if (res.ok) {
          const data = await res.json();
          setJobs(data);
        }
      } catch (err) {
        console.error("Failed to load jobs:", err);
      }
    };
    fetchJobs();
  }, []);

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

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Header & Navigation Bar */}
      <Header activePage="careers" />

      {/* 2. Stunning Banner at the Starting */}
      <section className="page-hero">
        <div 
          className="page-hero-bg" 
          style={{ backgroundImage: "url('/images/hero/software-development.png')" }}
        />
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content container animate-slide-in">
          <span className="text-accent-orange font-bold tracking-widest text-sm uppercase block mb-3">Work with Experts</span>
          <h1>Careers at <span>Ananya</span></h1>
          <p>
            Join our tech innovation squad in Hyderabad and shape the future of digital enterprise products worldwide.
          </p>
        </div>
      </section>

      {/* 3. Welcome to our Careers Page Section */}
      <section className="section section-bg-alt text-center py-16" style={{ borderBottom: "1px solid #f1f5f9" }}>
        <div className="container max-w-4xl mx-auto px-6">
          <h2 className="text-slate-800 mb-6 tracking-tight text-center" style={{ fontSize: "38px", fontWeight: "800", textAlign: "center" }}>Welcome to our Careers Page</h2>
          <div className="w-16 h-1 bg-primary-blue mx-auto mb-6 rounded" style={{ marginBottom: "calc(1.5rem + 0.25cm)" }}></div>
          <p className="text-slate-600 text-lg leading-relaxed max-w-3xl mx-auto text-center">
            At Ananya Hi Solutions, we don't just build websites; we design powerful architectures and digital solutions that empower global businesses to grow. We believe in nurturing talent, pushing technical limits, and fostering an environment of creative freedom and professional growth. Whether you are a code enthusiast, a design virtuoso, or a strategic digital marketer, you will find a collaborative team that supports your journey here. Explore our active vacancies below and find your true calling!
          </p>
        </div>
      </section>

      {/* 4. Current Job Openings Section */}
      <section className="careers-section section py-20" style={{ flex: 1 }}>
        <div className="container">
          <div className="text-center mb-12" style={{ textAlign: "center" }}>
            <h2 className="text-slate-800 tracking-tight text-center" style={{ fontSize: "38px", fontWeight: "800", textAlign: "center" }}>Current Job Openings</h2>
            <p className="text-slate-600 mt-2 text-center">Explore our high-impact active roles. Find a match and apply today!</p>
          </div>

          <div className="careers-grid">
            {jobs.length === 0 ? (
              <div className="text-center py-16 w-full col-span-full" style={{ textAlign: "center" }}>
                <p className="text-slate-500 font-semibold text-center" style={{ fontSize: "22px", textAlign: "center" }}>No Current Job Openings</p>
              </div>
            ) : (
              jobs.map((job) => (
                <div key={job.id} className="job-card-frontend" style={{ minHeight: "360px" }}>
                  {/* Card TOP: displays Job Role, Qualifications, Experience, and Location */}
                  <div className="job-card-top-content">
                    <div className="flex justify-between items-start gap-4 mb-4" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", marginBottom: "16px" }}>
                      <h3 className="job-card-frontend-title" style={{ color: "var(--dark-deep)", fontSize: "20px", fontWeight: "700" }}>{job.title}</h3>
                      <span className="badge-frontend dept whitespace-nowrap" style={{ fontSize: "10px", textTransform: "uppercase" }}>{job.department}</span>
                    </div>

                    {/* Metadata indicators */}
                    <div className="job-card-frontend-meta" style={{ display: "flex", flexDirection: "column", gap: "10px", margin: "20px 0", fontSize: "13.5px" }}>
                      <div className="meta-item-frontend" style={{ display: "flex", alignItems: "center", gap: "8px", color: "#475569" }}>
                        <span style={{ fontSize: "16px", color: "var(--primary-blue)" }}>🎓</span>
                        <span><strong>Qualifications:</strong> {job.qualifications || "Any Bachelor's / Technical Degree"}</span>
                      </div>
                      <div className="meta-item-frontend" style={{ display: "flex", alignItems: "center", gap: "8px", color: "#475569" }}>
                        <span style={{ fontSize: "16px", color: "var(--primary-blue)" }}>💼</span>
                        <span><strong>Experience:</strong> {job.experience}</span>
                      </div>
                      <div className="meta-item-frontend" style={{ display: "flex", alignItems: "center", gap: "8px", color: "#475569" }}>
                        <span style={{ fontSize: "16px", color: "var(--primary-blue)" }}>📍</span>
                        <span><strong>Location:</strong> {job.location}</span>
                      </div>
                      <div className="meta-item-frontend" style={{ display: "flex", alignItems: "center", gap: "8px", color: "#475569" }}>
                        <span style={{ fontSize: "16px", color: "var(--primary-blue)" }}>⏱️</span>
                        <span><strong>Job Type:</strong> {job.type}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card BOTTOM: CTA trigger */}
                  <div className="job-card-bottom-actions" style={{ marginTop: "16px" }}>
                    <button
                      onClick={() => {
                        setSelectedJob(job);
                        setShowDetailsModal(true);
                      }}
                      className="job-card-frontend-btn"
                    >
                      Get More Details
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 5. Footer */}
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

      {/* 6. Job Details Modal Overlay */}
      {showDetailsModal && selectedJob && (
        <div className="frontend-modal-overlay animate-fade-in" onClick={() => setShowDetailsModal(false)} style={{ zIndex: 99999 }}>
          <div className="frontend-modal-card animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="frontend-modal-header">
              <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "700" }}>{selectedJob.title} Details</h3>
              <button className="frontend-modal-close" onClick={() => setShowDetailsModal(false)} aria-label="Close details">✕</button>
            </div>
            
            <div className="frontend-modal-body">
              <div className="apply-job-header-info" style={{ background: "var(--light-gray)", border: "1px solid rgba(15, 117, 188, 0.08)", padding: "20px", borderRadius: "8px", marginBottom: "24px" }}>
                <p style={{ margin: 0, fontSize: "14px", color: "#475569" }}><strong>Department:</strong> {selectedJob.department} | <strong>Location:</strong> {selectedJob.location}</p>
                <p style={{ margin: "6px 0 0 0", fontSize: "14px", color: "#475569" }}><strong>Experience:</strong> {selectedJob.experience} | <strong>Qualifications:</strong> {selectedJob.qualifications || "B.Tech/MCA/MBA or equivalent"}</p>
              </div>
              
              <div className="job-details-group">
                <h5 style={{ fontWeight: "700", fontSize: "15px", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Role Overview</h5>
                <p style={{ fontSize: "14.5px", lineHeight: "1.6", marginBottom: "24px" }}>{selectedJob.description}</p>
                
                {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                  <>
                    <h5 style={{ fontWeight: "700", fontSize: "15px", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Key Candidate Requirements</h5>
                    <ul className="job-requirements-list" style={{ marginBottom: "24px" }}>
                      {selectedJob.requirements.map((req, idx) => (
                        <li key={idx} style={{ color: "#334155" }}>{req}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
              
              <div style={{ display: "flex", gap: "16px", marginTop: "28px", paddingTop: "20px", borderTop: "1px solid rgba(15, 117, 188, 0.08)" }}>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  style={{
                    flex: 1,
                    padding: "12px 20px",
                    borderRadius: "6px",
                    border: "1.5px solid rgba(15, 117, 188, 0.15)",
                    background: "transparent",
                    color: "#475569",
                    fontWeight: "700",
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  Cancel
                </button>
                <Link
                  href={`/careers/apply?jobId=${selectedJob.id}`}
                  style={{
                    flex: 1.5,
                    padding: "12px 20px",
                    borderRadius: "6px",
                    background: "linear-gradient(135deg, var(--primary-blue) 0%, #0d619c 100%)",
                    color: "#ffffff",
                    fontWeight: "700",
                    fontSize: "14px",
                    textAlign: "center",
                    textDecoration: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 14px rgba(15, 117, 188, 0.25)",
                    transition: "all 0.2s"
                  }}
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

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
