import {
  User,
  WorkerProfile,
  EmployerOrganization,
  SiteOrDepartment,
  Shift,
  AttendanceRecord,
  Payslip,
  PayQuery,
  SafetyReport,
  FeedbackResponse,
  FatigueAlert,
  SkillCredential,
  AuditLog,
  WorkplacePolicySettings,
} from "@/types";

export const initialWorkplacePolicy: WorkplacePolicySettings = {
  organizationName: "Apex Infrastructure & Care Consortium",
  industry: "construction",
  standardWorkdayHours: 8,
  overtimeThresholdHours: 8,
  overtimeMultiplier: 1.5, // 1.5x regular pay
  requiredRestIntervalHours: 10,
  weeklyHourWarningThreshold: 60,
  maxConsecutiveNightShifts: 3,
  privacyMinimumGroupSize: 5,
  supportedLanguages: ["en", "ta", "hi", "te"],
};

export const demoSitesAndDepartments: SiteOrDepartment[] = [
  {
    id: "site-metro-4",
    name: "Metro Phase 4 - Station North Yard",
    organizationId: "org-apex",
    industry: "construction",
    location: "Hebbal Outer Ring Rd, Bengaluru",
    activeWorkersCount: 26,
  },
  {
    id: "site-techpark-b",
    name: "Prestige Cyber Tech Park - Tower B",
    organizationId: "org-apex",
    industry: "construction",
    location: "Electronic City Phase 1, Bengaluru",
    activeWorkersCount: 14,
  },
  {
    id: "dept-ward4-icu",
    name: "Ward 4 & ICU Housekeeping",
    organizationId: "org-apex",
    industry: "hospital",
    location: "Apollo MedCare Hospital, Jayanagar",
    activeWorkersCount: 16,
  },
  {
    id: "dept-general-sanitation",
    name: "General Facility Sanitization & Support",
    organizationId: "org-apex",
    industry: "hospital",
    location: "Apollo MedCare Hospital, Basavanagudi",
    activeWorkersCount: 12,
  },
];

// Pre-defined Demo Accounts
export const demoWorkerAsha: WorkerProfile = {
  id: "worker-asha",
  name: "Asha Kumar",
  role: "worker",
  phone: "+91 98765 43210",
  industry: "construction",
  organizationId: "org-apex",
  organizationName: "Apex Infrastructure & Care",
  siteOrDepartmentId: "site-metro-4",
  siteOrDepartmentName: "Metro Phase 4 - Station North Yard",
  jobTitle: "Construction Helper & Scaffolding Support",
  employeeCode: "AI-CN-4082",
  joiningDate: "2024-03-15",
  supervisorName: "Vikram R. Gowda",
  preferredLanguage: "hi",
  simpleLanguageMode: false,
  hourlyRate: 110, // ₹110 / hour (~ ₹880/day standard)
  dailyBaseHours: 8,
  overtimeRateMultiplier: 1.5,
  healthSignal: "needs_attention",
  weeklyHours: 58,
  skillsCount: 3,
};

export const demoWorkerRavi: WorkerProfile = {
  id: "worker-ravi",
  name: "Ravi Kumar",
  role: "worker",
  phone: "+91 97123 98765",
  industry: "hospital",
  organizationId: "org-apex",
  organizationName: "Apex Infrastructure & Care",
  siteOrDepartmentId: "dept-ward4-icu",
  siteOrDepartmentName: "Ward 4 & ICU Housekeeping",
  jobTitle: "Senior Hospital Attendant",
  employeeCode: "AM-HP-2219",
  joiningDate: "2023-11-01",
  supervisorName: "Dr. Sister Leena Thomas",
  preferredLanguage: "ta",
  simpleLanguageMode: false,
  hourlyRate: 125, // ₹125 / hour
  dailyBaseHours: 8,
  overtimeRateMultiplier: 1.5,
  healthSignal: "stable",
  weeklyHours: 46,
  skillsCount: 4,
};

export const demoAdminPriya: User = {
  id: "admin-priya",
  name: "Priya Sharma",
  role: "admin",
  phone: "+91 99880 11223",
  industry: "construction",
  organizationId: "org-apex",
  organizationName: "Apex Infrastructure & Care",
  siteOrDepartmentId: "site-metro-4",
  siteOrDepartmentName: "Central Operations HQ",
  preferredLanguage: "en",
};

export const demoEducationSite: SiteOrDepartment = {
  id: "site-nit-campus",
  name: "NIT Campus - Facilities, Hostels & Labs",
  organizationId: "org-apex",
  industry: "education",
  location: "Surathkal / Bengaluru Tech Corridor",
  activeWorkersCount: 18,
  qrSecretKey: "nit-campus-facilities-secret-key-2026",
};

export const demoWorkerSuresh: WorkerProfile = {
  id: "worker-suresh",
  name: "Suresh Patel",
  role: "worker",
  phone: "+91 98220 54321",
  industry: "education",
  organizationId: "org-apex",
  organizationName: "Apex Infrastructure & Care",
  siteOrDepartmentId: "site-nit-campus",
  siteOrDepartmentName: "NIT Campus - Facilities, Hostels & Labs",
  jobTitle: "Campus Facilities & Chemistry Lab Maintenance Attendant",
  employeeCode: "AI-ED-5102",
  joiningDate: "2024-01-10",
  supervisorName: "Prof. M. Raghavan (Estate Officer)",
  preferredLanguage: "hi",
  simpleLanguageMode: false,
  hourlyRate: 115,
  dailyBaseHours: 8,
  overtimeRateMultiplier: 1.5,
  healthSignal: "stable",
  weeklyHours: 42,
  skillsCount: 3,
};

