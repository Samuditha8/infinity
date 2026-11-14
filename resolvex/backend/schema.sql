-- =========================================================================
-- ResolveX: Municipal Grievance Redressal & Resolution Tracking System
-- PostgreSQL Relational Database Schema with Complete Audit Trail
-- =========================================================================

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table (Citizens, Officers, Administrators)
CREATE TABLE users (
    id VARCHAR(50) PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(30) NOT NULL CHECK (role IN ('CITIZEN', 'OFFICER', 'ADMINISTRATOR')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- 2. Departments Table (10 Official Municipal Departments)
CREATE TABLE departments (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) UNIQUE NOT NULL,
    description TEXT,
    target_sla_hours INT NOT NULL DEFAULT 24,
    color_code VARCHAR(10) DEFAULT '#0284c7',
    head_officer_name VARCHAR(150),
    contact_email VARCHAR(150),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Officers Table
CREATE TABLE officers (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) REFERENCES users(id) ON DELETE CASCADE,
    department_id VARCHAR(50) REFERENCES departments(id) ON DELETE RESTRICT,
    designation VARCHAR(150) NOT NULL,
    assigned_zone VARCHAR(100) NOT NULL,
    active_workload_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Complaints Table
CREATE TABLE complaints (
    id VARCHAR(50) PRIMARY KEY, -- e.g. 'CIT-2026-1042'
    citizen_id VARCHAR(50) REFERENCES users(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    civic_problem_type VARCHAR(150) NOT NULL,
    
    -- Priority: CRITICAL, VERY HIGH, HIGH, MEDIUM, LOW
    priority VARCHAR(20) NOT NULL CHECK (priority IN ('CRITICAL', 'VERY HIGH', 'HIGH', 'MEDIUM', 'LOW')),
    priority_reason TEXT NOT NULL,
    
    -- Current Status across 11 lifecycle stages
    status VARCHAR(40) NOT NULL CHECK (status IN (
        'Submitted',
        'AI Analysed',
        'Awaiting Citizen Confirmation',
        'Forwarded to Department',
        'Assigned to Officer',
        'Under Investigation',
        'Work in Progress',
        'Resolution Submitted',
        'Awaiting Citizen Verification',
        'Resolved',
        'Reopened'
    )),
    
    current_department_id VARCHAR(50) REFERENCES departments(id) ON DELETE RESTRICT,
    assigned_officer_id VARCHAR(50) REFERENCES officers(id) ON DELETE SET NULL,
    
    -- Geographic references
    ward VARCHAR(150) NOT NULL,
    zone VARCHAR(100) NOT NULL,
    locality VARCHAR(200) NOT NULL,
    
    -- SLA Metrics
    target_sla_hours INT NOT NULL,
    resolution_deadline TIMESTAMP WITH TIME ZONE NOT NULL,
    
    -- Stage Timestamps for Bottleneck Analysis
    submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ai_analysed_at TIMESTAMP WITH TIME ZONE,
    confirmed_at TIMESTAMP WITH TIME ZONE,
    forwarded_at TIMESTAMP WITH TIME ZONE,
    officer_assigned_at TIMESTAMP WITH TIME ZONE,
    investigation_started_at TIMESTAMP WITH TIME ZONE,
    work_started_at TIMESTAMP WITH TIME ZONE,
    resolution_submitted_at TIMESTAMP WITH TIME ZONE,
    resolved_at TIMESTAMP WITH TIME ZONE,
    reopened_at TIMESTAMP WITH TIME ZONE,
    
    total_resolution_hours NUMERIC(8, 2),
    sla_breach_hours NUMERIC(8, 2) DEFAULT 0,
    is_overdue BOOLEAN DEFAULT FALSE,
    reopen_count INT DEFAULT 0
);

-- 5. Complaint Images Table (Multi-photo support)
CREATE TABLE complaint_images (
    id VARCHAR(50) PRIMARY KEY,
    complaint_id VARCHAR(50) NOT NULL REFERENCES complaints(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    file_name VARCHAR(255),
    file_size_kb INT,
    image_type VARCHAR(20) CHECK (image_type IN ('EVIDENCE', 'RESOLUTION_PROOF')),
    cv_detected_labels JSONB,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Complaint Locations Table
CREATE TABLE complaint_locations (
    id VARCHAR(50) PRIMARY KEY,
    complaint_id VARCHAR(50) NOT NULL UNIQUE REFERENCES complaints(id) ON DELETE CASCADE,
    latitude NUMERIC(10, 7) NOT NULL,
    longitude NUMERIC(10, 7) NOT NULL,
    accuracy_meters NUMERIC(6, 2),
    raw_address TEXT,
    landmark TEXT,
    is_gps_verified BOOLEAN DEFAULT TRUE,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Complaint Assignments Table
CREATE TABLE complaint_assignments (
    id VARCHAR(50) PRIMARY KEY,
    complaint_id VARCHAR(50) NOT NULL REFERENCES complaints(id) ON DELETE CASCADE,
    from_department_id VARCHAR(50) REFERENCES departments(id),
    to_department_id VARCHAR(50) REFERENCES departments(id),
    from_officer_id VARCHAR(50) REFERENCES officers(id),
    to_officer_id VARCHAR(50) REFERENCES officers(id),
    assigned_by_user_id VARCHAR(50) REFERENCES users(id),
    reassignment_reason TEXT,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Complaint Status History Table (Complete Audit Trail)
CREATE TABLE complaint_status_history (
    id VARCHAR(50) PRIMARY KEY,
    complaint_id VARCHAR(50) NOT NULL REFERENCES complaints(id) ON DELETE CASCADE,
    status VARCHAR(40) NOT NULL,
    remarks TEXT,
    updated_by_user_id VARCHAR(50) REFERENCES users(id),
    actor_role VARCHAR(30) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Resolution Records Table
CREATE TABLE resolution_records (
    id VARCHAR(50) PRIMARY KEY,
    complaint_id VARCHAR(50) NOT NULL UNIQUE REFERENCES complaints(id) ON DELETE CASCADE,
    officer_id VARCHAR(50) REFERENCES officers(id),
    action_taken_notes TEXT NOT NULL,
    completion_photo_url TEXT,
    materials_used TEXT,
    resolved_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    citizen_satisfaction_rating INT CHECK (citizen_satisfaction_rating BETWEEN 1 AND 5),
    citizen_feedback_notes TEXT
);

-- 10. Department Performance Aggregate Table
CREATE TABLE department_performance (
    id VARCHAR(50) PRIMARY KEY,
    department_id VARCHAR(50) NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    report_date DATE NOT NULL,
    total_received INT DEFAULT 0,
    total_resolved INT DEFAULT 0,
    total_pending INT DEFAULT 0,
    total_overdue INT DEFAULT 0,
    avg_resolution_hours NUMERIC(8, 2) DEFAULT 0,
    sla_compliance_rate NUMERIC(5, 2) DEFAULT 0,
    bottleneck_stage VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. Notifications Table
CREATE TABLE notifications (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    complaint_id VARCHAR(50) REFERENCES complaints(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    notification_type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Indexes for High-Performance Queries & Analytics
CREATE INDEX idx_complaints_dept ON complaints(current_department_id);
CREATE INDEX idx_complaints_status ON complaints(status);
CREATE INDEX idx_complaints_priority ON complaints(priority);
CREATE INDEX idx_complaints_ward ON complaints(ward);
CREATE INDEX idx_complaints_submitted_at ON complaints(submitted_at);
CREATE INDEX idx_status_history_complaint ON complaint_status_history(complaint_id);
CREATE INDEX idx_images_complaint ON complaint_images(complaint_id);
