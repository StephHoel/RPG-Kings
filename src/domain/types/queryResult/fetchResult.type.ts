export type UseFetchResult<T> = {
  data: T | undefined
  isLoading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

export type FetchFn<T> = () => Promise<T | undefined>

export type UseFetchOptions<T> = {
  enabled?: boolean
  deps?: any[]
  initialData?: T | undefined
}