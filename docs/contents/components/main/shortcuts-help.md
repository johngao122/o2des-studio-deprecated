# Shortcuts Help

<div class="lead">
A modal component displaying keyboard shortcuts and help information for the application.
</div>

## Overview

The Shortcuts Help component provides a comprehensive list of keyboard shortcuts and their descriptions, organized by categories.

## Interface

```typescript
interface ShortcutsHelpProps {
    isOpen: boolean;
    onClose: () => void;
    categories?: ShortcutCategory[];
}

interface ShortcutCategory {
    id: string;
    name: string;
    shortcuts: Shortcut[];
}

interface Shortcut {
    key: string;
    description: string;
    category: string;
    platform?: "all" | "mac" | "windows" | "linux";
}
```

## Features

### Shortcut Display

-   Categorized shortcuts
-   Platform-specific keys
-   Search functionality
-   Filterable list
-   Visual key representation

### Categories

-   General
-   Navigation
-   Editing
-   Tools
-   View
-   Custom categories

### Accessibility

-   Keyboard navigation
-   Screen reader support
-   High contrast mode
-   Focus management

## Usage

```typescript
import { ShortcutsHelp } from "@/components/main/ShortcutsHelp";

function App() {
    const [isHelpOpen, setHelpOpen] = useState(false);

    return (
        <ShortcutsHelp
            isOpen={isHelpOpen}
            onClose={() => setHelpOpen(false)}
            categories={[
                {
                    id: "general",
                    name: "General",
                    shortcuts: [
                        {
                            key: "Ctrl+S",
                            description: "Save project",
                            category: "general",
                        },
                    ],
                },
            ]}
        />
    );
}
```

## Default Shortcuts

### General

| Key        | Action              |
| ---------- | ------------------- |
| `?`        | Show shortcuts help |
| `Ctrl + S` | Save                |
| `Ctrl + Z` | Undo                |
| `Ctrl + Y` | Redo                |
| `Esc`      | Cancel/Close        |

### Navigation

| Key            | Action         |
| -------------- | -------------- |
| `Space + Drag` | Pan canvas     |
| `+/-`          | Zoom in/out    |
| `0`            | Reset zoom     |
| `Arrow keys`   | Move selection |

### Editing

| Key        | Action          |
| ---------- | --------------- |
| `Delete`   | Delete selected |
| `Ctrl + C` | Copy            |
| `Ctrl + V` | Paste           |
| `Ctrl + D` | Duplicate       |

## Best Practices

1. **Organization**

    - Clear categorization
    - Logical grouping
    - Platform awareness
    - Search optimization

2. **Accessibility**

    - Keyboard focus
    - Screen reader
    - High contrast
    - Clear hierarchy

3. **UX Guidelines**
    - Quick access
    - Visual clarity
    - Consistent styling
    - Responsive layout
