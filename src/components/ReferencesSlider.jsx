import React, { useState, useEffect, useRef, memo } from "react";
import { ChevronLeft, ChevronRight, Building2, ArrowRight } from "lucide-react";
import { CLIENTS } from "../data/servicesData";

function ReferencesSlider({ setActivePage }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);

  // Group clients into sets based on screen size (responsive chunks)
  // We'll show 4 logos per slide on large screens, 2 on medium, 1 on small.
  // But a more interactive way is to slide by 1 item, showing a window of items!
  // Let's implement a beautiful window slider showing 4 items on desktop, 2 on tablet, 1 on mobile.
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const itemsPerSlide = windowWidth >= 1024 ? 4 : windowWidth >= 640 ? 2 : 1;
  const maxIndex = CLIENTS.length - itemsPerSlide;

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex >= maxIndex) {
          return 0;
        }
        return prevIndex + 1;
      });
    }, 5000); // 5 seconds interval
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        return maxIndex;
      }
      return prevIndex - 1;
    });
    resetTimer();
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex >= maxIndex) {
        return 0;
      }
      return prevIndex + 1;
    });
    resetTimer();
  };

  const handleNavToClients = () => {
    setActivePage("clients");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="py-16 bg-white border-b border-slate-200/60 relative overflow-hidden">
      {/* Background soft green blur */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-12 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-medical-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-medical-600 bg-medical-50 border border-medical-100/50 px-3.5 py-1.5 rounded-full mb-4">
              Our References
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-snug">
              Trusted by Egypt's Leading Healthcare Networks
            </h2>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Highly qualified biomedical engineering team providing medical equipment planning, corrective maintenance, preventive service, and OEM spare parts management across Egypt.
            </p>
          </div>

          <button
            onClick={handleNavToClients}
            className="flex-shrink-0 inline-flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-medical-600 hover:text-medical-700 transition-colors group cursor-pointer"
          >
            <span>View All Roster ({CLIENTS.length} Networks)</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Carousel Slider Wrapper */}
        <div className="relative group/slider px-4 sm:px-8">

          {/* Slider Window Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out gap-6"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerSlide)}%)`,
              }}
            >
              {CLIENTS.map((client, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
                >
                  <div className="bg-slate-50 border border-slate-200/50 hover:border-medical-300 hover:bg-white p-5 rounded-3xl transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between h-[210px] group/card relative overflow-hidden">
                    {/* Logo container */}
                    <div className="h-24 bg-white p-3 rounded-2xl border border-slate-100 shadow-inner flex items-center justify-center overflow-hidden mb-4 relative">
                      <img
                        src={client.logo}
                        alt={client.name}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain filter group-hover/card:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.parentNode.innerHTML = `<div class="text-medical-600 flex flex-col items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M18 12H6"/><path d="M12 6v12"/></svg></div>`;
                        }}
                      />
                    </div>

                    {/* Metadata */}
                    <div className="text-center flex-grow flex flex-col justify-end">
                      <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                        {client.sector}
                      </span>
                      <h4 className="text-xs font-bold text-slate-800 line-clamp-1 group-hover/card:text-medical-600 transition-colors leading-tight">
                        {client.name}
                      </h4>
                      <span className="block text-[10px] font-semibold text-slate-400 mt-0.5 font-sans" dir="rtl">
                        {client.arabicName}
                      </span>
                    </div>

                    {/* Left overlay active border indicator */}
                    <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-medical-500 to-medical-400 opacity-0 group-hover/card:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 p-2.5 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer opacity-0 group-hover/slider:opacity-100"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4.5 w-4.5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 p-2.5 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer opacity-0 group-hover/slider:opacity-100"
            aria-label="Next slide"
          >
            <ChevronRight className="h-4.5 w-4.5" />
          </button>

        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex justify-center items-center space-x-1.5 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, dIdx) => (
            <button
              key={dIdx}
              onClick={() => {
                setCurrentIndex(dIdx);
                resetTimer();
              }}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${currentIndex === dIdx
                  ? "w-6 bg-medical-500"
                  : "w-1.5 bg-slate-200 hover:bg-slate-400"
                }`}
              aria-label={`Go to slide ${dIdx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default memo(ReferencesSlider);
