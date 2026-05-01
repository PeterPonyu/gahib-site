# Contributing to gahib-site

Welcome — and please read the confidentiality rules below before adding
any figure or page content.

## Pre-publication mode

The site is in **pre-publication mode** until the GAHIB manuscript is
accepted. This is enforced by `NEXT_PUBLIC_PREPUB=true` (the default).
Builds in this mode:

- Render `ComingSoon` on `/results`
- Emit `robots.txt` with `Disallow: /`
- Inject `<meta name="robots" content="noindex,nofollow">` site-wide
- Pin the OG image to `architecture.png`
- Reject any figure not in `content/PUBLISH.json#prepub`
- Reject any MDX reference that points outside the active allowlist
- Reject any `out/` artifact that contains an embargoed substring

You **must not** disable any of these gates without the post-publication
unlock procedure (see below).

## Adding a figure

1. The figure must already be tracked in the GAHIB-assets repository at
   `~/Desktop/GAHIB-assets/paper/figures/<name>.png`.
2. Add the filename to `content/PUBLISH.json` under `prepub` (if it is
   appropriate to release pre-publication) or `postpub` (if it must wait
   for acceptance). Default to `postpub` when in doubt.
3. Run `./scripts/sync-figures.sh` locally. The script copies prepub
   files only while `NEXT_PUBLIC_PREPUB=true`; postpub files are refused
   until the unlock PR.
4. Verify the file is ≤ 500 KB. If not, pre-quantize:
   `pngquant --quality 75-90 --force --output <name>.png <name>.png`.
5. Reference the figure from MDX using the absolute path including
   `basePath`: `/gahib-site/figures/<name>.png`.
6. Run `pnpm run check:figures && pnpm run check:mdx-refs && pnpm build`
   locally. All three must pass.
7. Open a PR. The CI workflow runs the same checks plus
   `pnpm run check:output` on the built artifact.

## Adding a page

1. Create `app/<slug>/page.mdx` (or `page.tsx` for routes that need
   logic, like `/results`).
2. Reference figures via `<FigureCard src="/gahib-site/figures/...">`
   (or markdown `![](...)` syntax).
3. Use KaTeX math via `$inline$` and `$$display$$` syntax. The build
   server-renders the math; the client never fetches KaTeX.
4. Add the route to `src/components/Nav.tsx` if it should appear in the
   top navigation.
5. The reviewer pass (CODEOWNERS) is a separate lane from the writer
   pass — do not self-merge confidentiality-affecting PRs.

## Pull request checklist

Every PR should answer:

- [ ] Did you add a figure? If yes, is it in `PUBLISH.json` under the
      correct list (prepub vs postpub)?
- [ ] Did you reference any figure from MDX or a component? Did
      `pnpm run check:mdx-refs` pass?
- [ ] Did you run `pnpm build` locally with `NEXT_PUBLIC_PREPUB=true`?
- [ ] (post-acceptance only) Did you also test with
      `NEXT_PUBLIC_PREPUB=false`?

The PR template enforces these via checkboxes.

## Post-publication unlock procedure

After the manuscript is accepted, results may be published on the site.
Do this in a single review-gated PR:

1. Confirm the postpub figure list in `content/PUBLISH.json` matches the
   final published figures. Add/remove as needed.
2. Run `NEXT_PUBLIC_PREPUB=false ./scripts/sync-figures.sh` to copy the
   postpub figures into `public/figures/`. Pre-quantize any > 500 KB.
3. Populate `app/results/_content.mdx` with the publishable results
   text. Reference only postpub-allowlisted figures. Author / reviewer
   passes happen in **separate commits** so reviewers see what content
   was added (not just what was approved).
4. Update `app/cite/page.mdx`: replace the `@unpublished` BibTeX with
   the `@article` form including DOI, journal, year, volume, pages.
5. Update `app/layout.tsx` metadata: switch `og:title` /
   `og:description` from project-name-only to paper-derived (and add
   the `application/ld+json` `ScholarlyArticle` block).
6. Open the PR. CI will run all builds in **both** `PREPUB=true` and
   `PREPUB=false` matrix modes; both must pass.
7. After merge, set the repository Actions variable
   `NEXT_PUBLIC_PREPUB=false` (Settings → Secrets and variables →
   Actions → Variables) and dispatch the workflow manually
   (`workflow_dispatch`).
8. Verify the deployed site:
   - `curl -s https://peterponyu.github.io/gahib-site/robots.txt`
     should now allow indexing
   - `/results/` should render the published content
   - `gh api repos/PeterPonyu/gahib-site --jq '.size'` should still be
     reasonable (< 5 MB)
9. Add the cross-link from `peterponyu.github.io` (or wherever the
   personal site lives) to `gahib-site`. **Do not** add this link
   pre-publication — it signals existence to crawlers.

## Branch protection (limitation)

Branch protection rules require GitHub Pro on private repos. This is a
public repo so branch protection works on the free plan. Enable the
following on `main`:

- Require pull request before merging
- Require approval from CODEOWNERS
- Require status checks to pass:
  - `check:figures`
  - `check:mdx-refs`
  - `check:output`
- Require branches to be up to date before merging

See `.github/CODEOWNERS` for review routing.

## Reporting issues

Issues use the templates under `.github/ISSUE_TEMPLATE/` — paper issue,
figure change, methodology question. Reference specific files and
section numbers. Do not paste raw data.
