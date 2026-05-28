"use client";

import GlobalFooter from "../components/GlobalFooter";
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
                    {post.coverImage ? (
                      <img 
                        src={post.coverImage} 
                        alt={post.title} 
                        className="blog-card-img"
                      />
                    ) : (
                      <div className="blog-card-img-placeholder"></div>
                    )}
                    <span className="blog-card-img-text">{post.category ? post.category.slice(0, 3) : "AHS"}</span>
                    <span className="blog-card-img-badge">{post.category || "News"}</span>
                  </div>
                  
                  <div className="blog-card-frontend-content">
                    <div>
                      <div className="blog-card-frontend-meta">
                        <span>📅 {post.date}</span>
                        <span>✍️ {post.author || "Ananya Hi Solutions"}</span>
                      </div>
                      <h3 className="blog-card-frontend-title">{post.title}</h3>
                      <p className="blog-card-frontend-summary">{post.content || post.summary}</p>
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
      <GlobalFooter />

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
                {selectedBlog.coverImage && (
                  <img 
                    src={selectedBlog.coverImage} 
                    alt={selectedBlog.title} 
                    className="blog-modal-cover-image"
                    style={{
                      width: "100%",
                      maxHeight: "350px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "20px",
                      display: "block"
                    }}
                  />
                )}
                <h2>{selectedBlog.title}</h2>
                
                <div className="blog-modal-meta">
                  <span className="blog-modal-category">{selectedBlog.category || "General"}</span>
                  <span>📅 Published: {selectedBlog.date}</span>
                  <span>✍️ Author: {selectedBlog.author || "Ananya Hi Solutions"}</span>
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
