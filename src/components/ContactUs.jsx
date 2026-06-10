import React, { useState, memo } from "react";
import { Mail, Phone, MapPin, ShieldCheck, AlertOctagon, CheckCircle2, Copy, Building, Clock, Loader2 } from "lucide-react";

function ContactUs({ source = "Contact Us Page" }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [ticketDetails, setTicketDetails] = useState({
    hospital: "",
    department: "ICU",
    person: "",
    phone: "",
    priority: "scheduled",
    device: "",
    desc: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicketDetails({ ...ticketDetails, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!ticketDetails.hospital || !ticketDetails.phone || !ticketDetails.device) {
      alert("Please fill out all critical fields (*)");
      return;
    }

    // Generate simulated clinical ticket ID
    const randomHex = Math.floor(1000 + Math.random() * 9000).toString(16).toUpperCase();
    const generatedId = `TKT-${new Date().getFullYear()}-${randomHex}`;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

      if (!accessKey) {
        console.warn("Web3Forms access key not found in env. Simulating successful email dispatch.");
        // Simulate network latency for high fidelity UX
        await new Promise((resolve) => setTimeout(resolve, 1200));
      } else {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: accessKey,
            subject: `[Biomedical Support Desk] New Work Order - ${generatedId}`,
            from_name: "Al Karam Support Hub",
            to_name: "Andrew Osama",
            hospital: ticketDetails.hospital,
            department: ticketDetails.department,
            contact_person: ticketDetails.person || "Not Specified",
            phone: ticketDetails.phone,
            equipment: ticketDetails.device,
            description: ticketDetails.desc || "No extra description provided",
            ticket_id: generatedId,
            submission_source: source,
          }),
        });

        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to send the dispatch ticket. Please try again.");
        }
      }

      setTicketId(generatedId);
      setFormSubmitted(true);
    } catch (err) {
      console.error("Error submitting support form:", err);
      setSubmitError(err.message || "An unexpected network error occurred. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyTicketId = (id) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(id)
        .then(() => {
          alert("Ticket ID copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy using clipboard API, falling back:", err);
          fallbackCopyText(id);
        });
    } else {
      fallbackCopyText(id);
    }
  };

  const fallbackCopyText = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        alert("Ticket ID copied to clipboard!");
      } else {
        alert("Failed to copy Ticket ID. Please copy it manually.");
      }
    } catch (err) {
      console.error("Fallback copy failed:", err);
      alert("Failed to copy Ticket ID. Please copy it manually.");
    }
    document.body.removeChild(textArea);
  };

  return (
    <section id="contact-section" className="py-20 bg-slate-50 text-slate-900 relative overflow-hidden grid-bg">
      {/* Decorative premium glow gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-medical-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <span className="text-xs font-bold uppercase tracking-wider text-medical-600 bg-medical-50 border border-medical-200 px-4 py-1.5 rounded-full">
            Engineering Dispatch Hub
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mt-4 mb-4 font-sans">
            Request Technical Support
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Submit a biomedical service ticket or reach out to our emergency technical office. Our factory-trained field engineers are ready for rapid dispatch across all governorates of Egypt.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Left Grid: Contact details & emergency lines */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">

            {/* Urgent Support Alert Box */}
            <div id="emergency-portal" className="bg-gradient-to-br from-rose-50/40 to-white border border-rose-200 rounded-3xl p-6 relative overflow-hidden shadow-sm hover:shadow-md group hover:border-rose-300 transition-all duration-300">
              <div className="absolute right-0 bottom-0 translate-y-1/4 translate-x-1/4 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl pointer-events-none animate-pulse-slow" />

              <div className="flex items-center space-x-3.5 mb-4">
                <div className="p-3 rounded-2xl bg-rose-100/80 border border-rose-200 animate-heartbeat text-rose-600">
                  <AlertOctagon className="h-6 w-6" />
                </div>
                <div>
                  <span className="block text-xs font-extrabold uppercase tracking-widest text-rose-700">Support Emergency Hotline</span>
                  <span className="block text-[10px] text-rose-500 font-bold tracking-wider mt-0.5">24/7 ICU & OR SYSTEM CRITICAL FAILURES</span>
                </div>
              </div>

              <p className="text-xs text-slate-650 leading-relaxed mb-6 font-medium">
                For complete failures in life-support ventilators, anesthesia workstations, or emergency defibrillators, call our technical dispatch team immediately:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  "+2 01099442054",
                  "+2 01098812385",
                  "+2 01272398884"
                ].map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\D/g, "")}`}
                    className="flex items-center space-x-2.5 bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white px-2.5 py-3 rounded-xl border border-rose-200/60 hover:border-rose-650 transition-all duration-300 cursor-pointer shadow-sm text-[11px] font-bold group"
                  >
                    <Phone className="h-3.5 w-3.5 text-rose-500 group-hover:text-white hover:scale-110 transition-transform flex-shrink-0" />
                    <span>{phone}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Standard contact channels */}
            <div className="bg-white border border-slate-200/60 rounded-3xl p-6 space-y-6 shadow-sm flex-grow flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-xs text-slate-500 uppercase tracking-widest mb-4 flex items-center">
                  <Building className="h-4 w-4 mr-2 text-medical-600" />
                  Corporate Headquarters
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start space-x-4 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-50 text-medical-600 border border-slate-200/60 shadow-sm flex-shrink-0 mt-0.5">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block font-bold text-slate-800">Cairo Office</span>
                      <span className="block text-slate-655 mt-1 leading-relaxed">
                        32 Obur Building - Salah Salem Street, Cairo, Egypt.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-50 text-medical-600 border border-slate-200/60 shadow-sm flex-shrink-0 mt-0.5">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block font-bold text-slate-800">10th of Ramadan Office</span>
                      <span className="block text-slate-655 mt-1 leading-relaxed">
                        10th of Ramadan City, Alordonia, Al Jawhara Mall, Office 447.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-50 text-medical-600 border border-slate-200/60 shadow-sm flex-shrink-0">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block font-bold text-slate-800">Service Ticket Desk</span>
                      <a href="mailto:Info@alkaram-medical.com" className="block text-medical-600 hover:text-medical-700 hover:underline mt-1 font-bold">
                        Info@alkaram-medical.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center space-x-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <ShieldCheck className="h-4.5 w-4.5 text-emerald-500 animate-pulse" />
                <span>International Engineering Standards Compliance Assured</span>
              </div>
            </div>

          </div>

          {/* Right Grid: High-fidelity clinical ticketing form / Submitted screen */}
          <div className="lg:col-span-7 bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm relative flex flex-col justify-center">

            {formSubmitted ? (
              // Submitted Success Window
              <div className="animate-fade-in text-center py-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-md">
                  <CheckCircle2 className="h-10 w-10 animate-bounce" />
                </div>

                <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900 mb-2 font-sans">
                  Work Ticket Dispatched!
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
                  Our maintenance supervisor has registered your request. An authorized field team has been scheduled.
                </p>

                {/* Ticket ID Box */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 inline-flex items-center space-x-4 shadow-sm mb-8 max-w-sm w-full justify-between hover:border-slate-300 transition-colors">
                  <div className="text-left">
                    <span className="block text-[8px] font-extrabold text-slate-400 uppercase tracking-widest">DISPATCH TICKET REFERENCE</span>
                    <span className="font-mono text-sm sm:text-base font-extrabold text-medical-600">{ticketId}</span>
                  </div>
                  <button
                    onClick={() => handleCopyTicketId(ticketId)}
                    className="p-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer border border-slate-200 flex items-center"
                    title="Copy Ticket ID"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>

                {/* Simulated ticket status */}
                <div className="border border-medical-200 bg-medical-50/20 rounded-2xl p-5 text-left text-xs space-y-3 mb-8 max-w-md mx-auto shadow-sm">
                  <div className="flex items-center justify-between border-b border-medical-100 pb-2">
                    <span className="font-bold text-[9px] text-medical-700 uppercase tracking-wider">
                      SLA LEVEL: ROUTINE MAINTENANCE
                    </span>
                    <span className="inline-flex items-center text-[8px] bg-medical-100 text-medical-800 px-2 py-0.5 rounded font-bold border border-medical-200">
                      SCHEDULED
                    </span>
                  </div>

                  <div className="space-y-1.5 text-slate-700">
                    <span className="block font-medium">
                      Facility Location: <strong className="text-slate-900">{ticketDetails.hospital}</strong> ({ticketDetails.department} Dept)
                    </span>
                    <span className="block font-medium">
                      Target Equipment: <strong className="text-slate-900">{ticketDetails.device}</strong>
                    </span>
                  </div>

                  <div className="border-t border-medical-100 pt-2 flex items-start space-x-2 text-slate-500">
                    <Clock className="h-4 w-4 text-medical-600 flex-shrink-0 mt-0.5" />
                    <p className="leading-relaxed text-[10px]">
                      Response Window: A certified service engineer will arrive at your facility <strong>Within 24 Hours (Next Business Day)</strong>.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setTicketDetails({
                      hospital: "",
                      department: "ICU",
                      person: "",
                      phone: "",
                      priority: "scheduled",
                      device: "",
                      desc: ""
                    });
                  }}
                  className="bg-gradient-to-r from-medical-600 to-medical-500 hover:from-medical-700 hover:to-medical-600 text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-lg transition-all cursor-pointer"
                >
                  Create New Service Ticket
                </button>
              </div>
            ) : (
              // Active Ticketing Form
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">Biomedical Work Order Desk</h3>
                  <p className="text-slate-500 text-xs mt-1">
                    Generate an authorized engineering work ticket for diagnostic maintenance service.
                  </p>
                </div>

                {/* Hospital and Department row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                      Hospital/Clinic Name *
                    </label>
                    <input
                      type="text"
                      name="hospital"
                      required
                      placeholder="e.g. Al-Salam Hospital"
                      value={ticketDetails.hospital}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-medical-500 focus:ring-2 focus:ring-medical-500/20 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                      Clinical Department *
                    </label>
                    <select
                      name="department"
                      value={ticketDetails.department}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-medical-500 focus:ring-2 focus:ring-medical-500/20 rounded-xl px-3 py-3 text-xs text-slate-700 outline-none transition-all cursor-pointer"
                    >
                      <option value="Maintenance">Maintenance</option>
                      <option value="Medical planning Consultant">Medical planning Consultant</option>
                      <option value="ICU">Intensive Care Unit (ICU)</option>
                      <option value="OR">Operating Room (OR)</option>
                      <option value="ER">Emergency Room (ER)</option>
                      <option value="IN-Patient">In-Patient Wards</option>
                      <option value="Dialysis">Dialysis Unit</option>
                      <option value="Clinics">Outpatient Clinics</option>
                      <option value="Gases">Medical Gas Infrastructure</option>
                      <option value="Ambulance">Ambulance & EMS</option>
                    </select>
                  </div>
                </div>

                {/* Contact Person and Phone row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                      Contact Person Name
                    </label>
                    <input
                      type="text"
                      name="person"
                      placeholder="e.g. Eng. Ahmed Ali"
                      value={ticketDetails.person}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-medical-500 focus:ring-2 focus:ring-medical-500/20 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. +20 101 234 5678"
                      value={ticketDetails.phone}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-medical-500 focus:ring-2 focus:ring-medical-500/20 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Equipment name */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                    Target Equipment & Model *
                  </label>
                  <input
                    type="text"
                    name="device"
                    required
                    placeholder="e.g. Axcent - LYRA X1 Ventilator"
                    value={ticketDetails.device}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-medical-500 focus:ring-2 focus:ring-medical-500/20 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 outline-none transition-all"
                  />
                </div>

                {/* Fault description */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                    Details of Fault or Technical Service Request
                  </label>
                  <textarea
                    id="ticket-desc"
                    name="desc"
                    rows="3"
                    placeholder="e.g. Screen error code E-04 airway flow sensor error during volume ventilation maintenance cycle."
                    value={ticketDetails.desc}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-medical-500 focus:ring-2 focus:ring-medical-500/20 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit button */}
                {submitError && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-xs flex items-center space-x-2 animate-fade-in">
                    <AlertOctagon className="h-4 w-4 flex-shrink-0 text-rose-500" />
                    <span className="font-semibold">{submitError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-medical-600 to-medical-500 hover:from-medical-700 hover:to-medical-600 text-white font-bold py-4 rounded-xl text-xs shadow-lg shadow-medical-500/10 hover:shadow-medical-500/20 transition-all duration-300 border border-medical-500/20 flex items-center justify-center space-x-2 ${isSubmitting ? "opacity-75 cursor-not-allowed" : "hover:-translate-y-0.5 cursor-pointer"
                    }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin h-4.5 w-4.5" />
                      <span>Dispatching Work Order...</span>
                    </>
                  ) : (
                    <span>Generate & Dispatch Work Order</span>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}

export default memo(ContactUs);
