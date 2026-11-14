// ResolveX Enterprise Civic Technology Platform
// Database Seed with Measurable Timestamps, 10 Departments, Officers Roster, and Stage Histories

const INITIAL_DEPARTMENTS = [
  {
    id: "water_supply",
    name: "Water Supply Department",
    icon: "droplet",
    slaHours: 24,
    color: "#0284c7",
    headOfficer: "Er. Vikram Patel",
    officerRole: "Superintending Hydraulic Engineer",
    contact: "watersupply@citygov.org",
    zones: ["North Ward", "South Ward", "East Ward", "West Ward", "Central Ward"],
    scope: "Drinking water pipelines, water main bursts, tanker supply, contamination, water pressure issues"
  },
  {
    id: "electricity",
    name: "Electricity Department",
    icon: "zap",
    slaHours: 12,
    color: "#eab308",
    headOfficer: "K. Mohan",
    officerRole: "Chief Electrical Grid Officer",
    contact: "electricity@citygov.org",
    zones: ["North Ward", "South Ward", "East Ward", "West Ward", "Central Ward"],
    scope: "High-voltage wires, transformers, power outages, sparking cables, electrical hazards"
  },
  {
    id: "roads_infra",
    name: "Road and Infrastructure Department",
    icon: "construction",
    slaHours: 36,
    color: "#f97316",
    headOfficer: "Er. Rajesh Sharma",
    officerRole: "Executive Road Engineer",
    contact: "roads@citygov.org",
    zones: ["North Ward", "South Ward", "East Ward", "West Ward", "Central Ward"],
    scope: "Potholes, asphalt damage, road dividers, flyovers, cave-ins, footpaths, bridges"
  },
  {
    id: "sanitation_waste",
    name: "Sanitation and Waste Management Department",
    icon: "trash-2",
    slaHours: 24,
    color: "#10b981",
    headOfficer: "Dr. Ananya Roy",
    officerRole: "Director - Solid Waste Operations",
    contact: "sanitation@citygov.org",
    zones: ["North Ward", "South Ward", "East Ward", "West Ward", "Central Ward"],
    scope: "Uncollected garbage, overflowing bins, open dumps, road sweeping, dead animals, organic waste"
  },
  {
    id: "drainage_sewerage",
    name: "Drainage and Sewerage Department",
    icon: "disc",
    slaHours: 24,
    color: "#06b6d4",
    headOfficer: "Er. S. Narayanan",
    officerRole: "Sewerage Network Superintendent",
    contact: "drainage@citygov.org",
    zones: ["North Ward", "South Ward", "East Ward", "West Ward", "Central Ward"],
    scope: "Blocked storm drains, overflowing sewer manholes, wastewater regurgitation, open gutters"
  },
  {
    id: "public_health",
    name: "Public Health Department",
    icon: "shield-alert",
    slaHours: 48,
    color: "#ec4899",
    headOfficer: "Dr. Meera Nambiar",
    officerRole: "Chief Medical & Health Inspector",
    contact: "health@citygov.org",
    zones: ["North Ward", "South Ward", "East Ward", "West Ward", "Central Ward"],
    scope: "Mosquito breeding/dengue prevention, stagnant water fumigation, epidemics, biomedical waste"
  },
  {
    id: "streetlight",
    name: "Streetlight Department",
    icon: "sun",
    slaHours: 12,
    color: "#f59e0b",
    headOfficer: "M. Venkatesh",
    officerRole: "Assistant Executive Lighting Engineer",
    contact: "streetlights@citygov.org",
    zones: ["North Ward", "South Ward", "East Ward", "West Ward", "Central Ward"],
    scope: "Defunct streetlights, flickering lamps, dark avenues, broken timer switches, solar lamps"
  },
  {
    id: "traffic_mgmt",
    name: "Traffic Management Department",
    icon: "navigation",
    slaHours: 18,
    color: "#8b5cf6",
    headOfficer: "Insp. Harish Kumar",
    officerRole: "Traffic Automation Control Wing",
    contact: "traffic@citygov.org",
    zones: ["North Ward", "South Ward", "East Ward", "West Ward", "Central Ward"],
    scope: "Traffic signal malfunction, damaged speed breakers, missing signboards, roadside parking blockades"
  },
  {
    id: "parks_public_spaces",
    name: "Parks and Public Spaces Department",
    icon: "feather",
    slaHours: 48,
    color: "#14b8a6",
    headOfficer: "S. Nalini",
    officerRole: "Horticulture & Landscape Superintendent",
    contact: "parks@citygov.org",
    zones: ["North Ward", "South Ward", "East Ward", "West Ward", "Central Ward"],
    scope: "Fallen tree branches, damaged park benches, broken children play equipment, overgrown vegetation"
  },
  {
    id: "other_departments",
    name: "Other Municipal Services",
    icon: "layers",
    slaHours: 72,
    color: "#64748b",
    headOfficer: "Grievance Officer",
    officerRole: "Central Administration Grievance Officer",
    contact: "civicadmin@citygov.org",
    zones: ["North Ward", "South Ward", "East Ward", "West Ward", "Central Ward"],
    scope: "Encroachment, noise pollution, stray animal control, civic licensing, unclassified public grievances"
  }
];

