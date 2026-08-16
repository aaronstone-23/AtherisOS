import React from "react";
import { Rnd } from "react-rnd";
import { useOSStore } from "../../context/useOSStore";


//okay so this is the placeholder FOR APPS!!! we will change this shit
import TextEditor from "../apps/TextEditor";
import Terminal from "../apps/Terminal";

const appComponents = {
    TextEditor,
    Terminal,
};

export default function WindowManager() {
    const { openWindows, focuswindow, updateWinPosition, closewindow } = useOSStore();
    
    return (
        <>
            {openWindows.map((win) => {
                const AppContent = appComponents[win.component] || (() => <div>App not found</div>);
                
                return (
                    <Rnd
                        key={win.id}
                        size={{ width: win.size.width, height: win.size.height }}
                        position={{ x: win.position.x, y: win.position.y }}
                        onDragStop={(e, d) => {
                            updateWinPosition(win.id, { x: d.x, y: d.y });
                        }}
                        onMouseDown={() => focuswindow(win.id)}
                        bounds="parent"
                        style={{ zIndex: win.zIndex }}
                        className="absolute bg-gray-900 border border-gray-700 rounded-lg shadow-2xl flex flex-col overflow-hidden text-white"
                    >
                        {/*Title Bar*/}
                        <div className="bg-gray-800 px-4 py-2 flex justify-between items-center cursor-move select-none border-b border-gray-700">
                            <span className="text-sm font-semibold">{win.title}</span>
                            <button
                                onClick={() => closewindow(win.id)}
                                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition"
                            />
                        </div>

                        {/*Window Content*/}
                        <div className="flex-1 p-4 overflow-auto">
                            <AppContent />
                        </div>
                    </Rnd>
                );
            })}
        </>
    );
}