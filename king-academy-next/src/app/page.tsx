'use client'
import { useRouter } from 'next/navigation'
import { useActiveSave } from '@/hooks/useActiveSave'

export default function Home() {
  const router = useRouter()
  const { activeSaveId } = useActiveSave()
  const goContinue = () => router.push(activeSaveId ? `/game/${activeSaveId}` : '/saves')

  return (
    <div className="mx-auto max-w-xl p-4 space-y-4">
      <h1 className="text-xl font-semibold">Bem-vindo(a)</h1>
      <p>Continue seu jogo ou crie um novo save.</p>
      <div className="flex gap-2">
        <button className="border rounded-lg px-4 py-2" onClick={goContinue}>Continuar</button>
        <button className="border rounded-lg px-4 py-2" onClick={() => router.push('/saves/new')}>Novo save</button>
      </div>
    </div>
  )
}
