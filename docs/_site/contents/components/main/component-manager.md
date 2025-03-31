# Component Manager

<div class="lead">
A core service that handles component registration, management, and organization in the application.
</div>

## Overview

The Component Manager is responsible for registering, organizing, and providing access to all available simulation components in the system.

## Interface

```typescript
interface ComponentManager {
    registerComponent(type: string, component: ComponentType): void;
    getComponent(type: string): ComponentType | undefined;
    listComponents(): ComponentType[];
    categorizeComponents(): Record<string, ComponentType[]>;
    unregisterComponent(type: string): void;
    clearComponents(): void;
}

interface ComponentType {
    id: string;
    name: string;
    category: string;
    icon: React.ReactNode;
    preview: React.ReactNode;
    description?: string;
    tags?: string[];
    version?: string;
    author?: string;
    dependencies?: string[];
}

interface ComponentRegistry {
    components: Map<string, ComponentType>;
    categories: Set<string>;
}
```

## Features

### Component Registration

-   Dynamic component registration
-   Version management
-   Dependency tracking
-   Hot-reloading support
-   Validation checks

### Component Organization

-   Category management
-   Tagging system
-   Search indexing
-   Component relationships
-   Custom metadata

### Component Access

-   Type-safe retrieval
-   Filtered queries
-   Batch operations
-   Event notifications
-   Cache management

## Usage

```typescript
import { ComponentManager } from "@/lib/ComponentManager";

// Create instance
const manager = new ComponentManager();

// Register a component
manager.registerComponent("source", {
    id: "source",
    name: "Source Node",
    category: "basic",
    icon: <SourceIcon />,
    preview: <SourcePreview />,
    description: "Generates entities at specified intervals",
});

// Get all components in a category
const basicComponents = manager
    .listComponents()
    .filter((c) => c.category === "basic");

// Get specific component
const sourceComponent = manager.getComponent("source");

// Get categorized components
const categories = manager.categorizeComponents();
```

## Events

| Event                     | Description                           |
| ------------------------- | ------------------------------------- |
| `onComponentRegistered`   | Fired when a component is registered  |
| `onComponentUnregistered` | Fired when a component is removed     |
| `onCategoryAdded`         | Fired when a new category is created  |
| `onRegistryCleared`       | Fired when all components are cleared |

## Best Practices

1. **Registration**

    - Validate components
    - Check dependencies
    - Version control
    - Error handling

2. **Performance**

    - Cache results
    - Lazy loading
    - Batch operations
    - Memory management

3. **Organization**

    - Clear categories
    - Meaningful tags
    - Consistent naming
    - Documentation

4. **Security**
    - Input validation
    - Access control
    - Safe serialization
    - Error boundaries

## Integration

### With Component Drawer

```typescript
function ComponentDrawer() {
    const manager = useComponentManager();
    const categories = manager.categorizeComponents();

    return <Drawer categories={categories} />;
}
```

### With Workspace

```typescript
function Workspace() {
    const manager = useComponentManager();

    const handleNodeAdd = (type: string) => {
        const component = manager.getComponent(type);
        if (component) {
            // Create node instance
        }
    };
}
```
