import type { GameUi } from '@/types/gameUi'
import { Choices } from './Choices'
import { StatusBar } from './StatusBar'

export function GameUI({ state, setState }: GameUi) {
  const scene = state.currentEvent

  function onChoose(choiceIdx: number) {
    // Delegar à engine e atualizar estado
    const next = state.engine.applyChoice(state, choiceIdx)
    setState(next)
    // aqui: salvar progresso via API/localStorage
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
      <aside className='md:col-span-1'>
        <StatusBar attributes={state.player.attributes} />
        <div className='mt-6 bg-gradient-to-br from-violet-950/40 to-neutral-800/40 p-5 rounded-xl border border-violet-900 shadow text-neutral-200'>
          <span className='font-bold text-violet-300'>Inventário:</span>{' '}
          <span>
            {state.player.inventory.length
              ? state.player.inventory.join(', ')
              : 'Vazio'}
          </span>
        </div>
      </aside>

      <main className='md:col-span-2 bg-gradient-to-br from-violet-950/40 to-neutral-800/40 p-8 rounded-xl border border-violet-900 shadow'>
        <h2 className='text-3xl font-bold text-violet-300 mb-6'>Cena</h2>
        <p className='text-neutral-200 mb-8 text-lg'>{scene.scene}</p>

        <Choices choices={scene.choices} onChoose={onChoose} />
      </main>
    </div>
  )
}
