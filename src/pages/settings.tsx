import Head from 'next/head'
import { H1, Panel } from '@/components'

export default function Settings() {
  return (<>
    <Head>
      <title>Configurações</title>
    </Head>
    
    <Panel>
      <H1>Configurações</H1>

      <ul className="space-y-2 mt-2 text-sm">
        <li>Tema: sistema</li>
        <li>Fonte: 100%</li>
        <li>Contraste alto: desligado</li>
      </ul>
    </Panel>
  </>)
}
