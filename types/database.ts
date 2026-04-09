

export type StudentStatus = "pending" | "accepted" | "funded" | "studying" | "graduated";
export type AdminRole = "admin" | "reviewer" | "partner";
export type PartnershipStatus = "pending" | "active" | "paused" | "ended";
export type ProgramType = "undergraduate" | "masters" | "phd" | "certificate";
export type ApplicationStatus = "draft" | "submitted" | "under_review" | "shortlisted" | "accepted" | "rejected" | "funded";
export type PaymentMethod = "bank_transfer" | "card" | "paystack" | "flutterwave";
export type PaymentStatus = "pending" | "confirmed" | "failed";
export type DisbursementStatus = "allocated" | "disbursed" | "completed";
export type EnrollmentStatus = "enrolled" | "on_leave" | "graduated" | "withdrawn";
export type MentorshipStatus = "active" | "completed" | "paused";
export type JobType = "full-time" | "part-time" | "internship" | "contract";
export type NotificationType = "application_update" | "donation_received" | "new_message";

export interface Student {
    id: string;
    email: string;
    phone?: string;
    first_name: string;
    last_name: string;
    date_of_birth?: string;
    gender?: string;
    country: string;
    state?: string;
    city?: string;
    address?: string;
    profile_image_url?: string;
    bio?: string;
    status: StudentStatus;
    is_verified: boolean;
    created_at: string;
    updated_at: string;
}

export interface AdminUser {
    id: string;
    email: string;
    name: string;
    role: AdminRole;
    permissions: {
        can_review: boolean;
        can_approve: boolean;
        can_manage_funds: boolean;
    };
    is_active: boolean;
    last_login?: string;
    created_at: string;
}

export interface University {
    id: string;
    name: string;
    country: string;
    state?: string;
    city?: string;
    website_url?: string;
    logo_url?: string;
    partnership_status: PartnershipStatus;
    partnership_start_date?: string;
    contact_person_name?: string;
    contact_person_email?: string;
    contact_person_phone?: string;
    available_slots?: number;
    minimum_requirements?: string;
    programs_offered: string[];
    scholarship_percentage?: number;
    description?: string;
    benefits?: string;
    created_at: string;
    updated_at: string;
}

export interface UniversityProgram {
    id: string;
    university_id: string;
    program_name: string;
    program_type: ProgramType;
    duration_years?: number;
    requirements?: string;
    tuition_fee_annual?: number;
    is_active: boolean;
    created_at: string;
}

export interface Application {
    id: string;
    student_id: string;
    university_id: string;
    program_id: string;
    status: ApplicationStatus;
    application_date: string;
    review_date?: string;
    decision_date?: string;
    reviewed_by?: string;
    highest_qualification?: string;
    institution_name?: string;
    graduation_year?: number;
    gpa_or_grade?: string;
    transcript_url?: string;
    certificate_url?: string;
    recommendation_letter_url?: string;
    why_need_funding: string;
    career_goals: string;
    why_this_program: string;
    family_income_range?: string;
    funding_amount_needed?: number;
    other_funding_sources?: string;
    reviewer_score?: number;
    reviewer_notes?: string;
    admin_notes?: string;
    created_at: string;
    updated_at: string;
}

export interface ApplicationDocument {
    id: string;
    application_id: string;
    document_type: string;
    document_name?: string;
    document_url: string;
    uploaded_at: string;
}

export interface Donation {
    id: string;
    donor_name?: string;
    donor_email?: string;
    donor_phone?: string;
    is_anonymous: boolean;
    amount: number;
    currency: string;
    donation_date: string;
    payment_method?: PaymentMethod;
    payment_reference?: string;
    payment_status: PaymentStatus;
    is_allocated: boolean;
    allocated_date?: string;
    message?: string;
    purpose?: string;
    created_at: string;
}

export interface FundAllocation {
    id: string;
    donation_id: string;
    student_id: string;
    application_id: string;
    amount_allocated: number;
    allocation_date: string;
    academic_year?: string;
    semester?: string;
    disbursement_status: DisbursementStatus;
    disbursed_to_university: boolean;
    disbursement_date?: string;
    notes?: string;
}

export interface StudentProgress {
    id: string;
    student_id: string;
    application_id?: string;
    current_year?: number;
    current_semester?: string;
    gpa?: number;
    credits_completed?: number;
    total_credits_required?: number;
    enrollment_status: EnrollmentStatus;
    expected_graduation_date?: string;
    actual_graduation_date?: string;
    last_report_date?: string;
    last_report_summary?: string;
    created_at: string;
    updated_at: string;
}

export interface ProgressReport {
    id: string;
    student_id: string;
    academic_year?: string;
    semester?: string;
    gpa?: number;
    courses_taken?: number;
    courses_passed?: number;
    achievements?: string;
    challenges?: string;
    goals_next_semester?: string;
    report_file_url?: string;
    submitted_date: string;
}

export interface Mentor {
    id: string;
    name: string;
    email: string;
    phone?: string;
    current_position?: string;
    company?: string;
    industry?: string;
    years_of_experience?: number;
    expertise_areas: string[];
    bio?: string;
    linkedin_url?: string;
    profile_image_url?: string;
    is_available: boolean;
    max_mentees: number;
    current_mentees_count: number;
    created_at: string;
}

export interface MentorshipRelationship {
    id: string;
    student_id: string;
    mentor_id: string;
    start_date: string;
    end_date?: string;
    status: MentorshipStatus;
    meeting_frequency?: string;
    focus_areas: string[];
}

export interface JobOpportunity {
    id: string;
    title: string;
    company_name?: string;
    location?: string;
    job_type?: JobType;
    description?: string;
    requirements?: string;
    salary_range?: string;
    contact_email?: string;
    application_url?: string;
    is_active: boolean;
    posted_date: string;
    closing_date?: string;
    created_at: string;
}

export interface Notification {
    id: string;
    user_id: string;
    user_type: "student" | "admin";
    type: NotificationType;
    title: string;
    message: string;
    is_read: boolean;
    read_at?: string;
    action_url?: string;
    created_at: string;
}

export interface PlatformStats {
    id: string;
    total_students_registered: number;
    total_applications_submitted: number;
    total_students_accepted: number;
    total_students_funded: number;
    total_donations_received: number;
    total_funds_allocated: number;
    total_partner_universities: number;
    snapshot_date: string;
    created_at: string;
}

// VIEWS

export interface VStudentApplication {
    student_id: string;
    first_name: string;
    last_name: string;
    email: string;
    application_id: string;
    application_status: ApplicationStatus;
    university_name: string;
    program_name: string;
    application_date: string;
    reviewer_score?: number;
}

export interface VDonationTransparency {
    id: string;
    donor_display_name: string;
    amount: number;
    currency: string;
    donation_date: string;
    is_allocated: boolean;
    total_allocated: number;
}
