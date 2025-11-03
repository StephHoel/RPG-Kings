import { useEffect, useState } from 'react'
import { GameUI } from '@/components/GameUI'
import { loadInitialState } from '@/logic/gameEngine'
import type { GameState } from '@/types/GameState'

export function Game() {
  const [state, setState] = useState<GameState | null>(null)

  useEffect(() => {
    async function load() {
      const s = await loadInitialState()
      setState(s)
    }
    load()
  }, [])

  if (!state)
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 via-violet-950 to-neutral-800'>
        <div className='text-xl text-violet-300 animate-pulse'>
          Carregando...
        </div>
      </div>
    )

  return (
    <div className='min-h-screen p-6 bg-gradient-to-br from-neutral-900 via-violet-950 to-neutral-800'>
      <div className='max-w-5xl mx-auto bg-neutral-800/80 rounded-2xl shadow-2xl border border-violet-900 p-6'>
        <GameUI state={state} setState={setState} />
      </div>
    </div>
  )
}
