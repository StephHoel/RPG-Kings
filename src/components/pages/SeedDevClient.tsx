'use client'
import { useState } from 'react'
import { Button, H1, Panel } from '@/components'
import { useSeedAll } from '@/hooks'

export function SeedDevClient() {
  const seedMutation = useSeedAll()
  const [isSeed, setIsSeed] = useState(false)

  const seed = async () => {
    await seedMutation.mutateAsync()

    setIsSeed(true)
  }

  return (
    <Panel>
      <H1>/dev/seed – Semeando Amor</H1>

      <Button
        onClick={seed}
        disabled={isSeed}
      >
        {isSeed ?
          <p className='text-success'>
            ✅ Semeado com amor!
          </p>
          :
          <p>Semear tudo!</p>
        }
      </Button>
    </Panel>
  )
}
