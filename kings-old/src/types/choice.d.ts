export interface Choice {
  text: string
  effects?: Record<string, number>
  next?: number
}
