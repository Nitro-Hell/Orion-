import React, { useState } from 'react';
import { Project, ProjectFile } from '@/lib/types';
import Editor from '@monaco-editor/react';
import { Play, Plus, FileCode, Terminal, Monitor } from 'lucide-react';

interface CodeStudioViewProps {
  project: Project;
  onUpdateProject: (proj: Project) => void;
}

export default function CodeStudioView({ project, onUpdateProject }: CodeStudioViewProps) {
  const [activeFileId, setActiveFileId] = useState<string>(project.files[0]?.id || '');
  const [consoleOutput, setConsoleOutput] = useState<string>('Ready to execute code.');
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'console'>('preview');

  const activeFile = project.files.find((f) => f.id === activeFileId) || project.files[0];

  const handleEditorChange = (value: string | undefined) => {
    if (!value || !activeFile) return;
    const updatedFiles = project.files.map((f) => (f.id === activeFile.id ? { ...f, content: value } : f));
    onUpdateProject({ ...project, files: updatedFiles, updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16) });
  };

  const handleRun = async () => {
    setIsRunning(true);
    setConsoleOutput('Executing code in isolated sandbox worker...');

    if (project.template === 'html' || activeFile.language === 'html' || activeFile.name.endsWith('.html')) {
      setTimeout(() => {
        setConsoleOutput('HTML/CSS/JS preview rendered successfully in sandbox iframe.');
        setIsRunning(false);
      }, 400);
      return;
    }

    try {
      const res = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: activeFile.language,
          code: activeFile.content,
        }),
      });
      const data = await res.json();
      setConsoleOutput(data.output || 'Execution completed.');
    } catch (err: any) {
      setConsoleOutput(`Execution Error: ${err.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const htmlContent = project.files.find((f) => f.name.endsWith('.html'))?.content || `
    <!DOCTYPE html>
    <html>
      <body style="background:#0b0f19; color:#fff; font-family:sans-serif; padding:2rem;">
        <h2>CodeSphere Live Preview</h2>
        <p>Edit or add an HTML file to preview live.</p>
      </body>
    </html>
  `;

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Top Toolbar */}
      <div className="px-6 py-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-400">
            <FileCode className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">{project.name}</h2>
            <p className="text-[11px] text-slate-400">Template: {project.template} • Last Saved {project.updatedAt}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition flex items-center gap-2 shadow-md shadow-blue-600/20"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isRunning ? 'Running...' : 'Run / Execute'}</span>
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left File Explorer */}
        <div className="lg:col-span-3 bg-slate-900/60 border-r border-slate-800 flex flex-col">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <span>Project Files</span>
            <button
              onClick={() => {
                const name = prompt('Enter new filename:');
                if (!name) return;
                const newFile: ProjectFile = {
                  id: `f-${Date.now()}`,
                  name,
                  language: name.endsWith('.py') ? 'python' : name.endsWith('.html') ? 'html' : 'javascript',
                  content: '// New file',
                };
                onUpdateProject({ ...project, files: [...project.files, newFile] });
                setActiveFileId(newFile.id);
              }}
              className="hover:text-white transition"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {project.files.map((file) => (
              <button
                key={file.id}
                onClick={() => setActiveFileId(file.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition flex items-center justify-between ${
                  activeFileId === file.id ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <span className="truncate">{file.name}</span>
                <span className="text-[10px] text-slate-500 uppercase">{file.language}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Center Monaco Editor */}
        <div className="lg:col-span-5 flex flex-col border-r border-slate-800 bg-[#1e1e1e]">
          {activeFile && (
            <div className="flex-1">
              <Editor
                height="100%"
                language={activeFile.language}
                theme="vs-dark"
                value={activeFile.content}
                onChange={handleEditorChange}
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
          )}
        </div>

        {/* Right Output / Preview Panel */}
        <div className="lg:col-span-4 flex flex-col bg-slate-950">
          <div className="flex items-center border-b border-slate-800 bg-slate-900 px-4 py-2 gap-2">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                activeTab === 'preview' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Live Preview</span>
            </button>
            <button
              onClick={() => setActiveTab('console')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                activeTab === 'console' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Console Log</span>
            </button>
          </div>

          <div className="flex-1 overflow-hidden">
            {activeTab === 'preview' ? (
              <iframe
                title="CodeSphere Live Preview"
                srcDoc={htmlContent}
                className="w-full h-full border-0 bg-white"
                sandbox="allow-scripts"
              />
            ) : (
              <div className="p-4 font-mono text-xs text-emerald-400 bg-slate-950 h-full overflow-y-auto whitespace-pre-wrap">
                {consoleOutput}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
