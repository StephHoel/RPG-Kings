import { Suspense } from 'react'
import { metadatas } from '@/config'
import { SheetClient } from '@/components'

export const metadata = metadatas.sheet

export default function Sheet() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <SheetClient />
    </Suspense>
  )
}
