# Copilot instructions for SperX customer app

## Mission

This repository is the SperX customer-facing web app. Keep changes aligned with the product’s mobile-first loyalty experience, guest-aware account flows, and existing Next.js architecture.

## Stack and constraints

- Framework: Next.js 16 App Router
- UI: React 19, TypeScript, Tailwind CSS
- Auth: Clerk via `@clerk/nextjs`
- API layer: Axios clients under `src/lib/api`
- Domain/service logic: helpers under `src/lib/services`
- Shared types: `src/types/domain.ts`
- Styling: Tailwind utility classes only; do not introduce a second styling system

## Repository map

- `src/app/`: route pages and app-level shell; respect route groups such as `(main)` and `(splash)`
- `src/app/layout.tsx`: global mobile shell layout; keep the phone-frame behavior intact unless the feature specifically requires changing it
- `src/lib/api/`: networking wrappers and typed API calls
- `src/lib/services/`: browser-side logic and guest/local-state helpers
- `src/types/domain.ts`: canonical domain models
- `src/app/globals.css`: shared theme and global CSS tokens
- `public/`: static assets, including logos and product graphics

## Architectural expectations

- Keep route files focused on composition and user flow. Push data-fetching, transformation, and business logic into `src/lib` helpers.
- Reuse domain types instead of duplicating object shapes inline.
- Prefer the existing patterns already in the repo over introducing new abstractions.
- Preserve the mobile-first layout and app shell in `src/app/layout.tsx` unless a task explicitly calls for a layout change.
- Respect the existing feature flag pattern: customer login behavior is controlled by `NEXT_PUBLIC_FEATURE_FLAG_ENABLE_CUSTOMER_LOGIN`.
- Guest loyalty data is persisted in `localStorage` through `src/lib/services/guest.ts`; changes to loyalty flows must remain compatible with both guest and signed-in members.

## Coding rules

- Make small, surgical edits. Avoid unrelated cleanup or broad refactors in the same patch.
- Prefer explicit TypeScript types over implicit `any`.
- Do not add dependencies unless they are clearly necessary and already fit the project’s architecture.
- Use alias imports consistently (`@/*`) and follow the repo’s current import style.
- Keep components simple, readable, and scoped to a single responsibility.
- Favor existing UI patterns and copywriting style over inventing new design conventions.
- When working with async flows, keep error handling consistent with the surrounding code.
- Do not silently swallow failures in user-facing logic; log or surface failures in the same style the codebase already uses.

## Next.js-specific rules

This repository includes a repo-local rule that explicitly warns:

> This is NOT the Next.js you know. This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

Follow that rule strictly:

- Before changing App Router behavior, route definitions, rendering boundaries, server/client composition, or config, inspect the installed Next.js docs in `node_modules/next/dist/docs/`.
- Do not rely on stale assumptions from older Next.js versions or generic tutorials.
- If a change touches app config, image optimization, routing, or client/server boundary semantics, validate against the local installed version rather than memory.

## Quality bar for AI-generated changes

- Start with the most relevant files, not broad project-wide scanning unless necessary.
- Preserve existing behavior unless the task explicitly requires a change.
- Prefer a direct fix over a clever abstraction.
- If you add a new helper or component, match the project’s naming and structure patterns exactly.
- Keep code accessible and mobile-friendly.

## Validation

- Prefer the smallest relevant validation command for the change.
- Use the project’s standard lint command when validating code changes:

```bash
npm run lint
```

- If the task affects a page, route, or signed-in/guest state flow, verify the result still behaves sensibly in those contexts.

## Preferred workflow for Copilot

- Read the relevant files before editing.
- Keep the patch tightly scoped to the requested feature or bug.
- Update any directly related documentation when behavior or setup changes.
- Do not make unrelated style churn in the same patch.
- Ensure compatibility with both guest and authenticated customers when changing loyalty/account logic.
