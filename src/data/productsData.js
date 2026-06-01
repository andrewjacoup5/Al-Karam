// Products database for Alkaram Medical Portfolio & Technical Services
// Contains comprehensive equipment lists for each partner brand and clinical sector.

export const CLINICAL_SECTORS = [
  { id: "all", name: "All Sectors", icon: "Activity" },
  { id: "ICU", name: "Intensive Care Unit (ICU)", icon: "Heart" },
  { id: "OR", name: "Operating Room (OR)", icon: "Scissors" },
  { id: "ER", name: "Emergency Room (ER)", icon: "Flame" },
  { id: "IN-Patient", name: "In-Patient Ward", icon: "Bed" },
  { id: "Dialysis", name: "Dialysis Unit", icon: "TrendingUp" },
  { id: "Clinics", name: "Outpatient Clinics", icon: "Stethoscope" },
  { id: "Medical Gases", name: "Medical Gas Systems", icon: "Wind" },
  { id: "Ambulance", name: "Ambulance & EMS", icon: "Truck" }
];

export const PARTNERS = [
  { id: "Optium", name: "Optium", logoText: "OP", tagline: "Premium Hospital Beds & Dialysis Furniture", origin: "Germany" },
  { id: "Axcent", name: "aXcent Medical", logoText: "AX", tagline: "Anesthesia, Ventilation & ICU Monitoring", origin: "Germany" },
  { id: "AUG", name: "AUG Medical", logoText: "AU", tagline: "Advanced Diagnostic & Laryngoscopy Systems", origin: "USA/Poland" },
  { id: "ABN", name: "ABN Medical", logoText: "AB", tagline: "High-Quality Diagnostic & Sphygmomanometers", origin: "Japan" },
  { id: "Konted", name: "Konted", logoText: "KO", tagline: "Wireless Diagnostic Ultrasound Transducers", origin: "China" },
  { id: "ITC", name: "ITC Medical", logoText: "IT", tagline: "Medical Gas Flowmeters, Regulators & Suction", origin: "Italy" },
  { id: "Spencer", name: "Spencer EMS", logoText: "SP", tagline: "Emergency Transport & Evacuation Solutions", origin: "Italy" },
  { id: "GGM", name: "GGM", logoText: "GG", tagline: "Active Humidification & Breathing Systems", origin: "Taiwan" },
  { id: "Ekingst", name: "Ekingst", logoText: "EK", tagline: "Capnography & EtCO2 Monitoring", origin: "USA" },
  { id: "CBM", name: "CBM / CMB", logoText: "CB", tagline: "Medical Cylinders & Regulators", origin: "Italy" },
  { id: "CAMI", name: "CAMI Suction", logoText: "CA", tagline: "Professional Surgical Suction Pumps", origin: "Italy" }
];

