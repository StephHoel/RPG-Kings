'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ROUTES } from '@/config'
import { useGetScene } from '@/hooks'
import { ChoiceList, H1, Panel, SceneCard } from '@/components'
import { useEffect } from 'react'

export function GameClient() {
  const router = useRouter()
  const search = useSearchParams()
  const saveId = search?.get('saveId') ?? null

  // If saveId is missing, show an error toast and redirect.
  // Do the redirect inside useEffect so the component always returns a valid React node.
  useEffect(() => {
    if (!saveId) {
      toast.error('Erro ao carregar saveId')
      router.replace(ROUTES.ROOT)
    }
  }, [saveId, router])

  const scene = useGetScene(saveId ?? '')

  useEffect(() => {
    if (!saveId) return

    toast('Scene carregada')
  }, [scene, saveId])

  if (!saveId) return null

  return (
    <Panel>
      <SceneCard>
        <H1>{scene?.title ?? 'Sem título'}</H1>

        <p>{scene?.content ?? 'Nenhuma cena disponível neste horário.'}</p>
      </SceneCard>

      <ChoiceList />
    </Panel>
  )
}
