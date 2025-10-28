'use client'
import { useParams } from 'next/navigation'
import { getSave, getScene } from '@/hooks'
import { ChoiceList, SceneCard } from '@/components'

export default function GameClient() {
  const params = useParams()
  const saveId = params?.saveId as string
  const save = getSave(saveId)!

  // if (save == undefined) {
  //   toast(save) // mensagem de erro

  //   return useRouter().push(ROUTES.ROOT)
  // }

  const scene = getScene(save)

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