export const demoSafetyOfficerHarish: User = {
  id: "safety-harish",
  name: "Harish Shetty",
  role: "safety_officer",
  phone: "+91 99110 33445",
  industry: "construction",
  organizationId: "org-apex",
  organizationName: "Apex Infrastructure & Care",
  siteOrDepartmentId: "site-metro-4",
  siteOrDepartmentName: "Central EHS Safety Directorate",
  preferredLanguage: "en",
};

export const demoHrMeenakshi: User = {
  id: "hr-meenakshi",
  name: "Meenakshi Sundaram",
  role: "hr_payroll",
  phone: "+91 99440 77889",
  industry: "hospital",
  organizationId: "org-apex",
  organizationName: "Apex Infrastructure & Care",
  siteOrDepartmentId: "dept-ward4-icu",
  siteOrDepartmentName: "Payroll & Social Security Administration",
  preferredLanguage: "ta",
};

export const demoSupervisorVikram: User = {
  id: "supervisor-vikram",
  name: "Vikram R. Gowda",
  role: "supervisor",
  phone: "+91 98440 22334",
  industry: "construction",
  organizationId: "org-apex",
  organizationName: "Apex Infrastructure & Care",
  siteOrDepartmentId: "site-metro-4",
  siteOrDepartmentName: "Metro Phase 4 - Station North Yard",
  preferredLanguage: "en",
};

// Generate 50 Workers across construction & healthcare
export const generateWorkers = (): WorkerProfile[] => {
  const constructionNames = [
    "Asha Kumar", "Manoj Yadav", "Sunita Bai", "Rajesh Soren", "Babulal Munda",
    "Ganga Devi", "Santosh K.", "Laxman Murmu", "Munna Paswan", "Sita Soren",
    "Ramesh Oraon", "Pooja Kumari", "Dinesh Rawat", "Champa Bai", "Kalu Ram",
    "Govind Lal", "Meena Devi", "Hari Shankar", "Pankaj Das", "Basanti Hansda",
    "Arun Majhi", "Rekha Mahato", "Deepak Bhumij", "Kiran Bai", "Anil Barman",
    "Sanjay Soren", "Manju Tudu", "Kishore Nayak", "Kamla Devi", "Mahesh Saw"
  ];

  const hospitalNames = [
    "Ravi Kumar", "Kavitha Murugan", "Anthony Swamy", "Selvi Natarajan", "Pradeep Nair",
    "Devi Anbazhagan", "Mohammad Farooq", "Saraswathi Pillai", "Ganesh Murthy", "Mary D'Souza",
    "Baskar Pandian", "Vasanthi Raman", "Suresh Shenoy", "Geetha Balan", "Arul Dass",
    "Lakshmi Reddy", "Vijay Kumar", "Uma Maheshwari", "Joseph Francis", "Padma Venkat"
  ];

  const workers: WorkerProfile[] = [];

  // Construction
  constructionNames.forEach((name, i) => {
    if (i === 0) {
      workers.push(demoWorkerAsha);
      return;
    }
    const isSite1 = i % 2 === 0;
    const weeklyH = 40 + (i * 3) % 24;
    const health: WorkerProfile["healthSignal"] =
      weeklyH > 58 ? "high_risk" : weeklyH > 50 ? "needs_attention" : "stable";

    workers.push({
      id: `worker-cn-${i + 1}`,
      name,
      role: "worker",
      phone: `+91 98450 ${10000 + i}`,
      industry: "construction",
      organizationId: "org-apex",
      organizationName: "Apex Infrastructure & Care",
      siteOrDepartmentId: isSite1 ? "site-metro-4" : "site-techpark-b",
      siteOrDepartmentName: isSite1
        ? "Metro Phase 4 - Station North Yard"
        : "Prestige Cyber Tech Park - Tower B",
      jobTitle: i % 3 === 0 ? "Masonry Assistant" : i % 3 === 1 ? "Scaffold Helper" : "Site Material Handler",
      employeeCode: `AI-CN-${4100 + i}`,
      joiningDate: `2024-0${(i % 9) + 1}-10`,
      supervisorName: isSite1 ? "Vikram R. Gowda" : "Harish K. Shetty",
      preferredLanguage: i % 4 === 0 ? "hi" : i % 4 === 1 ? "te" : i % 4 === 2 ? "ta" : "en",
      hourlyRate: 105 + (i % 5) * 5,
      dailyBaseHours: 8,
      overtimeRateMultiplier: 1.5,
      healthSignal: health,
      weeklyHours: weeklyH,
      skillsCount: 2 + (i % 3),
    });
  });

  // Hospital
  hospitalNames.forEach((name, i) => {
    if (i === 0) {
      workers.push(demoWorkerRavi);
      return;
    }
    const isDept1 = i % 2 === 0;
    const weeklyH = 38 + (i * 2) % 22;
    const health: WorkerProfile["healthSignal"] =
      weeklyH > 55 ? "high_risk" : weeklyH > 48 ? "needs_attention" : "stable";

    workers.push({
      id: `worker-hp-${i + 1}`,
      name,
      role: "worker",
      phone: `+91 99000 ${20000 + i}`,
      industry: "hospital",
      organizationId: "org-apex",
      organizationName: "Apex Infrastructure & Care",
      siteOrDepartmentId: isDept1 ? "dept-ward4-icu" : "dept-general-sanitation",
      siteOrDepartmentName: isDept1
        ? "Ward 4 & ICU Housekeeping"
        : "General Facility Sanitization & Support",
      jobTitle: i % 3 === 0 ? "Sanitation Attendant" : i % 3 === 1 ? "Patient Support Assistant" : "Disinfection Technician",
      employeeCode: `AM-HP-${2230 + i}`,
      joiningDate: `2023-0${(i % 9) + 1}-12`,
      supervisorName: isDept1 ? "Dr. Sister Leena Thomas" : "K. Balakrishnan",
      preferredLanguage: i % 4 === 0 ? "ta" : i % 4 === 1 ? "te" : i % 4 === 2 ? "hi" : "en",
      hourlyRate: 120 + (i % 4) * 8,
      dailyBaseHours: 8,
      overtimeRateMultiplier: 1.5,
      healthSignal: health,
      weeklyHours: weeklyH,
      skillsCount: 3 + (i % 2),
    });
  });

  return workers;
};

