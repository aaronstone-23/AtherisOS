import React from "react";
import { Rnd } from "react-rnd";
import { Minus, Square, Copy, X} from 'lucide-react'
import { useOSStore } from "../../context/useOSStore";


//okay so this is the placeholder FOR APPS!!! we will change this shit
import TextEditor from "../apps/TextEditor";
import Terminal from "../apps/Terminal";
import Settings from "../apps/Settings";
import FileExplorer from "../apps/FileExplorer"

const appComponents = {
    TextEditor,
    Terminal,
};

export default function WindowManager() {
    const { openWindows, focuswindow, updateWinPosition, closewindow } = useOSStore();
    
    return (
    <div className="relative w-full h-full pointer-events-none">
      {Object.entries(appRegistry).map(([appId, config]) => {
        const winState = windows[appId];
        if (!winState?.isOpen || winState?.isMinimized) return null;

        const Component = config.component;
        const isMaximized = winState?.isMaximized;

        return (
          <Rnd
            key={appId}
            default={{
              x: 100,
              y: 80,
              width: config.defaultSize.width,
              height: config.defaultSize.height,
            }}
            position={isMaximized ? { x: 0, y: 0 } : undefined}
            size={isMaximized ? { width: '100%', height: 'calc(100vh - 4.5rem)' } : undefined}
            disableDragging={isMaximized}
            enableResizing={!isMaximized}
            bounds="parent"
            onMouseDown={() => setActiveApp(appId)}
            className={`pointer-events-auto flex flex-col bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl overflow-hidden transition-all duration-150 ${
              activeApp === appId ? 'ring-1 ring-cyan-500/40 z-30' : 'z-10 opacity-95'
            }`}
          >
            {/* Window Titlebar */}
            <div className="flex items-center justify-between px-3 py-2 bg-slate-950/80 border-b border-white/10 select-none cursor-move">
              <div className="flex items-center gap-2">
                {/* Traffic Lights (Mac-style look with action icons) */}
                <div className="flex items-center gap-1.5 group">
                  <button
                    onClick={() => closeApp(appId)}
                    className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-black/70 transition-colors"
                    title="Close"
                  >
                    <X className="w-2 h-2 opacity-0 group-hover:opacity-100" />
                  </button>
                  <button
                    onClick={() => minimizeApp(appId)}
                    className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center text-black/70 transition-colors"
                    title="Minimize"
                  >
                    <Minus className="w-2 h-2 opacity-0 group-hover:opacity-100" />
                  </button>
                  <button
                    onClick={() => toggleMaximizeApp(appId)}
                    className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-black/70 transition-colors"
                    title={isMaximized ? 'Restore' : 'Maximize'}
                  >
                    {isMaximized ? (
                      <Copy className="w-2 h-2 opacity-0 group-hover:opacity-100" />
                    ) : (
                      <Square className="w-2 h-2 opacity-0 group-hover:opacity-100" />
                    )}
                  </button>
                </div>
                <span className="text-xs font-medium text-slate-300 ml-2">{config.title}</span>
              </div>
            </div>

            {/* Window Content */}
            <div className="flex-1 w-full overflow-hidden">
              <Component />
            </div>
          </Rnd>
        );
      })}
    </div>
  );
}