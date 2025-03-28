# State Management

<div class="lead">
Learn how state is managed in O2DES Studio using Zustand and React hooks.
</div>

## Store Structure

### Flow Store

```typescript
interface FlowStore {
    nodes: Node[];
    edges: Edge[];
    selected: Selection;
    history: HistoryState[];
    addNode: (node: Node) => void;
    updateNode: (id: string, changes: Partial<Node>) => void;
    deleteNode: (id: string) => void;
    // ... more actions
}
```

### Project Store

```typescript
interface ProjectStore {
    name: string;
    saved: boolean;
    lastSaved: Date | null;
    save: () => Promise<void>;
    load: (id: string) => Promise<void>;
}
```

## Using Stores

```typescript
const MyComponent = () => {
    const nodes = useFlowStore((state) => state.nodes);
    const addNode = useFlowStore((state) => state.addNode);

    // Use store values and actions
};
```

## Best Practices

-   Use selectors for performance
-   Keep stores focused and minimal
-   Implement proper error handling
-   Use TypeScript for type safety
-   Document store interfaces and actions
