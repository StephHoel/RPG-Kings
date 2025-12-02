import { db } from '@/infra/dexie/database'
import { Discipline } from '@/infra/schemas'

export async function getDisciplineByName(
  name: Discipline['name']
): Promise<Discipline | undefined> {
  return db.disciplines_list.where({ name }).first()
}

export async function getDisciplinesByType(type: Discipline['type']): Promise<Discipline[]> {
  return db.disciplines_list.where({ type }).toArray()
}

export async function getDisciplinesByStats(stats: Discipline['stats']): Promise<Discipline[]> {
  return db.disciplines_list.where({ stats }).toArray()
}

export async function getAllDisciplines(): Promise<Discipline[]> {
  return db.disciplines_list.toArray()
}
