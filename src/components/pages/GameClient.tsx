'use client'
import { useParams, useRouter } from 'next/navigation'
import { deleteSave, getSave, getScene } from '@/hooks'
import { ChoiceList, SceneCard } from '@/components'
import { ROUTES } from '@/config/routes'

export default function GameClient() {
  const router = useRouter()
  const params = useParams()
  const saveId = params?.saveId as string
  const save = getSave(saveId)
  
  console.log('save ', save)
  if (save == undefined || save == null) {
    // toast(save) // mensagem de erro

    deleteSave(saveId)
    
    router.push(ROUTES.ROOT)
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