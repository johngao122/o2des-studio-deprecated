# Main Components

<div class="lead">
Core application components that provide the main functionality and user interface of O2DES Studio.
</div>

## Overview

The main components form the primary interface of the application, handling user interactions, tool management, and property editing.

<pre class="mermaid">
graph TB
    subgraph Main Interface
        Toolbar[Toolbar.tsx]
        Properties[PropertiesBar.tsx]
        Drawer[ComponentDrawer.tsx]
        Shortcuts[ShortcutsHelp.tsx]
    end

    subgraph UI Layer
        Button[UI/Button]
        Select[UI/Select]
        Input[UI/Input]
    end

    subgraph Node Layer
        Nodes[Node Components]
    end

    Toolbar --> UI Layer
    Properties --> UI Layer
    Drawer --> UI Layer
    UI Layer --> Node Layer
</pre>

## Components

### [Toolbar](toolbar.html)

The main toolbar component providing access to tools and actions.

```typescript
interface ToolbarProps {
    onAction: (action: ToolbarAction) => void;
    activeTools: string[];
    disabled?: boolean;
}

type ToolbarAction =
    | { type: "add_node"; nodeType: string }
    | { type: "delete" }
    | { type: "undo" }
    | { type: "redo" }
    | { type: "zoom"; level: number };
```

**Features:**

-   Tool selection
-   Node creation
-   Edit operations
-   View controls
-   Keyboard shortcuts

### [PropertiesBar](properties-bar.html)

Side panel for editing node properties and configurations.

```typescript
interface PropertiesBarProps {
    selectedNode?: Node;
    onPropertyChange: (property: string, value: any) => void;
    onApply: () => void;
    onCancel: () => void;
}

interface Node {
    id: string;
    type: string;
    properties: Record<string, any>;
}
```

**Features:**

-   Property editing
-   Validation
-   Type-specific controls
-   Real-time preview

### [ComponentDrawer](component-drawer.html)

Drawer component for selecting and managing node types.

```typescript
interface ComponentDrawerProps {
    components: ComponentType[];
    onSelect: (component: ComponentType) => void;
    categories: Category[];
}

interface ComponentType {
    id: string;
    name: string;
    category: string;
    icon: React.ReactNode;
    preview: React.ReactNode;
}
```

**Features:**

-   Component browsing
-   Category filtering
-   Drag and drop
-   Preview support

### [ShortcutsHelp](shortcuts-help.html)

Modal component displaying keyboard shortcuts and help.

```typescript
interface ShortcutsHelpProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Shortcut {
    key: string;
    description: string;
    category: string;
}
```

**Features:**

-   Shortcut listing
-   Category organization
-   Search functionality
-   Quick access

## Integration

### Component Manager

The `ComponentManager.ts` file handles component registration and management:

```typescript
class ComponentManager {
    registerComponent(type: string, component: ComponentType): void;
    getComponent(type: string): ComponentType | undefined;
    listComponents(): ComponentType[];
    categorizeComponents(): Record<string, ComponentType[]>;
}
```

### Workflow Example

<pre class="mermaid">
sequenceDiagram
    participant User
    participant Toolbar
    participant Drawer
    participant Properties
    participant Canvas

    User->>Toolbar: Select Tool
    Toolbar->>Drawer: Open Component List
    User->>Drawer: Select Component
    Drawer->>Canvas: Add Node
    User->>Canvas: Select Node
    Canvas->>Properties: Show Properties
    User->>Properties: Edit Properties
    Properties->>Canvas: Update Node
</pre>

## State Management

### Local State

```typescript
interface ToolbarState {
    activeTools: string[];
    zoom: number;
    history: {
        canUndo: boolean;
        canRedo: boolean;
    };
}
```

### Global State

```typescript
interface AppState {
    selectedNode: Node | null;
    components: ComponentType[];
    clipboard: Node | null;
}
```

## Event Handling

### Action Handlers

```typescript
type ActionHandler = {
    onToolSelect: (tool: string) => void;
    onNodeCreate: (type: string) => void;
    onPropertyChange: (node: Node, prop: string, value: any) => void;
    onShortcut: (key: string) => void;
};
```

## Best Practices

1. **State Management**

    - Use local state for UI
    - Global state for shared data
    - Optimize updates

2. **Performance**

    - Lazy load components
    - Memoize callbacks
    - Debounce events

3. **Accessibility**

    - Keyboard navigation
    - ARIA labels
    - Focus management

4. **Error Handling**
    - Graceful degradation
    - Error boundaries
    - User feedback

## Related Documentation

-   [Node Components](../nodes/index.html)
-   [UI Components](../ui/index.html)
-   [Architecture](../../architecture.html)
