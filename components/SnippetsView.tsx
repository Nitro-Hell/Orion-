import React, { useState } from 'react';
import { Snippet } from '@/lib/types';
import { INITIAL_SNIPPETS } from '@/lib/mock-data';
import { Code2, Plus, Copy, Check, Search, Tag } from 'lucide-react';

export default function SnippetsView() {
  const [snippets, setSnippets] = useState<Snippet[]>(INITIAL_SNIPPETS);
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleNewSnippet = () => {
    const title = prompt('Snippet Title:');
    if (!title) return;
    const code = prompt('Snippet Code:') || '// Code';
    const newSnip: Snippet = {
      id: `snip-${Date.now()}`,
      title,
      language: 'cpp',
      description: 'Saved custom code snippet.',
      tags: ['Embedded', 'Custom'],
      code,
      createdAt: new Date().toISOString().substring(0, 10),
    };
    setSnippets([newSnip, ...snippets]);
  };

  const filtered = snippets.filter((s) => s.title.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8 pb-12">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Code Snippets Library</h1>
            <p className="text-sm text-slate-400">Save, categorize, and reuse your favorite algorithms, GPIO configurations, and helper functions.</p>
          </div>
        </div>
        <button
          onClick={handleNewSnippet}
          className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Snippet</span>
        </button>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
        <input
          type="text"
          placeholder="Search snippets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 pl-11 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((snip) => (
          <div key={snip.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-semibold">
                  {snip.language}
                </span>
                <button
                  onClick={() => handleCopy(snip.code, snip.id)}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
                >
                  {copiedId === snip.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedId === snip.id ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div>
                <h3 className="font-semibold text-white text-base">{snip.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{snip.description}</p>
              </div>
              <pre className="bg-slate-950 p-4 rounded-xl text-xs font-mono text-slate-300 overflow-x-auto max-h-36">
                {snip.code}
              </pre>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-slate-800/80">
              {snip.tags.map((t, idx) => (
                <span key={idx} className="flex items-center gap-1 text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">
                  <Tag className="w-3 h-3" />
                  <span>{t}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
