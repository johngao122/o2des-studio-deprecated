# Properties Bar

<div class="lead">
A configurable properties panel for editing node and component settings in real-time.
</div>

## Overview

The Properties Bar provides an interface for viewing and modifying properties of selected nodes and components in the workspace.

## Interface

```typescript
interface PropertiesBarProps {
    selectedNode?: Node;
    onPropertyChange: (property: string, value: any) => void;
    onApply: () => void;
    onCancel: () => void;
    width?: number;
    position?: "left" | "right";
}

interface Node {
    id: string;
    type: string;
    properties: Record<string, any>;
    validation?: ValidationRules;
}

interface ValidationRules {
    [key: string]: {
        required?: boolean;
        type?: string;
        min?: number;
        max?: number;
        pattern?: string;
        custom?: (value: any) => boolean;
    };
}
```

## Features

### Property Editing

-   Real-time property updates
-   Type-specific input controls
-   Validation feedback
-   Undo/redo support
-   Property grouping

### Input Types

-   Text fields
-   Number inputs
-   Dropdowns
-   Color pickers
-   Custom editors
-   File uploads
-   Code editors

### Validation

-   Required fields
-   Type checking
-   Range validation
-   Pattern matching
-   Custom validation rules
-   Error messaging

## Usage

```typescript
import { PropertiesBar } from "@/components/main/PropertiesBar";

function Editor() {
    const handlePropertyChange = (prop: string, value: any) => {
        // Update node property
    };

    const handleApply = () => {
        // Apply changes
    };

    return (
        <PropertiesBar
            selectedNode={currentNode}
            onPropertyChange={handlePropertyChange}
            onApply={handleApply}
            onCancel={() => {}}
            width={280}
            position="right"
        />
    );
}
```

## Events

| Event               | Description                         |
| ------------------- | ----------------------------------- |
| `onPropertyChange`  | Fired when a property value changes |
| `onApply`           | Fired when changes are applied      |
| `onCancel`          | Fired when changes are cancelled    |
| `onValidationError` | Fired when validation fails         |

## Keyboard Shortcuts

| Key            | Action         |
| -------------- | -------------- |
| `Ctrl + Enter` | Apply changes  |
| `Esc`          | Cancel changes |
| `Tab`          | Next field     |
| `Shift + Tab`  | Previous field |

## Best Practices

1. **Performance**

    - Debounce property updates
    - Memoize validation
    - Optimize re-renders

2. **Validation**

    - Clear error messages
    - Real-time validation
    - Field-level validation
    - Form-level validation

3. **UX Guidelines**
    - Immediate feedback
    - Clear grouping
    - Consistent layout
    - Undo support
    - Auto-save options
