# UI Components

<div class="lead">
A comprehensive set of reusable UI components built with Tailwind CSS and TypeScript.
</div>

## Component Library

### Input Components

-   [Button](button.html) - Customizable button component
-   [Input](input.html) - Text input field
-   [Select](select.html) - Dropdown selection
-   [Slider](slider.html) - Range input component

### Navigation Components

-   [Tabs](tabs.html) - Tabbed navigation
-   [Dropdown Menu](dropdown-menu.html) - Nested dropdown menus

### Feedback Components

-   [Tooltip](tooltip.html) - Contextual information
-   [Label](label.html) - Form labels and badges

### Layout Components

-   [Separator](separator.html) - Visual dividers

## Component Architecture

<pre class="mermaid">
graph TB
    subgraph Atomic
        Button[button.tsx]
        Input[input.tsx]
        Select[select.tsx]
        Label[label.tsx]
    end

    subgraph Composite
        DropdownMenu[dropdown-menu.tsx]
        Tabs[tabs.tsx]
    end

    subgraph Utility
        Tooltip[tooltip.tsx]
        Separator[separator.tsx]
    end

    Button --> DropdownMenu
    Input --> Composite
    Select --> DropdownMenu
    Label --> Composite
</pre>

## Common Features

### Styling System

```typescript
interface StyleProps {
    variant?: "default" | "primary" | "secondary" | "ghost";
    size?: "sm" | "md" | "lg";
    className?: string;
}
```

### Component Base

```typescript
interface BaseProps {
    children?: React.ReactNode;
    className?: string;
    disabled?: boolean;
    "aria-label"?: string;
}
```

## Usage Examples

### Basic Button

```tsx
<Button variant="primary" size="md">
    Click Me
</Button>
```

### Input with Label

```tsx
<div className="space-y-2">
    <Label htmlFor="name">Name</Label>
    <Input id="name" placeholder="Enter your name" />
</div>
```

### Dropdown Menu

```tsx
<DropdownMenu>
    <DropdownMenu.Trigger>
        <Button>Open Menu</Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
        <DropdownMenu.Item>Option 1</DropdownMenu.Item>
        <DropdownMenu.Item>Option 2</DropdownMenu.Item>
    </DropdownMenu.Content>
</DropdownMenu>
```

## Styling Guidelines

### 1. Tailwind Classes

-   Use utility classes for styling
-   Maintain consistent spacing
-   Follow design system tokens

### 2. Theme Support

```typescript
interface ThemeColors {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
}
```

### 3. Responsive Design

-   Mobile-first approach
-   Breakpoint consistency
-   Flexible layouts

## Accessibility

### ARIA Support

```typescript
interface AriaProps {
    "aria-label"?: string;
    "aria-describedby"?: string;
    "aria-expanded"?: boolean;
    role?: string;
}
```

### Keyboard Navigation

-   Focus management
-   Tab order
-   Keyboard shortcuts

## Best Practices

1. **Component Design**

    - Single responsibility
    - Consistent API
    - Prop validation
    - Default values

2. **Performance**

    - Memoization
    - Event delegation
    - Lazy loading

3. **Testing**

    - Unit tests
    - Integration tests
    - Accessibility tests

4. **Documentation**
    - Props documentation
    - Usage examples
    - Edge cases

## Integration Examples

### Form Layout

```tsx
<form className="space-y-4">
    <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="Enter email" />
    </div>
    <div>
        <Label htmlFor="type">Type</Label>
        <Select id="type">
            <option>Option 1</option>
            <option>Option 2</option>
        </Select>
    </div>
    <Button type="submit">Submit</Button>
</form>
```

### Navigation

```tsx
<Tabs defaultValue="tab1">
    <Tabs.List>
        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="tab1">Content 1</Tabs.Content>
    <Tabs.Content value="tab2">Content 2</Tabs.Content>
</Tabs>
```

## Related Components

-   [Toolbar](../toolbar.html)
-   [PropertiesBar](../properties-bar.html)
-   [ComponentDrawer](../component-drawer.html)
