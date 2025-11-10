import { Suspense } from 'react'
import GameClient from '@/components/pages/GameClient'
import { metadatas } from '@/config'

export const metadata = metadatas.game

export default function Game() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <GameClient />
    </Suspense>
  )
}
