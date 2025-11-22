#!/usr/bin/env bash
set -euo pipefail

# Usage: ./create-issues.sh epic "Title" "Body"
REPO="StephHoel/RPG-Kings"

type="${1:-}"
title="${2:-}"
body="${3:-}"

if [[ -z "$type" || -z "$title" ]]; then
  echo "Usage: $0 <type: epic|feature|task|bug|chore> \"Title\" \"Body\""
  exit 1
fi

case "$type" in
  epic)
    gh issue create --title "$title" --body "$body" --label "type/epic,status/backlog" --repo "$REPO"
    ;;
  feature)
    gh issue create --title "$title" --body "$body" --label "type/feature,status/backlog" --repo "$REPO"
    ;;
  task)
    gh issue create --title "$title" --body "$body" --label "type/task,status/backlog" --repo "$REPO"
    ;;
  bug)
    gh issue create --title "$title" --body "$body" --label "type/bug,status/backlog" --repo "$REPO"
    ;;
  chore)
    gh issue create --title "$title" --body "$body" --label "type/chore,status/backlog" --repo "$REPO"
    ;;
  *)
    echo "Tipo desconhecido: $type"
    exit 1
    ;;
esac