// Generate 30 days of Shifts & Attendance for Asha & Ravi
export const generateDemoShifts = (): Shift[] => {
  const shifts: Shift[] = [];
  const today = new Date();

  // Next 3 days scheduled + past 27 days
  for (let i = 27; i >= -3; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];

    // Asha's Shift
    shifts.push({
      id: `shift-asha-${dateStr}`,
      workerId: "worker-asha",
      date: dateStr,
      startTime: "09:00",
      endTime: "18:00",
      scheduledHours: 8,
      status: i === 0 ? "checked_in" : i < 0 ? "scheduled" : "completed",
      siteOrDepartmentName: "Metro Phase 4 - Station North Yard",
      supervisorName: "Vikram R. Gowda",
    });

    // Ravi's Shift
    shifts.push({
      id: `shift-ravi-${dateStr}`,
      workerId: "worker-ravi",
      date: dateStr,
      startTime: i % 5 === 0 ? "21:00" : "07:00",
      endTime: i % 5 === 0 ? "06:00" : "16:00",
      scheduledHours: 8,
      status: i === 0 ? "checked_in" : i < 0 ? "scheduled" : "completed",
      siteOrDepartmentName: "Ward 4 & ICU Housekeeping",
      supervisorName: "Dr. Sister Leena Thomas",
      isNightShift: i % 5 === 0,
    });
  }

  return shifts;
};

// 30 Days of Attendance Records
export const generateDemoAttendance = (): AttendanceRecord[] => {
  const records: AttendanceRecord[] = [];
  const today = new Date();

  for (let i = 27; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];

    // Asha had heavy overtime in recent days (causing fatigue alert)
    const ashaOt = i <= 7 ? (i % 2 === 0 ? 3 : 2) : i % 4 === 0 ? 2 : 0;
    records.push({
      id: `att-asha-${dateStr}`,
      shiftId: `shift-asha-${dateStr}`,
      workerId: "worker-asha",
      workerName: "Asha Kumar",
      date: dateStr,
      checkInTime: "08:52",
      checkOutTime: i === 0 ? undefined : ashaOt > 0 ? "21:15" : "18:05",
      checkInMethod: "qr_code",
      locationVerified: true,
      actualHoursWorked: i === 0 ? 4.5 : 8 + ashaOt,
      regularHours: i === 0 ? 4.5 : 8,
      overtimeHours: i === 0 ? 0 : ashaOt,
      breakDurationMinutes: 45,
      breakStatus: i === 0 ? "active" : "ended",
      status: "verified",
    });

    // Ravi regular steady duty
    const raviOt = i % 6 === 0 ? 2 : 0;
    records.push({
      id: `att-ravi-${dateStr}`,
      shiftId: `shift-ravi-${dateStr}`,
      workerId: "worker-ravi",
      workerName: "Ravi Kumar",
      date: dateStr,
      checkInTime: "06:55",
      checkOutTime: i === 0 ? undefined : raviOt > 0 ? "18:10" : "16:05",
      checkInMethod: "gps_location",
      locationVerified: true,
      actualHoursWorked: i === 0 ? 5.0 : 8 + raviOt,
      regularHours: i === 0 ? 5.0 : 8,
      overtimeHours: i === 0 ? 0 : raviOt,
      breakDurationMinutes: 60,
      breakStatus: i === 0 ? "none" : "ended",
      status: "verified",
    });
  }

  return records;
};

