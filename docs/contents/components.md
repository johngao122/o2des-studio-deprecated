# Components

<div class="lead">
Detailed documentation of all major components in O2DES Studio, including their purpose, props, and usage examples.
</div>

## Node Components

### BaseNode

The foundation component for all simulation nodes.

```typescript
interface BaseNodeProps {
    id: string;
    type: string;
    position: Position;
    data: NodeData;
    selected?: boolean;
    onResize?: (event: ResizeEvent) => void;
    onDrag?: (event: DragEvent) => void;
}
```

**Usage Example:**

```tsx
<BaseNode
    id="node-1"
    type="process"
    position={{ x: 100, y: 100 }}
    data={{ label: "Process Node" }}
/>
```

### SimulationNode

Extends BaseNode with simulation-specific functionality.

<pre class="mermaid">
classDiagram
    class SimulationNode {
        +SimulationConfig config
        +SimulationState state
        +start()
        +pause()
        +reset()
        +updateConfig()
    }

    class SimulationConfig {
        +number duration
        +number speed
        +boolean autoStart
    }

    class SimulationState {
        +string status
        +number currentTime
        +number progress
    }

    SimulationNode --> SimulationConfig
    SimulationNode --> SimulationState
</pre>

## UI Components

### FlowCanvas

The main canvas component for the simulation flow diagram.

<pre class="mermaid">
componentDiagram
    component FlowCanvas {
        [NodeLayer]
        [EdgeLayer]
        [SelectionLayer]
        [GridBackground]
    }

    [NodeLayer] --> [BaseNode]
    [EdgeLayer] --> [EdgeComponent]
    [SelectionLayer] --> [SelectionRect]
</pre>

**Key Features:**

-   Drag and drop support
-   Node selection and multi-selection
-   Zoom and pan controls
-   Grid snapping
-   Edge routing

### Toolbar

```typescript
interface ToolbarProps {
    onAddNode: (type: string) => void;
    onDelete: () => void;
    onUndo: () => void;
    onRedo: () => void;
    canUndo: boolean;
    canRedo: boolean;
}
```

### PropertyPanel

Displays and edits properties of selected nodes.

<pre class="mermaid">
sequenceDiagram
    participant User
    participant PropertyPanel
    participant Store
    participant Node

    User->>PropertyPanel: Edit Property
    PropertyPanel->>Store: Update State
    Store->>Node: Apply Changes
    Node->>PropertyPanel: Reflect Updates
</pre>

## Form Components

### ConfigurationForm

Used for node and simulation configuration.

```typescript
interface ConfigurationFormProps {
    initialValues: Record<string, any>;
    onSubmit: (values: Record<string, any>) => void;
    schema: ValidationSchema;
}
```

### ValidationRules

```typescript
const validationSchema = {
    name: z.string().min(1).max(50),
    duration: z.number().min(0),
    speed: z.number().min(0.1).max(10),
};
```

## Utility Components

### ErrorBoundary

Catches and handles component errors gracefully.

```tsx
<ErrorBoundary fallback={<ErrorFallback />}>
    <SimulationNode />
</ErrorBoundary>
```

### LoadingSpinner

Consistent loading indicator across the application.

```tsx
<LoadingSpinner size="md" color="primary" />
```

## Component Best Practices

1. **Composition**: Use component composition over inheritance
2. **Props**: Define clear prop interfaces with TypeScript
3. **State**: Keep state as local as possible
4. **Memoization**: Use React.memo for expensive renders
5. **Error Handling**: Implement error boundaries
6. **Accessibility**: Follow ARIA best practices

## Testing

Each component should have associated tests:

```typescript
describe("BaseNode", () => {
    it("renders correctly", () => {
        // Test implementation
    });

    it("handles resize events", () => {
        // Test implementation
    });
});
```
