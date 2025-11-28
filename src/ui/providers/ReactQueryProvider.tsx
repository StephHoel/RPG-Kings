'use client'
import { useActiveSave } from '@/ui/hooks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, useEffect, useRef, PropsWithChildren } from 'react'
import { ActiveSaveContext } from './activeSaveContext'

export function ReactQueryProvider({ children }: PropsWithChildren) {
  const qcRef = useRef<QueryClient | null>(null)
  const [client] = useState(
    () => new QueryClient({ defaultOptions: { queries: { staleTime: 15_000 } } })
  )

  useEffect(() => {
    qcRef.current = client
  }, [client])

  return (
    <QueryClientProvider client={client}>
      <ActiveSaveProviderInner>{children}</ActiveSaveProviderInner>
    </QueryClientProvider>
  )
}

function ActiveSaveProviderInner({ children }: PropsWithChildren) {
  const { data, isLoading, error } = useActiveSave()

  return (
    <ActiveSaveContext.Provider value={{ activeSaveId: data?.id, isLoading, error }}>
      {children}
    </ActiveSaveContext.Provider>
  )
}
