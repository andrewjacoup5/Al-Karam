import React, { useState, memo, useMemo } from "react";
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  Award, 
  Layers, 
  Search,
  CheckCircle2
} from "lucide-react";
import { CLIENTS } from "../data/servicesData";

function Clients() {
  // Interactive filters
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedSector, setSelectedSector] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtering Logic
  const filteredClients = useMemo(() => {
    return CLIENTS.filter((client) => {
      // Search filter
      const matchesSearch = 
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.arabicName.includes(searchQuery) ||
        client.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Region filter
      let matchesRegion = true;
      if (selectedRegion !== "all") {
        if (selectedRegion === "Cairo") {
          matchesRegion = client.location.includes("Cairo");
        } else if (selectedRegion === "Giza") {
          matchesRegion = client.location.includes("Giza") || client.location.includes("Qalyubia") || client.location.includes("Obour");
        } else if (selectedRegion === "Alexandria") {
          matchesRegion = client.location.includes("Alexandria") || client.location.includes("Suez");
        } else if (selectedRegion === "Delta") {
          matchesRegion = client.location.includes("Delta") || client.location.includes("Menoufia");
        } else if (selectedRegion === "Upper Egypt") {
          matchesRegion = client.location.includes("Upper Egypt") || client.location.includes("Sinai") || client.location.includes("Aswan");
        }
      }

      // Sector filter
      const matchesSector = selectedSector === "all" || client.sector === selectedSector;

      return matchesSearch && matchesRegion && matchesSector;
    });
  }, [searchQuery, selectedRegion, selectedSector]);

  return (
    <section className="py-16 bg-slate-50 relative overflow-hidden grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-medical-600 bg-medical-50 px-3.5 py-1.5 rounded-full">
            Our References
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-4 mb-4">
            Trusted by Egypt's Leading Healthcare Institutions
          </h2>
          <p className="text-base text-slate-600">
            From premier multi-specialty medical cities to university pediatric hubs and charity heart foundations, we serve as the primary engineering support arm for critical clinical equipment.
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

        {/* 21 Clients Interactive Filter Showcase */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/60 shadow-sm mb-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-lg text-slate-800 flex items-center">
                <Building2 className="h-5 w-5 mr-2 text-medical-600" />
                Hospital Reference Roster
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Displaying {filteredClients.length} of {CLIENTS.length} verified clinical reference networks
              </p>
            </div>
            
            {/* Search filter input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search hospital name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-medical-500 focus:ring-2 focus:ring-medical-500/20 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-800 outline-none transition-all"
              />
            </div>
          </div>

          {/* Filters Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {/* Region Selector */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Filter By Egypt Region</label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: "all", label: "All Regions" },
                  { id: "Cairo", label: "Cairo" },
                  { id: "Giza", label: "Giza & Obour" },
                  { id: "Alexandria", label: "Alexandria" },
                  { id: "Delta", label: "Delta" },
                  { id: "Upper Egypt", label: "Upper Egypt & Sinai" }
                ].map((reg) => (
                  <button
                    key={reg.id}
                    onClick={() => setSelectedRegion(reg.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedRegion === reg.id
                        ? "bg-medical-600 text-white shadow-sm"
                        : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    {reg.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sector Selector */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Filter By Clinical Sector</label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: "all", label: "All Sectors" },
                  { id: "University Medical Center", label: "University Center" },
                  { id: "Private Care", label: "Private Care" },
                  { id: "Public Hospital", label: "Public Hospital" },
                  { id: "Heart Foundation", label: "Charity Foundation" }
                ].map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => setSelectedSector(sec.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedSector === sec.id
                        ? "bg-medical-600 text-white shadow-sm"
                        : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    {sec.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Dynamic Grid of 21 Clients */}
          {filteredClients.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredClients.map((client, idx) => (
                <div 
                  key={idx}
                  className="group bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-medical-300 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="flex flex-col items-center text-center">
                    
                    {/* Hospital Image Logo container */}
                    <div className="w-full h-24 bg-white p-3 rounded-xl border border-slate-200/50 shadow-inner flex items-center justify-center mb-4 overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-300">
                      <img
                        src={client.logo}
                        alt={client.name}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          // Fallback icon representation if path behaves unexpectedly
                          e.target.style.display = "none";
                          e.target.parentNode.innerHTML = `<div class="text-medical-600 flex flex-col items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8 animate-pulse-slow"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M18 12H6"/><path d="M12 6v12"/></svg></div>`;
                        }}
                      />
                    </div>

                    <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">
                      {client.sector}
                    </span>
                    
                    {/* English and Arabic Names */}
                    <h4 className="text-xs font-bold text-slate-800 leading-tight group-hover:text-medical-600 transition-colors">
                      {client.name}
                    </h4>
                    <span className="block text-[11px] font-semibold text-slate-400 mt-1 font-sans font-medium" dir="rtl">
                      {client.arabicName}
                    </span>

                    <p className="text-[10px] text-slate-500 leading-relaxed mt-2.5 line-clamp-2">
                      {client.description}
                    </p>

                  </div>

                  <div className="pt-3.5 border-t border-slate-100 mt-4 flex justify-between items-center text-[9px] font-bold text-slate-400">
                    <span className="flex items-center">
                      <MapPin className="h-3 w-3 mr-0.5 text-medical-500" />
                      {client.location}
                    </span>
                    <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-wider">
                      Active SLA
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <Building2 className="h-10 w-10 text-slate-300 mx-auto mb-3 animate-pulse" />
              <h4 className="text-sm font-bold text-slate-700">No Hospitals Found</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1 leading-relaxed">
                Try clearing search terms or selecting 'All Regions' / 'All Sectors' to reset filters.
              </p>
            </div>
          )}        </div>

      </div>
    </section>
  );
}

export default memo(Clients);
