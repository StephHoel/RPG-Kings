'use client'
import { useRouter } from 'next/router'
import { useDeleteSave, useGetAllSaves } from '@/ui/hooks'
import { Button, H1, Panel } from '@/ui/components'
import { ROUTES, routeWithSaveId } from '@/domain/routes'
import { toast } from 'sonner'
import { TOAST_MESSAGES } from '@/domain/constants'
import Head from 'next/head'

export default function Saves() {
  const router = useRouter()
  const deleteMutation = useDeleteSave()
  let { data: saves } = useGetAllSaves()

  const toDeleteSave = (saveId: string) => {
    deleteMutation
      .mutateAsync(saveId)
      .then(() => toast.success(TOAST_MESSAGES.game.delete({ method: 'SavesIndex' })))
      .catch(() => toast.error(TOAST_MESSAGES.game.error.delete({ method: 'SavesIndex' })))
  }

  const toSaveNew = () => router.push(ROUTES.SAVE_NEW)

  const toGame = (saveId: string) => router.push(routeWithSaveId(ROUTES.GAME, saveId))

  return (
    <>
      <Head>
        <title>Saves — King's Academy</title>
      </Head>

      <Panel>
        <H1>Saves</H1>

        <Button onClick={toSaveNew}>Novo save</Button>

        <ul className="space-y-2 divide-y">
          {saves &&
            saves?.map((s) => (
              <li
                key={s.id}
                className="flex justify-between items-center p-2 border border-highlight rounded"
              >
                {/* <p>{s.name}</p> */}

                <div className="flex gap-2 w-1/2">
                  <Button className="mx-auto! p-2! md:p-4! w-full!" onClick={() => toGame(s.id)}>
                    Jogar
                  </Button>

                  <Button
                    className="mx-auto! p-2! md:p-4! w-full!"
                    onClick={() => toDeleteSave(s.id)}
                  >
                    Excluir
                  </Button>
                </div>
              </li>
            ))}
        </ul>
      </Panel>
    </>
  )
}
