import React from 'react';
import { User, Project, BuildArtifact } from '@/lib/types';
import { Flame, FolderGit2, Trophy, ArrowUpRight, Plus, Cpu, Bot, ShieldCheck, Clock } from 'lucide-react';

interface DashboardViewProps {
  user: User;
  projects: Project[];
  artifacts: BuildArtifact[];
  onNavigate: (section: any) => void;
  onOpenProject: (proj: Project) => void;
}

export default function DashboardView({ user, projects, artifacts, onNavigate, onOpenProject }: DashboardViewProps) {
  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-900/40 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold">
            <span>Welcome back, {user.name}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Ready to engineer something extraordinary?</h1>
          <p className="text-slate-400 text-sm">Your development environment is fully synchronized and secure.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('code-studio')}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/25 transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>
          <button
            onClick={() => onNavigate('ai-assistant')}
            className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-semibold text-sm transition flex items-center gap-2"
          >
            <Bot className="w-4 h-4 text-blue-400" />
            <span>Ask AI</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Coding Streak</span>
            <Flame className="w-5 h-5 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-white">{user.codingStreak}</span>
            <span className="text-sm font-medium text-slate-400">Days Active</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Projects</span>
            <FolderGit2 className="w-5 h-5 text-blue-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-white">{projects.length}</span>
            <span className="text-sm font-medium text-slate-400">Active Workspaces</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Coding Challenges</span>
            <Trophy className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-white">{user.completedChallenges}</span>
            <span className="text-sm font-medium text-slate-400">Solved</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Firmware Builds</span>
            <Cpu className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-white">{artifacts.length}</span>
            <span className="text-sm font-medium text-slate-400">Successful</span>
          </div>
        </div>
      </div>

      {/* Quick Actions & Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Projects (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Recently Opened Projects</h2>
            <button onClick={() => onNavigate('projects')} className="text-xs font-semibold text-blue-400 hover:underline">
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => {
                  onOpenProject(proj);
                  onNavigate('code-studio');
                }}
                className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 cursor-pointer transition space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 font-semibold">
                    {proj.template}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition" />
                </div>
                <div>
                  <h3 className="font-semibold text-white group-hover:text-blue-400 transition">{proj.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{proj.description}</p>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-2 border-t border-slate-800/60">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Updated {proj.updatedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Action Cards (1 col) */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Engineering Quick Actions</h2>
          <div className="space-y-3">
            <button
              onClick={() => onNavigate('code-doctor')}
              className="w-full bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-xl p-4 text-left transition flex items-center gap-4 group"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition">Code Doctor Diagnostics</h3>
                <p className="text-xs text-slate-400">Analyze compiler errors & fix bugs instantly</p>
              </div>
            </button>

            <button
              onClick={() => onNavigate('firmware-lab')}
              className="w-full bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-xl p-4 text-left transition flex items-center gap-4 group"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white group-hover:text-indigo-400 transition">Firmware Lab</h3>
                <p className="text-xs text-slate-400">ESP32 partition tables & binary builds</p>
              </div>
            </button>

            <button
              onClick={() => onNavigate('coding-arena')}
              className="w-full bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-xl p-4 text-left transition flex items-center gap-4 group"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white group-hover:text-amber-400 transition">Coding Arena</h3>
                <p className="text-xs text-slate-400">Practice algorithms and test cases</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
