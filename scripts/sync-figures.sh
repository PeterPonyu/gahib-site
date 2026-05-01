#!/usr/bin/env bash
# sync-figures.sh — human-run figure sync from GAHIB-assets to gahib-site.
#
# Refuses to copy ANY postpub-listed file while NEXT_PUBLIC_PREPUB=true (default).
# This prevents the most likely human-error path on a public repo: pushing an
# embargoed result figure to a public PR branch where its raw URL becomes
# instantly visible.
#
# Usage:
#   ./scripts/sync-figures.sh                # default: prepub mode
#   NEXT_PUBLIC_PREPUB=false ./scripts/sync-figures.sh   # post-acceptance only

set -euo pipefail

PREPUB="${NEXT_PUBLIC_PREPUB:-true}"
SRC="${GAHIB_ASSETS:-$HOME/Desktop/GAHIB-assets}/paper/figures"
DEST="$(cd "$(dirname "$0")/.." && pwd)/public/figures"
PUBLISH="$(cd "$(dirname "$0")/.." && pwd)/content/PUBLISH.json"

if [ ! -d "$SRC" ]; then
  echo "sync-figures: source $SRC not found; check GAHIB_ASSETS env." >&2
  exit 1
fi

mkdir -p "$DEST"

if ! command -v jq >/dev/null 2>&1; then
  echo "sync-figures: jq is required (sudo apt install jq)" >&2
  exit 1
fi

mapfile -t PREPUB_LIST < <(jq -r '.prepub[]' "$PUBLISH")
mapfile -t POSTPUB_LIST < <(jq -r '.postpub[]' "$PUBLISH")

copy_file() {
  local name="$1"
  local from="$SRC/$name"
  local to="$DEST/$name"
  if [ ! -f "$from" ]; then
    echo "sync-figures: SKIP $name — $from not found"
    return 0
  fi
  cp -p "$from" "$to"
  local size
  size=$(stat -c%s "$to" 2>/dev/null || stat -f%z "$to")
  if [ "$size" -gt $((500 * 1024)) ]; then
    echo "sync-figures: WARN $name = $size bytes (> 500 KB); pre-quantize before commit"
  fi
  echo "sync-figures: OK $name ($size bytes)"
}

echo "sync-figures: mode=$PREPUB"

for name in "${PREPUB_LIST[@]}"; do
  copy_file "$name"
done

if [ "$PREPUB" = "false" ]; then
  echo "sync-figures: post-publication mode — copying postpub allowlist"
  for name in "${POSTPUB_LIST[@]}"; do
    copy_file "$name"
  done
else
  echo "sync-figures: prepub mode — postpub list refused. Set NEXT_PUBLIC_PREPUB=false to enable post-acceptance."
fi

echo "sync-figures: done. Verify with: pnpm run check:figures"
