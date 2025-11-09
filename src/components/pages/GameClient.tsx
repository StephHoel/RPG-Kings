'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { getSave, getScene, useDeleteSave } from '@/hooks'
import { ChoiceList, SceneCard } from '@/components'
import { ROUTES } from '@/config'

export default function GameClient() {
  const router = useRouter()
  const search = useSearchParams()
  const saveId = search?.get('saveId')

  const back = () => router.push(ROUTES.ROOT)

  if (saveId === null) back()

  const save = getSave(saveId!)

  console.log('save ', save)

  if (save === null) {
    // toast(save) // mensagem de erro

    useDeleteSave()

    back()
  }

  const scene = getScene(save!)

  return (
    <div className='space-y-3'>
      <SceneCard>
        <h2 className="m-0">{scene?.title ?? '—'}</h2>
        <p>{scene?.content ?? 'Nenhuma cena disponível neste horário.'}</p>
      </SceneCard>
      <ChoiceList />
    </div>
  )
}