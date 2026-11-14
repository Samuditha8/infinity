"""
ResolveX - FastAPI Backend Application
Exposes RESTful endpoints for Citizen Complaints, Multi-photo ingestion,
11-stage Tracking, Department Dashboards, and AI Bottleneck Analytics.
"""

from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional, Dict, Any
import json
import uuid
from datetime import datetime, timedelta

from backend.agents import (
    ComplaintTextAnalysisAgent,
    ImageAnalysisAgent,
    DepartmentClassificationAgent,
    PriorityAssessmentAgent,
    CitizenVerificationAgent,
    ComplaintRoutingAgent,
    ResolutionMonitoringAgent,
    DepartmentPerformanceAnalysisAgent
)

app = FastAPI(
    title="ResolveX Municipal AI API",
    description="Open-Source Multi-Agent Civic Grievance Triage, Department Routing & Bottleneck Intelligence",
    version="2.0.0"
)

# Enable CORS for web frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize AI Agents
text_agent = ComplaintTextAnalysisAgent()
vision_agent = ImageAnalysisAgent()
dept_agent = DepartmentClassificationAgent()
priority_agent = PriorityAssessmentAgent()
verification_agent = CitizenVerificationAgent()
routing_agent = ComplaintRoutingAgent()
monitoring_agent = ResolutionMonitoringAgent()
performance_agent = DepartmentPerformanceAnalysisAgent()

# In-memory working database for demo
DB_COMPLAINTS: Dict[str, Dict[str, Any]] = {}

@app.get("/")
def root():
    return {
        "system": "ResolveX Civic Technology Platform",
        "status": "Operational",
        "ai_engine": "Open-Source Multi-Agent Architecture (No Gemini)",
        "endpoints": [
            "/api/complaints/analyze",
            "/api/complaints/confirm-and-route",
            "/api/complaints/{id}/track",
            "/api/complaints/{id}/officer-update",
            "/api/complaints/{id}/reopen",
            "/api/analytics/bottlenecks"
        ]
    }

@app.post("/api/complaints/analyze")
def analyze_complaint(
    title: str = Form(...),
    description: str = Form(...),
    location: str = Form(...),
    ward: str = Form(...),
    locality: str = Form(...),
    image_names: Optional[str] = Form(None)
):
    """
    Analyzes complaint description, runs CV model on images, evaluates public safety & affected population,
    assigns 5-level priority (CRITICAL to LOW), determines department, and prepares verification message.
    """
    file_names_list = json.loads(image_names) if image_names else []

    # Agent 1: NLP
    text_res = text_agent.analyze(title, description)

    # Agent 2: Computer Vision
    vision_res = vision_agent.analyze(file_names_list, file_names_list)

    # Agent 3: Department Classification
    dept_res = dept_agent.classify(text_res, vision_res)

    # Agent 4: Priority Assessment (5 levels)
    priority_res = priority_agent.assess(text_res, vision_res, dept_res, locality, ward)

    # Agent 5: Citizen Verification Prompt (DO NOT FORWARD YET!)
    verification_res = verification_agent.prepare_verification_prompt(dept_res, priority_res)

    return {
        "text_analysis": text_res.dict(),
        "vision_analysis": vision_res.dict(),
        "department_classification": dept_res.dict(),
        "priority_assessment": priority_res.dict(),
        "verification_prompt": verification_res.dict(),
        "geographical_context": {
            "ward": ward,
            "locality": locality,
            "location": location
        }
    }

@app.post("/api/complaints/confirm-and-route")
def confirm_and_route(
    title: str = Form(...),
    description: str = Form(...),
    department: str = Form(...),
    priority: str = Form(...),
    ward: str = Form(...),
    locality: str = Form(...),
    location: str = Form(...),
    target_sla_hours: int = Form(24),
    images: Optional[str] = Form("[]")
):
    """
    Once confirmed by citizen:
    Forwards to department dashboard, assigns officer, records movement history, issues CIT-2026-XXXX.
    """
    complaint_id = f"CIT-2026-{uuid.uuid4().hex[:4].upper()}"
    routing_info = routing_agent.route_complaint(complaint_id, department, priority, target_sla_hours)

    record = {
        "id": complaint_id,
        "title": title,
        "description": description,
        "department": department,
        "priority": priority,
        "ward": ward,
        "locality": locality,
        "location": location,
        "assigned_officer": routing_info["assigned_officer"],
        "status": "Forwarded to Department",
        "created_at": routing_info["forwarded_at"],
        "deadline": routing_info["deadline"],
        "target_sla_hours": target_sla_hours,
        "images": json.loads(images),
        "history": [
            {"status": "Submitted", "timestamp": datetime.now().isoformat(), "remarks": "Registered by citizen"},
            {"status": "AI Analysed", "timestamp": datetime.now().isoformat(), "remarks": f"Assessed Priority: {priority}"},
            {"status": "Awaiting Citizen Confirmation", "timestamp": datetime.now().isoformat(), "remarks": "Verification prompt displayed"},
            routing_info["audit_trail_entry"]
        ]
    }

    DB_COMPLAINTS[complaint_id] = record
    return record

@app.get("/api/complaints/{complaint_id}/track")
def track_complaint(complaint_id: str):
    """Real-time 11-stage tracking with movement history."""
    complaint = DB_COMPLAINTS.get(complaint_id)
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint ID not found")
    
    sla_metrics = monitoring_agent.check_sla(complaint["created_at"], complaint["deadline"])
    return {
        "complaint": complaint,
        "sla_metrics": sla_metrics
    }

@app.post("/api/complaints/{complaint_id}/officer-update")
def officer_update(
    complaint_id: str,
    new_status: str = Form(...),
    officer_remarks: str = Form(...),
    resolution_photo_url: Optional[str] = Form(None)
):
    """Department Officer progress update, resolution submission, or completion proof."""
    complaint = DB_COMPLAINTS.get(complaint_id)
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint ID not found")

    complaint["status"] = new_status
    if resolution_photo_url:
        complaint["resolution_photo"] = resolution_photo_url

    complaint["history"].append({
        "status": new_status,
        "timestamp": datetime.now().isoformat(),
        "officer": complaint["assigned_officer"],
        "remarks": officer_remarks
    })

    return {"success": True, "complaint": complaint}

@app.post("/api/complaints/{complaint_id}/reopen")
def reopen_complaint(complaint_id: str, citizen_remarks: str = Form(...)):
    """Allows citizen to reopen complaint if not satisfactorily resolved."""
    complaint = DB_COMPLAINTS.get(complaint_id)
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint ID not found")

    reopen_data = monitoring_agent.process_reopen(complaint_id, citizen_remarks)
    complaint["status"] = reopen_data["status"]
    complaint["priority"] = reopen_data["priority"]
    complaint["history"].append({
        "status": "Reopened",
        "timestamp": reopen_data["reopened_at"],
        "remarks": reopen_data["remarks"]
    })

    return {"success": True, "complaint": complaint}

@app.get("/api/analytics/bottlenecks")
def get_bottleneck_analytics():
    """AI Department Performance & Bottleneck Analysis report."""
    tickets_list = list(DB_COMPLAINTS.values())
    report = performance_agent.analyze_performance(tickets_list)
    return report.dict()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
