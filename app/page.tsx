'use client';

import React, { useState } from 'react';
import {
  LayoutDashboard,
  Bot,
  Code2,
  ShieldAlert,
  Cpu,
  Trophy,
  FolderGit2,
  FileCode,
  Settings,
  LogOut,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';
import { NavSection, User, Project, BuildArtifact } from '@/lib/types';
import { INITIAL_PROJECTS, INITIAL_ARTIFACTS } from '@/lib/mock-data';
import LandingPage from '@/components/LandingPage';
import AuthModal from '@/components/AuthModal';
import DashboardView from '@/components/DashboardView';
import AiAssistantView from '@/components/AiAssistantView';
import CodeStudioView from '@/components/CodeStudioView';
import CodeDoctorView from '@/components/CodeDoctorView';
import FirmwareLabView from '@/components/FirmwareLabView';
import CodingArenaView from '@/components/CodingArenaView';
import ProjectsView from '@/components/ProjectsView';
import SnippetsView from '@/components/SnippetsView';
import SettingsView from '@/components/SettingsView';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User>({
    id: 'user-default-1',
    name: 'Senior Developer',
    email: 'admin@codesphere.dev',
    role: 'Lead Engineer',
    codingStreak: 14,
    totalProjects: 3,
    completedChallenges: 28,
  });

  const [activeSection, setActiveSection] = useState<NavSection>('dashboard');
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [activeProject, setActiveProject] = useState<Project>(INITIAL_PROJECTS[0]);
  const [artifacts, setArtifacts] = useState<BuildArtifact[]>(INITIAL_ARTIFACTS);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    setIsAuthenticated(true);
  };

  const handleInsertCodeIntoStudio = (code: string) => {
    const updatedFiles = activeProject.files.map((f, idx) => (idx === 0 ? { ...f, content: code } : f));
    setActiveProject({ ...activeProject, files: updatedFiles });
    setActiveSection('code-studio');
  };

  if (!isAuthenticated) {
    return (
      <>
        <LandingPage
          onOpenAuth={handleOpenAuth}
          onEnterApp={() => {
            setIsAuthenticated(true);
            setActiveSection('dashboard');
          }}
        />
        <AuthModal
          isOpen={authModalOpen}
          initialMode={authMode}
          onClose={() => setAuthModalOpen(false)}
          onSuccess={handleAuthSuccess}
        />
      </>
    );
  }

  const navItems: { id: NavSection; label: string; icon: any }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Bot },
    { id: 'code-studio', label: 'Code Studio', icon: Code2 },
    { id: 'code-doctor', label: 'Code Doctor', icon: ShieldAlert },
    { id: 'firmware-lab', label: 'Firmware Lab', icon: Cpu },
    { id: 'coding-arena', label: 'Coding Arena', icon: Trophy },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'snippets', label: 'Snippets', icon: FileCode },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex font-sans selection:bg-blue-600 selection:text-white">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-72 bg-slate-950 border-r border-slate-800 flex-col justify-between p-6">
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                CodeSphere
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-blue-400 font-semibold">Engineering Platform</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Profile Card */}
        <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm">
              {user.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-white truncate">{user.name}</p>
              <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-slate-400 hover:text-white transition p-1.5"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-slate-950/80 border-b border-slate-800 px-8 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-bold text-white capitalize">
              {activeSection.replace('-', ' ')}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Workspace Active</span>
            </div>
          </div>
        </header>

        {/* Mobile Sidebar Modal */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex bg-black/70 backdrop-blur-sm">
            <div className="w-72 bg-slate-950 border-r border-slate-800 p-6 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
                      CS
                    </div>
                    <span className="font-bold text-white">CodeSphere</span>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveSection(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                          isActive ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="w-full py-3 rounded-xl bg-red-600/20 text-red-400 font-semibold text-xs border border-red-500/30 flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
            <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
          </div>
        )}

        {/* View Content Area */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {activeSection === 'dashboard' && (
            <DashboardView
              user={user}
              projects={projects}
              artifacts={artifacts}
              onNavigate={setActiveSection}
              onOpenProject={setActiveProject}
            />
          )}
          {activeSection === 'ai-assistant' && (
            <AiAssistantView onInsertCode={handleInsertCodeIntoStudio} />
          )}
          {activeSection === 'code-studio' && (
            <CodeStudioView
              project={activeProject}
              onUpdateProject={(updated) => {
                setActiveProject(updated);
                setProjects(projects.map((p) => (p.id === updated.id ? updated : p)));
              }}
            />
          )}
          {activeSection === 'code-doctor' && <CodeDoctorView />}
          {activeSection === 'firmware-lab' && (
            <FirmwareLabView
              artifacts={artifacts}
              onAddArtifact={(art) => setArtifacts([art, ...artifacts])}
            />
          )}
          {activeSection === 'coding-arena' && (
            <CodingArenaView
              onChallengeComplete={() => {
                setUser({ ...user, completedChallenges: user.completedChallenges + 1 });
              }}
            />
          )}
          {activeSection === 'projects' && (
            <ProjectsView
              projects={projects}
              onOpenProject={setActiveProject}
              onCreateProject={(p) => setProjects([p, ...projects])}
              onDeleteProject={(id) => setProjects(projects.filter((p) => p.id !== id))}
              onNavigate={setActiveSection}
            />
          )}
          {activeSection === 'snippets' && <SnippetsView />}
          {activeSection === 'settings' && (
            <SettingsView
              user={user}
              onLogout={() => setIsAuthenticated(false)}
            />
          )}
        </main>
      </div>
    </div>
  );
}
