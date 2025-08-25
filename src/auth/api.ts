export async function api<T = unknown>(
  endpoint: string,
  options: RequestInit = {},
  token?: string,
): Promise<T> {
  const headers: Record<string, string> = {
    ...((options.headers as Record<string, string>) || {}),
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
  try {
    const response = await fetch(endpoint, { ...options, headers })
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(errorText || 'Erro na requisição')
    }
    return response.json()
  } catch {
    throw new Error('Falha na comunicação com o servidor')
  }
}

export async function getPlayer(token: string) {
  return api('/player', {}, token)
}

export async function getEvents(token: string) {
  return api('/events', {}, token)
}

export async function getProgress(token: string) {
  return api('/progress', {}, token)
}
