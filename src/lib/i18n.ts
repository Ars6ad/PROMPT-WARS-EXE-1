import { LanguageCode } from "@/types";

export interface TranslationDictionary {
  appName: string;
  appTagline: string;
  unSdgLabel: string;
  switchRole: string;
  demoModeBadge: string;
  offlineMode: string;
  onlineMode: string;
  syncPending: string;
  listenAudio: string;
  stopAudio: string;
  voiceInput: string;
  listening: string;
  simpleLanguageMode: string;
  reduceMotion: string;
  highContrast: string;
  whyAmISeeingThis: string;
  close: string;
  save: string;
  cancel: string;
  submit: string;
  confirm: string;
  verified: string;
  estimatedNotice: string;
  anonymousNotice: string;

  // Nav
  navHome: string;
  navShifts: string;
  navPay: string;
  navSafety: string;
  navFeedback: string;
  navSkills: string;
  navProfile: string;

  // Worker Dashboard & Shift
  greetingWorker: string;
  currentShift: string;
  shiftStatusCheckedIn: string;
  shiftStatusCheckedOut: string;
  shiftStatusOnBreak: string;
  shiftStartsAt: string;
  shiftEndsAt: string;
  checkInAction: string;
  checkOutAction: string;
  startBreakAction: string;
  endBreakAction: string;
  checkInSuccess: string;
  checkOutSuccess: string;
  locationConfirmed: string;
  qrSimulation: string;
  gpsSimulation: string;
  manualFallback: string;
  supervisor: string;
  workZoneConstruction: string;
  workZoneHospital: string;
  scheduledHours: string;
  actualHours: string;

  // Pay Wallet
  estimatedPayForMonth: string;
  paymentExpectedDate: string;
  baseWages: string;
  regularHoursWorked: string;
  overtimeHoursWorked: string;
  overtimeMultiplierLabel: string;
  allowances: string;
  deductions: string;
  netEstimatedPayable: string;
  plainPayExplanation: string;
  askAboutPay: string;
  downloadPayslip: string;
  payQuerySubmitted: string;

  // Safety
  reportHazard: string;
  safetyTitle: string;
  hazardStep1: string;
  hazardStep2: string;
  hazardStep3: string;
  hazardCategory: string;
  severityLevel: string;
  voiceNotePrompt: string;
  photoPrompt: string;
  anonymousToggleLabel: string;
  anonymousExplanation: string;
  safetySubmittedConfirmation: string;
  ticketNumberLabel: string;
  whatHappensNext: string;
  workerVerifyResolution: string;
  didThisFixTheProblem: string;
  yesFixed: string;
  stillAProblem: string;

  // Categories
  catMissingPpe: string;
  catUnsafeEquipment: string;
  catFallTrip: string;
  catElectrical: string;
  catHeatDehydration: string;
  catHygiene: string;
  catStaffingOverload: string;
  catOther: string;

  // Severities
  sevLow: string;
  sevMedium: string;
  sevHigh: string;
  sevCritical: string;

  // Fatigue
  fatigueAlertTitle: string;
  restSignalGood: string;
  restSignalWarning: string;
  restSignalHigh: string;
  askSupervisorRest: string;

  // Feedback
  workerVoiceTitle: string;
  feedbackSubtitle: string;
  rateSafety: string;
  rateSupervisor: string;
  rateWorkload: string;
  ratePayClarity: string;
  rateRest: string;
  qRestBetweenShifts: string;
  qSafeRaisingConcern: string;
  qUnderstandPay: string;
  yes: string;
  no: string;
  privacyGuaranteeKAnon: string;

  // Skills
  skillPassportTitle: string;
  verifiedBadge: string;
  workerEnteredBadge: string;
  downloadPassportCard: string;
}

