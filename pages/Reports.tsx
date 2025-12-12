import React from 'react';
import { useStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { ReportStatus } from '../types';

export const Reports: React.FC = () => {
  const { reports } = useStore();
  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">All Reports</h2>
          <p className="text-slate-500 mt-1">Full history of generated medical reports.</p>
        </div>
      </header>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {reports.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <p>No reports found.</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">Report ID</th>
                <th className="px-6 py-4">Patient</th>
                <th className="px-6 py-4">Date Created</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Language</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => navigate(`/report/${report.id}`)}>
                  <td className="px-6 py-4 text-slate-500 font-mono text-xs">{report.id}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{report.patientName}</td>
                  <td className="px-6 py-4 text-slate-500">{new Date(report.createdAt).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      report.status === ReportStatus.APPROVED ? 'bg-green-100 text-green-700' :
                      report.status === ReportStatus.REVIEW_REQUIRED ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {report.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{report.language}</td>
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