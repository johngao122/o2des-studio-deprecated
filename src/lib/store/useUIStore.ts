import { create } from "zustand";
import { persist } from "zustand/middleware";

type UIState = {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    setSidebarOpen: (isOpen: boolean) => void;

    isDarkMode: boolean;
    toggleDarkMode: () => void;

    gridSize: number;
    setGridSize: (size: number) => void;
    snapToGrid: boolean;
    toggleSnapToGrid: () => void;

    miniMapVisible: boolean;
    toggleMiniMap: () => void;

    controlsVisible: boolean;
    toggleControls: () => void;

    lastAction: string;
    setLastAction: (action: string) => void;

    isShortcutsHelpOpen: boolean;
    toggleShortcutsHelp: () => void;
    setShortcutsHelpOpen: (isOpen: boolean) => void;
};

export const useUIStore = create<UIState>()(
    persist(
        (set) => ({
            isSidebarOpen: true,
            toggleSidebar: () =>
                set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
            setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),

            isDarkMode: false,
            toggleDarkMode: () =>
                set((state) => ({ isDarkMode: !state.isDarkMode })),

            gridSize: 15,
            setGridSize: (size) => set({ gridSize: size }),
            snapToGrid: true,
            toggleSnapToGrid: () =>
                set((state) => ({ snapToGrid: !state.snapToGrid })),

            miniMapVisible: true,
            toggleMiniMap: () =>
                set((state) => ({ miniMapVisible: !state.miniMapVisible })),

            controlsVisible: true,
            toggleControls: () =>
                set((state) => ({ controlsVisible: !state.controlsVisible })),

            lastAction: "",
            setLastAction: (action) => set({ lastAction: action }),

            isShortcutsHelpOpen: false,
            toggleShortcutsHelp: () =>
                set((state) => ({
                    isShortcutsHelpOpen: !state.isShortcutsHelpOpen,
                })),
            setShortcutsHelpOpen: (isOpen) =>
                set({ isShortcutsHelpOpen: isOpen }),
        }),
        {
            name: "o2des-ui-storage",
        }
    )
);
