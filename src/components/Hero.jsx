import React, { memo } from "react";
import {
  Shield,
  Wrench,
  Heart,
  Clock,
  Activity,
  ChevronRight,
  Building2,
  BookOpen,
  Award,
  Layers
} from "lucide-react";

function Hero({ setActivePage }) {
  const stats = [
    { label: "Biomedical Engineers", value: "35+", icon: Wrench, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Emergency SLA Response", value: "< 24 Hrs", icon: Clock, color: "text-rose-500", bg: "bg-rose-50" },
    { label: "Equipment Sold", value: "5,000+", icon: Activity, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Operational Reliability", value: "99.8%", icon: Shield, color: "text-indigo-600", bg: "bg-indigo-50" }
  ];

  // Brief items representing each portfolio section for quick navigation
  const tourItems = [
    {
      id: "products",
      title: "Equipment Catalog",
      subtitle: "Authorized Device Ledger",
      desc: "Explore full specifications, AAMI/ECRI checklist steps, and download metrology compliance documents for clinical assets.",
      icon: Layers,
      color: "from-blue-600 to-blue-500",
      textColor: "text-blue-600",
      badge: "6 Global Brands"
    },
    {
      id: "services",
      title: "Biomedical Offerings",
      subtitle: "Planning & Maintenance",
      desc: "Discover our dual operations: end-to-end Medical Equipment Planning and Egypt-wide 24/7 technical support services.",
      icon: Wrench,
      color: "from-medical-600 to-medical-500",
      textColor: "text-medical-600",
      badge: "SLA Custom Plans"
    },
    {
      id: "partners",
      title: "Manufacturing Partners",
      subtitle: "Global Support Alliances",
      desc: "Review our certified brand relationships with top international manufacturers including authorized spare parts sourcing.",
      icon: Award,
      color: "from-amber-600 to-amber-500",
      textColor: "text-amber-600",
      badge: "Certified Integration"
    },
    {
      id: "clients",
      title: "Client References",
      subtitle: "Trusted Hospital Networks",
      desc: "See the 21 premier Egyptian teaching universities, charity heart foundations, and private medical groups we support.",
      icon: Building2,
      color: "from-emerald-600 to-emerald-500",
      textColor: "text-emerald-600",
      badge: "21 Active Logos"
    },
    {
      id: "about",
      title: "Corporate Profile",
      subtitle: "Our Core Mission",
      desc: "Learn about Al Karam Medical's establishment in 2017, empowering clinical decisions, and maximizing patient safety.",
      icon: BookOpen,
      color: "from-purple-600 to-purple-500",
      textColor: "text-purple-600",
      badge: "Est. 2017"
    }
  ];

  const handleTourClick = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-b from-slate-50 via-white to-slate-100 overflow-hidden grid-bg">
      {/* Decorative pulse line in background */}
      <div className="absolute top-1/4 right-0 w-1/2 h-64 opacity-25 pointer-events-none hidden md:block">
        <svg viewBox="0 0 800 200" className="w-full h-full text-medical-500">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="pulse-line"
            d="M0,100 L150,100 L180,70 L210,130 L230,100 L260,100 L280,30 L300,170 L320,100 L450,100 L470,120 L490,80 L510,100 L650,100 L680,10 L710,190 L730,100 L800,100"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center mb-16 lg:mb-24">

          {/* Hero Left Content Column */}
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-7 lg:text-left">
            <div className="inline-flex items-center space-x-2.5 bg-white px-4 py-2 rounded-full border border-slate-200/60 shadow-sm mb-6 animate-fade-in">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-duration-1000"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Biomedical Equipment, Service & SLA Engineering in Egypt
              </span>
            </div>

            {/* Title with Company Logo standalone */}
            <div className="flex flex-col sm:items-center lg:items-start mb-6">
              <div className="flex items-center mb-5 sm:justify-center lg:justify-start">
                <img
                  src="/logo.png"
                  alt="Al Karam Medical Logo"
                  className="h-24 md:h-28 w-auto object-contain bg-white p-3.5 rounded-3xl border border-slate-100/80 shadow-lg animate-float"
                />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                Empowering Care Through{" "}
                <span className="bg-gradient-to-r from-medical-600 to-medical-400 bg-clip-text text-transparent">
                  Precision Engineering
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed">
              Al Karam Medical delivers comprehensive medical equipment planning, advanced maintenance solutions, and expert technical support based on high engineering standards, operational efficiency, and long-term reliability. We help minimize clinical downtime and support safer healthcare operations across Egypt.
            </p>

            <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
              <button
                onClick={() => handleTourClick("contact")}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-medical-600 to-medical-500 hover:from-medical-700 hover:to-medical-600 text-white px-8 py-4 rounded-2xl text-base font-bold shadow-lg shadow-medical-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <span>Request SLA Consultation</span>
                <ChevronRight className="h-5 w-5" />
              </button>

              <button
                onClick={() => handleTourClick("products")}
                className="flex items-center justify-center space-x-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 px-8 py-4 rounded-2xl text-base font-bold shadow-sm hover:shadow hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <span>Browse Authorized Equipment</span>
              </button>
            </div>
          </div>

          {/* Hero Right Visual Column */}
          <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md h-[400px] flex items-center justify-center">
              {/* Dynamic decorative backdrop spheres */}
              <div className="absolute inset-0 bg-gradient-to-tr from-medical-200/50 to-indigo-100/50 rounded-full blur-3xl -z-10 animate-pulse-slow" />

              {/* Premium clinical card */}
              <div className="glass-panel w-full p-8 rounded-3xl shadow-xl border border-white/80 relative animate-float">
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-medical-500/10 p-3 rounded-2xl text-medical-600">
                    <Heart className="h-8 w-8 animate-heartbeat" />
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
                    NIST TRACEABLE CERTIFIED
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  Technical Support & Planning
                </h3>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                  Highly qualified biomedical engineering team providing medical equipment planning, corrective maintenance, preventive service, and OEM spare parts management across Egypt.
                </p>

                {/* Sub-cards representation */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/70 border border-slate-100">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-semibold text-slate-700">ICU Ventilation & Critical Care Support</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/70 border border-slate-100">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    <span className="text-xs font-semibold text-slate-700">OR & Surgical Platform Technical Checks</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/70 border border-slate-100">
                    <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                    <span className="text-xs font-semibold text-slate-700">Comprehensive Medical Planning Drawings</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Stats Grid Dashboard */}
        <div className="pt-8 border-t border-slate-200 mb-16 lg:mb-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="bg-white/70 backdrop-blur-sm p-5 rounded-2xl border border-slate-100 hover:border-medical-200 hover:bg-white shadow-sm hover:shadow-md transition-all duration-300 flex items-center space-x-4"
                >
                  <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="block text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
                      {stat.value}
                    </span>
                    <span className="block text-xs font-medium text-slate-500 mt-0.5">
                      {stat.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Portfolio Tour / Content Brief Deck */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-medical-600 bg-medical-50 px-3.5 py-1.5 rounded-full">
              Portfolio Digest
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-4 mb-3">
              Explore Al Karam Capabilities
            </h2>
            <p className="text-sm text-slate-500">
              Click on any segment card to immediately navigate to its full detailed page.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {tourItems.map((item) => {
              const TourIcon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => handleTourClick(item.id)}
                  className="group bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-lg hover:border-medical-200 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Badge and Icon */}
                    <div className="flex justify-between items-center mb-5">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-50 border border-slate-100 ${item.textColor}`}>
                        {item.badge}
                      </span>
                      <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${item.color} text-white shadow-sm shadow-slate-100`}>
                        <TourIcon className="h-4.5 w-4.5" />
                      </div>
                    </div>

                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {item.subtitle}
                    </span>
                    <h3 className="text-sm font-extrabold text-slate-800 mt-1 mb-2 group-hover:text-medical-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-5 flex justify-between items-center text-[10px] font-bold text-slate-400 group-hover:text-medical-600 transition-colors">
                    <span>Navigate Page</span>
                    <span>&rarr;</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

export default memo(Hero);
