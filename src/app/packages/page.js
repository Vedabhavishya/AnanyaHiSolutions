"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "../components/Header";

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

const PACKAGE_CATEGORIES = [
  {
    title: "Digital Marketing Packages",
    key: "digital-marketing",
    cards: [
      {
        title: "Social Media Marketing",
        price: "Starts from ₹14,999/mo",
        features: [
          "15-18 High-Quality Creative Posts.",
          "Competitor Analysis.",
          "Paid Meta Ads.",
          "Strategy & Content Calendar"
        ],
        link: "/services/digital-marketing/smm"
      },
      {
        title: "Google Ads/PPC Ads",
        price: "Starts from ₹19,999/mo",
        features: [
          "High-intent keyword match type grouping",
          "Persuasive ad copy writing & variations testing",
          "Negative keyword exclusions list mapping",
          "Conversion pixel metrics tracking setups"
        ],
        link: "/services/digital-marketing/google-ads"
      },
      {
        title: "Search Engine Optimization (SEO)",
        price: "Starts from ₹14,999/mo",
        features: [
          "Competitor search queries profiling",
          "PageSpeed core vitals speed audits",
          "Off-page high authority backlink profiles",
          "Local SEO Maps pack optimization setups"
        ],
        link: "/services/digital-marketing/seo"
      }
    ]
  },
  {
    title: "Website Packages",
    key: "websites",
    cards: [
      {
        title: "Static Website Design",
        price: "Starts from ₹9,999",
        features: [
          "Delivery Within 3 Working Days.",
          "FREE Web Hosting & SSL for 1 year.",
          "1 Week FREE Support After Deployment.",
          "Responsive Design."
        ],
        link: "/services/web-design/static"
      },
      {
        title: "Dynamic Website",
        price: "Starts from ₹19,999",
        features: [
          "Dynamic database-driven content architectures",
          "User-friendly dynamic admin panel console",
          "Secure authentication & account access setups",
          "Automated email responder integrations"
        ],
        link: "/services/web-design/dynamic"
      },
      {
        title: "E-Commerce Website",
        price: "Starts from ₹29,999",
        features: [
          "Unlimited product listings and inventory logs",
          "Secure payment gateways (Stripe, Razorpay, UPI)",
          "Stock levels and coupons manager modules",
          "Live courier API and order tracing links"
        ],
        link: "/services/web-design/ecommerce"
      }
    ]
  },
  {
    title: "Special Packages",
    key: "special",
    cards: [
      {
        title: "Spa Packages",
        price: "Starts from ₹14,999",
        features: [
          "Blazing fast React/Vue/Next.js dynamic rendering",
          "Seamless client-side transition page routing",
          "Complex state management & animated interfaces",
          "Progressive Web App (PWA) offline capabilities"
        ],
        link: "/services/web-design/spa"
      }
    ]
  }
];

