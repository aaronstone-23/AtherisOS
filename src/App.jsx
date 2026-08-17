import React from "react";
import WindowManager from "./components/system/WindowManager";
import Taskbar from "./components/system/Taskbar";
export default function App() {
    return (
        <main className="w-screen h-screen bg-slate-950 overflow-hidden relative">
            {/*Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-black opacity-80" />
            {/* OS Desktop Container */}
            <div className="relative w-full h-full">
                <WindowManager />
                <Taskbar/>
            </div>
        </main>
    );
}