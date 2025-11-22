#!/usr/bin/env bash
set -euo pipefail

# Script helper para garantir que o repositório tenha somente as labels
# desejadas. Ele cria/atualiza as labels listadas abaixo.
# Requisitos: gh CLI autenticado e permissão para escrever no repo

# Repo pode ser passado como primeiro argumento, ou usa o padrão abaixo
REPO="${1:-StephHoel/RPG-Kings}"

desired=(
  "bug#d73a4a#Bug: comportamento inesperado ou erro que precisa ser corrigido"
  "documentation#0075ca#Documentação: alterações ou adição de documentação"
  "duplicate#cfd3d7#Duplicado: issue duplicada de outra existente"
  "help wanted#0e8a16#Help wanted: precisa de ajuda externa ou contribuições"
  "invalid#e6e6e6#Inválido: não é um problema válido ou aplicável"
  "question#5319e7#Pergunta: dúvida ou questão a ser esclarecida"
  "wontfix#6a737d#Wontfix: decidido que não será corrigido"

  "type/bug#d73a4a#Tipo: bug — descreve um defeito técnico"
  "type/chore#0366d6#Tipo: chore — tarefa de manutenção ou infraestrutura"
  "type/feature#0e8a16#Tipo: feature — nova funcionalidade planejada"
  "type/task#8a2be2#Tipo: task — tarefa técnica ou de implementação"
  "type/epic#6f42c1#Tipo: epic — agrupa várias tasks/features relacionadas"

  "status/backlog#95a5a6#Backlog: item aprovado e aguardando priorização"
  "status/ready#1d76db#Ready: pronto para desenvolvimento (branch pode ser criada)"
  "status/in-progress#fbca04#In progress: atualmente em desenvolvimento"
  "status/in-review#5319e7#In review: aguardando revisão/PR"
  "status/done#0e8a16#Done: concluído e mergeado"

  "priority/p0#b60205#P0: prioridade crítica — atenção imediata"
  "priority/p1#d93f0b#P1: alta prioridade"
  "priority/p2#fbca04#P2: prioridade média"
  "priority/p3#0e8a16#P3: baixa prioridade"

  "area/db#006b75#Área: banco de dados"
  "area/api#0366d6#Área: API/serviços"
  "area/ui#5319e7#Área: interface/UX"
  "area/docs#006b75#Área: documentação"

  "milestone/release#d4c5f9#Milestone: marca itens relacionados a uma release"
)

echo "Ensuring desired labels exist in $REPO"
for item in "${desired[@]}"; do
  name="${item%%#*}"
  rest="${item#*#}"
  color="${rest%%#*}"
  desc="${rest#*#}"
  echo "- Ensuring label: $name ($color) - $desc"
  # Tenta criar; se já existir, tenta editar cor e descrição
  if ! gh label create "$name" --color "$color" --repo "$REPO" --description "$desc" 2>/dev/null; then
    # fallback: gh label edit pode não suportar --description em versões antigas
    if ! gh label edit "$name" --color "$color" --description "$desc" --repo "$REPO" 2>/dev/null; then
        # última alternativa: usar REST API para garantir descrição/cor
        enc=$(echo "$name" | sed 's/\//%2F/g')
        gh api --method PATCH "/repos/$REPO/labels/$enc" -f name="$name" -f color="$color" -f description="$desc" 2>/dev/null || true
    fi
  fi
done

echo "Scanning existing labels to remove any non-desired labels"
# Busca todas as labels existentes (apenas nomes)
EXISTING_LABELS=$(gh label list --repo "$REPO" --limit 1000 --json name --jq '.[] .name' 2>/dev/null || echo '')

# Construir uma lista de nomes desejados para verificação simples
DESIRED_NAMES=""
for item in "${desired[@]}"; do
  DESIRED_NAMES="$DESIRED_NAMES\n${item%%#*}"
done

while IFS= read -r lab; do
  # pular linhas vazias
  [ -z "$lab" ] && continue
  # Se o rótulo não estiver na lista `desired`, removemos (garante exclusividade)
  if ! echo -e "$DESIRED_NAMES" | grep -xq "$lab"; then
    echo "- Deleting non-desired label: $lab"
    enc=${lab//\//%2F}
    gh api --method DELETE "/repos/$REPO/labels/$enc" 2>/dev/null || true
  else
    echo "- Keeping desired label: $lab"
  fi
done <<EOF
$EXISTING_LABELS
EOF

echo "Done. Desired status labels ensured; other labels removed."
