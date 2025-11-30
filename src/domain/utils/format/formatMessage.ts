type Params = Record<string, string | number | undefined | null>

export function formatMessage(template: string, params?: Params): string {
  const tpl = typeof template === 'string' ? template : String(template)

  if (!params) return tpl

  return tpl.replace(/\{([^}]+)\}/g, (_, p) => {
    const v = params[p]

    if (v === undefined || v === null) return ''

    return String(v)
  })
}

export function buildMessage(template: string, params?: Record<string, any>): string {
  return formatMessage(template, params)
}
