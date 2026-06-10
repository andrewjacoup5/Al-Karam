import React, { useState, useEffect, useRef } from "react";
import { X, Download, FileText, CheckCircle2, ShieldCheck, HelpCircle } from "lucide-react";
import ProductGallery from "./ProductGallery";
import DocxParser from "./DocxParser";
import { getSortedGalleryImages } from "../utils/productUtils";

/**
 * Large, responsive details modal for Al Karam products.
 */
export default function ProductModal({ device, activeVersionIdx, setActiveVersionIdx, onClose }) {
  const modalRef = useRef(null);
  const [detectedDeviceName, setDetectedDeviceName] = useState(
    `${device.brand} - ${device.name}`
  );

  // Reset name on device/version swap
  useEffect(() => {
    setDetectedDeviceName(`${device.brand} - ${device.name}`);
  }, [device, activeVersionIdx]);

  // Focus trap & ESC key listener for accessibility
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const version = device.versions[activeVersionIdx] || device.versions[0];
  if (!version) return null;

  // Extract DOCX and PDF documents
  const docxFile = version.documents?.find(doc => doc.ext === ".docx");
  const pdfFile = version.documents?.find(doc => doc.ext === ".pdf");

  // Retrieve sorted image list
  const sortedImages = getSortedGalleryImages(version.images);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-6 overflow-y-auto select-none"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        tabIndex="-1"
        className="bg-white rounded-3xl w-full max-w-[1400px] shadow-2xl border border-slate-100 overflow-hidden my-4 flex flex-col focus:outline-none animate-page-enter max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 bg-slate-900 text-white flex justify-between items-start relative select-text">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-medical-400 bg-medical-950 px-2.5 py-1 rounded">
              {device.category} • Equipment Details
            </span>
            <h3 id="modal-title" className="text-xl md:text-2xl font-black mt-2 leading-tight">
              {detectedDeviceName}
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal dialog"
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white transition-colors cursor-pointer border border-white/5 active:scale-95"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Dynamic Version Tabs for Multi-spec Devices */}
        {device.versions.length > 1 && (
          <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-100/80 flex flex-wrap items-center gap-2 select-text">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Device Version:</span>
            <div className="flex flex-wrap gap-1.5">
              {device.versions.map((ver, idx) => {
                const isSelected = activeVersionIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveVersionIdx(idx)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      isSelected
                        ? "bg-medical-600 text-white border-medical-600 shadow-sm"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100/50"
                    }`}
                  >
                    {ver.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Modal Main Body Scroll Grid */}
        <div className="p-6 overflow-y-auto flex-1 select-text">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Image Slider & Controls (7 Columns on Large screen) */}
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center">
                <FileText className="h-4.5 w-4.5 mr-2 text-medical-600" />
                Image Gallery & Visual Proofs
              </h4>
              
              <ProductGallery images={sortedImages} />
            </div>

            {/* Right Column: Device Specifications Accordions (5 Columns) */}
            <div className="lg:col-span-5 space-y-4">
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center">
                <HelpCircle className="h-4.5 w-4.5 mr-2 text-medical-600" />
                Technical Profile & Specifications
              </h4>

              {docxFile ? (
                /* Dynamic Word Document specifications engine */
                <DocxParser
                  docxPath={docxFile.path}
                  fallbackName={`${device.brand} - ${device.name}`}
                  onDeviceNameDetected={setDetectedDeviceName}
                />
              ) : (
                /* Fallback specs profile for database-only items */
                <div className="space-y-4">
                  <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200/50 shadow-sm">
                    <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2">Device Overview</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      Standard technical specifications and installation guidelines are stored under the Al Karam Biomedical Database registry. Use the PDF catalog below for offline viewing.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5 space-y-3">
                    <div className="flex items-center space-x-2 text-medical-600 font-bold text-xs pb-1 border-b border-slate-100">
                      <CheckCircle2 className="h-4.5 w-4.5" />
                      <span>Preventive Maintenance Standard Checks</span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-600">
                      <li className="flex items-center"><span className="h-1.5 w-1.5 rounded-full bg-medical-500 mr-2.5" />Electrical Safety Test</li>
                      <li className="flex items-center"><span className="h-1.5 w-1.5 rounded-full bg-medical-500 mr-2.5" />Sensors & Alarms Verification</li>
                      <li className="flex items-center"><span className="h-1.5 w-1.5 rounded-full bg-medical-500 mr-2.5" />Battery Backup Load Cycle Test</li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5 space-y-3">
                    <div className="flex items-center space-x-2 text-medical-600 font-bold text-xs pb-1 border-b border-slate-100">
                      <ShieldCheck className="h-4.5 w-4.5" />
                      <span>Compliance Checklist</span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-600">
                      <li className="flex items-center"><span className="h-1.5 w-1.5 rounded-full bg-medical-500 mr-2.5" />ISO 13485 Medical Quality</li>
                      <li className="flex items-center"><span className="h-1.5 w-1.5 rounded-full bg-medical-500 mr-2.5" />NIST-Traceable Verification Certificate</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Modal Footer & PDF Download Section */}
        <div className="p-4 bg-slate-50 border-t border-slate-100/80 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <span className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Maintenance SLA Standard</span>
            <span className="block text-xs text-slate-500 mt-0.5 font-medium">Certified Equipment Maintenance Profile</span>
          </div>

          {/* PDF Catalog Action */}
          {pdfFile ? (
            <div className="flex items-center bg-white p-3 rounded-2xl border border-slate-200 shadow-sm gap-4 w-full md:w-auto max-w-md select-text">
              <div className="p-2.5 bg-red-50 text-red-600 rounded-xl border border-red-100/70 flex-shrink-0">
                <FileText className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0 pr-4">
                <span className="block text-xs font-black text-slate-800 truncate" title={pdfFile.name}>
                  {pdfFile.name}
                </span>
                <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                  PDF Portfolio
                </span>
              </div>
              <a
                href={pdfFile.path}
                download={pdfFile.name}
                className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <Download className="h-4 w-4" />
                <span>Download PDF</span>
              </a>
            </div>
          ) : (
            <button
              onClick={onClose}
              className="w-full md:w-auto px-8 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors cursor-pointer text-center"
            >
              Close Specifications
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
