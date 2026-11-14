"""
ResolveX - AI Complaint Analysis & Department Verification Agent
Python Module implementing Multimodal Semantic Analysis & Verification Loop
"""

import os
from typing import List, Optional
from pydantic import BaseModel, Field

try:
    from google import genai
    from google.genai import types
    from PIL import Image
    HAS_GENAI = True
except ImportError:
    HAS_GENAI = False

OFFICIAL_DEPARTMENTS = [
    "Water Supply Department",
    "Electricity Department",
    "Road and Infrastructure Department",
    "Sanitation and Waste Management Department",
    "Drainage and Sewerage Department",
    "Public Health Department",
    "Streetlight Department",
    "Traffic Management Department",
    "Parks and Public Spaces Department",
    "Other Municipal Services"
]

class AIComplaintAnalysis(BaseModel):
    predicted_department: str = Field(description="One of the 10 official government departments")
    priority: str = Field(description="Low, Medium, High, or Critical")
    reason: str = Field(description="Short explanation of why it selected that department")
    civic_problem_type: str = Field(description="Objective classification of the civic problem")
    detected_keywords: List[str] = Field(description="Extracted key domain keywords")
    target_sla_hours: int = Field(description="Target resolution SLA in hours")
    verification_question: str = Field(description="Mandated confirmation prompt to citizen")

def analyze_complaint(
    text: str,
    location: str,
    image_path: Optional[str] = None,
    api_key: Optional[str] = None,
    user_clarification: Optional[str] = None
) -> AIComplaintAnalysis:
    """
    AI Complaint Analysis Agent
    Performs multimodal intent analysis, visual inspection, keyword extraction, and department routing.
    """
    key = api_key or os.environ.get("GEMINI_API_KEY")
    if not key or not HAS_GENAI:
        return fallback_semantic_agent(text, location, user_clarification)

    client = genai.Client(api_key=key)

    departments_list_str = "\n".join([f"- '{d}'" for d in OFFICIAL_DEPARTMENTS])

    prompt = f"""
    You are an autonomous municipal intake AI agent.
    Analyze the user complaint text, visual evidence, and location.

    TASKS:
    1. Analyze the complaint description and extract important keywords.
    2. Understand the actual problem instead of relying only on individual keywords.
    3. Identify the type of civic problem.
    4. Analyze the GPS location and geographical area.
    5. Identify the appropriate government department strictly from:
    {departments_list_str}
    6. Determine complaint severity and priority (Low, Medium, High, Critical).
    7. Generate a short explanation of why it selected that department.
    8. Generate the verification question: "We have identified the [Department Name] as the responsible department. Is this correct?"

    Complaint: "{text}"
    Location: "{location}"
    Additional Citizen Clarification (if any): "{user_clarification or 'None'}"
    """

    contents = [prompt]
    if image_path and os.path.exists(image_path):
        contents.append(Image.open(image_path))

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=contents,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=AIComplaintAnalysis,
            temperature=0.1
        )
    )
    return AIComplaintAnalysis.model_validate_json(response.text)

