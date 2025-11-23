'use client'
import { useState } from 'react'
import { Button, H1, Panel } from '@/ui/components'
import { useSeedAll } from '@/ui/hooks'
import Head from 'next/head'

export default function SeedDevPage() {
  const seedMutation = useSeedAll()
  const [isSeed, setIsSeed] = useState(false)

  const seed = async () => {
    await seedMutation.mutateAsync()

    setIsSeed(true)
  }

  return (
    <>
      <Head>
        <title>Seed</title>
      </Head>

      <Panel>
        <H1>/dev/seed – Semeando Amor</H1>

        <Button onClick={seed} disabled={isSeed}>
          {isSeed ? <p className="text-success">✅ Semeado com amor!</p> : <p>Semear tudo!</p>}
        </Button>
      </Panel>
    </>
  )
}
