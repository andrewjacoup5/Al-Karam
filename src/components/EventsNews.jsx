import React, { useState, memo } from "react";
import { 
  Calendar, 
  ArrowUpRight, 
  Zap, 
  MapPin, 
  Pin, 
  Layers,
  Sparkles,
  Eye,
  X,
  Clock
} from "lucide-react";

// Updated Events and News data matching user requests
const EVENTS_AND_NEWS_DATA = {
  2026: {
    events: [
      {
        id: "africa-health-excon-2026",
        title: "Africa Health ExCon 2026",
        subtitle: "Continental Health Care Gateway",
        category: "Exhibition",
        date: "June 16–18, 2026",
        location: "Egypt International Exhibition Center (EIEC) – Cairo, Egypt",
        booth: "Hall 2 | Booth F63",
        desc: "Join Alkaram-medical at Africa Health ExCon 2026, Meet our team, discover our healthcare solutions, and explore new opportunities for collaboration in the medical sector.",
        images: [
          "/assets/Events & News/2026/Events/Africa Health ExCon.jpg",
          "/assets/Events & News/2026/Events/Africa Health ExCon 2.jpg"
        ],
        highlights: [
          "Interactive medical equipment demos",
          "One-on-one sessions with our engineering heads",
          "Exploring new distribution and technical partnerships",
          "Calibration standards live demonstration"
        ]
      }
    ],
    news: [] // Empty as requested
  },
  2025: {
    events: [], // Empty as requested
    news: [] // Empty as requested
  },
  2024: {
    events: [], // Empty as requested
    news: [] // Empty as requested
  }
};

// Premium placeholder component for empty states displaying "Soon"
const EmptyStateSoon = ({ type }) => (
  <div className="bg-slate-50/50 border border-slate-100/80 rounded-3xl p-10 text-center flex flex-col items-center justify-center min-h-[260px] relative overflow-hidden glass-panel">
    <Clock className="h-9 w-9 text-medical-500/80 animate-pulse mb-4" />
    <span className="text-xl font-extrabold uppercase tracking-widest bg-gradient-to-r from-medical-600 to-accent-600 bg-clip-text text-transparent">
      Soon
    </span>
    <p className="text-xs text-slate-400 mt-2 font-medium max-w-xs">
      {type === "news" 
        ? "Biomedical news and laboratory updates are currently being prepared." 
        : "Upcoming medical exhibition and congress schedules will be listed shortly."}
    </p>
  </div>
);

