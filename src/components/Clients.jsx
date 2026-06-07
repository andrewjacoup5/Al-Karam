import React, { useState, memo, useMemo, useCallback } from "react";
import { 
  Building2, 
  MapPin, 
  Search
} from "lucide-react";
import { CLIENTS } from "../data/servicesData";
import Pagination from "./Pagination";

// Memoized Card component to maximize rendering performance during search typing
const ClientCard = React.memo(({ client }) => {
  return (
    <div 
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
              e.target.parentNode.innerHTML = `<div class="text-medical-600 flex flex-col items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M18 12H6"/><path d="M12 6v12"/></svg></div>`;
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
  );
});

ClientCard.displayName = "ClientCard";

function Clients() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Constants
  const itemsPerPage = 12;

  // Search Logic with useMemo
  const filteredClients = useMemo(() => {
    const cleanQuery = searchQuery.trim().toLowerCase();
    if (!cleanQuery) return CLIENTS;
    return CLIENTS.filter((client) => {
      return (
        client.name.toLowerCase().includes(cleanQuery) ||
        client.arabicName.includes(cleanQuery) ||
        client.description.toLowerCase().includes(cleanQuery)
      );
    });
  }, [searchQuery]);

  // Handle Search Input changes & Reset current page
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  }, []);

  // Pagination bounds & slice logic
  const totalItems = filteredClients.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedClients = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredClients.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredClients, currentPage]);

  const startRange = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endRange = Math.min(currentPage * itemsPerPage, totalItems);

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

        {/* Clients Interactive Roster Panel */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/60 shadow-sm mb-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-lg text-slate-800 flex items-center">
                <Building2 className="h-5 w-5 mr-2 text-medical-600" />
                Hospital Reference Roster
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Showing {startRange}–{endRange} of {totalItems} Clients (Total {CLIENTS.length} verified clinical references)
              </p>
            </div>
            
            {/* Search filter input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search hospital name..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full bg-slate-50 border border-slate-200 focus:border-medical-500 focus:ring-2 focus:ring-medical-500/20 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-800 outline-none transition-all"
              />
            </div>
          </div>

          {/* Dynamic Grid of Clients */}
          {paginatedClients.length > 0 ? (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {paginatedClients.map((client, idx) => (
                  <ClientCard 
                    key={`${client.name}-${idx}`}
                    client={client}
                  />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="pt-6 border-t border-slate-100">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <Building2 className="h-10 w-10 text-slate-300 mx-auto mb-3 animate-pulse" />
              <h4 className="text-sm font-bold text-slate-700">No Hospitals Found</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1 leading-relaxed">
                Try clearing search terms to reset.
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

export default memo(Clients);
