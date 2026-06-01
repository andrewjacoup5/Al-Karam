import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  SlidersHorizontal,
  Layers,
  Download,
  FileText,
  Image as ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle,
  FolderOpen,
  Folder,
  Layers2,
  HardDrive
} from "lucide-react";
import { PRODUCT_CATALOG } from "../data/productsCatalog";

// Clinical sector metadata to match folders with premium aesthetic look
const SECTOR_METADATA = {
  "Ambulance": { icon: "Truck", color: "from-amber-500 to-orange-500", desc: "Emergency & EMS Transport" },
  "Clinics": { icon: "Stethoscope", color: "from-blue-500 to-indigo-500", desc: "Outpatient & Examination Rooms" },
  "Dialysis": { icon: "TrendingUp", color: "from-teal-500 to-emerald-500", desc: "Renal Care & Treatment Units" },
  "ER": { icon: "Flame", color: "from-red-500 to-rose-600", desc: "Emergency Room Critical Systems" },
  "ICU": { icon: "Heart", color: "from-rose-500 to-pink-500", desc: "Intensive Care Unit Monitors & Ventilators" },
  "IN-Patient": { icon: "Bed", color: "from-purple-500 to-violet-500", desc: "Ward Beds & Patient Infrastructure" },
  "Medical Gases": { icon: "Wind", color: "from-cyan-500 to-sky-500", desc: "Gas Cylinders, Regulators & Flowmeters" },
  "OR": { icon: "Scissors", color: "from-indigo-500 to-purple-600", desc: "Operating Room Surgical Equipment" }
};

