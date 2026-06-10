import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ReferencesSlider from "./components/ReferencesSlider";

// Lazy loaded page components for optimal initial paint performance
const Products = lazy(() => import("./components/Products"));
const Services = lazy(() => import("./components/Services"));
const Partners = lazy(() => import("./components/Partners"));
const Clients = lazy(() => import("./components/Clients"));
const EventsNews = lazy(() => import("./components/EventsNews"));
const AboutUs = lazy(() => import("./components/AboutUs"));
const ContactUs = lazy(() => import("./components/ContactUs"));
const ProductModal = lazy(() => import("./components/ProductModal"));

import { Activity, Phone, Mail, Clock, ShieldCheck, MapPin } from "lucide-react";

const parseHash = (hashStr) => {
  const result = {
    activePage: "home",
    selectedPartnerId: null,
    preFilteredBrand: "all"
  };
  if (!hashStr || !hashStr.startsWith("#/")) return result;

  const parts = hashStr.substring(2).split("?");
  const path = parts[0];
  const query = parts[1];

  const validPages = ["home", "products", "services", "partners", "clients", "events", "about", "contact"];
  if (validPages.includes(path)) {
    result.activePage = path;
  }

  if (query) {
    const params = new URLSearchParams(query);
    if (params.has("partner")) {
      result.selectedPartnerId = params.get("partner");
    }
    if (params.has("brand")) {
      result.preFilteredBrand = params.get("brand");
    }
  }
  return result;
};

const getUrlForState = (page, partnerId, brand) => {
  if (page === "home") {
    return "/";
  }
  let url = `#/${page}`;
  const params = [];
  if (page === "partners" && partnerId) {
    params.push(`partner=${partnerId}`);
  }
  if (page === "products" && brand && brand !== "all") {
    params.push(`brand=${brand}`);
  }
  if (params.length > 0) {
    url += `?${params.join("&")}`;
  }
  return url;
};

