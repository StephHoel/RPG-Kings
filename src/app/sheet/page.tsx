import { Suspense } from 'react'
import SheetClient from '@/components/pages/SheetClient'
import { metadatas } from '@/config/metadatas'

export const metadata = metadatas.sheet

export default function Sheet() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <SheetClient />
    </Suspense>
  )
}
