import { Table } from 'dexie'

type SafeBulkAddResult = {
  inserted: number
  skipped: number
  errors: number
}

export async function safeBulkAdd<T, K = any>(
  table: Table<T, K>,
  data: T[],
  chunkSize = 3000, // evita limites do IndexedDB em lotes grandes

  keySelector?: (item: T) => K
): Promise<SafeBulkAddResult> {
  let inserted = 0
  let skipped = 0
  let errors = 0

  if (data.length === 0) return { inserted, skipped, errors }

  console.info(
    `[SafeBulkAdd] Iniciando... Total=${data.length}, ChunkSize=${chunkSize}, KeySelector=${
      keySelector ? 'presente' : 'ausente'
    }`
  )

  if (keySelector) {
    // Remover duplicatas da entrada mantendo a última ocorrência
    const map = new Map<K, T>()
    for (const item of data) {
      try {
        map.set(keySelector(item), item)
      } catch (e) {
        console.error('[SafeBulkAdd] Erro no keySelector ao processar item:', item, e)
      }
    }

    const uniqueItems = Array.from(map.values())

    for (let i = 0; i < uniqueItems.length; i += chunkSize) {
      const chunk = uniqueItems.slice(i, i + chunkSize)
      const keys = chunk.map((it) => keySelector(it))

      try {
        const existing = await table.bulkGet(keys)

        const toInsert: T[] = []
        for (let j = 0; j < chunk.length; j++) {
          if (typeof existing[j] === 'undefined') {
            toInsert.push(chunk[j])
          } else {
            skipped += 1
          }
        }

        if (toInsert.length > 0) {
          try {
            await table.bulkAdd(toInsert)
            inserted += toInsert.length
          } catch (_err: unknown) {
            errors += toInsert.length
            toInsert.map((i) =>
              console.error(`[SafeBulkAdd] Erro ao tentar inserir ${i} | ${_err}`)
            )
          }
        }
      } catch (_err: unknown) {
        console.error(
          '[SafeBulkAdd] Falha ao verificar existência (bulkGet). Tentando inserir o chunk via bulkAdd. Erro:',
          _err
        )
        try {
          await table.bulkAdd(chunk)
          inserted += chunk.length
        } catch (_err2: unknown) {
          errors += chunk.length
          console.error(
            '[SafeBulkAdd] Falha ao inserir chunk via bulkAdd. Itens afetados:',
            chunk.length,
            _err2
          )
        }
      }
    }
  } else {
    // Sem keySelector: deduplicar por stringificação (fallback simples)
    const uniqueMap = new Map<string, T>()
    for (const item of data) {
      try {
        const key = JSON.stringify(item)
        uniqueMap.set(key, item)
      } catch (e) {
        console.error(
          '[SafeBulkAdd] Não foi possível serializar item para deduplicação; usando chave fallback. Erro:',
          e
        )
        const fallbackKey = Math.random().toString(36).slice(2)
        uniqueMap.set(fallbackKey, item)
      }
    }

    const uniqueItems = Array.from(uniqueMap.values())

    for (let i = 0; i < uniqueItems.length; i += chunkSize) {
      const chunk = uniqueItems.slice(i, i + chunkSize)

      try {
        // Usar bulkPut para evitar falhas por chaves duplicadas
        await table.bulkPut(chunk)
        inserted += chunk.length
      } catch (_err: unknown) {
        console.error(
          '[SafeBulkAdd] Falha no bulkPut do chunk. Tentando inserir itens individualmente. Erro:',
          _err
        )
        for (const item of chunk) {
          try {
            await table.put(item as any)
            inserted += 1
          } catch (_err2: unknown) {
            errors += 1
            console.error('[SafeBulkAdd] Falha ao inserir item individualmente:', item, _err2)
          }
        }
      }
    }

    skipped = data.length - uniqueItems.length
  }

  console.info(
    `[SafeBulkAdd] Concluído! Inseridos=${inserted}, Ignorados=${skipped}, Erros=${errors}`
  )

  return { inserted, skipped, errors }
}
