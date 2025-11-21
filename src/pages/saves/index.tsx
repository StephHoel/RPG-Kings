'use client'
import { useRouter } from 'next/router'
import { useDeleteSave, useGetAllSaves } from '@/hooks'
import { Button, H1, Panel } from '@/components'
import { ROUTES, routeWithSaveId } from '@/config'
import { SaveId } from '@/interfaces'
import { toast } from 'sonner'
import Head from 'next/head'

export default function Saves() {
  const router = useRouter()
  const deleteMutation = useDeleteSave()
  let saves = useGetAllSaves()

  const toDeleteSave = (saveId: SaveId) => {
    deleteMutation
      .mutateAsync(saveId)
      .then(() => toast.success('Save apagado!'))
      .catch(() => toast.error('Erro ao apagar save'))
  }

  const toSaveNew = () => router.push(ROUTES.SAVE_NEW)

  const toGame = (saveId: SaveId) => router.push(routeWithSaveId(ROUTES.GAME,saveId))

  return (<>
    <Head>
      <title>Saves</title>
    </Head>
    
    <Panel>
      <H1>Saves</H1>

      <Button onClick={toSaveNew}>
        Novo save
      </Button>

      <ul className="space-y-2 divide-y">
        {saves && saves?.map((s) => (
          <li key={s.id} className="flex justify-between items-center p-2 border border-highlight rounded">
            <p>{s.name}</p>

            <div className="flex gap-2 w-1/2">
              <Button className='mx-auto! p-2! md:p-4! w-full!' onClick={() => toGame(s.id)}>
                Jogar
              </Button>

              <Button className='mx-auto! p-2! md:p-4! w-full!' onClick={() => toDeleteSave(s.id)}>
                Excluir
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  </>)
}
