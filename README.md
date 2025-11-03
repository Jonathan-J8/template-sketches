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

1. **Clone the repository**

    ```bash
    git clone https://github.com/Jonathan-J8/template-sketches.git
    cd template-sketches
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

    This will automatically download the Lygia shader library.

3. **Start development server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:8080](http://localhost:8080) to view your sketch.

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

## 🎨 Shader Development

The template includes the Lygia shader library and GLSL support:

```glsl
// Import from Lygia library
#include "lygia/math/PI.glsl"
#include "lygia/generative/snoise.glsl"

// Use in your shaders
float noise = snoise(uv * 10.0);
```

Shaders are automatically minified in production builds.

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

```typescript
import { Animator, CameraWrapper, RendererWrapper, SceneWrapper, Resizer } from 'joeat-utils';

// The template's [useThree](./src/hooks/useThree.ts) hook demonstrates joeat-utils integration
const { scene, renderer, animator, camera, resizer } = useThree();

// Create your Three.js objects as usual
const geometry = new BoxGeometry();
const material = new MeshBasicMaterial({ color: 0x00ff00 });
const cube = new Mesh(geometry, material);

scene.instance.add(cube);

// Animator handles the render loop
animator.add(() => {
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
});
```

The `joeat-utils` library is **optional** - you can use vanilla Three.js if you prefer. Check `/src/hooks/useThree.ts` to see how it integrates or replace it with your own Three.js setup.

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_PORT=8080
VITE_BASE_URL=/
```

## 📦 Deployment

Build for production:

```bash
npm run build
```

The `dist/` folder contains the optimized build ready for deployment to any static hosting service.

## 🙏 Acknowledgments

- [joeat-utils](https://github.com/Jonathan-J8/joeat-utils) - Enhanced Three.js wrapper providing development utilities. Feel free to use it or not.
- [Three.js](https://threejs.org/) - The amazing 3D library that powers WebGL creativity
- [Lygia](https://github.com/patriciogonzalezvivo/lygia) - Comprehensive shader library for advanced graphics effects
- [Vite](https://vitejs.dev/) - Lightning-fast build tool that makes development a joy
