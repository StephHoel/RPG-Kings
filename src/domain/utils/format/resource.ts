export function clamp(value: number, min = 0, max = 100) {
  if (!Number.isFinite(value)) return min
  return Math.max(min, Math.min(max, Math.round(value)))
}

export function normalizeResource(resource: { current: number; max: number }) {
  const max = Math.max(1, Math.round(resource.max))
  const current = clamp(resource.current, 0, max)
  return { current, max }
}

export function applyDeltaToResource(resource: { current: number; max: number }, delta: number) {
  const newCurrent = clamp(resource.current + delta, 0, Math.max(1, resource.max))
  return { current: newCurrent, max: resource.max }
}

export function defaultResourceNormalized(max = 100, current = max) {
  return normalizeResource({ current, max })
}
