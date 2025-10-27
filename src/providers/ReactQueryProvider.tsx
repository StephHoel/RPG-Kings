'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState, useEffect } from 'react'

let qc: QueryClient | null = null

export function ReactQueryProvider({ children }: { children?: ReactNode }) {
  const [client] = useState(() => qc ?? new QueryClient({ defaultOptions: { queries: { staleTime: 15_000 } } }))
  useEffect(() => { qc = client }, [client])
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
