import { create } from "zustand";

export const useOSStore = create((set) => ({
    openWindows: [
        {
            id: "notepad-1",
            title: "Text Editor",
            component: "TextEditor",
            position: { x: 100, y: 100 },
            size: { width: 400, height: 300 },
            zIndex: 10,
            isminimized: false,
        },
    ],

    maxzIndex: 10,

    focuswindow: (id) =>
        set((state) => {
            const nextZIndex = state.maxzIndex + 1;

            return {
                maxzIndex: nextZIndex,

                openWindows: state.openWindows.map((win) =>
                    win.id === id
                        ? { ...win, zIndex: nextZIndex }
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
}));