import React, { useState } from 'react';
import { Project } from '@/lib/types';
import { FolderGit2, Plus, Trash2, ArrowUpRight, Search } from 'lucide-react';

interface ProjectsViewProps {
  projects: Project[];
  onOpenProject: (proj: Project) => void;
  onCreateProject: (proj: Project) => void;
  onDeleteProject: (id: string) => void;
  onNavigate: (section: any) => void;
}

export default function ProjectsView({ projects, onOpenProject, onCreateProject, onDeleteProject, onNavigate }: ProjectsViewProps) {
  const [search, setSearch] = useState('');

  const filtered = projects.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()));

  const handleNewProject = () => {
    const name = prompt('Enter project name:');
    if (!name) return;
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      name,
      description: 'Custom engineering workspace project.',
      template: 'javascript',
      updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      files: [
        {
          id: `f-${Date.now()}`,
          name: 'index.js',
          language: 'javascript',
          content: 'console.log("Hello CodeSphere!");',
        },
      ],
    };
    onCreateProject(newProj);
    onOpenProject(newProj);
    onNavigate('code-studio');
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
            <FolderGit2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Project Manager</h1>
            <p className="text-sm text-slate-400">Organize, create, and manage your software projects and embedded firmware workspaces.</p>
          </div>
        </div>
        <button
          onClick={handleNewProject}
          className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/25 transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 pl-11 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((proj) => (
          <div key={proj.id} className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 space-y-4 flex flex-col justify-between transition">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 font-semibold">
                  {proj.template}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onOpenProject(proj);
                      onNavigate('code-studio');
                    }}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                    title="Open in Code Studio"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteProject(proj.id)}
                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-white text-base">{proj.name}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{proj.description}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs text-slate-500">
              <span>{proj.files.length} files</span>
              <span>Updated {proj.updatedAt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
