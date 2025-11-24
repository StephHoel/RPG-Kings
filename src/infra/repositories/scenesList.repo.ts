import { db } from '@/infra/dexie/database'
import { PreRequireScene, Scene } from '@/infra/schemas'

export async function getSceneById(id: string): Promise<Scene | undefined> {
  return db.scenes.get(id)
}

export async function getScenesByPreRequire(preRequire: PreRequireScene): Promise<Scene[]> {
  // TODO precisa ter todos os require informado, mas pode ter require que foram passados como undefined
  return db.scenes.where(preRequire).toArray()
}

export async function getAllScenes(): Promise<Scene[]> {
  return db.scenes.toArray()
}

export async function getSceneByName(title: string): Promise<Scene | undefined> {
  return db.scenes.where({ title }).first()
}
