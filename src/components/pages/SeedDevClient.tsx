'use client'
import { useState } from 'react'
import { Button, H1, Panel } from '@/components'
import { useSeedAll } from '@/hooks'

export default function SeedDevClient() {
  const [isSeed, setIsSeed] = useState(false)

  const seed = async () => {
    setIsSeed(await useSeedAll().mutateAsync())
  }

  return (
    <Panel>
      <H1>/dev/seed – Semeando Amor</H1>

      <Button
        onClick={seed}
        disabled={isSeed}
      >
        {isSeed ?
          <p className='text-sucess'>
            ✅ Semeado com amor!
          </p>
          :
          <p>Semear tudo!</p>
        }
      </Button>
    </Panel>
  )
}
