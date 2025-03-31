# Component Drawer

<div class="lead">
A draggable and resizable drawer component for managing and selecting simulation components.
</div>

## Overview

The Component Drawer provides a categorized list of available simulation components that users can drag and drop into the workspace.

## Interface

```typescript
interface ComponentDrawerProps {
    components: ComponentType[];
    onSelect: (component: ComponentType) => void;
    categories: Category[];
    isOpen?: boolean;
    width?: number;
    position?: "left" | "right";
}

interface ComponentType {
    id: string;
    name: string;
    category: string;
    icon: React.ReactNode;
    preview: React.ReactNode;
    description?: string;
    tags?: string[];
}

interface Category {
    id: string;
    name: string;
    icon?: React.ReactNode;
}
```

## Features

### Component Listing

-   Categorized view of components
-   Search and filter functionality
-   Component previews on hover
-   Drag and drop support
-   Resizable drawer width

### Category Management

-   Collapsible category sections
-   Category-based filtering
-   Custom category icons
-   Category reordering

### Component Preview

-   Interactive component previews
-   Tooltip information
-   Quick add functionality
-   Property presets

## Usage

```typescript
import { ComponentDrawer } from "@/components/main/ComponentDrawer";

function Workspace() {
    const handleComponentSelect = (component: ComponentType) => {
        // Handle component selection
    };

    return (
        <ComponentDrawer
            components={availableComponents}
            categories={componentCategories}
            onSelect={handleComponentSelect}
            position="left"
            width={300}
        />
    );
}
```

## Events

| Event         | Description                        |
| ------------- | ---------------------------------- |
| `onSelect`    | Fired when a component is selected |
| `onDragStart` | Fired when dragging begins         |
| `onDragEnd`   | Fired when dragging ends           |
| `onResize`    | Fired when drawer is resized       |

## Keyboard Shortcuts

| Key        | Action              |
| ---------- | ------------------- |
| `Esc`      | Close drawer        |
| `Ctrl + F` | Focus search        |
| `↑/↓`      | Navigate components |
| `Enter`    | Select component    |

## Best Practices

1. **Performance**

    - Virtualize long component lists
    - Lazy load component previews
    - Cache search results

2. **Accessibility**

    - Keyboard navigation support
    - ARIA labels for components
    - Focus management
    - Screen reader support

3. **UX Guidelines**
    - Clear component categorization
    - Intuitive drag and drop
    - Responsive preview sizes
    - Clear feedback on actions
