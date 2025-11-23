export function formatPayload(payload: any) {
  try {
    return JSON.stringify(payload ?? {}, null, 2)
  } catch {
    return String(payload)
  }
}