export const translations: Record<LanguageCode, TranslationDictionary> = {
  en: {
    appName: "FairShift",
    appTagline: "Workforce Fairness, Safety & Wage Clarity",
    unSdgLabel: "UN SDG 8: Decent Work & Economic Growth",
    switchRole: "Switch Demo Profile",
    demoModeBadge: "Demo Sandbox",
    offlineMode: "Offline Mode (Actions Queued)",
    onlineMode: "Live Sync Active",
    syncPending: "syncing pending actions...",
    listenAudio: "Listen",
    stopAudio: "Stop",
    voiceInput: "Tap to Speak",
    listening: "Listening...",
    simpleLanguageMode: "Simple Visual Language Mode",
    reduceMotion: "Reduce Animations",
    highContrast: "High Contrast",
    whyAmISeeingThis: "Why am I seeing this?",
    close: "Close",
    save: "Save",
    cancel: "Cancel",
    submit: "Submit",
    confirm: "Confirm",
    verified: "Verified",
    estimatedNotice: "Estimated based on workplace-configured policy. Not legal certification.",
    anonymousNotice: "Anonymous mode: your name, ID, and phone are never displayed to supervisors.",

    navHome: "Home",
    navShifts: "Shifts",
    navPay: "Pay Wallet",
    navSafety: "Safety",
    navFeedback: "Voice",
    navSkills: "Passport",
    navProfile: "Profile",

    greetingWorker: "Welcome",
    currentShift: "Today's Duty",
    shiftStatusCheckedIn: "You are checked in",
    shiftStatusCheckedOut: "Checked out for today",
    shiftStatusOnBreak: "On scheduled break",
    shiftStartsAt: "Shift begins at",
    shiftEndsAt: "Shift concludes at",
    checkInAction: "Check In Now",
    checkOutAction: "Check Out Now",
    startBreakAction: "Take Break",
    endBreakAction: "Resume Shift",
    checkInSuccess: "Your check-in has been logged successfully.",
    checkOutSuccess: "Your shift hours have been recorded.",
    locationConfirmed: "Worksite location verified",
    qrSimulation: "Scan Site QR Code",
    gpsSimulation: "Verify Geofence Location",
    manualFallback: "Request Supervisor Sign-off",
    supervisor: "Shift Supervisor",
    workZoneConstruction: "Work Zone / Site",
    workZoneHospital: "Ward / Unit Area",
    scheduledHours: "Scheduled Hours",
    actualHours: "Logged Hours",

    estimatedPayForMonth: "Estimated Pay for",
    paymentExpectedDate: "Payment expected by",
    baseWages: "Base Wages",
    regularHoursWorked: "Regular Hours",
    overtimeHoursWorked: "Overtime Hours",
    overtimeMultiplierLabel: "Overtime Rate Multiplier",
    allowances: "Allowances (Travel & Meal)",
    deductions: "Statutory Deductions (EPF/ESIC)",
    netEstimatedPayable: "Estimated Net Payable",
    plainPayExplanation: "Plain Language Pay Summary",
    askAboutPay: "Ask About This Pay",
    downloadPayslip: "Download / Print Payslip",
    payQuerySubmitted: "Your pay question was sent privately to payroll.",

    reportHazard: "Report a Hazard",
    safetyTitle: "Safety & Hazard Resolution",
    hazardStep1: "1. What did you observe?",
    hazardStep2: "2. Add voice, text, or photo",
    hazardStep3: "3. Choose privacy option",
    hazardCategory: "Hazard Category",
    severityLevel: "Severity Level",
    voiceNotePrompt: "Record Voice Note (Simulated)",
    photoPrompt: "Attach Evidence Photo",
    anonymousToggleLabel: "Report Anonymously",
    anonymousExplanation: "Your identity remains hidden from site supervisors and admins.",
    safetySubmittedConfirmation: "Safety incident reported. You can track resolution below.",
    ticketNumberLabel: "Ticket ID",
    whatHappensNext: "What happens next: Site lead must acknowledge within 24 hours.",
    workerVerifyResolution: "Worker Verification Required",
    didThisFixTheProblem: "Did this resolution solve the safety hazard for you?",
    yesFixed: "Yes, Hazard Resolved",
    stillAProblem: "No, Still Unsafe",

    catMissingPpe: "Missing / Damaged PPE",
    catUnsafeEquipment: "Unsafe Machinery or Scaffold",
    catFallTrip: "Fall or Trip Hazard",
    catElectrical: "Electrical or Wire Risk",
    catHeatDehydration: "Extreme Heat / Dehydration",
    catHygiene: "Hygiene & Sanitation Defect",
    catStaffingOverload: "Dangerous Staffing Shortage",
    catOther: "Other Hazard",

    sevLow: "Low Priority",
    sevMedium: "Medium Concern",
    sevHigh: "High Hazard",
    sevCritical: "Critical Emergency",

    fatigueAlertTitle: "Shift Wellbeing & Rest Alert",
    restSignalGood: "Rest schedule is healthy",
    restSignalWarning: "High cumulative hours detected",
    restSignalHigh: "Fatigue risk: insufficient rest",
    askSupervisorRest: "Consider speaking with your supervisor regarding rest between duties.",

    workerVoiceTitle: "Frontline Worker Voice",
    feedbackSubtitle: "Share honest feedback. Anonymous by default to protect your voice.",
    rateSafety: "How safe did you feel on site this week?",
    rateSupervisor: "How respectfully did supervisors treat workers?",
    rateWorkload: "Was the workload manageable?",
    ratePayClarity: "Was your shift and overtime pay clear to you?",
    rateRest: "Did you have sufficient rest time?",
    qRestBetweenShifts: "Did you receive at least 10 hours rest between consecutive shifts?",
    qSafeRaisingConcern: "Do you feel safe reporting an issue without fear of retaliation?",
    qUnderstandPay: "Do you understand your overtime hours calculation this week?",
    yes: "Yes",
    no: "No",
    privacyGuaranteeKAnon: "Strict privacy guarantee: feedback is only summarized in groups of 5 or more.",

    skillPassportTitle: "Portable Skill Passport",
    verifiedBadge: "Employer Verified",
    workerEnteredBadge: "Self-Reported Experience",
    downloadPassportCard: "Download Worker Skill Card",
  },

  ta: {
    appName: "பேர்ஷிப்ட் (FairShift)",
    appTagline: "தொழிலாளர் நேர்மை, பாதுகாப்பு மற்றும் சம்பள தெளிவு",
    unSdgLabel: "ஐ.நா SDG 8: கண்ணியமான வேலை மற்றும் பொருளாதார வளர்ச்சி",
    switchRole: "டெமோ கணக்கை மாற்றவும்",
    demoModeBadge: "மாதிரி சோதனைக் களம்",
    offlineMode: "ஆஃப்லைன் முறை (செயல்கள் வரிசையில் உள்ளன)",
    onlineMode: "இணைப்பு செயலில் உள்ளது",
    syncPending: "ஒத்திசைவு நடைபெறுகிறது...",
    listenAudio: "கேளுங்கள்",
    stopAudio: "நிறுத்து",
    voiceInput: "பேச தொடவும்",
    listening: "கேட்கிறது...",
    simpleLanguageMode: "எளிய காட்சி மொழி முறை",
    reduceMotion: "அசைவுகளை குறைக்கவும்",
    highContrast: "அதிக மாறுபட்ட வண்ணம்",
    whyAmISeeingThis: "இதை நான் ஏன் பார்க்கிறேன்?",
    close: "மூடு",
    save: "சேமி",
    cancel: "ரத்து செய்",
    submit: "சமர்ப்பி",
    confirm: "உறுதி செய்",
    verified: "சரிபார்க்கப்பட்டது",
    estimatedNotice: "பணியிட விதிகளின் அடிப்படையிலான உத்தேச கணிப்பு. சட்டப்பூர்வ சான்றிதழ் அல்ல.",
    anonymousNotice: "அநாமதேய முறை: உங்கள் பெயர், ஐடி மேற்பார்வையாளர்களுக்கு காட்டப்படாது.",

    navHome: "முகப்பு",
    navShifts: "ஷிப்டுகள்",
    navPay: "சம்பளம்",
    navSafety: "பாதுகாப்பு",
    navFeedback: "கருத்து",
    navSkills: "திறன் அட்டை",
    navProfile: "சுயவிவரம்",

    greetingWorker: "வணக்கம்",
    currentShift: "இன்றைய வேலை",
    shiftStatusCheckedIn: "வருகை பதிவு செய்யப்பட்டுள்ளது",
    shiftStatusCheckedOut: "இன்றைய பணி நிறைவுற்றது",
    shiftStatusOnBreak: "இடைவேளையில் உள்ளார்",
    shiftStartsAt: "பணி தொடங்கும் நேரம்",
    shiftEndsAt: "பணி முடியும் நேரம்",
    checkInAction: "வருகை பதிவு செய்க",
    checkOutAction: "பணி முடித்து வெளியேறுக",
    startBreakAction: "இடைவேளை எடுக்க",
    endBreakAction: "வேலையை தொடர்க",
    checkInSuccess: "வருகை வெற்றிகரமாகப் பதிவு செய்யப்பட்டது.",
    checkOutSuccess: "வேலை நேரம் கணக்கில் வைக்கப்பட்டது.",
    locationConfirmed: "பணி தளம் உறுதிப்படுத்தப்பட்டது",
    qrSimulation: "QR குறியீட்டை ஸ்கேன் செய்",
    gpsSimulation: "இருப்பிடத்தை சரிபார்க்கவும்",
    manualFallback: "மேற்பார்வையாளர் ஒப்புதல் கோரல்",
    supervisor: "ஷிப்ட் மேற்பார்வையாளர்",
    workZoneConstruction: "கட்டுமான பகுதி / தளம்",
    workZoneHospital: "மருத்துவமனை பிரிவு / வார்டு",
    scheduledHours: "திட்டமிடப்பட்ட மணிநேரம்",
    actualHours: "வேலை செய்த மணிநேரம்",

    estimatedPayForMonth: "மாதத்திற்கான உத்தேச ஊதியம்",
    paymentExpectedDate: "சம்பள உத்தேச தேதி",
    baseWages: "அடிப்படை ஊதியம்",
    regularHoursWorked: "வழக்கமான மணிநேரம்",
    overtimeHoursWorked: "கூடுதல் நேரம் (ஓவர்டைம்)",
    overtimeMultiplierLabel: "ஓவர்டைம் விகித பெருக்கல்",
    allowances: "படிகள் (பயணம் & உணவு)",
    deductions: "சட்டப்பூர்வ பிடித்தங்கள் (EPF/ESIC)",
    netEstimatedPayable: "உத்தேச நிகர ஊதியம்",
    plainPayExplanation: "எளிய சம்பள விளக்கம்",
    askAboutPay: "சம்பளம் பற்றி கேள்வி கேட்க",
    downloadPayslip: "சம்பள சீட்டை பதிவிறக்கு",
    payQuerySubmitted: "உங்கள் கேள்வி ஊதியப் பிரிவுக்கு அனுப்பப்பட்டது.",

    reportHazard: "ஆபத்தை புகாரளிக்கவும்",
    safetyTitle: "பாதுகாப்பு மற்றும் அபாயத் தீர்வு",
    hazardStep1: "1. என்ன பிரச்சினை கண்டீர்கள்?",
    hazardStep2: "2. குரல், உரை அல்லது புகைப்படம் சேர்க்கவும்",
    hazardStep3: "3. அநாமதேய முறையை தேர்வு செய்க",
    hazardCategory: "ஆபத்து வகை",
    severityLevel: "தீவிர நிலை",
    voiceNotePrompt: "குரல் பதிவு செய்க (மாதிரி)",
    photoPrompt: "புகைப்படம் இணைக்கவும்",
    anonymousToggleLabel: "பெயர் இல்லாமல் புகாரளி",
    anonymousExplanation: "உங்கள் அடையாளம் மேற்பார்வையாளர்களுக்கு தெரியாது.",
    safetySubmittedConfirmation: "புகார் பதிவு செய்யப்பட்டது. கீழே கண்காணிக்கலாம்.",
    ticketNumberLabel: "டிக்கெட் எண்",
    whatHappensNext: "அடுத்த நடவடிக்கை: மேற்பார்வையாளர் 24 மணி நேரத்திற்குள் பரிசீலிப்பார்.",
    workerVerifyResolution: "தொழிலாளர் உறுதிப்படுத்தல் தேவை",
    didThisFixTheProblem: "இந்த நடவடிக்கை பிரச்சனையை தீர்த்துவிட்டதா?",
    yesFixed: "ஆம், பிரச்சனை தீர்க்கப்பட்டது",
    stillAProblem: "இல்லை, இன்னும் ஆபத்தாக உள்ளது",

    catMissingPpe: "பாதுகாப்பு கவசம் இல்லை (PPE)",
    catUnsafeEquipment: "பாதுகாப்பற்ற இயந்திரம் / சாரக்கட்டு",
    catFallTrip: "கீழே விழும் ஆபத்து",
    catElectrical: "மின்சார கம்பி ஆபத்து",
    catHeatDehydration: "கடுமையான வெப்பம் / நீர்ச்சத்து குறைவு",
    catHygiene: "சுகாதார குறைபாடு",
    catStaffingOverload: "பணியாளர்கள் பற்றாக்குறை அழுத்தம்",
    catOther: "இதர ஆபத்து",

    sevLow: "குறைந்த முன்னுரிமை",
    sevMedium: "நடுத்தர கவனம்",
    sevHigh: "அதிக ஆபத்து",
    sevCritical: "அவசர நிலை",

    fatigueAlertTitle: "களைப்பு மற்றும் ஓய்வு எச்சரிக்கை",
    restSignalGood: "ஓய்வு அட்டவணை நலமாக உள்ளது",
    restSignalWarning: "அதிக தொடர் வேலை நேரம் உள்ளது",
    restSignalHigh: "களைப்பு ஆபத்து: போதுமான ஓய்வு இல்லை",
    askSupervisorRest: "ஓய்வு குறித்து மேற்பார்வையாளரிடம் பேசுங்கள்.",

    workerVoiceTitle: "தொழிலாளர் குரல்",
    feedbackSubtitle: "நேர்மையான கருத்துக்களை பகிருங்கள். உங்கள் குரல் பாதுகாப்பானது.",
    rateSafety: "இந்த வாரம் தளத்தில் எவ்வளவு பாதுகாப்பாக உணர்ந்தீர்கள்?",
    rateSupervisor: "மேற்பார்வையாளர்கள் மரியாதையுடன் நடத்தினார்களா?",
    rateWorkload: "வேலை சுமை தகுந்ததாக இருந்ததா?",
    ratePayClarity: "சம்பளம் மற்றும் ஓவர்டைம் தெளிவாக தெரிந்ததா?",
    rateRest: "போதுமான ஓய்வு நேரம் கிடைத்ததா?",
    qRestBetweenShifts: "ஷிப்டுகளுக்கு இடையே 10 மணி நேர ஓய்வு கிடைத்ததா?",
    qSafeRaisingConcern: "பயம் இல்லாமல் புகார் அளிக்க முடிகிறதா?",
    qUnderstandPay: "இந்த வார சம்பள கணக்கு புரிந்ததா?",
    yes: "ஆம்",
    no: "இல்லை",
    privacyGuaranteeKAnon: "தனியுரிமை உறுதி: 5 பேருக்கு மேல் இருந்தால் மட்டுமே தொகுப்பாக காட்டப்படும்.",

    skillPassportTitle: "திறன் பாஸ்போர்ட்",
    verifiedBadge: "நிறுவனம் சரிபார்த்தது",
    workerEnteredBadge: "சுய-பதிவு செய்யப்பட்ட அனுபவம்",
    downloadPassportCard: "திறன் அட்டையை பதிவிறக்கு",
  },

  hi: {
    appName: "फेयरशिफ्ट (FairShift)",
    appTagline: "श्रमिक न्याय, कार्यस्थल सुरक्षा और पारदर्शी वेतन",
    unSdgLabel: "संयुक्त राष्ट्र SDG 8: गरिमापूर्ण कार्य और आर्थिक विकास",
    switchRole: "डेमो प्रोफाइल बदलें",
    demoModeBadge: "डेमो सैंडबॉक्स",
    offlineMode: "ऑफलाइन मोड (कार्रवाई कतार में है)",
    onlineMode: "लाइव सिंक सक्रिय",
    syncPending: "सिंक हो रहा है...",
    listenAudio: "सुनें",
    stopAudio: "रोकें",
    voiceInput: "बोलने के लिए दबाएं",
    listening: "सुन रहे हैं...",
    simpleLanguageMode: "सरल दृश्य भाषा मोड",
    reduceMotion: "एनीमेशन कम करें",
    highContrast: "उच्च कंट्रास्ट",
    whyAmISeeingThis: "मैं यह क्यों देख रहा हूँ?",
    close: "बंद करें",
    save: "सहेजें",
    cancel: "रद्द करें",
    submit: "जमा करें",
    confirm: "पुष्टि करें",
    verified: "सत्यापित",
    estimatedNotice: "कार्यस्थल नीति के आधार पर अनुमानित गणना। कानूनी प्रमाण नहीं।",
    anonymousNotice: "गुमनाम मोड: आपका नाम या फोन सुपरवाइजर को कभी नहीं दिखेगा।",

    navHome: "होम",
    navShifts: "शिफ्ट",
    navPay: "वेतन वॉलेट",
    navSafety: "सुरक्षा",
    navFeedback: "आवाज",
    navSkills: "कौशल",
    navProfile: "प्रोफाइल",

    greetingWorker: "नमस्ते",
    currentShift: "आज की ड्यूटी",
    shiftStatusCheckedIn: "आपकी हाजिरी दर्ज है",
    shiftStatusCheckedOut: "आज की ड्यूटी समाप्त",
    shiftStatusOnBreak: "लंच / आराम ब्रेक पर हैं",
    shiftStartsAt: "शिफ्ट शुरू होने का समय",
    shiftEndsAt: "शिफ्ट समाप्त होने का समय",
    checkInAction: "चेक इन करें",
    checkOutAction: "चेक आउट करें",
    startBreakAction: "ब्रेक लें",
    endBreakAction: "काम पुनः शुरू करें",
    checkInSuccess: "आपकी उपस्थिति सफलतापूर्वक दर्ज हो गई।",
    checkOutSuccess: "आपके काम के घंटे रिकॉर्ड कर लिए गए हैं।",
    locationConfirmed: "कार्यस्थल स्थान सत्यापित",
    qrSimulation: "साइट क्यूआर कोड स्कैन करें",
    gpsSimulation: "जीपीएस स्थान सत्यापित करें",
    manualFallback: "सुपरवाइजर साइन-ऑफ अनुरोध",
    supervisor: "शिफ्ट सुपरवाइजर",
    workZoneConstruction: "निर्माण स्थल / ज़ोन",
    workZoneHospital: "अस्पताल वार्ड / यूनिट",
    scheduledHours: "निर्धारित घंटे",
    actualHours: "काम किए गए घंटे",

    estimatedPayForMonth: "माह का अनुमानित वेतन",
    paymentExpectedDate: "भुगतान की संभावित तारीख",
    baseWages: "मूल वेतन",
    regularHoursWorked: "सामान्य घंटे",
    overtimeHoursWorked: "ओवरटाइम घंटे",
    overtimeMultiplierLabel: "ओवरटाइम दर गुणक",
    allowances: "भत्ते (यात्रा व भोजन)",
    deductions: "कटौती (EPF / ESIC)",
    netEstimatedPayable: "अनुमानित शुद्ध देय राशि",
    plainPayExplanation: "सरल भाषा में वेतन विवरण",
    askAboutPay: "वेतन के बारे में पूछें",
    downloadPayslip: "पेस्लिप डाउनलोड / प्रिंट करें",
    payQuerySubmitted: "आपका सवाल पेरोल टीम को सुरक्षित भेज दिया गया है।",

    reportHazard: "खतरे की रिपोर्ट करें",
    safetyTitle: "सुरक्षा और खतरा निवारण",
    hazardStep1: "1. आपने क्या खतरा देखा?",
    hazardStep2: "2. आवाज, संदेश या फोटो जोड़ें",
    hazardStep3: "3. गोपनीयता चुनें",
    hazardCategory: "खतरे की श्रेणी",
    severityLevel: "गंभीरता का स्तर",
    voiceNotePrompt: "आवाज रिकॉर्ड करें (डेमो)",
    photoPrompt: "तस्वीर जोड़ें",
    anonymousToggleLabel: "गुमनाम रहकर रिपोर्ट करें",
    anonymousExplanation: "आपकी पहचान सुपरवाइजर या एडमिन से छुपी रहेगी।",
    safetySubmittedConfirmation: "रिपोर्ट दर्ज कर ली गई है। प्रगति नीचे ट्रैक करें।",
    ticketNumberLabel: "शिकायत संख्या (Ticket ID)",
    whatHappensNext: "अगला कदम: 24 घंटे में सुपरवाइजर निवारण शुरू करेगा।",
    workerVerifyResolution: "कर्मचारी सत्यापन आवश्यक",
    didThisFixTheProblem: "क्या इस कदम से आपकी सुरक्षा समस्या हल हुई?",
    yesFixed: "हाँ, खतरा टल गया",
    stillAProblem: "नहीं, अभी भी असुरक्षित है",

    catMissingPpe: "सुरक्षा गियर (PPE) नहीं मिला",
    catUnsafeEquipment: "असुरक्षित उपकरण या मचान",
    catFallTrip: "फिसलने या गिरने का खतरा",
    catElectrical: "बिजली का खुला तार / खतरा",
    catHeatDehydration: "अत्यधिक गर्मी / पानी की कमी",
    catHygiene: "साफ-सफाई या स्वच्छता की कमी",
    catStaffingOverload: "कर्मचारियों की भारी कमी",
    catOther: "अन्य खतरा",

    sevLow: "सामान्य",
    sevMedium: "मध्यम ध्यान",
    sevHigh: "उच्च खतरा",
    sevCritical: "गंभीर आपातकाल",

    fatigueAlertTitle: "थकान और आराम चेतावनी",
    restSignalGood: "आराम की स्थिति सामान्य है",
    restSignalWarning: "लगातार अधिक काम के घंटे दर्ज",
    restSignalHigh: "थकान का जोखिम: अपर्याप्त आराम",
    askSupervisorRest: "कृपया शिफ्ट के बीच आराम के लिए अपने सुपरवाइजर से बात करें।",

    workerVoiceTitle: "मजदूर की आवाज",
    feedbackSubtitle: "सच्चा फीडबैक दें। आपकी सुरक्षा के लिए यह पूरी तरह गोपनीय है।",
    rateSafety: "इस सप्ताह कार्यस्थल पर आप कितने सुरक्षित महसूस कर रहे थे?",
    rateSupervisor: "क्या सुपरवाइजर ने सम्मानजनक व्यवहार किया?",
    rateWorkload: "क्या काम का बोझ सामान्य था?",
    ratePayClarity: "क्या आपको अपना वेतन और ओवरटाइम हिसाब स्पष्ट था?",
    rateRest: "क्या आपको पर्याप्त आराम मिला?",
    qRestBetweenShifts: "क्या दो शिफ्टों के बीच कम से कम 10 घंटे का आराम मिला?",
    qSafeRaisingConcern: "क्या आप बिना किसी डर के समस्या उठा सकते हैं?",
    qUnderstandPay: "क्या आपको इस सप्ताह के ओवरटाइम का हिसाब समझ आया?",
    yes: "हाँ",
    no: "नहीं",
    privacyGuaranteeKAnon: "गोपनीयता वादा: फीडबैक कम से कम 5 लोगों के समूह में ही दिखाया जाता है।",

    skillPassportTitle: "कौशल पासपोर्ट",
    verifiedBadge: "कंपनी द्वारा सत्यापित",
    workerEnteredBadge: "स्वयं दर्ज किया गया अनुभव",
    downloadPassportCard: "कौशल कार्ड डाउनलोड करें",
  },

  te: {
    appName: "ఫెయిర్‌షిఫ్ట్ (FairShift)",
    appTagline: "కార్మికుల న్యాయం, భద్రత మరియు వేతన స్పష్టత",
    unSdgLabel: "ఐక్యరాజ్యసమితి SDG 8: గౌరవప్రదమైన పని & ఆర్థిక వృద్ధి",
    switchRole: "డెమో ప్రొఫైల్ మార్చండి",
    demoModeBadge: "డెమో శాండ్‌బాక్స్",
    offlineMode: "ఆఫ్‌లైన్ మోడ్ (చర్యలు క్యూలో ఉన్నాయి)",
    onlineMode: "లైవ్ సింక్ యాక్టివ్",
    syncPending: "సమకాలీకరణ జరుగుతోంది...",
    listenAudio: "వినండి",
    stopAudio: "ఆపండి",
    voiceInput: "మాట్లాడటానికి తాకండి",
    listening: "వింటోంది...",
    simpleLanguageMode: "సరళమైన దృశ్య భాషా విధానం",
    reduceMotion: "యానిమేషన్లు తగ్గించండి",
    highContrast: "అధిక కాంట్రాస్ట్",
    whyAmISeeingThis: "నేను దీన్ని ఎందుకు చూస్తున్నాను?",
    close: "మూసివేయి",
    save: "సేవ్ చేయి",
    cancel: "రద్దు చేయి",
    submit: "సమర్పించు",
    confirm: "నిర్ధారించు",
    verified: "ధృవీకరించబడింది",
    estimatedNotice: "కార్యాలయ నిబంధనల ఆధారంగా అంచనా వేయబడింది. చట్టపరమైన సర్టిఫికేషన్ కాదు.",
    anonymousNotice: "అనామక మోడ్: మీ పేరు, ఫోన్ నంబర్ సూపర్వైజర్లకు ఎప్పటికీ కనిపించవు.",

    navHome: "హోమ్",
    navShifts: "షిఫ్టులు",
    navPay: "జీతం వాలెట్",
    navSafety: "భద్రత",
    navFeedback: "అభిప్రాయం",
    navSkills: "నైపుణ్యాలు",
    navProfile: "ప్రొఫైల్",

    greetingWorker: "నమస్కారం",
    currentShift: "నేటి విధి",
    shiftStatusCheckedIn: "హాజరు నమోదైంది",
    shiftStatusCheckedOut: "నేటి డ్యూటీ ముగిసింది",
    shiftStatusOnBreak: "విరామంలో ఉన్నారు",
    shiftStartsAt: "షిఫ్ట్ ప్రారంభ సమయం",
    shiftEndsAt: "షిఫ్ట్ ముగింపు సమయం",
    checkInAction: "ఇప్పుడే చెక్-ఇన్ చేయండి",
    checkOutAction: "చెక్-అవుట్ చేయండి",
    startBreakAction: "విరామం తీసుకోండి",
    endBreakAction: "పని కొనసాగించండి",
    checkInSuccess: "మీ హాజరు విజయవంతంగా నమోదైంది.",
    checkOutSuccess: "పని గంటలు రికార్డ్ చేయబడ్డాయి.",
    locationConfirmed: "పని ప్రదేశం నిర్ధారించబడింది",
    qrSimulation: "సైట్ QR కోడ్ స్కాన్ చేయండి",
    gpsSimulation: "లొకేషన్ నిర్ధారించండి",
    manualFallback: "సూపర్వైజర్ ఆమోదం అభ్యర్థన",
    supervisor: "షిఫ్ట్ సూపర్వైజర్",
    workZoneConstruction: "నిర్మాణ ప్రాంతం / సైట్",
    workZoneHospital: "ఆసుపత్రి వార్డు / యూనిట్",
    scheduledHours: "కేటాయించిన గంటలు",
    actualHours: "పనిచేసిన గంటలు",

    estimatedPayForMonth: "నెల అంచనా వేతనం",
    paymentExpectedDate: "జీతం చెల్లింపు అంచనా తేదీ",
    baseWages: "ప్రాథమిక వేతనం",
    regularHoursWorked: "సాధారణ గంటలు",
    overtimeHoursWorked: "ఓవర్‌టైమ్ గంటలు",
    overtimeMultiplierLabel: "ఓవర్‌టైమ్ రేట్ గుణకం",
    allowances: "భత్యాలు (ప్రయాణం & భోజనం)",
    deductions: "మినహాయింపులు (EPF / ESIC)",
    netEstimatedPayable: "అంచనా నికర వేతనం",
    plainPayExplanation: "సరళమైన వేతన వివరణ",
    askAboutPay: "జీతం గురించి ప్రశ్నించండి",
    downloadPayslip: "పేస్లిప్ డౌన్‌లోడ్ / ప్రింట్ చేయండి",
    payQuerySubmitted: "మీ ప్రశ్న పేరోల్ విభాగానికి సురక్షితంగా పంపబడింది.",

    reportHazard: "ప్రమాదాన్ని నివేదించండి",
    safetyTitle: "భద్రత & ప్రమాద పరిష్కారం",
    hazardStep1: "1. మీరు ఏమి ప్రమాదం గమనించారు?",
    hazardStep2: "2. వాయిస్, మెసేజ్ లేదా ఫోటో జోడించండి",
    hazardStep3: "3. గోప్యతను ఎంచుకోండి",
    hazardCategory: "ప్రమాద వర్గం",
    severityLevel: "తీవ్రత స్థాయి",
    voiceNotePrompt: "వాయిస్ రికార్డ్ చేయండి (డెమో)",
    photoPrompt: "ఫోటో జోడించండి",
    anonymousToggleLabel: "అనామకంగా నివేదించండి",
    anonymousExplanation: "మీ గుర్తింపు సూపర్వైజర్లకు కనిపించదు.",
    safetySubmittedConfirmation: "నివేదిక నమోదైంది. స్థితిని క్రింద చూడండి.",
    ticketNumberLabel: "టికెట్ నంబర్",
    whatHappensNext: "తదుపరి చర్య: 24 గంటల్లో సూపర్వైజర్ పరిశీలిస్తారు.",
    workerVerifyResolution: "కార్మికుల నిర్ధారణ అవసరం",
    didThisFixTheProblem: "ఈ పరిష్కారంతో ప్రమాదం తొలగిపోయిందా?",
    yesFixed: "అవును, ప్రమాదం పరిష్కారమైంది",
    stillAProblem: "లేదు, ఇంకా ప్రమాదకరంగా ఉంది",

    catMissingPpe: "భద్రతా పరికరాలు లేవు (PPE)",
    catUnsafeEquipment: "సురక్షితం కాని యంత్రాలు / నిచ్చెనలు",
    catFallTrip: "జారిపడే ప్రమాదం",
    catElectrical: "విద్యుత్ తీగల ప్రమాదం",
    catHeatDehydration: "తీవ్రమైన ఎండ / డీహైడ్రేషన్",
    catHygiene: "పరిశుభ్రత లోపం",
    catStaffingOverload: "సిబ్బంది కొరత ఒత్తిడి",
    catOther: "ఇతర ప్రమాదం",

    sevLow: "తక్కువ ప్రాధాన్యత",
    sevMedium: "మధ్యస్థ శ్రద్ధ",
    sevHigh: "అధిక ప్రమాదం",
    sevCritical: "తీవ్ర అత్యవసర పరిస్థితి",

    fatigueAlertTitle: "అలసట & విశ్రాంతి హెచ్చరిక",
    restSignalGood: "విశ్రాంతి షెడ్యూల్ బాగుంది",
    restSignalWarning: "ఎక్కువ పని గంటలు నమోదయ్యాయి",
    restSignalHigh: "అలసట ప్రమాదం: తగినంత విశ్రాంతి లేదు",
    askSupervisorRest: "విశ్రాంతి సమయం కోసం సూపర్వైజర్‌తో మాట్లాడండి.",

    workerVoiceTitle: "కార్మికుని స్వరం",
    feedbackSubtitle: "నిజాయితీగా అభిప్రాయాన్ని పంచుకోండి. ఇది పూర్తిగా గోప్యమైనది.",
    rateSafety: "ఈ వారం సైట్‌లో ఎంత సురక్షితంగా అనిపించింది?",
    rateSupervisor: "సూపర్వైజర్లు గౌరవంగా ప్రవర్తించారా?",
    rateWorkload: "పని భారం భరించదగినదేనా?",
    ratePayClarity: "జీతం మరియు ఓవర్‌టైమ్ వివరాలు స్పష్టంగా ఉన్నాయా?",
    rateRest: "సరిపడా విశ్రాంతి సమయం దొరికిందా?",
    qRestBetweenShifts: "రెండు షిఫ్ట్‌ల మధ్య కనీసం 10 గంటల విశ్రాంతి లభించిందా?",
    qSafeRaisingConcern: "భయం లేకుండా సమస్యను అధికారులకు చెప్పగలరా?",
    qUnderstandPay: "ఈ వారం ఓవర్‌టైమ్ లెక్క మీకు అర్థమైందా?",
    yes: "అవును",
    no: "కాదు",
    privacyGuaranteeKAnon: "గోప్యతా హామీ: 5 కంటే ఎక్కువ మంది ఉన్నప్పుడే సమగ్రంగా చూపబడుతుంది.",

    skillPassportTitle: "నైపుణ్య పాస్‌పోర్ట్",
    verifiedBadge: "సంస్థ ధృవీకరించినది",
    workerEnteredBadge: "స్వయంగా నమోదు చేసిన అనుభవం",
    downloadPassportCard: "నైపుణ్య కార్డును డౌన్‌లోడ్ చేయండి",
  },
};