// Realistic Payslips (Current month and Previous month)
export const initialPayslips: Payslip[] = [
  {
    id: "pay-asha-current",
    workerId: "worker-asha",
    month: "October 2026",
    year: 2026,
    payPeriod: "01 Oct 2026 - 31 Oct 2026",
    baseHourlyRate: 110,
    shiftsCompleted: 24,
    regularHours: 192,
    overtimeHours: 28,
    overtimeRate: 165, // 1.5 * 110
    baseWages: 21120, // 192 * 110
    overtimePay: 4620, // 28 * 165
    allowances: [
      { name: "Site Conveyance Allowance", amount: 1200 },
      { name: "Safety Helmet & Gear Allowance", amount: 500 },
    ],
    deductions: [
      { name: "EPF (Provident Fund 12%)", amount: 2534 },
      { name: "ESIC Health Insurance (0.75%)", amount: 158 },
    ],
    grossEarnings: 27440,
    totalDeductions: 2692,
    netPayable: 24748,
    paymentStatus: "scheduled",
    paymentDate: "31 Oct 2026",
    plainLanguageExplanation:
      "You completed 24 shifts with 192 regular hours and 28 overtime hours. At your configured overtime rate of ₹165/hour (1.5x), your overtime adds ₹4,620 to your base pay of ₹21,120. Standard EPF and ESIC statutory contributions are retained for your retirement and medical safety net.",
  },
  {
    id: "pay-asha-prev",
    workerId: "worker-asha",
    month: "September 2026",
    year: 2026,
    payPeriod: "01 Sep 2026 - 30 Sep 2026",
    baseHourlyRate: 110,
    shiftsCompleted: 25,
    regularHours: 200,
    overtimeHours: 16,
    overtimeRate: 165,
    baseWages: 22000,
    overtimePay: 2640,
    allowances: [
      { name: "Site Conveyance Allowance", amount: 1200 },
    ],
    deductions: [
      { name: "EPF (Provident Fund 12%)", amount: 2640 },
      { name: "ESIC Health Insurance (0.75%)", amount: 165 },
    ],
    grossEarnings: 25840,
    totalDeductions: 2805,
    netPayable: 23035,
    paymentStatus: "paid",
    paymentDate: "30 Sep 2026",
    plainLanguageExplanation:
      "Paid on Sep 30, 2026 via Direct Bank Transfer to State Bank of India account ending in 7104. 16 overtime hours compensated in full.",
  },
  {
    id: "pay-ravi-current",
    workerId: "worker-ravi",
    month: "October 2026",
    year: 2026,
    payPeriod: "01 Oct 2026 - 31 Oct 2026",
    baseHourlyRate: 125,
    shiftsCompleted: 23,
    regularHours: 184,
    overtimeHours: 14,
    overtimeRate: 187.5,
    baseWages: 23000,
    overtimePay: 2625,
    allowances: [
      { name: "ICU Sanitation Risk Allowance", amount: 2000 },
      { name: "Uniform Laundering Allowance", amount: 600 },
    ],
    deductions: [
      { name: "EPF (Provident Fund 12%)", amount: 2760 },
      { name: "ESIC Health Insurance (0.75%)", amount: 172 },
    ],
    grossEarnings: 28225,
    totalDeductions: 2932,
    netPayable: 25293,
    paymentStatus: "scheduled",
    paymentDate: "31 Oct 2026",
    plainLanguageExplanation:
      "You logged 23 shifts in Ward 4 & ICU. 14 overtime hours were tracked, yielding ₹2,625 overtime compensation alongside ICU risk sanitization allowances.",
  },
];

