import { create } from "zustand";
import { persist } from "zustand/middleware";

type UIState = {
    // Sidebar state
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    setSidebarOpen: (isOpen: boolean) => void;

    // Theme state
    isDarkMode: boolean;
    toggleDarkMode: () => void;

    // Grid settings
    gridSize: number;
    setGridSize: (size: number) => void;
    snapToGrid: boolean;
    toggleSnapToGrid: () => void;

    // UI preferences
    miniMapVisible: boolean;
    toggleMiniMap: () => void;

    controlsVisible: boolean;
    toggleControls: () => void;

    // Last action
    lastAction: string;
    setLastAction: (action: string) => void;
};

export const useUIStore = create<UIState>()(
    persist(
        (set) => ({
            // Sidebar state
            isSidebarOpen: true,
            toggleSidebar: () =>
                set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
            setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),

            // Theme state
            isDarkMode: false,
            toggleDarkMode: () =>
                set((state) => ({ isDarkMode: !state.isDarkMode })),

            // Grid settings
            gridSize: 15,
            setGridSize: (size) => set({ gridSize: size }),
            snapToGrid: true,
            toggleSnapToGrid: () =>
                set((state) => ({ snapToGrid: !state.snapToGrid })),

            // UI preferences
            miniMapVisible: true,
            toggleMiniMap: () =>
                set((state) => ({ miniMapVisible: !state.miniMapVisible })),

            controlsVisible: true,
            toggleControls: () =>
                set((state) => ({ controlsVisible: !state.controlsVisible })),

            // Last action
            lastAction: "",
            setLastAction: (action) => set({ lastAction: action }),
        }),
        {
            name: "o2des-ui-storage",
        }
    )
);
