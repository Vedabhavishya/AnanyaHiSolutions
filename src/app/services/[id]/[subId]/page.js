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

import { SUBSERVICES_DETAIL_DATA } from "../../../../data/subservices";

export default function SubserviceDetailPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { id, subId } = params;

  // Retrieve subservice data, fallback to static website design if missing
  const data = SUBSERVICES_DETAIL_DATA[subId] || SUBSERVICES_DETAIL_DATA["static"];

  // State for package unlocking flow
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && subId) {
      if (localStorage.getItem(`unlocked_${subId}`) === "true") {
        setUnlocked(true);
      }
    }
  }, [subId]);
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
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          packageTitle: data.title,
          subId: subId
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to unlock package.");
      }

      if (typeof window !== "undefined") {
        localStorage.setItem(`unlocked_${subId}`, "true");
      }
      setUnlocked(true);
      setSuccess(true);
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
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