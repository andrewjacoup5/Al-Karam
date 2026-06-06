import React, { useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Reusable, highly accessible Pagination component.
 */
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = ""
}) {
  if (totalPages <= 1) return null;

  const handlePrev = useCallback(() => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  }, [currentPage, onPageChange]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  }, [currentPage, totalPages, onPageChange]);

  const handlePageClick = useCallback((pageNum) => {
    onPageChange(pageNum);
  }, [onPageChange]);

  // Generate page numbers array
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Products pagination navigation"
      className={`flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6 bg-white rounded-2xl border border-slate-200/60 shadow-sm ${className}`}
    >
      {/* Page status summary */}
      <span className="text-xs text-slate-500 font-medium">
        Showing Page <span className="font-bold text-slate-800">{currentPage}</span> of{" "}
        <span className="font-bold text-slate-800">{totalPages}</span>
      </span>

      {/* Navigation Controls */}
      <div className="flex items-center space-x-2">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          aria-label="Navigate to previous page"
          className={`p-2.5 rounded-xl border border-slate-200 transition-all ${
            currentPage === 1
              ? "opacity-45 cursor-not-allowed bg-slate-50 text-slate-400"
              : "hover:bg-slate-50 hover:border-slate-300 text-slate-600 cursor-pointer active:scale-95"
          }`}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Page Indicators */}
        <div className="flex items-center space-x-1.5" role="list">
          {pages.map((page) => {
            const isCurrent = page === currentPage;
            return (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                aria-current={isCurrent ? "page" : undefined}
                aria-label={`Go to page ${page}`}
                className={`min-w-[36px] h-9 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  isCurrent
                    ? "bg-medical-600 text-white border-medical-600 shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300 active:scale-95"
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="Navigate to next page"
          className={`p-2.5 rounded-xl border border-slate-200 transition-all ${
            currentPage === totalPages
              ? "opacity-45 cursor-not-allowed bg-slate-50 text-slate-400"
              : "hover:bg-slate-50 hover:border-slate-300 text-slate-600 cursor-pointer active:scale-95"
          }`}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </nav>
  );
}
