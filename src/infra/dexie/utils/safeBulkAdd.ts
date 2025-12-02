import { Table } from 'dexie'
import { LOG_MESSAGES } from '@/domain/constants'

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
    LOG_MESSAGES.dexie.dexieUtils.safeBulkAdd.start({
      method: 'safeBulkAdd',
      total: data.length,
      chunkSize,
      keySelector: keySelector ? 'presente' : 'ausente',
    })
  )

  if (keySelector) {
    // Remover duplicatas da entrada mantendo a última ocorrência
    const map = new Map<K, T>()
    for (const item of data) {
      try {
        map.set(keySelector(item), item)
      } catch (e) {
        console.error(
          LOG_MESSAGES.dexie.dexieUtils.safeBulkAdd.keySelectorError({ method: 'safeBulkAdd' }),
          item,
          e
        )
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
              console.error(
                LOG_MESSAGES.dexie.dexieUtils.safeBulkAdd.insertAttemptFail({
                  method: 'safeBulkAdd',
                }),
                i,
                _err
              )
            )
          }
        }
      } catch (_err: unknown) {
        console.error(
          LOG_MESSAGES.dexie.dexieUtils.safeBulkAdd.bulkGetFail({ method: 'safeBulkAdd' }),
          _err
        )
        try {
          await table.bulkAdd(chunk)
          inserted += chunk.length
        } catch (_err2: unknown) {
          errors += chunk.length
          console.error(
            LOG_MESSAGES.dexie.dexieUtils.safeBulkAdd.bulkAddChunkFail({
              method: 'safeBulkAdd',
              count: chunk.length,
            }),
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
          LOG_MESSAGES.dexie.dexieUtils.safeBulkAdd.serializeFail({ method: 'safeBulkAdd' }),
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
          LOG_MESSAGES.dexie.dexieUtils.safeBulkAdd.bulkPutChunkFail({ method: 'safeBulkAdd' }),
          _err
        )
        for (const item of chunk) {
          try {
            await table.put(item as any)
            inserted += 1
          } catch (_err2: unknown) {
            errors += 1
            console.error(
              LOG_MESSAGES.dexie.dexieUtils.safeBulkAdd.itemInsertFail({ method: 'safeBulkAdd' }),
              item,
              _err2
            )
          }
        }
      }
    }

    skipped = data.length - uniqueItems.length
  }

  console.info(
    LOG_MESSAGES.dexie.dexieUtils.safeBulkAdd.finished({
      method: 'safeBulkAdd',
      inserted,
      skipped,
      errors,
    })
  )

  return { inserted, skipped, errors }
}
