export const LOG_TYPE = {
  error: 'error',
  info: 'info',
} as const

export const LOG_ALL_TYPE = {
  all: 'all',
  ...LOG_TYPE,
} as const

// Tipo derivado
export type LogType = (typeof LOG_TYPE)[keyof typeof LOG_TYPE]

export type LogAllType = (typeof LOG_ALL_TYPE)[keyof typeof LOG_ALL_TYPE]
