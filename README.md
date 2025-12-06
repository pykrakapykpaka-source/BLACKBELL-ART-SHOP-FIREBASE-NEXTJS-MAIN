# Blackbell Art

## Overview

This is a **Next.js** application.

## Features

- **Server-Side Rendering (SSR)** for better SEO and initial load performance.
- **Static Site Generation (SSG)** for fast, pre-rendered pages.
- **API Routes** for creating backend services directly within the app.
- **Built-in Routing** using a file-based system.
- **CSS Modules/Styled JSX** for scoped styling.

## Prerequisites

- **Node.js** (version 14.x or newer)
- **pnpm** (install globally with `npm install -g pnpm`)

## How to run

1. Clone the repository:

   ```bash
   git clone https://github.com/wesiudev/art-tattoo.git
   cd art-tattoo
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Run the development server:

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

## Scripts

- `pnpm dev` - Starts the development server.
- `pnpm build` - Builds the production version of the app.
- `pnpm start` - Starts the app in production mode.
- `pnpm lint` - Lints the codebase for any errors.

## Deployment

To deploy, run the following command:

```bash
pnpm build
pnpm start
```

Alternatively, you can deploy the app on platforms like **Vercel** or **Netlify**.

## License

This project is licensed under the [MIT License](LICENSE).