// 8+ Safety Reports across lifecycle stages (Construction & Hospital)
export const initialSafetyReports: SafetyReport[] = [
  {
    id: "safe-001",
    ticketNumber: "FS-SAF-2026-104",
    title: "Missing Safety Helmets near Tower B Scaffolding",
    description: "Sub-contractor workers on level 3 scaffolding are operating without chin-strap helmets. Loose brick fragments fallen near walkway.",
    hazardCategory: "missing_ppe",
    severity: "critical",
    industry: "construction",
    siteOrDepartmentName: "Metro Phase 4 - Station North Yard",
    isAnonymous: true,
    submittedAt: "2026-10-25 14:10",
    status: "in_progress",
    voiceNoteAttached: true,
    voiceTranscription: "There are four workers on level 3 without chin strap helmets. Bricks are near the edge.",
    photoAttached: true,
    photoUrl: "/images/scaffold-notice.png",
    assignedOwner: "Harish Shetty (Site Safety Officer)",
    targetResolutionDate: "2026-10-26",
    correctiveActions: [
      "Issued stop-work notice on Bay 3 scaffolding",
      "Stocked 30 certified EN-397 chin-strap helmets at gate 2 store",
      "Conducted 15-minute mandatory toolbox briefing at 16:00",
    ],
    slaBreachWarning: true,
  },
  {
    id: "safe-002",
    ticketNumber: "FS-SAF-2026-103",
    title: "Inadequate Nitrile Gloves & Face Shields in Bio-waste Disposal",
    description: "Housekeeping staff handling contaminated ICU linens without heavy-duty double nitrile gloves or splash face shields.",
    hazardCategory: "missing_ppe",
    severity: "high",
    industry: "hospital",
    siteOrDepartmentName: "Ward 4 & ICU Housekeeping",
    isAnonymous: false,
    workerId: "worker-ravi",
    workerName: "Ravi Kumar",
    submittedAt: "2026-10-24 10:30",
    status: "resolved",
    voiceNoteAttached: false,
    assignedOwner: "Sister Stella (Infection Control Lead)",
    targetResolutionDate: "2026-10-25",
    correctiveActions: [
      "Replenished 10 boxes of chemical-resistant nitrile gloves in clean utility closet",
      "Installed UV disinfection face shield rack",
    ],
    resolutionNote: "Dedicated PPE supply cabinet in ICU sub-station re-stocked and verified by nursing in-charge.",
    resolvedAt: "2026-10-25 17:00",
    workerVerifiedWorked: undefined, // Pending worker verification
  },
  {
    id: "safe-003",
    ticketNumber: "FS-SAF-2026-102",
    title: "Exposed 415V Three-Phase Cable through Water Puddle",
    description: "Generator feed cable insulation cut open near water supply tap at station exit 2.",
    hazardCategory: "electrical_risk",
    severity: "critical",
    industry: "construction",
    siteOrDepartmentName: "Metro Phase 4 - Station North Yard",
    isAnonymous: true,
    submittedAt: "2026-10-23 09:15",
    status: "verified",
    voiceNoteAttached: true,
    assignedOwner: "Anand M. (Chief Electrical Inspector)",
    correctiveActions: [
      "Generator supply isolated immediately",
      "Rerouted cable through elevated rubber cable tray bridge",
    ],
    resolutionNote: "Elevated cable tray installed 2.5m above ground level with waterproof junction box.",
    resolvedAt: "2026-10-23 15:45",
    workerVerifiedWorked: true,
    workerVerificationFeedback: "Inspected at shift start. Cable is safely suspended.",
  },
  {
    id: "safe-004",
    ticketNumber: "FS-SAF-2026-101",
    title: "Extreme Heat Index and Empty Water Dispensers",
    description: "Roof slab workers working in 39°C direct noon sunlight with empty electrolyte water drum since 11:30 AM.",
    hazardCategory: "heat_dehydration",
    severity: "high",
    industry: "construction",
    siteOrDepartmentName: "Prestige Cyber Tech Park - Tower B",
    isAnonymous: true,
    submittedAt: "2026-10-22 12:45",
    status: "resolved",
    assignedOwner: "Kishore Kumar (Welfare Officer)",
    correctiveActions: [
      "Delivered 40L chilled electrolyte water tanks",
      "Erected shade canopy with mist cooling fan at Tower B roof",
    ],
    resolutionNote: "Hourly water refill protocol instituted with site security logging refills.",
    resolvedAt: "2026-10-22 14:15",
    workerVerifiedWorked: true,
  },
  {
    id: "safe-005",
    ticketNumber: "FS-SAF-2026-100",
    title: "Liquid Disinfectant Spillage with Pungent Chlorine Fumes",
    description: "Basement linen chute room has strong chemical vapor leak from cracked 25L sodium hypochlorite container.",
    hazardCategory: "hygiene_sanitation",
    severity: "medium",
    industry: "hospital",
    siteOrDepartmentName: "General Facility Sanitization & Support",
    isAnonymous: true,
    submittedAt: "2026-10-21 16:20",
    status: "resolved",
    assignedOwner: "R. Meenakshi (EHS Hospital Lead)",
    correctiveActions: [
      "Spill kit deployed with neutralizing absorbent pads",
      "Replaced cracked container and checked ventilation duct",
    ],
    resolutionNote: "Chamber fully ventilated and air quality index confirmed safe.",
    resolvedAt: "2026-10-21 19:00",
    workerVerifiedWorked: true,
  },
  {
    id: "safe-006",
    ticketNumber: "FS-SAF-2026-099",
    title: "Single Attendant for 32 Post-Op Beds during Night Shift",
    description: "Two scheduled night attendants did not show; single worker expected to handle patient transfers and bed cleaning all night.",
    hazardCategory: "staffing_overload",
    severity: "high",
    industry: "hospital",
    siteOrDepartmentName: "Ward 4 & ICU Housekeeping",
    isAnonymous: true,
    submittedAt: "2026-10-20 22:30",
    status: "acknowledged",
    assignedOwner: "Dr. Sister Leena Thomas",
    targetResolutionDate: "2026-10-27",
    correctiveActions: [
      "Called on-call float attendant from ward 2",
      "Reviewing night roster backup pool",
    ],
  },
  {
    id: "safe-007",
    ticketNumber: "FS-SAF-2026-098",
    title: "Broken Scaffold Plank on South Facade",
    description: "Wooden plank splintered and flexing dangerously when carrying cement bags.",
    hazardCategory: "unsafe_equipment",
    severity: "high",
    industry: "construction",
    siteOrDepartmentName: "Prestige Cyber Tech Park - Tower B",
    isAnonymous: false,
    workerId: "worker-cn-5",
    workerName: "Babulal Munda",
    submittedAt: "2026-10-19 11:00",
    status: "submitted",
  },
  {
    id: "safe-008",
    ticketNumber: "FS-SAF-2026-097",
    title: "Wet Slippery Floor without Warning Cones",
    description: "Main corridor mopped with excessive polish, two visitors and an attendant almost slipped.",
    hazardCategory: "fall_trip_hazard",
    severity: "low",
    industry: "hospital",
    siteOrDepartmentName: "General Facility Sanitization & Support",
    isAnonymous: true,
    submittedAt: "2026-10-18 08:30",
    status: "verified",
    assignedOwner: "K. Balakrishnan",
    correctiveActions: ["Positioned bilingual caution stands at both corridor entries"],
    resolutionNote: "Standard operating procedure refreshed with housekeeping crew.",
    resolvedAt: "2026-10-18 09:30",
    workerVerifiedWorked: true,
  },
];

