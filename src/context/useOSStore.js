import { create } from "zustand";

export const useOSStore = create((set) => ({
    activeApp: "textEditor",
    openWindows: [
        {
            id: "notepad-1",
            appId: "textEditor",
            title: "Text Editor",
            component: "TextEditor",
            position: { x: 100, y: 100 },
            size: { width: 400, height: 300 },
            zIndex: 10,
            isminimized: false,
            isMaximized: true,
        },
    ],

    maxzIndex: 10,

    focuswindow: (id) =>
        set((state) => {
            const nextZIndex = state.maxzIndex + 1;
            const targetWin= state.openWindows.find((w) => w.id===id);

            return {
                maxzIndex: nextZIndex,
                activeApp: targetWin ? targetWin.appId : state.activeApp,
                openWindows: state.openWindows.map((win) =>
                    win.id === id
                        ? { ...win, zIndex: nextZIndex, isminimized: false, }
                        : win
                ),
            };
        }),

    updateWinPosition: (id, position) =>
        set((state) => ({
            openWindows: state.openWindows.map((win) =>
                win.id === id
                    ? { ...win, position }
                    : win
            ),
        })),

    closewindow: (id) =>
        set((state) => ({
            openWindows: state.openWindows.filter(
                (win) => win.id !== id
            ),
        })),
    
    toggleMinimize: (id)=>
        set((state)=> ({
            openWindows: state.openWindows.map((win) => 
            win.id === id ? {...win, isminimized: !win.isminimized} : win
        ),
    })),

    toggleMaximize:(id)=>set((state)=>({
        openWindows: state.openWindows.map((win)=>
        win.id=== id ? {...win, isMaximized:!win.isMaximized} : win
    ),
    })),

    openApp: (appId) =>
        set((state) => {
            const existingWindow = state.openWindows.find((win) => win.appId === appId);
            const nextZIndex = state.maxzIndex + 1;

            if (existingWindow) {
                return {
                    activeApp: appId,
                    maxzIndex: nextZIndex,
                    openWindows: state.openWindows.map((win) =>
                        win.id === existingWindow.id ? { ...win, zIndex: nextZIndex, isminimized: false } : win
                    ),
                };
            }

            const appDetails = {
                textEditor: { title: "Text Editor", component: "TextEditor" },
                terminal: { title: "Terminal", component: "Terminal" },
                fileExplorer: {title: "File Expplorer", component: "FileExplorer"},
                settings: {tittle:"Settings", component: "Settings"},
                easterEgg: {title: "???", component: "EasterEgg"},
                trash: {title: "Recycle Bin", component: "Trash"},
            }[appId] ?? { title: appId, component: "MissingApp" };

            return {
                activeApp: appId,
                maxzIndex: nextZIndex,
                openWindows: [
                    ...state.openWindows,
                    {
                        id: `${appId}-${Date.now()}`,
                        appId,
                        ...appDetails,
                        position: { x: 140, y: 120 },
                        size: { width: 400, height: 300 },
                        zIndex: nextZIndex,
                        isminimized: false,
                        isMaximized: false,
                    },
                ],
            };
        }),
}));
