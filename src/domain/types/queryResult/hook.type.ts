export type HookResult<T> = {
  data: T | undefined
  isLoading: boolean
  error: Error | null
}
