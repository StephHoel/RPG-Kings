import { db } from '@/infra/dexie/database'
import { Skill } from '@/infra/schemas'

export async function getSkillByName(name: Skill['name']): Promise<Skill | undefined> {
  return db.skills.where({ name }).first()
}

export async function getSkillsByType(type: Skill['type']): Promise<Skill[]> {
  return db.skills.where({ type }).toArray()
}

export async function getSkillsByRaces(races: Skill['races']): Promise<Skill[]> {
  return db.skills.where({ races }).toArray()
}