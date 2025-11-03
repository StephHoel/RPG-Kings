'use client'
import { Button } from '@/components'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/config/routes'

export default function NotFoundClient() {
  const router = useRouter()

  return (
    <div className='min-h-full flex items-center justify-center'>
      <div className='bg-neutral-800/80 rounded-2xl shadow-2xl border-violet-900 p-8 text-center'>
        <h2 className='text-3xl font-bold text-violet-400 mb-4'>
          404 - Página não encontrada
        </h2>

        <Button onClick={() => router.push(ROUTES.ROOT)}>Voltar para Início</Button>
      </div>
    </div>
  )
}
