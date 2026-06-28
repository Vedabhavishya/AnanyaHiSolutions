"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../../components/Header";

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

// Helper to recursively expand package plans inheritance (e.g. everything in basic)
const getExpandedFeatures = (plan, allPlans, visited = new Set()) => {
  if (!plan || !plan.features || visited.has(plan.name)) return [];
  visited.add(plan.name);
  
  let expanded = [];
  for (const feature of plan.features) {
    const cleanFeature = feature.trim().toLowerCase();
    
    if (cleanFeature.startsWith("everything in basic")) {
      const basicPlan = allPlans.find(p => p.name.toLowerCase().includes("basic"));
      if (basicPlan) {
        expanded = [...expanded, ...getExpandedFeatures(basicPlan, allPlans, visited)];
      } else {
        expanded.push(feature);
      }
    } else if (cleanFeature.startsWith("everything in standard")) {
      const standardPlan = allPlans.find(p => p.name.toLowerCase().includes("standard"));
      if (standardPlan) {
        expanded = [...expanded, ...getExpandedFeatures(standardPlan, allPlans, visited)];
      } else {
        expanded.push(feature);
      }
    } else {
      expanded.push(feature);
    }
  }
  return expanded;
};

export default function PackageComparePage() {
  const [allPlansData, setAllPlansData] = useState({});
  const [comparisonSlots, setComparisonSlots] = useState([
    { packageTitle: "", planName: "" },
    { packageTitle: "", planName: "" }
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch("/api/packages");
        if (res.ok) {
          const data = await res.json();
          if (data.plans) {
            setAllPlansData(data.plans);
          }
        }
      } catch (err) {
        console.error("Error fetching packages:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const addComparisonSlot = () => {
    setComparisonSlots([...comparisonSlots, { packageTitle: "", planName: "" }]);
  };

  const updateComparisonSlot = (idx, field, value) => {
    const updated = [...comparisonSlots];
    updated[idx][field] = value;
    if (field === "packageTitle") {
      updated[idx].planName = "";
    }
    setComparisonSlots(updated);
  };

  const removeComparisonSlot = (idx) => {
    const updated = comparisonSlots.filter((_, i) => i !== idx);
    setComparisonSlots(updated.length > 0 ? updated : [{ packageTitle: "", planName: "" }]);
  };

  const clearAllSlots = () => {
    setComparisonSlots([
      { packageTitle: "", planName: "" },
      { packageTitle: "", planName: "" }
    ]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* 1. Navbar */}
      <Header activePage="packages" />

      {/* 2. Hero Header */}
      <section className="page-hero" style={{ padding: "80px 0 60px 0", background: "linear-gradient(135deg, #0f75bc 0%, #1d4ed8 100%)", color: "#ffffff", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div className="page-hero-overlay" style={{ position: "absolute", inset: 0, background: "rgba(15, 117, 188, 0.05)", mixBlendMode: "overlay" }} />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <span style={{ fontSize: "0.85rem", fontWeight: "800", color: "#f58220", textTransform: "uppercase", tracking: "wider", display: "block", marginBottom: "8px" }}>Interactive Plan Matrix</span>
          <h1 style={{ fontSize: "2.75rem", fontWeight: "800", marginBottom: "12px", fontFamily: "var(--font-headings)", color: "#ffffff" }}>Compare Service Packages</h1>
          <p style={{ fontSize: "1.1rem", color: "#e0f2fe", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
            Select multiple marketing and website development packages to compare custom checklists, inclusions, GST breakdowns, and final payable rates.
          </p>
        </div>
      </section>

      {/* 3. Comparison Section */}
      <section style={{ padding: "60px 0", flex: 1 }}>
        <div className="container">
          
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "300px" }}>
              <div style={{ width: "40px", height: "40px", border: "4px solid rgba(15, 117, 188, 0.1)", borderTopColor: "#0f75bc", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              
              {/* Toolbar Actions */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
                <Link href="/packages">
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#0f75bc", fontWeight: "700", fontSize: "0.95rem", cursor: "pointer", textDecoration: "none" }}>
                    ← Back to Packages List
                  </span>
                </Link>

                <div style={{ display: "flex", gap: "12px" }}>
                  <button 
                    onClick={clearAllSlots}
                    style={{ padding: "10px 20px", border: "1px solid #cbd5e1", background: "#ffffff", borderRadius: "8px", color: "#475569", fontSize: "0.9rem", fontWeight: "700", cursor: "pointer", transition: "all 0.2s" }}
                  >
                    Clear All
                  </button>
                  <button 
                    onClick={addComparisonSlot}
                    style={{ padding: "10px 20px", border: "none", background: "#f58220", borderRadius: "8px", color: "#ffffff", fontSize: "0.9rem", fontWeight: "700", cursor: "pointer", transition: "all 0.2s", boxShadow: "0 4px 6px -1px rgba(245, 130, 32, 0.2)" }}
                  >
                    ➕ Add Another Package
                  </button>
                </div>
              </div>

              {/* Horizontal Scroll Wrapper */}
              <div style={{ overflowX: "auto", paddingBottom: "16px" }}>
                <div style={{ display: "flex", gap: "24px", minWidth: "max-content", alignItems: "stretch" }}>
                  
                  {comparisonSlots.map((slot, idx) => {
                    const categoryPlans = allPlansData[slot.packageTitle] || [];
                    const selectedPlan = categoryPlans.find(p => p.name === slot.planName);
                    
                    // Recursive resolution of features
                    const expandedFeatures = selectedPlan ? getExpandedFeatures(selectedPlan, categoryPlans) : [];
                    
                    // Parse numeric price
                    const parsePrice = (priceStr) => {
                      if (!priceStr) return 0;
                      const cleanStr = priceStr.replace(/[^\d]/g, "");
                      return parseInt(cleanStr, 10) || 0;
                    };
                    
                    const planAmount = selectedPlan ? parsePrice(selectedPlan.price) : 0;
                    const gstAmount = Math.round(planAmount * 0.18);
                    const grandTotal = planAmount + gstAmount;

                    return (
                      <div key={idx} style={{ width: "340px", background: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", display: "flex", flexDirection: "column", position: "relative" }}>
                        
                        {/* Slot Header */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid #f1f5f9", background: "#f8fafc", borderTopLeftRadius: "16px", borderTopRightRadius: "16px" }}>
                          <span style={{ fontSize: "0.75rem", fontWeight: "800", color: "#64748b", textTransform: "uppercase" }}>Slot #{idx + 1}</span>
                          {comparisonSlots.length > 1 && (
                            <button 
                              onClick={() => removeComparisonSlot(idx)}
                              style={{ background: "none", border: "none", color: "#ef4444", fontSize: "0.85rem", fontWeight: "700", cursor: "pointer" }}
                            >Remove</button>
                          )}
                        </div>

                        {/* Dropdowns */}
                        <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px", borderBottom: "1px solid #f1f5f9" }}>
                          <div>
                            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Select Package Category</label>
                            <select 
                              value={slot.packageTitle}
                              onChange={(e) => updateComparisonSlot(idx, "packageTitle", e.target.value)}
                              style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "0.875rem", color: "#0f172a", background: "#ffffff" }}
                            >
                              <option value="">-- Choose Package --</option>
                              {Object.keys(allPlansData).map((title, pIdx) => (
                                <option key={pIdx} value={title}>{title}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Select Plan</label>
                            <select 
                              value={slot.planName}
                              disabled={!slot.packageTitle}
                              onChange={(e) => updateComparisonSlot(idx, "planName", e.target.value)}
                              style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "0.875rem", color: "#0f172a", background: slot.packageTitle ? "#ffffff" : "#f1f5f9", cursor: slot.packageTitle ? "pointer" : "not-allowed" }}
                            >
                              <option value="">-- Choose Plan --</option>
                              {categoryPlans.map((plan, plIdx) => (
                                <option key={plIdx} value={plan.name}>{plan.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Content & Pricing */}
                        {selectedPlan ? (
                          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                            
                            {/* Features Scroll area */}
                            <div style={{ flex: 1, padding: "20px", overflowY: "auto", maxHeight: "380px", borderBottom: "1px solid #f1f5f9" }}>
                              <h4 style={{ margin: "0 0 12px 0", fontSize: "0.85rem", fontWeight: "800", color: "#1e293b" }}>Included Features:</h4>
                              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                                {expandedFeatures.map((feat, fIdx) => (
                                  <li key={fIdx} style={{ fontSize: "0.85rem", color: "#475569", display: "flex", alignItems: "flex-start", gap: "8px", lineHeight: "1.4" }}>
                                    <span style={{ color: "#10b981", fontWeight: "bold" }}>✓</span>
                                    <span>{feat}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Pricing summary */}
                            <div style={{ padding: "20px", background: "#f8fafc", borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px" }}>
                              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "#64748b" }}>
                                  <span>Plan Amount:</span>
                                  <span style={{ fontWeight: "600", color: "#1e293b" }}>₹{planAmount.toLocaleString("en-IN")}</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "#64748b" }}>
                                  <span>GST (18%):</span>
                                  <span style={{ fontWeight: "600", color: "#1e293b" }}>₹{gstAmount.toLocaleString("en-IN")}</span>
                                </div>
                                <div style={{ height: "1px", background: "#e2e8f0", margin: "6px 0" }} />
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1rem", fontWeight: "800" }}>
                                  <span style={{ color: "#0f75bc" }}>Grand Total:</span>
                                  <span style={{ color: "#0f75bc" }}>₹{grandTotal.toLocaleString("en-IN")}</span>
                                </div>
                              </div>
                            </div>

                          </div>
                        ) : (
                          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 20px", color: "#94a3b8", fontSize: "0.875rem", textAlign: "center", minHeight: "350px" }}>
                            Select a package and plan to compare features and cost
                          </div>
                        )}

                      </div>
                    );
                  })}

                </div>
              </div>

            </div>
          )}

        </div>
      </section>

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
    </div>
  );
}