// 12+ Pay Queries for realistic payroll audit
export const initialPayQueries: PayQuery[] = [
  {
    id: "pq-001",
    ticketNumber: "PQ-2026-042",
    workerId: "worker-asha",
    workerName: "Asha Kumar",
    payslipId: "pay-asha-current",
    month: "October 2026",
    category: "incorrect_overtime",
    description: "I worked 3 hours overtime on Saturday Oct 18 after concrete pour, but my shift log shows only 1 hour recorded.",
    submittedAt: "2026-10-26 18:30",
    status: "under_review",
    adminResponse: "Site supervisor Vikram confirming pour log sheet with timekeeper.",
  },
  {
    id: "pq-002",
    ticketNumber: "PQ-2026-041",
    workerId: "worker-ravi",
    workerName: "Ravi Kumar",
    payslipId: "pay-ravi-current",
    month: "October 2026",
    category: "allowance_issue",
    description: "ICU hazardous sanitization allowance for the second week of October was not credited on the provisional payslip.",
    submittedAt: "2026-10-25 15:10",
    status: "resolved",
    adminResponse: "Verified with Ward 4 duty register. Additional ₹500 ICU risk allowance added to provisional wallet.",
    resolvedAt: "2026-10-26 11:00",
    adjustedAmount: 500,
  },
  {
    id: "pq-003",
    ticketNumber: "PQ-2026-040",
    workerId: "worker-cn-3",
    workerName: "Sunita Bai",
    payslipId: "pay-cn-3",
    month: "September 2026",
    category: "missing_hours",
    description: "Two shifts on Sep 12 and 13 showed absent due to biometric scanner malfunction at Gate 1.",
    submittedAt: "2026-10-02 09:15",
    status: "resolved",
    adminResponse: "Manual gate entry register cross-verified. 16 hours credited.",
    resolvedAt: "2026-10-04 14:00",
    adjustedAmount: 1760,
  },
  {
    id: "pq-004",
    ticketNumber: "PQ-2026-039",
    workerId: "worker-hp-4",
    workerName: "Selvi Natarajan",
    payslipId: "pay-hp-4",
    month: "October 2026",
    category: "deduction_clarification",
    description: "Please explain the EPF deduction increase of ₹240 this month.",
    submittedAt: "2026-10-24 12:00",
    status: "resolved",
    adminResponse: "Your base wages increased after annual increment, so statutory 12% PF employee contribution adjusted proportionally.",
    resolvedAt: "2026-10-24 16:30",
  },
  {
    id: "pq-005",
    ticketNumber: "PQ-2026-038",
    workerId: "worker-cn-8",
    workerName: "Laxman Murmu",
    payslipId: "pay-cn-8",
    month: "October 2026",
    category: "incorrect_overtime",
    description: "Double shift performed on Sunday Oct 19 night not counted at 1.5x rate.",
    submittedAt: "2026-10-23 08:00",
    status: "under_review",
  },
  {
    id: "pq-006",
    ticketNumber: "PQ-2026-037",
    workerId: "worker-hp-6",
    workerName: "Devi Anbazhagan",
    payslipId: "pay-hp-6",
    month: "October 2026",
    category: "allowance_issue",
    description: "Uniform washing allowance omitted for September cycle.",
    submittedAt: "2026-10-22 17:00",
    status: "resolved",
    adminResponse: "Credited ₹600 in adjustment run.",
    resolvedAt: "2026-10-23 10:00",
    adjustedAmount: 600,
  },
  {
    id: "pq-007",
    ticketNumber: "PQ-2026-036",
    workerId: "worker-cn-14",
    workerName: "Champa Bai",
    payslipId: "pay-cn-14",
    month: "October 2026",
    category: "missing_hours",
    description: "Check-out on Oct 14 failed due to network outage at worksite.",
    submittedAt: "2026-10-16 09:30",
    status: "resolved",
    adminResponse: "Supervisor manual sync approved 8 standard hours.",
    resolvedAt: "2026-10-16 14:00",
  },
  {
    id: "pq-008",
    ticketNumber: "PQ-2026-035",
    workerId: "worker-hp-8",
    workerName: "Saraswathi Pillai",
    payslipId: "pay-hp-8",
    month: "October 2026",
    category: "other",
    description: "Bank account details updated last week; please confirm next payout goes to new account.",
    submittedAt: "2026-10-20 11:45",
    status: "resolved",
    adminResponse: "New Canara Bank account verified via penny-drop check. Payout mapped.",
    resolvedAt: "2026-10-21 09:00",
  },
  {
    id: "pq-009",
    ticketNumber: "PQ-2026-034",
    workerId: "worker-cn-19",
    workerName: "Pankaj Das",
    payslipId: "pay-cn-19",
    month: "October 2026",
    category: "incorrect_overtime",
    description: "Overtime rate shows standard rate instead of 1.5x in wallet breakdown.",
    submittedAt: "2026-10-24 19:10",
    status: "under_review",
  },
  {
    id: "pq-010",
    ticketNumber: "PQ-2026-033",
    workerId: "worker-hp-12",
    workerName: "Vasanthi Raman",
    payslipId: "pay-hp-12",
    month: "October 2026",
    category: "missing_hours",
    description: "Night shift spillover hours across midnight on Oct 10 missing 2 hours.",
    submittedAt: "2026-10-12 08:30",
    status: "resolved",
    adminResponse: "Midnight shift split formula adjusted. 2 hours back-credited.",
    resolvedAt: "2026-10-13 11:30",
    adjustedAmount: 250,
  },
  {
    id: "pq-011",
    ticketNumber: "PQ-2026-032",
    workerId: "worker-cn-24",
    workerName: "Kiran Bai",
    payslipId: "pay-cn-24",
    month: "October 2026",
    category: "allowance_issue",
    description: "Travel reimbursement voucher submitted on Oct 5 pending approval.",
    submittedAt: "2026-10-15 13:00",
    status: "resolved",
    adminResponse: "Approved ₹450 reimbursement.",
    resolvedAt: "2026-10-16 10:00",
    adjustedAmount: 450,
  },
  {
    id: "pq-012",
    ticketNumber: "PQ-2026-031",
    workerId: "worker-hp-15",
    workerName: "Arul Dass",
    payslipId: "pay-hp-15",
    month: "October 2026",
    category: "deduction_clarification",
    description: "Clarification needed on canteen deduction slip.",
    submittedAt: "2026-10-18 14:15",
    status: "resolved",
    adminResponse: "Canteen token breakdown provided to worker.",
    resolvedAt: "2026-10-19 12:00",
  },
];

