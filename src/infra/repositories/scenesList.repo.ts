import { matchesPreRequire } from '@/domain/utils'
import { db } from '@/infra/dexie/database'
import { PreRequireScene, Scene } from '@/infra/schemas'

export async function getSceneById(id: string): Promise<Scene | undefined> {
  return db.scenes_list.get(id)
}

export async function getScenesByPreRequire(preRequire: PreRequireScene): Promise<Scene[]> {
  // If no preRequire provided, return all scenes
  if (!preRequire) return db.scenes_list.toArray()

  const scenes = await db.scenes_list.toArray()

  return scenes.filter((scene) => matchesPreRequire(scene, preRequire))
}

export async function getAllScenes(): Promise<Scene[]> {
  return db.scenes_list.toArray()
}

export async function getSceneByName(title: string): Promise<Scene | undefined> {
  return db.scenes_list.where({ title }).first()
}
