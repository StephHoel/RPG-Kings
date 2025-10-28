'use client'
import { useRouter } from 'next/navigation'
import { useActiveSave } from '@/hooks/useActiveSave'
import { Buttons } from '@/components'
import { ROUTES } from '@/config/routes'

export default function HomeClient() {
  const router = useRouter()
  const { activeSaveId } = useActiveSave()

  const goContinue = () => router.push(activeSaveId ? ROUTES.GAME(activeSaveId) : ROUTES.SAVES)
  const goNew = () => router.push(ROUTES.SAVE_NEW)

  return (
    <>
      <h1 className='text-4xl md:text-5xl font-extrabold mb-2 text-violet-400 drop-shadow'>
        Bem-vindo(a)
      </h1>

      <p className='mb-6 text-lg text-neutral-300'>
        Continue seu jogo ou crie um novo save.
      </p>

      <div className="flex flex-col md:flex-row px-4 gap-4 md:gap-2 md:justify-between">
        <Buttons disabled={activeSaveId == null} onClick={goContinue}>
          Continuar
        </Buttons>

        <Buttons onClick={goNew}>
          Novo save
        </Buttons>
      </div>
    </>
  )
}