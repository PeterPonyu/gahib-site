# gahib-site

Project showcase website for **GAHIB** — a graph-attention variational
autoencoder with information bottleneck and Lorentz hyperbolic geometry
for single-cell RNA-seq latent representation learning.

Deployed on GitHub Pages at
<https://peterponyu.github.io/gahib-site/>.

> **Pre-publication mode is the default.** The build excludes embargoed
> result figures and the `/results` page renders a placeholder until the
> paper is accepted. See `CONTRIBUTING.md` for the post-publication
> unlock procedure.

## Tech stack

- Next.js 14 (App Router) with `output: 'export'` (static export)
- TypeScript (strict)
- Tailwind CSS v3.4
- `@next/mdx` + `remark-math` + `rehype-katex` for MDX content with math
- pnpm 9 / Node 20 (pinned via `.nvmrc` and `package.json#engines`)
- Deployed via `actions/deploy-pages@v4`

## Develop locally

```bash
pnpm install --frozen-lockfile
pnpm dev
# visit http://localhost:3000/gahib-site/
```

## Build

```bash
pnpm build
# Static export written to out/.
```

The `prebuild` script runs `check-figures` and `check-mdx-refs`; the
`postbuild` script runs `check-output`. All three must pass.

## Pre-publication mode

`NEXT_PUBLIC_PREPUB` controls the gate.

- **`NEXT_PUBLIC_PREPUB=true`** (default): Results page hidden,
  `robots.txt` disallows indexing, `<meta name="robots" content="noindex">`
  injected, OG image pinned to `architecture.png`, only the 3 prepub
  figures (`architecture.png`, `overview.png`, `dataset_taxonomy.png`)
  are allowed in `public/figures/`. The `app/results/_content.mdx` file
  is **never bundled** — webpack alias resolves `@/results-content` to
  `_empty.mdx` instead.
- **`NEXT_PUBLIC_PREPUB=false`** (post-acceptance): Results page renders
  the full `_content.mdx`, indexing allowed, postpub figures unlocked.
  Toggle by setting the repo Actions variable; do not commit
  environment-specific defaults.

## URL configuration

`basePath` and `assetPrefix` come from `NEXT_PUBLIC_BASE_PATH`. Default
is `/gahib-site` (matches the GitHub Pages project URL). Override at
build time to migrate the site to a different path or to a custom domain
(set to empty string for an apex domain):

```bash
NEXT_PUBLIC_BASE_PATH= pnpm build      # apex / custom domain
NEXT_PUBLIC_BASE_PATH=/gahib pnpm build  # short subpath
```

## Confidentiality stack (5 layers + sync policy + deploy gate)

1. `scripts/sync-figures.sh` — refuses postpub figures while `PREPUB=true`
2. `scripts/check-figures.mjs` — allowlist enforcer on `public/figures/`
3. `scripts/check-mdx-refs.mjs` — MDX `<Image>` / `![]()` reference scanner
4. `app/robots.ts` + `<meta name="robots" content="noindex,nofollow">`
5. `scripts/check-output.mjs` — post-build grep of `out/` for embargoed
   substrings + `_content` chunk filenames + postpub stems
6. OG/JSON-LD lockdown in `app/layout.tsx` (pinned `og:image`, project-name
   only `og:title`/`og:description` pre-pub)
7. Deploy-time `curl` verification in the GitHub Action (asserts
   `Disallow: /` + negative grep on the served HTML)

## Pages

- `/` — landing, safe route cards, and integrated PeterPonyu/SCPortal
   project-network section
- `/method` — text-first architecture summary, KaTeX-rendered Lorentz
   distance, and manuscript diagrams below the first content fold
- `/data` — 53-dataset inventory, preprocessing notes, and dataset taxonomy
- `/metrics` — 20 metric definitions plus paired-testing notes
- `/methods` — benchmark families and method-track inventory
- `/results` — gated; renders `ComingSoon` pre-publication and is linked
   only as a gated footer/status route
- `/code` — install + GitHub link
- `/cite` — `@unpublished` BibTeX (copy-to-clipboard)
- `/team` — author + lab badge

## Public graph links

GAHIB is represented in the PeterPonyu public graph and SCPortal discovery
surface as a preview-safe companion site at
<https://peterponyu.github.io/gahib-site/>. Keep the public-graph entry
`noindex_follow` with `sitemap: false` while pre-publication mode is active.
Do not link public surfaces directly to `/results/` except for the gated footer
status note inside this site.

## Deploy

GitHub Actions workflow at `.github/workflows/deploy.yml` triggers on
`push` to `main` (deploy) and `pull_request` to `main` (build-only).
The deploy job runs `curl` against the served URL to verify
`robots.txt` and the absence of embargoed substrings before the run is
marked successful.

## License

Code: MIT (see `LICENSE`). Content (prose, figures): CC BY 4.0 (see
`LICENSE-CONTENT`).
