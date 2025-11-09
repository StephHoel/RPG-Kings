'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { getSave, getScene } from '@/hooks'
import { ChoiceList, SceneCard } from '@/components'
import { ROUTES } from '@/config'
import { toast } from 'sonner'

export default function GameClient() {
  const router = useRouter()
  const search = useSearchParams()
  const saveId = search?.get('saveId')

  const back = () => router.push(ROUTES.ROOT)

  if (saveId === null) back()

  const save = getSave(saveId!)

  console.log('save ', save)

  if (save === null) {
    toast('Save vazio, crie um novo save')

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