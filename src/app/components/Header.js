"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

function Logo({ className = "" }) {
  return (
    <img
      src="/logo.png"
      alt="Ananya Hi Solutions"
      className="nav-logo-img"
      style={{
        height: "42px",
        width: "auto",
        objectFit: "contain",
        display: "block"
      }}
    />
  );
}

export default function Header({ activePage = "" }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

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

  return (
    <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="nav-links">
          <li>
            <Link href="/" className={`nav-link ${activePage === "home" ? "active" : ""}`}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className={`nav-link ${activePage === "about" ? "active" : ""}`}>
              About
            </Link>
          </li>
          <li className="nav-item-dropdown">
            <span className={`nav-link cursor-pointer ${activePage === "services" ? "active" : ""}`}>
              Services <span className="dropdown-arrow">▼</span>
            </span>
            <ul className="dropdown-menu">
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
          </li>
          <li>
            <Link href="/careers" className={`nav-link ${activePage === "careers" ? "active" : ""}`}>
              Careers
            </Link>
          </li>
          <li>
            <Link href="/blog" className={`nav-link ${activePage === "blog" ? "active" : ""}`}>
              Blog
            </Link>
          </li>
          <li>
            <Link href="/contact" className={`nav-link ${activePage === "contact" ? "active" : ""}`}>
              Contact us
            </Link>
          </li>
        </ul>

        <div className="nav-cta">
          <Link href="/packages" className="btn btn-primary">Choose Package</Link>
        </div>

        {/* Mobile Menu Icon Toggle */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[70px] bg-white z-[999] flex flex-col p-6 gap-6 shadow-lg md:hidden animate-slide-in">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold border-b pb-2">Home</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold border-b pb-2">About</Link>
          
          <div className="flex flex-col border-b pb-2">
            <div className="flex justify-between items-center text-xl font-bold">
              <span 
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)} 
                className="cursor-pointer select-none"
              >
                Services
              </span>
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setMobileServicesOpen(!mobileServicesOpen); 
                }} 
                className="text-xl px-2 animate-pulse"
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--primary-blue)" }}
              >
                {mobileServicesOpen ? "▲" : "▼"}
              </button>
            </div>
            {mobileServicesOpen && (
              <div className="flex flex-col gap-2 pl-4 pt-2">
                <Link href="/services/web-design" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-slate-600 hover:text-primary-blue">Website Design</Link>
                <Link href="/services/digital-marketing" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-slate-600 hover:text-primary-blue">Digital Marketing</Link>
                <Link href="/services/mobile-app" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-slate-600 hover:text-primary-blue">Mobile Application</Link>
                <Link href="/services/ecommerce-app" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-slate-600 hover:text-primary-blue">Ecommerce Application</Link>
                <Link href="/services/video-production" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-slate-600 hover:text-primary-blue">Video Production</Link>
                <Link href="/services/software-development" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-slate-600 hover:text-primary-blue">Software Development</Link>
                <Link href="/services/aeo" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-slate-600 hover:text-primary-blue">AEO (Answer Engine)</Link>
                <Link href="/services/geo" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-slate-600 hover:text-primary-blue">GEO (Google Engine)</Link>
                <Link href="/services/youtube-seo" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-slate-600 hover:text-primary-blue">YouTube SEO</Link>
                <Link href="/services/youtube-ads" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-slate-600 hover:text-primary-blue">YouTube Ads</Link>
              </div>
            )}
          </div>

          <Link href="/careers" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold border-b pb-2">Careers</Link>
          <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold border-b pb-2">Blog</Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold border-b pb-2">Contact us</Link>
          <Link href="/packages" onClick={() => setMobileMenuOpen(false)} className="btn btn-accent text-center mt-4">Choose Package</Link>
        </div>
      )}
    </header>
  );
}
