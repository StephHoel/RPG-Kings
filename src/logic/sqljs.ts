import initSqlJs, { type Database } from 'sql.js'

export async function loadDb(dbPath: string): Promise<Database> {
  const SQL = await initSqlJs({})
  const res = await fetch(dbPath)
  const buf = await res.arrayBuffer()
  return new SQL.Database(new Uint8Array(buf))
}

export function queryTable(db: Database, table: string) {
  return db.exec(`SELECT * FROM ${table}`)
}
