import React, { memo } from "react";
import {
  ShieldCheck,
  Award,
  Users,
  Settings,
  ChevronRight,
  CheckCircle2,
  Activity,
  Clock,
  Heart,
  Compass,
  HeartPulse,
  Sparkles,
  Zap,
  Shield,
  PhoneCall,
  ArrowRight,
  TrendingUp,
  Briefcase,
  Layers,
  HeartHandshake
} from "lucide-react";

function AboutUs({ setActivePage = () => { } }) {

  // Custom navigation handler with smooth scrolling
  const handleNavigation = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const specializations = [
    {
      title: "Critical Care",
      desc: "Providing certified ventilators, vital signs monitors, syringe pumps, and central nursing station systems with absolute clinical precision.",
      icon: Activity,
      color: "text-rose-500",
      bg: "bg-rose-50/80 border-rose-100",
      glow: "hover:shadow-rose-100/50"
    },
    {
      title: "Emergency Care",
      desc: "Delivering advanced emergency medical systems, defibrillators, portable ventilators, and responsive trauma technology.",
      icon: HeartPulse,
      color: "text-amber-500",
      bg: "bg-amber-50/80 border-amber-100",
      glow: "hover:shadow-amber-100/50"
    },
    {
      title: "Operation Rooms",
      desc: "Equipping surgical suites with high-end anesthesia workstations, modular surgical tables, electrosurgical units, and custom pendants.",
      icon: Settings,
      color: "text-blue-500",
      bg: "bg-blue-50/80 border-blue-100",
      glow: "hover:shadow-blue-100/50"
    },
    {
      title: "Home Care",
      desc: "Supplying portable respiratory support, oxygen concentrators, and high-quality durable devices designed for home patient therapy.",
      icon: Heart,
      color: "text-emerald-500",
      bg: "bg-emerald-50/80 border-emerald-100",
      glow: "hover:shadow-emerald-100/50"
    },
    {
      title: "Dermatology",
      desc: "Distributing precision laser platforms, advanced aesthetic therapy systems, and modern skin diagnostic equipment.",
      icon: Sparkles,
      color: "text-purple-500",
      bg: "bg-purple-50/80 border-purple-100",
      glow: "hover:shadow-purple-100/50"
    }
  ];

  const planningPillars = [
    {
      title: "Patient Care Optimization",
      desc: "Collaborating to improve patient flow and layout safety, minimizing congestion while ensuring a high standard of treatment environment.",
      bullet: "Improving patient flow",
      icon: Users,
      color: "text-sky-500",
      bg: "bg-sky-50"
    },
    {
      title: "Resource & Efficiency Optimization",
      desc: "Optimizing room spacing, clinical data sheets, and resource allocation to elevate institutional throughput and surgical safety.",
      bullet: "Optimizing patient care & operational efficiency",
      icon: TrendingUp,
      color: "text-indigo-500",
      bg: "bg-indigo-50"
    },
    {
      title: "Emergency Response Improvement",
      desc: "Designing responsive layouts and critical pathways to enhance clinical reaction speeds and safeguard emergency protocols.",
      bullet: "Enhancing emergency response protocols",
      icon: Clock,
      color: "text-rose-500",
      bg: "bg-rose-50"
    },
    {
      title: "Supply Chain & Flow Efficiency",
      desc: "Streamlining inventory management and equipment logistics to eliminate procurement gaps and ensure cost stability.",
      bullet: "Streamlining supply chain management",
      icon: Briefcase,
      color: "text-emerald-500",
      bg: "bg-emerald-50"
    }
  ];

  const whyChooseUs = [
    {
      title: "Established Since 2017",
      desc: "Solid industry roots with years of medical maintenance, planning, and premium equipment distribution in Egypt.",
      icon: Award,
      color: "text-blue-600 bg-blue-50 border-blue-100"
    },
    {
      title: "Trusted Medical Partner",
      desc: "Collaborating with premier healthcare networks, hospitals, and medical professionals to elevate clinical results.",
      icon: HeartHandshake,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100"
    },
    {
      title: "Smart Healthcare Solutions",
      desc: "Empowering clinicians to make faster decisions through modern smart devices, sensors, and applications.",
      icon: Zap,
      color: "text-amber-600 bg-amber-50 border-amber-100"
    },
    {
      title: "Expert Planning Team",
      desc: "Designing comprehensive hospital strategies and loaded mechanical layouts for flawless execution.",
      icon: Compass,
      color: "text-purple-600 bg-purple-50 border-purple-100"
    },
    {
      title: "High Quality Standards",
      desc: "Delivering high-quality patient care and rigorous safety audits on every diagnostic installation.",
      icon: ShieldCheck,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100"
    },
    {
      title: "Nationwide Support",
      desc: "Providing Egypt-wide responsive SLAs, field engineers, and climate-controlled spare parts facilities.",
      icon: Shield,
      color: "text-rose-600 bg-rose-50 border-rose-100"
    }
  ];

  const stats = [
    { value: "2017", label: "Year Established", desc: "Egyptian Corporate Roots" },
    { value: "35+", label: "Biomedical Engineers", desc: "Highly Certified Staff" },
    { value: "99.8%", label: "SLA Reliability", desc: "Minimized Clinical Downtime" },
    { value: "5,000+", label: "Devices Serviced", desc: "NIST-Traceable Standards" }
  ];

  return (
    <section className="bg-slate-50 relative overflow-hidden grid-bg">
      {/* Decorative top blur blob */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-medical-100/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-0 -translate-x-12 w-80 h-80 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* 1. Hero Section */}
      <div className="pt-20 pb-16 md:pt-28 md:pb-20 border-b border-slate-200/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">

            {/* Standalone Clinical Badge */}
            <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm mb-8 animate-fade-in">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-medical-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-medical-500"></span>
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-600">
                Alkaram Medical • Est. 2017
              </span>
            </div>

            {/* Standalone High-Resolution Brand Logo */}
            <div className="flex justify-center items-center mb-8">
              <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xl flex items-center justify-center animate-float">
                <img
                  src="/logo.png"
                  alt="Al Karam Medical Logo"
                  className="h-16 sm:h-20 md:h-24 w-auto object-contain"
                />
              </div>
            </div>

            {/* Headline & Supporting Text */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl leading-[1.15] mb-6">
              Empowering Healthcare Through{" "}
              <span className="bg-gradient-to-r from-medical-600 to-medical-400 bg-clip-text text-transparent">
                Smart Medical Devices
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Established in 2017, Al-Karam Medical collaborates with healthcare leaders across Egypt to optimize diagnostic precision, surgical reliability, and seamless clinical service delivery.
            </p>

          </div>
        </div>
      </div>

      {/* 2. Company Overview Section */}
      <div className="py-16 md:py-24 border-b border-slate-200/60 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Block: Core Mission Text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-medical-600 bg-medical-50 border border-medical-100 px-3 py-1 rounded-full w-fit block">
                  Corporate Overview
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-snug">
                  Integrated Healthcare Solutions
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Al-Karam Medical is a leading company in the medical devices field, established in 2017. We empower doctors to make faster decisions through smart medical devices and applications while focusing on delivering high-quality patient care.
              </p>

              <div className="p-5 sm:p-6 bg-slate-50 border border-slate-200/60 rounded-2xl flex items-start space-x-3.5 shadow-inner">
                <div className="p-2.5 bg-white rounded-xl text-medical-600 border border-slate-100 shadow-sm">
                  <ShieldCheck className="h-5 sm:h-6 w-5 sm:w-6" />
                </div>
                <div>
                  <span className="block text-xs sm:text-sm font-bold text-slate-800 leading-tight">
                    Registered Distributor & Agent
                  </span>
                  <span className="block text-[11px] sm:text-xs text-slate-500 mt-1 leading-relaxed">
                    We operate as a registered agent and distributor of premium medical solutions.
                  </span>
                </div>
              </div>
            </div>

            {/* Right Block: Trust Banner */}
            <div className="lg:col-span-5 bg-gradient-to-tr from-medical-900 to-medical-800 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[320px]">
              {/* Background gradient bubble */}
              <div className="absolute right-0 bottom-0 translate-y-1/4 translate-x-1/4 w-56 h-56 bg-medical-500/20 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <span className="text-[9px] font-bold text-medical-300 uppercase tracking-widest block">
                  Egypt Medical Licensing Compliant
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-snug">
                  Uncompromising Standards for Critical Sectors
                </h3>
                <p className="text-[11px] sm:text-xs text-medical-100 leading-relaxed font-normal">
                  Our dual approach pairs robust, certified device distribution with structured healthcare planning drawings, room data sheets, and on-site engineering checks.
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 mt-6 flex items-center space-x-2 relative z-10">
                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400 flex-shrink-0" />
                <span className="text-[9px] sm:text-[10px] text-emerald-300 font-bold uppercase tracking-wider">
                  NIST-Traceable Standards Traceability
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 3. Core Specializations Section */}
      <div className="py-16 md:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-medical-600 bg-medical-50 px-3.5 py-1.5 rounded-full">
              Sectors of Expertise
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mt-4 mb-4">
              Core Clinical Specializations
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              We specialize in distributing premium devices and smart clinical applications tailored to major clinical care sectors.
            </p>
          </div>

          {/* Specialization Cards (exactly 5) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {specializations.map((spec, index) => {
              const SpecIcon = spec.icon;
              return (
                <div
                  key={index}
                  className={`bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-medical-200 ${spec.glow} hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group`}
                >
                  <div>
                    {/* Circle icon wrapper */}
                    <div className={`w-11 h-11 rounded-2xl ${spec.bg} ${spec.color} flex items-center justify-center mb-5 border transition-transform duration-300 group-hover:scale-110`}>
                      <SpecIcon className="h-5.5 w-5.5" />
                    </div>

                    <h3 className="font-extrabold text-sm sm:text-base text-slate-800 mb-2 leading-tight group-hover:text-medical-600 transition-colors">
                      {spec.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      {spec.desc}
                    </p>
                  </div>

                  <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider border-t border-slate-100 pt-4 mt-5">
                    Premium Authorized
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* 4. Medical Planning & Healthcare Solutions Section */}
      <div className="py-16 md:py-24 bg-white border-b border-slate-200/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-medical-600 bg-medical-50 px-3.5 py-1.5 rounded-full">
              Strategic Solutions
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mt-4 mb-4">
              Medical Planning & Healthcare Solutions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-2xl mx-auto">
              Our company also specializes in medical planning, where we design and implement strategies to ensure seamless healthcare service delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-16">

            {/* Left Column: Plan description card */}
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200/60 p-8 rounded-3xl shadow-sm flex flex-col justify-between min-h-[350px]">
              <div className="space-y-4">
                <span className="text-[9px] font-bold text-medical-600 bg-medical-100 border border-medical-200 px-3 py-1 rounded-full uppercase tracking-wider w-fit block">
                  Collaborative Operations
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                  Designing Strategies for Healthcare Service Delivery
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  We collaborate with healthcare institutions, hospitals, and medical professionals to optimize patient care, resource allocation, and operational efficiency.
                </p>
              </div>

              <div className="p-4 bg-white border border-slate-100 rounded-2xl flex items-center space-x-3 text-medical-600 shadow-sm">
                <Compass className="h-5 w-5 text-medical-600 flex-shrink-0" />
                <span className="text-[11px] sm:text-xs font-extrabold text-slate-700 leading-tight">
                  Integrated Room Blueprints & Loaded Scaled Drawings
                </span>
              </div>
            </div>

            {/* Right Column: Interactive Infographic Grid of Planning expertise */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {planningPillars.map((p, index) => {
                const PIcon = p.icon;
                return (
                  <div
                    key={index}
                    className="bg-white p-5 rounded-2xl border border-slate-200/60 hover:border-medical-200 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                          Expertise area 0{index + 1}
                        </span>
                        <div className={`p-2 rounded-xl ${p.bg} ${p.color} border border-slate-100/50 shadow-sm`}>
                          <PIcon className="h-4.5 w-4.5" />
                        </div>
                      </div>

                      <h4 className="font-extrabold text-sm sm:text-base text-slate-800 mb-2 leading-tight">
                        {p.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-normal">
                        {p.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 mt-5 flex items-center space-x-2 text-[10px] sm:text-xs font-bold text-medical-600 bg-medical-50/50 -mx-5 -mb-5 p-4 rounded-b-2xl">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      <span className="leading-tight text-slate-700">
                        {p.bullet}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Expertise highlight note */}
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/60 text-center max-w-4xl mx-auto shadow-inner">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
              Our Primary Directive
            </span>
            <p className="text-xs sm:text-sm text-slate-600 font-bold leading-relaxed italic">
              "Our expertise is built on supporting healthcare organizations in delivering the highest standards of care to those in need."
            </p>
          </div>

        </div>
      </div>

      {/* 5. Why Choose Us Section */}
      <div className="py-16 md:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-medical-600 bg-medical-50 px-3.5 py-1.5 rounded-full">
              Why Choose Al Karam
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mt-4 mb-4">
              Our Key Pillars of Trust
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              We focus on premium quality, absolute reliability, and strategic planning protocols across Egypt.
            </p>
          </div>

          {/* 6 Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {whyChooseUs.map((pillar, idx) => {
              const PIcon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-lg hover:border-medical-200 hover:-translate-y-1.5 transition-all duration-300 flex items-start space-x-4 group"
                >
                  <div className={`p-3 rounded-2xl border ${pillar.color} flex-shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110`}>
                    <PIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-800 mb-2 leading-tight group-hover:text-medical-600 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>


      {/* 7. Call-To-Action (CTA) Section */}
      <div className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-medical-950 to-slate-900 text-white relative overflow-hidden">
        {/* Background visual highlight */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-medical-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-medical-400 bg-medical-900/60 px-4 py-2 rounded-full border border-medical-800 mb-6 inline-block">
            Immediate Consultations Available
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight max-w-3xl mx-auto mb-6">
            Equip Your Medical Facility With Smart Devices & High-Quality Care
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
            Whether you are building a new hospital ward, planning resource allocations, or setting up responsive annual maintenance SLAs, Al-Karam Medical provides seamless delivery.
          </p>

          {/* Triple buttons response grid */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">

            <button
              onClick={() => handleNavigation("contact")}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-medical-500 to-medical-400 hover:from-medical-600 hover:to-medical-500 text-white px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-medical-500/10 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <PhoneCall className="h-4.5 w-4.5" />
              <span>Request Consultation</span>
            </button>

            <button
              onClick={() => handleNavigation("products")}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/15 text-white border border-white/10 px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <Layers className="h-4.5 w-4.5" />
              <span>Explore Products</span>
            </button>

            <button
              onClick={() => handleNavigation("contact")}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white hover:bg-slate-50 text-slate-800 px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <span>Contact Us</span>
              <ArrowRight className="h-4.5 w-4.5" />
            </button>

          </div>
        </div>
      </div>

    </section>
  );
}

export default memo(AboutUs);