export default function Products({ preFilteredBrand, onClearPreFilter }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [activeDevice, setActiveDevice] = useState(null);
  const [activeVersionIdx, setActiveVersionIdx] = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null);

  // Sync pre-filtered brand
  useEffect(() => {
    if (preFilteredBrand && preFilteredBrand !== "all") {
      setSelectedBrand(preFilteredBrand);
      setSelectedCategory("all");
    }
  }, [preFilteredBrand]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedBrand("all");
    if (onClearPreFilter) onClearPreFilter();
  };

  // Filter logic
  const filteredProducts = useMemo(() => {
    return PRODUCT_CATALOG.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.folderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
      const matchesBrand = selectedBrand === "all" || p.brand.toLowerCase() === selectedBrand.toLowerCase();

      return matchesSearch && matchesCategory && matchesBrand;
    });
  }, [searchQuery, selectedCategory, selectedBrand]);

  // Extract all available brands dynamically
  const uniqueBrands = useMemo(() => {
    return Array.from(new Set(PRODUCT_CATALOG.map(p => p.brand))).sort();
  }, []);

  // Helper to count files in a device
  const getFileCounts = (device) => {
    let images = 0;
    let docs = 0;
    device.versions.forEach(v => {
      images += v.images.length;
      docs += v.documents.length;
    });
    return { images, docs };
  };

  return (
    <section className="py-12 bg-slate-50 relative overflow-hidden min-h-screen grid-bg">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-medical-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-medical-600 bg-medical-50/80 px-4 py-1.5 rounded-full border border-medical-100/50">
            Digital Asset Command
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-4 mb-4">
            Medical Equipment & Technical Documents Library
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            Access certified layout versions,Metrology manuals, and dynamic image proofs from the physical archives. Filter below by department or clinical category.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/60 shadow-sm space-y-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

            {/* Search */}
            <div className="md:col-span-5 relative">
              <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search device name, folder name, or brand..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50/80 border border-slate-200 focus:border-medical-500 focus:ring-2 focus:ring-medical-500/20 rounded-2xl pl-11 pr-4 py-3 text-xs text-slate-800 outline-none transition-all"
              />
            </div>

            {/* Brand Dropdown */}
            <div className="md:col-span-4 relative flex items-center">
              <Layers className="absolute left-3.5 h-4.5 w-4.5 text-slate-400 pointer-events-none" />
              <select
                value={selectedBrand}
                onChange={(e) => {
                  setSelectedBrand(e.target.value);
                  if (preFilteredBrand && e.target.value !== preFilteredBrand) {
                    if (onClearPreFilter) onClearPreFilter();
                  }
                }}
                className="w-full bg-slate-50/80 border border-slate-200 focus:border-medical-500 focus:ring-2 focus:ring-medical-500/20 rounded-2xl pl-11 pr-4 py-3 text-xs text-slate-700 outline-none transition-all cursor-pointer appearance-none"
              >
                <option value="all">All Brands & Partners</option>
                {uniqueBrands.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Clear Button */}
            <div className="md:col-span-3 flex items-stretch">
              <button
                onClick={handleClearFilters}
                className="w-full bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 font-bold rounded-2xl text-xs py-3 transition-colors cursor-pointer text-center"
              >
                Clear All Filters
              </button>
            </div>

          </div>

          {/* Active breadcrumbs */}
          {(selectedCategory !== "all" || selectedBrand !== "all" || searchQuery) && (
            <div className="flex flex-wrap items-center gap-2 pt-3.5 border-t border-slate-100 text-xs">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Active filters:</span>
              {selectedCategory !== "all" && (
                <span className="bg-medical-50 border border-medical-100 text-medical-600 px-3 py-1 rounded-full font-bold">
                  Dept: {selectedCategory}
                </span>
              )}
              {selectedBrand !== "all" && (
                <span className="bg-medical-50 border border-medical-100 text-medical-600 px-3 py-1 rounded-full font-bold">
                  Brand: {selectedBrand}
                </span>
              )}
              {searchQuery && (
                <span className="bg-medical-50 border border-medical-100 text-medical-600 px-3 py-1 rounded-full font-bold">
                  Keyword: "{searchQuery}"
                </span>
              )}
            </div>
          )}
        </div>

        {/* Category Navigation Bar */}
        <div className="mb-8">
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
            Clinical Categories
          </span>
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 border ${selectedCategory === "all"
                  ? "bg-gradient-to-r from-medical-600 to-medical-500 text-white border-medical-600 shadow-md shadow-medical-200"
                  : "bg-white text-slate-600 border-slate-200/60 hover:bg-slate-50"
                }`}
            >
              <Layers2 className="h-4 w-4" />
              <span>All Categories</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${selectedCategory === "all" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                {PRODUCT_CATALOG.length}
              </span>
            </button>

            {Object.entries(SECTOR_METADATA).map(([catName, meta]) => {
              const count = PRODUCT_CATALOG.filter(p => p.category === catName).length;
              const isSelected = selectedCategory === catName;
              return (
                <button
                  key={catName}
                  onClick={() => setSelectedCategory(catName)}
                  className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 border ${isSelected
                      ? "bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-300"
                      : "bg-white text-slate-600 border-slate-200/60 hover:bg-slate-50"
                    }`}
                >
                  <FolderOpen className="h-4 w-4 text-medical-500" />
                  <span>{catName}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? "bg-white/25 text-white" : "bg-slate-100 text-slate-500"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter Info */}
        <div className="flex justify-between items-center mb-6 text-xs text-slate-400 font-bold">
          <span>Found {filteredProducts.length} devices matching parameters</span>
          <span className="flex items-center text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            <CheckCircle className="h-3.5 w-3.5 mr-1" />
            NIST Traceable Documentation
          </span>
        </div>

        {/* Dynamic Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((p) => {
              const { images, docs } = getFileCounts(p);

              // Get thumbnail if exists
              const firstImage = p.versions[0]?.images[0] || null;

              return (
                <div
                  key={p.id}
                  onClick={() => {
                    setActiveDevice(p);
                    setActiveVersionIdx(0);
                  }}
                  className="group bg-white rounded-3xl border border-slate-200/50 hover:border-medical-400 hover:shadow-lg shadow-sm transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden relative"
                >
                  {/* Category Small Badge */}
                  <span className="absolute top-3 right-3 z-10 text-[9px] font-bold px-2 py-0.5 bg-slate-900/60 backdrop-blur-sm text-white rounded">
                    {p.category}
                  </span>

                  <div>
                    {/* Device Thumbnail */}
                    <div className="h-40 bg-slate-100 relative flex items-center justify-center overflow-hidden border-b border-slate-100">
                      {firstImage ? (
                        <img
                          src={firstImage}
                          alt={p.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center p-6 text-slate-400">
                          <Folder className="h-10 w-10 text-slate-300 mb-2" />
                          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">No Image Preview</span>
                        </div>
                      )}

                      {/* Hover action overlay */}
                      <div className="absolute inset-0 bg-medical-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-white/95 backdrop-blur text-medical-800 text-[10px] font-bold px-4 py-2 rounded-xl shadow-md border border-white flex items-center space-x-1.5">
                          <HardDrive className="h-3.5 w-3.5" />
                          <span>Open Device Folder</span>
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      {/* Brand Label */}
                      <span className="block text-[10px] font-bold text-medical-600 uppercase tracking-wider mb-1.5">
                        {p.brand}
                      </span>

                      {/* Clean name */}
                      <h3 className="text-sm font-extrabold text-slate-800 group-hover:text-medical-600 transition-colors line-clamp-1 leading-snug">
                        {p.name}
                      </h3>

                      {/* Folder Name representation */}
                      <span className="block text-[10px] font-bold text-slate-400 font-mono mt-1 line-clamp-1 truncate">
                        dir: {p.folderName}
                      </span>
                    </div>
                  </div>

                  {/* Card bottom details */}
                  <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-[10px] font-bold">
                    <div className="flex space-x-2 text-slate-500">
                      <span className="flex items-center bg-white px-2 py-0.5 rounded border border-slate-200/50">
                        <ImageIcon className="h-3 w-3 mr-1 text-slate-400" />
                        {images}
                      </span>
                      <span className="flex items-center bg-white px-2 py-0.5 rounded border border-slate-200/50">
                        <FileText className="h-3 w-3 mr-1 text-slate-400" />
                        {docs}
                      </span>
                    </div>

                    <span className="text-medical-600 group-hover:underline">
                      Explore Asset &rarr;
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/60 shadow-sm max-w-xl mx-auto">
            <HardDrive className="h-12 w-12 text-slate-300 animate-pulse mx-auto mb-4" />
            <h3 className="text-base font-bold text-slate-700 mb-1">No Folders or Devices Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6 leading-relaxed">
              We couldn't find any devices matching your search terms. Try searching for standard brands like "Axcent" or categories like "ICU".
            </p>
            <button
              onClick={handleClearFilters}
              className="bg-medical-600 hover:bg-medical-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Modern Device Detail Sheet Overlay (Lightbox Dialog) */}
      {activeDevice && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl border border-slate-100 overflow-hidden my-8 animate-page-enter">

            {/* Modal Header */}
            <div className="p-6 bg-slate-900 text-white flex justify-between items-start relative">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-medical-400 bg-medical-950 px-2.5 py-1 rounded">
                  {activeDevice.category} Category
                </span>
                <h3 className="text-xl font-extrabold mt-2 leading-tight">
                  {activeDevice.brand} - {activeDevice.name}
                </h3>
              </div>

              <button
                onClick={() => setActiveDevice(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Version Navigation Slider/Tab bar */}
            {activeDevice.versions.length > 0 && (
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Device Version:</span>
                  <div className="flex space-x-1.5">
                    {activeDevice.versions.map((ver, idx) => {
                      const isSel = activeVersionIdx === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setActiveVersionIdx(idx)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${isSel
                              ? "bg-medical-600 text-white border-medical-600 shadow-sm"
                              : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                            }`}
                        >
                          {ver.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <span className="text-[10px] text-slate-400 font-bold bg-white border border-slate-200/60 px-2.5 py-1 rounded-full">
                  {activeDevice.versions[activeVersionIdx].images.length} Images • {activeDevice.versions[activeVersionIdx].documents.length} Downloadables
                </span>
              </div>
            )}

            {/* Active Version Content Grid */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-8 max-h-[60vh] overflow-y-auto">

              {/* Left Column: Image Proofs (7 Columns) */}
              <div className="md:col-span-7 space-y-4">
                <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center">
                  <ImageIcon className="h-4.5 w-4.5 mr-2 text-medical-600" />
                  Image Evidence & Visual Proofs (.jpg)
                </h4>

                {activeDevice.versions[activeVersionIdx].images.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {activeDevice.versions[activeVersionIdx].images.map((imgSrc, i) => (
                      <div
                        key={i}
                        onClick={() => setLightboxImage(imgSrc)}
                        className="group aspect-video rounded-2xl bg-slate-50 border border-slate-200/50 overflow-hidden relative cursor-pointer shadow-sm hover:shadow-md transition-all hover:border-medical-300"
                      >
                        <img
                          src={imgSrc}
                          alt={`Proof ${i}`}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Eye className="h-6 w-6 text-white animate-pulse" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-100">
                    <ImageIcon className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">No Images inside this version</span>
                  </div>
                )}
              </div>

              {/* Right Column: Download Hub (5 Columns) */}
              <div className="md:col-span-5 space-y-4">
                <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center">
                  <FileText className="h-4.5 w-4.5 mr-2 text-medical-600" />
                  Technical Document Download Hub (.docx, .pdf)
                </h4>

                {activeDevice.versions[activeVersionIdx].documents.length > 0 ? (
                  <div className="space-y-3">
                    {activeDevice.versions[activeVersionIdx].documents.map((doc, idx) => {
                      const isPdf = doc.ext === ".pdf";
                      return (
                        <div
                          key={idx}
                          className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/50 flex justify-between items-center hover:border-medical-200 hover:bg-white shadow-sm transition-all"
                        >
                          <div className="flex items-start space-x-3 max-w-[70%]">
                            <div className={`p-2.5 rounded-xl ${isPdf ? "bg-red-50 text-red-600 border border-red-100" : "bg-blue-50 text-blue-600 border border-blue-100"} flex-shrink-0 mt-0.5`}>
                              <FileText className="h-5 w-5" />
                            </div>
                            <div>
                              <span className="block text-xs font-extrabold text-slate-800 leading-snug truncate">
                                {doc.name}
                              </span>
                              <span className="block text-[9px] text-slate-400 font-semibold uppercase mt-0.5 tracking-wider">
                                file type: {doc.ext.substring(1)}
                              </span>
                            </div>
                          </div>

                          <a
                            href={doc.path}
                            download={doc.name}
                            className="flex items-center justify-center p-2.5 rounded-xl bg-white hover:bg-gradient-to-r hover:from-medical-600 hover:to-medical-500 hover:text-white border border-slate-200 hover:border-medical-300 text-slate-600 transition-all cursor-pointer shadow-sm hover:shadow"
                            title={`Download ${doc.name}`}
                          >
                            <Download className="h-4.5 w-4.5" />
                          </a>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-100">
                    <FileText className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">No documents inside this version</span>
                  </div>
                )}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
              <span className="font-bold uppercase tracking-wider text-[10px] text-slate-400">Calibration SLA Compliant</span>
              <button
                onClick={() => setActiveDevice(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2.5 rounded-xl shadow cursor-pointer transition-colors"
              >
                Close Folder View
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Lightbox full-size image modal */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur flex items-center justify-center p-4 cursor-zoom-out animate-fade-in"
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={lightboxImage}
            alt="Enlarged Proof"
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-float"
          />
        </div>
      )}

    </section>
  );
}
