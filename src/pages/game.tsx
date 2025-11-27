'use client'
import { useRouter } from 'next/router'
import { toast } from 'sonner'
import { ROUTES } from '@/domain/routes'
import { useGetScene } from '@/ui/hooks'
import { ChoiceList, H1, Panel, SceneCard } from '@/ui/components'
import { useEffect } from 'react'
import { Suspense } from 'react'
import Head from 'next/head'

export default function Game() {
  const router = useRouter()
  const query = router.query
  const saveId = Array.isArray(query.saveId) ? query.saveId[0] : query.saveId ?? null

  // If saveId is missing, show an error toast and redirect.
  // Do the redirect inside useEffect so the component always returns a valid React node.
  useEffect(() => {
    if (!router.isReady) return

    if (!saveId) {
      toast.error('Erro ao carregar saveId')
      router.replace(ROUTES.ROOT)
    }
  }, [saveId, router])

  const result = useGetScene(saveId ?? '')

  useEffect(() => {
    if (!saveId) return

    toast('Scene carregada')
  }, [result, saveId])

  if (!saveId) return null

  return (
    <>
      <Head>
        <title>Jogo</title>
      </Head>

      <Suspense fallback={<div>Carregando...</div>}>
        <Panel>
          <SceneCard>
            <H1>{result?.data?.title ?? 'Sem título'}</H1>

            <p>{result?.data?.content ?? 'Nenhuma cena disponível neste horário.'}</p>
          </SceneCard>

          <ChoiceList />
        </Panel>
      </Suspense>
    </>
  )
}
