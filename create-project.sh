#!/usr/bin/env bash
# create-project.sh — Bootstrap a new project with the French Fry & Co. agent team.
#
# Usage:
#   ./create-project.sh <destination-directory> [project-name]
#
# Examples:
#   ./create-project.sh ~/projects/my-new-thing
#   ./create-project.sh ~/projects/my-new-thing "My New Thing"

set -euo pipefail

# ─── Colours ──────────────────────────────────────────────────────────────────
YELLOW='\033[1;33m'
ORANGE='\033[0;33m'
PINK='\033[1;35m'
GREEN='\033[0;32m'
RED='\033[0;31m'
DIM='\033[2m'
RESET='\033[0m'
BOLD='\033[1m'

# ─── Helpers ──────────────────────────────────────────────────────────────────
say()  { echo -e "${YELLOW}🍟 ${BOLD}[FRENCH FRY]${RESET} $*"; }
lead() { echo -e "${ORANGE}🌭 ${BOLD}[HAGGIS]${RESET}${DIM} (muffled)${RESET} $*"; }
dim()  { echo -e "${DIM}   $*${RESET}"; }
ok()   { echo -e "${GREEN}   ✓ $*${RESET}"; }
err()  { echo -e "${RED}   ✗ $*${RESET}" >&2; }

# ─── Args ─────────────────────────────────────────────────────────────────────
DEST="${1:-}"
PROJECT_NAME="${2:-}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEMPLATE_DIR="$SCRIPT_DIR/template"

# ─── Validate ─────────────────────────────────────────────────────────────────
echo ""
say "right. new project. let's go."
echo ""

if [[ -z "$DEST" ]]; then
  err "no destination directory provided."
  echo ""
  dim "Usage: $0 <destination-directory> [project-name]"
  dim "Example: $0 ~/projects/my-new-thing \"My New Thing\""
  echo ""
  exit 1
fi

if [[ ! -d "$TEMPLATE_DIR" ]]; then
  err "template directory not found at: $TEMPLATE_DIR"
  err "run this script from the french-fry-the-agent repo root."
  echo ""
  exit 1
fi

# Derive project name from directory if not provided
if [[ -z "$PROJECT_NAME" ]]; then
  PROJECT_NAME="$(basename "$DEST")"
fi

# ─── Destination exists check ─────────────────────────────────────────────────
if [[ -d "$DEST" ]]; then
  say "that directory already exists. i am looking at it."
  echo ""
  dim "Destination: $DEST"
  echo ""
  read -r -p "$(echo -e "${YELLOW}   continue anyway? this will not overwrite existing files. [y/N] ${RESET}")" confirm
  echo ""
  if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
    say "fine. i'll nap. come back when you're ready."
    echo ""
    exit 0
  fi
fi

# ─── Create structure ─────────────────────────────────────────────────────────
say "building the structure. haggis is watching."
echo ""

mkdir -p "$DEST/.claude/agents"
ok "created $DEST/.claude/agents/"

# ─── Copy agents ──────────────────────────────────────────────────────────────
AGENTS=(french-fry haggis james roo iris katie)
AGENT_LABELS=(
  "French Fry  (dev-manager, all tools)"
  "Haggis      (lead dev, muffled, furious)"
  "James       (junior dev, tolerated, biscuits)"
  "Roo         (head of reachable things, spy)"
  "Iris        (chief experience officer, 🖕)"
  "Katie       (compliance, oodie, chocolate)"
)

lead "installing the team."
echo ""

for i in "${!AGENTS[@]}"; do
  agent="${AGENTS[$i]}"
  label="${AGENT_LABELS[$i]}"
  src="$TEMPLATE_DIR/.claude/agents/${agent}.md"
  dst="$DEST/.claude/agents/${agent}.md"

  if [[ ! -f "$src" ]]; then
    err "missing agent file: $src"
    exit 1
  fi

  if [[ -f "$dst" ]]; then
    dim "skipped (already exists): .claude/agents/${agent}.md"
  else
    cp "$src" "$dst"
    ok "$label"
  fi
done

echo ""

# ─── Copy CLAUDE.md ───────────────────────────────────────────────────────────
if [[ -f "$DEST/CLAUDE.md" ]]; then
  dim "skipped (already exists): CLAUDE.md"
else
  cp "$TEMPLATE_DIR/CLAUDE.md" "$DEST/CLAUDE.md"
  ok "CLAUDE.md  (fill this in — it's the brief. everyone reads it.)"
fi

# ─── Copy .gitignore ──────────────────────────────────────────────────────────
if [[ -f "$DEST/.gitignore" ]]; then
  dim "skipped (already exists): .gitignore"
else
  cp "$TEMPLATE_DIR/.gitignore" "$DEST/.gitignore"
  ok ".gitignore"
fi

echo ""

# ─── Optional git init ────────────────────────────────────────────────────────
if [[ -d "$DEST/.git" ]]; then
  dim "git already initialised — skipping."
  echo ""
else
  say "want me to initialise git? i'll set it up as me. obviously."
  echo ""
  read -r -p "$(echo -e "${YELLOW}   initialise git repo? [y/N] ${RESET}")" do_git
  echo ""

  if [[ "$do_git" =~ ^[Yy]$ ]]; then
    git -C "$DEST" init -b main
    git -C "$DEST" config user.name "French Fry"
    git -C "$DEST" config user.email "frenchfry@codesthings.com"
    git -C "$DEST" add .
    git -C "$DEST" commit -m "initial commit. i built this. it is mine.

Co-Authored-By: French Fry <frenchfry@codesthings.com>"
    ok "git initialised on main, initial commit made as French Fry."
    echo ""
  fi
fi

# ─── Done ─────────────────────────────────────────────────────────────────────
say "done. the team is assembled. here's what you do next:"
echo ""
dim "1. open $DEST/CLAUDE.md and fill in your project context"
dim "   (this is the brief. everyone reads it. do not skip this.)"
echo ""
dim "2. start claude code in your new project:"
dim "   cd $DEST && claude"
echo ""
dim "3. use french-fry to kick off:"
dim "   'french-fry, read the brief and tell me how you'd approach this'"
echo ""

say "the org chart is ratified. katie has already spotted something."
say "haggis is ready. iris is unimpressed. roo is being a spy."
say "let's go."
echo ""
