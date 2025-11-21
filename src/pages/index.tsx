'use client'
import Head from 'next/head'
import { Button, H1, Panel } from '@/components'
import { ROUTES } from '@/config'
import { useRouter } from 'next/router'
import { Activity } from 'react'
import { useActiveSaveContext } from '@/providers/useActiveSaveContext'
import { routeWithSaveId } from '../config/files/routes'

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
          <Activity mode={activeSaveId !== null ? 'visible' : 'hidden'}>
            <Button onClick={goToGame} aria-busy={activeSaveId ? 'true' : 'false'}>
              Continuar
            </Button>
          </Activity>

          <Button onClick={goToSaveNew}>Novo save</Button>
        </div>
      </Panel>
    </>
  )
}
