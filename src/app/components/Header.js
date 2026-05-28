"use client";

import React, { useState, useEffect } from "react";
import { useServices } from "../context/ServicesContext";
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
  const { services } = useServices();
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
              {services.map((svc) => (
                <li key={svc.id}><Link href={`/services/${svc.id}`}>{svc.title}</Link></li>
              ))}
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
        <div 
          className="md:hidden animate-slide-in"
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            top: "70px",
            bottom: 0,
            background: "#ffffff",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            padding: "24px",
            gap: "20px",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
            overflowY: "auto"
          }}
        >
          <Link 
            href="/" 
            onClick={() => setMobileMenuOpen(false)} 
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color: "var(--dark-deep)",
              textDecoration: "none",
              paddingBottom: "12px",
              borderBottom: "1px solid #f1f5f9",
              display: "block"
            }}
          >
            Home
          </Link>
          
          <Link 
            href="/about" 
            onClick={() => setMobileMenuOpen(false)} 
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color: "var(--dark-deep)",
              textDecoration: "none",
              paddingBottom: "12px",
              borderBottom: "1px solid #f1f5f9",
              display: "block"
            }}
          >
            About
          </Link>
          
          <div style={{ display: "flex", flexDirection: "column", borderBottom: "1px solid #f1f5f9", paddingBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span 
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)} 
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "var(--dark-deep)",
                  cursor: "pointer",
                  userSelect: "none"
                }}
              >
                Services
              </span>
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setMobileServicesOpen(!mobileServicesOpen); 
                }} 
                style={{
                  fontSize: "18px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--primary-blue)",
                  padding: "0 8px"
                }}
              >
                {mobileServicesOpen ? "▲" : "▼"}
              </button>
            </div>
            {mobileServicesOpen && (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", paddingLeft: "16px", paddingTop: "10px" }}>
                {services.map((svc) => (
                  <Link 
                    key={svc.id} 
                    href={`/services/${svc.id}`} 
                    onClick={() => setMobileMenuOpen(false)} 
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#475569",
                      textDecoration: "none",
                      display: "block"
                    }}
                  >
                    {svc.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link 
            href="/careers" 
            onClick={() => setMobileMenuOpen(false)} 
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color: "var(--dark-deep)",
              textDecoration: "none",
              paddingBottom: "12px",
              borderBottom: "1px solid #f1f5f9",
              display: "block"
            }}
          >
            Careers
          </Link>
          
          <Link 
            href="/blog" 
            onClick={() => setMobileMenuOpen(false)} 
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color: "var(--dark-deep)",
              textDecoration: "none",
              paddingBottom: "12px",
              borderBottom: "1px solid #f1f5f9",
              display: "block"
            }}
          >
            Blog
          </Link>
          
          <Link 
            href="/contact" 
            onClick={() => setMobileMenuOpen(false)} 
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color: "var(--dark-deep)",
              textDecoration: "none",
              paddingBottom: "12px",
              borderBottom: "1px solid #f1f5f9",
              display: "block"
            }}
          >
            Contact us
          </Link>
          
          <Link 
            href="/packages" 
            onClick={() => setMobileMenuOpen(false)} 
            className="btn btn-accent text-center" 
            style={{
              marginTop: "16px",
              textDecoration: "none",
              display: "block"
            }}
          >
            Choose Package
          </Link>
        </div>
      )}
    </header>
  );
}
