"use client";

import React, { useState } from "react";
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
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80",
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
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        features: [
          "High-intent keyword match type grouping",
          "Persuasive copy writing & ad variations testing",
          "Negative keyword exclusions list mapping",
          "Conversion pixel and metrics tracking setup"
        ],
        link: "/services/digital-marketing/google-ads"
      },
      {
        title: "Search Engine Optimization (SEO)",
        image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80",
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
        title: "Starter Static Website",
        image: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?auto=format&fit=crop&w=800&q=80",
        features: [
          "Up to 6 fully responsive web layouts",
          "Lightweight landing pages for faster loads",
          "Free Web Hosting & SSL setup for 1 year",
          "1 week free post-launch support care"
        ],
        link: "/services/web-design/static"
      },
      {
        title: "Dynamic Website",
        image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
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
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80",
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
    isSingleCard: true,
    cards: [
      {
        title: "Spa Packages",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
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

      {/* 3. Package Sections */}
      {PACKAGE_CATEGORIES.map((category, index) => {
        // Alternate background colors (Light Gray -> White -> Light Gray)
        const isAltBg = index % 2 === 0;
        const bgClass = isAltBg ? "section section-bg-alt" : "section";
        const bgStyle = isAltBg ? {} : { backgroundColor: "var(--white)" };

        return (
          <section key={category.key} className={bgClass} style={bgStyle}>
            <div className="container">
              <div className="package-category-header">
                <h2 className="package-category-title">{category.title}</h2>
                <div className="package-category-underline"></div>
              </div>

              <div className={category.isSingleCard ? "packages-grid-single" : "packages-grid"}>
                {category.cards.map((card, cIdx) => (
                  <div key={cIdx} className="package-card-premium">
                    {/* Default Background Image */}
                    <div 
                      className="package-card-bg"
                      style={{ backgroundImage: `url('${card.image}')` }}
                    />
                    
                    {/* Shadow overlay gradient */}
                    <div className="package-card-overlay" />

                    {/* Default visible Title at bottom */}
                    <div className="package-card-title-default">
                      <h3>{card.title}</h3>
                      <div className="package-card-underline" />
                    </div>

                    {/* Sliding Hover Panel */}
                    <div className="package-card-hover-panel">
                      <div className="package-hover-header">
                        <h3>{card.title}</h3>
                        <div style={{ width: "40px", height: "3px", background: "var(--accent-orange)", margin: "0 auto", borderRadius: "10px" }} />
                      </div>

                      {/* 4 Single-line features */}
                      <div className="package-hover-features">
                        {card.features.map((feat, fIdx) => (
                          <p key={fIdx} className="package-hover-feature-item">
                            {feat}
                          </p>
                        ))}
                      </div>

                      {/* Unlock button */}
                      <Link href={card.link} className="package-hover-btn">
                        Unlock Full Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

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

        <div className="footer-divider" />
        
        <div className="footer-bottom">
          <p>© 2026 Ananya Hi Solutions. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
