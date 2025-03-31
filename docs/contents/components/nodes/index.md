# Node Components

<div class="lead">
Core node components that form the building blocks of the diagram system.
</div>

## Overview

The node system is built on a hierarchical architecture with `BaseNode` as the foundation. Each specialized node type extends the base functionality while adding its own unique features.

<pre class="mermaid">
classDiagram
    class BaseNode {
        +render()
        +handleResize()
        +handleDrag()
        +dimensions: Dimensions
        +position: Position
    }

    class RectangleNode {
        +render()
        +dimensions: Dimensions
    }

    class DiamondNode {
        +render()
        +calculatePoints()
    }

    class EllipseNode {
        +render()
        +radiusX: number
        +radiusY: number
    }

    class TableNode {
        +render()
        +data: any[]
        +columns: Column[]
    }

    BaseNode <|-- RectangleNode
    BaseNode <|-- DiamondNode
    BaseNode <|-- EllipseNode
    BaseNode <|-- TableNode
</pre>

## Node Types

### [BaseNode](base-node.html)

The foundation component providing core node functionality:

-   Position management
-   Resize handling
-   Drag behavior
-   Selection state

### [RectangleNode](rectangle-node.html)

Basic rectangular node:

-   Configurable dimensions
-   Corner radius
-   Background styling

### [DiamondNode](diamond-node.html)

Diamond-shaped node:

-   Point calculation
-   Rotation support
-   Path-based rendering

### [EllipseNode](ellipse-node.html)

Elliptical node:

-   Configurable radii
-   SVG-based rendering
-   Aspect ratio maintenance

### [TableNode](table-node.html)

Complex data display node:

-   Tabular data rendering
-   Column configuration
-   Sorting and filtering
-   Pagination support

## Node Registry

The `NodeRegistry` manages node type registration and instantiation:

```typescript
interface NodeRegistry {
    registerNode(type: string, component: React.ComponentType<NodeProps>): void;
    getNode(type: string): React.ComponentType<NodeProps> | undefined;
    listNodes(): string[];
}
```

### Usage Example

```typescript
// Registering a node type
NodeRegistry.registerNode("rectangle", RectangleNode);

// Creating a node instance
const NodeComponent = NodeRegistry.getNode("rectangle");
if (NodeComponent) {
    return <NodeComponent {...props} />;
}
```

## Common Interfaces

### Node Props

```typescript
interface NodeProps {
    id: string;
    type: string;
    position: Position;
    selected?: boolean;
    data?: any;
    style?: React.CSSProperties;
    onResize?: (dimensions: Dimensions) => void;
    onDrag?: (position: Position) => void;
}
```

### Position Type

```typescript
interface Position {
    x: number;
    y: number;
}
```

### Dimensions Type

```typescript
interface Dimensions {
    width: number;
    height: number;
}
```

## Best Practices

1. **Extending BaseNode**

    - Always extend from BaseNode for consistency
    - Implement required methods
    - Maintain prop interface compatibility

2. **Performance**

    - Memoize expensive calculations
    - Use React.memo for pure components
    - Optimize render methods

3. **Styling**

    - Use Tailwind classes
    - Support theme variants
    - Maintain consistent styling API

4. **State Management**
    - Keep node state minimal
    - Use callbacks for updates
    - Handle selection properly

## Related Components

-   [Toolbar](../toolbar.html)
-   [PropertiesBar](../properties-bar.html)
-   [ComponentDrawer](../component-drawer.html)
