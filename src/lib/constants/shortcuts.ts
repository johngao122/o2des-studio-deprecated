export type KeyboardShortcut = {
    key: string;
    ctrlKey?: boolean;
    altKey?: boolean;
    shiftKey?: boolean;
    label: string;
};

export const KeyboardShortcuts: Record<string, KeyboardShortcut> = {
    // File operations
    SAVE: { key: "s", ctrlKey: true, label: "Save" },
    LOAD: { key: "o", ctrlKey: true, label: "Open" },
    NEW: { key: "n", ctrlKey: true, label: "New" },

    // Edit operations
    UNDO: { key: "z", ctrlKey: true, label: "Undo" },
    REDO: { key: "y", ctrlKey: true, label: "Redo" },
    COPY: { key: "c", ctrlKey: true, label: "Copy" },
    CUT: { key: "x", ctrlKey: true, label: "Cut" },
    PASTE: { key: "v", ctrlKey: true, label: "Paste" },

    // View operations
    ZOOM_IN: { key: "=", ctrlKey: true, label: "Zoom In" },
    ZOOM_OUT: { key: "-", ctrlKey: true, label: "Zoom Out" },
    FIT_VIEW: { key: "0", ctrlKey: true, label: "Fit View" },
    TOGGLE_DARK_MODE: {
        key: "d",
        ctrlKey: true,
        altKey: true,
        label: "Toggle Dark Mode",
    },

    // UI toggle shortcuts
    TOGGLE_SIDEBAR: { key: "b", ctrlKey: true, label: "Toggle Sidebar" },
    TOGGLE_MINIMAP: { key: "m", ctrlKey: true, label: "Toggle Minimap" },
    TOGGLE_CONTROLS: { key: "l", ctrlKey: true, label: "Toggle Controls" },

    // Help shortcuts
    SHOW_SHORTCUTS: { key: "/", ctrlKey: true, label: "Show Shortcuts" },
};

// Helper to format keyboard shortcut for display
export const formatShortcut = (shortcut: KeyboardShortcut): string => {
    const parts: string[] = [];

    if (shortcut.ctrlKey) {
        parts.push(navigator.platform.indexOf("Mac") === 0 ? "⌘" : "Ctrl");
    }

    if (shortcut.altKey) {
        parts.push(navigator.platform.indexOf("Mac") === 0 ? "⌥" : "Alt");
    }

    if (shortcut.shiftKey) {
        parts.push("Shift");
    }

    // Handle special key names
    const keyMap: Record<string, string> = {
        "=": "+",
        "-": "-",
        ArrowUp: "↑",
        ArrowDown: "↓",
        ArrowLeft: "←",
        ArrowRight: "→",
    };

    const displayKey = keyMap[shortcut.key] || shortcut.key.toUpperCase();
    parts.push(displayKey);

    return parts.join("+");
};
