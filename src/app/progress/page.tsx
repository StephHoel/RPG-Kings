import { Suspense } from 'react'
import { metadatas } from '@/config'
import { ProgressClient } from '@/components'

export const metadata = metadatas.progress

export default function Progress() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ProgressClient />
    </Suspense>
  )
}
