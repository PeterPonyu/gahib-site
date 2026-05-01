<!--
Pre-publication mode is the DEFAULT. The reviewer checks all boxes before
approving a change that adds a figure, an MDX reference, or modifies the
results page.
-->

## Summary

<!-- 1-2 sentences. -->

## Changes

- [ ] No new figure added
- [ ] OR figure added: filename listed in `content/PUBLISH.json` under the correct list (`prepub` if pre-publication safe, `postpub` if embargoed)
- [ ] No new MDX figure reference added
- [ ] OR MDX reference added: path matches an entry in the active allowlist; `pnpm run check:mdx-refs` passes
- [ ] `pnpm build` runs locally with `NEXT_PUBLIC_PREPUB=true` (default)
- [ ] (post-acceptance only) `pnpm build` also runs with `NEXT_PUBLIC_PREPUB=false`
- [ ] No paper-derived OG/JSON-LD metadata added pre-publication
- [ ] No cross-link from external sites added pre-publication

## Reviewer checklist (CODEOWNERS)

- [ ] Confirmed no embargoed filename appears in `out/` after build
- [ ] Confirmed `robots.txt` still disallows indexing in prepub mode
- [ ] Confirmed pre-mortem scenario coverage (PR-branch raw URL exposure unchanged)
