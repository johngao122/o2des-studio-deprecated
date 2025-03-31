# TableNode

The `TableNode` is a complex node type that implements an editable table with headers and cells. It extends `BaseNode` and provides a rich interface for data display and manipulation.

## Interfaces

### TableNodeData

```typescript
export interface TableNodeData extends NodeData {
    rows: number;
    columns: number;
    headers: string[];
    cells: string[][];
}
```

## Class Definition

### TableNodeClass

```typescript
export class TableNodeClass extends BaseNode {
    static nodeStyles = {
        ...BaseNode.nodeStyles,
        base: {
            ...BaseNode.nodeStyles.base,
            borderRadius: "3px",
            minWidth: "250px",
            width: "auto",
            minHeight: "100px",
            padding: "10px",
            backgroundColor: "white",
        },
    };

    static previewStyles = {
        ...BaseNode.previewStyles,
        base: {
            ...BaseNode.previewStyles.base,
            borderRadius: "3px",
            padding: "4px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            width: "45px",
            height: "45px",
        },
        tooltip: {
            ...BaseNode.previewStyles.tooltip,
            borderRadius: "3px",
            padding: "4px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            width: "60px",
            height: "60px",
        },
    };
}
```

## Features

-   Editable table headers and cells
-   Dynamic resizing based on content
-   Responsive layout with horizontal scrolling
-   Cell-by-cell editing with keyboard navigation
-   Integration with table state management
-   Selection state visual feedback
-   Custom styling support

## State Management

The node uses two state stores:

1. `useNodeStyleStore` for visual styling
2. `useTableStore` for table data management

### Table Store Functions

-   `initializeTable`: Sets up initial table data
-   `getTableData`: Retrieves current table state
-   `setActiveTable`: Marks table as active for editing
-   `updateTableData`: Updates table content

## Editing Features

### Cell Editing

```typescript
const handleCellClick = (row: number, col: number, value: string) => {
    setEditingCell({ row, col });
    setEditValue(value);
};
```

### Header Editing

```typescript
const handleHeaderClick = (index: number, value: string) => {
    setEditingHeader(index);
    setEditValue(value);
};
```

### Keyboard Support

-   Enter: Confirms edit
-   Escape: Cancels edit
-   Click outside: Saves changes

## Usage

```typescript
import { TableNode } from "./nodes/TableNode";

const nodes = [
    {
        id: "table1",
        type: "table",
        data: {
            label: "Data Table",
            rows: 3,
            columns: 4,
            headers: ["Col 1", "Col 2", "Col 3", "Col 4"],
            cells: [
                ["A1", "A2", "A3", "A4"],
                ["B1", "B2", "B3", "B4"],
                ["C1", "C2", "C3", "C4"],
            ],
        },
        position: { x: 100, y: 100 },
    },
];
```

## Styling

The node supports standard style properties plus table-specific styles:

-   Table header background: gray-50
-   Cell borders: gray-300
-   Font weights: semibold for headers
-   Padding: px-3 py-2 for cells

## Preview Components

The node provides two preview components:

1. Component drawer preview (2x2 grid)
2. Tooltip preview (3x3 grid)

Both previews maintain the table-like appearance while being compact enough for the UI.

## Best Practices

1. Initialize tables with meaningful headers
2. Keep table dimensions reasonable for the UI
3. Consider data types when editing cells
4. Use consistent column widths when possible
5. Implement validation for cell content if needed
