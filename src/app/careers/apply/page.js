"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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

// Wrapper component to safely access search params inside Suspense context
function ApplyFormContent() {
  const searchParams = useSearchParams();
  const jobIdParam = searchParams.get("jobId");

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [targetJob, setTargetJob] = useState(null);

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [message, setMessage] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeName, setResumeName] = useState("");

  // Submit and Validation States
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState("");

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

  // Fetch jobs to resolve jobIdParam details
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs");
        if (res.ok) {
          const data = await res.json();
          setJobs(data);
          if (jobIdParam) {
            const found = data.find((j) => j.id === jobIdParam);
            if (found) {
              setTargetJob(found);
            }
          }
        }
      } catch (err) {
        console.error("Failed to load jobs:", err);
      }
    };
    fetchJobs();
  }, [jobIdParam]);

  // Handle resume selection & extension checking
  const handleFileChange = (e) => {
    setFormError("");
    const file = e.target.files?.[0];
    if (!file) return;

    const nameLower = file.name.toLowerCase();
    const isAllowed = nameLower.endsWith(".pdf") || nameLower.endsWith(".doc") || nameLower.endsWith(".docx");

    if (!isAllowed) {
      setFormError("Invalid file type. Only PDF and Word documents (.pdf, .doc, .docx) are accepted.");
      setResumeFile(null);
      setResumeName("");
      e.target.value = ""; // clear input
      return;
    }

    setResumeFile(file);
    setResumeName(file.name);
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setLoading(true);

    // 1. Double check validation of mandatory fields
    if (!fullName.trim() || !email.trim() || !phone.trim() || !message.trim() || !resumeFile) {
      setFormError("Please fill out all required fields and upload your resume.");
      setLoading(false);
      return;
    }

    try {
      // 2. Build FormData payload
      const payload = new FormData();
      payload.append("name", fullName);
      payload.append("email", email);
      payload.append("phone", phone);
      payload.append("portfolio", portfolio);
      payload.append("message", message);
      payload.append("jobId", targetJob ? targetJob.id : "general");
      payload.append("jobTitle", targetJob ? targetJob.title : "General Career Opening");
      payload.append("resume", resumeFile);

      // 3. Post data to route API
      const res = await fetch("/api/apply", {
        method: "POST",
        body: payload
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess(true);
        // Clear state
        setFullName("");
        setEmail("");
        setPhone("");
        setPortfolio("");
        setMessage("");
        setResumeFile(null);
        setResumeName("");
      } else {
        setFormError(data.error || "Failed to submit application. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setFormError("Network error occurred. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>

          <ul className="nav-links">
            <li><Link href="/" className="nav-link">Home</Link></li>
            <li><Link href="/about" className="nav-link">About</Link></li>
            <li><Link href="/services" className="nav-link">Services</Link></li>
            <li><Link href="/careers" className="nav-link active">Careers</Link></li>
            <li><Link href="/blog" className="nav-link">Blog</Link></li>
            <li><Link href="/contact" className="nav-link">Contact us</Link></li>
          </ul>

          <div className="nav-cta">
            <Link href="/contact" className="btn btn-primary">Choose Package</Link>
          </div>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="fixed inset-0 top-[70px] bg-white z-[999] flex flex-col p-6 gap-6 shadow-lg md:hidden animate-slide-in">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold border-b pb-2">Home</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold border-b pb-2">About</Link>
            <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold border-b pb-2">Services</Link>
            <Link href="/careers" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold border-b pb-2">Careers</Link>
            <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold border-b pb-2">Blog</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold border-b pb-2">Contact us</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="btn btn-accent text-center mt-4">Choose Package</Link>
          </div>
        )}
      </header>

      {/* Hero Banner Section */}
      <section className="contact-hero">
        <div className="contact-hero-content container animate-slide-in">
          <span className="text-accent-orange font-bold text-sm uppercase tracking-wider block mb-2">Join the crew</span>
          <h1>Application <span>Form</span></h1>
          <p>
            {targetJob ? `Applying for: ${targetJob.title}` : "Fill out your details to join our expert Hyderabad team!"}
          </p>
        </div>
      </section>

      {/* Main Application Form Area */}
      <section className="section py-20" style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <div className="container max-w-2xl mx-auto px-6" style={{ maxWidth: "680px" }}>
          <div className="glass-card" style={{ background: "#ffffff", border: "1px solid rgba(15, 117, 188, 0.12)", borderRadius: "16px", padding: "40px", boxShadow: "0 20px 40px -10px rgba(15, 117, 188, 0.08)", color: "var(--dark-deep)", relative: "true" }}>
            
            {success ? (
              <div className="text-center py-10 animate-fade-in" style={{ textAlign: "center" }}>
                <div style={{ width: "80px", height: "80px", background: "rgba(52, 211, 153, 0.1)", color: "#10b981", border: "1.5px solid rgba(52, 211, 153, 0.2)", fontSize: "38px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", margin: "0 auto 24px auto" }}>
                  ✓
                </div>
                <h2 style={{ fontSize: "24px", fontWeight: "700", color: "var(--dark-deep)", marginBottom: "12px" }}>Application Submitted!</h2>
                <p style={{ color: "#475569", fontSize: "15px", lineHeight: "1.6", maxWidth: "450px", margin: "0 auto 30px auto" }}>
                  Your profile has been processed, and a system email has been automatically dispatched to <strong>info@ananyahisolutions.com</strong>.
                  Our team will review your CV and contact you within 2-3 business days.
                </p>
                <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
                  <Link href="/careers" style={{ padding: "12px 24px", borderRadius: "6px", background: "#0f75bc", color: "#ffffff", fontWeight: "700", fontSize: "14px", textDecoration: "none" }}>
                    Job Listings
                  </Link>
                  <Link href="/" style={{ padding: "12px 24px", borderRadius: "6px", border: "1.5px solid rgba(15, 117, 188, 0.15)", color: "#475569", fontWeight: "600", fontSize: "14px", textDecoration: "none" }}>
                    Return Home
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-8" style={{ borderBottom: "1px solid rgba(15, 117, 188, 0.08)", paddingBottom: "20px", marginBottom: "30px" }}>
                  <h2 style={{ fontSize: "24px", fontWeight: "700", color: "var(--dark-deep)", margin: 0 }}>Submit Your Profile</h2>
                  {targetJob ? (
                    <div style={{ marginTop: "12px", padding: "14px", background: "var(--light-gray)", border: "1px solid rgba(15, 117, 188, 0.08)", borderRadius: "8px", fontSize: "14px", color: "#475569" }}>
                      <p style={{ margin: 0 }}>🎓 <strong>Job:</strong> {targetJob.title}</p>
                      <p style={{ margin: "6px 0 0 0" }}>📍 <strong>Department/Location:</strong> {targetJob.department} | {targetJob.location}</p>
                    </div>
                  ) : (
                    <p style={{ color: "#475569", fontSize: "14px", marginTop: "6px", margin: 0 }}>Please provide all mandatory details below to submit a general career opening application.</p>
                  )}
                </div>

                {formError && (
                  <div style={{ padding: "16px", marginBottom: "24px", background: "rgba(244, 63, 94, 0.1)", border: "1px solid rgba(244, 63, 94, 0.2)", borderRadius: "8px", color: "#e11d48", fontSize: "14px", fontWeight: "600" }}>
                    ⚠️ {formError}
                  </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  {/* Name field */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label htmlFor="appl-fullname" style={{ fontSize: "13.5px", fontWeight: "600", color: "#475569" }}>
                      Full Name <span style={{ color: "#f43f5e" }}>*</span>
                    </label>
                    <input
                      id="appl-fullname"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        background: "#ffffff",
                        border: "1.5px solid rgba(15, 117, 188, 0.15)",
                        borderRadius: "8px",
                        color: "#1e293b",
                        fontSize: "14px",
                        outline: "none"
                      }}
                      required
                    />
                  </div>

                  {/* Contact Fields Row */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <label htmlFor="appl-email" style={{ fontSize: "13.5px", fontWeight: "600", color: "#475569" }}>
                        Email Address <span style={{ color: "#f43f5e" }}>*</span>
                      </label>
                      <input
                        id="appl-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="rahul@example.com"
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          background: "#ffffff",
                          border: "1.5px solid rgba(15, 117, 188, 0.15)",
                          borderRadius: "8px",
                          color: "#1e293b",
                          fontSize: "14px",
                          outline: "none"
                        }}
                        required
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <label htmlFor="appl-phone" style={{ fontSize: "13.5px", fontWeight: "600", color: "#475569" }}>
                        Phone / WhatsApp <span style={{ color: "#f43f5e" }}>*</span>
                      </label>
                      <input
                        id="appl-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 XXXXX-XXXXX"
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          background: "#ffffff",
                          border: "1.5px solid rgba(15, 117, 188, 0.15)",
                          borderRadius: "8px",
                          color: "#1e293b",
                          fontSize: "14px",
                          outline: "none"
                        }}
                        required
                      />
                    </div>
                  </div>

                  {/* Portfolio URL Field */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label htmlFor="appl-portfolio" style={{ fontSize: "13.5px", fontWeight: "600", color: "#475569" }}>
                      Portfolio URL or LinkedIn (Optional)
                    </label>
                    <input
                      id="appl-portfolio"
                      type="url"
                      value={portfolio}
                      onChange={(e) => setPortfolio(e.target.value)}
                      placeholder="https://linkedin.com/in/rahulsharma"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        background: "#ffffff",
                        border: "1.5px solid rgba(15, 117, 188, 0.15)",
                        borderRadius: "8px",
                        color: "#1e293b",
                        fontSize: "14px",
                        outline: "none"
                      }}
                    />
                  </div>

                  {/* Resume Upload Browse Field */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontSize: "13.5px", fontWeight: "600", color: "#475569" }}>
                      Upload Resume / CV <span style={{ color: "#f43f5e" }}>*</span>
                    </label>
                    <div style={{ position: "relative", width: "100%", height: "90px", background: "var(--light-gray)", border: "1.5px dashed rgba(15, 117, 188, 0.2)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", width: "100%", height: "100%", zIndex: 10 }}
                        required
                      />
                      <div style={{ pointerEvents: "none", textAlign: "center", padding: "12px" }}>
                        <span style={{ fontSize: "24px", display: "block", marginBottom: "4px" }}>📁</span>
                        <span style={{ fontSize: "13px", fontWeight: "600", color: "#475569", display: "block" }}>
                          {resumeName ? `📄 Selected: ${resumeName}` : "Click to browse and upload (PDF & Word only)"}
                        </span>
                        <span style={{ fontSize: "10.5px", color: "#64748b", display: "block", marginTop: "4px" }}>Accepted Formats: .pdf, .doc, .docx</span>
                      </div>
                    </div>
                  </div>

                  {/* Message/Cover Letter Field */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label htmlFor="appl-message" style={{ fontSize: "13.5px", fontWeight: "600", color: "#475569" }}>
                      Cover Letter / Message <span style={{ color: "#f43f5e" }}>*</span>
                    </label>
                    <textarea
                      id="appl-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please introduce yourself and explain why you are qualified to join Ananya Hi Solutions..."
                      rows="4"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        background: "#ffffff",
                        border: "1.5px solid rgba(15, 117, 188, 0.15)",
                        borderRadius: "8px",
                        color: "#1e293b",
                        fontSize: "14px",
                        outline: "none",
                        resize: "none"
                      }}
                      required
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="apply-submit-btn"
                    disabled={loading}
                    style={{
                      width: "100%",
                      padding: "14px",
                      background: "linear-gradient(135deg, var(--primary-blue) 0%, #0d619c 100%)",
                      color: "#ffffff",
                      fontWeight: "700",
                      fontSize: "15px",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0 10px 15px -3px rgba(15, 117, 188, 0.3)",
                      transition: "all 0.2s"
                    }}
                  >
                    {loading ? "Submitting Application..." : "Submit Application Form"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
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
              <li><Link href="/services">Website Design</Link></li>
              <li><Link href="/services">Digital Marketing</Link></li>
              <li><Link href="/services">Mobile Application</Link></li>
              <li><Link href="/services">eCommerce Application</Link></li>
              <li><Link href="/services">Video Production</Link></li>
              <li><Link href="/services">Software Development</Link></li>
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
    </div>
  );
}

export default function ApplyPage() {
  return (
    <React.Suspense fallback={
      <div className="min-h-screen bg-[var(--light-gray)] flex flex-col items-center justify-center text-slate-800 gap-4">
        <span className="spinner-dashboard" style={{ borderColor: "var(--primary-blue)" }}></span>
        <p className="text-slate-600">Loading Application Framework...</p>
      </div>
    }>
      <ApplyFormContent />
    </React.Suspense>
  );
}
