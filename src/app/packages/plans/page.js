"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../../components/Header";
import { PACKAGE_PLANS_DATA } from "../../../data/plans";
import Link from "next/link";

function PlansContent() {
  const searchParams = useSearchParams();
  const packageTitle = searchParams.get("package") || "Selected Package";
  
  // Default to empty array if no specific data exists yet for the package
  const plansData = PACKAGE_PLANS_DATA[packageTitle] || [];

  const handleWhatsAppClick = (planName) => {
    const phoneNumber = "917673935353";
    const message = `Hi Ananya Team, I'm interested in the ${planName} plan of ${packageTitle}.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
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
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="plan-feature-item">
                        <span className="feature-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 11.22a.75.75 0 00-1.06 1.06l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="feature-text">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="plan-alert-note">
                    {plan.note}
                  </div>

                  <div className="plan-action-area">
                    <button 
                      onClick={() => handleWhatsAppClick(plan.name)}
                      className="plan-whatsapp-btn"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                      </svg>
                      Get in Touch
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
