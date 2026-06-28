"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../../components/Header";
import { PACKAGE_PLANS_DATA } from "../../../data/plans";
import Link from "next/link";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Common uniform font stack to ensure absolute visual consistency in rendering
const UNIFORM_FONT_STACK = "'Times New Roman', Times, Baskerville, Georgia, serif";

// Date formatting helper for issue date (e.g. 6th June 2026)
const getOrdinalSuffix = (day) => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
  }
};

const formatIssueDate = (date) => {
  const day = date.getDate();
  const month = date.toLocaleDateString('en-US', { month: 'long' });
  const year = date.getFullYear();
  return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
};

// Date formatting helper for browser print header (e.g. 06/06/2026, 11:02)
const formatDownloadDateTime = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year}, ${hours}:${minutes}`;
};



function PlansContent() {
  const searchParams = useSearchParams();
  const packageTitle = searchParams.get("package") || "Selected Package";
  
  // Default to empty array if no specific data exists yet for the package
  const [plansData, setPlansData] = useState([]);
  const [whiteLogoSrc, setWhiteLogoSrc] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = "/logo.png";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        
        try {
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imgData.data;
          
          for (let i = 0; i < data.length; i += 4) {
            data[i] = 255;     // R
            data[i + 1] = 255; // G
            data[i + 2] = 255; // B
          }
          
          ctx.putImageData(imgData, 0, 0);
          setWhiteLogoSrc(canvas.toDataURL());
        } catch (e) {
          console.error("Error creating white logo data url:", e);
        }
      };
    }
  }, []);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch("/api/packages");
        if (res.ok) {
          const data = await res.json();
          if (data.plans && data.plans[packageTitle]) {
            setPlansData(data.plans[packageTitle]);
          } else {
            setPlansData(PACKAGE_PLANS_DATA[packageTitle] || []);
          }
        } else {
          setPlansData(PACKAGE_PLANS_DATA[packageTitle] || []);
        }
      } catch (err) {
        console.error("Error fetching plans:", err);
        setPlansData(PACKAGE_PLANS_DATA[packageTitle] || []);
      }
    };
    fetchPlans();
  }, [packageTitle]);

  // Client Details state (pulls dynamically from localStorage/URL parameters if populated)
  const [leadInfo, setLeadInfo] = useState({
    name: "Client Name",
    company: "",
    phone: "",
    email: ""
  });

  const [downloadDateTime, setDownloadDateTime] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [generatingPdfId, setGeneratingPdfId] = useState(null);
  const [proposalCount, setProposalCount] = useState(135);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCount = localStorage.getItem("proposal_counter");
      if (savedCount) {
        setProposalCount(parseInt(savedCount, 10));
      } else {
        localStorage.setItem("proposal_counter", "135");
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // 1. Try to read from URL search parameters first
      const urlName = searchParams.get("name");
      const urlEmail = searchParams.get("email");
      const urlPhone = searchParams.get("phone");
      const urlCompany = searchParams.get("company");
      
      if (urlName) {
        const info = {
          name: urlName,
          email: urlEmail || "",
          phone: urlPhone || "",
          company: urlCompany || ""
        };
        setLeadInfo(info);
        localStorage.setItem("ahs_lead_info", JSON.stringify(info));
        return;
      }

      // 2. Fall back to localStorage
      const saved = localStorage.getItem("ahs_lead_info");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setLeadInfo({
            name: parsed.name || "Client Name",
            company: parsed.company || "",
            phone: parsed.phone || "",
            email: parsed.email || ""
          });
        } catch (e) {
          console.error("Error parsing stored lead data:", e);
        }
      }
    }
  }, [searchParams]);

  const handleWhatsAppClick = (planName) => {
    const phoneNumber = "917673935353";
    const message = `Hi Ananya Team, I'm interested in the ${planName} plan of ${packageTitle}.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  const handleDownloadInvoice = async (plan, idx) => {
    const now = new Date();
    setDownloadDateTime(formatDownloadDateTime(now));
    setIssueDate(formatIssueDate(now));

    setGeneratingPdfId(idx);
    try {
      // Small delay to ensure state updates propagate to HTML elements
      await new Promise(r => setTimeout(r, 400));
      
      const page1 = document.getElementById(`proposal-page-1-${idx}`);
      const page2 = document.getElementById(`proposal-page-2-${idx}`);
      
      if (!page1 || !page2) {
        alert("Error: Template elements not found.");
        return;
      }
      
      const doc = new jsPDF('p', 'mm', 'a4');
      
      const canvas1 = await html2canvas(page1, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      const imgData1 = canvas1.toDataURL('image/jpeg', 0.95);
      doc.addImage(imgData1, 'JPEG', 0, 0, 210, 297);
      
      const canvas2 = await html2canvas(page2, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      const imgData2 = canvas2.toDataURL('image/jpeg', 0.95);
      doc.addPage();
      doc.addImage(imgData2, 'JPEG', 0, 0, 210, 297);
      
      const sanitizedName = plan.name.replace(/\s+/g, '_');
      const sanitizedPackage = packageTitle.replace(/\s+/g, '_');
      doc.save(`Proposal_${sanitizedPackage}_${sanitizedName}.pdf`);

      // Increment proposal counter on success
      setProposalCount(prev => {
        const next = prev + 1;
        if (typeof window !== "undefined") {
          localStorage.setItem("proposal_counter", next.toString());
        }
        return next;
      });
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setGeneratingPdfId(null);
    }
  };

  return (
    <div className="plans-page-wrapper">
      <Header activePage="packages" />
      
      <section className="plans-section">
        <span className="plans-subtitle">Transparent Pricing</span>
        <h1 className="plans-title">
          Choose Your Perfect Plan
        </h1>
        <p className="plans-description">
          Choose the plan that fits your vision — and let’s build your digital success story together for <strong>{packageTitle}</strong>!
        </p>
        
        {plansData.length > 0 ? (
          <div className="plans-grid">
            {plansData.map((plan, idx) => (
              <div 
                key={idx} 
                className={`plan-card ${plan.isPopular ? 'plan-card-popular' : ''}`}
              >
                {plan.isPopular && (
                  <div className="plan-badge">
                    Most Popular
                  </div>
                )}
                
                <div className="plan-card-content">
                  <h3 className="plan-name">
                    {plan.icon && <span style={{ marginRight: '8px' }}>{plan.icon}</span>}
                    {plan.name}
                  </h3>
                  <div className="plan-price-wrapper">
                    <span className="plan-price">{plan.price}</span>
                    <span className="plan-billing">{plan.billing}</span>
                  </div>
                  
                  <ul className="plan-features-list">
                    {plan.features.map((feature, fIdx) => {
                       const isHighlighted = feature.toLowerCase().startsWith("everything in basic") || 
                                             feature.toLowerCase().startsWith("everything in standard");
                       return (
                         <li key={fIdx} className={`plan-feature-item ${isHighlighted ? 'highlighted-feature' : ''}`}>
                           <span 
                             className="feature-icon"
                             style={isHighlighted ? { color: "var(--accent-orange)" } : {}}
                           >
                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                               <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 11.22a.75.75 0 00-1.06 1.06l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                             </svg>
                           </span>
                           <span 
                             className="feature-text"
                             style={isHighlighted ? { fontWeight: "800", color: "var(--accent-orange)" } : {}}
                           >
                             {feature}
                           </span>
                         </li>
                       );
                    })}
                  </ul>

                  <div className="plan-alert-note">
                    {plan.note}
                  </div>

                  <div className="plan-action-area" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <button 
                      onClick={() => handleWhatsAppClick(plan.name)}
                      className="plan-whatsapp-btn"
                      style={{ marginBottom: 0 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                      </svg>
                      Get in Touch
                    </button>
                    
                    <button 
                      onClick={() => handleDownloadInvoice(plan, idx)}
                      disabled={generatingPdfId !== null}
                      className="plan-pdf-btn"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      {generatingPdfId === idx ? "Generating PDF..." : "Download Proposal"}
                    </button>
                    
                    <p className="plan-expert-msg">One of our experts will contact you soon.</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="plans-empty-state">
            <div className="empty-icon">🚀</div>
            <h3 className="empty-title">Plans Coming Soon!</h3>
            <p className="empty-desc">
              We are currently tailoring the perfect pricing plans for <strong>{packageTitle}</strong>. 
              Leave us a message and we'll get back to you with a custom quote!
            </p>
            <Link href="/contact" className="empty-btn">
              Contact Us Now
            </Link>
          </div>
        )}
      </section>

      {/* Hidden Templates for PDF Generation */}
      {plansData.length > 0 && plansData.map((plan, idx) => {
        const featuresPage1 = plan.features.slice(0, 15);
        const featuresPage2 = plan.features.slice(15);
        
        return (
          <div key={`pdf-template-${idx}`} style={{ position: "absolute", left: "-9999px", top: "-9999px", zIndex: -100 }}>
            {/* Page 1 */}
            <div 
              id={`proposal-page-1-${idx}`} 
              style={{
                width: "794px",
                height: "1123px",
                padding: "30px 40px 40px 40px",
                boxSizing: "border-box",
                backgroundColor: "#ffffff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                fontFamily: UNIFORM_FONT_STACK
              }}
            >
              <div>
                {/* Metadata Browser Print Header Strip */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "11px",
                  color: "#333333",
                  marginBottom: "12px",
                  padding: "0 4px",
                  fontFamily: UNIFORM_FONT_STACK
                }}>
                  <span>{downloadDateTime}</span>
                  <span style={{ fontWeight: "600" }}>Ananya Hi Solutions - Quotation Overview</span>
                </div>

                {/* Header Banner */}
                <div style={{
                  background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                  padding: "24px 30px",
                  borderRadius: "10px 10px 0 0",
                  color: "#ffffff"
                }}>
                  {/* First Row: Logo & Proposal ID */}
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                    <img 
                      src={whiteLogoSrc || "/logo.png"} 
                      alt="Ananya Hi Solutions" 
                      style={{ 
                        height: "42px", 
                        width: "auto", 
                        display: "block"
                      }} 
                    />
                    <div style={{ fontSize: "16px", fontWeight: "700", textAlign: "right" }}>
                      Business Proposal: #{proposalCount}
                    </div>
                  </div>

                  {/* Small line between Logo and Collaboration text */}
                  <div style={{ 
                    width: "40px", 
                    height: "1px", 
                    background: "rgba(255, 255, 255, 0.35)", 
                    margin: "3px 0" 
                  }}></div>

                  {/* Second Row: Collaboration & Issue Date */}
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "1px"
                  }}>
                    <div style={{ 
                      fontSize: "9px", 
                      color: "rgba(255, 255, 255, 0.75)", 
                      lineHeight: "1.3",
                      fontFamily: UNIFORM_FONT_STACK,
                      fontWeight: "400",
                      textAlign: "left"
                    }}>
                      in collaboration with <span style={{ fontWeight: "700", color: "#ffffff", fontSize: "9.5px" }}>swetha solutions</span>
                    </div>
                    <div style={{ 
                      fontSize: "12px", 
                      opacity: 0.95, 
                      textAlign: "right",
                      fontFamily: UNIFORM_FONT_STACK
                    }}>
                      Issue Date: {issueDate}
                    </div>
                  </div>
                </div>
                
                {/* Info Grid */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "30px",
                  margin: "30px 0"
                }}>
                  {/* Client Info */}
                  <div>
                    <span style={{
                      background: "#f1f5f9",
                      color: "#475569",
                      padding: "4px 10px",
                      borderRadius: "4px",
                      fontSize: "11px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}>Business Proposal</span>
                    <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", margin: "10px 0 2px 0" }}>{leadInfo.name}</h2>
                    {leadInfo.company && leadInfo.company !== "Company Name" && (
                      <p style={{ color: "#64748b", fontSize: "14px", margin: "0 0 12px 0", fontWeight: "500" }}>{leadInfo.company}</p>
                    )}
                    <div style={{ fontSize: "13px", color: "#475569", lineHeight: "1.6", marginTop: "8px" }}>
                      {leadInfo.phone && leadInfo.phone !== "Phone Number" && <div>📞 {leadInfo.phone}</div>}
                      {leadInfo.email && leadInfo.email !== "Email Address" && <div>✉️ {leadInfo.email}</div>}
                    </div>
                  </div>
                  
                  {/* Agency Info */}
                  <div>
                    <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a", margin: "0 0 8px 0" }}>Ananya Hi Solutions</h3>
                    <p style={{ color: "#475569", fontSize: "13px", margin: "0 0 10px 0", lineHeight: "1.4" }}>
                      401 Sravya Vatika, Greenlands, Begumpet,<br />Hyderabad, Telangana - 500016
                    </p>
                    <div style={{ fontSize: "13px", color: "#2563eb", fontWeight: "600", lineHeight: "1.6" }}>
                      <div>🌐 www.ananyahisolutions.com</div>
                      <div>✉️ info@ananyahisolutions.com</div>
                      <div>📞 (+91) 76739-35353</div>
                    </div>
                  </div>
                </div>
                
                {/* Package Title Bar */}
                <div style={{
                  background: "#2563eb",
                  color: "#ffffff",
                  textAlign: "center",
                  padding: "12px",
                  fontSize: "16px",
                  fontWeight: "700",
                  borderRadius: "8px 8px 0 0"
                }}>
                  {packageTitle}
                </div>
                
                {/* Table Container */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1.5fr 1fr",
                  border: "1px solid #e2e8f0",
                  borderTop: "none",
                  minHeight: "560px"
                }}>
                  {/* Left Column - Features */}
                  <div style={{ padding: "24px", background: "#f8fafc" }}>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {featuresPage1.map((feat, fIdx) => (
                        <li key={fIdx} style={{ fontSize: "12.5px", color: "#334155", margin: "0 0 10px 0", display: "flex", alignItems: "flex-start", gap: "8px", lineHeight: "1.4" }}>
                          <span style={{ color: "#22c55e", fontWeight: "bold" }}>✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Right Column - Price Summary */}
                  <div style={{ padding: "24px", background: "#eff6ff", borderLeft: "1px solid #e2e8f0", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", textAlign: "center" }}>
                    <div style={{ width: "100%" }}>
                      <div style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: "700", letterSpacing: "0.5px" }}>Payable Amount</div>
                      <div style={{ fontSize: "30px", color: "#1e3a8a", fontWeight: "800", margin: "10px 0 20px 0" }}>
                        {plan.price}
                        <span style={{ fontSize: "13px", fontWeight: "600", color: "#475569", marginLeft: "5px", verticalAlign: "middle" }}>+GST</span>
                      </div>
                      
                      {/* Plan Card */}
                      <div style={{
                        background: "#dbeafe",
                        border: "1px solid #bfdbfe",
                        borderRadius: "6px",
                        padding: "16px",
                        textAlign: "center",
                        marginTop: "40px"
                      }}>
                        <div style={{ fontSize: "16px", fontWeight: "700", color: "#2563eb" }}>{plan.name}</div>
                        <div style={{ fontSize: "12px", color: "#475569", marginTop: "4px" }}>
                          {plan.billing.replace('+', '').trim() || 'For 30 Days'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Footer */}
              <div style={{
                textAlign: "center",
                borderTop: "1px solid #e2e8f0",
                paddingTop: "15px",
                fontSize: "10px",
                color: "#64748b"
              }}>
                Page 1 of 2
              </div>
            </div>
            
            {/* Page 2 */}
            <div 
              id={`proposal-page-2-${idx}`} 
              style={{
                width: "794px",
                height: "1123px",
                padding: "30px 40px 40px 40px",
                boxSizing: "border-box",
                backgroundColor: "#ffffff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                fontFamily: UNIFORM_FONT_STACK
              }}
            >
              <div>
                {/* Metadata Browser Print Header Strip */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "11px",
                  color: "#333333",
                  marginBottom: "12px",
                  padding: "0 4px",
                  fontFamily: UNIFORM_FONT_STACK
                }}>
                  <span>{downloadDateTime}</span>
                  <span style={{ fontWeight: "600" }}>Ananya Hi Solutions - Quotation Overview</span>
                </div>

                {/* Table Container */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1.5fr 1fr",
                  border: "1px solid #e2e8f0",
                  minHeight: "450px",
                  borderRadius: "8px 8px 0 0"
                }}>
                  {/* Left Column - Remaining Features */}
                  <div style={{ padding: "24px", background: "#f8fafc" }}>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {featuresPage2.map((feat, fIdx) => (
                        <li key={fIdx} style={{ fontSize: "12.5px", color: "#334155", margin: "0 0 10px 0", display: "flex", alignItems: "flex-start", gap: "8px", lineHeight: "1.4" }}>
                          <span style={{ color: "#22c55e", fontWeight: "bold" }}>✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                      {featuresPage2.length === 0 && (
                        <li style={{ fontSize: "12.5px", color: "#94a3b8", fontStyle: "italic" }}>
                          All features listed on Page 1.
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  {/* Right Column - Note Box */}
                  <div style={{ padding: "24px", background: "#eff6ff", borderLeft: "1px solid #e2e8f0" }}>
                    {plan.note && (
                      <div style={{
                        background: "#fffbeb",
                        border: "1px solid #fde68a",
                        color: "#b45309",
                        padding: "12px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: "600",
                        lineHeight: "1.4"
                      }}>
                        {plan.note}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Grand Total Bar */}
                <div style={{
                  background: "#2563eb",
                  color: "#ffffff",
                  padding: "15px 24px",
                  borderRadius: "6px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: "20px 0"
                }}>
                  <span style={{ fontSize: "16px", fontWeight: "700" }}>Grand Total</span>
                  <span style={{ fontSize: "22px", fontWeight: "800" }}>
                    {plan.price}
                    <span style={{ fontSize: "12px", fontWeight: "600", color: "rgba(255, 255, 255, 0.8)", marginLeft: "4px", verticalAlign: "middle" }}>+GST</span>
                  </span>
                </div>
                
                {/* Terms and Conditions */}
                <div style={{ margin: "24px 0" }}>
                  <h4 style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a", margin: "0 0 10px 0" }}>Terms And Condition :</h4>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "12px", color: "#334155", lineHeight: "1.8" }}>
                    <li style={{ display: "flex", gap: "8px" }}>
                      <span>•</span>
                      <span>Any extra work beyond this proposal will be charged extra.</span>
                    </li>
                    <li style={{ display: "flex", gap: "8px" }}>
                      <span>•</span>
                      <span>Campaign charges are not included.</span>
                    </li>
                    <li style={{ display: "flex", gap: "8px" }}>
                      <span>•</span>
                      <span>Quotation is valid for 15 days from the date of issue.</span>
                    </li>
                    <li style={{ display: "flex", gap: "8px" }}>
                      <span>•</span>
                      <span>All payments must be made directly to Ananya Hi Solutions / Swetha Solutions account only.</span>
                    </li>
                  </ul>
                </div>
                
                {/* Closing Message */}
                <p style={{
                  fontSize: "11px",
                  color: "#64748b",
                  fontStyle: "italic",
                  lineHeight: "1.5",
                  margin: "20px 0 0 0"
                }}>
                  If you have any questions about this quotation, please contact us. Thank you for choosing Ananya Hi Solutions — your growth partner in the digital world!
                </p>
              </div>
              
              {/* Footer */}
              <div>
                <div style={{ borderTop: "1px solid #e2e8f0", margin: "15px 0" }}></div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "10px", color: "#64748b" }}>
                  <span style={{ fontWeight: "600" }}>Thank you very much for doing business with us.</span>
                  <span>Page 2 of 2</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function PlansPage() {
  return (
    <Suspense fallback={<div style={{minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>Loading plans...</div>}>
      <PlansContent />
    </Suspense>
  );
}
