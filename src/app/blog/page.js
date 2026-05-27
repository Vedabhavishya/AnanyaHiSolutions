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

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);

  // Modals and Blog states
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showBlogModal, setShowBlogModal] = useState(false);

  // Chat Widget State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: "bot", text: "Hello! Welcome to Ananya Hi Solutions. I am Ananya, your digital assistant. How can I help you navigate our Insights & News today?" },
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, chatOpen]);



  // Fetch blogs on mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        if (res.ok) {
          const data = await res.json();
          setBlogs(data);
        }
      } catch (err) {
        console.error("Failed to load blogs:", err);
      }
    };
    fetchBlogs();
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
      <Header activePage="blog" />

      {/* 2. Hero Section */}
      <section className="page-hero">
        <div 
          className="page-hero-bg" 
          style={{ backgroundImage: "url('/images/hero/digital-marketing.png')" }}
        />
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content container animate-slide-in">
          <h1>Ananya <span>Tech Blog</span></h1>
          <p>
            Stay ahead of the curve with expert tutorials, local marketing strategies, and deep dives into modern software engineering patterns.
          </p>
        </div>
      </section>

      {/* 3. Blog listings Grid (DYNAMIC FROM DATABASE) */}
      <section className="section section-bg-alt" style={{ flex: 1 }}>
        <div className="container">
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

      {/* 4. Footer */}
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

      {/* 5. Blog News Article Modal Overlay */}
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
              
              <div className="mt-8 pt-6 flex flex-col gap-4" style={{ borderTop: "1px solid rgba(15, 117, 188, 0.08)" }}>
                <p className="text-sm text-slate-600">
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

      {/* 6. Interactive Chat Widget */}
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
