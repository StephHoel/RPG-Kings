import { db } from '@/infra/dexie/database'
import { Animal } from '@/infra/schemas'

export async function getAnimalByName(name: Animal['name']): Promise<Animal | undefined> {
  return db.animals_list.where({ name }).first()
}

export async function getAnimalsByRace(race: Animal['race']): Promise<Animal[]> {
  return db.animals_list.where({ race }).toArray()
}
