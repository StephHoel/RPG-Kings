import SheetClient from '@/components/pages/SheetClient'
import { Suspense } from 'react'
import { metadatas } from '@/config'

export const metadata = metadatas.sheet

export default function Sheet() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <SheetClient />
    </Suspense>
  )
}
