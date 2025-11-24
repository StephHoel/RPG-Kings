import { db } from '@/infra/dexie/database'
import { Race } from '@/infra/schemas'

export async function getRaceByName(name: Race['name']): Promise<Race | undefined> {
  return db.races.where({ name }).first()
}

export async function getAllRaces(): Promise<Race[]> {
  return db.races.toArray()
}
