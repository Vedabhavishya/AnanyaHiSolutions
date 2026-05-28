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
                {services.map((svc) => (
                  <Link key={svc.id} href={`/services/${svc.id}`} onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-slate-600 hover:text-primary-blue">{svc.title}</Link>
                ))}
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
