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
import ProductModal from "./ProductModal";
import Pagination from "./Pagination";
import { getMainProductImage } from "../utils/productUtils";

// Reordered list of brands based on the requested ranking:
// 1-OPTIUM, 2-AXCENT, 3-AUG, 4-EKINGST, 5-KONTED, 6-CAMI, 7-ABN, 8-ITC, 9-CBM, 10-SPENCER, 11-GGM
const BRAND_ORDER = [
  "optium",
  "axcent",
  "aug",
  "kingst",
  "konted",
  "cami",
  "abn",
  "itc",
  "cbm",
  "spencer",
  "ggm"
];

const sortedPartners = [...PARTNERS_CATALOG].sort((a, b) => {
  const indexA = BRAND_ORDER.indexOf(a.id);
  const indexB = BRAND_ORDER.indexOf(b.id);
  const valA = indexA === -1 ? 999 : indexA;
  const valB = indexB === -1 ? 999 : indexB;
  return valA - valB;
});

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
 * Highly optimized Partner Product Card using React.memo.
 */
const PartnerProductCard = React.memo(({ product, brandName, onClick }) => {
  const images = product.images || [];
  const docs = product.documents || [];

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
        <OptimizedCardImage src={mainImage} alt={product.name} />

        {/* Category tag */}
        <span className="absolute top-4 right-4 text-[9px] font-extrabold uppercase tracking-widest text-slate-600 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full shadow-sm">
          {brandName}
        </span>
      </div>

      {/* Detail contents */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-medical-600">
            {brandName}
          </span>
          <h3 className="text-base font-bold text-slate-800 mt-1 leading-snug group-hover:text-medical-700 transition-colors">
            {product.name}
          </h3>
          <span className="block text-[10px] text-slate-400 font-mono mt-1">
            dir: {brandName} - {product.name}
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

function Partners({ onSelectPartner, initialPartnerId = null, minimal = false }) {
  const initialPartner = useMemo(() => {
    if (initialPartnerId) {
      const found = sortedPartners.find(p => p.id === initialPartnerId);
      if (found) return found;
    }
    return sortedPartners[0];
  }, [initialPartnerId]);

  const [selectedPartner, setSelectedPartner] = useState(initialPartner);
  const [activeProduct, setActiveProduct] = useState(null);
  const [activeVersionIdx, setActiveVersionIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  const productsRef = useRef(null);

  // Sync selected partner if initialPartnerId changes
  useEffect(() => {
    if (initialPartnerId) {
      const found = sortedPartners.find(p => p.id === initialPartnerId);
      if (found) {
        setSelectedPartner(found);
        setCurrentPage(1);
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
      setCurrentPage(1);
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

  const paginatedProducts = useMemo(() => {
    const startIdx = (currentPage - 1) * 16;
    return filteredProducts.slice(startIdx, startIdx + 16);
  }, [filteredProducts, currentPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredProducts.length / 16);
  }, [filteredProducts]);

  const activeDevice = useMemo(() => {
    if (!activeProduct) return null;
    return {
      id: activeProduct.id,
      brand: selectedPartner.name,
      name: activeProduct.name,
      category: selectedPartner.name,
      versions: [
        {
          name: "Standard Specs",
          images: activeProduct.images || [],
          documents: activeProduct.documents || []
        }
      ]
    };
  }, [activeProduct, selectedPartner]);

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
            Alkaram Medical is the premier authorized maintenance and service provider for global medical manufacturers. {minimal ? "Click on any brand below to explore their complete equipment line, technical specifications, and maintenance documentation on our Partners hub." : "Click on any brand below to view their complete equipment line, search specific systems, and download technical specifications and maintenance documentation."}
          </p>
        </div>

        {/* Partners Grid */}
        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 ${minimal ? "" : "mb-16"}`}>
          {sortedPartners.map((partner) => {
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
                    {selectedPartner.name} Equipment Line
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
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-medical-500 focus:ring-2 focus:ring-medical-500/20 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-800 outline-none transition-all"
                />
              </div>
            </div>

            {/* Products grid display */}
            {paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative z-10">
                  {paginatedProducts.map((product) => (
                    <PartnerProductCard
                      key={product.id}
                      product={product}
                      brandName={selectedPartner.name}
                      onClick={() => {
                        setActiveProduct(product);
                        setActiveVersionIdx(0);
                      }}
                    />
                  ))}
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
              </>
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
                  Certified Maintenance & Technical Dispatch
                </h3>
                <p className="text-sm text-medical-100 leading-relaxed font-light">
                  Our support engineers undergo factory certification directly with our international partner brands. We provide original replacement parts, quality verification certificates, and 24/7 technical callouts across Egypt.
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

      {/* Modern Device Detail Modal Sheet */}
      {activeDevice && (
        <ProductModal
          device={activeDevice}
          activeVersionIdx={activeVersionIdx}
          setActiveVersionIdx={setActiveVersionIdx}
          onClose={() => setActiveProduct(null)}
        />
      )}

    </section>
  );
}

export default memo(Partners);
