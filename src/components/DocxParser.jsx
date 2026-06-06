import React, { useState, useEffect, useMemo } from "react";
import { FileText, Settings, ShieldCheck, CheckCircle2, Info, ChevronDown, Loader2 } from "lucide-react";

// Helper to load mammoth from CDN dynamically
const loadMammoth = () => {
  return new Promise((resolve, reject) => {
    if (window.mammoth) {
      resolve(window.mammoth);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.8.0/mammoth.browser.min.js";
    script.async = true;
    script.onload = () => resolve(window.mammoth);
    script.onerror = () => reject(new Error("Failed to load Mammoth.js"));
    document.head.appendChild(script);
  });
};

/**
 * Parses raw text from DOCX into a structured object matching specifications.
 */
export function parseDocxText(text, fallbackName) {
  if (!text) return null;

  const lines = text
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0);

  let brand = "";
  let model = "";
  let name = "";

  const overview = [];
  const specs = []; // array of { label, value }
  const features = [];
  const applications = [];
  const compliance = [];
  const notes = [];

  let currentSection = "overview"; // default section

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lowerLine = line.toLowerCase();

    // Check for Brand/Model/Name key-value pairs at the beginning (first 10 lines)
    const colonIndex = line.indexOf(":");
    if (colonIndex > 0 && i < 10) {
      const label = line.substring(0, colonIndex).trim().toLowerCase();
      const val = line.substring(colonIndex + 1).trim();
      if (label === "brand") {
        brand = val;
        continue;
      }
      if (label === "model") {
        model = val;
        continue;
      }
      if (label === "name") {
        name = val;
        continue;
      }
    }

    // Section header detection
    if (
      lowerLine === "description" ||
      lowerLine === "overview" ||
      lowerLine === "device overview"
    ) {
      currentSection = "overview";
      continue;
    }
    if (
      lowerLine === "features" ||
      lowerLine === "product features" ||
      lowerLine === "key features" ||
      lowerLine === "features:"
    ) {
      currentSection = "features";
      continue;
    }
    if (
      lowerLine === "technical details" ||
      lowerLine === "specifications" ||
      lowerLine === "technical specifications" ||
      lowerLine === "specs" ||
      lowerLine === "configuration:" ||
      lowerLine === "configuration"
    ) {
      currentSection = "specs";
      continue;
    }
    if (
      lowerLine === "applications" ||
      lowerLine === "applications:" ||
      lowerLine === "uses"
    ) {
      currentSection = "applications";
      continue;
    }
    if (
      lowerLine === "compliance" ||
      lowerLine === "compliance:" ||
      lowerLine === "regulatory"
    ) {
      currentSection = "compliance";
      continue;
    }
    if (
      lowerLine === "optional" ||
      lowerLine === "optional:" ||
      lowerLine === "notes" ||
      lowerLine === "notes:" ||
      lowerLine === "additional notes"
    ) {
      currentSection = "notes";
      continue;
    }

    // Specification detection (Label : Value)
    if (colonIndex > 0) {
      const label = line.substring(0, colonIndex).trim();
      const val = line.substring(colonIndex + 1).trim();
      const cleanLabel = label.replace(/^[-*•\s\t]+/, "");

      // If it looks like a short label and has a value, save it as a spec
      if (val && cleanLabel.length < 50) {
        specs.push({ label: cleanLabel, value: val });
        continue;
      }
    }

    // Accumulate lines into appropriate section arrays
    const cleanText = line.replace(/^[-*•\s\t]+/, "");
    if (currentSection === "features") {
      features.push(cleanText);
    } else if (currentSection === "applications") {
      applications.push(cleanText);
    } else if (currentSection === "compliance") {
      compliance.push(cleanText);
    } else if (currentSection === "notes") {
      notes.push(cleanText);
    } else if (currentSection === "specs") {
      specs.push({ label: cleanText, value: "Yes" });
    } else {
      overview.push(line);
    }
  }

  // Construct Device Name
  let detectedName = "";
  if (brand && model) {
    detectedName = `${brand} - ${model}`;
  } else if (model) {
    detectedName = model;
  } else if (name) {
    detectedName = name;
  } else {
    // Check if the first line is a valid short title candidate
    if (lines.length > 0 && !lines[0].includes(":") && lines[0].length < 60) {
      detectedName = lines[0];
    } else {
      detectedName = fallbackName;
    }
  }

  return {
    deviceName: detectedName,
    overview: overview.join(" "),
    specs,
    features,
    applications,
    compliance,
    notes
  };
}