def fallback_semantic_agent(text: str, location: str, user_clarification: Optional[str] = None) -> AIComplaintAnalysis:
    """Semantic intent-aware offline classifier."""
    full = (text + " " + (user_clarification or "")).lower()

    if any(k in full for k in ["garbage", "trash", "waste", "dump", "rotting", "stench", "litter"]):
        dept = "Sanitation and Waste Management Department"
        prob = "Municipal Waste Accumulation Hazard"
        reason = "Accumulated waste may create health and hygiene problems."
        priority = "High" if "residential" in full or "huge" in full else "Medium"
        sla = 24
        kw = ["garbage dump", "rotting waste", "hygiene hazard"]
    elif any(k in full for k in ["sewer", "sewage", "manhole", "drainage", "sludge"]):
        dept = "Drainage and Sewerage Department"
        prob = "Underground Sewerage Backflow & Regurgitation"
        reason = "Regurgitating sewage and choked drains cause hazardous bio-waste contamination and street flooding."
        priority = "Critical"
        sla = 24
        kw = ["sewer choke", "manhole overflow", "toxic sludge"]
    elif any(k in full for k in ["drinking water", "water pipe", "pipeline", "leak", "water burst"]):
        dept = "Water Supply Department"
        prob = "Potable Drinking Water Main Rupture"
        reason = "Drinking water pipeline ruptures cause clean water loss, supply deprivation, and localized flooding."
        priority = "High"
        sla = 24
        kw = ["pipeline leak", "drinking water", "pressure burst"]
    elif any(k in full for k in ["pothole", "crater", "road", "asphalt", "divider", "footpath"]):
        dept = "Road and Infrastructure Department"
        prob = "Structural Road Asphalt & Pavement Breach"
        reason = "Structural road damage and asphalt craters present direct vehicular collision and pedestrian accident risks."
        priority = "High" if "deep" in full or "accident" in full else "Medium"
        sla = 36
        kw = ["pothole crater", "asphalt damage", "vehicular risk"]
    elif any(k in full for k in ["wire", "spark", "transformer", "electric", "live wire", "high tension"]):
        dept = "Electricity Department"
        prob = "High-Voltage Distribution & Power Grid Hazard"
        reason = "Exposed live high-voltage wires and transformer faults pose immediate electrocution and fire hazards."
        priority = "Critical"
        sla = 12
        kw = ["live wire", "transformer sparks", "electrocution risk"]
    elif any(k in full for k in ["street light", "streetlight", "dark avenue", "lamp post"]):
        dept = "Streetlight Department"
        prob = "Public Streetlight Network Outage"
        reason = "Defunct streetlights and unlit avenues compromise nocturnal visibility and public safety for pedestrians."
        priority = "Medium"
        sla = 12
        kw = ["streetlight dark", "lamp outage", "nocturnal hazard"]
    elif any(k in full for k in ["traffic signal", "signal", "gridlock", "jam", "speed breaker"]):
        dept = "Traffic Management Department"
        prob = "Automated Traffic Signal & Arterial Gridlock"
        reason = "Malfunctioning traffic signals and junction blockades lead to uncontrolled vehicle collisions and severe gridlock."
        priority = "High"
        sla = 18
        kw = ["traffic signal", "junction gridlock", "collision risk"]
    elif any(k in full for k in ["mosquito", "dengue", "malaria", "stagnant water", "larvae"]):
        dept = "Public Health Department"
        prob = "Vector-Borne Epidemic & Stagnant Pool Hazard"
        reason = "Stagnant breeding pools and unhygienic reservoirs foster mosquito swarms and epidemic disease outbreaks."
        priority = "High"
        sla = 48
        kw = ["stagnant water", "mosquito larvae", "dengue threat"]
    elif any(k in full for k in ["park", "tree", "branch", "swings", "playground"]):
        dept = "Parks and Public Spaces Department"
        prob = "Public Park Equipment & Tree Limb Hazard"
        reason = "Damaged public playground equipment and collapsed tree limbs jeopardize children and recreational visitors."
        priority = "Medium"
        sla = 48
        kw = ["fallen tree branch", "playground swings", "park hazard"]
    else:
        dept = "Other Municipal Services"
        prob = "General Civic Redressal Grievance"
        reason = "General civic inconvenience requiring municipal administrative inspection."
        priority = "Low"
        sla = 72
        kw = ["civic grievance", "municipal inspection"]

    question = f'We have identified the {dept} as the responsible department. Is this correct?'

    return AIComplaintAnalysis(
        predicted_department=dept,
        priority=priority,
        reason=reason,
        civic_problem_type=prob,
        detected_keywords=kw,
        target_sla_hours=sla,
        verification_question=question
    )

if __name__ == "__main__":
    test_complaint = "There is a huge amount of garbage accumulated near our residential area."
    result = analyze_complaint(text=test_complaint, location="Green Valley Ward 103")
    print("AI Analysis Output:")
    print(f"Predicted Department: {result.predicted_department}")
    print(f"Priority: {result.priority}")
    print(f"Reason: {result.reason}")
    print(f"Verification Question: {result.verification_question}")
