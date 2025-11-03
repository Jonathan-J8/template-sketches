# Template Sketches

A modern, production-ready template repository for creating WebGL sketches and creative coding projects. Built with performance, developer experience, and testing in mind.

## ✨ Features

- **Modern WebGL Stack**: Three.js with TypeScript for type-safe 3D graphics
- **Enhanced Three.js Utilities**: Built-in `joeat-utils` wrapper for streamlined Three.js development
- **Lightning-Fast Development**: Vite for instant hot module replacement and fast builds
- **Styled Components**: TailwindCSS v4 with Vite plugin for rapid UI development
- **Media Generation**: Automated OG image and video generation for social sharing
- **Code Quality**: ESLint, Prettier, and Husky for consistent code formatting
- **Shader Library**: Includes Lygia shader library for advanced graphics effects

## 🛠️ Tech Stack

- **Framework**: [Three.js](https://threejs.org/) - 3D graphics library
- **Three.js Wrapper**: [joeat-utils](https://github.com/Jonathan-J8/joeat-utils) - Enhanced utilities for Three.js development
- **Build Tool**: [Vite](https://vitejs.dev/) - Fast build tool and dev server
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/) - Utility-first CSS framework
- **Shaders**: [vite-plugin-glsl](https://github.com/UstymUkhman/vite-plugin-glsl) + [Lygia](https://github.com/patriciogonzalezvivo/lygia) - GLSL support and shader library
- **Testing**: [Playwright](https://playwright.dev/) (E2E) + [Vitest](https://vitest.dev/) (Unit)
- **Linting**: [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
- **Git Hooks**: [Husky](https://typicode.github.io/husky/)

## 🚀 Quick Start

1. **Clone/Install/Run**

```bash
git clone https://github.com/Jonathan-J8/template-sketches.git
cd template-sketches
npm install
npm run dev
```

Open [http://localhost:8080/template-sketches/](http://localhost:8080/template-sketches) to view your sketch.

2. **Configure environment variables**

Change the `.env` variables according to your project:

```env
VITE_TITLE=$npm_package_name           # Site title reflected in index.html
VITE_VERSION=$npm_package_version      # Project version reflected in index.html
VITE_DESCRIPTION=Your project description  # Site description in index.html
VITE_PORT=8080                         # Vite dev server port
VITE_HOST=http://localhost:$VITE_PORT  # For local development
VITE_BASE_URL=/$npm_package_name/      # For GitHub Pages, use / for basic hosting
```

## 📁 Project Structure

```markdown
├── src/
│ ├── main.ts # Main application entry point
│ ├── style.css # Global styles
│ ├── components/ # Reusable Three.js components
│ └── hooks/ # Custom React-style hooks for Three.js
├── lygia/ # Shader library (auto-downloaded)
├── tests/
│ ├── e2e/ # End-to-end tests
│ └── unit/ # Unit tests
├── public/ # Static assets
└── playwright-report/ # Test reports and media
```

## 🎯 Available Scripts

| Command                      | Description                           |
| ---------------------------- | ------------------------------------- |
| `npm run dev`                | Start development server with HMR     |
| `npm run build`              | Build for production                  |
| `npm run preview`            | Preview production build locally      |
| `npm run lint`               | Check code formatting and lint errors |
| `npm run format`             | Auto-format code with Prettier        |
| `npm test` or `npm run unit` | Run unit tests                        |
| `npm run e2e`                | Run all E2E tests                     |
| `npm run e2e:ui`             | Run E2E tests with UI                 |
| `npm run e2e:fast`           | Run E2E tests (Chromium only)         |
| `npm run e2e:headed`         | Run E2E tests with browser UI         |
| `npm run media`              | Generate OG images/videos             |
| `npm run lygia`              | Re-download Lygia shader library      |

## 🎛️ Three.js Development with joeat-utils

This template includes `joeat-utils`, a wrapper around Three.js that simplifies common WebGL development patterns:

### Key Components

- **RendererWrapper**: Enhanced WebGL renderer with built-in helpers
- **SceneWrapper**: Scene management with automatic setup
- **CameraWrapper**: Camera controls and management
- **Animator**: Frame-based animation system
- **Resizer**: Automatic viewport and camera resizing
- **PointerTracker**: Mouse/touch interaction handling

### Usage Example

See [useThree.ts](./src/hooks/useThree.ts) and [main.ts](./src/main.ts) to see how it integrates or replace it with your own Three.js setup.

The `joeat-utils` library is **optional** - you can use vanilla Three.js if you prefer.

## 📦 Deployment

Build for GitHub Pages:

```env
VITE_BASE_URL=/my-repo/
VITE_HOST=https://my-username.github.io
```

```bash
npm run build
```

The `dist/` folder contains the optimized build ready for deployment to any static hosting service, as well as GitHub Pages with the automated deployment script [github-pages.yml](./.github/workflows/github-page.yml).

## 🙏 Acknowledgments

- [joeat-utils](https://github.com/Jonathan-J8/joeat-utils) - Enhanced Three.js wrapper providing development utilities. Feel free to use it or not.
- [Three.js](https://threejs.org/) - The amazing 3D library that powers WebGL creativity
- [Lygia](https://github.com/patriciogonzalezvivo/lygia) - Comprehensive shader library for advanced graphics effects
- [Vite](https://vitejs.dev/) - Lightning-fast build tool that makes development a joy
