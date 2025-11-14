'use client'
import { Button, H1, Panel } from '@/components'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/config'

export function NotFoundClient() {
  const router = useRouter()

  return (
    <Panel className='gap-20'>
      <H1> 404 - Página não encontrada </H1>

      <Button onClick={() => router.push(ROUTES.ROOT)}>Voltar para Início</Button>
    </Panel>
  )
}
