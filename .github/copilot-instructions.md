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

## Common Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:4321)
npm run build        # Build for production
npm run preview      # Preview production build
netlify link         # Link to Netlify project
```

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

## Testing & Validation
- Test locally with `npm run dev` before building
- Build with `npm run build` to check for errors
- Preview builds with `npm run preview`
- Test Netlify features using `netlify dev` when applicable

## Additional Context
- This project demonstrates Netlify platform features
- Focus on modern web standards and performance
- Showcase SSR, Edge Functions, and Blob storage capabilities
- Maintain simplicity while demonstrating advanced features
