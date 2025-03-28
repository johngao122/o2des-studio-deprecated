# Node Development

<div class="lead">
Learn how to create and customize nodes in O2DES Studio.
</div>

## Node Types

### Basic Node Structure

```typescript
interface NodeData {
    label: string;
    type: string;
    properties: Record<string, any>;
}

interface CustomNodeProps {
    data: NodeData;
    selected: boolean;
    // ... other props
}
```

### Creating a New Node Type

```typescript
const ProcessNode = ({ data, selected }: CustomNodeProps) => {
    return (
        <div className={`process-node ${selected ? "selected" : ""}`}>
            <Handle type="target" position={Position.Left} />
            <div className="content">
                <h3>{data.label}</h3>
                <p>Process Time: {data.properties.processTime}s</p>
            </div>
            <Handle type="source" position={Position.Right} />
        </div>
    );
};
```

## Node Registration

```typescript
registerNode("process", {
    component: ProcessNode,
    initialData: {
        label: "Process",
        processTime: 0,
    },
    validate: (data) => {
        return data.processTime >= 0;
    },
});
```

## Node Properties

-   Define property types
-   Implement property editors
-   Handle property changes
-   Validate property values

## Node Styling

-   Use CSS modules
-   Support themes
-   Handle states (selected, error, etc.)
-   Implement animations