// Officers Roster with Workload Tracking
const INITIAL_OFFICERS = [
  { id: "off-01", name: "Er. Rajesh Sharma", department: "Road and Infrastructure Department", zone: "North Ward", activeTickets: 6, maxCapacity: 10, rating: 4.8 },
  { id: "off-02", name: "Dr. Ananya Roy", department: "Sanitation and Waste Management Department", zone: "East Ward", activeTickets: 3, maxCapacity: 10, rating: 4.9 },
  { id: "off-03", name: "Er. Vikram Patel", department: "Water Supply Department", zone: "Central Ward", activeTickets: 8, maxCapacity: 10, rating: 4.2 },
  { id: "off-04", name: "Er. S. Narayanan", department: "Drainage and Sewerage Department", zone: "South Ward", activeTickets: 5, maxCapacity: 10, rating: 4.7 },
  { id: "off-05", name: "K. Mohan", department: "Electricity Department", zone: "West Ward", activeTickets: 2, maxCapacity: 8, rating: 4.9 },
  { id: "off-06", name: "M. Venkatesh", department: "Streetlight Department", zone: "West Ward", activeTickets: 4, maxCapacity: 10, rating: 4.6 },
  { id: "off-07", name: "Insp. Harish Kumar", department: "Traffic Management Department", zone: "Central Ward", activeTickets: 3, maxCapacity: 8, rating: 4.8 },
  { id: "off-08", name: "Dr. Meera Nambiar", department: "Public Health Department", zone: "North Ward", activeTickets: 5, maxCapacity: 10, rating: 4.5 },
  { id: "off-09", name: "S. Nalini", department: "Parks and Public Spaces Department", zone: "South Ward", activeTickets: 2, maxCapacity: 8, rating: 4.7 }
];

// Administrative Division Hierarchy (Area, Ward, Village, Locality)
const ADMINISTRATIVE_AREAS = [
  { id: "ward-101", name: "Ward 101 - Central Commercial Hub", locality: "MG Road & Brigade Road", zone: "Central Ward", type: "Ward" },
  { id: "ward-102", name: "Ward 102 - North Tech Corridor & Hebbal", locality: "Hebbal Junction", zone: "North Ward", type: "Ward" },
  { id: "ward-103", name: "Ward 103 - Green Valley Village (Panchayat)", locality: "Green Valley Grama", zone: "East Ward", type: "Village" },
  { id: "ward-104", name: "Ward 104 - Lakeside Township & Bellandur", locality: "Lakeside Sector 4", zone: "East Ward", type: "Locality" },
  { id: "ward-105", name: "Ward 105 - Peenya Industrial Sector", locality: "Peenya Industrial Area Phase 2", zone: "West Ward", type: "Area" },
  { id: "ward-106", name: "Ward 106 - Old Heritage Market & Fort", locality: "City Market Annex", zone: "South Ward", type: "Ward" },
  { id: "ward-107", name: "Ward 107 - Shanti Nagar Residential Suburb", locality: "Double Road Suburb", zone: "South Ward", type: "Locality" },
  { id: "ward-108", name: "Ward 108 - Kengeri Rural Village Cluster", locality: "Kengeri Satellite Village", zone: "West Ward", type: "Village" }
];

