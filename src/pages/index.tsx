'use client'
import Head from 'next/head'
import { Button, H1, Panel } from '@/ui/components'
import { ROUTES } from '@/domain/routes'
import { useRouter } from 'next/router'
import { useActiveSaveContext } from '@/ui/providers/useActiveSaveContext'
import { routeWithSaveId } from '@/infra/config/routes'

export default function Home() {
  const router = useRouter()
  const { activeSaveId } = useActiveSaveContext()

  const goToGame = () => router.push(routeWithSaveId(ROUTES.GAME, activeSaveId!))

  const goToSaveNew = () => router.push(ROUTES.SAVE_NEW)

  return (
    <>
      <Head>
        <title>King's Academy</title>
      </Head>

      <Panel>
        <H1>Bem-vindo(a)</H1>

        <p className="mb-6 text-lg text-center">Continue seu jogo ou crie um novo save.</p>

        <div className="flex md:flex-row flex-col md:justify-between gap-6 md:gap-2 px-4">
          <Button
            onClick={goToGame}
            aria-busy={activeSaveId ? 'true' : 'false'}
            className={`${activeSaveId !== null ? 'block' : 'hidden'}`}
          >
            Continuar
          </Button>

          <Button onClick={goToSaveNew}>Novo save</Button>
        </div>
      </Panel>
    </>
  )
}