export default function PackagesPage() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState({ category: "", plan: "" });
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "" });

  const openModal = (category, plan) => {
    setSelectedPackage({ category, plan });
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUnlockSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          packageTitle: selectedPackage.category,
          subId: selectedPackage.plan
        })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to unlock.");
      
      router.push(`/packages/plans?package=${encodeURIComponent(selectedPackage.plan)}`);
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Navbar */}
      <Header activePage="packages" />

      {/* 2. Hero Section Banner */}
      <section className="page-hero">
        <div 
          className="page-hero-bg" 
          style={{ backgroundImage: "url('/images/hero/advanced-marketing.png')" }}
        />
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content container animate-slide-in">
          <span className="text-accent-orange font-bold text-sm uppercase tracking-wider block mb-2">Transparent Value</span>
          <h1>Our Service <span>Packages</span></h1>
          <p>
            Choose from our highly specialized, result-oriented marketing and web development packages. Select a plan to view features and unlock comprehensive checklists.
          </p>
        </div>
      </section>

      {/* 3. Redesigned Split Packages Section */}
      <div className="packages-split-container">
        
        {/* Left Banner Pane (Sticky desktop, top mobile) */}
        <div className="packages-left-banner">
          <img 
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80"
            alt="Ananya Digital Services"
            className="packages-banner-img"
          />
          <div className="packages-banner-overlay" />
          
          {/* Floating animated tech elements */}
          <div className="floating-icon-item" style={{ top: "15%", left: "20%", animationDelay: "0s" }}>💻</div>
          <div className="floating-icon-item" style={{ top: "30%", right: "20%", animationDelay: "1.2s" }}>📈</div>
          <div className="floating-icon-item" style={{ top: "58%", left: "15%", animationDelay: "2.4s" }}>🎥</div>
          <div className="floating-icon-item" style={{ bottom: "22%", right: "25%", animationDelay: "3.6s" }}>🤖</div>
        </div>

        {/* Right Content Pane (Scrollable) */}
        <div className="packages-right-content">
          <div style={{ marginBottom: "50px" }}>
            <span className="text-accent-orange font-bold text-sm uppercase tracking-wider block mb-2">Premium Solutions</span>
            <h2 style={{ fontFamily: "var(--font-headings)", color: "var(--dark-deep)", fontSize: "2.4rem", fontWeight: "800", margin: "0 0 16px 0" }}>
              Tailored Plans for Growth
            </h2>
            <p style={{ color: "var(--secondary-slate)", fontSize: "1.05rem", lineHeight: "1.6", margin: 0 }}>
              Select a package details overview below. Hover over each card to experience micro-interactions and select your plan.
            </p>
          </div>

          {PACKAGE_CATEGORIES.map((category) => (
            <div key={category.key} style={{ marginBottom: "50px" }}>
              <h3 className="packages-category-heading-main">{category.title}</h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {category.cards.map((card, cIdx) => (
                  <div key={cIdx} className="glass-package-card animate-slide-up">
                    <h4 style={{ fontFamily: "var(--font-headings)", color: "var(--dark-deep)", fontSize: "1.45rem", fontWeight: "800", margin: "0 0 4px 0" }}>
                      {card.title}
                    </h4>
                    
                    <div className="glass-card-price-tag">{card.price}</div>
                    
                    <ul className="glass-card-highlights">
                      {card.features.map((feat, fIdx) => (
                        <li key={fIdx} className="glass-card-highlight-item">
                          {feat}
                        </li>
                      ))}
                    </ul>
                    
                    <button 
                      onClick={() => openModal(category.title, card.title)} 
                      className="glass-card-cta-btn"
                    >
                      Enquire Plan
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Bottom CTA Area */}
          <div style={{ borderTop: "1px solid rgba(15, 117, 188, 0.08)", paddingTop: "40px", marginTop: "60px", textAlign: "center" }}>
            <h3 style={{ fontFamily: "var(--font-headings)", color: "var(--dark-deep)", fontSize: "1.5rem", fontWeight: "800", marginBottom: "12px" }}>
              Want to see all checklist points?
            </h3>
            <p style={{ color: "var(--secondary-slate)", fontSize: "0.95rem", marginBottom: "30px", maxWidth: "450px", margin: "0 auto 30px auto" }}>
              Unlock the entire dashboard comparison to explore fully detailed technical points and custom deliverables.
            </p>
            <button 
              onClick={() => openModal("All Packages", "All Categories Comparison")} 
              className="unlock-all-cta-btn"
            >
              Unlock All Packages
            </button>
          </div>
        </div>

      </div>

      {/* 4. Footer */}
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
              <li><Link href="/packages">Packages</Link></li>
              <li><Link href="/blog">Blogs</Link></li>
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

        <div className="footer-divider" />
        
        <div className="footer-bottom">
          <p>© 2026 Ananya Hi Solutions. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Lead Capture Modal */}
      {modalOpen && (
        <div className="modal-overlay" style={{ position: "fixed", inset: 0, background: "rgba(3,24,37,0.7)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: "20px" }}>
          <div className="modal-content" style={{ background: "#ffffff", borderRadius: "20px", width: "100%", maxWidth: "480px", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)", overflow: "hidden", position: "relative", animation: "modalSlideIn 0.3s ease-out" }}>
            <button 
              onClick={closeModal}
              style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", fontSize: "20px", color: "var(--secondary-slate)", cursor: "pointer", fontWeight: "bold" }}
            >✕</button>
            <form onSubmit={handleUnlockSubmit} style={{ padding: "40px 30px" }}>
              <h3 style={{ fontFamily: "var(--font-headings)", color: "var(--dark-deep)", fontSize: "1.45rem", fontWeight: "800", marginBottom: "8px", textAlign: "center" }}>
                Unlock {selectedPackage.plan}
              </h3>
              <p style={{ color: "var(--secondary-slate)", fontSize: "0.9rem", textAlign: "center", marginBottom: "28px" }}>
                Enter your details to instantly view our comprehensive checklists and pricing models.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", color: "var(--dark-deep)", marginBottom: "6px" }}>Full Name *</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="e.g. John Doe" style={{ width: "100%", padding: "12px 16px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "0.95rem", color: "var(--dark-deep)" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", color: "var(--dark-deep)", marginBottom: "6px" }}>Email Address *</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="e.g. john@company.com" style={{ width: "100%", padding: "12px 16px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "0.95rem", color: "var(--dark-deep)" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", color: "var(--dark-deep)", marginBottom: "6px" }}>Phone Number *</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="e.g. +91 98765 43210" style={{ width: "100%", padding: "12px 16px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "0.95rem", color: "var(--dark-deep)" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", color: "var(--dark-deep)", marginBottom: "6px" }}>Company Name (Optional)</label>
                  <input type="text" name="company" value={formData.company} onChange={handleInputChange} placeholder="e.g. Acme Corp" style={{ width: "100%", padding: "12px 16px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "0.95rem", color: "var(--dark-deep)" }} />
                </div>
              </div>
              <button 
                type="submit" 
                disabled={submitting}
                style={{ width: "100%", background: "var(--accent-orange)", color: "var(--white)", padding: "14px", borderRadius: "8px", fontWeight: "700", fontSize: "0.95rem", border: "none", cursor: submitting ? "not-allowed" : "pointer", boxShadow: "var(--shadow-orange)", opacity: submitting ? 0.8 : 1, transition: "all 0.2s" }}
              >
                {submitting ? "Processing..." : "Unlock Full Packages"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