// Fatigue Alerts (Simple, explainable demo rules)
export const initialFatigueAlerts: FatigueAlert[] = [
  {
    id: "fatigue-001",
    workerId: "worker-asha",
    workerName: "Asha Kumar",
    riskLevel: "high",
    ruleTriggered: "week_over_60h",
    headline: "High Cumulative Working Hours (58 Hours in 7 Days)",
    message: "You have logged 58 duty hours this week across multiple construction shifts.",
    whyExplanation:
      "Rule triggered: Configured policy flags working more than 55 hours in a rolling 7-day period to prevent fatigue injuries on scaffolding.",
    recordedAt: "2026-10-26 14:00",
    supportiveActionSuggestion:
      "Operational suggestion: Review roster and discuss rest time with supervisor Vikram Gowda before taking further overtime.",
  },
  {
    id: "fatigue-002",
    workerId: "worker-cn-8",
    workerName: "Laxman Murmu",
    riskLevel: "high",
    ruleTriggered: "shift_over_12h",
    headline: "Extended Shift Duration (>12 Hours)",
    message: "Worked a 13.5-hour continuous shift during concrete foundation curing.",
    whyExplanation: "Rule triggered: Single shift duration exceeded the 12-hour safe threshold.",
    recordedAt: "2026-10-25 22:30",
    supportiveActionSuggestion: "Provide mandatory 14-hour rest window before next scheduled entry.",
  },
  {
    id: "fatigue-003",
    workerId: "worker-hp-7",
    workerName: "Mohammad Farooq",
    riskLevel: "warning",
    ruleTriggered: "consecutive_night_shifts",
    headline: "4 Consecutive Night Shifts Completed",
    message: "Completed 4 consecutive night duties (21:00 to 06:00) in Emergency ward.",
    whyExplanation: "Rule triggered: Exceeded maximum recommended limit of 3 consecutive night shifts.",
    recordedAt: "2026-10-26 06:30",
    supportiveActionSuggestion: "Rotate to day shift or assign 48-hour recuperative rest period.",
  },
  {
    id: "fatigue-004",
    workerId: "worker-cn-14",
    workerName: "Champa Bai",
    riskLevel: "warning",
    ruleTriggered: "rest_under_10h",
    headline: "Short Turnaround Time Between Shifts (7.5 Hours Rest)",
    message: "Logged out at 23:30 and reported for duty at 07:00 next morning.",
    whyExplanation: "Rule triggered: Rest period between consecutive shifts fell below mandatory 10 hours.",
    recordedAt: "2026-10-24 07:15",
    supportiveActionSuggestion: "Reschedule start time to allow full 10-hour rest interval.",
  },
];

// Skills & Credentials for Construction & Healthcare
export const initialSkillCredentials: SkillCredential[] = [
  // Asha Kumar's credentials
  {
    id: "skill-asha-1",
    workerId: "worker-asha",
    title: "PPE & Site Safety Basics (Level 1)",
    industry: "construction",
    category: "safety",
    issuer: "National Skill Development Corporation (NSDC)",
    issuedDate: "2024-04-10",
    isVerified: true,
    verificationBadgeUrl: "/badges/nsdc-verified.png",
    badgeLevel: "foundation",
  },
  {
    id: "skill-asha-2",
    workerId: "worker-asha",
    title: "Safe Scaffolding Erection & Fall Arrest Support",
    industry: "construction",
    category: "technical",
    issuer: "Apex Safety Training Academy",
    issuedDate: "2024-08-22",
    isVerified: true,
    verificationBadgeUrl: "/badges/scaffold-pro.png",
    badgeLevel: "advanced",
  },
  {
    id: "skill-asha-3",
    workerId: "worker-asha",
    title: "Masonry Assistant & Mortar Mixing",
    industry: "construction",
    category: "technical",
    issuer: "Self-Reported Experience (4 Years)",
    issuedDate: "2022-01-15",
    isVerified: false,
    badgeLevel: "foundation",
  },

  // Ravi Kumar's credentials
  {
    id: "skill-ravi-1",
    workerId: "worker-ravi",
    title: "Hospital Infection Prevention & Control (IPC)",
    industry: "hospital",
    category: "safety",
    issuer: "Apollo Health Academy & NABH",
    issuedDate: "2023-12-05",
    isVerified: true,
    verificationBadgeUrl: "/badges/ipc-cert.png",
    badgeLevel: "advanced",
  },
  {
    id: "skill-ravi-2",
    workerId: "worker-ravi",
    title: "Bio-Medical Waste Handling & Segregation",
    industry: "hospital",
    category: "hygiene",
    issuer: "State Pollution Control Board Certified Course",
    issuedDate: "2024-02-18",
    isVerified: true,
    verificationBadgeUrl: "/badges/bmw-cert.png",
    badgeLevel: "expert",
  },
  {
    id: "skill-ravi-3",
    workerId: "worker-ravi",
    title: "Patient Safe Transfer & Mobility Assistance",
    industry: "hospital",
    category: "technical",
    issuer: "Apollo Nursing Care Council",
    issuedDate: "2024-05-12",
    isVerified: true,
    badgeLevel: "foundation",
  },
  {
    id: "skill-ravi-4",
    workerId: "worker-ravi",
    title: "ICU Terminal Sanitization Protocols",
    industry: "hospital",
    category: "hygiene",
    issuer: "Self-Reported Hospital Experience",
    issuedDate: "2023-01-10",
    isVerified: false,
    badgeLevel: "advanced",
  },
];

