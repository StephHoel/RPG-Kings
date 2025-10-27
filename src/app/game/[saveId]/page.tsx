import GameClient from '@/components/pages/GameClient'
import { metadatas } from '@/config/metadatas'

export const metadata = metadatas.game

export default function Game() {
  return <GameClient />
}
