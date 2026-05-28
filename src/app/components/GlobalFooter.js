"use client";

import React, { useState, useEffect, useRef } from "react";
import { useServices } from "../context/ServicesContext";
import Link from "next/link";

// Crisp Inline SVG Logo Component for Footer
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

export default function GlobalFooter() {
  const { services } = useServices();
  // Chat Widget State & Handlers
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
        reply = "We are always on the hunt for passionate developers, SEO wizards, and content creators! Please email your updated CV to vedabhavishya.gudivaka@gmail.com and our HR team will review it.";
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
    <>
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
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/blog">Blogs</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-column" style={{ minWidth: '300px' }}>
            <h4>Our Services</h4>
            <ul className="footer-links" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '1rem' }}>
              {services.map((svc) => (
                <li key={svc.id}><Link href={`/services/${svc.id}`}>{svc.title}</Link></li>
              ))}
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

      {/* Interactive Chat Widget */}
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
                className={`chat-msg ${msg.sender === "bot" ? "bot-msg" : "user-msg"}`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-suggestions">
            <button onClick={() => handleSuggestionClick("Tell me about Web Design")}>
              Website Design
            </button>
            <button onClick={() => handleSuggestionClick("How does Digital Marketing work?")}>
              Marketing Services
            </button>
            <button onClick={() => handleSuggestionClick("Contact info please")}>
              Contact Info
            </button>
          </div>

          <form className="chat-input-area" onSubmit={handleSendChat}>
            <input
              type="text"
              placeholder="Ask me anything..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
            />
            <button type="submit" className="chat-send-btn" aria-label="Send message">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>

        {/* Floating rounded button */}
        <div className="chat-trigger" onClick={() => setChatOpen(!chatOpen)}>
          <div className="chat-trigger-icon">👩‍💻</div>
        </div>
      </div>
    </>
  );
}
