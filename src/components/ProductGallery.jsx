import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Maximize2, ZoomIn, ZoomOut, RotateCcw, X, Eye } from "lucide-react";

/**
 * Premium Lazy Loaded Image with Skeleton state.
 */
function GalleryImage({ src, alt, className = "", onClick }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    // Reset state on source change
    setLoaded(false);
    setError(false);

    if (!src) return;

    // Optional: Pre-check if image loads
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
    img.onerror = () => {
      console.warn("Failed to discover product image asset:", src);
      setError(true);
    };
  }, [src]);

  if (error || !src) return null; // Protect from broken images / empty containers

  return (
    <div className={`relative w-full h-full bg-slate-50 flex items-center justify-center overflow-hidden ${className}`}>
      {/* Skeleton state */}
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 animate-pulse flex items-center justify-center">
          <Eye className="h-6 w-6 text-slate-300 animate-bounce" />
        </div>
      )}
      
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        onClick={onClick}
        className={`w-full h-full object-cover transition-opacity duration-300 cursor-pointer ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

/**
 * Accessible Product Gallery Component with Built-in Full-Screen Lightbox.
 */
export default function ProductGallery({ images = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  
  // Lightbox Zoom state
  const [zoomScale, setZoomScale] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

  const slideTimerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Lightbox gesture references
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const initialPinchDist = useRef(0);
  const initialScale = useRef(1);

  const totalImages = images.length;

  // Next / Prev slide handlers
  const handleNext = useCallback(() => {
    if (totalImages <= 1) return;
    setActiveIndex((prev) => (prev + 1) % totalImages);
  }, [totalImages]);

  const handlePrev = useCallback(() => {
    if (totalImages <= 1) return;
    setActiveIndex((prev) => (prev - 1 + totalImages) % totalImages);
  }, [totalImages]);

  // Restart Auto Slide Interval
  useEffect(() => {
    if (totalImages <= 1 || isHovered || lightboxOpen) {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
      return;
    }

    slideTimerRef.current = setInterval(() => {
      handleNext();
    }, 5000);

    return () => {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
    };
  }, [totalImages, isHovered, lightboxOpen, handleNext]);

  // Touch Swipe Gesture for Main Slider
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50; // swipe offset threshold
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Full Screen Lightbox Zoom Controls
  const handleZoomIn = () => {
    setZoomScale((prev) => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setZoomScale((prev) => Math.max(prev - 0.5, 1));
    if (zoomScale <= 1.5) setPanOffset({ x: 0, y: 0 });
  };

  const handleResetZoom = () => {
    setZoomScale(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // Mouse drag panning inside zoomed lightbox
  const handleMouseDown = (e) => {
    if (zoomScale <= 1) return;
    isDragging.current = true;
    dragStart.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    setPanOffset({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y
    });
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  // Pinch-to-zoom and pan support for Mobile touch devices
  const handleLightboxTouchStart = (e) => {
    if (e.touches.length === 2) {
      initialPinchDist.current = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      initialScale.current = zoomScale;
    } else if (e.touches.length === 1 && zoomScale > 1) {
      isDragging.current = true;
      dragStart.current = {
        x: e.touches[0].clientX - panOffset.x,
        y: e.touches[0].clientY - panOffset.y
      };
    }
  };

  const handleLightboxTouchMove = (e) => {
    if (e.touches.length === 2 && initialPinchDist.current > 0) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = dist / initialPinchDist.current;
      setZoomScale(Math.min(Math.max(initialScale.current * factor, 1), 4));
    } else if (e.touches.length === 1 && isDragging.current && zoomScale > 1) {
      setPanOffset({
        x: e.touches[0].clientX - dragStart.current.x,
        y: e.touches[0].clientY - dragStart.current.y
      });
    }
  };

  const handleLightboxTouchEnd = () => {
    isDragging.current = false;
    initialPinchDist.current = 0;
  };

  // Keyboard navigation inside lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setLightboxOpen(false);
      } else if (e.key === "ArrowRight") {
        handleNext();
        handleResetZoom();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
        handleResetZoom();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, handleNext, handlePrev]);

  // Disable body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [lightboxOpen]);

  // Guard against no images
  if (totalImages === 0) {
    return (
      <div className="aspect-video w-full rounded-2xl bg-slate-100 flex flex-col items-center justify-center border border-slate-200">
        <Eye className="h-8 w-8 text-slate-300 mb-2" />
        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">No visual assets listed</span>
      </div>
    );
  }

  const activeImage = images[activeIndex];

  return (
    <div 
      className="space-y-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Primary Slide Display Container */}
      <div 
        className="relative aspect-video rounded-3xl bg-slate-900 border border-slate-200/50 shadow-md overflow-hidden group select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <GalleryImage
          src={activeImage}
          alt={`Visual Proof ${activeIndex + 1}`}
          onClick={() => {
            setLightboxOpen(true);
            handleResetZoom();
          }}
        />

        {/* Hover overlay indicator */}
        <div className="absolute inset-0 bg-slate-900/10 pointer-events-none group-hover:bg-slate-900/30 transition-all flex items-center justify-center">
          <Maximize2 className="h-7 w-7 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer p-1.5 rounded-full bg-slate-950/40 backdrop-blur" />
        </div>

        {/* Navigation arrows */}
        {totalImages > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-2xl bg-white/85 hover:bg-white text-slate-700 shadow-lg border border-slate-100 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-2xl bg-white/85 hover:bg-white text-slate-700 shadow-lg border border-slate-100 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        {/* Image count badge */}
        <span className="absolute bottom-4 right-4 text-[9px] font-extrabold uppercase bg-slate-950/70 backdrop-blur px-2.5 py-1 rounded-lg text-white select-none">
          {activeIndex + 1} / {totalImages}
        </span>
      </div>

      {/* Navigation Indicators Dots */}
      {totalImages > 1 && (
        <div className="flex items-center justify-center space-x-1.5 py-1">
          {images.map((_, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${
                  isActive ? "w-6 bg-medical-600" : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            );
          })}
        </div>
      )}

      {/* dedicated Lightbox Viewer Overlay */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-slate-950/98 backdrop-blur-md flex flex-col justify-between select-none"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Top Control Bar */}
          <div 
            className="flex items-center justify-between p-4 md:p-6 bg-gradient-to-b from-black/80 to-transparent w-full z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-white text-xs font-bold bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
              Evidence {activeIndex + 1} of {totalImages}
            </span>

            {/* Scale operations buttons */}
            <div className="flex items-center space-x-2">
              <button 
                onClick={handleZoomIn}
                title="Zoom In"
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/90 border border-white/10 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <ZoomIn className="h-4.5 w-4.5" />
              </button>
              <button 
                onClick={handleZoomOut}
                title="Zoom Out"
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/90 border border-white/10 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <ZoomOut className="h-4.5 w-4.5" />
              </button>
              <button 
                onClick={handleResetZoom}
                title="Reset Zoom"
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/90 border border-white/10 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <RotateCcw className="h-4.5 w-4.5" />
              </button>
              <button 
                onClick={() => setLightboxOpen(false)}
                title="Close Viewer (ESC)"
                className="p-2.5 rounded-xl bg-white/20 hover:bg-red-600 text-white border border-white/10 hover:scale-105 active:scale-95 transition-all cursor-pointer ml-4"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>

          {/* Central Image Render Hub */}
          <div 
            className="relative flex-1 flex items-center justify-center overflow-hidden cursor-move p-4"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onTouchStart={handleLightboxTouchStart}
            onTouchMove={handleLightboxTouchMove}
            onTouchEnd={handleLightboxTouchEnd}
          >
            <div
              className="transition-transform duration-100 ease-out flex items-center justify-center"
              style={{
                transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomScale})`,
                maxHeight: "80vh",
                maxWidth: "90vw"
              }}
              onClick={(e) => {
                e.stopPropagation();
                // Double tap zoom toggling
                if (zoomScale > 1) {
                  handleResetZoom();
                } else {
                  setZoomScale(2.5);
                }
              }}
            >
              <img
                src={activeImage}
                alt="Enlarged Visual Evidence"
                draggable={false}
                className="max-h-[80vh] max-w-[90vw] object-contain rounded-xl shadow-2xl pointer-events-none"
              />
            </div>

            {/* Left/Right floating controls inside Lightbox */}
            {totalImages > 1 && (
              <div 
                className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-20"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={handlePrev}
                  className="p-4 rounded-2xl bg-black/60 hover:bg-black/80 text-white border border-white/10 pointer-events-auto transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-4 rounded-2xl bg-black/60 hover:bg-black/80 text-white border border-white/10 pointer-events-auto transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            )}
          </div>

          {/* Bottom Zoom/Pan Instruction bar */}
          <div className="p-4 text-center text-[10px] text-white/50 bg-gradient-to-t from-black/80 to-transparent">
            {zoomScale > 1 
              ? "Drag image to pan. Double click/tap to reset zoom." 
              : "Use buttons to Zoom or Pinch to zoom on mobile. Double click/tap to zoom."
            }
          </div>
        </div>
      )}
    </div>
  );
}
