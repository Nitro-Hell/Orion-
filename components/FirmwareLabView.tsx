import React, { useState } from 'react';
import { BuildArtifact } from '@/lib/types';
import { Cpu, Terminal, Download, Sparkles, Loader2, FileText } from 'lucide-react';

interface FirmwareLabViewProps {
  artifacts: BuildArtifact[];
  onAddArtifact: (art: BuildArtifact) => void;
}

export default function FirmwareLabView({ artifacts, onAddArtifact }: FirmwareLabViewProps) {
  const [targetBoard, setTargetBoard] = useState<'ESP32 DevKit' | 'Arduino Uno'>('ESP32 DevKit');
  const [config, setConfig] = useState('ESP-IDF v5.1 / Release / 4MB Flash');
  const [sourceCode, setSourceCode] = useState(`#include <WiFi.h>\n\nvoid setup() {\n  Serial.begin(115200);\n  Serial.println("ESP32 Firmware Lab initialized.");\n}\n\nvoid loop() {\n  delay(1000);\n}`);
  const [partitions, setPartitions] = useState(`# Name,   Type, SubType, Offset,  Size, Flags\nnvs,      data, nvs,     0x9000,  0x4000,\notadata,  data, ota,     0xd000,  0x2000,\napp0,     app,  ota_0,   0x10000, 0x140000,\nspiffs,   data, spiffs,  0x290000,0x170000`);
  const [building, setBuilding] = useState(false);
  const [buildLogs, setBuildLogs] = useState<string[]>([]);

  const handleCompile = async () => {
    setBuilding(true);
    setBuildLogs(['Initializing isolated compiler worker...']);
    try {
      const res = await fetch('/api/firmware', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetBoard, sourceCode, config }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Build failed');

      setBuildLogs(data.artifact.buildLogs);
      onAddArtifact(data.artifact);
    } catch (err: any) {
      setBuildLogs((prev) => [...prev, `Error: ${err.message}`]);
    } finally {
      setBuilding(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Firmware Lab & Embedded Workspace</h1>
            <p className="text-sm text-slate-400">Compile ESP32 and Arduino firmware, configure partition tables (`partitions.csv`), and generate signed binary artifacts.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Compiler Configuration */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Target Microcontroller</label>
              <select
                value={targetBoard}
                onChange={(e) => setTargetBoard(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="ESP32 DevKit">ESP32 DevKit V1 (Xtensa Dual-Core)</option>
                <option value="Arduino Uno">Arduino Uno (ATmega328P)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Build Configuration</label>
              <input
                type="text"
                value={config}
                onChange={(e) => setConfig(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Main Sketch (`main.ino`)</label>
            <textarea
              rows={6}
              value={sourceCode}
              onChange={(e) => setSourceCode(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {targetBoard === 'ESP32 DevKit' && (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Partition Table (`partitions.csv`)</label>
              <textarea
                rows={4}
                value={partitions}
                onChange={(e) => setPartitions(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          <button
            onClick={handleCompile}
            disabled={building}
            className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {building ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            <span>Compile Firmware & Generate Binary</span>
          </button>
        </div>

        {/* Build Logs & Artifacts */}
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-indigo-400" />
              <span>Build Output & Compiler Logs</span>
            </h2>
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 h-48 overflow-y-auto space-y-1">
              {buildLogs.length > 0 ? (
                buildLogs.map((log, idx) => <div key={idx}>{log}</div>)
              ) : (
                <div className="text-slate-500">Click compile to execute build worker.</div>
              )}
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              <span>Generated Firmware Artifacts</span>
            </h2>
            <div className="space-y-3">
              {artifacts.map((art) => (
                <div key={art.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-sm text-white">{art.filename}</p>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">SHA-256: {art.sha256.substring(0, 24)}...</p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-2">
                      <span>Board: {art.targetBoard}</span>
                      <span>•</span>
                      <span>Size: {art.fileSize}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`Downloading signed firmware binary ${art.filename}...`)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition flex items-center gap-2 shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
