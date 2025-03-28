# Components

<div class="lead">
Learn about the core components in O2DES Studio and how to extend them.
</div>

## Base Components

### FlowEditor

The main canvas component that handles the flow visualization and interactions.

```typescript
interface FlowEditorProps {
    nodes: Node[];
    edges: Edge[];
    onNodesChange: (changes: NodeChange[]) => void;
    onEdgesChange: (changes: EdgeChange[]) => void;
}
```

### NodePalette

The sidebar component that displays available node types.

```typescript
interface NodePaletteProps {
    categories: NodeCategory[];
    onDragStart: (type: string) => void;
}
```

## Custom Components

### Creating Custom Nodes

```typescript
const CustomNode = ({ data, selected }) => {
    return (
        <div className={`custom-node ${selected ? "selected" : ""}`}>
            <div className="title">{data.label}</div>
            <div className="content">{data.content}</div>
        </div>
    );
};
```

### Creating Custom Edges

```typescript
const CustomEdge = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
}) => {
  const path = // ... path calculation
  return (
    <path
      d={path}
      className="custom-edge"
    />
  );
};
```

## Component Guidelines

-   Follow React best practices
-   Use TypeScript for type safety
-   Implement proper prop validation
-   Handle edge cases and errors
-   Document component APIs
