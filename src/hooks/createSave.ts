import { db } from '@/data/db'
import { nanoid } from 'nanoid'

export async function createSave(name: string) {
  const id = nanoid(10)
  console.log(name)
  console.log(db.saves)
  await db.saves.toCollection().modify({ isActive: false })

  await db.saves.add({
    id,
    name: name || 'Novo personagem',
    isActive: true,
    currentWeek: 1,
    currentDay: 'Monday',
    currentHour: 8,
  })

  return id
}