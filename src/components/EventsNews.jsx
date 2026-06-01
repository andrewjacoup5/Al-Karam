import React, { useState, memo, useMemo } from "react";
import { Calendar, Tag, ArrowUpRight, Award, Zap, Library } from "lucide-react";

const NEWS_ITEMS = [
  {
    id: 1,
    category: "Upgrades",
    title: "New Fluke Biomedical Simulator Stock Acquired",
    date: "May 15, 2026",
    desc: "Alkaram Medical expands its laboratory metrology capabilities with the addition of the latest generation of Fluke electrical safety analyzers and dynamic gas flow simulators.",
    highlights: ["NIST-Traceable Certificates", "Anesthesia Output Audits ready"],
    icon: Zap
  },
  {
    id: 2,
    category: "Training",
    title: "Biomedical ISO 13485 Training Seminar Completed",
    date: "April 28, 2026",
    desc: "Our engineering squad successfully completed a comprehensive 5-day professional seminar detailing modern revisions of ISO 13485 clinical device quality guidelines.",
    highlights: ["100% Team Certified", "AAMI Standards Integration"],
    icon: Award
  },
  {
    id: 3,
    category: "Operations",
    title: "ICU Ventilator Bank Refit at As-Salam Hospital",
    date: "March 10, 2026",
    desc: "Alkaram engineering teams successfully completed a full system upgrade and scheduled preventive maintenance on 22 critical care respirators within record response windows.",
    highlights: ["Completed in 36 Hours", "Zero Clinical Downtime"],
    icon: Library
  },
  {
    id: 4,
    category: "Upgrades",
    title: "Enhanced Spare Parts Sourcing Corridor Established",
    date: "February 18, 2026",
    desc: "We are pleased to announce direct technical alliances with prominent European medical manufacturers, guaranteeing rapid import of verified OEM valves, boards, and sensors.",
    highlights: ["Direct European Supply", "2-Day Urgent Sourcing SLA"],
    icon: Tag
  }
];

function EventsNews() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredNews = useMemo(() => {
    return activeFilter === "all" 
      ? NEWS_ITEMS 
      : NEWS_ITEMS.filter(item => item.category.toLowerCase() === activeFilter.toLowerCase());
  }, [activeFilter]);

  return (
    <section className="py-16 bg-white relative overflow-hidden grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-medical-600 bg-medical-50 px-3.5 py-1.5 rounded-full">
            Company Milestones
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mt-4 mb-4">
            Recent Events & Biomedical News
          </h2>
          <p className="text-base text-slate-600">
            Keep track of our technological upgrades, successful hospital refits, and continuous training achievements across Egypt's clinical engineering sector.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center space-x-2.5 mb-12">
          {["All", "Upgrades", "Training", "Operations"].map((filter) => {
            const isSelected = activeFilter === filter.toLowerCase();
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter.toLowerCase())}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-medical-600 border-medical-600 text-white shadow-md shadow-medical-100"
                    : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {filteredNews.map((item) => {
            const CardIcon = item.icon;
            return (
              <div 
                key={item.id} 
                className="bg-slate-50 p-6 rounded-3xl border border-slate-100 hover:border-medical-200 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Category and Date row */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-bold text-medical-600 bg-medical-50 border border-medical-100 px-3 py-1 rounded-full uppercase tracking-wider">
                      {item.category}
                    </span>
                    <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-semibold">
                      <Calendar className="h-4 w-4" />
                      <span>{item.date}</span>
                    </div>
                  </div>

                  {/* News Title & Description */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-3 group">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
                    {item.desc}
                  </p>

                  {/* Bullet highlight points */}
                  <div className="space-y-2 mb-6">
                    {item.highlights.map((hl, idx) => (
                      <div key={idx} className="flex items-center space-x-2 bg-white/70 p-2 rounded-xl border border-slate-100/60">
                        <div className="w-1.5 h-1.5 rounded-full bg-medical-500 flex-shrink-0" />
                        <span className="text-[11px] font-bold text-slate-700">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Info */}
                <div className="pt-4 border-t border-slate-200/50 flex justify-between items-center">
                  <div className="flex items-center space-x-2 text-xs text-slate-400 font-semibold">
                    <CardIcon className="h-4.5 w-4.5 text-medical-500" />
                    <span>Technological Standard Verified</span>
                  </div>
                  <span className="text-[10px] font-bold text-medical-600 hover:text-medical-700 cursor-pointer flex items-center">
                    Read Case Study
                    <ArrowUpRight className="h-3 w-3 ml-1" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default memo(EventsNews);