function EventsNews() {
  const [selectedYear, setSelectedYear] = useState(2026);
  const [lightboxImage, setLightboxImage] = useState(null);

  const years = [2026, 2025, 2024];
  const currentYearData = EVENTS_AND_NEWS_DATA[selectedYear] || { events: [], news: [] };

  return (
    <section className="py-16 bg-white relative overflow-hidden grid-bg animate-page-enter">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-medical-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-medical-600 bg-medical-50 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 border border-medical-100">
            <Sparkles className="h-3.5 w-3.5 text-medical-500 animate-pulse" />
            Corporate Timeline
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mt-4 mb-4">
            Events & Biomedical News
          </h2>
          <p className="text-base text-slate-600">
            Follow Alkaram Medical across the years. Explore our major clinical exhibition events, technical workshops, and laboratory upgrades.
          </p>
        </div>

        {/* Premium Year Selector Timeline */}
        <div className="relative flex items-center justify-center max-w-md mx-auto mb-16 px-4">
          <div className="absolute inset-x-0 h-0.5 bg-slate-100 top-1/2 -translate-y-1/2" />
          <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-medical-200 via-medical-500 to-accent-300 top-1/2 -translate-y-1/2 opacity-30" />
          
          <div className="relative flex justify-between w-full z-10">
            {years.map((year) => {
              const isSelected = selectedYear === year;
              return (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`relative flex flex-col items-center justify-center w-14 h-14 rounded-full border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "bg-medical-600 border-medical-600 text-white scale-110 shadow-lg shadow-medical-200"
                      : "bg-white border-slate-200 text-slate-500 hover:border-medical-400 hover:text-medical-600"
                  }`}
                >
                  <span className="text-sm font-bold tracking-tight">{year}</span>
                  {isSelected && (
                    <span className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-medical-600 animate-ping" />
                  )}
                  {year === 2026 && (
                    <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-accent-500 border-2 border-white"></span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic content split grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Events Section - Left Column (Col span 7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center space-x-2.5 pb-2 border-b border-slate-100">
              <Calendar className="h-5.5 w-5.5 text-medical-600" />
              <h3 className="text-xl font-bold text-slate-800 tracking-tight">
                {selectedYear} Events & Exhibitions
              </h3>
            </div>

            {currentYearData.events.length === 0 ? (
              <EmptyStateSoon type="events" />
            ) : (
              currentYearData.events.map((event) => (
                <div 
                  key={event.id}
                  className="bg-white border border-slate-100 rounded-3xl p-6 hover:shadow-xl hover:border-medical-200 transition-all duration-300"
                >
                  <div className="flex justify-between items-start flex-wrap gap-2 mb-4">
                    <div>
                      <span className="text-[10px] font-bold text-medical-700 bg-medical-50 border border-medical-100 px-3 py-1 rounded-full uppercase tracking-wider">
                        {event.category}
                      </span>
                      <h4 className="text-lg sm:text-xl font-bold text-slate-800 mt-2">
                        {event.title}
                      </h4>
                      <p className="text-xs text-slate-400 font-semibold mt-0.5">
                        {event.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Event Details Grid */}
                  <div className="bg-slate-50 border border-slate-100/80 rounded-2xl p-4 space-y-3 mb-5">
                    <div className="flex items-start space-x-3 text-xs">
                      <Calendar className="h-4.5 w-4.5 text-medical-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-700 block">Date</span>
                        <span className="text-slate-500">{event.date}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 text-xs">
                      <MapPin className="h-4.5 w-4.5 text-rose-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-700 block">Location</span>
                        <span className="text-slate-500">{event.location}</span>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 text-xs">
                      <Pin className="h-4.5 w-4.5 text-accent-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-700 block">Booth Placement</span>
                        <span className="text-slate-500 font-semibold">{event.booth}</span>
                      </div>
                    </div>
                  </div>

                  {/* Event Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {event.desc}
                  </p>

                  {/* Highlights Bullet Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {event.highlights.map((highlight, idx) => (
                      <span 
                        key={idx} 
                        className="text-[11px] font-medium text-slate-600 bg-slate-50 border border-slate-100 px-2.5 py-1.5 rounded-xl flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-500 flex-shrink-0" />
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {/* Event Image Gallery */}
                  {event.images && event.images.length > 0 && (
                    <div className="border-t border-slate-100 pt-6">
                      <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                        <Layers className="h-4 w-4 text-medical-500" />
                        Event Media Gallery
                      </h5>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {event.images.map((imgUrl, imgIdx) => (
                          <div 
                            key={imgIdx}
                            onClick={() => setLightboxImage(imgUrl)}
                            className="relative group overflow-hidden rounded-2xl border border-slate-200 shadow-sm aspect-[4/3] cursor-pointer"
                          >
                            <img
                              src={imgUrl}
                              alt={`${event.title} image ${imgIdx + 1}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            
                            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                              <div className="p-3 bg-white/95 rounded-full shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300">
                                <Eye className="h-5 w-5 text-medical-600" />
                              </div>
                            </div>

                            <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-slate-900/60 backdrop-blur-md px-2 py-0.5 rounded-md">
                              View {imgIdx + 1}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              ))
            )}
          </div>

          {/* News Section - Right Column (Col span 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-2.5 pb-2 border-b border-slate-100">
              <Layers className="h-5.5 w-5.5 text-accent-500" />
              <h3 className="text-xl font-bold text-slate-800 tracking-tight">
                {selectedYear} News & Updates
              </h3>
            </div>

            {currentYearData.news.length === 0 ? (
              <EmptyStateSoon type="news" />
            ) : (
              <div className="space-y-4">
                {currentYearData.news.map((item) => {
                  const CardIcon = item.icon || Zap;
                  return (
                    <div 
                      key={item.id} 
                      className="bg-slate-50 border border-slate-100 hover:border-medical-200 hover:bg-white hover:shadow-lg rounded-2xl p-5 transition-all duration-300"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[9px] font-bold text-medical-600 bg-medical-50 border border-medical-100 px-2 py-0.5 rounded-md uppercase tracking-wider">
                          {item.category}
                        </span>
                        <div className="flex items-center space-x-1 text-[10px] text-slate-400 font-semibold">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{item.date}</span>
                        </div>
                      </div>

                      <h4 className="text-sm sm:text-base font-bold text-slate-800 mb-2">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed mb-4">
                        {item.desc}
                      </p>

                      {item.highlights && item.highlights.length > 0 && (
                        <div className="space-y-1.5 mb-4">
                          {item.highlights.map((hl, idx) => (
                            <div key={idx} className="flex items-center space-x-2 bg-white/70 p-1.5 rounded-xl border border-slate-100/60">
                              <div className="w-1.5 h-1.5 rounded-full bg-medical-500 flex-shrink-0" />
                              <span className="text-[10px] font-semibold text-slate-700">{hl}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="pt-3 border-t border-slate-200/50 flex justify-between items-center">
                        <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 font-semibold">
                          <CardIcon className="h-4 w-4 text-medical-500" />
                          <span>Verified Status</span>
                        </div>
                        <span className="text-[9px] font-bold text-medical-600 hover:text-medical-700 cursor-pointer flex items-center">
                          Read Details
                          <ArrowUpRight className="h-3 w-3 ml-0.5" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Premium Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <button 
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors cursor-pointer"
            onClick={() => setLightboxImage(null)}
          >
            <X className="h-6 w-6" />
          </button>

          <div 
            className="relative max-w-5xl max-h-[85vh] overflow-hidden rounded-2xl shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={lightboxImage} 
              alt="Event gallery highlight" 
              className="max-w-full max-h-[80vh] object-contain block mx-auto rounded-xl"
            />
            
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-center">
              <p className="text-white text-xs font-semibold tracking-wide uppercase">
                Alkaram Medical Exhibition Highlight
              </p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}

export default memo(EventsNews);
