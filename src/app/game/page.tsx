import { Suspense } from 'react'
import { metadatas } from '@/config'
import { GameClient } from '@/components'

export const metadata = metadatas.game

export default function Game() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <GameClient />
    </Suspense>
  )
}
