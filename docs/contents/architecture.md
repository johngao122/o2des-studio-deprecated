# Architecture

<div class="lead">
O2DES Studio is a Next.js-based web application for discrete event simulation modeling and visualization, featuring a modular component architecture.
</div>

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
│   ├── nodes/       # Node-related components
│   ├── ui/          # Reusable UI components
│   └── [root]       # Main components
├── controllers/      # Business logic
├── models/          # Data models
├── lib/             # Utilities and helpers
└── data/            # Static data and configs
```

## Component Architecture

<pre class="mermaid">
graph TB
    subgraph "Main Components"
        Toolbar["Toolbar.tsx"]
        Properties["PropertiesBar.tsx"]
        Drawer["ComponentDrawer.tsx"]
        Shortcuts["ShortcutsHelp.tsx"]
    end

    subgraph "Node Components"
        BaseNode["BaseNode.tsx"]
        Registry["NodeRegistry.ts"]
        RectNode["RectangleNode.tsx"]
        TableNode["TableNode.tsx"]
        DiamondNode["DiamondNode.tsx"]
        EllipseNode["EllipseNode.tsx"]
    end

    subgraph "UI Components"
        Button["button.tsx"]
        Dropdown["dropdown-menu.tsx"]
        Input["input.tsx"]
        Select["select.tsx"]
        Slider["slider.tsx"]
        Tabs["tabs.tsx"]
    end

    BaseNode --> RectNode
    BaseNode --> TableNode
    BaseNode --> DiamondNode
    BaseNode --> EllipseNode
    Registry --> BaseNode

    Toolbar --> Button
    Properties --> Input
    Drawer --> Dropdown
</pre>

## Core Components

### Node System

<pre class="mermaid">
classDiagram

    BaseNode <|-- RectangleNode
    BaseNode <|-- TableNode
    BaseNode <|-- DiamondNode
    BaseNode <|-- EllipseNode
    NodeRegistry --> BaseNode
    class BaseNode {
        +render()
        +handleResize()
        +handleDrag()
    }

    class NodeRegistry {
        +registerNode()
        +getNode()
        +listNodes()
    }

    class RectangleNode {
        +dimensions
        +render()
    }

    class TableNode {
        +data
        +columns
        +render()
    }

    class DiamondNode {
    }

    class EllipseNode {
    }
</pre>

### UI Component System

<pre class="mermaid">
graph LR
    subgraph "Atomic Components"
        Button["button.tsx"]
        Input["input.tsx"]
        Select["select.tsx"]
    end

    subgraph "Composite Components"
        Toolbar["Toolbar.tsx"]
        Properties["PropertiesBar.tsx"]
        Drawer["ComponentDrawer.tsx"]
    end

    Button --> Toolbar
    Input --> Properties
    Select --> Drawer
</pre>

## State Management

The application uses a combination of local component state and global state management:

<pre class="mermaid">
flowchart TB
    subgraph Global State
        direction LR
        NodeState[Node State]
        UIState[UI State]
        HistoryState[History State]
    end

    subgraph Components
        direction LR
        Nodes[Node Components]
        UI[UI Components]
        Tools[Tool Components]
    end

    NodeState --> Nodes
    UIState --> UI
    HistoryState --> Tools
</pre>

## Data Flow

<pre class="mermaid">
sequenceDiagram
    participant User
    participant UI Components
    participant Node Components
    participant State Management
    participant Controllers

    User->>UI Components: Interact
    UI Components->>State Management: Update State
    State Management->>Node Components: Reflect Changes
    Node Components->>Controllers: Process Logic
    Controllers->>State Management: Update Results
    State Management->>UI Components: Update UI
</pre>

## Key Features

### 1. Node System

-   Base node architecture with extensible types
-   Built-in shapes: Rectangle, Diamond, Ellipse, Table
-   Custom node support
-   Node registry for dynamic registration

### 2. UI Components

-   Comprehensive UI component library
-   Consistent styling and behavior
-   Responsive design
-   Accessibility support

### 3. Tool Integration

-   Toolbar for common actions
-   Properties panel for node configuration
-   Component drawer for node selection
-   Keyboard shortcuts support

## Design Decisions

1. **Component Architecture**

    - Modular component design
    - Inheritance for node types
    - Composition for UI components

2. **State Management**

    - Local state for UI interactions
    - Global state for application data
    - History state for undo/redo

3. **Styling**

    - Tailwind CSS for utility-first styling
    - Consistent component theming
    - Dark/light mode support

4. **Performance**
    - Component memoization
    - Lazy loading where appropriate
    - Optimized rendering strategies

## Technology Stack

-   **Framework**: Next.js 14
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **UI Library**: Custom components
-   **State Management**: React hooks + Context
