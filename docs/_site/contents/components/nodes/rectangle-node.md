# RectangleNode

The `RectangleNode` is a basic rectangular node type that extends `BaseNode`. It provides a simple rectangular shape with rounded corners and supports dynamic styling through the node style store.

## Class Definition

### RectangleNodeClass

```typescript
export class RectangleNodeClass extends BaseNode {
    static nodeStyles = {
        ...BaseNode.nodeStyles,
        base: {
            ...BaseNode.nodeStyles.base,
            borderRadius: "3px",
            height: "40px",
        },
    };

    static previewStyles = {
        ...BaseNode.previewStyles,
        base: {
            ...BaseNode.previewStyles.base,
            borderRadius: "3px",
        },
        tooltip: {
            ...BaseNode.previewStyles.tooltip,
            borderRadius: "3px",
        },
    };
}
```

## Component Implementation

```typescript
export function RectangleNode({ data, selected, id }: NodeProps<NodeData>) {
    const nodeStyleStore = useNodeStyleStore();
    const nodeStyle = nodeStyleStore.getNodeStyle(id);

    // ... style computation ...

    return (
        <div style={style}>
            <Handle type="target" position={Position.Top} />
            <div className="flex flex-col gap-2">
                <div>{data.label}</div>
                {data.content}
            </div>
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
}
```

## Features

-   Rectangular shape with 3px border radius
-   Fixed height of 40px
-   Top and bottom handles for connections
-   Dynamic styling through node style store
-   Support for custom content
-   Selection state visual feedback

## Styling

The node supports the following style properties through the node style store:

-   backgroundColor
-   borderColor
-   borderWidth
-   borderStyle
-   textColor
-   fontSize
-   opacity

## Usage

```typescript
import { RectangleNode } from "./nodes/RectangleNode";

// In your flow configuration
const nodes = [
    {
        id: "1",
        type: "rectangle",
        data: {
            label: "Rectangle Node",
            content: <CustomContent />, // Optional
        },
        position: { x: 100, y: 100 },
    },
];
```

## Handles

The node provides two connection points:

-   Top handle (target): For incoming connections
-   Bottom handle (source): For outgoing connections

## Style Customization

You can customize the node's appearance using the node style store:

```typescript
const nodeStyleStore = useNodeStyleStore();

nodeStyleStore.setNodeStyle("node-id", {
    backgroundColor: "#ffffff",
    borderColor: "#000000",
    borderWidth: 2,
    borderStyle: "solid",
    textColor: "#000000",
    fontSize: 12,
    opacity: 1,
});
```
