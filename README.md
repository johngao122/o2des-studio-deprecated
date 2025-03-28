# O2DES Studio

A modern, feature-rich diagram editor built with Next.js and React Flow. Create, edit, and manage flow diagrams with an intuitive interface and powerful features.

## Getting Started

### Prerequisites

-   Node.js 18+
-   npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/o2des-studio.git
cd o2des-studio
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Keyboard Shortcuts

-   `Ctrl + S`: Save diagram
-   `Ctrl + O`: Open diagram
-   `Ctrl + N`: New diagram
-   `Ctrl + Z`: Undo
-   `Ctrl + Y`: Redo
-   `Ctrl + =`: Zoom in
-   `Ctrl + -`: Zoom out
-   `Ctrl + 0`: Fit view
-   `Ctrl + Alt + D`: Toggle dark mode
-   `Ctrl + B`: Toggle sidebar
-   `Ctrl + M`: Toggle minimap
-   `Ctrl + L`: Toggle controls
-   `Ctrl + /`: Show shortcuts help

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── draw/              # Main diagram editor page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── nodes/            # Custom node components
│   └── ui/               # UI components
├── lib/                   # Utility functions and stores
│   ├── store/            # Zustand stores
│   └── constants/        # Constants and configurations
└── data/                 # Static data and examples
```

## Tech Stack

-   [Next.js](https://nextjs.org/) - React framework
-   [React Flow](https://reactflow.dev/) - Flow diagram library
-   [Zustand](https://github.com/pmndrs/zustand) - State management
-   [Tailwind CSS](https://tailwindcss.com/) - Styling
-   [shadcn/ui](https://ui.shadcn.com/) - UI components
-   [TypeScript](https://www.typescriptlang.org/) - Type safety

## Development

### Building for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

### Running Tests

```bash
npm run test
# or
yarn test
# or
pnpm test
```

## Known Bugs

-   Table saving doesn't work (content and styles not saved properly)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
