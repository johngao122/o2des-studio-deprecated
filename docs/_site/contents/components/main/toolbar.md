# Toolbar

<div class="lead">
The main toolbar component providing access to tools, actions, and controls for the workspace.
</div>

## Overview

The Toolbar component serves as the primary control center for the application, offering quick access to commonly used tools and actions.

## Interface

```typescript
interface ToolbarProps {
    onAction: (action: ToolbarAction) => void;
    activeTools: string[];
    disabled?: boolean;
    orientation?: "horizontal" | "vertical";
    position?: "top" | "left" | "right" | "bottom";
}

type ToolbarAction =
    | { type: "add_node"; nodeType: string }
    | { type: "delete" }
    | { type: "undo" }
    | { type: "redo" }
    | { type: "zoom"; level: number }
    | { type: "save" }
    | { type: "export" }
    | { type: "import" };

interface ToolbarState {
    activeTools: string[];
    zoom: number;
    history: {
        canUndo: boolean;
        canRedo: boolean;
    };
}
```

## Features

### Tool Management

-   Tool selection
-   Tool state tracking
-   Tool grouping
-   Custom tools support
-   Tool presets

### Actions

-   Node creation
-   Edit operations
-   View controls
-   File operations
-   Custom actions

### View Controls

-   Zoom controls
-   Grid toggle
-   Snap controls
-   View presets
-   Mini-map toggle

## Usage

```typescript
import { Toolbar } from "@/components/main/Toolbar";

function Workspace() {
    const handleAction = (action: ToolbarAction) => {
        switch (action.type) {
            case "add_node":
                // Handle node addition
                break;
            case "delete":
                // Handle deletion
                break;
            // ... handle other actions
        }
    };

    return (
        <Toolbar
            onAction={handleAction}
            activeTools={["select", "pan"]}
            orientation="horizontal"
            position="top"
        />
    );
}
```

## Default Tools

| Tool      | Icon | Description           |
| --------- | ---- | --------------------- |
| Select    | 🔍   | Select and move nodes |
| Pan       | ✋   | Pan the workspace     |
| Zoom      | 🔎   | Zoom in/out           |
| Add Node  | ➕   | Add new nodes         |
| Delete    | 🗑️   | Delete selected items |
| Undo/Redo | ↩️   | Undo/redo actions     |

## Events

| Event          | Description                           |
| -------------- | ------------------------------------- |
| `onAction`     | Fired when a tool action is triggered |
| `onToolChange` | Fired when active tool changes        |
| `onZoomChange` | Fired when zoom level changes         |

## Best Practices

1. **Tool Organization**

    - Logical grouping
    - Frequently used tools first
    - Clear visual hierarchy
    - Consistent positioning

2. **Performance**

    - Optimize tool switching
    - Cache tool states
    - Minimize re-renders

3. **UX Guidelines**
    - Clear tool states
    - Immediate feedback
    - Tooltips
    - Keyboard shortcuts
    - Contextual help
