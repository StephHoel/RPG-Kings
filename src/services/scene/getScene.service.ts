import { getSceneById } from '@/infra/repositories'
import { SceneModel } from '@/domain/models'
import { log } from '@/services'
import { LOG_MESSAGES } from '@/domain/constants'

export async function getSceneByIdService(
  sceneId: SceneModel['id']
): Promise<SceneModel | undefined> {
  const scene = await getSceneById(sceneId)

  await log.info(LOG_MESSAGES.scene.obtained({ method: getSceneByIdService.name }), {
    scene: scene,
  })

  return scene
}
