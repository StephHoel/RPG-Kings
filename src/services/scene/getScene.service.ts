import { getSceneById } from '@/infra/repositories'
import { Scene } from '@/infra/schemas'
import { log } from '../lib'

export async function getSceneByIdService(sceneId: Scene['id']): Promise<Scene | undefined> {
  const scene = await getSceneById(sceneId)

  await log.info(`[${getSceneByIdService.name}] Cena obtida`, { scene: scene })

  return scene
}
