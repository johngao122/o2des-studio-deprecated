import { useEffect } from "react";
import { KeyboardShortcut } from "../constants/shortcuts";

type ShortcutHandler = (e: KeyboardEvent) => void;

type ShortcutActions = {
    [key: string]: ShortcutHandler;
};

export const useKeyboardShortcuts = (
    shortcuts: Record<string, KeyboardShortcut>,
    actions: ShortcutActions
) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Don't trigger shortcuts when typing in input fields
            if (
                document.activeElement instanceof HTMLInputElement ||
                document.activeElement instanceof HTMLTextAreaElement
            ) {
                return;
            }

            // Check each registered shortcut
            for (const [name, shortcut] of Object.entries(shortcuts)) {
                const keyMatches =
                    e.key.toLowerCase() === shortcut.key.toLowerCase();
                const ctrlMatches =
                    !!shortcut.ctrlKey === e.ctrlKey || e.metaKey; // Support both Ctrl and Command (Mac)
                const altMatches = !!shortcut.altKey === e.altKey;
                const shiftMatches = !!shortcut.shiftKey === e.shiftKey;

                if (keyMatches && ctrlMatches && altMatches && shiftMatches) {
                    const action = actions[name];
                    if (action) {
                        e.preventDefault(); // Prevent default browser behavior
                        action(e);
                        break;
                    }
                }
            }
        };

        // Add event listener
        window.addEventListener("keydown", handleKeyDown);

        // Clean up
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [shortcuts, actions]);
};