// Anonymous Feedback Responses (Simulated with k-anonymity compliance >= 5)
export const initialFeedbackResponses: FeedbackResponse[] = [
  {
    id: "fb-01",
    industry: "construction",
    siteOrDepartmentId: "site-metro-4",
    submittedAt: "2026-10-26 16:00",
    safetyRating: 4,
    supervisorRespectRating: 4,
    workloadRating: 3,
    payClarityRating: 4,
    restAndBreaksRating: 3,
    enoughRestBetweenShifts: true,
    safeRaisingConcerns: true,
    understandsPay: true,
    isAnonymous: true,
  },
  {
    id: "fb-02",
    industry: "construction",
    siteOrDepartmentId: "site-metro-4",
    submittedAt: "2026-10-26 15:30",
    safetyRating: 3,
    supervisorRespectRating: 4,
    workloadRating: 2,
    payClarityRating: 3,
    restAndBreaksRating: 2,
    enoughRestBetweenShifts: false,
    safeRaisingConcerns: true,
    understandsPay: true,
    isAnonymous: true,
  },
  {
    id: "fb-03",
    industry: "construction",
    siteOrDepartmentId: "site-metro-4",
    submittedAt: "2026-10-25 17:15",
    safetyRating: 4,
    supervisorRespectRating: 5,
    workloadRating: 3,
    payClarityRating: 4,
    restAndBreaksRating: 3,
    enoughRestBetweenShifts: true,
    safeRaisingConcerns: true,
    understandsPay: true,
    isAnonymous: true,
  },
  {
    id: "fb-04",
    industry: "construction",
    siteOrDepartmentId: "site-metro-4",
    submittedAt: "2026-10-25 14:00",
    safetyRating: 3,
    supervisorRespectRating: 4,
    workloadRating: 3,
    payClarityRating: 4,
    restAndBreaksRating: 3,
    enoughRestBetweenShifts: true,
    safeRaisingConcerns: true,
    understandsPay: false,
    isAnonymous: true,
  },
  {
    id: "fb-05",
    industry: "construction",
    siteOrDepartmentId: "site-metro-4",
    submittedAt: "2026-10-24 18:30",
    safetyRating: 4,
    supervisorRespectRating: 4,
    workloadRating: 3,
    payClarityRating: 5,
    restAndBreaksRating: 4,
    enoughRestBetweenShifts: true,
    safeRaisingConcerns: true,
    understandsPay: true,
    isAnonymous: true,
  },
  {
    id: "fb-06",
    industry: "hospital",
    siteOrDepartmentId: "dept-ward4-icu",
    submittedAt: "2026-10-26 11:20",
    safetyRating: 4,
    supervisorRespectRating: 5,
    workloadRating: 3,
    payClarityRating: 4,
    restAndBreaksRating: 4,
    enoughRestBetweenShifts: true,
    safeRaisingConcerns: true,
    understandsPay: true,
    isAnonymous: true,
  },
  {
    id: "fb-07",
    industry: "hospital",
    siteOrDepartmentId: "dept-ward4-icu",
    submittedAt: "2026-10-25 09:45",
    safetyRating: 4,
    supervisorRespectRating: 4,
    workloadRating: 3,
    payClarityRating: 4,
    restAndBreaksRating: 3,
    enoughRestBetweenShifts: true,
    safeRaisingConcerns: true,
    understandsPay: true,
    isAnonymous: true,
  },
  {
    id: "fb-08",
    industry: "hospital",
    siteOrDepartmentId: "dept-ward4-icu",
    submittedAt: "2026-10-24 20:10",
    safetyRating: 3,
    supervisorRespectRating: 4,
    workloadRating: 2,
    payClarityRating: 3,
    restAndBreaksRating: 2,
    enoughRestBetweenShifts: false,
    safeRaisingConcerns: true,
    understandsPay: true,
    isAnonymous: true,
  },
  {
    id: "fb-09",
    industry: "hospital",
    siteOrDepartmentId: "dept-ward4-icu",
    submittedAt: "2026-10-23 15:30",
    safetyRating: 5,
    supervisorRespectRating: 5,
    workloadRating: 4,
    payClarityRating: 4,
    restAndBreaksRating: 4,
    enoughRestBetweenShifts: true,
    safeRaisingConcerns: true,
    understandsPay: true,
    isAnonymous: true,
  },
  {
    id: "fb-10",
    industry: "hospital",
    siteOrDepartmentId: "dept-ward4-icu",
    submittedAt: "2026-10-22 18:00",
    safetyRating: 4,
    supervisorRespectRating: 4,
    workloadRating: 3,
    payClarityRating: 4,
    restAndBreaksRating: 3,
    enoughRestBetweenShifts: true,
    safeRaisingConcerns: true,
    understandsPay: true,
    isAnonymous: true,
  },
];

// Audit Logs
export const initialAuditLogs: AuditLog[] = [
  {
    id: "audit-01",
    timestamp: "2026-10-26 11:00",
    actorName: "Priya Sharma",
    actorRole: "admin",
    action: "STATUS_UPDATE",
    targetEntity: "pay_query",
    targetId: "pq-002",
    notes: "Verified ICU allowance and adjusted ₹500 in provisional payslip.",
  },
  {
    id: "audit-02",
    timestamp: "2026-10-25 17:00",
    actorName: "Priya Sharma",
    actorRole: "admin",
    action: "RESOLUTION_RECORDED",
    targetEntity: "safety_report",
    targetId: "safe-002",
    notes: "Marked resolved with PPE cabinet restock note; awaiting worker verification.",
  },
  {
    id: "audit-03",
    timestamp: "2026-10-25 15:00",
    actorName: "Priya Sharma",
    actorRole: "admin",
    action: "ASSIGN_OWNER",
    targetEntity: "safety_report",
    targetId: "safe-001",
    notes: "Assigned critical missing helmet report to Harish Shetty (Site Safety Officer).",
  },
];
