'use client'
import { useRouter } from 'next/navigation'
import { getAllSaves } from '@/hooks'
import { Button, H1, Panel } from '@/components'
import { ROUTES } from '@/config'

export default function SavesClient() {
  const router = useRouter()
  const saves = getAllSaves()

  return (
    <Panel>
      <H1>Saves</H1>

      <Button onClick={() => router.push(ROUTES.SAVE_NEW)}>
        Novo save
      </Button>

      <ul className="divide-y">
        {saves && saves?.map((s) => (
          <li key={s.id} className="py-2 flex items-center justify-between">
            <Button className='w-full sm:w-auto mx-auto' onClick={() => router.push(ROUTES.GAME(s.id))}>
              Ativar Save: {s.name}
            </Button>
          </li>
        ))}
      </ul>
    </Panel>
  )
}
