import React, { useState, useEffect } from "react";
import { Activity, Menu, X, PhoneCall, ShieldCheck } from "lucide-react";

export default function Navbar({ activePage, setActivePage }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "products", label: "Products" },
    { id: "services", label: "Services" },
    { id: "partners", label: "Partners" },
    { id: "clients", label: "Our Clients" },
    { id: "events", label: "Events & News" },
    { id: "about", label: "About Us" },
    { id: "contact", label: "Contact Us" }
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
        ? "bg-white/80 backdrop-blur-md shadow-md py-3 border-b border-slate-100"
        : "bg-transparent py-5"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Branding */}
          <div
            onClick={() => handleNavClick("home")}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <img
              src="/logo.png"
              alt="Al Karam Medical Logo"
              className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300 bg-white p-1 rounded-lg border border-slate-100 shadow-sm"
            />
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-medical-600 transition-colors leading-tight">
                Al Karam <span className="text-medical-600">Medical</span>
              </span>
              <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold leading-none mt-0.5">
                EQUIPMENT, Planning & Support
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 ${isActive
                      ? "bg-medical-50 text-medical-700 shadow-sm shadow-medical-100"
                      : "text-slate-600 hover:text-medical-600 hover:bg-slate-50"
                    }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Desktop Action Call Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="#emergency-portal"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("contact");
                setTimeout(() => {
                  document.getElementById("emergency-portal")?.scrollIntoView({ behavior: "smooth" });
                }, 300);
              }}
              className="flex items-center space-x-2 bg-gradient-to-r from-medical-600 to-medical-500 hover:from-medical-700 hover:to-medical-600 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-md shadow-medical-200 hover:shadow-lg hover:shadow-medical-300 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <PhoneCall className="h-3.5 w-3.5 animate-bounce" />
              <span>Urgent Support</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-600 hover:text-medical-600 hover:bg-slate-100 transition-colors focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay and Panel */}
      <div className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}>
        {/* Backdrop blur */}
        <div
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
        />

        {/* Menu Panel */}
        <div className={`absolute top-0 right-0 w-80 h-screen bg-white shadow-2xl flex flex-col p-6 transition-transform duration-300 transform ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}>
          <div className="flex justify-between items-center pb-6 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <img
                src="/logo.png"
                alt="Al Karam Medical Logo"
                className="h-8 w-auto object-contain bg-white p-0.5 rounded border border-slate-100"
              />
              <span className="font-extrabold text-slate-900">Al Karam Medical</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Items list */}
          <div className="flex-1 py-6 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all ${isActive
                      ? "bg-medical-500 text-white shadow-md shadow-medical-200"
                      : "text-slate-600 hover:text-medical-600 hover:bg-slate-50"
                    }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Mobile Footer */}
          <div className="pt-6 border-t border-slate-100 space-y-4">
            <div className="flex items-center space-x-2.5 text-xs text-slate-500">
              <ShieldCheck className="h-4 w-4 text-emerald-500 flex-shrink-0" />
              <span>Certified ISO 13485 Standards</span>
            </div>
            <button
              onClick={() => {
                handleNavClick("contact");
                setTimeout(() => {
                  document.getElementById("emergency-portal")?.scrollIntoView({ behavior: "smooth" });
                }, 300);
              }}
              className="w-full flex items-center justify-center space-x-2 bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-xl text-sm font-semibold shadow-md shadow-rose-100"
            >
              <PhoneCall className="h-4 w-4 animate-pulse" />
              <span>24/7 Hotline Dispatch</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
