# Lovind — Layer 1 to Layer 8

Personal portfolio using Next.js App Router, TypeScript, Tailwind CSS and Framer Motion. Static export with native scrolling, responsive chapter navigation, local fonts and reduced-motion/no-JavaScript fallbacks.

## Run locally

Use Node.js 22 LTS (22.6 or newer) and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

## Production build and preview

```sh
npm run build
npm run typecheck
npm start
```

The static export is generated in `out/`. The Node preview serves it at http://127.0.0.1:3000. For another port, run `npm start -- --port 3014`.

No Python, API key, database or environment variables are required. `scripts/next.cjs` handles ESM compatibility for older Node 22 releases. `scripts/serve.mjs` is a local static preview.

## Vercel

Push the source to GitHub and import it into Vercel. Use the **Next.js** preset, **Node.js 22.x**, and **npm run build**. The project sets `output: "export"` and produces `out/`; keep framework output detection enabled. Do not use `next start` for this export.

Official references: [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports), [Vercel build settings](https://vercel.com/docs/builds/configure-a-build).

## Source

- `app/`: page, global styles and local fonts.
- `components/film/`: active Hero, eight chapters, navigation, motion and Finale.
- `components/photo-*`: photos and full-size viewing.
- `content/facts.md`: owner-approved source of claims.
- `content/profile.ts`, `content/projects.ts`: presentation copy derived from facts.
- `lib/`: photo definitions and resolution.
- `public/`: published photos, approved CV PDFs and font licenses.
- `scripts/`: build compatibility and static-preview utilities.

Update facts before changing claims. Omit TODO fields in production, preserve synthetic/offline labels, and keep SC-500 in progress. Never add unsupported claims, phone numbers or infrastructure identifiers.

Required public assets and font licenses belong in the repository. Optional evidence is omitted when absent. Original photos in `jpg/`, private source material in `My_Portfolio/`, local tools, captures, reports, dependencies and generated output are excluded by `.gitignore`; they are not deployment dependencies.
