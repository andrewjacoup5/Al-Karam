import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  Search,
  FolderOpen,
  Folder,
  Eye,
  HardDrive,
  SlidersHorizontal,
  Layers,
  CheckCircle,
  FileText,
  Image as ImageIcon
} from "lucide-react";
import { PRODUCT_CATALOG } from "../data/productsCatalog";
import { getMainProductImage } from "../utils/productUtils";
import Pagination from "./Pagination";
import ProductModal from "./ProductModal";

// Clinical sector metadata to match folders with premium aesthetic look
const SECTOR_METADATA = {
  "Ambulance": { icon: Folder, color: "from-amber-500 to-orange-500", desc: "Emergency & EMS Transport" },
  "Clinics": { icon: Folder, color: "from-blue-500 to-indigo-500", desc: "Outpatient & Examination Rooms" },
  "Dialysis": { icon: Folder, color: "from-teal-500 to-emerald-500", desc: "Renal Care & Treatment Units" },
  "ER": { icon: Folder, color: "from-red-500 to-rose-600", desc: "Emergency Room Critical Systems" },
  "ICU": { icon: Folder, color: "from-rose-500 to-pink-500", desc: "Intensive Care Unit Monitors & Ventilators" },
  "IN-Patient": { icon: Folder, color: "from-purple-500 to-violet-500", desc: "Ward Beds & Patient Infrastructure" },
  "Medical Gases": { icon: Folder, color: "from-cyan-500 to-sky-500", desc: "Gas Cylinders, Regulators & Flowmeters" },
  "OR": { icon: Folder, color: "from-indigo-500 to-purple-600", desc: "Operating Room Surgical Equipment" }
};

/**
 * Performance-optimized Card Image using IntersectionObserver.
 */
const OptimizedCardImage = React.memo(({ src, alt }) => {
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !src) return;
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
    img.onerror = () => {
      console.warn("Card image loading failed: ", src);
      setError(true);
    };
  }, [visible, src]);

  if (error || !src) {
    return (
      <div className="w-full h-full bg-slate-100 flex items-center justify-center">
        <ImageIcon className="h-8 w-8 text-slate-300" />
      </div>
    );
  }

  return (
    <div ref={ref} className="w-full h-full bg-slate-50 relative flex items-center justify-center overflow-hidden">
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 animate-pulse flex items-center justify-center">
          <ImageIcon className="h-6 w-6 text-slate-300 animate-bounce" />
        </div>
      )}
      {visible && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
});

/**
 * Highly optimized Product Card using React.memo.
 */
