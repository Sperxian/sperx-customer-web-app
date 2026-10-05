# Copilot instructions for SperX customer app

## Project overview

This repository is a Next.js 16 customer-facing web app for SperX. The app is built around the App Router and uses TypeScript, Tailwind CSS, and Clerk auth. It is designed as a mobile-first storefront experience for loyalty programs and member account flows.

## Tech stack and conventions

- Framework: Next.js 16 with the App Router
- UI: React 19, TypeScript, Tailwind CSS
- Auth: Clerk (`@clerk/nextjs`)
- Data access: Axios-based API client under `src/lib/api`, with service helpers under `src/lib/services`
- Styling: Tailwind utility classes; prefer existing design patterns over introducing new styling systems
- Path alias: use `@/*` imports consistently (for example `@/lib/services/...`, `@/types/domain`)

## Repository structure

- `src/app/`: route pages and app-level layout; use the existing route groups such as `(main)` and `(splash)`
- `src/lib/api/`: API integrations and client wrappers
- `src/lib/services/`: local/domain logic and browser state helpers
- `src/types/domain.ts`: shared domain types
- `src/app/globals.css`: global styles and theme tokens
- `public/`: static assets such as logos and images

## Architecture guidance

- Keep route components focused on composition and page flow. Prefer moving data-fetching and business logic into `src/lib` helpers.
- Reuse shared DTOs and domain types instead of duplicating inline object shapes.
- Preserve the existing mobile-shell layout: the app renders inside a centered phone-like container in `src/app/layout.tsx`.
- If a feature touches customer login or guest loyalty flows, be mindful of the existing feature flag pattern using `process.env.NEXT_PUBLIC_FEATURE_FLAG_ENABLE_CUSTOMER_LOGIN`.
- Guest member data is stored in `localStorage` and hydrated through service helpers in `src/lib/services/guest.ts`; preserve that behavior when editing loyalty-related flows.

## Coding expectations

- Prefer small, targeted changes over broad refactors.
- Keep TypeScript types explicit when modeling API responses and domain objects.
- Avoid introducing new runtime dependencies unless they are clearly justified.
- Do not use `any` unless absolutely required and impossible to avoid.
- Respect existing naming patterns and conventions already used in the repo.
- Follow the project’s current mobile-first UX style and keep interactions simple and accessible.

## Important rules for Next.js changes

This repo includes a custom AGENTS instruction that says:

> This is NOT the Next.js you know. This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

Before making code changes in Next.js routing, app config, rendering, or server/client boundaries, check the local Next.js docs in `node_modules/next/dist/docs/` and conform to the installed version rather than relying on general knowledge.

## Validation

- Prefer running the smallest relevant validation command for the change.
- For this repo, the standard check is:

```bash
npm run lint
```

- If a change touches local app behavior or page flow, verify the relevant route still renders correctly and that no obvious lint/type issues were introduced.

## Preferred workflow for Copilot

- Start by reading the most relevant existing files before patching.
- Keep the changes surgical and aligned with the current architecture.
- Update any directly related docs if behavior or setup changes.
- Do not make unrelated cleanup changes or broad style churn in the same patch.
- If a fix changes behavior, ensure it remains compatible with both signed-in and guest-member flows.
