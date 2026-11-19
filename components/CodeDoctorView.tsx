import React, { useState } from 'react';
import { ShieldAlert, Sparkles, Bot, Loader2 } from 'lucide-react';

export default function CodeDoctorView() {
  const [language, setLanguage] = useState('cpp');
  const [board, setBoard] = useState('ESP32 DevKit');
  const [sourceCode, setSourceCode] = useState(`#include <WiFi.h>\n\nvoid setup() {\n  Serial.begin(115200)\n  WiFi.begin("SSID", "PASS");\n}\n\nvoid loop() {\n  delay(1000)\n}`);
  const [errorLog, setErrorLog] = useState("error: expected ';' before 'WiFi' or missing semicolon on line 4.");
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    setDiagnosis(null);
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'debug',
          prompt: `Analyze this ${language} code and compiler error for ${board}. Identify bugs, explain why they occurred, and provide fully corrected code.\n\nCode:\n${sourceCode}\n\nError Log:\n${errorLog}`,
        }),
      });
      const data = await res.json();
      setDiagnosis(data.result);
    } catch (err: any) {
      setDiagnosis(`Diagnosis error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Code Doctor & Debugger</h1>
            <p className="text-sm text-slate-400">Advanced compiler error analysis and automated bug correction for ESP32, Arduino, and Python.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Programming Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="cpp">Arduino C/C++</option>
                <option value="esp32">ESP32 Arduino</option>
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Target Board / Environment</label>
              <select
                value={board}
                onChange={(e) => setBoard(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="ESP32 DevKit">ESP32 DevKit V1</option>
                <option value="Arduino Uno">Arduino Uno</option>
                <option value="Python 3.11">Python Worker</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Source Code</label>
            <textarea
              rows={8}
              value={sourceCode}
              onChange={(e) => setSourceCode(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Compiler or Runtime Error Message</label>
            <input
              type="text"
              value={errorLog}
              onChange={(e) => setErrorLog(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs font-mono text-red-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-600/25 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            <span>Analyze with Code Doctor AI</span>
          </button>
        </div>

        {/* Diagnosis Results */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Bot className="w-5 h-5 text-emerald-400" />
            <span>Diagnosis & Corrected Code</span>
          </h2>
          <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-6 overflow-y-auto text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
            {diagnosis || 'Click "Analyze with Code Doctor AI" to inspect code bugs and receive verified fixes.'}
          </div>
        </div>
      </div>
    </div>
  );
}