const ProductCard = React.memo(({ device, onClick }) => {
  const defaultVersion = device.versions[0] || {};
  const images = defaultVersion.images || [];
  const docs = defaultVersion.documents || [];

  // Main Image selection utility
  const mainImage = getMainProductImage(images);

  // Stats summaries
  const imageCount = images.length;
  const docCount = docs.length;

  return (
    <article
      onClick={onClick}
      className="group bg-white rounded-3xl border border-slate-200/60 hover:border-medical-300 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden cursor-pointer active:scale-[0.99]"
    >
      {/* Top Image Preview */}
      <div className="aspect-[4/3] w-full overflow-hidden bg-slate-50 border-b border-slate-100 relative">
        <OptimizedCardImage src={mainImage} alt={device.name} />

        {/* Category tag */}
        <span className="absolute top-4 right-4 text-[9px] font-extrabold uppercase tracking-widest text-slate-600 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full shadow-sm">
          {device.category}
        </span>
      </div>

      {/* Detail contents */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-medical-600">
            {device.brand}
          </span>
          <h3 className="text-base font-bold text-slate-800 mt-1 leading-snug group-hover:text-medical-700 transition-colors">
            {device.name}
          </h3>
          <span className="block text-[10px] text-slate-400 font-mono mt-1">
            dir: {device.brand} - {device.name}
          </span>
        </div>

        {/* Metadata Footer */}
        <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-500">
          <div className="flex items-center space-x-2">
            <span className="flex items-center bg-slate-50 px-2 py-0.5 rounded border border-slate-150">
              <ImageIcon className="h-3 w-3 mr-1 text-slate-400" />
              {imageCount}
            </span>
            <span className="flex items-center bg-slate-50 px-2 py-0.5 rounded border border-slate-150">
              <FileText className="h-3 w-3 mr-1 text-slate-400" />
              {docCount}
            </span>
          </div>

          <span className="text-medical-600 group-hover:underline flex items-center">
            Explore Asset &rarr;
          </span>
        </div>
      </div>
    </article>
  );
});

export default function Products() {
  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  
  // Active details modal state
  const [activeDevice, setActiveDevice] = useState(null);
  const [activeVersionIdx, setActiveVersionIdx] = useState(0);

  // Auto-pagination cycle controller references
  const [isHovered, setIsHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const autoPageTimerRef = useRef(null);
  const interactionTimeoutRef = useRef(null);

  // Clear filters
  const handleClearFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategory("All");
    setCurrentPage(1);
  }, []);

  // Set selected category and reset page
  const handleCategorySelect = useCallback((category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    triggerInteractionPause();
  }, []);

  // Handle Search Input Change
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
    triggerInteractionPause();
  }, []);

  // Set interaction pausing to prevent sudden page changes while user is searching
  const triggerInteractionPause = () => {
    setIsInteracting(true);
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    interactionTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 8000); // Resume 8 seconds after last keystroke/click
  };

  // Filtered devices calculation using useMemo
  const filteredProducts = useMemo(() => {
    return PRODUCT_CATALOG.filter((device) => {
      const matchCategory =
        selectedCategory === "All" || device.category === selectedCategory;
      const cleanQuery = searchQuery.trim().toLowerCase();
      const matchSearch =
        cleanQuery === "" ||
        device.name.toLowerCase().includes(cleanQuery) ||
        device.brand.toLowerCase().includes(cleanQuery) ||
        device.category.toLowerCase().includes(cleanQuery) ||
        device.folderName.toLowerCase().includes(cleanQuery);
      return matchCategory && matchSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Paginated devices slice using useMemo (16 items/page)
  const paginatedProducts = useMemo(() => {
    const startIdx = (currentPage - 1) * 16;
    return filteredProducts.slice(startIdx, startIdx + 16);
  }, [filteredProducts, currentPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredProducts.length / 16);
  }, [filteredProducts]);

  // Auto Pagination interval
  useEffect(() => {
    if (totalPages <= 1 || isHovered || isInteracting || activeDevice) {
      if (autoPageTimerRef.current) clearInterval(autoPageTimerRef.current);
      return;
    }

    autoPageTimerRef.current = setInterval(() => {
      setCurrentPage((prev) => (prev % totalPages) + 1);
    }, 5000);

    return () => {
      if (autoPageTimerRef.current) clearInterval(autoPageTimerRef.current);
    };
  }, [totalPages, isHovered, isInteracting, activeDevice]);

  // Clean timeouts on unmount
  useEffect(() => {
    return () => {
      if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    };
  }, []);

  // Handle opening product modal
  const handleOpenModal = useCallback((device) => {
    setActiveDevice(device);
    setActiveVersionIdx(0);
  }, []);

  // Handle closing product modal
  const handleCloseModal = useCallback(() => {
    setActiveDevice(null);
  }, []);

  return (
    <section id="products-catalog" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Background blueprint aesthetics */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-black uppercase tracking-widest text-medical-600 bg-medical-50 border border-medical-200/50 px-3 py-1 rounded-full">
            Al Karam Catalog Archive
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mt-4 leading-tight">
            NIST Traceable Product Database
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-2 leading-relaxed font-medium">
            Explore our verified range of clinical maintenance systems, diagnostic instruments, and intensive care modules.
          </p>
        </div>

        {/* Filters Panel */}
        <div className="bg-white rounded-3xl border border-slate-200/60 p-6 shadow-sm mb-10 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input bar */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search catalog by name, category, or brand..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-12 pr-6 py-3.5 bg-slate-50 border border-slate-200 focus:border-medical-400 focus:bg-white text-xs font-bold rounded-2xl transition-all focus:outline-none placeholder-slate-400"
              />
            </div>

            {/* Active summary check */}
            <div className="flex items-center space-x-2 text-xs font-bold text-green-600 bg-green-50 border border-green-200/50 px-4 py-2 rounded-2xl">
              <CheckCircle className="h-4 w-4" />
              <span>NIST Traceable Documentation</span>
            </div>
          </div>

          {/* Folder Categories Row */}
          <div className="space-y-2">
            <span className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Clinical Categories
            </span>
            
            <div className="flex flex-wrap gap-2">
              {/* All categories selector */}
              <button
                onClick={() => handleCategorySelect("All")}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer border ${
                  selectedCategory === "All"
                    ? "bg-medical-600 text-white border-medical-600 shadow-md scale-[1.02]"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                <Layers className="h-4 w-4" />
                <span>All Categories</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-md ${selectedCategory === "All" ? "bg-medical-700 text-white" : "bg-slate-100 text-slate-500"}`}>
                  {PRODUCT_CATALOG.length}
                </span>
              </button>

              {/* Category tabs */}
              {Object.keys(SECTOR_METADATA).map((catName) => {
                const isSelected = selectedCategory === catName;
                const count = PRODUCT_CATALOG.filter(d => d.category === catName).length;
                if (count === 0) return null;

                return (
                  <button
                    key={catName}
                    onClick={() => handleCategorySelect(catName)}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer border ${
                      isSelected
                        ? "bg-medical-600 text-white border-medical-600 shadow-md scale-[1.02]"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                    }`}
                  >
                    <FolderOpen className="h-4 w-4" />
                    <span>{catName}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-md ${isSelected ? "bg-medical-700 text-white" : "bg-slate-100 text-slate-500"}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active filters display */}
          {(selectedCategory !== "All" || searchQuery !== "") && (
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-bold">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-slate-400 uppercase tracking-wider text-[10px]">Active Filters:</span>
                {selectedCategory !== "All" && (
                  <span className="px-3 py-1 bg-medical-50 text-medical-600 border border-medical-200/50 rounded-lg">
                    Dept: {selectedCategory}
                  </span>
                )}
                {searchQuery !== "" && (
                  <span className="px-3 py-1 bg-medical-50 text-medical-600 border border-medical-200/50 rounded-lg">
                    Query: "{searchQuery}"
                  </span>
                )}
              </div>

              <button
                onClick={handleClearFilters}
                className="text-red-500 hover:text-red-600 transition-colors cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Found matching items status */}
        <div className="mb-6 flex justify-between items-center">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
            Found {filteredProducts.length} devices matching parameters
          </span>
        </div>

        {/* Grid Display */}
        <div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {paginatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedProducts.map((device) => (
                <ProductCard
                  key={device.id}
                  device={device}
                  onClick={() => handleOpenModal(device)}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/60 shadow-sm max-w-xl mx-auto">
              <HardDrive className="h-12 w-12 text-slate-300 animate-pulse mx-auto mb-4" />
              <h3 className="text-base font-bold text-slate-700 mb-1">No Folders or Devices Found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6 leading-relaxed">
                We couldn't find any medical systems matching your search terms. Check your spelling or try resetting the filters.
              </p>
              <button
                onClick={handleClearFilters}
                className="bg-medical-600 hover:bg-medical-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer active:scale-95"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-10">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}

      </div>

      {/* Modern Device Detail Modal Sheet */}
      {activeDevice && (
        <ProductModal
          device={activeDevice}
          activeVersionIdx={activeVersionIdx}
          setActiveVersionIdx={setActiveVersionIdx}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
}
