'use client'
import { useRouter } from 'next/router'
import { useGetInventory, useGetSheetActive } from '@/ui/hooks'
import { ROUTES } from '@/domain/routes'
import { H1, H2, Panel } from '@/ui/components'
import { Suspense, useEffect } from 'react'
import Head from 'next/head'

export default function Sheet() {
  const router = useRouter()
  const query = router.query
  const saveId = Array.isArray(query.saveId) ? query.saveId[0] : query.saveId

  useEffect(() => {
    if (!saveId) {
      router.push(ROUTES.ROOT)
    }
  }, [saveId])

  const { data: sheet } = useGetSheetActive(saveId!)
  const { data: items } = useGetInventory(saveId!)

  return (
    <>
      <Head>
        <title>Ficha de Personagem — King's Academy</title>
      </Head>

      <Suspense fallback={<div>Carregando...</div>}>
        <Panel>
          <H1>Ficha & Inventário</H1>

          <H2>Ficha</H2>

          <pre className="bg-gray-500 p-3 border rounded overflow-auto text-sm">
            {JSON.stringify(sheet ?? 'Sem sheet', null, 2)}
          </pre>

          <H2>Inventário</H2>

          <ul className="space-y-2">
            {!items || items.length === 0
              ? 'Sem itens'
              : items.map((i) => (
                  <li key={i.id} className="p-3 border rounded">
                    <div className="font-medium">{i.item}</div>

                    <div className="opacity-70 text-sm">
                      Comprado semana: {i.acquiredWeek} · Duração:{' '}
                      {i.durationWeeks === 0 ? 'ilimitada' : `${i.durationWeeks} semanas`} · Expira:{' '}
                      {i.expiresAtWeek ?? '—'}
                    </div>
                  </li>
                ))}
          </ul>
        </Panel>
      </Suspense>
    </>
  )
}
