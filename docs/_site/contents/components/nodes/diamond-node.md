# DiamondNode

The `DiamondNode` is a specialized node type that renders as a diamond shape. It extends `BaseNode` and uses CSS transforms to create the diamond appearance.

## Class Definition

### DiamondNodeClass

```typescript
export class DiamondNodeClass extends BaseNode {
    static nodeStyles = {
        ...BaseNode.nodeStyles,
        base: {
            ...BaseNode.nodeStyles.base,
            width: "106px",
            height: "106px",
            borderRadius: "0",
            transform: "rotate(45deg)",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "#1a192b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0",
        },
        label: {
            transform: "rotate(-45deg)",
            width: "140px",
        },
    };

    static previewStyles = {
        ...BaseNode.previewStyles,
        base: {
            ...BaseNode.previewStyles.base,
            width: "30px",
            height: "30px",
            transform: "rotate(45deg)",
            borderRadius: "0",
            padding: "0",
        },
        tooltip: {
            ...BaseNode.previewStyles.tooltip,
            width: "42px",
            height: "42px",
            transform: "rotate(45deg)",
            borderRadius: "0",
            padding: "0",
        },
    };
}
```

## Features

-   Diamond shape using CSS transforms
-   Fixed dimensions (106x106px)
-   Counter-rotated label for readability
-   Top and bottom handles for connections
-   Dynamic styling through node style store
-   Selection state visual feedback

## Implementation Details

### Shape Creation

The diamond shape is created by:

1. Using a square div (106x106px)
2. Rotating it 45 degrees
3. Counter-rotating the label -45 degrees for readability

### Label Handling

```typescript
const labelStyle = {
    ...DiamondNodeClass.nodeStyles.label,
    ...(nodeStyle
        ? {
              color: nodeStyle.textColor,
              fontSize: `${nodeStyle.fontSize}px`,
          }
        : {}),
};
```

## Usage

```typescript
import { DiamondNode } from "./nodes/DiamondNode";

const nodes = [
    {
        id: "1",
        type: "diamond",
        data: {
            label: "Decision Point",
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

The node provides two preview sizes:

-   Component drawer: 30x30px
-   Tooltip: 42x42px

Both maintain the diamond shape using the same transform technique.

## Best Practices

1. Keep labels concise due to space constraints
2. Consider the rotated nature when positioning
3. Use for decision points or conditional branches
4. Maintain adequate spacing between diamond nodes
5. Consider text size for readability within the diamond shape
