import React from 'react';
import { User } from '@/lib/types';
import { Settings, Shield, Key, User as UserIcon, CheckCircle2 } from 'lucide-react';

interface SettingsViewProps {
  user: User;
  onLogout: () => void;
}

export default function SettingsView({ user, onLogout }: SettingsViewProps) {
  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Account & System Settings</h1>
            <p className="text-sm text-slate-400">Manage your profile credentials, API status, and security preferences.</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <UserIcon className="w-5 h-5 text-blue-400" />
          <span>User Profile</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400">Full Name</label>
            <input
              type="text"
              readOnly
              value={user.name}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400">Email Address</label>
            <input
              type="email"
              readOnly
              value={user.email}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white"
            />
          </div>
        </div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Key className="w-5 h-5 text-emerald-400" />
          <span>API & Secret Configuration</span>
        </h2>
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-white">Gemini API Key Status</p>
            <p className="text-xs text-slate-400">Injected automatically from AI Studio runtime environment secrets.</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Configured & Active</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-red-400" />
          <span>Session Management</span>
        </h2>
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-400">Sign out of your current CodeSphere session.</p>
          <button
            onClick={onLogout}
            className="px-5 py-2.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-400 font-semibold text-sm border border-red-500/30 transition"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