export default function App() {
  const initialRoute = parseHash(window.location.hash);
  const [activePage, setActivePage] = useState(initialRoute.activePage);
  const [preFilteredBrand, setPreFilteredBrand] = useState(initialRoute.preFilteredBrand);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedPartnerId, setSelectedPartnerId] = useState(initialRoute.selectedPartnerId);

  const isPopStateRef = useRef(false);

  // Sync state with browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event) => {
      const routeState = event.state || parseHash(window.location.hash);
      isPopStateRef.current = true;
      setActivePage(routeState.activePage || "home");
      setSelectedPartnerId(routeState.selectedPartnerId || null);
      setPreFilteredBrand(routeState.preFilteredBrand || "all");
    };

    window.addEventListener("popstate", handlePopState);

    // Initial state setup in browser history
    const currentRoute = parseHash(window.location.hash);
    window.history.replaceState(currentRoute, "", getUrlForState(currentRoute.activePage, currentRoute.selectedPartnerId, currentRoute.preFilteredBrand));

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Update browser history when app state changes
  useEffect(() => {
    if (isPopStateRef.current) {
      isPopStateRef.current = false;
      return;
    }

    const currentState = window.history.state;
    if (!currentState ||
      currentState.activePage !== activePage ||
      currentState.selectedPartnerId !== selectedPartnerId ||
      currentState.preFilteredBrand !== preFilteredBrand) {

      const newUrl = getUrlForState(activePage, selectedPartnerId, preFilteredBrand);
      window.history.pushState({
        activePage,
        selectedPartnerId,
        preFilteredBrand
      }, "", newUrl);
    }
  }, [activePage, selectedPartnerId, preFilteredBrand]);

  // Transition handler when clicking a partner logo
  const handleSelectPartner = (brandId) => {
    setPreFilteredBrand(brandId);
    setActivePage("products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectPartnerFromHome = (brandId) => {
    setSelectedPartnerId(brandId);
    setActivePage("partners");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearPreFilter = () => {
    setPreFilteredBrand("all");
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  // State-driven routing controller
  const renderActivePage = () => {
    switch (activePage) {
      case "home":
        return (
          <div className="space-y-0">
            <Hero setActivePage={setActivePage} />
            <ReferencesSlider setActivePage={setActivePage} />
            <AboutUs setActivePage={setActivePage} />
            <Services setActivePage={setActivePage} />
            <Partners onSelectPartner={handleSelectPartnerFromHome} minimal={true} />
            <EventsNews />
          </div>
        );
      case "products":
        return (
          <div className="pt-20">
            <Products
              preFilteredBrand={preFilteredBrand}
              onClearPreFilter={handleClearPreFilter}
              onSelectProduct={handleSelectProduct}
            />
          </div>
        );
      case "services":
        return (
          <div className="pt-20">
            <Services setActivePage={setActivePage} />
          </div>
        );
      case "partners":
        return (
          <div className="pt-20">
            <Partners onSelectPartner={handleSelectPartner} initialPartnerId={selectedPartnerId} />
          </div>
        );
      case "clients":
        return (
          <div className="pt-20">
            <Clients />
          </div>
        );
      case "events":
        return (
          <div className="pt-20">
            <EventsNews />
          </div>
        );
      case "about":
        return (
          <div className="pt-20">
            <AboutUs setActivePage={setActivePage} />
          </div>
        );
      case "contact":
        return (
          <div className="pt-20">
            <ContactUs source="Contact Us Page" />
          </div>
        );
      default:
        return <Hero setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans selection:bg-medical-100 selection:text-medical-900">
      {/* Dynamic clinical glassmorphic header */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* Main active view wrapper */}
      <main className="flex-grow">
        <Suspense fallback={
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-medical-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          {renderActivePage()}
        </Suspense>
      </main>

      {/* Detailed specs popups */}
      {selectedProduct && (
        <Suspense fallback={null}>
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        </Suspense>
      )}

      {/* Premium clinical corporate footer */}
      <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 border-t border-slate-800 relative overflow-hidden">
        {/* Background gradient bubble */}
        <div className="absolute right-0 bottom-0 translate-y-1/3 translate-x-1/3 w-80 h-80 bg-medical-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-white">
                <img
                  src="/logo.png"
                  alt="Al Karam Medical Logo"
                  className="h-9 w-auto object-contain bg-white p-1 rounded-lg border border-slate-800 shadow-sm"
                />
                <div>
                  <span className="text-lg font-bold tracking-tight text-white leading-tight">
                    Al Karam <span className="text-medical-400">Medical</span>
                  </span>
                  <span className="block text-[8px] uppercase tracking-wider text-slate-500 font-bold leading-none mt-0.5">
                    Biomedical Services Desk
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Professional clinical engineering solutions for outpatient centers, surgical suites, and intensive care departments throughout the Arab Republic of Egypt.
              </p>
            </div>

            {/* Quick sections links */}
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4.5">
                Corporate Sections
              </h4>
              <ul className="space-y-2.5 text-xs">
                {[
                  { id: "home", label: "Corporate Home" },
                  { id: "products", label: "Equipment Ledger" },
                  { id: "services", label: "Support Offerings" },
                  { id: "partners", label: "Partners & Brands" },
                  { id: "clients", label: "Client References" }
                ].map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => {
                        setActivePage(link.id);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="hover:text-medical-400 transition-colors text-left cursor-pointer"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Office columns */}
            <div className="space-y-4">
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">
                Support Hours & Info
              </h4>

              <div className="space-y-3 text-xs">
                <div className="flex items-start space-x-2.5">
                  <Clock className="h-4 w-4 text-medical-500 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    Sunday - Thursday<br />
                    9:00 AM - 5:00 PM (GMT +2)
                  </span>
                </div>

                <div className="flex flex-col space-y-1 text-slate-400">
                  <span className="flex items-center space-x-2.5">
                    <Phone className="h-4 w-4 text-rose-500 flex-shrink-0" />
                    <span>+2 01099442054</span>
                  </span>
                  <span className="pl-6.5 block text-[11px] leading-tight">
                    <span>+2 01098812385</span><br />
                    <span>+2 01272398884</span><br />
                    <span>+2 01020328622</span>
                  </span>
                </div>

                <div className="flex items-center space-x-2.5">
                  <Mail className="h-4 w-4 text-medical-500 flex-shrink-0" />
                  <a href="mailto:Info@alkaram-medical.com" className="hover:text-white transition-colors">
                    Info@alkaram-medical.com
                  </a>
                </div>
              </div>
            </div>

            {/* Address & Licensing */}
            <div className="space-y-4">
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">
                Technical Facilities
              </h4>

              <div className="space-y-3 text-xs leading-relaxed">
                <div className="flex items-start space-x-2.5">
                  <MapPin className="h-4 w-4 text-medical-500 flex-shrink-0 mt-0.5" />
                  <span>
                    10th of RamadaN City, Alordonia,<br />
                    Al Jawhara Mall, Office 447.
                  </span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <MapPin className="h-4 w-4 text-medical-500 flex-shrink-0 mt-0.5" />
                  <span>
                    32 Obur Building - Salah Salem Street,<br />
                    Cairo, Egypt.
                  </span>
                </div>
              </div>
              <p className="text-[10px] text-slate-600 border-t border-slate-800 pt-3 leading-relaxed">
                Ministry of Health Maintenance & Service License No. MoH-EGY-2026/894. NIST Quality standards Traceability Certified.
              </p>
            </div>

          </div>

          {/* Copyright bar */}
          <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-500 gap-4">
            <span className="flex flex-col sm:flex-row sm:items-center gap-1">
              <span>&copy; {new Date().getFullYear()} Alkaram Medical. All rights reserved.</span>
              <span className="hidden sm:inline text-slate-700">|</span>
              <span>
                Developed by{" "}
                <a
                  href="https://www.linkedin.com/in/andrew-osama-jacoup/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-medical-400 hover:text-medical-300 font-semibold transition-colors"
                >
                  Path Group
                </a>
              </span>
            </span>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-slate-400 transition-colors">Regulatory Policy</a>
              <a href="#" className="hover:text-slate-400 transition-colors">Engineering SLA Guidelines</a>
              <a href="#" className="hover:text-slate-400 transition-colors">NIST Traceability Ledger</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
