import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const logoUrl =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1'%3E%3Cstop offset='0' stop-color='%23ff5f6d'/%3E%3Cstop offset='1' stop-color='%23ffc371'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='64' height='64' rx='12' fill='url(%23g)'/%3E%3Cpath d='M32 14 L32 50 M18 32 L46 32' stroke='%23fff' stroke-width='4' stroke-linecap='round'/%3E%3C/svg%3E";

const NAV_ITEMS = [
  { to: "/", label: "Home", icon: "🏠" },
  { to: "/services", label: "Services", icon: "⚕️" },
  // keep only one Register link
  { to: "/register", label: "Donor Registration", icon: "❤️" },
  { to: "/admin", label: "Admin", icon: "👨‍💼" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target) && !btnRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open]);

  return (
    <header className="site-nav" role="banner">
      <div className="nav-inner">
        <NavLink to="/" className="brand" aria-label="रक्तदान Home" onClick={() => setOpen(false)}>
          <img src={logoUrl} alt="रक्तदान" className="brand-logo" />
          <div className="brand-text">
            <span className="brand-title">रक्तदान</span>
            <span className="brand-sub">Blood Donation Centre</span>
          </div>
        </NavLink>

        {/* Desktop links */}
        <nav className="nav-links" role="navigation" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              end={item.to === "/"}
              onClick={() => setOpen(false)}
            >
              <span className="nav-emoji" aria-hidden>
                {item.icon}
              </span>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          ref={btnRef}
          className={`nav-toggle ${open ? "open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-panel"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className="hamb" />
          <span className="hamb" />
          <span className="hamb" />
        </button>
      </div>

      {/* Mobile backdrop */}
      <div className={`backdrop ${open ? "show" : ""}`} aria-hidden={!open} onClick={() => setOpen(false)} />

      {/* Mobile panel */}
      <aside
        id="mobile-panel"
        ref={panelRef}
        className={`mobile-panel ${open ? "open" : ""}`}
        aria-hidden={!open}
        role="dialog"
        aria-label="Mobile menu"
      >
        <div className="mobile-header">
          <NavLink to="/" className="mobile-brand" onClick={() => setOpen(false)}>
            <img src={logoUrl} alt="रक्तदान" className="mobile-logo" />
            <div>
              <div className="mobile-title">रक्तदान</div>
              <div className="mobile-sub">Blood Donation Centre</div>
            </div>
          </NavLink>
          <button className="close-mobile" onClick={() => setOpen(false)} aria-label="Close menu">
            ✕
          </button>
        </div>

        <nav className="mobile-links-list" aria-label="Mobile navigation">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `mobile-link ${isActive ? "active" : ""}`}
              onClick={() => setOpen(false)}
            >
              <span className="nav-emoji" aria-hidden>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </header>
  );
}
