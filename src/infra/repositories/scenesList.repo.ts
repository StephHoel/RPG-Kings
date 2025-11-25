import { db } from '@/infra/dexie/database'
import { PreRequireScene, Scene } from '@/infra/schemas'

export async function getSceneById(id: string): Promise<Scene | undefined> {
  return db.scenes_list.get(id)
}

export async function getScenesByPreRequire(preRequire: PreRequireScene): Promise<Scene[]> {
  // TODO precisa ter todos os require informado, mas pode ter require que foram passados como undefined
  return db.scenes_list.where(preRequire).toArray()
}

export async function getAllScenes(): Promise<Scene[]> {
  return db.scenes_list.toArray()
}

export async function getSceneByName(title: string): Promise<Scene | undefined> {
  return db.scenes_list.where({ title }).first()
}
