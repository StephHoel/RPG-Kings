'use client'
import { useActiveSave } from '@/hooks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, useEffect, PropsWithChildren } from 'react'
import { ActiveSaveContext } from './activeSaveContext'

export function ReactQueryProvider({ children }: PropsWithChildren) {
  let qc: QueryClient | null = null
  const [client] = useState(() => qc ?? new QueryClient({ defaultOptions: { queries: { staleTime: 15_000 } } }))

  useEffect(() => { qc = client }, [client])

  return (
    <QueryClientProvider client={client}>
      <ActiveSaveProviderInner>
        {children}
      </ActiveSaveProviderInner>
    </QueryClientProvider>
  )
}

function ActiveSaveProviderInner({ children }: PropsWithChildren) {
  const { activeSaveId, isLoading, error } = useActiveSave()

  return (
    <ActiveSaveContext.Provider value={{ activeSaveId, isLoading, error }}>
      {children}
    </ActiveSaveContext.Provider>
  )
}