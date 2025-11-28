import { db } from '@/infra/dexie/database'
import { Item } from '@/infra/schemas'

export async function getItemByName(name: Item['name']): Promise<Item | undefined> {
  return db.items_list.where({ name }).first()
}

export async function getItemsByType(type: Item['type']): Promise<Item[]> {
  return db.items_list.where({ type }).toArray()
}

export async function getAllItems(): Promise<Item[]> {
  return db.items_list.toArray()
}
