import React from 'react';
import { Terminal, Cpu, Bot, Sparkles, ArrowRight, Code2, Zap } from 'lucide-react';

interface LandingPageProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
  onEnterApp: () => void;
}

export default function LandingPage({ onOpenAuth, onEnterApp }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-50 bg-[#0b0f19]/90">
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
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#ai-suite" className="hover:text-white transition">AI Assistant</a>
          <a href="#firmware" className="hover:text-white transition">Firmware Lab</a>
          <a href="#arena" className="hover:text-white transition">Arena</a>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => onOpenAuth('login')}
            className="text-sm font-medium text-slate-300 hover:text-white px-4 py-2 transition"
          >
            Sign In
          </button>
          <button
            onClick={() => onOpenAuth('register')}
            className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 px-5 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 transition flex items-center gap-2"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-6 md:px-12 flex-1 flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/40 via-[#0b0f19] to-[#0b0f19] pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Powered Coding, Learning & Engineering Platform</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-white">
            Think. Code. Debug. <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-sky-300 bg-clip-text text-transparent">Engineer.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            The professional browser-based IDE and engineering workspace equipped with advanced AI assistant, Code Doctor, embedded Firmware Lab for ESP32/Arduino, and interactive Coding Arena.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onEnterApp}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-base shadow-xl shadow-blue-600/30 transition flex items-center justify-center gap-3 group"
            >
              <span>Launch Workspace Demo</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onOpenAuth('register')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-semibold text-base transition flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Create Free Account</span>
            </button>
          </div>

          {/* Quick Stats Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-slate-800/60 max-w-3xl mx-auto text-left">
            <div>
              <p className="text-3xl font-extrabold text-white">99.9%</p>
              <p className="text-xs text-slate-400 mt-1">Worker Uptime</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-blue-400">ESP32 & C++</p>
              <p className="text-xs text-slate-400 mt-1">Embedded Firmware Lab</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-indigo-400">Gemini 4</p>
              <p className="text-xs text-slate-400 mt-1">AI Coding Assistant</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-emerald-400">Zero-Setup</p>
              <p className="text-xs text-slate-400 mt-1">Browser IDE & Preview</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section id="features" className="py-24 px-6 md:px-12 bg-slate-950/60 border-t border-slate-800/80">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Professional Engineering Suite</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">Everything modern developers and IoT engineers need in a lightning-fast web workspace.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 space-y-4 hover:border-blue-500/50 transition">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white">AI Assistant & Code Doctor</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Conversational AI with Learn, Build, and Debug modes. Automatically analyze compiler errors, missing semicolons, and logic flaws in Python, JavaScript, and Arduino C++.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 space-y-4 hover:border-indigo-500/50 transition">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white">Firmware Lab for ESP32 & Arduino</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Configure partition tables (`partitions.csv`), compile sketches, inspect binary metadata, and calculate SHA-256 checksums with isolated build workers.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 space-y-4 hover:border-emerald-500/50 transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white">Monaco Code Studio & Sandbox</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Full browser IDE with Monaco editor, multi-tabs, file explorer, live iframe HTML/CSS/JS preview, and secure Python execution workers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 border-t border-slate-800/80 text-center text-xs text-slate-500">
        <p>© 2026 CodeSphere Inc. Think. Code. Debug. Engineer. All rights reserved.</p>
      </footer>
    </div>
  );
}