// 1-Click Demo Scenarios
const SAMPLE_PRESETS = [
  {
    id: "preset-garbage",
    title: "Huge Garbage Accumulation Near Residential Apartments",
    text: "There is a huge amount of garbage accumulated near our residential area for the past 5 days. Rotting food waste, plastic bags torn by street dogs, foul stench spreading into homes, posing severe health hazards.",
    location: "Lane 4, Model Colony Market",
    locality: "Model Colony Suburb",
    ward: "Ward 103 - Green Valley Village (Panchayat)",
    lat: 12.9610,
    lng: 77.6387,
    expectedDept: "Sanitation and Waste Management Department",
    expectedPriority: "HIGH",
    images: [
      "https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: "preset-live-wire",
    title: "Snapped High-Tension Electrical Cable Sparking Over Footpath",
    text: "Live high-voltage electrical cable snapped and hanging 4 feet above busy school footpath. Cable is actively sparking and smoking. Immediate risk of human electrocution.",
    location: "Bus Stop 14, Ring Road, Peenya",
    locality: "Peenya Industrial Area Phase 2",
    ward: "Ward 105 - Peenya Industrial Sector",
    lat: 12.9542,
    lng: 77.5412,
    expectedDept: "Electricity Department",
    expectedPriority: "CRITICAL",
    images: [
      "https://images.unsplash.com/photo-1508873696983-2df5293cbdaf?w=600&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: "preset-pothole",
    title: "Deep Asphalt Crater on High-Speed Outer Ring Road",
    text: "Dangerous deep pothole crater in the center lane of Outer Ring Road near Metro Pillar 142. Asphalt has caved in, causing multiple two-wheeler accidents and severe vehicle damage.",
    location: "Metro Pillar 142, Outer Ring Road",
    locality: "Hebbal Junction",
    ward: "Ward 102 - North Tech Corridor & Hebbal",
    lat: 12.9825,
    lng: 77.5960,
    expectedDept: "Road and Infrastructure Department",
    expectedPriority: "VERY HIGH",
    images: [
      "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578874691223-a4926742930f?w=600&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: "preset-sewerage",
    title: "Underground Sewerage Manhole Overflowing Black Sludge",
    text: "Main underground drainage manhole is regurgitating toxic black sewage and human waste directly onto the pedestrian footpath. Foul odor, pedestrians forced into road traffic.",
    location: "Near City Market Bus Stand",
    locality: "City Market Annex",
    ward: "Ward 106 - Old Heritage Market & Fort",
    lat: 12.9630,
    lng: 77.5750,
    expectedDept: "Drainage and Sewerage Department",
    expectedPriority: "VERY HIGH",
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80"
    ]
  }
];

// Rich Historical Dataset with Measurable Timestamps Across All 11 Stages
const INITIAL_HISTORICAL_TICKETS = [
  {
    id: "CIT-2026-1001",
    title: "Deep asphalt crater on main express corridor",
    text: "Asphalt crater and road crack causing vehicle chassis damage",
    department: "Road and Infrastructure Department",
    zone: "North Ward",
    ward: "Ward 102 - North Tech Corridor & Hebbal",
    locality: "Hebbal Flyover Ramp",
    assignedOfficer: "Er. Rajesh Sharma",
    keywords: ["asphalt", "crater", "road crack", "vehicle damage"],
    priority: "VERY HIGH",
    priorityReason: "High-speed arterial road crater poses severe multi-vehicle collision risk.",
    status: "Resolved",
    targetSlaHours: 36,
    actualHours: 78,
    lagHours: 42,
    isOverdue: true,
    rootCause: "Hot mix asphalt material shortage and delayed contractor machinery",
    location: "Bellary Road, North Ward",
    lat: 12.9825,
    lng: 77.5960,
    images: ["https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80"],
    resolutionPhoto: "https://images.unsplash.com/photo-1578874691223-a4926742930f?w=600&auto=format&fit=crop&q=80",
    resolutionRemarks: "Bitumen hot-mix resurfacing completed. Road opened to heavy traffic.",
    stageTimestamps: {
      submitted: "2026-11-01T08:30:00Z",
      aiAnalysed: "2026-11-01T08:31:00Z",
      confirmed: "2026-11-01T08:35:00Z",
      forwarded: "2026-11-01T08:36:00Z",
      officerAssigned: "2026-11-01T12:00:00Z",
      investigationStarted: "2026-11-02T16:00:00Z", // 28h delay in assignment to investigation!
      workStarted: "2026-11-03T10:00:00Z",
      resolutionSubmitted: "2026-11-04T12:00:00Z",
      resolved: "2026-11-04T14:30:00Z"
    },
    movementHistory: [
      { status: "Submitted", timestamp: "2026-11-01T08:30:00Z", actor: "Citizen", remarks: "Complaint registered with photos" },
      { status: "AI Analysed", timestamp: "2026-11-01T08:31:00Z", actor: "AI Agent", remarks: "Priority assessed: VERY HIGH" },
      { status: "Awaiting Citizen Confirmation", timestamp: "2026-11-01T08:31:30Z", actor: "AI Agent", remarks: "Verification message displayed" },
      { status: "Forwarded to Department", timestamp: "2026-11-01T08:35:00Z", actor: "System", remarks: "Citizen confirmed routing" },
      { status: "Assigned to Officer", timestamp: "2026-11-01T12:00:00Z", actor: "Dept Head", remarks: "Assigned to Er. Rajesh Sharma" },
      { status: "Under Investigation", timestamp: "2026-11-02T16:00:00Z", actor: "Er. Rajesh Sharma", remarks: "Field inspection of crater depth" },
      { status: "Work in Progress", timestamp: "2026-11-03T10:00:00Z", actor: "Er. Rajesh Sharma", remarks: "Hot mix asphalt pouring initiated" },
      { status: "Resolution Submitted", timestamp: "2026-11-04T12:00:00Z", actor: "Er. Rajesh Sharma", remarks: "Completion photos uploaded" },
      { status: "Resolved", timestamp: "2026-11-04T14:30:00Z", actor: "Citizen", remarks: "Citizen verified and closed" }
    ]
  },
  {
    id: "CIT-2026-1002",
    title: "Drinking water main pipeline burst flooding basement",
    text: "Water supply pipeline joint ruptured gushing thousands of liters of potable water into street",
    department: "Water Supply Department",
    zone: "Central Ward",
    ward: "Ward 101 - Central Commercial Hub",
    locality: "MG Road Metro Station",
    assignedOfficer: "Er. Vikram Patel",
    keywords: ["water supply", "pipeline burst", "clean water leak", "flooding"],
    priority: "HIGH",
    priorityReason: "Massive treated drinking water wastage and building basement flooding.",
    status: "Under Investigation",
    targetSlaHours: 24,
    actualHours: 48,
    lagHours: 24,
    isOverdue: true,
    rootCause: "Delay between officer assignment and initial investigation due to officer overload.",
    location: "MG Road Metro Station, Central Ward",
    lat: 12.9774,
    lng: 77.5708,
    images: ["https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80"],
    resolutionPhoto: null,
    resolutionRemarks: null,
    stageTimestamps: {
      submitted: "2026-11-12T09:00:00Z",
      aiAnalysed: "2026-11-12T09:01:00Z",
      confirmed: "2026-11-12T09:05:00Z",
      forwarded: "2026-11-12T09:06:00Z",
      officerAssigned: "2026-11-12T14:00:00Z",
      investigationStarted: "2026-11-14T08:00:00Z", // High bottleneck here!
      workStarted: null,
      resolutionSubmitted: null,
      resolved: null
    },
    movementHistory: [
      { status: "Submitted", timestamp: "2026-11-12T09:00:00Z", actor: "Citizen", remarks: "Complaint submitted" },
      { status: "AI Analysed", timestamp: "2026-11-12T09:01:00Z", actor: "AI Agent", remarks: "Priority assessed: HIGH" },
      { status: "Forwarded to Department", timestamp: "2026-11-12T09:05:00Z", actor: "System", remarks: "Dispatched to Water Supply" },
      { status: "Assigned to Officer", timestamp: "2026-11-12T14:00:00Z", actor: "Dept Head", remarks: "Assigned to Er. Vikram Patel" },
      { status: "Under Investigation", timestamp: "2026-11-14T08:00:00Z", actor: "Er. Vikram Patel", remarks: "Valve isolation inspection initiated" }
    ]
  },
  {
    id: "CIT-2026-1003",
    title: "Choked sewer regurgitating toxic black sludge onto street",
    text: "Underground sewerage manhole overflowing black sludge onto pedestrian footpath near school",
    department: "Drainage and Sewerage Department",
    zone: "South Ward",
    ward: "Ward 106 - Old Heritage Market & Fort",
    locality: "City Market Annex",
    assignedOfficer: "Er. S. Narayanan",
    keywords: ["sewer", "manhole overflow", "black sludge", "choke"],
    priority: "CRITICAL",
    priorityReason: "Direct bio-hazard contamination outside primary school grounds.",
    status: "Work in Progress",
    targetSlaHours: 24,
    actualHours: 20,
    lagHours: 0,
    isOverdue: false,
    rootCause: null,
    location: "Jayanagar 4th Block, South Ward",
    lat: 12.9630,
    lng: 77.5750,
    images: ["https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80"],
    resolutionPhoto: null,
    resolutionRemarks: null,
    stageTimestamps: {
      submitted: "2026-11-13T10:00:00Z",
      aiAnalysed: "2026-11-13T10:01:00Z",
      confirmed: "2026-11-13T10:04:00Z",
      forwarded: "2026-11-13T10:05:00Z",
      officerAssigned: "2026-11-13T11:00:00Z",
      investigationStarted: "2026-11-13T13:00:00Z",
      workStarted: "2026-11-14T06:00:00Z",
      resolutionSubmitted: null,
      resolved: null
    },
    movementHistory: [
      { status: "Submitted", timestamp: "2026-11-13T10:00:00Z", actor: "Citizen", remarks: "Reported with photos" },
      { status: "Forwarded to Department", timestamp: "2026-11-13T10:05:00Z", actor: "System", remarks: "Dispatched to Sewerage Dept" },
      { status: "Assigned to Officer", timestamp: "2026-11-13T11:00:00Z", actor: "Dept Head", remarks: "Assigned to Er. S. Narayanan" },
      { status: "Under Investigation", timestamp: "2026-11-13T13:00:00Z", actor: "Er. S. Narayanan", remarks: "Super-sucker machine ordered" },
      { status: "Work in Progress", timestamp: "2026-11-14T06:00:00Z", actor: "Er. S. Narayanan", remarks: "High-pressure jetting underway" }
    ]
  },
  {
    id: "CIT-2026-1004",
    title: "Rotting commercial waste dump near primary school",
    text: "Huge mound of uncollected waste rotting for days near residential school",
    department: "Sanitation and Waste Management Department",
    zone: "East Ward",
    ward: "Ward 103 - Green Valley Village (Panchayat)",
    locality: "Green Valley Market Annex",
    assignedOfficer: "Dr. Ananya Roy",
    keywords: ["garbage dump", "rotting waste", "hygiene hazard"],
    priority: "HIGH",
    priorityReason: "Accumulated waste creating severe disease vector risk for schoolchildren.",
    status: "Resolved",
    targetSlaHours: 24,
    actualHours: 22,
    lagHours: -2,
    isOverdue: false,
    rootCause: null,
    location: "KR Market Annex, East Ward",
    lat: 12.9610,
    lng: 77.6387,
    images: ["https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?w=600&auto=format&fit=crop&q=80"],
    resolutionPhoto: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80",
    resolutionRemarks: "Compactor truck deployed, 4.2 tons cleared, lime powder sprayed.",
    stageTimestamps: {
      submitted: "2026-11-04T06:00:00Z",
      aiAnalysed: "2026-11-04T06:01:00Z",
      confirmed: "2026-11-04T06:05:00Z",
      forwarded: "2026-11-04T06:06:00Z",
      officerAssigned: "2026-11-04T08:00:00Z",
      investigationStarted: "2026-11-04T10:00:00Z",
      workStarted: "2026-11-04T14:00:00Z",
      resolutionSubmitted: "2026-11-05T03:00:00Z",
      resolved: "2026-11-05T04:00:00Z"
    },
    movementHistory: [
      { status: "Submitted", timestamp: "2026-11-04T06:00:00Z", actor: "Citizen", remarks: "Filed with photos" },
      { status: "Forwarded to Department", timestamp: "2026-11-04T06:06:00Z", actor: "System", remarks: "Dispatched to Sanitation" },
      { status: "Assigned to Officer", timestamp: "2026-11-04T08:00:00Z", actor: "Dept Head", remarks: "Assigned to Dr. Ananya Roy" },
      { status: "Work in Progress", timestamp: "2026-11-04T14:00:00Z", actor: "Dr. Ananya Roy", remarks: "Compactor vehicle clearing area" },
      { status: "Resolved", timestamp: "2026-11-05T04:00:00Z", actor: "Citizen", remarks: "Citizen verified clean site" }
    ]
  },
  {
    id: "CIT-2026-1005",
    title: "Street lights dead along entire township avenue",
    text: "Multiple street lights dead across entire residential avenue causing nocturnal safety concern",
    department: "Streetlight Department",
    zone: "West Ward",
    ward: "Ward 105 - Peenya Industrial Sector",
    locality: "Double Road Suburb",
    assignedOfficer: "M. Venkatesh",
    keywords: ["street light", "dark avenue", "bulb replacement"],
    priority: "MEDIUM",
    priorityReason: "Unlit residential avenue reduces nocturnal pedestrian security.",
    status: "Reopened",
    targetSlaHours: 12,
    actualHours: 36,
    lagHours: 24,
    isOverdue: true,
    rootCause: "Underground cable fault misdiagnosed as simple bulb replacement.",
    location: "Rajajinagar 1st Block, West Ward",
    lat: 12.9540,
    lng: 77.5412,
    images: ["https://images.unsplash.com/photo-1508873696983-2df5293cbdaf?w=600&auto=format&fit=crop&q=80"],
    resolutionPhoto: null,
    resolutionRemarks: "Citizen reopened ticket: 'Lamps flashed for 10 minutes then died again. Underground cable issue not fixed.'",
    stageTimestamps: {
      submitted: "2026-11-07T14:00:00Z",
      aiAnalysed: "2026-11-07T14:01:00Z",
      confirmed: "2026-11-07T14:05:00Z",
      forwarded: "2026-11-07T14:06:00Z",
      officerAssigned: "2026-11-07T16:00:00Z",
      investigationStarted: "2026-11-07T18:00:00Z",
      workStarted: "2026-11-07T21:00:00Z",
      resolutionSubmitted: "2026-11-08T01:00:00Z",
      resolved: "2026-11-08T02:00:00Z",
      reopened: "2026-11-08T18:00:00Z"
    },
    movementHistory: [
      { status: "Submitted", timestamp: "2026-11-07T14:00:00Z", actor: "Citizen", remarks: "Filed issue" },
      { status: "Resolved", timestamp: "2026-11-08T02:00:00Z", actor: "M. Venkatesh", remarks: "Bulb replaced" },
      { status: "Reopened", timestamp: "2026-11-08T18:00:00Z", actor: "Citizen", remarks: "Reopened: Problem recurred" }
    ]
  },
  {
    id: "CIT-2026-1006",
    title: "Repeated road cave-in and drainage overflow at junction",
    text: "Repeated road cave-in following unseasonal monsoon shower near metro junction",
    department: "Road and Infrastructure Department",
    zone: "North Ward",
    ward: "Ward 102 - North Tech Corridor & Hebbal",
    locality: "Hebbal Junction",
    assignedOfficer: "Er. Rajesh Sharma",
    keywords: ["road cave-in", "drainage", "junction", "subsidence"],
    priority: "VERY HIGH",
    priorityReason: "Repeated ground subsidence near high-density metro junction.",
    status: "Under Investigation",
    targetSlaHours: 36,
    actualHours: 42,
    lagHours: 6,
    isOverdue: true,
    rootCause: "Inter-agency dispute with underground metro tunneling team.",
    location: "Hebbal Junction, North Ward",
    lat: 12.9825,
    lng: 77.5960,
    images: ["https://images.unsplash.com/photo-1578874691223-a4926742930f?w=600&auto=format&fit=crop&q=80"],
    resolutionPhoto: null,
    resolutionRemarks: null,
    stageTimestamps: {
      submitted: "2026-11-11T09:00:00Z",
      aiAnalysed: "2026-11-11T09:01:00Z",
      confirmed: "2026-11-11T09:05:00Z",
      forwarded: "2026-11-11T09:06:00Z",
      officerAssigned: "2026-11-11T14:00:00Z",
      investigationStarted: "2026-11-13T10:00:00Z",
      workStarted: null,
      resolutionSubmitted: null,
      resolved: null
    },
    movementHistory: [
      { status: "Submitted", timestamp: "2026-11-11T09:00:00Z", actor: "Citizen", remarks: "Recurring complaint filed" },
      { status: "Forwarded to Department", timestamp: "2026-11-11T09:06:00Z", actor: "System", remarks: "Dispatched to Roads Dept" },
      { status: "Assigned to Officer", timestamp: "2026-11-11T14:00:00Z", actor: "Dept Head", remarks: "Assigned to Er. Rajesh Sharma" },
      { status: "Under Investigation", timestamp: "2026-11-13T10:00:00Z", actor: "Er. Rajesh Sharma", remarks: "Soil compaction testing initiated" }
    ]
  }
];
