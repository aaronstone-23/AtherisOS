import React, { useState, useRef } from 'react';
import { Download, Upload, FileText, Trash2 } from 'lucide-react';

export default function TextEditor() {
  const [content, setContent] = useState('');
  const [filename, setFilename] = useState('Untitled.txt');
  const fileInputRef = useRef(null);

  const handleSaveToPC = () => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename.endsWith('.txt') ? filename : `${filename}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleOpenFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFilename(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      setContent(event.target.result);
    };
    reader.readAsText(file);
  };

  const lineCount = content ? content.split('\n').length : 1;
  const charCount = content.length;

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100">
      {/* Sleek Minimal Toolbar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900/90 border-b border-white/10 gap-2">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-cyan-400" />
          <input
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            className="bg-transparent border border-transparent hover:border-white/10 focus:border-cyan-500/50 rounded px-1.5 py-0.5 text-xs text-slate-200 font-medium outline-none w-36 transition-colors"
          />
        </div>

        <div className="flex items-center gap-1">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleOpenFile}
            accept=".txt"
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition-colors"
          >
            <Upload className="w-3.5 h-3.5" />
            Open
          </button>

          <button
            onClick={handleSaveToPC}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-md transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            Save .txt
          </button>

          <button
            onClick={() => setContent('')}
            className="p-1 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors ml-1"
            title="Clear canvas"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Full Canvas Workspace */}
      <div className="flex-1 relative w-full h-full bg-slate-950">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start typing your notes here..."
          className="w-full h-full p-4 bg-transparent text-slate-200 font-mono text-sm resize-none outline-none selection:bg-cyan-500/30 leading-relaxed"
          spellCheck={false}
        />
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-3 py-1 bg-slate-900/50 border-t border-white/5 text-[11px] text-slate-400 font-mono">
        <span>UTF-8</span>
        <span>
          Lines: {lineCount} | Chars: {charCount}
        </span>
      </div>
    </div>
  );
}