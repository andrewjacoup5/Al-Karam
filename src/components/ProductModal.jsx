import React from "react";
import { X, ShieldAlert, Award, FileText, CheckCircle2, Download, AlertTriangle } from "lucide-react";

export default function ProductModal({ product, onClose }) {
  if (!product) return null;

  // Dynamic documentation text file generator and downloader
  const downloadDocumentation = () => {
    let doc = `========================================================================\n`;
    doc += `               ALKARAM MEDICAL FOR BIOMEDICAL SERVICES                  \n`;
    doc += `           TECHNICAL DIAGNOSTIC AND SPECIFICATION ARCHIVE               \n`;
    doc += `========================================================================\n\n`;
    
    doc += `DEVICE SPECIFICATION LEDGER\n`;
    doc += `------------------------------------------------------------------------\n`;
    doc += `Brand / Manufacturer     : ${product.brand}\n`;
    doc += `Equipment Model Name     : ${product.name}\n`;
    doc += `Full Nomenclature ID    : ${product.fullName}\n`;
    doc += `Target Clinical Sectors : ${product.sectors.join(", ")}\n`;
    doc += `Regulatory Risk Profile : ${product.riskCategory}\n`;
    doc += `Scheduled Calibration   : Every ${product.calibrationInterval}\n`;
    doc += `Operating Standards      : IEC 60601-1 / ISO 13485 Compliant\n\n`;
    
    doc += `1. DETAILED HARDWARE SPECIFICATIONS\n`;
    doc += `------------------------------------------------------------------------\n`;
    Object.entries(product.specs).forEach(([key, value]) => {
      doc += `${key.padEnd(25)}: ${value}\n`;
    });
    doc += `\n`;
    
    doc += `2. BIOMEDICAL PREVENTIVE MAINTENANCE CHECKLIST (AAMI/ECRI)\n`;
    doc += `------------------------------------------------------------------------\n`;
    product.checklist.forEach((step, index) => {
      doc += `[ ] PM-STEP 0${index + 1}: ${step}\n`;
    });
    doc += `\n`;
    
    doc += `3. CALIBRATION AND QUALITY ASSURANCE AUDIT COMPLIANCE\n`;
    doc += `------------------------------------------------------------------------\n`;
    doc += `* Ensure device is connected to NIST-traceable diagnostic simulator.\n`;
    doc += `* Check casing ground-fault impedance (< 0.2 Ohms maximum threshold).\n`;
    doc += `* Check enclosure electrical safety leakage currents (< 100 µA).\n`;
    doc += `* Standard calibration interval of ${product.calibrationInterval} must be enforced.\n\n`;
    
    doc += `========================================================================\n`;
    doc += `For urgent maintenance, parts sourcing, or emergency calibration,\n`;
    doc += `contact Alkaram Medical Dispatch: support@alkaram-medical.com\n`;
    doc += `Emergency Technical Hotline: +20 (10) 9999-9999\n`;
    doc += `========================================================================\n`;

    const blob = new Blob([doc], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    
    // Formatting filename safely
    const cleanFileName = product.fullName.replace(/[^a-z0-9]/gi, "_").toLowerCase();
    link.download = `alkaram_${cleanFileName}_specs.txt`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300"
      />
      
      {/* Modal Container */}
      <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 flex flex-col justify-between max-h-[90vh] overflow-y-auto animate-page-enter">
        
        {/* Modal Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Content */}
        <div>
          {/* Header Row */}
          <div className="flex items-start space-x-4 mb-6">
            {/* Vector Badge */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-medical-500 to-medical-700 text-white font-bold text-xl flex items-center justify-center flex-shrink-0 shadow-md">
              {product.brand.substring(0, 2).toUpperCase()}
            </div>
            
            <div>
              <span className="text-[10px] font-bold text-medical-600 bg-medical-50 border border-medical-100 px-3 py-1 rounded-full uppercase tracking-wider">
                {product.brand} OEM Hardware
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 mt-2 mb-1">
                {product.name}
              </h3>
              <span className="text-xs font-semibold text-slate-400">
                Nomenclature: {product.fullName}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Technical Specs & Compliance row grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            
            {/* Tech Specs */}
            <div className="bg-slate-50 rounded-2xl p-4.5 border border-slate-100/60">
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3 flex items-center">
                <FileText className="h-4 w-4 mr-2 text-medical-600" />
                Technical Specifications
              </h4>
              <div className="space-y-2">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="flex justify-between items-start text-xs border-b border-slate-200/50 pb-1.5">
                    <span className="text-slate-500 font-medium">{key}</span>
                    <span className="text-slate-800 font-bold text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Parameters / Risk categories */}
            <div className="space-y-4">
              
              {/* Risk category box */}
              <div className="flex items-center space-x-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100/60">
                <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Risk Classification</span>
                  <span className="block text-xs font-bold text-rose-600 mt-0.5">{product.riskCategory}</span>
                </div>
              </div>

              {/* Calibration interval box */}
              <div className="flex items-center space-x-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100/60">
                <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Calibration Mandate</span>
                  <span className="block text-xs font-bold text-slate-700 mt-0.5">Every {product.calibrationInterval}</span>
                </div>
              </div>

            </div>

          </div>

          {/* Biomedical PM Checklist */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100/60 mb-6">
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3.5 flex items-center">
              <CheckCircle2 className="h-4 w-4 mr-2 text-emerald-500" />
              Biomedical PM Checklist (AAMI Standards)
            </h4>
            <div className="space-y-2">
              {product.checklist.map((step, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-500 font-medium">
                  <div className="w-4 h-4 rounded border border-slate-300 bg-white flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-[9px] text-emerald-500">
                    ✓
                  </div>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Standards Alert Callout */}
          <div className="flex items-start space-x-3 p-4 bg-amber-50/60 rounded-2xl border border-amber-100 text-xs text-amber-800 mb-6">
            <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Calibration Alert:</strong> All adjustments and measurements on this equipment model must be validated using NIST-traceable digital instrumentation. Self-servicing by non-certified personnel compromises patient safety margins.
            </p>
          </div>

        </div>

        {/* Modal Action footer */}
        <div className="pt-5 border-t border-slate-200/60 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
            * Generated dynamically by Alkaram Metrology Desk
          </span>
          
          <div className="flex space-x-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold px-5 py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
            >
              Close Details
            </button>
            <button
              onClick={downloadDocumentation}
              className="flex-1 sm:flex-none flex items-center justify-center space-x-2 bg-gradient-to-r from-medical-600 to-medical-500 hover:from-medical-700 hover:to-medical-600 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-md shadow-medical-100 hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>Download Technical Specs</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
