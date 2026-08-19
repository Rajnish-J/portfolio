# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio site for Rajnish J. Next.js 16 App Router, React 19, TypeScript, Tailwind v4. Bootstrapped and maintained through [v0](https://v0.app) (project `prj_c4P0Drf9ynz9ynCakytQ3nbPaIR3`) — v0 pushes commits directly to this repo and every merge to `main` auto-deploys to Vercel.

## Commands

```bash
pnpm dev            # dev server on :3000
pnpm build          # production build
pnpm start          # serve the build
pnpm format         # Prettier, write mode — see Code style
pnpm format:check   # Prettier, verify only
npx tsc --noEmit    # the real typecheck — see below
```

- Prefer `pnpm` (repo carries `pnpm-workspace.yaml` and a pnpm `overrides` block); a `package-lock.json` is also checked in but is stale, so don't trust it.
- **`next.config.mjs` sets `typescript.ignoreBuildErrors: true`**, so `pnpm build` passes with broken types. Run `npx tsc --noEmit` explicitly after touching types.
- No test framework is installed.

## Styling: plain CSS, not Tailwind utilities

Nearly all visual styling lives in [app/globals.css](app/globals.css) as hand-written CSS keyed to semantic class names (`.hero`, `.project-row`, `.toolkit-card`, `.journey-sign`). Components carry `className="section-wrap"`-style strings, not utility soup. To style something new: add a class name in the component and a rule in `globals.css`.

Tailwind v4 and shadcn are installed but barely used. `@theme inline` (globals.css:27) maps CSS custom properties into Tailwind tokens, and [components/ui/button.tsx](components/ui/button.tsx) is generated shadcn scaffolding that nothing imports — `.button`/`.button-dark`/`.button-light` CSS classes are used instead. `cn()` in [lib/utils.ts](lib/utils.ts) is likewise only used by that unused button.

One thing to know before editing `globals.css`: it is ~1900 Prettier-formatted lines grouped loosely by page area, and **many selectors are defined more than once** — a base rule, a `.dark` override, and one or more media-query variants, often far apart in the file. Later rules win by source order, so `grep` every occurrence of a selector and work out which one actually applies before editing the first match you find.

Design tokens are the `--background/--foreground/--muted/--line/--green/--paper/--dark` custom properties on `:root` and `.dark` (globals.css:5, globals.css:17). Note: `--font-sans: 'DM Sans'` / `--font-mono: 'IBM Plex Mono'` are declared but never actually loaded (no `next/font`, no stylesheet link), so the site renders in the system fallbacks.

## Theming

No theme provider or context. [components/theme-bootstrap.tsx](components/theme-bootstrap.tsx) injects a blocking inline script in `<body>` that reads `localStorage.theme` and adds `.dark` to `<html>` before paint; [components/theme-toggle.tsx](components/theme-toggle.tsx) toggles that class and writes localStorage directly. Because there is no shared page shell beyond [app/layout.tsx](app/layout.tsx), every subpage renders its own header with its own `<ThemeToggle />` — adding a page means duplicating that header markup.

## Content model

[lib/portfolio-data.ts](lib/portfolio-data.ts) is the single source for `projects`, `journey`, `posts`, and `postBodies`. The dynamic routes `app/projects/[slug]` and `app/blog/[slug]` derive `generateStaticParams` from those arrays and 404 on unknown slugs, so adding a project or post is a data-file edit only.

Caveat: [app/page.tsx](app/page.tsx#L28-L42) defines its own local `skills` and `journey` arrays whose roles and dates **differ** from `lib/portfolio-data.ts`'s `journey`. The homepage timeline and the `/journey` scroll scene do not share data — update both when changing career facts.

## Contact form

[components/contact-form.tsx](components/contact-form.tsx) POSTs JSON to [app/api/contact/route.ts](app/api/contact/route.ts), which validates server-side and sends via Resend. Requires `RESEND_API_KEY` and `RESEND_FROM_EMAIL` in the environment (put them in `.env.local`, gitignored); without them the route returns 503 and the form shows its error state. The recipient address is hardcoded in the route.

## Journey scroll scene

[components/journey-path.tsx](components/journey-path.tsx) is the most involved component: a framer-motion `useScroll`/`useSpring` parallax over a ~1050vh sticky stage, with per-sign `useTransform` windows computed from the item's index. Its background layers are PNGs in `public/images/`. `next.config.mjs` disables image optimization and the codebase uses plain `<img>`, not `next/image`.

## Code style

**The whole repo is Prettier-formatted.** Write ordinary multi-line JSX — the old convention of collapsing JSX onto single long lines is gone, and any file that still looks dense is a mistake to be formatted, not a style to imitate.

- [.prettierrc](.prettierrc): no semicolons, single quotes, 100 columns, 2-space indent, trailing commas, LF endings. Do not hand-tune spacing or wrapping; let Prettier decide.
- Run `pnpm format` before committing, or `pnpm format:check` to verify.
- A `PostToolUse` hook in [.claude/settings.json](.claude/settings.json) runs [.claude/hooks/format-with-prettier.mjs](.claude/hooks/format-with-prettier.mjs) after every Write/Edit, so files Claude touches are formatted automatically.
- [.gitattributes](.gitattributes) pins `eol=lf`, which matters because `core.autocrlf=true` is set globally on the author's machine and would otherwise fight Prettier's `endOfLine: "lf"` on every checkout.
- Caveat: v0 commits directly to `main` and does not run this config, so v0-authored code lands unformatted. Run `pnpm format` after a v0 sync. Don't add `format:check` to CI — it would fail v0's own auto-deploys.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
