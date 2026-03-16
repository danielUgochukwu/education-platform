// Core Types for the National Talent Development Initiative Platform

export type ApplicationStatus =
    | "draft"
    | "submitted"
    | "under_review"
    | "shortlisted"
    | "interview_stage"
    | "accepted"
    | "rejected";

export type DocumentType =
    | "transcript"
    | "id"
    | "reference_letter"
    | "essay"
    | "jamb_result"
    | "other";

export interface Applicant {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    stateOfOrigin: string;
    dateOfBirth: string;
    gender: string;
    avatarUrl?: string;
    createdAt: string;
}

export interface PersonalInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
    stateOfOrigin: string;
    lgaOfOrigin: string;
    address: string;
    city: string;
    nationalId: string;
}

export interface AcademicBackground {
    secondarySchool: string;
    waecYear: string;
    waecGrade: string;
    jambScore: string;
    jambYear: string;
    institution: string;
    course: string;
    programType: "undergraduate" | "postgraduate";
    currentYear?: string;
}

export interface EssaySubmission {
    whyApply: string;
    nationalContribution: string;
    leadershipExample: string;
    careerGoals: string;
}

export interface UploadedDocument {
    id: string;
    type: DocumentType;
    name: string;
    size: number;
    uploadedAt: string;
    status: "pending" | "verified" | "rejected";
}

export interface Application {
    id: string;
    applicantId: string;
    status: ApplicationStatus;
    currentStep: number;
    programChoice: string;
    personalInfo?: Partial<PersonalInfo>;
    academicBackground?: Partial<AcademicBackground>;
    essays?: Partial<EssaySubmission>;
    documents?: UploadedDocument[];
    submittedAt?: string;
    lastSavedAt: string;
    createdAt: string;
    reviewNotes?: string;
}

export interface Notification {
    id: string;
    title: string;
    body: string;
    type: "info" | "warning" | "success" | "error";
    isRead: boolean;
    createdAt: string;
    link?: string;
}

export interface Deadline {
    id: string;
    label: string;
    date: string;
    daysLeft: number;
    isUrgent: boolean;
}

export interface Announcement {
    id: string;
    title: string;
    body: string;
    author: string;
    createdAt: string;
    isPinned: boolean;
}
