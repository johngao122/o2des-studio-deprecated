# Getting Started

<div class="lead">
Quick start guide for O2DES Studio - a powerful discrete event simulation modeling tool.
</div>

## Prerequisites

-   Node.js 18.0 or higher
-   npm or yarn
-   Git (optional)

## Installation

```bash
# Clone the repository
git clone https://github.com/johngao122/o2des-studio.git

# Install dependencies
cd o2des-studio
npm install

# Start development server
npm run dev
```

## Key Features

### Flow Editor

<pre class="mermaid">
graph TB
    subgraph Editor
        A[Drag & Drop] --> B[Multi-select]
        B --> C[Undo/Redo]
        C --> D[Zoom/Pan]
    end
</pre>

-   Intuitive drag-and-drop interface
-   Multi-node selection
-   Undo/redo support
-   Zoom and pan controls

### Simulation Controls

-   Start/pause/reset
-   Speed control
-   Real-time visualization
-   Data export

## Keyboard Shortcuts

| Action      | Shortcut   |
| ----------- | ---------- |
| New Project | Ctrl/⌘ + N |
| Save        | Ctrl/⌘ + S |
| Undo        | Ctrl/⌘ + Z |
| Redo        | Ctrl/⌘ + Y |
| Delete      | Del        |
| Copy        | Ctrl/⌘ + C |
| Paste       | Ctrl/⌘ + V |

## Best Practices

1. **Project Organization**

    - Use meaningful node names
    - Group related nodes
    - Document configurations

2. **Performance**

    - Limit canvas size
    - Use appropriate simulation speed
    - Monitor memory usage

3. **Version Control**
    - Save frequently
    - Use descriptive commit messages
    - Back up projects

## Troubleshooting

### Common Issues

<pre class="mermaid">
graph TD
    A[Issue] --> B{Type}
    B -->|Performance| C[Check Node Count]
    B -->|Visual| D[Clear Cache]
    B -->|Data| E[Verify Input]
    C --> F[Optimize]
    D --> F
    E --> F[Resolution]
</pre>

1. **Performance Issues**

    - Reduce node count
    - Lower simulation speed
    - Clear browser cache

2. **Visual Glitches**

    - Refresh browser
    - Clear local storage
    - Update graphics drivers

3. **Data Problems**
    - Verify input data
    - Check node connections
    - Validate configurations

## Next Steps

1. Explore [Components](components.md)
2. Read [Architecture](architecture.md)
3. Check [API Reference](api-reference.md)
4. Join our [Community](community.md)
