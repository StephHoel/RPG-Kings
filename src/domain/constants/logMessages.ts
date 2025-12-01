const LOG_MESSAGE_TEMPLATES = {
  save: {
    saveIdNull: 'SaveId nulo',
    created: 'Save criado',
    obtained: 'Save obtido com sucesso',
    notFound: 'Save {id} não encontrado',
    deleted: 'Save {id} deletado',
    error: {
      delete: 'Erro ao deletar save',
      create: 'Falha ao criar save',
      activeSave: 'Erro ao obter save ativo',
      get: 'Erro ao obter save',
    },
  },

  saves: {
    obtained: 'Saves obtidos com sucesso',
    desactiveAll: 'Jogos anteriores inativados',
    error: {
      getAll: 'Erro ao listar saves',
    },
  },

  sheet: {
    created: 'Ficha criada com sucesso',
    obtained: 'Ficha obtida',
    deleted: 'Ficha deletada para {saveId}',
    error: {
      get: 'Erro ao obter ficha',
      load: 'Erro ao carregar sheet {id}',
      create: 'Falha ao criar sheet para save {saveId}',
    },
  },

  stats: {
    created: 'Stats criado com sucesso',
    deleted: 'Stats deletado para {saveId}',
    obtained: 'Stats obtido para {saveId}',
    error: {
      unavaiable: 'Nenhum status base disponível para {target}',
      load: 'Erro ao carregar stats para save {saveId}',
      create: 'Falha ao criar stats para save {saveId}',
      get: 'Erro ao obter stats',
    },
  },

  auth: {
    login: {
      failed: 'Falha de login para usuário {username}: {reason}',
    },
  },

  log: {
    failed: 'Falha ao gravar log',
  },

  inventory: {
    obtained: 'Inventário obtido',
    deleted: 'Inventário deletado para {saveId}',
    error: 'Erro ao obter inventário',
  },

  general: {
    unexpected: 'Erro inesperado',
  },

  game: {
    obtained: 'Jogo obtido',
  },

  scene: {
    obtained: 'Cena obtida',
    error: {
      get: 'Erro ao obter cena',
    },
  },

  xp: {
    added: 'XP adicionado',
    deleted: 'XP deletado para {saveId}',
    get: 'XPs obtido para {saveId}',
    error: {
      unexpected: 'Erro inesperado na mutação',
    },
  },

  animal: {
    unavaiable: 'Nenhum animal disponível para {race}',
  },
} as const

// Build runtime helpers: produce an object with the same shape where each
// string template is replaced by a function `(params) => string`.
const placeholderRegex = /\{([^}]+)\}/g

function buildFunctions(node: any): any {
  if (typeof node === 'string') {
    return (params: Record<string, any>) => {
      if (params == null || params.method === undefined || params.method === null) {
        throw new Error('Missing required log param "method"')
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

  // If the node has an `error` object, also expose its children as sibling keys
  // with shape `parent.<child>.error` to preserve some legacy access patterns
  // (e.g. `sheet.error.load` -> `sheet.load.error`). This creates aliases
  // without overwriting existing keys.
  if (node && typeof node === 'object' && node.error && typeof node.error === 'object') {
    for (const subKey of Object.keys(node.error)) {
      if (out[subKey] === undefined) {
        out[subKey] = { error: out.error[subKey] }
      }
    }
  }

  return out
}

// Minimal typing surface so callers can infer param shapes for each message.
// We reconstruct only what's necessary to expose types like
// `LogMessagesParams['auth']['login']['failed']`.
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

export type LogMessagesMap = MessageFunctions<typeof LOG_MESSAGE_TEMPLATES>

export type LogMessagesParams = {
  [K in keyof typeof LOG_MESSAGE_TEMPLATES]: (typeof LOG_MESSAGE_TEMPLATES)[K] extends string
    ? ParamsForMessage<(typeof LOG_MESSAGE_TEMPLATES)[K]>
    : {
        [SK in keyof (typeof LOG_MESSAGE_TEMPLATES)[K]]: (typeof LOG_MESSAGE_TEMPLATES)[K][SK] extends string
          ? ParamsForMessage<(typeof LOG_MESSAGE_TEMPLATES)[K][SK]>
          : any
      }
}

export const LOG_MESSAGES: LogMessagesMap = buildFunctions(LOG_MESSAGE_TEMPLATES)

/* Usage examples:
 * - `LOG_MESSAGES.save.deleted({ method: 'MyFn', id: 's1' })` => string
 * - `LogMessagesParams['auth']['login']` -> types for the children under `auth.login`
 * */
