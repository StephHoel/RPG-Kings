import { Table } from 'dexie'

export async function safeBulkAdd<T>(
  table: Table<T, any>,
  data: T[],
  chunkSize = 3000 // evita limites do IndexedDB em lotes grandes
) {
  for (let i = 0;i < data.length;i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize)

    try {
      await table.bulkAdd(chunk)
    } catch (err: any) { }
  }
}
