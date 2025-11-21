'use client'
import { Button, H1, Panel } from '@/components'
import { useRouter } from 'next/router'
import { ROUTES } from '@/config'
import Head from 'next/head'

export default function NotFound() {
  const router = useRouter()

  return (<>
    <Head>
      <title>Página não encontrada — King's Academy</title>
    </Head>
      
    <Panel className='gap-20'>
      <H1> 404 - Página não encontrada </H1>

      <Button onClick={() => router.push(ROUTES.ROOT)}>Voltar para Início</Button>
    </Panel>
  </>)
}
