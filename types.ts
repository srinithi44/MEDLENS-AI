export enum UserRole {
  CLINICIAN = 'CLINICIAN',
  ADMIN = 'ADMIN',
  VIEWER = 'VIEWER'
}

export enum ReportStatus {
  UPLOADING = 'UPLOADING',
  PROCESSING = 'PROCESSING',
  REVIEW_REQUIRED = 'REVIEW_REQUIRED',
  APPROVED = 'APPROVED'
}

export interface BoundingBox {
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  width: number; // percentage 0-100
  height: number; // percentage 0-100
  page?: number; // for PDFs
}

export interface Evidence {
  fileId: string;
  bbox?: BoundingBox;
  textRange?: { start: number; end: number };
  confidence: number;
  source: 'OCR' | 'MODEL_VISION' | 'NLP';
}

export interface Feedback {
  isAccurate: boolean;
  correction?: string;
  timestamp: string;
}

export interface Finding {
  id: string;
  category: 'Finding' | 'Impression' | 'Recommendation';
  text: string;
  confidence: number; // 0.0 to 1.0
  evidence: Evidence[];
  explanation: string; // Display language rationale
  explanationEn?: string; // English rationale for PDF
  suggestedActions: string[];
  icdCodes?: string[];
  feedback?: Feedback;
}

export interface Patient {
  id: string;
  name: string;
  dob: string;
  mrn: string; // Medical Record Number
  gender: string;
}

export interface ReportFile {
  id: string;
  url: string;
  type: 'image/jpeg' | 'image/png' | 'application/pdf' | 'application/dicom';
  name: string;
}

export interface Report {
  id: string;
  patientId: string;
  patientName: string;
  createdAt: string;
  status: ReportStatus;
  files: ReportFile[];
  findings: Finding[];
  language: string; // Track the language used for this report
  
  // Default Summary (usually Patient Friendly)
  summary: string;

  // Multi-Mode Explanations (Translated if requested)
  summaryPatient?: string;
  summaryStudent?: string;
  summaryDoctor?: string;
  
  // Multi-Mode Explanations (Always English for PDF)
  summaryPatientEn?: string;
  summaryStudentEn?: string;
  summaryDoctorEn?: string;

  // Multi-Mode Recommendations (Translated if requested)
  recommendationsPatient?: string[];
  recommendationsStudent?: string[];
  recommendationsDoctor?: string[];

  // Multi-Mode Recommendations (Always English for PDF)
  recommendationsPatientEn?: string[];
  recommendationsStudentEn?: string[];
  recommendationsDoctorEn?: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  token: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  target: string;
  timestamp: string;
  status: 'SUCCESS' | 'FAILURE' | 'WARNING';
}