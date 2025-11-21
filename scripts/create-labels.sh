#!/usr/bin/env bash
set -euo pipefail

# Script helper para criar labels padrões no repositório (usa gh CLI)
# Requisitos: gh CLI autenticado e permissão para escrever no repo

REPO="StephHoel/RPG-Kings"

labels=(
  "type/bug#d73a4a"
  "type/feature#0e8a16"
  "type/chore#0366d6"
  "type/task#8a2be2"
  "status/triage#f9d0c4"
  "status/backlog#c6e48b"
  "status/in progress#fbca04"
  "status/review#1d76db"
  "status/done#0e8a16"
  "priority/p0#b60205"
  "priority/p1#d93f0b"
  "priority/p2#fbca04"
  "priority/p3#0e8a16"
  "area/db#006b75"
  "area/ui#5319e7"
  "area/api#0366d6"
  "area/docs#006b75"
)

for label in "${labels[@]}"; do
  name="${label%%#*}"
  color="${label##*#}"
  echo "Creating label: $name ($color)"
  gh label create "$name" --color "$color" --repo "$REPO" || true
done

echo "Labels created (or already existed)."
