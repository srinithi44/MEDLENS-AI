import React from 'react';
import { useStore } from '../store';
import { Link, useNavigate } from 'react-router-dom';
import { ReportStatus } from '../types';

export const Dashboard: React.FC = () => {
  const { user, reports, patients } = useStore();
  const navigate = useNavigate();

  const stats = [
    { label: 'Reports Today', value: reports.filter(r => new Date(r.createdAt).toDateString() === new Date().toDateString()).length },
    { label: 'Pending Review', value: reports.filter(r => r.status === ReportStatus.REVIEW_REQUIRED).length },
    { label: 'Total Patients', value: patients.length },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Welcome back, Dr. {user?.name.split(' ')[0]}</h2>
          <p className="text-slate-500 mt-1">Here is what needs your attention today.</p>
        </div>
        <Link 
          to="/upload"
          className="bg-primary hover:bg-sky-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg shadow-primary/30 transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          New Report
        </Link>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
            <p className="text-4xl font-bold text-slate-900 mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-semibold text-slate-800">Recent Activity</h3>
          <Link to="/reports" className="text-primary text-sm font-medium hover:underline">View All Reports</Link>
        </div>
        
        {reports.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <svg className="w-16 h-16 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <p>No reports generated yet. Start by uploading a scan.</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-3">Patient</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Findings</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reports.slice(0, 5).map((report) => (
                <tr key={report.id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => navigate(`/report/${report.id}`)}>
                  <td className="px-6 py-4 font-medium text-slate-900">{report.patientName}</td>
                  <td className="px-6 py-4 text-slate-500">{new Date(report.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      report.status === ReportStatus.APPROVED ? 'bg-green-100 text-green-700' :
                      report.status === ReportStatus.REVIEW_REQUIRED ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {report.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{report.findings.length} findings</td>
                  <td className="px-6 py-4">
                    <span className="text-primary hover:text-sky-700 font-medium text-sm">Review &rarr;</span>
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