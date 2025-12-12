import React, { useState, useEffect } from 'react';
import { useStore } from '../store';

export const Profile: React.FC = () => {
  const { user, updateUser } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role
      });
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    updateUser({ name: formData.name });
    
    setSuccessMessage('Profile updated successfully.');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  if (!user) return <div className="p-8">Please log in to view profile.</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6">
      <header>
        <h2 className="text-3xl font-bold text-slate-800">My Profile</h2>
        <p className="text-slate-500 mt-1">Manage your account settings and preferences.</p>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
         {/* Profile Header Background */}
         <div className="h-32 bg-gradient-to-r from-slate-800 to-slate-900"></div>
         
         <div className="px-8 pb-8">
            <div className="relative flex justify-between items-end -mt-12 mb-6">
                <div className="flex items-end gap-6">
                    <div className="w-24 h-24 rounded-full bg-white p-1 shadow-md">
                        <div className="w-full h-full rounded-full bg-primary text-white flex items-center justify-center text-3xl font-bold">
                        {user.name.charAt(0).toUpperCase()}
                        </div>
                    </div>
                    <div className="mb-2">
                        <h3 className="text-2xl font-bold text-slate-800">{user.name}</h3>
                        <p className="text-slate-500">{user.role}</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Display Name</label>
                        <input 
                            type="text" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-primary/50 outline-none transition-shadow"
                            placeholder="Enter your full name"
                        />
                        <p className="text-xs text-slate-400 mt-1">This name will appear on reports you approve.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                        <input 
                            type="email" 
                            value={formData.email}
                            disabled
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-500 cursor-not-allowed"
                        />
                        <div className="flex items-center gap-2 mt-1">
                            <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                            <p className="text-xs text-slate-400">Email is managed by your organization admin.</p>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Role & Permissions</label>
                         <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">
                                {user.role}
                            </span>
                            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium border border-slate-200">
                                Report Viewer
                            </span>
                            {user.role === 'ADMIN' && (
                                <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium border border-purple-100">
                                    System Config
                                </span>
                            )}
                         </div>
                    </div>
                </div>

                {successMessage && (
                    <div className="bg-green-50 text-green-700 p-4 rounded-lg text-sm flex items-center gap-2 animate-fadeIn border border-green-100">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        {successMessage}
                    </div>
                )}

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                    <button 
                        type="submit"
                        className="bg-primary hover:bg-sky-600 text-white px-8 py-2.5 rounded-lg font-medium transition-all shadow-sm hover:shadow"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
         </div>
      </div>
    </div>
  );
};