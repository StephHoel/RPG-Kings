export const LOG_MESSAGES = {
  save: {
    deleted: 'Save {id} deletado',
    notFound: 'Save {id} não encontrado',
    delete: {
      error: 'Erro ao deletar save {id}: {error}',
    },
  },

  sheet: {
    load: {
      error: 'Erro ao carregar sheet {id}: {error}',
    },
  },

  stats: {
    load: {
      error: 'Erro ao carregar stats para save {id}: {error}',
    },
  },

  auth: {
    login: {
      failed: 'Falha de login para usuário {username}: {reason}',
    },
  },

  general: {
    unexpected: 'Erro inesperado: {error}',
  },
} as const

export type LogMessagesMap = typeof LOG_MESSAGES

export type LogMessageKey = keyof LogMessagesMap
