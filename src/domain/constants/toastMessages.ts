// Toast messages: small, UI-oriented templates
const TOAST_MESSAGE_TEMPLATES = {
  game: {
    delete: 'Save apagado!',
    error: {
      new: 'Não foi possível criar o Save, tente novamente',
      load: 'Erro ao carregar saveId',
      create: 'Erro ao criar save',
      delete: 'Erro ao apagar save',
    },
  },
  debug: {
    copied: 'Log copiado (NDJSON).',
  },
} as const

const placeholderRegex = /\{([^}]+)\}/g

function buildFunctions(node: any): any {
  if (typeof node === 'string') {
    return (params: Record<string, any>) => {
      if (params == null || params.method === undefined || params.method === null) {
        throw new Error('Missing required toast param "method"')
      }

      const messageTemplate = String(node)
      const prefixed = `[${String(params.method)}] ${messageTemplate}`

      const formatted = prefixed.replace(placeholderRegex, (_, key) => {
        const v = params[key.trim()]
        if (v === undefined || v === null) return ''
        return String(v)
      })

      return formatted
    }
  }

  const out: any = Array.isArray(node) ? [] : {}
  for (const k of Object.keys(node)) {
    out[k] = buildFunctions((node as any)[k])
  }
  return out
}

type ExtractPlaceholders<S extends string> = S extends `${string}{${infer Key}}${infer Rest}`
  ? Key | ExtractPlaceholders<Rest>
  : never

type ParamsForMessage<S extends string> = [ExtractPlaceholders<S>] extends [never]
  ? { method: string | number | boolean }
  : { method: string | number | boolean } & {
      [K in ExtractPlaceholders<S>]: string | number | boolean
    }

type MessageFunctions<T> = T extends string
  ? (params: ParamsForMessage<T>) => string
  : { [K in keyof T]: MessageFunctions<T[K]> }

export type ToastMessagesMap = MessageFunctions<typeof TOAST_MESSAGE_TEMPLATES>

export type ToastMessagesParams = {
  [K in keyof typeof TOAST_MESSAGE_TEMPLATES]: (typeof TOAST_MESSAGE_TEMPLATES)[K] extends string
    ? ParamsForMessage<(typeof TOAST_MESSAGE_TEMPLATES)[K]>
    : {
        [SK in keyof (typeof TOAST_MESSAGE_TEMPLATES)[K]]: (typeof TOAST_MESSAGE_TEMPLATES)[K][SK] extends string
          ? ParamsForMessage<(typeof TOAST_MESSAGE_TEMPLATES)[K][SK]>
          : any
      }
}

export const TOAST_MESSAGES: ToastMessagesMap = buildFunctions(TOAST_MESSAGE_TEMPLATES)

/* Usage:
 * TOAST_MESSAGES.common.success({ method: 'MyComp', msg: 'Pronto' })
 */
