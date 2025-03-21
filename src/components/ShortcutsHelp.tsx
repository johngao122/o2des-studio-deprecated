import React from "react";
import { KeyboardShortcuts, formatShortcut } from "@/lib/constants/shortcuts";

type ShortcutsHelpProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const ShortcutsHelp: React.FC<ShortcutsHelpProps> = ({
    isOpen,
    onClose,
}) => {
    if (!isOpen) return null;

    const shortcutGroups = {
        "File Operations": ["SAVE", "LOAD", "NEW"],
        "Edit Operations": ["UNDO", "REDO", "COPY", "CUT", "PASTE"],
        "View Operations": [
            "ZOOM_IN",
            "ZOOM_OUT",
            "FIT_VIEW",
            "TOGGLE_DARK_MODE",
        ],
        "UI Toggles": ["TOGGLE_SIDEBAR", "TOGGLE_MINIMAP", "TOGGLE_CONTROLS"],
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-auto">
                <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold">Keyboard Shortcuts</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <div className="p-4">
                    {Object.entries(shortcutGroups).map(
                        ([groupName, shortcutKeys]) => (
                            <div key={groupName} className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">
                                    {groupName}
                                </h3>
                                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                                    {shortcutKeys.map((key) => {
                                        const shortcut = KeyboardShortcuts[key];
                                        return (
                                            <div
                                                key={key}
                                                className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-600 last:border-b-0"
                                            >
                                                <span>{shortcut.label}</span>
                                                <div className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-sm font-mono">
                                                    {formatShortcut(shortcut)}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};
