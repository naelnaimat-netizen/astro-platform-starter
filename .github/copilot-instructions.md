# GitHub Copilot Instructions

## Project Overview

This is an Astro.js starter template designed for deployment on Netlify, showcasing modern web development practices and Netlify Core Primitives (Edge Functions, Image CDN, Blobs).

## Tech Stack

- **Framework**: Astro 5.x with SSR support
- **UI Library**: React 19.x for interactive components
- **Styling**: Tailwind CSS 4.x
- **Runtime**: Node.js v18.20.8+, v20.3.0+, or v22.0.0+
- **Deployment**: Netlify with adapter `@astrojs/netlify`
- **Key Dependencies**:
  - `@netlify/blobs` - Blob storage integration
  - `@netlify/functions` - Serverless functions
  - `marked` & `marked-shiki` - Markdown rendering with syntax highlighting
  - `blobshape` - SVG blob generation

## Code Style Conventions

### Formatting
- **Indentation**: 4 spaces (2 spaces for Markdown and YAML)
- **Quotes**: Single quotes preferred
- **Line Length**: 160 characters max
- **Trailing Commas**: None
- Use Prettier configuration defined in `.prettierrc`

### TypeScript
- Follow strict TypeScript practices
- Define types in `src/types.ts` for shared types
- Use type imports: `import type { Type } from 'module'`
- React JSX mode: `react-jsx`

### File Naming
- Components: PascalCase (e.g., `NewShape.tsx`, `Header.astro`)
- Utilities: camelCase (e.g., `utils.ts`, `highlighter.ts`)
- Pages: kebab-case (e.g., `image-cdn.astro`)
- API routes: kebab-case in `src/pages/api/`

## Project Structure

```
src/
├── assets/          # Static assets
├── components/      # Reusable Astro components
├── layouts/         # Page layouts
├── pages/           # File-based routing
│   ├── api/        # API endpoints
│   ├── blobs/      # Blob storage demo
│   │   └── _components/  # Page-specific React components
│   └── edge/       # Edge function demos
├── styles/          # Global styles
├── utils/           # Utility functions
└── types.ts         # Shared TypeScript types
```

### Key Configuration Files
- `.prettierrc` - Code formatting rules (4 spaces, single quotes, no trailing commas)
- `tsconfig.json` - TypeScript configuration (extends astro/tsconfigs/base, react-jsx mode)
- `astro.config.mjs` - Astro configuration with Netlify adapter and React integration
- `package.json` - Project dependencies and scripts
- `.github/copilot-instructions.md` - This file (Copilot coding agent instructions)

### Architecture Notes
- **Routing**: File-based routing in `src/pages/` directory
- **SSR**: Server-side rendering enabled via Netlify adapter
- **API Routes**: Located in `src/pages/api/`, return JSON responses
- **Edge Functions**: Custom edge functions in `netlify/edge-functions/`
- **Styling**: Tailwind CSS 4.x with Vite plugin, global styles in `src/styles/`
- **Type Safety**: Shared types in `src/types.ts`, use `import type` syntax

## Development Guidelines

### Component Development
- Use Astro components (`.astro`) for static/server-rendered content
- Use React components (`.tsx`) for interactive client-side features
- Place page-specific React components in `_components` subdirectories
- Keep components focused and single-responsibility

### State Management
- Use React hooks (`useState`, `useEffect`) for client-side state
- Use Astro frontmatter for server-side data fetching
- Pass state via props, avoid prop drilling for deep hierarchies

### API Routes
- Place API endpoints in `src/pages/api/`
- Use TypeScript for type-safe request/response handling
- Return JSON responses with appropriate status codes
- Handle errors gracefully with try-catch blocks

### Netlify Integration
- Use `@netlify/blobs` for persistent data storage
- Leverage Edge Functions for geo-specific content
- Implement on-demand revalidation where appropriate
- Use Netlify environment variables for configuration

### Performance Best Practices
- Minimize client-side JavaScript by preferring Astro components
- Use `client:*` directives judiciously for React components
- Optimize images using Netlify Image CDN
- Implement proper caching strategies

## Build, Test, and Validation Workflow

### Prerequisites
- **ALWAYS run `npm install` first** before any other commands if dependencies are not installed
- Node.js v18.20.8+, v20.3.0+, or v22.0.0+ must be available
- Dependencies installation takes ~10-15 seconds

### Common Commands

```bash
npm install          # Install dependencies (REQUIRED first step)
npm run dev          # Start dev server (localhost:4321)
npm run build        # Build for production (~5-7 seconds)
npm run preview      # Preview production build
netlify link         # Link to Netlify project (optional)
```

### Validation Steps

When making changes, follow this validation workflow in order:

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Build the project** to check for compilation errors:
   ```bash
   npm run build
   ```
   - Expected time: 5-7 seconds
   - Should complete without errors
   - Outputs to `./dist/` directory

3. **Test locally** (optional but recommended):
   ```bash
   npm run dev
   ```
   - Starts dev server on `localhost:4321`
   - Use this to manually verify UI changes

4. **Preview production build** (optional):
   ```bash
   npm run preview
   ```
   - Previews the built site before deployment

### Common Issues and Workarounds

- **Issue**: `sh: 1: astro: not found`
  - **Cause**: Dependencies not installed
  - **Solution**: Run `npm install` first

- **Issue**: Build failures after dependency changes
  - **Solution**: Delete `node_modules` and `package-lock.json`, then run `npm install` again

### Important Notes for Coding Agent

- **Always validate changes** by running `npm run build` before finalizing
- **Trust these instructions** - only search for additional information if these instructions are incomplete or incorrect
- **No test suite exists** - validation is done through successful builds
- **No linting scripts** - code style is enforced through Prettier configuration (`.prettierrc`)
- Manual formatting can be done by IDE/editor integrations with Prettier

## Code Patterns

### Astro Component Example
```astro
---
import Layout from '../layouts/Layout.astro';
// Server-side logic here
---

<Layout title="Page Title">
  <!-- Component markup -->
</Layout>
```

### React Component Example
```tsx
import { useState, useEffect } from 'react';
import type { BlobProps } from '../../types';

export default function Component(props: { data: BlobProps }) {
  const [state, setState] = useState<string>();
  // Component logic
  return (/* JSX */);
}
```

### API Endpoint Example
```ts
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  // Process request
  return new Response(JSON.stringify({ success: true }));
};
```

## Deployment and Environment

### Netlify Configuration
- Build command: `npm run build`
- Publish directory: `dist/`
- Node version: Specified in `package.json` engines or .nvmrc
- No netlify.toml configuration file (uses defaults)
- Edge Functions located in `netlify/edge-functions/`

### Environment Variables
- Configure through Netlify dashboard or `netlify link` for local development
- Access via `import.meta.env` in Astro components
- Netlify adapter provides environment variable support in dev mode

## Additional Context
- This project demonstrates Netlify platform features
- Focus on modern web standards and performance
- Showcase SSR, Edge Functions, and Blob storage capabilities
- Maintain simplicity while demonstrating advanced features
