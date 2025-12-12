import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { ReportStatus } from '../types';

export const PatientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { patients, reports } = useStore();
  
  const patient = patients.find(p => p.id === id);
  const patientReports = reports.filter(r => r.patientId === id);

  if (!patient) return <div className="p-8">Patient not found.</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-start">
            <div>
                <button onClick={() => navigate('/patients')} className="text-slate-400 hover:text-slate-600 text-sm mb-2 flex items-center gap-1">
                    &larr; Back to Patients
                </button>
                <h2 className="text-3xl font-bold text-slate-800">{patient.name}</h2>
                <div className="flex gap-4 mt-2 text-slate-600">
                    <span>MRN: <span className="font-mono text-slate-800">{patient.mrn}</span></span>
                    <span>DOB: {new Date(patient.dob).toLocaleDateString()}</span>
                    <span>Gender: {patient.gender}</span>
                </div>
            </div>
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center text-2xl font-bold text-slate-500">
                {patient.name.charAt(0)}
            </div>
        </header>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-semibold text-slate-800">Clinical Report History</h3>
            </div>
            
            {patientReports.length === 0 ? (
                <div className="p-12 text-center text-slate-400">
                    <p>No reports found for this patient.</p>
                </div>
            ) : (
                <table className="w-full text-left">
                    <thead>
                    <tr className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Report ID</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Findings Count</th>
                        <th className="px-6 py-3">Action</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                    {patientReports.map((report) => (
                        <tr key={report.id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => navigate(`/report/${report.id}`)}>
                        <td className="px-6 py-4 font-medium text-slate-900">{new Date(report.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-slate-500 font-mono text-xs">{report.id}</td>
                        <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            report.status === ReportStatus.APPROVED ? 'bg-green-100 text-green-700' :
                            report.status === ReportStatus.REVIEW_REQUIRED ? 'bg-amber-100 text-amber-700' :
                            'bg-slate-100 text-slate-600'
                            }`}>
                            {report.status.replace('_', ' ')}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-slate-500">{report.findings.length}</td>
                        <td className="px-6 py-4">
                            <span className="text-primary hover:text-sky-700 font-medium text-sm">View Report &rarr;</span>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    </div>
  );
};