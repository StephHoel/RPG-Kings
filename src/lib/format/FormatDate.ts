export function formatDate(ts?: Date | string | null) {
  if (!ts) return 'Sem data'

  const d = typeof ts === 'string' ? new Date(ts) : ts

  return d?.toLocaleString() ?? 'Sem data'
}