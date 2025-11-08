import { Suspense } from 'react'
import ProgressClient from '@/components/pages/ProgressClient'
import { metadatas } from '@/config'

export const metadata = metadatas.progress

export default function Progress() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ProgressClient />
    </Suspense>
  )
}
