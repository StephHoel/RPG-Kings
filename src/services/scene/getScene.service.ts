import { getSceneById } from '@/infra/repositories'
import { SceneModel } from '@/domain/models'
import { log } from '@/services'

export async function getSceneByIdService(
  sceneId: SceneModel['id']
): Promise<SceneModel | undefined> {
  const scene = await getSceneById(sceneId)

  await log.info(`[${getSceneByIdService.name}] Cena obtida`, undefined, { scene: scene })

  return scene
}
