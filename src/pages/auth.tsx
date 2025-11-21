import Head from 'next/head'
import { H1, Panel } from '@/components'

export default function Auth() {
  return (
    <>
    <Head>
      <title>Auth</title>
    </Head>
      
    <Panel>
      <H1>Login offline</H1>

      <p className="opacity-70 text-sm">
        (placeholder para futuro login online)
      </p>
    </Panel>
    </>
  )
}
