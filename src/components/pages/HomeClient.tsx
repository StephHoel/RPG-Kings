"use client"
import { useActiveSave } from "@/hooks"
import { Button } from "@/components"
import { ROUTES } from "@/config/routes"
import Link from "next/link"

export default function HomeClient() {
  const { activeSaveId } = useActiveSave()

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-primary drop-shadow text-center">
        Bem-vindo(a)
      </h1>

      <p className="mb-6 text-lg text-primary-fg text-center">
        Continue seu jogo ou crie um novo save.
      </p>

      <div className="flex flex-col md:flex-row px-4 gap-6 md:gap-2 md:justify-between">
        {activeSaveId && (
          <Button as={Link} href={ROUTES.GAME(activeSaveId)}>
            Continuar
          </Button>
        )}

        <Button as={Link} href={ROUTES.SAVE_NEW}>
          Novo save
        </Button>
      </div>
    </div>
  )
}