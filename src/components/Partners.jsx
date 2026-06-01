import React, { useState, useEffect, useRef, memo, useMemo } from "react";
import { 
  ShieldCheck, 
  ArrowUpRight, 
  Globe, 
  FileText, 
  Download, 
  Image as ImageIcon, 
  Folder, 
  X, 
  Search,
  CheckCircle,
  FileCheck,
  BookOpen
} from "lucide-react";
import { PARTNERS_CATALOG } from "../data/partnersCatalog";

function Partners({ onSelectPartner, initialPartnerId = null, minimal = false }) {
  const initialPartner = useMemo(() => {
    if (initialPartnerId) {
      const found = PARTNERS_CATALOG.find(p => p.id === initialPartnerId);
      if (found) return found;
    }
    return PARTNERS_CATALOG[0];
  }, [initialPartnerId]);

  const [selectedPartner, setSelectedPartner] = useState(initialPartner);
  const [activeProduct, setActiveProduct] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  
  const productsRef = useRef(null);

  // Sync selected partner if initialPartnerId changes
  useEffect(() => {
    if (initialPartnerId) {
      const found = PARTNERS_CATALOG.find(p => p.id === initialPartnerId);
      if (found) {
        setSelectedPartner(found);
      }
    }
  }, [initialPartnerId]);

  const handlePartnerSelect = (partner) => {
    if (minimal) {
      if (onSelectPartner) {
        onSelectPartner(partner.id);
      }
    } else {
      setSelectedPartner(partner);
      setSearchQuery("");
      setTimeout(() => {
        productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  const filteredProducts = useMemo(() => {
    return selectedPartner
      ? selectedPartner.brandProducts.filter(prod => {
          const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            prod.folderName.toLowerCase().includes(searchQuery.toLowerCase());
          return matchesSearch;
        })
      : [];
  }, [selectedPartner, searchQuery]);

  return (
    <section className="py-16 bg-slate-50 relative overflow-hidden grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <span className="text-xs font-bold uppercase tracking-wider text-medical-600 bg-medical-50 px-3.5 py-1.5 rounded-full">
            Authorized Support Desk
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mt-4 mb-4">
            Authorized Support & Brands Partnerships
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Alkaram Medical is the premier authorized calibration and service provider for global medical manufacturers. {minimal ? "Click on any brand below to explore their complete equipment line, technical specifications, and metrology documentation on our Partners hub." : "Click on any brand below to view their complete equipment line, search specific systems, and download technical specifications and metrology documentation."}
          </p>
        </div>

        {/* Partners Grid */}
        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 ${minimal ? "" : "mb-16"}`}>
          {PARTNERS_CATALOG.map((partner) => {
            const isSelected = !minimal && selectedPartner && selectedPartner.id === partner.id;
            return (
              <div
                key={partner.id}
                onClick={() => handlePartnerSelect(partner)}
                className={`group bg-white p-4.5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-center h-32 relative ${
                  isSelected 
                    ? "border-medical-500 bg-medical-50/20 ring-2 ring-medical-500/20 shadow-md shadow-medical-100" 
                    : "border-slate-100 hover:border-medical-300 hover:shadow-lg shadow-sm hover:-translate-y-1"
                }`}
              >
                {/* Visual Logo Container */}
                <div className="w-full h-16 flex items-center justify-center mb-2 overflow-hidden">
                  {partner.logo ? (
                    <img 
                      src={`/${partner.logo}`} 
                      alt={`${partner.name} logo`}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain filter group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentNode.innerHTML = `<div class="text-medical-600 font-extrabold text-lg">${partner.name}</div>`;
                      }}
                    />
                  ) : (
                    <div className="text-medical-600 font-extrabold text-xl tracking-wider select-none">
                      {partner.name}
                    </div>
                  )}
                </div>
                
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? "text-medical-600" : "text-slate-400 group-hover:text-medical-600 transition-colors"}`}>
                  {partner.name}
                </span>

                {/* Selection indicator pill */}
                {isSelected && (
                  <span className="absolute -top-1.5 -right-1.5 bg-medical-500 text-white rounded-full p-0.5 shadow-sm">
                    <CheckCircle className="h-3 w-3" />
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Brand Details Showcase Area */}
        {!minimal && selectedPartner && (
          <div 
            ref={productsRef}
            className="bg-white rounded-3xl border border-slate-200/60 p-6 sm:p-8 shadow-sm relative overflow-hidden"
          >
            {/* Background geometric flare */}
            <div className="absolute right-0 top-0 -translate-y-1/3 translate-x-1/3 w-80 h-80 bg-medical-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 pb-6 border-b border-slate-100 relative z-10">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 p-2 flex items-center justify-center overflow-hidden">
                  {selectedPartner.logo ? (
                    <img 
                      src={`/${selectedPartner.logo}`} 
                      alt={selectedPartner.name} 
                      loading="lazy"
                      className="max-h-full max-w-full object-contain" 
                    />
                  ) : (
                    <span className="text-medical-600 font-bold text-lg">{selectedPartner.name}</span>
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-medical-600 bg-medical-50 px-2.5 py-0.5 rounded">
                      Authorized Brand
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      {selectedPartner.brandProducts.length} Systems Mapped
                    </span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                    {selectedPartner.name} Calibration Line
                  </h3>
                </div>
              </div>

              {/* Dynamic search input inside the active brand */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder={`Search ${selectedPartner.name} products...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-medical-500 focus:ring-2 focus:ring-medical-500/20 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-800 outline-none transition-all"
                />
              </div>
            </div>

            {/* Products grid display */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                {filteredProducts.map((product) => {
                  const firstImage = product.images && product.images.length > 0 ? `/${product.images[0]}` : null;
                  const hasImages = product.images && product.images.length > 0;
                  const hasDocs = product.documents && product.documents.length > 0;
                  
                  return (
                    <div
                      key={product.id}
                      onClick={() => {
                        setActiveProduct(product);
                        setActiveImageIndex(0);
                      }}
                      className="group bg-white rounded-3xl border border-slate-200/50 hover:border-medical-400 hover:shadow-lg shadow-sm transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden relative"
                    >
                      <div>
                        {/* Device Thumbnail */}
                        <div className="h-40 bg-slate-100 relative flex items-center justify-center overflow-hidden border-b border-slate-100">
                          {firstImage ? (
                            <img
                              src={firstImage}
                              alt={product.name}
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
                              <Folder className="h-3.5 w-3.5" />
                              <span>Explore Files</span>
                            </span>
                          </div>
                        </div>

                        <div className="p-5">
                          {/* Folder Name */}
                          <span className="inline-flex items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">
                            <Folder className="h-3.5 w-3.5 mr-1.5 text-medical-400" />
                            {product.folderName}
                          </span>
                          
                          {/* Product Name */}
                          <h4 className="text-sm font-extrabold text-slate-800 group-hover:text-medical-600 transition-colors leading-snug line-clamp-1">
                            {product.name}
                          </h4>
                        </div>
                      </div>

                      {/* Footer containing metrics */}
                      <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-[10px] font-bold">
                        <div className="flex space-x-2 text-slate-500">
                          {hasImages && (
                            <span className="flex items-center bg-white px-2 py-0.5 rounded border border-slate-200/50 text-emerald-600">
                              <ImageIcon className="h-3 w-3 mr-1 text-emerald-500" />
                              {product.images.length} Image{product.images.length > 1 ? 's' : ''}
                            </span>
                          )}
                          {hasDocs && (
                            <span className="flex items-center bg-white px-2 py-0.5 rounded border border-slate-200/50 text-blue-600">
                              <FileText className="h-3 w-3 mr-1 text-blue-500" />
                              {product.documents.length} File{product.documents.length > 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                        
                        <span className="text-medical-600 group-hover:underline">
                          Explore Files &rarr;
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <Folder className="h-10 w-10 text-slate-300 mx-auto mb-3 animate-pulse" />
                <h4 className="text-sm font-bold text-slate-700">No Products Registered</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1 leading-relaxed">
                  No equipment directories matched the search terms under {selectedPartner.name}. Try typing another model name.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Global Compliance Note Banner */}
        {!minimal && (
          <div className="mt-16 bg-gradient-to-r from-medical-900 to-medical-800 rounded-3xl p-8 text-white relative shadow-xl overflow-hidden">
            {/* Background decoration */}
            <div className="absolute right-0 bottom-0 translate-y-1/4 translate-x-1/4 w-96 h-96 bg-medical-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="lg:flex lg:items-center lg:justify-between relative">
              <div className="mb-6 lg:mb-0 lg:max-w-2xl">
                <h3 className="text-xl sm:text-2xl font-bold leading-tight mb-2">
                  Certified Calibration & Technical Dispatch
                </h3>
                <p className="text-sm text-medical-100 leading-relaxed font-light">
                  Our support engineers undergo factory certification directly with our international partner brands. We provide original replacement parts, NIST-traceable calibration certificates, and 24/7 technical callouts across Egypt.
                </p>
              </div>
              
              <button
                onClick={() => onSelectPartner("all")}
                className="inline-flex items-center justify-center bg-white text-medical-900 hover:bg-medical-50 px-6 py-3.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                Explore Combined Catalog
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Dynamic Brand Product Explorer Modal */}
      {activeProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Glass backdrop */}
          <div 
            onClick={() => setActiveProduct(null)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
          />
          
          {/* Modal Container */}
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative flex flex-col justify-between animate-fade-in">
            
            {/* Modal Header */}
            <div className="p-6 pb-4 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-medical-50 flex items-center justify-center text-medical-600 font-bold text-sm overflow-hidden">
                  {selectedPartner.logo ? (
                    <img 
                      src={`/${selectedPartner.logo}`} 
                      alt={selectedPartner.name} 
                      className="max-h-full max-w-full object-contain p-1" 
                    />
                  ) : (
                    <span>{selectedPartner.name.substring(0, 2).toUpperCase()}</span>
                  )}
                </div>
                <div>
                  <span className="block text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                    {selectedPartner.name} System Profile
                  </span>
                  <h4 className="text-base font-extrabold text-slate-900 leading-tight">
                    {activeProduct.name}
                  </h4>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setActiveProduct(null)}
                className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-8 flex-grow">
              
              {/* Left Column: Visual Assets (.jpg extensions) */}
              <div className="md:col-span-6 space-y-4">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Equipment Photographic Assets
                </span>
                
                {activeProduct.images && activeProduct.images.length > 0 ? (
                  <div className="space-y-4">
                    {/* Main Image View */}
                    <div className="w-full h-64 bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center p-4 relative group">
                      <img 
                        src={`/${activeProduct.images[activeImageIndex] || activeProduct.images[0]}`} 
                        alt={activeProduct.name} 
                        loading="lazy"
                        className="max-h-full max-w-full object-contain rounded-lg transition-transform duration-300"
                      />
                      
                      {/* Image format info pill */}
                      <span className="absolute bottom-3 right-3 text-[9px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded shadow-sm border border-emerald-100">
                        HD METROLOGY PHOTO
                      </span>
                    </div>

                    {/* Secondary Thumbnails if more than 1 image exists */}
                    {activeProduct.images.length > 1 && (
                      <div className="grid grid-cols-3 gap-3">
                        {activeProduct.images.map((img, i) => {
                          const isActive = activeImageIndex === i;
                          return (
                            <div 
                              key={i} 
                              onClick={() => setActiveImageIndex(i)}
                              className={`h-16 bg-slate-50 border rounded-xl overflow-hidden p-1 flex items-center justify-center hover:shadow-sm transition-all duration-200 cursor-pointer ${
                                isActive 
                                  ? "border-medical-500 ring-2 ring-medical-500/20" 
                                  : "border-slate-100 hover:border-medical-300"
                              }`}
                            >
                              <img src={`/${img}`} alt={`${activeProduct.name} thumb ${i}`} loading="lazy" className="max-h-full max-w-full object-contain rounded-md" />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  // Elegant vector clinical placeholder if no .jpg image is attached
                  <div className="w-full h-64 bg-slate-50 border border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-6 text-center">
                    <div className="p-4 rounded-full bg-medical-50 text-medical-600 mb-3">
                      <ImageIcon className="h-8 w-8" />
                    </div>
                    <span className="block text-xs font-bold text-slate-700 leading-snug">
                      Product Graphic Registry Complete
                    </span>
                    <span className="block text-[10px] text-slate-400 mt-1 max-w-[200px] leading-relaxed">
                      Photo asset is saved in clinical database archive. Use download documents to view technical drawings.
                    </span>
                  </div>
                )}
              </div>

              {/* Right Column: Files Downloads (.docx and .pdf files) */}
              <div className="md:col-span-6 space-y-6">
                
                {/* Specifications note */}
                <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4.5 space-y-2">
                  <h5 className="font-extrabold text-[11px] text-slate-800 uppercase tracking-wide flex items-center">
                    <BookOpen className="h-3.5 w-3.5 text-medical-500 mr-1.5" />
                    Calibration Technical Memo
                  </h5>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-normal">
                    This authorized biomedical device directory is mapped inside the Alkaram medical calibration server. Download the original factory manuals and specification sheets below to review guidelines.
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Authorized Technical Downloads
                  </span>

                  {activeProduct.documents && activeProduct.documents.length > 0 ? (
                    <div className="space-y-3">
                      {activeProduct.documents.map((doc, idx) => {
                        const isPdf = doc.ext.toLowerCase() === '.pdf';
                        return (
                          <div 
                            key={idx}
                            className="bg-white border border-slate-200/80 hover:border-medical-300 rounded-xl p-4.5 flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-200"
                          >
                            <div className="flex items-center space-x-3.5 flex-1 min-w-0 pr-4">
                              {/* File format icon container */}
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-extrabold text-xs shadow-inner ${
                                isPdf 
                                  ? "bg-rose-50 text-rose-600 border border-rose-100" 
                                  : "bg-blue-50 text-blue-600 border border-blue-100"
                              }`}>
                                <FileText className="h-5 w-5" />
                              </div>
                              
                              <div className="truncate">
                                <span className="block text-xs font-bold text-slate-800 truncate leading-tight">
                                  {doc.name}
                                </span>
                                <span className={`inline-flex items-center text-[9px] font-bold uppercase tracking-wider mt-1 px-1.5 py-0.5 rounded ${
                                  isPdf 
                                    ? "bg-rose-50 text-rose-600" 
                                    : "bg-blue-50 text-blue-600"
                                }`}>
                                  {doc.ext.substring(1).toUpperCase()} File
                                </span>
                              </div>
                            </div>

                            {/* Download Action anchor */}
                            <a
                              href={`/${doc.path}`}
                              download={doc.name}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex-shrink-0 p-2.5 rounded-xl text-white shadow-sm flex items-center justify-center hover:scale-105 transition-all cursor-pointer ${
                                isPdf 
                                  ? "bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 shadow-rose-100" 
                                  : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-blue-100"
                              }`}
                            >
                              <Download className="h-4 w-4" />
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-6 bg-slate-50 border border-dashed border-slate-200 rounded-xl">
                      <FileCheck className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                      <span className="block text-[10px] text-slate-400 font-medium">
                        No Documentation Attached
                      </span>
                    </div>
                  )}
                </div>

              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-400 gap-2 rounded-b-3xl">
              <span className="flex items-center">
                <ShieldCheck className="h-4 w-4 text-emerald-500 mr-1.5 flex-shrink-0" />
                Al Karam Authorized Biomedical Support
              </span>
              <span>
                Calibration Registry: EGY-{new Date().getFullYear()}-{activeProduct.id.substring(0, 5).toUpperCase()}
              </span>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}

export default memo(Partners);
