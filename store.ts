import { create } from 'zustand';
import { User, Patient, Report, AuditLog } from './types';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  patients: Patient[];
  reports: Report[];
  auditLogs: AuditLog[];
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  addReport: (report: Report) => void;
  updateReport: (id: string, updates: Partial<Report>) => void;
  addPatient: (patient: Patient) => void;
  addAuditLog: (log: AuditLog) => void;
}

// Mock initial data
const INITIAL_PATIENTS: Patient[] = [
  { id: 'p1', name: 'John Doe', dob: '1980-05-15', mrn: 'MRN-8821', gender: 'M' },
  { id: 'p2', name: 'Jane Smith', dob: '1992-11-20', mrn: 'MRN-9942', gender: 'F' },
  { id: 'p3', name: 'Robert Johnson', dob: '1975-03-10', mrn: 'MRN-1294', gender: 'M' },
  { id: 'p4', name: 'Emily Davis', dob: '1988-07-25', mrn: 'MRN-3301', gender: 'F' },
];

const INITIAL_REPORTS: Report[] = [];

const INITIAL_LOGS: AuditLog[] = [
  { id: 'log-1', userId: 'u1', userName: 'Dr. Sarah Connor', action: 'LOGIN', target: 'System', timestamp: new Date(Date.now() - 3600000).toISOString(), status: 'SUCCESS' },
  { id: 'log-2', userId: 'u1', userName: 'Dr. Sarah Connor', action: 'VIEW_REPORT', target: 'rep-170123', timestamp: new Date(Date.now() - 1800000).toISOString(), status: 'SUCCESS' },
  { id: 'log-3', userId: 'sys', userName: 'System', action: 'MODEL_INFERENCE', target: 'rep-170124', timestamp: new Date(Date.now() - 900000).toISOString(), status: 'WARNING' },
];

export const useStore = create<AppState>((set) => ({
  user: null,
  isAuthenticated: false,
  patients: INITIAL_PATIENTS,
  reports: INITIAL_REPORTS,
  auditLogs: INITIAL_LOGS,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  updateUser: (updates) => set((state) => ({
    user: state.user ? { ...state.user, ...updates } : null
  })),
  addReport: (report) => set((state) => ({ reports: [report, ...state.reports] })),
  updateReport: (id, updates) => set((state) => ({
    reports: state.reports.map((r) => r.id === id ? { ...r, ...updates } : r)
  })),
  addPatient: (patient) => set((state) => ({ patients: [patient, ...state.patients] })),
  addAuditLog: (log) => set((state) => ({ auditLogs: [log, ...state.auditLogs] })),
}));