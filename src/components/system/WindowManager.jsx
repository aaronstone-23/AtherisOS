import { Rnd } from "react-rnd";
import { Copy, Minus, Square, X } from "lucide-react";
import { useOSStore } from "../../context/useOSStore";
import FileExplorer from "../apps/FileExplorer";
import Settings from "../apps/Settings";
import Terminal from "../apps/Terminal";
import TextEditor from "../apps/TextEditor";

const appComponents = { FileExplorer, Settings, Terminal, TextEditor };

function UnavailableApp({ title }) {
    return <div className="flex h-full items-center justify-center p-6 text-center text-sm text-slate-400">{title} is not available yet.</div>;
}

export default function WindowManager() {
    const { openWindows, focuswindow, updateWinPosition, updateWinSize, closewindow, toggleMinimize, toggleMaximize } = useOSStore();

    return (
        <div className="relative h-full w-full">
            {openWindows.filter((win) => !win.isminimized).map((win) => {
                const AppContent = appComponents[win.component];
                const isMaximized = win.isMaximized;

                return (
                    <Rnd
                        key={win.id}
                        size={isMaximized ? { width: "100%", height: "100%" } : win.size}
                        position={isMaximized ? { x: 0, y: 0 } : win.position}
                        bounds="parent"
                        disableDragging={isMaximized}
                        enableResizing={!isMaximized}
                        onDragStop={(_, data) => updateWinPosition(win.id, { x: data.x, y: data.y })}
                        onResizeStop={(_, __, ref, ___, position) => updateWinSize(win.id, { width: ref.offsetWidth, height: ref.offsetHeight, position })}
                        onMouseDown={() => focuswindow(win.id)}
                        style={{ zIndex: win.zIndex }}
                        className="rounded-xl"
                    >
                        <div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-slate-900/95 text-white shadow-2xl backdrop-blur-xl">
                            <div className="flex cursor-move select-none items-center justify-between border-b border-white/10 bg-slate-950/80 px-3 py-2">
                                <div className="group flex items-center gap-1.5">
                                    <button onClick={() => closewindow(win.id)} className="flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-black/70" title="Close"><X className="h-2 w-2 opacity-0 group-hover:opacity-100" /></button>
                                    <button onClick={() => toggleMinimize(win.id)} className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-500 text-black/70" title="Minimize"><Minus className="h-2 w-2 opacity-0 group-hover:opacity-100" /></button>
                                    <button onClick={() => toggleMaximize(win.id)} className="flex h-3 w-3 items-center justify-center rounded-full bg-green-500 text-black/70" title={isMaximized ? "Restore" : "Maximize"}>{isMaximized ? <Copy className="h-2 w-2 opacity-0 group-hover:opacity-100" /> : <Square className="h-2 w-2 opacity-0 group-hover:opacity-100" />}</button>
                                </div>
                                <span className="text-xs font-medium text-slate-300">{win.title}</span>
                                <span className="w-12" />
                            </div>
                            <div className="min-h-0 flex-1 overflow-hidden">{AppContent ? <AppContent /> : <UnavailableApp title={win.title} />}</div>
                        </div>
                    </Rnd>
                );
            })}
        </div>
    );
}
