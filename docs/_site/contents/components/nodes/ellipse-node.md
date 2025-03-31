# EllipseNode

The `EllipseNode` is a circular node type that extends `BaseNode`. It provides a simple elliptical shape with a fixed height and dynamic width based on content.

## Class Definition

### EllipseNodeClass

```typescript
export class EllipseNodeClass extends BaseNode {
    static nodeStyles = {
        ...BaseNode.nodeStyles,
        base: {
            ...BaseNode.nodeStyles.base,
            borderRadius: "50%",
            height: "40px",
        },
    };

    static previewStyles = {
        ...BaseNode.previewStyles,
        base: {
            ...BaseNode.previewStyles.base,
            borderRadius: "50%",
        },
        tooltip: {
            ...BaseNode.previewStyles.tooltip,
            borderRadius: "50%",
        },
    };
}
```

## Features

-   Circular/elliptical shape using border-radius
-   Fixed height of 40px
-   Dynamic width based on content
-   Top and bottom handles for connections
-   Dynamic styling through node style store
-   Selection state visual feedback

## Implementation Details

The elliptical shape is achieved using CSS `border-radius: 50%`, which creates a perfect circle when height and width are equal, or an ellipse when they differ.

### Style Composition

```typescript
const style = {
    ...EllipseNodeClass.nodeStyles.base,
    ...(selected ? EllipseNodeClass.nodeStyles.selected : {}),
    ...(nodeStyle
        ? {
              backgroundColor: nodeStyle.backgroundColor,
              borderColor: nodeStyle.borderColor,
              borderWidth: `${nodeStyle.borderWidth}px`,
              borderStyle: nodeStyle.borderStyle,
              color: nodeStyle.textColor,
              fontSize: `${nodeStyle.fontSize}px`,
              opacity: nodeStyle.opacity,
          }
        : {}),
};
```

## Usage

```typescript
import { EllipseNode } from "./nodes/EllipseNode";

const nodes = [
    {
        id: "1",
        type: "ellipse",
        data: {
            label: "Start",
        },
        position: { x: 100, y: 100 },
    },
];
```

## Styling

The node supports these style properties:

-   backgroundColor
-   borderColor
-   borderWidth
-   borderStyle
-   textColor
-   fontSize
-   opacity

### Preview Components

Both the component drawer preview and tooltip maintain the circular shape while being appropriately sized for their contexts.

## Best Practices

1. Use for start/end points in workflows
2. Keep labels concise for better appearance
3. Consider the circular shape when positioning
4. Use consistent sizes within the same diagram
5. Consider using different colors for different states or purposes

## Common Use Cases

1. Start/End nodes in flowcharts
2. State indicators
3. Connection points
4. Event markers
5. Process terminators
