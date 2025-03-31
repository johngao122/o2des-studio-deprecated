# BaseNode

The `BaseNode` class serves as the foundation for all node types in O2DES Studio. It provides common functionality, styling, and interfaces that other nodes extend.

## Interfaces

### NodeData

```typescript
interface NodeData {
    label: string;
    style?: NodeStyle;
    content?: React.ReactNode;
}
```

### NodeStyles

```typescript
interface NodeStyles {
    base: React.CSSProperties;
    container?: React.CSSProperties;
    label?: React.CSSProperties;
    selected?: React.CSSProperties;
}
```

### NodePreviewStyles

```typescript
interface NodePreviewStyles {
    base: React.CSSProperties;
    tooltip: React.CSSProperties;
}
```

### BaseNodeProps

```typescript
interface BaseNodeProps {
    label: string;
    shape: string;
}
```

## Default Styles

### Node Styles

The `BaseNode` provides default styles for nodes:

```typescript
static nodeStyles: NodeStyles = {
    base: {
        padding: "10px",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#1a192b",
        width: "150px",
        fontSize: "12px",
        color: "#222",
        textAlign: "center",
        backgroundColor: "white",
    },
    selected: {
        boxShadow: "0 0 0 3px #6366f1",
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "#6366f1",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        outline: "none",
        transition: "all 0.2s ease",
    }
}
```

### Preview Styles

Styles used for node previews in the component drawer:

```typescript
static previewStyles: NodePreviewStyles = {
    base: {
        padding: "5px",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#1a192b",
        width: "70%",
        height: "30px",
        fontSize: "12px",
        color: "#222",
        textAlign: "center",
        backgroundColor: "white",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    tooltip: {
        padding: "10px",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#1a192b",
        width: "60px",
        height: "60px",
        fontSize: "12px",
        color: "#222",
        textAlign: "center",
        backgroundColor: "white",
        margin: "0 auto 5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
}
```

## Methods

### getPreview

```typescript
static getPreview(label: string): React.ReactElement
```

Returns a preview component for displaying in the component drawer.

### getTooltipPreview

```typescript
static getTooltipPreview(): React.ReactElement
```

Returns a tooltip preview component.

## Usage

To create a new node type:

1. Extend the `BaseNode` class
2. Override the necessary styles and methods
3. Register the node in `NodeRegistry.ts`

Example:

```typescript
export class CustomNode extends BaseNode {
    static nodeStyles = {
        ...BaseNode.nodeStyles,
        base: {
            ...BaseNode.nodeStyles.base,
            // Custom styles
        },
    };

    static getPreview(label: string) {
        return <div style={this.previewStyles.base}>{label}</div>;
    }
}
```