export default function DocxParser({ docxPath, fallbackName, onDeviceNameDetected }) {
  const [parsedData, setParsedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSections, setOpenSections] = useState({
    specs: true, // Default open spec sheet
    features: false,
    applications: false,
    compliance: false,
    notes: false
  });

  useEffect(() => {
    let active = true;

    async function loadAndParse() {
      setLoading(true);
      setError(null);
      try {
        const mammoth = await loadMammoth();
        const response = await fetch(docxPath);
        if (!response.ok) {
          throw new Error("Unable to fetch document specifications.");
        }
        const arrayBuffer = await response.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        
        if (active) {
          const parsed = parseDocxText(result.value, fallbackName);
          setParsedData(parsed);
          if (parsed && onDeviceNameDetected) {
            onDeviceNameDetected(parsed.deviceName);
          }
          setLoading(false);
        }
      } catch (err) {
        console.warn("Mammoth parse warning: ", err);
        if (active) {
          setError(err.message || "Failed to load document specifications.");
          setLoading(false);
        }
      }
    }

    loadAndParse();

    return () => {
      active = false;
    };
  }, [docxPath, fallbackName]);

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 bg-slate-50/50 rounded-2xl border border-slate-100">
        <Loader2 className="h-6 w-6 text-medical-600 animate-spin mr-3" />
        <span className="text-xs font-semibold text-slate-500">Parsing clinical specifications...</span>
      </div>
    );
  }

  if (error || !parsedData) {
    return (
      <div className="p-6 bg-amber-50/50 rounded-2xl border border-amber-200/50 text-amber-800 text-xs">
        <Info className="h-5 w-5 mb-2 text-amber-600" />
        <p className="font-bold">Specification Sheet Unreachable</p>
        <p className="mt-1 text-amber-600 leading-relaxed">
          Standard catalog details could not be loaded dynamically. Please consult the product portfolio download below.
        </p>
      </div>
    );
  }

  const { overview, specs, features, applications, compliance, notes } = parsedData;

  // Safe checks for empty sections to prevent empty accordions from rendering
  const hasSpecs = specs && specs.length > 0;
  const hasFeatures = features && features.length > 0;
  const hasApplications = applications && applications.length > 0;
  const hasCompliance = compliance && compliance.length > 0;
  const hasNotes = notes && notes.length > 0;

  return (
    <div className="space-y-4">
      {/* Device Overview Card */}
      {overview && overview.trim().length > 0 && (
        <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200/50 shadow-sm">
          <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2">Device Overview</h4>
          <p className="text-xs text-slate-600 leading-relaxed font-normal">{overview}</p>
        </div>
      )}

      {/* Accordion List */}
      <div className="space-y-2">
        {/* Technical Specifications Accordion */}
        {hasSpecs && (
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden transition-all">
            <button
              onClick={() => toggleSection("specs")}
              aria-expanded={openSections.specs}
              className="w-full px-5 py-4 flex justify-between items-center text-left hover:bg-slate-50/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <Settings className="h-4.5 w-4.5 text-medical-600" />
                <span className="text-xs font-bold text-slate-800">Technical Specifications</span>
              </div>
              <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${openSections.specs ? "rotate-180" : ""}`} />
            </button>
            {openSections.specs && (
              <div className="px-5 pb-4 border-t border-slate-100/50 pt-3">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                        <th className="py-2 pr-4 font-extrabold">Parameter</th>
                        <th className="py-2 font-extrabold">Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {specs.map((spec, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/40 transition-colors">
                          <td className="py-2.5 pr-4 font-bold text-slate-700">{spec.label}</td>
                          <td className="py-2.5 text-slate-600 font-medium">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Features Accordion */}
        {hasFeatures && (
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden transition-all">
            <button
              onClick={() => toggleSection("features")}
              aria-expanded={openSections.features}
              className="w-full px-5 py-4 flex justify-between items-center text-left hover:bg-slate-50/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="h-4.5 w-4.5 text-medical-600" />
                <span className="text-xs font-bold text-slate-800">Key Features</span>
              </div>
              <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${openSections.features ? "rotate-180" : ""}`} />
            </button>
            {openSections.features && (
              <div className="px-5 pb-4 border-t border-slate-100/50 pt-3">
                <ul className="space-y-2 text-xs text-slate-600">
                  {features.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-medical-500 mt-1.5 mr-2.5 flex-shrink-0" />
                      <span className="leading-relaxed font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Applications Accordion */}
        {hasApplications && (
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden transition-all">
            <button
              onClick={() => toggleSection("applications")}
              aria-expanded={openSections.applications}
              className="w-full px-5 py-4 flex justify-between items-center text-left hover:bg-slate-50/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <FileText className="h-4.5 w-4.5 text-medical-600" />
                <span className="text-xs font-bold text-slate-800">Clinical Applications</span>
              </div>
              <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${openSections.applications ? "rotate-180" : ""}`} />
            </button>
            {openSections.applications && (
              <div className="px-5 pb-4 border-t border-slate-100/50 pt-3">
                <ul className="space-y-2 text-xs text-slate-600">
                  {applications.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-medical-500 mt-1.5 mr-2.5 flex-shrink-0" />
                      <span className="leading-relaxed font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Compliance Accordion */}
        {hasCompliance && (
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden transition-all">
            <button
              onClick={() => toggleSection("compliance")}
              aria-expanded={openSections.compliance}
              className="w-full px-5 py-4 flex justify-between items-center text-left hover:bg-slate-50/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <ShieldCheck className="h-4.5 w-4.5 text-medical-600" />
                <span className="text-xs font-bold text-slate-800">Compliance & Regulatory Standards</span>
              </div>
              <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${openSections.compliance ? "rotate-180" : ""}`} />
            </button>
            {openSections.compliance && (
              <div className="px-5 pb-4 border-t border-slate-100/50 pt-3">
                <ul className="space-y-2 text-xs text-slate-600">
                  {compliance.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-medical-500 mt-1.5 mr-2.5 flex-shrink-0" />
                      <span className="leading-relaxed font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Additional Notes Accordion */}
        {hasNotes && (
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden transition-all">
            <button
              onClick={() => toggleSection("notes")}
              aria-expanded={openSections.notes}
              className="w-full px-5 py-4 flex justify-between items-center text-left hover:bg-slate-50/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <Info className="h-4.5 w-4.5 text-medical-600" />
                <span className="text-xs font-bold text-slate-800">Additional Options & Notes</span>
              </div>
              <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${openSections.notes ? "rotate-180" : ""}`} />
            </button>
            {openSections.notes && (
              <div className="px-5 pb-4 border-t border-slate-100/50 pt-3">
                <ul className="space-y-2 text-xs text-slate-600">
                  {notes.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-medical-500 mt-1.5 mr-2.5 flex-shrink-0" />
                      <span className="leading-relaxed font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
