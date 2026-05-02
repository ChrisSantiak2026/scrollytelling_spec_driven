# 09 — Roadmap

Delivery is sliced so that each milestone produces a **shippable static site**. No milestone leaves the build broken.

## Milestone 0 — Scaffold (✅ done)

- Next.js 16 App Router scaffold
- `next.config.ts` configured for static export + basePath
- GitHub Actions workflow stub at `.github/workflows/deploy.yml`
- Assets copied from reference project into `public/images/`

## Milestone 1 — Design system foundation (✅ done)

Ref: [05-design-system.md](./05-design-system.md)

- Remove Tailwind wiring from `globals.css` and `postcss.config.mjs`
- Install fonts (Newsreader, Public Sans) via `next/font/google`
- Add full token set to `globals.css`
- Build `Heading`, `Text`, `ContextualLink`, `CallToActionGroup` in `src/components/ui/`
- Smoke test: homepage renders "Scrolly" headline in the new type scale

**Exit criteria:** `npm run build` green; home page shows branded typography; no Tailwind classes remain.

## Milestone 2 — Content pipeline (✅ done)

Ref: [02-content-model.md](./02-content-model.md)

- Install `gray-matter`, `next-mdx-remote`, `remark-gfm`, `zod`
- `src/lib/content/schema.ts` with Zod schema
- `src/lib/content/repository.ts` with `getPageBySlug`, `getAllSlugs`, `getAllPages`
- `src/lib/content/parser.ts` with `splitMarkdownIntoSlides` + image-directive parsing
- `src/app/page.tsx` loads `content/home.md`
- `src/app/[...slug]/page.tsx` with `generateStaticParams` + `dynamicParams = false`
- Placeholder `content/home.md` and one `content/pages/getting-started.md`
- Unit tests for schema + parser + repository

**Exit criteria:** `/` and `/getting-started` both build and render.

## Milestone 3 — Standard layout + markdown renderer (✅ done)

Ref: [04-layouts.md](./04-layouts.md), [06-visualizations.md](./06-visualizations.md)

- `src/components/layouts/StandardLayout.tsx` with hero + reading column + sticky ToC
- `src/components/markdown/MarkdownRenderer.tsx` with component map (no viz yet; just headings/links/lists)
- `src/components/layouts/PageLayoutFactory.tsx`
- `SiteHeader`, `SiteFooter`

**Exit criteria:** a standard page with three H2 sections renders with proper typography and a generated ToC.

## Milestone 4 — Motion primitives (✅ done)

Ref: [03-motion-system.md](./03-motion-system.md)

- `SlideContext`
- `Reveal` (dual-mode)
- `LayeredRevealGroup`
- `DriftMedia` (dual-mode)
- `SceneCard` (dual-mode)
- Integrate viewport-mode `Reveal` into `MarkdownRenderer` so H2 sections fade in on scroll
- E2E: `standard-reveal.spec.ts` + `reduced-motion.spec.ts`

**Exit criteria:** scrolling down a standard page shows section fade-ins; reduced-motion disables transforms.

## Milestone 5 — Presentation layout (✅ done)

Ref: [04-layouts.md](./04-layouts.md)

- `PresentationSlide` sticky-stage primitive
- `PresentationLayout` consuming `splitMarkdownIntoSlides`
- `PresentationProgress`, `PresentationShortcuts`, `PresentationFooterGate`
- One sample presentation page: `content/pages/sticky-slides.md`
- E2E: `presentation.spec.ts` + `presentation-keyboard.spec.ts`

**Exit criteria:** `/sticky-slides` runs as a scroll-linked deck with progress bar and keyboard nav.

## Milestone 6 — Visualizations (✅ done)

Ref: [06-visualizations.md](./06-visualizations.md) 

- Code-block dispatcher in `MarkdownRenderer`
- `StatGrid`, `ScrollDemo`, `Timeline`, `ProgressBar`, `Mermaid`, `CodeSample`
- Update sample pages to use them
- Unit tests for each parser

**Exit criteria:** every viz tag renders; bad input produces visible error cards.

## Milestone 7 — CI + deploy (✅ done)

Ref: [08-deployment.md](./08-deployment.md)

- Fill out workflow to the final form (verify + build + e2e + deploy jobs)
- Confirm Pages settings on the GitHub repo
- First green deploy to `https://<user>.github.io/scrolly/`
- Lighthouse check on deployed URL: Performance ≥ 90, Accessibility ≥ 95

**Exit criteria:** a push to `main` results in a live updated site within one workflow run.

## Milestone 8 — Content authoring pass

Now that the kit works, write the actual tutorial content:

- `content/home.md` — landing, value prop, "read the series"
- `content/pages/what-is-scrollytelling.md`
- `content/pages/sticky-slides.md` (presentation layout)
- `content/pages/dual-mode-reveals.md`
- `content/pages/writing-content.md`
- `content/pages/deploying-to-pages.md`

Each page references the corresponding spec file in `specs/`.

## Out of scope for v1 (explicit)

- Dark mode
- Search
- RSS
- Pagination / tags / categories
- Comments
- i18n
- Image CDN
- Analytics beyond a single GA snippet (if added at all)

Revisit after v1 ships.
