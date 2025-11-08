"use client"
import { Button, H1, Panel } from "@/components"
import { ROUTES } from "@/config/routes"
import { useRouter } from 'next/navigation'
import { Activity } from 'react'
import { useActiveSaveContext } from '@/providers/useActiveSaveContext'

export default function HomeClient() {
  const router = useRouter()
  const { activeSaveId } = useActiveSaveContext()

  const goToGame = () => router.push(ROUTES.GAME(activeSaveId!))

  const goToSaveNew = () => router.push(ROUTES.SAVE_NEW)

  return (
    <Panel>
      <H1>Bem-vindo(a)</H1>

      <p className="mb-6 text-lg text-primary-fg text-center">
        Continue seu jogo ou crie um novo save.
      </p>

      <div className="flex flex-col md:flex-row px-4 gap-6 md:gap-2 md:justify-between">
        <Activity mode={activeSaveId === null ? 'visible' : 'hidden'}>
          <Button
            onClick={goToGame}
            aria-busy={activeSaveId ? 'true' : 'false'}
          >
            Continuar
          </Button>
        </Activity>

        <Button onClick={goToSaveNew}>
          Novo save
        </Button>
      </div>
    </Panel>
  )
}