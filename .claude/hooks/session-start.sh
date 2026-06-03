#!/bin/bash
# SessionStart hook for Claude Code on the web.
# Installs npm dependencies so tests, linters, typecheck and builds work
# immediately in a fresh remote session (the repo is cloned clean each time).
set -euo pipefail

# Only run in the remote (web) environment; local sessions manage their own deps.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-.}"

# Idempotent: npm install is safe to re-run and benefits from container caching.
npm install --no-audit --no-fund
