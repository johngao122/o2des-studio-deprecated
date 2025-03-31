# Custom Nodes

The `CustomNodes.tsx` file serves as a legacy export module for backward compatibility. It re-exports the main node types from their individual files.

## Exports

```typescript
export { RectangleNode, EllipseNode, DiamondNode };
```

## Usage

### Legacy Usage (Not Recommended)

```typescript
import { RectangleNode, EllipseNode, DiamondNode } from "./nodes/CustomNodes";
```

### Recommended Usage

Import nodes directly from their individual files:

```typescript
import { RectangleNode } from "./nodes/RectangleNode";
import { EllipseNode } from "./nodes/EllipseNode";
import { DiamondNode } from "./nodes/DiamondNode";
```

## Migration

If you're using imports from `CustomNodes.tsx`, consider updating your imports to use the individual node files directly. This provides better tree-shaking and maintainability.
