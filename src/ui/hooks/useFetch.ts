import { FetchFn, UseFetchOptions, UseFetchResult } from '@/domain/types'
import { useCallback, useEffect, useRef, useState } from 'react'

export function useFetch<T>(
  fn: FetchFn<T> | null,
  options: UseFetchOptions<T> = {}
): UseFetchResult<T> {
  const { enabled = true, deps = [], initialData } = options

  const [data, setData] = useState<T | undefined>(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  const execute = useCallback(async () => {
    if (!fn) return

    setIsLoading(true)
    setError(null)

    try {
      const result = await fn()

      if (mountedRef.current) setData(result)
    } catch (err) {
      if (mountedRef.current) setError(err as Error)
    } finally {
      if (mountedRef.current) setIsLoading(false)
    }
  }, [fn, ...deps])

  useEffect(() => {
    if (!enabled) return

    execute()
  }, [enabled, execute])

  const refetch = useCallback(async () => {
    await execute()
  }, [execute])

  return { data, isLoading, error, refetch }
}
