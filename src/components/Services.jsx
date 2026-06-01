import React, { useState, memo } from "react";
import { 
  Wrench, 
  Layers, 
  ShieldCheck, 
  Activity, 
  CheckCircle2, 
  ChevronRight, 
  MapPin, 
  AlertTriangle,
  ClipboardList,
  Compass,
  ArrowRight
} from "lucide-react";
import { MEDICAL_PLANNING, MAINTENANCE_SERVICES } from "../data/servicesData";

function Services({ setActivePage }) {
  const [activeTab, setActiveTab] = useState("planning"); // planning | maintenance
  const [planningPhase, setPlanningPhase] = useState(0); // active phase for planner roadmap (0-3)

  return (
    <section className="py-16 bg-white relative overflow-hidden grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-medical-600 bg-medical-50 px-3.5 py-1.5 rounded-full">
            Biomedical Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-4 mb-4">
            Professional Healthcare Equipment Services
          </h2>
          <p className="text-base text-slate-600">
            Al Karam Medical provides fully integrated solutions spanning comprehensive medical equipment planning and Egypt-wide diagnostic maintenance and technical support.
          </p>
        </div>

        {/* Brand Logo in Notable Position */}
        <div className="flex justify-center items-center mb-12">
          <div className="bg-white p-4.5 rounded-2xl border border-slate-100 shadow-lg flex items-center justify-center">
            <img 
              src="/logo.png" 
              alt="Al Karam Medical Logo" 
              className="h-16 md:h-20 w-auto object-contain" 
            />
          </div>
        </div>

        {/* Double-Pillar Dynamic Dashboard Selector */}
        <div className="max-w-xl mx-auto bg-slate-100 p-2 rounded-2xl flex items-center space-x-2 mb-16 shadow-inner">
          <button
            onClick={() => setActiveTab("planning")}
            className={`flex-1 flex items-center justify-center space-x-2 py-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "planning"
                ? "bg-white text-medical-600 shadow-md translate-y-0"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Compass className="h-4.5 w-4.5" />
            <span>1. Medical Equipment Planning</span>
          </button>
          
          <button
            onClick={() => setActiveTab("maintenance")}
            className={`flex-1 flex items-center justify-center space-x-2 py-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "maintenance"
                ? "bg-white text-medical-600 shadow-md translate-y-0"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Wrench className="h-4.5 w-4.5" />
            <span>2. Maintenance & Support</span>
          </button>
        </div>

        {/* Render Tab Content with Interactive Elements */}
        {activeTab === "planning" ? (
          <div className="animate-page-enter">
            {/* Medical Planning Pillar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
              
              {/* Left description column */}
              <div className="lg:col-span-5 bg-gradient-to-tr from-medical-900 to-medical-800 text-white p-8 rounded-3xl shadow-md flex flex-col justify-between relative overflow-hidden">
                <div className="absolute right-0 bottom-0 translate-y-1/4 translate-x-1/4 w-64 h-64 bg-medical-500/10 rounded-full blur-2xl pointer-events-none" />
                
                <div>
                  <span className="text-[10px] font-bold text-medical-300 uppercase tracking-widest block mb-4">
                    Full-Cycle Medical Services
                  </span>
                  <h3 className="text-2xl font-extrabold tracking-tight mb-4">
                    {MEDICAL_PLANNING.title}
                  </h3>
                  <p className="text-xs text-medical-100 leading-relaxed mb-6 font-medium">
                    {MEDICAL_PLANNING.intro}
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                  <div className="flex items-start space-x-3 text-amber-300">
                    <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <p className="text-[11px] leading-relaxed text-medical-100 font-medium">
                      {MEDICAL_PLANNING.warning}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Step-by-Step Project Roadmap Visualizer */}
              <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-base text-slate-800 uppercase tracking-wider mb-6 flex items-center">
                    <ClipboardList className="h-5 w-5 mr-2 text-medical-600" />
                    Interactive Planning Roadmap
                  </h3>
                  
                  {/* Step circles */}
                  <div className="grid grid-cols-4 gap-2 mb-8 relative">
                    {/* Background link line */}
                    <div className="absolute top-5 left-8 right-8 h-0.5 bg-slate-200 -z-0 hidden sm:block" />
                    {MEDICAL_PLANNING.process.map((p, idx) => {
                      const isActive = planningPhase === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setPlanningPhase(idx)}
                          className="flex flex-col items-center relative z-10 focus:outline-none cursor-pointer group"
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shadow-sm transition-all duration-300 ${
                            isActive
                              ? "bg-medical-600 text-white scale-110 shadow-md ring-4 ring-medical-500/20"
                              : "bg-white text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-600 border border-slate-200"
                          }`}>
                            0{idx + 1}
                          </div>
                          <span className={`text-[10px] font-bold mt-2 uppercase tracking-wide transition-colors ${
                            isActive ? "text-medical-600" : "text-slate-400"
                          }`}>
                            {p.phase}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Phase Deliverables */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/50 shadow-inner min-h-[220px] flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-bold text-medical-600 bg-medical-50 px-2.5 py-1 rounded-full uppercase tracking-wider border border-medical-100">
                          Phase 0{planningPhase + 1}: {MEDICAL_PLANNING.process[planningPhase].phase}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">
                          {MEDICAL_PLANNING.process[planningPhase].title}
                        </span>
                      </div>
                      
                      <div className="space-y-4">
                        {MEDICAL_PLANNING.process[planningPhase].items.map((item, index) => (
                          <div key={index} className="flex items-start space-x-2.5">
                            <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="block text-xs font-bold text-slate-800 leading-tight">
                                {item.name}
                              </span>
                              <span className="block text-[11px] text-slate-500 mt-1 leading-relaxed">
                                {item.desc}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>

                <div className="pt-6 border-t border-slate-200 mt-6 flex justify-between items-center text-xs text-slate-400">
                  <span>* Click each phase index above to explore technical deliverables.</span>
                  <button 
                    onClick={() => setPlanningPhase((prev) => (prev + 1) % 4)}
                    className="text-medical-600 font-bold hover:text-medical-700 flex items-center cursor-pointer"
                  >
                    <span>Next Phase</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </button>
                </div>
              </div>

            </div>

            {/* Why Choose Us Cards */}
            <div className="mt-16">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Planning Core Pillars
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 mt-2">
                  What Sets Our Medical Planning Apart
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {MEDICAL_PLANNING.whyChooseUs.map((pillar, idx) => (
                  <div 
                    key={idx} 
                    className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-medical-200 hover:bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-medical-50 flex items-center justify-center text-medical-600 font-extrabold text-sm mb-4 border border-medical-100">
                        {idx + 1}
                      </div>
                      <h4 className="font-extrabold text-sm text-slate-800 mb-2">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                    
                    <div className="pt-4 mt-4 border-t border-slate-100 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      Planning standard guaranteed
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Call for planning */}
            <div className="mt-16 text-center">
              <button
                onClick={() => setActivePage("contact")}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-medical-600 to-medical-500 hover:from-medical-700 hover:to-medical-600 text-white px-8 py-3.5 rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <span>Request Comprehensive Medical Planning Brief</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-page-enter">
            {/* Maintenance Pillar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
              
              {/* Left Column: Summary and Sectors */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* Intro summary card */}
                <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
                  <span className="text-[10px] font-bold text-medical-600 bg-medical-50 px-2 py-0.5 rounded uppercase tracking-wider">
                    Egypt-Wide Command
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-2 mb-4">
                    {MAINTENANCE_SERVICES.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {MAINTENANCE_SERVICES.intro}
                  </p>
                  <p className="text-xs text-slate-500 italic leading-relaxed border-l-2 border-emerald-500 pl-3">
                    {MAINTENANCE_SERVICES.safetyCallout}
                  </p>
                </div>

                {/* Grid of clinical sectors covered */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                  <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider mb-4">
                    Clinical Sectors Serviced
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {MAINTENANCE_SERVICES.sectors.map((sec, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 hover:bg-white border border-slate-100 hover:border-medical-200 hover:shadow-sm rounded-xl transition-all duration-300">
                        <span className="block text-xs font-bold text-slate-800 leading-tight mb-1">
                          {sec.name}
                        </span>
                        <span className="block text-[10px] text-slate-400 font-medium">
                          {sec.details}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Deliverables ledger */}
              <div className="lg:col-span-6 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-base text-slate-800 uppercase tracking-wider mb-6 flex items-center">
                    <CheckCircle2 className="h-5 w-5 mr-2 text-emerald-500" />
                    Engineering Deliverables
                  </h3>
                  
                  <div className="space-y-4">
                    {MAINTENANCE_SERVICES.deliverables.map((del, idx) => (
                      <div key={idx} className="bg-white p-4.5 rounded-2xl border border-slate-200/50 shadow-sm flex items-start space-x-3.5 hover:border-medical-200 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-medical-50 text-medical-600 flex items-center justify-center font-bold text-xs flex-shrink-0">
                          {idx + 1}
                        </div>
                        <div>
                          <span className="block text-xs font-extrabold text-slate-800">
                            {del.name}
                          </span>
                          <span className="block text-[11px] text-slate-500 mt-1 leading-relaxed">
                            {del.desc}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200 mt-6 text-[11px] text-slate-400 leading-relaxed">
                  {MAINTENANCE_SERVICES.experienceCallout}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}

export default memo(Services);