export const PRODUCTS = [
  // ==================== OPTIUM BRAND ====================
  {
    id: "optium-bd-28",
    name: "BD 28 Dialysis Bed",
    fullName: "Optium - BD 28",
    brand: "Optium",
    sectors: ["Dialysis"],
    imageText: "BD 28 Dialysis",
    description: "Premium fully motorized dialysis and oncology treatment chair designed for long-term patient comfort. Features multiple positioning angles, electronic adjustments, and hygienic medical-grade seamless upholstery.",
    specs: {
      "Adjustment Type": "Electric (4 Motors)",
      "Height Range": "540 mm to 960 mm",
      "Backrest Angle": "0° to 80°",
      "Trendelenburg Angle": "-12° to 20°",
      "Maximum Load Capacity": "250 kg",
      "Safety Certification": "IEC 60601-1, CE marked"
    },
    checklist: [
      "Verify motorized adjustments (Backrest, Legrest, Height, Trendelenburg) for smooth operation.",
      "Inspect emergency battery backup power supply and automatic return function.",
      "Check remote control pendant functionality and locking mechanism.",
      "Verify structural integrity of side rails and central braking system."
    ],
    calibrationInterval: "6 Months",
    riskCategory: "Medium Risk / Patient Support"
  },
  {
    id: "optium-bd-48",
    name: "BD 48 Specialty Clinical Bed",
    fullName: "Optium - BD 48",
    brand: "Optium",
    sectors: ["Clinics"],
    imageText: "BD 48 Clinical",
    description: "Heavy-duty electric treatment table and day clinic bed, optimized for outpatient procedures, general examinations, and recovery wards.",
    specs: {
      "Motor Count": "3 Actuators",
      "Safe Working Load": "220 kg",
      "Backrest Range": "0° to 75°",
      "Castor Diameter": "125 mm (Central Braking)",
      "Upholstery Thickness": "80 mm high-density foam"
    },
    checklist: [
      "Lubricate mechanical pivot points and hinges.",
      "Test emergency quick-release (CPR manual lever) function.",
      "Examine cable routing of motors to prevent crushing or pinching.",
      "Conduct electrical safety leakage test (ground bond test)."
    ],
    calibrationInterval: "12 Months",
    riskCategory: "Medium Risk / Patient Support"
  },
  {
    id: "optium-cb-22",
    name: "CB 22 Ward Bed",
    fullName: "Optium - CB 22",
    brand: "Optium",
    sectors: ["IN-Patient"],
    imageText: "CB 22 Bed",
    description: "Standard hospital ward bed with dual manual/mechanical adjustment levers, designed for long-term patient stay, offering robustness, safety, and hygiene features.",
    specs: {
      "Operation Mode": "Manual crank shafts",
      "Sections": "4-Section platform",
      "Backrest adjustment": "Crank lever (up to 70°)",
      "Legrest adjustment": "Crank lever (up to 40°)",
      "Side Rails": "Collapsible aluminum rails"
    },
    checklist: [
      "Inspect mechanical crank operation and check for smooth motion without binding.",
      "Verify secure latching of collapsible aluminum side rails.",
      "Inspect dual castor wheel locks and structural frame welding.",
      "Apply medical-grade grease to lead screws."
    ],
    calibrationInterval: "12 Months",
    riskCategory: "Low-Medium Risk"
  },
  {
    id: "optium-cl-22",
    name: "CL 22 Intensive Care Bed",
    fullName: "Optium - CL 22",
    brand: "Optium",
    sectors: ["IN-Patient"],
    imageText: "CL 22 Bed",
    description: "Multi-functional ICU bed with premium electric controllers, built-in scale system, patient control panels integrated in the side-rails, and rapid-response manual CPR levers.",
    specs: {
      "Control System": "Microprocessor control with nurse panels",
      "Scale accuracy": "± 100g weight sensing",
      "Positions": "Trendelenburg, Reverse-Trendelenburg, Cardiac Chair, Vascular",
      "Safe Working Load": "270 kg",
      "Mattress Platform": "ABS plastic removable sheets"
    },
    checklist: [
      "Perform weight scale calibration with certified standard test weights.",
      "Check response of the absolute CPR quick deflation lever.",
      "Conduct comprehensive insulation resistance and grounding resistance test.",
      "Verify nurse call integration and controls lockouts."
    ],
    calibrationInterval: "6 Months",
    riskCategory: "High Risk / Critical Patient Support"
  },
  {
    id: "optium-cl-32",
    name: "CL 32 ICU & Ward Bed",
    fullName: "Optium - CL 32",
    brand: "Optium",
    sectors: ["IN-Patient"],
    imageText: "CL 32 Bed",
    description: "Highly stable clinical ward bed with column-based vertical hoist, offering unparalleled access for mobile X-ray C-arms and patient lifts.",
    specs: {
      "Column Drive": "Dual telescoping columns",
      "X-ray compatibility": "Radiolucent backrest with cassette tray holder",
      "Safe Load": "250 kg",
      "Braking": "5th wheel steering alignment"
    },
    checklist: [
      "Check vertical column alignment and uniform telescopic speed.",
      "Inspect X-ray cassette tray guide rail and lock.",
      "Check tracking of the fifth wheel alignment mechanism.",
      "Verify functional limits of electronic travel sensors."
    ],
    calibrationInterval: "6 Months",
    riskCategory: "High Risk / Critical Patient Support"
  },
  {
    id: "optium-cl-42",
    name: "CL 42 Recovery Bed",
    fullName: "Optium - CL 42",
    brand: "Optium",
    sectors: [], // Partner only
    imageText: "CL 42 Bed",
    description: "Premium recovery and post-anesthesia bed designed to minimize patient transfers, featuring integrated oxygen tank holder, accessory rails, and quick-slide steering.",
    specs: {
      "Capacity": "220 kg",
      "Chassis": "Antistatic base cover with built-in storage",
      "Steering": "Dual-end directional steering controls",
      "Castors": "150 mm antistatic wheels"
    },
    checklist: [
      "Check antistatic grounding chain/wheel contact resistance.",
      "Test central brakes and mechanical directional locks.",
      "Examine integrated utility/oxygen cylinder brackets.",
      "Verify quick-tilt trendelenburg pneumatics."
    ],
    calibrationInterval: "12 Months",
    riskCategory: "Medium Risk"
  },
  {
    id: "optium-cl-52",
    name: "CL 52 Premium Intensive Care Platform",
    fullName: "Optium - CL 52",
    brand: "Optium",
    sectors: [],
    imageText: "CL 52 Platform",
    description: "Ultra-premium lateral-tilting critical care platform, allowing active patient positioning to reduce respiratory complications and improve clinical outcome in long-term ICU stays.",
    specs: {
      "Lateral Tilt": "±15° left and right automatic tilt",
      "Nurse Console": "Touchscreen dashboard with protocol programs",
      "CPR Release": "Dual electro-pneumatic instant release",
      "Safe Load": "290 kg"
    },
    checklist: [
      "Calibrate lateral tilt gyro-sensors and electronic angle indicators.",
      "Perform load capacity and hydraulic stabilization test.",
      "Verify all touch console operations and software updates.",
      "Inspect emergency battery cells under simulation."
    ],
    calibrationInterval: "6 Months",
    riskCategory: "High Risk / Life Support"
  },
  {
    id: "optium-cl-50",
    name: "CL 50 Critical Care Bed",
    fullName: "Optium - CL 50",
    brand: "Optium",
    sectors: [],
    imageText: "CL 50 Bed",
    description: "Standard-of-care electric intensive therapy bed, providing automated profile positioning, backrest regression to reduce abdominal compression, and reliable operation.",
    specs: {
      "Regression": "Dual-regression backrest (110 mm)",
      "Height Range": "450 mm to 850 mm",
      "Controls": "Integrated in side rails",
      "Load Capacity": "250 kg"
    },
    checklist: [
      "Verify regression mechanics to ensure no friction or noise is present.",
      "Test electrical isolation and enclosure leakage currents.",
      "Validate operation of hand pendant and side rail controllers.",
      "Inspect mechanical stops and limit microswitches."
    ],
    calibrationInterval: "6 Months",
    riskCategory: "Medium-High Risk"
  },
  {
    id: "optium-cl-55",
    name: "CL 55 Ultra-Bariatric ICU Bed",
    fullName: "Optium - CL 55",
    brand: "Optium",
    sectors: [],
    imageText: "CL 55 Bariatric",
    description: "Heavy-duty bariatric clinical bed system supporting up to 400 kg. Features width expansion rails, heavy torque motors, and high-performance pressure-redistributing air mattress integration.",
    specs: {
      "Safe Working Load": "400 kg",
      "Width Extension": "900 mm to 1100 mm adjustable",
      "Actuators": "Heavy-duty low-noise linear actuators",
      "Controls": "Wired handset with security keys"
    },
    checklist: [
      "Check heavy-duty motor gear teeth and frame structural welds for fatigue cracks.",
      "Verify width expansion locking clamps.",
      "Calibrate scale system with high-capacity certified test loads.",
      "Test emergency battery discharge times under full load."
    ],
    calibrationInterval: "6 Months",
    riskCategory: "High Risk / Critical Patient Support"
  },
  {
    id: "optium-cosy-bd",
    name: "COSY BD Pediatric Bed",
    fullName: "Optium - COSY BD",
    brand: "Optium",
    sectors: ["Dialysis"],
    imageText: "COSY BD",
    description: "Specialized pediatric treatment bed for pediatric dialysis, long-term infusion, and general pediatrics. Features child-safe colorful panels, full safety enclosure rails, and electric adjustment.",
    specs: {
      "Enclosure Height": "800 mm transparent side panels",
      "Length": "1600 mm",
      "Safe Working Load": "150 kg",
      "Motorized Functions": "Height, backrest, legrest"
    },
    checklist: [
      "Check safety locks on pediatric side panels to ensure children cannot release them from inside.",
      "Examine transparency and structural stability of high-impact acrylic shields.",
      "Test smooth movement and speed control of actuators.",
      "Perform standard electrical safety leakage tests."
    ],
    calibrationInterval: "12 Months",
    riskCategory: "Medium Risk / Pediatric Support"
  },
  {
    id: "optium-cosy-pt",
    name: "COSY PT Examination Bed",
    fullName: "Optium - COSY PT",
    brand: "Optium",
    sectors: ["Clinics"],
    imageText: "COSY PT",
    description: "Ergonomic pediatric exam and outpatient day bed, tailored for quick assessments, immunization clinics, and pediatric therapy.",
    specs: {
      "Configuration": "2-Section fixed height",
      "Dimensions": "1500 x 700 mm",
      "Backrest adjustment": "Gas-spring supported (0° to 60°)",
      "Frame": "Antibacterial powder-coated steel"
    },
    checklist: [
      "Inspect gas-spring piston pressure and release handle.",
      "Check high-density antibacterial medical fabric for tears or sanitation breaches.",
      "Ensure frame leveling feet are adjusted correctly to eliminate rocking.",
      "Check all locking joint bolts."
    ],
    calibrationInterval: "12 Months",
    riskCategory: "Low-Medium Risk"
  },
  {
    id: "optium-dc-44",
    name: "DC 44 Specialized Dialysis Chair",
    fullName: "Optium - DC 44",
    brand: "Optium",
    sectors: ["Dialysis"],
    imageText: "DC 44 Chair",
    description: "Compact highly adjustable motorized dialysis chair, optimized for space-restricted renal clinics. Provides outstanding positioning for venipuncture and cannulation.",
    specs: {
      "Footprint": "Minimal space-saving design",
      "Motors": "3 Independent motors",
      "Armrests": "Fully multi-directional adjustable armrests",
      "Comfort": "Visco-elastic pressure point relief pads"
    },
    checklist: [
      "Test full 3D range of movement of arterial/venous arm supports.",
      "Verify independent operation of backrest and footrest motors.",
      "Check mechanical integrity of locking pins on the base.",
      "Inspect vinyl upholstery for compatibility with hospital chemical disinfectants."
    ],
    calibrationInterval: "12 Months",
    riskCategory: "Medium Risk / Patient Support"
  },
  {
    id: "optium-unicart-emergency",
    name: "UNICART EMERGENCY Cart",
    fullName: "Optium - UNICART EMERGENCY",
    brand: "Optium",
    sectors: ["Dialysis"],
    imageText: "UNICART Cart",
    description: "Advanced emergency crash cart with heavy-duty castors, break-away security lock, IV pole, defibrillator shelf, and integrated oxygen tank holder.",
    specs: {
      "Drawers": "5 Polymer drawers with customizable dividers",
      "Defibrillator Platform": "360° swivel platform with straps",
      "Security": "Central keyless breakaway lock bar",
      "Accessories": "Oxygen cylinder bracket, cardiac board, IV pole"
    },
    checklist: [
      "Test operation of the breakaway emergency locking system.",
      "Verify drawers self-closing and bearing slide smooth operation.",
      "Inspect stability of the swivel defibrillator platform.",
      "Verify secure mounting of the oxygen cylinder bracket."
    ],
    calibrationInterval: "12 Months",
    riskCategory: "Medium Risk / Emergency Supply"
  },
  {
    id: "optium-ut-26",
    name: "UT 26 Utility Table",
    fullName: "Optium - UT 26",
    brand: "Optium",
    sectors: ["Dialysis"],
    imageText: "UT 26 Table",
    description: "Medical utility and instrument table with stainless steel trays, silent double-ball-bearing castors, and fluid-retention raised edges.",
    specs: {
      "Material": "AISI 304 Stainless Steel throughout",
      "Shelves": "2 Flat shelves with 3-sided guard rails",
      "Castors": "100 mm non-marking, 2 with brakes",
      "Load capacity": "60 kg per shelf"
    },
    checklist: [
      "Verify weld joints are free from corrosion or cracking.",
      "Test castors for quiet rolling and firm braking action.",
      "Ensure grounding strap/chain is properly positioned for static dissipation.",
      "Examine surface finishes for compliance with sterilization standards."
    ],
    calibrationInterval: "12 Months",
    riskCategory: "Low Risk"
  },
  {
    id: "optium-crib-1",
    name: "CRIB 1 Standard Pediatric Bed",
    fullName: "Optium - CRIB 1",
    brand: "Optium",
    sectors: ["IN-Patient"],
    imageText: "CRIB 1",
    description: "Classic medical-grade infant crib with high vertical safety bars, height-adjustable platform, and side-drop mechanics with a secure two-hand safety release.",
    specs: {
      "Material": "Epoxy coated carbon steel framework",
      "Safety distance": "60 mm spacing between vertical bars",
      "Drop sides": "Double sided sliding mechanisms",
      "Mattress": "Waterproof fire-retardant crib mattress"
    },
    checklist: [
      "Perform pull-force testing on side-drop slide rail guides.",
      "Confirm absolute lock of the drop side in both maximum and minimum height levels.",
      "Verify spacing between vertical safety bars conforms to infant safety standards (60mm max).",
      "Verify castors lock firmly to prevent crib movement."
    ],
    calibrationInterval: "12 Months",
    riskCategory: "Medium Risk"
  },
  {
    id: "optium-crib-2",
    name: "CRIB 2 Advanced Pediatric Crib",
    fullName: "Optium - CRIB 2",
    brand: "Optium",
    sectors: ["IN-Patient"],
    imageText: "CRIB 2",
    description: "Advanced pediatric and infant ICU crib with hydraulic height adjustment, gas-spring trendelenburg tilt, and integrated clear acrylic headboard panels.",
    specs: {
      "Height Adjustment": "Hydraulic foot pedal (600 mm to 900 mm)",
      "Trendelenburg": "Gas-assisted tilt angle (0° to 12°)",
      "Panel construction": "Lexan transparent impact-resistant polymers",
      "Braking": "Centralized mechanical locking"
    },
    checklist: [
      "Verify hydraulic cylinder operation for leakage or vertical drift over 24 hours.",
      "Test gas-spring locking and release mechanism for smooth tilt.",
      "Examine transparent acrylic panels for cracks, stressing, or hazing.",
      "Check integrity of the central braking mechanism."
    ],
    calibrationInterval: "6 Months",
    riskCategory: "Medium-High Risk"
  },

  // ==================== AXCENT MEDICAL BRAND ====================
  {
    id: "axcent-cetus-x12",
    name: "Cetus X12 Patient Monitor",
    fullName: "Axcent - CETUS X12",
    brand: "Axcent",
    sectors: ["ICU", "OR", "ER", "Dialysis", "Ambulance"],
    imageText: "Cetus X12 Monitor",
    description: "High-performance multi-parameter patient monitor featuring a 12.1-inch color touchscreen display. Designed for continuous clinical monitoring of ECG, SpO2, NIBP, Respiration, Temp, and optional EtCO2/IBP.",
    specs: {
      "Screen Size": "12.1 inch LED Touchscreen",
      "Parameters": "3/5-Lead ECG, SpO2, NIBP, Dual Temp, Resp",
      "Network Protocol": "HL7 integration via RJ45 or Wi-Fi",
      "Battery Life": "Up to 4 hours continuous monitoring",
      "Trending Storage": "168 hours of graphical and tabular trends"
    },
    checklist: [
      "Perform simulator calibration for ECG rate (60, 120, 180 bpm) and waveform accuracy.",
      "Verify SpO2 oxygen saturation percentage tracking using patient simulator.",
      "Test NIBP overpressure relief valve and check cuff pressure accuracy.",
      "Conduct electrical safety test: patient leakage current (< 10 µA)."
    ],
    calibrationInterval: "6 Months",
    riskCategory: "High Risk / Patient Monitoring"
  },
  {
    id: "axcent-cetus-x15",
    name: "Cetus X15 High-End Monitor",
    fullName: "Axcent - CETUS X15",
    brand: "Axcent",
    sectors: ["ICU", "OR", "Dialysis"],
    imageText: "Cetus X15 Monitor",
    description: "Elite modular multi-parameter bedside monitor with a 15-inch high-definition display. Supports advanced modules including 12-lead ECG, cardiac output (C.O.), BIS, and Multi-Gas/Anesthesia monitoring.",
    specs: {
      "Screen Size": "15-inch HD full-angle touchscreen",
      "Modular Slots": "4 hot-swappable module chambers",
      "Advanced Stats": "ST segment analysis, arrhythmia detection, drug calculations",
      "Connectivity": "HDMI output, USB port, nurse call interface"
    },
    checklist: [
      "Verify absolute modular chamber connection stability and hot-plug identification.",
      "Calibrate invasive blood pressure (IBP) channel transducers to 0 and 200 mmHg.",
      "Verify Carbon Dioxide (EtCO2) mainstream sensor calibration using standard gas canister.",
      "Test alarm sound pressure levels and visual warning indicators."
    ],
    calibrationInterval: "6 Months",
    riskCategory: "High Risk / Life Support Monitoring"
  },
  {
    id: "axcent-lyra-x1",
    name: "Lyra X1 Intensive Care Ventilator",
    fullName: "Axcent - LYRA X1",
    brand: "Axcent",
    sectors: ["ICU"],
    imageText: "Lyra X1 Ventilator",
    description: "Premium turbine-driven clinical ventilator designed for adult, pediatric, and neonatal patients. Supports invasive and non-invasive ventilation (NIV) modes with high-flow oxygen therapy.",
    specs: {
      "Ventilation Modes": "VCV, PCV, PRVC, SIMV, PSV, CPAP, BiPAP",
      "Tidal Volume Range": "2 ml to 2000 ml",
      "Oxygen Concentration": "21% to 100% electronic control",
      "Max Inspiratory Flow": "180 L/min turbine output"
    },
    checklist: [
      "Perform oxygen sensor calibration and verify FiO2 response curves.",
      "Examine expiratory valve membrane and integrate ultrasonic flow sensor calibration.",
      "Perform full-circuit pressure leak test and compliance test.",
      "Validate high/low airway pressure alarm, apnea alarm, and power failure safety valve."
    ],
    calibrationInterval: "6 Months",
    riskCategory: "High Risk / Life Support"
  },
  {
    id: "axcent-lyra-x2",
    name: "Lyra X2 Dual-Screen Ventilator",
    fullName: "Axcent - LYRA X2",
    brand: "Axcent",
    sectors: ["ICU"],
    imageText: "Lyra X2 Ventilator",
    description: "Advanced dual-screen high-acuity respiratory work station, featuring advanced ventilation tools (recruitment maneuvers, tool-P/V curve, and esophageal pressure monitoring).",
    specs: {
      "Screen System": "Dual 15-inch display (Monitoring & Control)",
      "Parameters": "Direct compliance & resistance loops, work of breathing",
      "Gas Supply": "Turbine driven (no central gas needed for air)"
    },
    checklist: [
      "Check auxiliary pressure sensors and esophageal catheter interface.",
      "Calibrate flow sensors and test gas blender mixing ratio accuracy.",
      "Verify automatic backup gas swap triggers (Air to O2).",
      "Conduct electrical safety testing according to IEC 62353."
    ],
    calibrationInterval: "6 Months",
    riskCategory: "High Risk / Life Support"
  },
  {
    id: "axcent-pavo",
    name: "Pavo Syringe Pump",
    fullName: "Axcent - PAVO",
    brand: "Axcent",
    sectors: ["ICU", "OR", "ER", "IN-Patient", "Dialysis", "Clinics", "Ambulance"],
    imageText: "Pavo Syringe Pump",
    description: "Smart precision syringe infusion pump featuring an intuitive color touchscreen, comprehensive drug library, and advanced occlusion detection. Compatible with standard syringes (5ml to 60ml).",
    specs: {
      "Flow Rate Accuracy": "±2% mechanical precision",
      "Flow Rate Range": "0.1 ml/h to 2000 ml/h",
      "Syringe Compatibility": "5ml, 10ml, 20ml, 30ml, 50/60ml auto-sensing",
      "Occlusion Levels": "12 levels adjustable (up to 120 kPa)"
    },
    checklist: [
      "Perform volumetric accuracy testing using a graduated cylinder or analytical balance.",
      "Calibrate the syringe size automatic recognition sensor.",
      "Verify the occlusion alarm pressure threshold using an inline pressure gauge.",
      "Verify near-empty and end-of-infusion audible and visual alarms."
    ],
    calibrationInterval: "12 Months",
    riskCategory: "High Risk / Drug Delivery"
  },
  {
    id: "axcent-apus-x1",
    name: "Apus X1 Anesthesia Workstation",
    fullName: "Axcent - APUS X1",
    brand: "Axcent",
    sectors: ["OR"],
    imageText: "Apus X1 Anesthesia",
    description: "Compact ergonomic anesthesia machine, featuring mechanical flowmeters, integrated patient ventilator, and highly efficient CO2 absorber system.",
    specs: {
      "Ventilator Mode": "IPPV, PCV, Manual",
      "Absorber Capacity": "1.5 Liter carbon dioxide canister",
      "Vaporizer Mounts": "Single Selectatec mount",
      "Gas Mix": "O2, N2O, Air mechanical rotameters"
    },
    checklist: [
      "Conduct low-pressure leak test on the machine flow circuit.",
      "Test oxygen ratio controller (Link-25 system) to prevent hypoxic gas mixture (<25% O2).",
      "Verify vaporizers output concentration calibration using an agent analyzer.",
      "Check expiration of carbon dioxide soda lime granules."
    ],
    calibrationInterval: "6 Months",
    riskCategory: "High Risk / Life Support"
  },
  {
    id: "axcent-apus-x2",
    name: "Apus X2 Integrated Anesthesia System",
    fullName: "Axcent - APUS X2",
    brand: "Axcent",
    sectors: ["OR"],
    imageText: "Apus X2 Anesthesia",
    description: "Advanced clinical anesthesia system with electronic gas blending, a 10.4-inch ventilator touchscreen, and integrated breathing system with heating.",
    specs: {
      "Gas Blending": "Electronic gas mixer (O2, N2O, Air)",
      "Ventilation Modes": "VCV, PCV, SIMV, PSV, Manual",
      "Vaporizers": "Dual Selectatec mounts with interlock",
      "Heating": "Integrated circle system heating to prevent condensation"
    },
    checklist: [
      "Calibrate electronic gas flow valves and verify flow display accuracy.",
      "Test electronic anesthesia vapor interlock mechanism.",
      "Inspect circular heating module to verify stable target temp (~35°C).",
      "Verify functionality of anesthetic gas scavenging system (AGSS)."
    ],
    calibrationInterval: "6 Months",
    riskCategory: "High Risk / Life Support"
  },
  {
    id: "axcent-apus-x3",
    name: "Apus X3 High-End Anesthesia Workstation",
    fullName: "Axcent - APUS X3",
    brand: "Axcent",
    sectors: ["OR"],
    imageText: "Apus X3 Anesthesia",
    description: "The flagship anesthesia system with electronic gas dosing, real-time agent monitoring, advanced lung protection ventilation modes, and cardiac output calculations.",
    specs: {
      "Display": "12.1-inch color TFT touchscreen",
      "Agent Gas Monitor": "Automatic identifying agent sensor (Halothane, Iso, Sevo, Des)",
      "Vent Modes": "PRVC, SIMV-VG, CPAP/PS, Advanced protective ventilation",
      "Scavenging": "Active closed loop AGSS"
    },
    checklist: [
      "Calibrate the multi-gas agent analyzer module with standard reference calibration gas.",
      "Validate high-frequency ventilation protection limiters.",
      "Confirm absolute lock function of dual Selectatec vaporizers.",
      "Perform electrical safety leakage test on auxiliary power sockets."
    ],
    calibrationInterval: "6 Months",
    riskCategory: "High Risk / Critical Life Support"
  },
  {
    id: "axcent-musca-x1",
    name: "Musca X1 Transport Monitor",
    fullName: "Axcent - MUSCA X1",
    brand: "Axcent",
    sectors: ["Ambulance"],
    imageText: "Musca X1 Monitor",
    description: "Compact, ultra-durable, battery-powered patient monitor designed specifically for dynamic emergency transport, helicopter rescue, and ambulance use.",
    specs: {
      "Screen": "8.4 inch high-brightness LCD",
      "Protection": "IPX4 water splash resistant, shockproof case",
      "Battery": "Up to 6 hours operating capacity",
      "Weight": "Under 2.5 kg"
    },
    checklist: [
      "Verify enclosure integrity, shock absorbers, and water-resistance seals.",
      "Check 12V DC vehicle ambulance power charging adapter.",
      "Calibrate SpO2 and ECG simulators.",
      "Perform battery capacity test to ensure 6-hour runtime is maintained."
    ],
    calibrationInterval: "6 Months",
    riskCategory: "Medium-High Risk"
  },
  {
    id: "axcent-musca-x2",
    name: "Musca X2 Advanced Defibrillator/Monitor",
    fullName: "Axcent - MUSCA X2",
    brand: "Axcent",
    sectors: ["Ambulance"],
    imageText: "Musca X2 Defib",
    description: "Professional biphasic defibrillator and monitor, offering manual shock delivery, AED mode, external transcutaneous pacing, and multi-parameter diagnostic monitoring.",
    specs: {
      "Waveform": "Biphasic Truncated Exponential (BTE)",
      "Energy Range": "1 Joule to 360 Joules select levels",
      "Pacing Mode": "Demand and Fixed pacing (10 mA to 200 mA)",
      "Charge Time": "Less than 5 seconds to maximum energy"
    },
    checklist: [
      "Perform energy discharge test using a certified defibrillator analyzer at 10J, 50J, 100J, 200J, 360J.",
      "Check pacing pulse rate and current output accuracy.",
      "Inspect high-voltage paddles and shock-pads cables for insulation breakdown.",
      "Test AED prompt software and voice commands."
    ],
    calibrationInterval: "6 Months",
    riskCategory: "High Risk / Life Support"
  },

  // ==================== AUG MEDICAL BRAND ====================
  {
    id: "aug-laryngoscope-fiber-optic",
    name: "Laryngoscope Fiber Optic",
    fullName: "AUG - LARYNGOSCOPE Fiber Optic",
    brand: "AUG",
    sectors: ["ICU", "OR", "ER", "Ambulance"],
    imageText: "Fiber Optic Laryngoscope",
    description: "Standard clinical fiber optic laryngoscope kit featuring durable stainless steel Macintosh/Miller blades. Delivers cool, high-intensity Xenon/LED illumination for reliable intubation.",
    specs: {
      "Light Source": "Xenon / LED in-handle light source",
      "Blade Material": "AISI 304 anti-glare stainless steel",
      "Fiber Core": "4 mm diameter premium glass fibers",
      "Power": "Dual C-size batteries or rechargeable lithium cells"
    },
    checklist: [
      "Inspect optical glass fiber tips for fractures or severe light loss.",
      "Check lock joint connection for quick blade engagement and solid locking.",
      "Measure light output intensity using an optical lux meter (> 3000 Lux).",
      "Verify battery contact tension and inspect for chemical corrosion."
    ],
    calibrationInterval: "12 Months",
    riskCategory: "Medium Risk / Intubation Device"
  },
  {
    id: "aug-laryngoscope-fiber-optic-mri",
    name: "Laryngoscope Fiber Optic MRI",
    fullName: "AUG - LARYNGOSCOPE Fiber Optic MRI",
    brand: "AUG",
    sectors: ["OR", "ER"],
    imageText: "MRI Laryngoscope",
    description: "Specialized non-magnetic laryngoscope system designed specifically for safe use in high magnetic field MRI suites. Constructed from non-ferrous alloys to prevent projectile hazards.",
    specs: {
      "Compatibility": "Certified for MRI suites up to 3.0 Tesla",
      "Material": "Non-magnetic cobalt-chromium and special alloys",
      "Battery Type": "Non-ferrous special gold-plated batteries",
      "Blades": "Macintosh size 1 to 4 available"
    },
    checklist: [
      "Perform non-ferrous validation testing to ensure no magnetic pull is present.",
      "Inspect gold-plated electrical contacts for wear.",
      "Clean and polish optical tips to maximize light output.",
      "Confirm absolute lock stability of the blade-handle interface."
    ],
    calibrationInterval: "12 Months",
    riskCategory: "Medium-High Risk / Specialty Care"
  },
  {
    id: "aug-videolaryngoscope-disposable",
    name: "VideoLARYNGOSCOPE Disposable",
    fullName: "AUG - VideoLARYNGOSCOPE Disposable",
    brand: "AUG",
    sectors: ["ICU", "OR", "Ambulance"],
    imageText: "Disposable VideoLaryngoscope",
    description: "Digital video laryngoscope with color display and single-use disposable blades to prevent cross-contamination. Excellent tool for difficult airway management and teaching.",
    specs: {
      "Display": "3.5-inch high-resolution color tilt monitor",
      "Camera Sensor": "High-definition CMOS with anti-fog lens",
      "Recording": "MicroSD slot for photo and video capture",
      "Blades": "Sterile disposable blades sizes 1 to 5"
    },
    checklist: [
      "Check camera feed for pixel defects, correct colors, and anti-fog heater activation.",
      "Verify full range of tilt and lock of the high-res monitor display.",
      "Inspect battery charging cycle and USB data export functions.",
      "Verify mechanical click-lock mounting of disposable blades."
    ],
    calibrationInterval: "6 Months",
    riskCategory: "Medium-High Risk / Diagnostic"
  },
  {
    id: "aug-videolaryngoscope-reusable",
    name: "VideoLARYNGOSCOPE Reusable",
    fullName: "AUG - VideoLARYNGOSCOPE Reusable",
    brand: "AUG",
    sectors: ["ICU", "OR", "Ambulance"],
    imageText: "Reusable VideoLaryngoscope",
    description: "Premium digital video laryngoscope designed with durable, autoclavable reusable blades and high-end camera optics for long-lasting medical service.",
    specs: {
      "Blades": "Autoclavable grade titanium alloy blades",
      "Resolution": "1280 x 720 pixels HD camera",
      "Disinfection": "Fully submersible waterproof design (IPX7)",
      "Battery": "High-capacity internal rechargeable lithium polymer"
    },
    checklist: [
      "Verify waterproof seal integrity (IPX7 submersible validation).",
      "Calibrate color rendering and camera white balance.",
      "Test heating element on lens tip to ensure instant anti-fog performance.",
      "Perform electronic insulation resistance test."
    ],
    calibrationInterval: "6 Months",
    riskCategory: "Medium-High Risk / Intubation Device"
  },

  // ==================== ABN MEDICAL BRAND ====================
  {
    id: "abn-regal-mobile",
    name: "Regal Mobile Sphygmomanometer",
    fullName: "ABN - Regal Mobile",
    brand: "ABN",
    sectors: ["ICU", "ER", "IN-Patient", "Dialysis", "Clinics"],
    imageText: "Mobile Sphyg",
    description: "Heavy-duty aneroid sphygmomanometer mounted on a stable 5-caster height-adjustable mobile stand. Features a large, easy-to-read square clock face dial and coiled latex-free tubing.",
    specs: {
      "Pressure Range": "0 to 300 mmHg manometer dial",
      "Dial Diameter": "150 mm square face",
      "Stand Adjustment": "850 mm to 1250 mm height range",
      "Cuff Size": "Adult size nylon cuff with latex-free bladder"
    },
    checklist: [
      "Calibrate manometer pressure accuracy against a certified mercury or digital reference calibrator.",
      "Verify zero-point return of the needle when fully depressurized.",
      "Perform pressure leak test: cuff must lose < 3 mmHg per minute at 150 mmHg.",
      "Check height-locking clutch and castor rolling mechanism."
    ],
    calibrationInterval: "12 Months",
    riskCategory: "Low-Medium Risk / Clinical Diagnostic"
  },
  {
    id: "abn-regal-wall",
    name: "Regal Wall Sphygmomanometer",
    fullName: "ABN - Regal Wall",
    brand: "ABN",
    sectors: ["ER", "Ambulance"],
    imageText: "Wall Sphyg",
    description: "Wall-mounted premium clinical aneroid sphygmomanometer with swiveling wall bracket, coiled extension tube, and built-in nylon cuff storage basket.",
    specs: {
      "Mounting": "180° horizontal swivel wall bracket",
      "Accuracy": "±3 mmHg tolerance limit",
      "Hose Length": "Coiled tubing extending up to 2.5 meters",
      "Basket": "Impact resistant ABS storage basket"
    },
    checklist: [
      "Test wall bracket mounting anchors and swivel range tension.",
      "Calibrate pressure dial using standard reference pressure gauge.",
      "Inspect coiled tube and bulb valve for cracks, dry-rot, or leakage.",
      "Confirm easy-release air valve action."
    ],
    calibrationInterval: "12 Months",
    riskCategory: "Low-Medium Risk"
  },
  {
    id: "abn-regal-disk",
    name: "Regal Desk Sphygmomanometer",
    fullName: "ABN - Regal Disk",
    brand: "ABN",
    sectors: ["Clinics", "Ambulance"],
    imageText: "Desk Sphyg",
    description: "Premium desk-top model aneroid blood pressure monitor, utilizing a stable weighted non-slip base, integrated carrying handle, and durable pressure dial.",
    specs: {
      "Design": "Self-standing desktop configuration",
      "Accuracy": "±3 mmHg across scale",
      "Cuff Type": "Durable nylon velcro cuff",
      "Valve": "Chrome-plated brass deflation valve"
    },
    checklist: [
      "Examine desk weighted base rubber padding to prevent slippage.",
      "Perform calibration check against master clinical gauge.",
      "Inspect nylon velcro cuff adhesive fibers for wear.",
      "Perform standard system leak test."
    ],
    calibrationInterval: "12 Months",
    riskCategory: "Low-Medium Risk"
  },

  // ==================== KONTED BRAND ====================
  {
    id: "konted-c10cw",
    name: "C10CW Wireless Ultrasound",
    fullName: "Konted - C10CW",
    brand: "Konted",
    sectors: ["Clinics"],
    imageText: "Wireless Ultrasound C10CW",
    description: "Pocket-sized wireless color Doppler ultrasound scanner transducer, supporting connection with iOS/Android tablets and Windows PCs. Ideal for fast bedside diagnosis and point-of-care ultrasound (POCUS).",
    specs: {
      "Probe Type": "Convex & Linear combination array",
      "Frequency": "3.5 / 5.0 MHz (Convex), 7.5 / 10 MHz (Linear)",
      "Channels": "128 elements standard",
      "Transmission": "Built-in Wi-Fi 802.11ac, up to 15m range",
      "Battery Life": "3 hours active scanning"
    },
    checklist: [
      "Perform image quality testing using an ultrasound tissue-equivalent phantom.",
      "Verify wireless connection stability and frame rate transfer under load.",
      "Check transducer surface array for acoustic lens cracks, cuts, or air bubbles.",
      "Perform electrical safety leakage test during inductive wireless charging."
    ],
    calibrationInterval: "12 Months",
    riskCategory: "Medium Risk / Diagnostic Ultrasound"
  },
  {
    id: "konted-c10rl",
    name: "C10RL Wireless Linear Transducer",
    fullName: "Konted - C10RL",
    brand: "Konted",
    sectors: [],
    imageText: "Linear Ultrasound C10RL",
    description: "Advanced wireless high-frequency linear ultrasound probe, designed for vascular access, musculoskeletal (MSK), nerve blocks, and superficial tissue imaging.",
    specs: {
      "Frequency": "7.5 MHz to 14.0 MHz multi-frequency",
      "Element Count": "192 premium micro-elements",
      "Scan Depth": "20 mm to 100 mm",
      "Software features": "Needle guide software, auto-measurement presets"
    },
    checklist: [
      "Inspect acoustic lens face for damage or polymer detachment.",
      "Calibrate spatial accuracy of needle guide overlay using phantom.",
      "Verify internal battery health and continuous charge cycle.",
      "Perform software connectivity tests."
    ],
    calibrationInterval: "12 Months",
    riskCategory: "Medium Risk / Diagnostic"
  },
  {
    id: "konted-c10tx",
    name: "C10TX Tri-headed Wireless Scanner",
    fullName: "Konted - C10TX",
    brand: "Konted",
    sectors: [],
    imageText: "Tri-headed Ultrasound",
    description: "Innovative three-in-one wireless ultrasound scanner featuring Convex, Linear, and Phased Array transducer faces in a single hand-held device. Perfect for whole-body POCUS scans.",
    specs: {
      "Probe Arrays": "Convex, Linear, Phased Array",
      "Display mode": "B, M, Color, PDI, PW",
      "Charging": "Qi wireless fast charging support",
      "OS compatibility": "iOS, Android, Windows"
    },
    checklist: [
      "Test all three transducer faces (Convex, Linear, Phased Array) on tissue phantom.",
      "Verify phased array sector calibration for cardiac flow assessments.",
      "Test continuous scanning temperature rise (must not exceed 41°C).",
      "Validate wireless channel scanning to prevent RF interference."
    ],
    calibrationInterval: "6 Months",
    riskCategory: "Medium-High Risk / Diagnostic"
  },
  {
    id: "konted-c10xl",
    name: "C10XL High-Resolution Linear Probe",
    fullName: "Konted - C10XL",
    brand: "Konted",
    sectors: [],
    imageText: "C10XL Linear",
    description: "Premium high-resolution 192-element wireless linear probe, specifically optimized for shallow-structure imaging, breast exam, thyroid evaluation, and pediatrics.",
    specs: {
      "Frequency Range": "10.0 MHz to 15.0 MHz",
      "Scan Width": "40 mm footprint",
      "Elements": "192 dense elements",
      "Modes": "B, Color Doppler, Power Doppler"
    },
    checklist: [
      "Check geometric distortion on shallow-depth resolution phantom.",
      "Examine housing seal to verify IPX8 fluid rating.",
      "Verify charging pad magnetic coupling efficiency.",
      "Examine WiFi stream for frame drops."
    ],
    calibrationInterval: "12 Months",
    riskCategory: "Medium Risk"
  },

  // ==================== ITC MEDICAL BRAND ====================
  {
    id: "itc-oxygen-cylinder-regulator",
    name: "Oxygen Cylinder Regulator with Outlet",
    fullName: "ITC - OXYGEN CYLINDER REGULATOR WITH OUTLET",
    brand: "ITC",
    sectors: ["Medical Gases"],
    imageText: "O2 Cylinder Regulator",
    description: "Heavy-duty brass chrome-plated high-pressure oxygen regulator, featuring an integrated dial pressure gauge, a preset safety relief valve, and a standard medical gas outlet hookup.",
    specs: {
      "Inlet Connection": "Bullnose BS 341-3 / DIN 477-9",
      "Inlet Pressure Capacity": "Up to 200 bar (20,000 kPa)",
      "Preset Output Pressure": "4.2 bar (420 kPa) regulated output",
      "Body Material": "Forged brass body with chrome finish",
      "Safety Valve": "Cracking pressure at 6.0 bar auto relief"
    },
    checklist: [
      "Perform high-pressure leak testing using a non-corrosive gas detector spray.",
      "Calibrate high-pressure input gauge against a certified master reference gauge.",
      "Verify the output dynamic pressure regulation maintains 4.2 ± 0.2 bar under varying flow.",
      "Inspect inlet sinter filter for particulate contamination or copper oxidation."
    ],
    calibrationInterval: "12 Months",
    riskCategory: "High Risk / High Pressure Gas"
  },
  {
    id: "itc-oxygen-flowmeter-ball",
    name: "Oxygen Flowmeter Ball Type",
    fullName: "ITC - OXYGEN FLOWMETER Ball",
    brand: "ITC",
    sectors: ["Medical Gases"],
    imageText: "Ball Flowmeter",
    description: "Classic Thorpe-tube type oxygen flowmeter with floating steel ball indicator, polycarbonate inner and outer tubes, and precise needle control valve.",
    specs: {
      "Flow Range": "0 to 15 Liters per minute (Lpm)",
      "Operating Pressure": "4.2 bar standard inlet",
      "Material": "Polycarbonate break-resistant flow tubes",
      "Float": "High-precision spherical stainless steel ball"
    },
    checklist: [
      "Verify flow rate calibration at 2, 5, 10, and 15 Lpm using an electronic gas flow analyzer.",
      "Inspect flow tube verticality (slight angles alter ball buoyancy readings).",
      "Check needle control valve thread wear and verify zero-flow absolute sealing.",
      "Check polycarbonate tube for hair-line cracks due to chemical solvents."
    ],
    calibrationInterval: "12 Months",
    riskCategory: "Medium-High Risk"
  },
  {
    id: "itc-oxygen-flowmeter-digital",
    name: "Oxygen Flowmeter Digital",
    fullName: "ITC - OXYGEN FLOWMETER Digital",
    brand: "ITC",
    sectors: ["Medical Gases"],
    imageText: "Digital Flowmeter",
    description: "State-of-the-art electronic digital oxygen flowmeter providing highly accurate flow measurement, digital backlit display, flow alarms, and wireless telemetry integration.",
    specs: {
      "Flow Range": "0.1 to 30.0 Lpm with 0.1 resolution",
      "Sensor Technology": "Thermal mass-flow micro-sensors",
      "Accuracy": "± 1.5% of reading",
      "Alarms": "High/Low flow alert, gas type mismatch warning"
    },
    checklist: [
      "Calibrate thermal mass sensor against certified high-precision reference standard.",
      "Test digital display backlighting and low-battery warning limits.",
      "Verify response time of flow limit alarm relays.",
      "Confirm wireless telemetry flow rate broadcast is aligned with physical unit screen."
    ],
    calibrationInterval: "6 Months",
    riskCategory: "High Risk / Digital Life Support"
  },
  {
    id: "itc-pin-index-regulator",
    name: "Pin-Index Oxygen Regulator",
    fullName: "ITC - PIN-INDEX REGULATOR",
    brand: "ITC",
    sectors: ["Medical Gases"],
    imageText: "Pin-Index Regulator",
    description: "Compact click-style medical gas regulator employing the pin-index safety system (PISS), designed for portable cylinders used in patient transport and emergency services.",
    specs: {
      "Connection": "Pin-Index yoke connection (O2 Pin 2-5 configuration)",
      "Flow Control": "Rotary click selector with 12 flow settings",
      "Flow settings": "0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10, 15 Lpm",
      "Body": "Anodized lightweight aluminum shell with brass core"
    },
    checklist: [
      "Verify the exact alignment and integrity of indexing safety pins (PISS).",
      "Inspect index sealing gasket (Bodok seal) for wear, degradation, or grease contamination.",
      "Check calibration of click-stop flow levels using a gas flow meter.",
      "Inspect safety relief blowout disc."
    ],
    calibrationInterval: "12 Months",
    riskCategory: "High Risk / Portable Gas Supply"
  },
  {
    id: "itc-suction-regulator",
    name: "Suction Regulator Wall Mounted",
    fullName: "ITC - SUCTION REGULATOR",
    brand: "ITC",
    sectors: ["Medical Gases"],
    imageText: "Suction Regulator",
    description: "Continuous suction regulator for medical vacuum systems, featuring a broad dial gauge, REG/OFF/MAX modes, and an integrated safety overflow filter trap.",
    specs: {
      "Vacuum Range": "0 to -100 kPa (0 to -760 mmHg)",
      "Control Valve": "Quick-turn adjustment needle valve",
      "Safety": "Overpressure relief valve, integrated liquid barrier filter",
      "Modes": "Continuous, intermittent options"
    },
    checklist: [
      "Calibrate vacuum manometer gauge accuracy at intervals down to -80 kPa.",
      "Inspect secondary hydrophobic filter elements for saturation or biological blockage.",
      "Test REG/OFF/MAX control toggle action and response times.",
      "Verify suction flow rate capability (> 40 Lpm open flow)."
    ],
    calibrationInterval: "12 Months",
    riskCategory: "Medium-High Risk / Suction Support"
  },

  // ==================== SPENCER BRAND ====================
  {
    id: "spencer-board-st02140",
    name: "ST02140 Spine Board",
    fullName: "Spencer - Board Spencer ST02140",
    brand: "Spencer",
    sectors: ["Ambulance"],
    imageText: "ST02140 Spine Board",
    description: "Ultra-thin high-density polyethylene spine board designed for immobilizing patients during emergency spinal trauma recovery. X-ray radiolucent and fully flotation compatible.",
    specs: {
      "Material": "Single-piece HDPE polymer structure",
      "Weight Capacity": "180 kg safe load limit",
      "Radiolucency": "100% MRI, CT, and X-ray transparent",
      "Handles": "14 contoured non-slip handle openings"
    },
    checklist: [
      "Inspect spine board surface for micro-fractures, deep scoring, or chemical warping.",
      "Verify the structural rigidity of pins and speed-clip strap attachment points.",
      "Check floating capacity seal integrity for open-water rescue applications.",
      "Clean surface using medical-grade surface sanitizers."
    ],
    calibrationInterval: "12 Months",
    riskCategory: "Medium Risk / Immobilization"
  },
  {
    id: "spencer-chair-425",
    name: "Spencer 425 Evacuation Chair",
    fullName: "Spencer - Chair Spencer 425",
    brand: "Spencer",
    sectors: ["Ambulance"],
    imageText: "Spencer 425 Chair",
    description: "Folding evacuation and transport stair chair featuring high-traction sliding tracks for controlled, smooth descents down staircases, with heavy-duty safety harness.",
    specs: {
      "Tracks": "Self-braking high-grip elastomer stair tracks",
      "Folded thickness": "220 mm space-saving profile",
      "Load Limit": "150 kg operating capacity",
      "Harness": "Triple quick-release webbing straps"
    },
    checklist: [
      "Inspect stair descent track tension and ensure elastomer treads are not cracked or worn.",
      "Verify locking hinges unfold completely and lock firmly into the chair configuration.",
      "Inspect front and rear swivel wheels and brake pads for firm locking.",
      "Check patient safety strap buckle engagement tension."
    ],
    calibrationInterval: "12 Months",
    riskCategory: "Medium Risk / Evacuation"
  },
  {
    id: "spencer-portable-suction-ambujet-1000",
    name: "Ambujet 1000 Portable Suction",
    fullName: "Spencer - Portable Suction Spencer - Ambujet 1000",
    brand: "Spencer",
    sectors: ["Ambulance"],
    imageText: "Ambujet 1000 Suction",
    description: "Highly rugged battery-operated portable medical suction unit, built to military standards for ambulance and field operations. Features a 1000ml canister and smart charging wall mount.",
    specs: {
      "Max Vacuum": "-80 kPa (-800 mbar)",
      "Free Flow Rate": "32 L/min",
      "Canister": "1000 ml autoclavable jar with overflow valve",
      "Battery": "High energy NiMH, 45 minutes runtime, 12V DC charging wall mount"
    },
    checklist: [
      "Test maximum vacuum pull and free air flow rate using testing analyzer.",
      "Verify canister overflow shut-off ball float action under liquid flow.",
      "Check 12V dynamic vehicle wall mount contact pins and auto-charge relay.",
      "Verify battery discharge time under maximum continuous suction load."
    ],
    calibrationInterval: "6 Months",
    riskCategory: "High Risk / Life Support Suction"
  },
  {
    id: "spencer-stretcher-chair-st00024",
    name: "ST00024 Convertible Stretcher Chair",
    fullName: "Spencer - Stretcher chair - ST00024",
    brand: "Spencer",
    sectors: ["Ambulance"],
    imageText: "ST00024 Stretcher Chair",
    description: "Premium convertible transport device that quickly transforms from a full horizontal field stretcher to an upright clinical wheel chair.",
    specs: {
      "Positions": "Stretcher, Semi-Fowler, Upright Chair",
      "Material": "High-strength lightweight anodized aluminum frame",
      "Safe Load Capacity": "170 kg",
      "Upholstery": "Seamless welded fluid-resistant PVC cover"
    },
    checklist: [
      "Test articulation of the multi-position locking gas-spring.",
      "Confirm absolute structural lock in both flat stretcher and upright chair modes.",
      "Verify condition of security harness straps and metal lock buckles.",
      "Examine frame pivots for mechanical play or stress lines."
    ],
    calibrationInterval: "12 Months",
    riskCategory: "Medium Risk"
  },
  {
    id: "spencer-stretcher-175",
    name: "Spencer Stretcher 175kg",
    fullName: "SPENCER - STRETCHER SPENCER 175kg",
    brand: "Spencer",
    sectors: ["Ambulance"],
    imageText: "Spencer 175 Stretcher",
    description: "Durable self-loading ambulance stretcher with progressive load heights, heavy-duty folding legs, and integrated side-guard rails. Engineered for 175 kg patient limit.",
    specs: {
      "Load Limit": "175 kg maximum capacity",
      "Loading Levels": "3 Adjustable levels for easy ambulance transfer",
      "Frame": "High-grade tempered aluminum alloy",
      "Backrest": "Gas-spring supported tilt up to 75°"
    },
    checklist: [
      "Inspect front and rear loading legs self-collapsing mechanical catches.",
      "Verify secure lock into ambulance floor retention system (yoke lock).",
      "Lubricate slide channels and inspect roll-in castors.",
      "Examine gas-spring tilt dampener of the backrest."
    ],
    calibrationInterval: "6 Months",
    riskCategory: "Medium-High Risk / Transport"
  },
  {
    id: "spencer-stretcher-250",
    name: "Spencer Stretcher 250kg",
    fullName: "SPENCER - STRETCHER SPENCER 250kg",
    brand: "Spencer",
    sectors: ["Ambulance"],
    imageText: "Spencer 250 Stretcher",
    description: "Heavy-duty bariatric ambulance stretcher rated for up to 250 kg loads. Features broad profile wheels, reinforced scissor frame, and high-stability hydraulic dampers.",
    specs: {
      "Load Limit": "250 kg bariatric capacity",
      "Chassis": "Scissor lift reinforced structural tubular frame",
      "Wheels": "Large 200 mm shock-absorbent tires",
      "Rails": "Full-length folding protection bars"
    },
    checklist: [
      "Conduct structural load check of the primary frame pivot bolts.",
      "Inspect hydraulic assist shock dampers for oil leaks.",
      "Verify double-safety lock prevents accidental collapsing when loaded.",
      "Test tracking and locking of the heavy-duty large tires."
    ],
    calibrationInterval: "6 Months",
    riskCategory: "High Risk / Bariatric Transport"
  },

  // ==================== GGM BRAND ====================
  {
    id: "ggm-vh-2100",
    name: "VH 2100 Active Humidifier",
    fullName: "GGM - VH 2100",
    brand: "GGM",
    sectors: ["ICU"],
    imageText: "VH 2100 Humidifier",
    description: "Advanced active heated respiratory humidifier designed to warm and humidify breathing gases delivered to patients requiring invasive or non-invasive mechanical ventilation.",
    specs: {
      "Heater Plate": "85W high-density heated surface",
      "Modes": "Invasive (37°C target), Non-Invasive (31°C target)",
      "Protection": "Overheat cutoff sensor at 85°C",
      "Chamber Compatibility": "Standard reusable and disposable clinical chambers"
    },
    checklist: [
      "Test heating plate thermal rise time and verify temperature stabilization at 37°C.",
      "Verify high-temperature alarm triggers and auto shut-off circuit above 85°C.",
      "Inspect electrical heater wire adapter and dual-probe temperature sensor cables.",
      "Check heating plate surface for corrosion or surface irregularities."
    ],
    calibrationInterval: "6 Months",
    riskCategory: "High Risk / Ventilation Accessory"
  },

  // ==================== EKINGST BRAND ====================
  {
    id: "ekingst-capno-h",
    name: "Capno H Handheld Capnograph",
    fullName: "Ekingst - CAPNO H",
    brand: "Ekingst",
    sectors: ["ER", "Ambulance"],
    imageText: "Capno H Handheld",
    description: "Ultra-portable handheld capnograph designed for quick measurement of end-tidal carbon dioxide (EtCO2), respiration rate, and SpO2 in emergency and clinical settings.",
    specs: {
      "Technology": "Sidestream infrared spectroscopy",
      "Range": "0 to 150 mmHg EtCO2",
      "Parameters": "EtCO2, FiCO2, Respiration Rate, SpO2, Pulse",
      "Display": "2.4-inch high-contrast color screen"
    },
    checklist: [
      "Calibrate sidestream CO2 measurement channel using 5.0% standard reference gas.",
      "Inspect sampling line water trap and hydrophobic filter.",
      "Verify internal pump suction rate conforms to specifications (100-150 ml/min).",
      "Perform battery run-time verification."
    ],
    calibrationInterval: "6 Months",
    riskCategory: "High Risk / Clinical Monitoring"
  },
  {
    id: "ekingst-capno-m",
    name: "Capno M Mainstream Capnograph",
    fullName: "Ekingst - CAPNO M",
    brand: "Ekingst",
    sectors: ["ER"],
    imageText: "Capno M Mainstream",
    description: "High-performance mainstream capnography sensor kit, designed for rapid, calibration-free measurement of carbon dioxide in intubated patients.",
    specs: {
      "Sensor Type": "Mainstream infrared solid-state sensor",
      "Response Time": "Under 60 milliseconds",
      "Adapter Type": "Adult/Pediatric airway adapters",
      "Ruggedness": "IP64 dust and splash proof"
    },
    checklist: [
      "Verify mainstream airway adapter sensor channel window cleanliness.",
      "Test mainstream sensor cell auto-zero function on room air.",
      "Validate response output alignment when connected to clinical host monitor.",
      "Check connection cable strain relief boots."
    ],
    calibrationInterval: "6 Months",
    riskCategory: "High Risk / Patient Monitoring"
  },
  {
    id: "ekingst-capno-s",
    name: "Capno S Smart Capnography Module",
    fullName: "Ekingst - CAPNO S",
    brand: "Ekingst",
    sectors: [],
    imageText: "Capno S Smart",
    description: "Compact OEM micro-flow sidestream capnography module, optimized for integration into modern bedside multi-parameter monitors.",
    specs: {
      "Flow Rate": "50 ml/minute micro-flow rate",
      "Calibration": "Automatic electronic self-calibration",
      "Resolution": "0.1 mmHg EtCO2"
    },
    checklist: [
      "Perform electronic self-calibration loop testing.",
      "Verify internal micro-pump diaphragm wear.",
      "Test data link communication protocols with host system simulator.",
      "Inspect hydrophobic fluid block filter."
    ],
    calibrationInterval: "6 Months",
    riskCategory: "Medium-High Risk"
  },
  {
    id: "ekingst-capno-t",
    name: "Capno T Tabletop Monitor",
    fullName: "Ekingst - CAPNO T",
    brand: "Ekingst",
    sectors: [],
    imageText: "Capno T Tabletop",
    description: "Robust tabletop capnograph and pulse oximeter, featuring detailed capnogram waveform display, high-decibel audible alarms, and built-in thermal printer.",
    specs: {
      "Display": "7-inch color TFT",
      "Printer": "Built-in thermal printer",
      "Memory": "720 hours tabular trend review",
      "Power": "100-240V AC and integrated lead-acid battery backup"
    },
    checklist: [
      "Calibrate EtCO2 reading accuracy using certified reference gas cylinder.",
      "Verify thermal print head resolution and paper feed mechanism.",
      "Test audio warning speaker sound pressure levels (> 75 dBA at 1 meter).",
      "Verify battery charging circuit and check for heat emission."
    ],
    calibrationInterval: "6 Months",
    riskCategory: "High Risk / Patient Monitor"
  },

  // ==================== CBM BRAND ====================
  {
    id: "cbm-pin-index-regulator",
    name: "PIN-INDEX Gas Regulator",
    fullName: "CBM - PIN-INDEX REGULATOR",
    brand: "CBM",
    sectors: ["Medical Gases"],
    imageText: "CBM Pin Index",
    description: "Solid brass heavy-duty clinical pin-index regulator, optimized for high-pressure medical oxygen cylinders utilized in resuscitation setups.",
    specs: {
      "Material": "Solid nickel-plated brass body",
      "Standards": "CGA-870 pin-index connection",
      "Gauge": "Luminescent pressure dial, 0-250 bar",
      "Output Connection": "DISS (Diameter Index Safety System) outlet"
    },
    checklist: [
      "Verify indexing safety pins layout conforms strictly to oxygen standard CGA-870.",
      "Check DISS threaded connector for thread damage or metallic shaving deposits.",
      "Perform standard pressure leak decay test over 15 minutes.",
      "Inspect high-pressure nylon washer gasket."
    ],
    calibrationInterval: "12 Months",
    riskCategory: "High Risk / High Pressure Gas"
  },
  {
    id: "cmb-oxygen-cylinder-aluminum",
    name: "Aluminum Oxygen Cylinder",
    fullName: "CMB - OXYGEN CYLINDER ALUMINUM",
    brand: "CBM",
    sectors: ["Medical Gases"],
    imageText: "Aluminum Cylinder",
    description: "Lightweight, corrosion-resistant seamless aluminum alloy compressed medical oxygen cylinder, fitted with high-quality pin-index post valve.",
    specs: {
      "Material": "Aluminum Alloy 6061-T6 seamless construction",
      "Capacity": "4.6 Liter water volume (approx. 680 Liter gas storage)",
      "Pressure Rating": "150 bar (15 MPa) working pressure",
      "Valve Type": "CGA 870 toggle post valve"
    },
    checklist: [
      "Verify cylinder hydrostatic testing expiration date (required every 5 years).",
      "Inspect cylinder exterior for structural dents, deep scratches, or heat exposure discoloration.",
      "Test cylinder post valve toggle handle for smooth, tight shut-off.",
      "Conduct internal moisture and particulate sweep."
    ],
    calibrationInterval: "5 Years (Hydrostatic) / 1 Year (Visual)",
    riskCategory: "High Risk / Pressurized Vessel"
  },

  // ==================== CAMI BRAND ====================
  {
    id: "cami-askir-c30",
    name: "Askir C30 Surgical Aspirator",
    fullName: "CAMI - ASKIR C30 - ICU",
    brand: "CAMI",
    sectors: ["ICU", "OR", "ER", "IN-Patient", "Clinics"],
    imageText: "Askir C30 Suction",
    description: "Professional high-vacuum high-flow surgical suction pump mounted on a mobile stand. Designed for continuous surgical, ward, and ICU suctioning of bodily fluids.",
    specs: {
      "Max Suction Pressure": "-80 kPa (-0.80 bar)",
      "Free Air Flow Rate": "40 Liters per minute (Lpm)",
      "Canisters": "Dual 2-Liter autoclavable polycarbonate jars",
      "Vacuum Control": "Manual infinitely adjustable needle valve",
      "Operation Duty": "Continuous non-stop operational rating"
    },
    checklist: [
      "Verify vacuum gauge accuracy by comparison with standard test vacuum gauge.",
      "Inspect silicone suction tubing and connector ports for elastic deterioration.",
      "Test overflow float shut-off valve within the jar lids under full liquid volume.",
      "Verify performance of the protective antibacterial and hydrophobic filter."
    ],
    calibrationInterval: "12 Months",
    riskCategory: "Medium-High Risk / Surgical Suction"
  },
  {
    id: "cami-hospivac-350",
    name: "Hospivac 350 High-End Suction",
    fullName: "CAMI - HOSPIVAC 350 - ICU",
    brand: "CAMI",
    sectors: ["ICU", "OR", "ER"],
    imageText: "Hospivac 350",
    description: "Advanced heavy-duty surgical aspirator supporting continuous deep-wound aspiration, liposuction, and high-volume operating room suction. Features electronic foot pedal switch and changeover valve.",
    specs: {
      "Max Suction Pressure": "-90 kPa (-0.90 bar)",
      "Free Air Flow Rate": "60 L/min",
      "Canister Capacity": "Two 4-Liter reusable jars with safety valves",
      "Pedal Control": "Pneumatic foot pedal toggle switch",
      "Changeover": "Mechanical flow toggle from Jar A to Jar B"
    },
    checklist: [
      "Measure maximum negative vacuum pressure limit to ensure -90 kPa is achieved.",
      "Verify vacuum leak decay test of the twin-jar changeover valve.",
      "Verify electronic foot-switch pedal waterproof enclosure sealing.",
      "Perform electrical isolation and chassis ground resistance testing."
    ],
    calibrationInterval: "6 Months",
    riskCategory: "High Risk / Surgical Aspiration"
  },
  {
    id: "cami-hospivac-400",
    name: "Hospivac 400 Surgical Aspirator",
    fullName: "CAMI - HOSPIVAC 400",
    brand: "CAMI",
    sectors: [],
    imageText: "Hospivac 400",
    description: "The flagship surgical aspiration system, featuring a powerful dual-pump compressor, oil-free vacuum technology, and an active foot control system.",
    specs: {
      "Max Suction Pressure": "-90 kPa (-0.90 bar)",
      "Free Air Flow Rate": "90 L/min ultra-high flow rate",
      "Compressor": "Double-piston oil-free motor",
      "Casing": "Highly impact resistant shock-proof plastic shell"
    },
    checklist: [
      "Calibrate precision linear vacuum regulator valve.",
      "Verify mechanical function of the double piston oil-free motor.",
      "Verify non-return liquid block safety systems in both jars.",
      "Perform high-voltage chassis breakdown insulation testing."
    ],
    calibrationInterval: "6 Months",
    riskCategory: "High Risk / Surgical Support"
  },
  {
    id: "cami-new-askir-36br",
    name: "New Askir 36BR Portable Suction",
    fullName: "CAMI - New Askir 36BR",
    brand: "CAMI",
    sectors: ["Ambulance"],
    imageText: "Askir 36BR Portable",
    description: "Portable battery-operated desk-top aspirator designed for oral, tracheal, and nasal suctioning. Equipped with 12V rechargeable battery, ideal for transport and rescue.",
    specs: {
      "Max Suction": "-80 kPa (-0.80 bar)",
      "Flow Rate": "36 L/min",
      "Power Supplies": "230V AC, 12V DC car adapter, and internal battery",
      "Autonomy": "60 minutes continuous battery run-time"
    },
    checklist: [
      "Verify power source seamless switching: AC grid to internal 12V battery.",
      "Check 12V car charging cable and internal battery capacity profile.",
      "Calibrate vacuum suction gauge.",
      "Inspect hydrophobic intake filter for discoloration or saturation."
    ],
    calibrationInterval: "12 Months",
    riskCategory: "Medium-High Risk / Portable Suction"
  }
];

// Helper functions for data queries
export function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}

export function getProductsBySector(sectorId) {
  if (!sectorId || sectorId === "all") return PRODUCTS;
  return PRODUCTS.filter(p => p.sectors.includes(sectorId));
}

export function getProductsByBrand(brandId) {
  return PRODUCTS.filter(p => p.brand.toLowerCase() === brandId.toLowerCase());
}

export function searchProducts(query, sectorId = "all", brandId = "all") {
  const q = query.toLowerCase().trim();
  return PRODUCTS.filter(p => {
    const matchesQuery = !q || 
      p.name.toLowerCase().includes(q) || 
      p.fullName.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q);
      
    const matchesSector = sectorId === "all" || p.sectors.includes(sectorId);
    const matchesBrand = brandId === "all" || p.brand.toLowerCase() === brandId.toLowerCase();
    
    return matchesQuery && matchesSector && matchesBrand;
  });
}
