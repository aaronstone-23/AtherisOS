import React from "react";
import{
    Folder,
    FileText,
    Trash2,
    Sparkles,
    LayoutGrid,
    Terminal,
    Settings,
} from 'lucide-react';
import { useOSStore } from "../../context/useOSStore";


// DOCK ITEMSS HEREEEEEEEEEEEEEEEEEEE AHAHQAHAH!!
export default function Taskbar() {
    const { openApp, activeApp } = useOSStore();
    
    const dockItems = [
        { id: 'start', label: 'Start Menu', icon: LayoutGrid, action: () => openApp('startMenu') },
    { id: 'fileExplorer', label: 'File Explorer', icon: Folder, action: () => openApp('fileExplorer') },
    { id: 'textEditor', label: 'Text Editor', icon: FileText, action: () => openApp('textEditor') },
    { id: 'terminal', label: 'Terminal', icon: Terminal, action: () => openApp('terminal') },
    { id: 'settings', label: 'Settings', icon: Settings, action: () => openApp('settings') },
    { id: 'easterEgg', label: '???', icon: Sparkles, action: () => openApp('easterEgg') },
    { id: 'trash', label: 'Recycle Bin', icon: Trash2, action: () => openApp('trash') },
  ];
  

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
     {dockItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeApp === item.id;
          
          return (
            <button
                key={item.id}
                onClick={item.action}
                className = "group relative p-2.5 rounded-xl hover:bg-white/10 transition-all duration-200 hover:-translate-y-1.5 active:translate-y-0"
                title={item.label}
            >
                <Icon className="w-6 h-6 text-slate-200 group-hover:text-white transition-colors" />

                {/* Activeeeee DOTTT INDICATORRR (kinda sounds like vindicator lol) */}
                {isActive && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]" />
              )}

              {/* TOOLLLTIPPPPP  I GOT MOON LITT UP (litt up is suits reference IF U ARE READING THIS BTW)*/}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 text-xs text-white bg-slate-900/90 border border-white/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
                {item.label}
              </span>

            </button>
          );
        })}

        </div>
    </div>
    );
}

// i hate brackets, whatever, let co-pilot handle it🗿
