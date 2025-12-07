import { getSceneByIdService, log } from '@/services'
import { useFetch } from '@/ui/hooks/useFetch'
import { SceneModel } from '@/domain/models'
import { HookResult } from '@/domain/types'
import { LOG_MESSAGES } from '@/domain/constants'

export function useGetScene(sceneId: SceneModel['id']): HookResult<SceneModel> {
  const fetchFn = sceneId ? () => getSceneByIdService(sceneId) : null

  const { data, isLoading, error } = useFetch<SceneModel>(fetchFn, {
    enabled: !!sceneId,
    deps: [sceneId],
  })

  if (error) {
    const msg = LOG_MESSAGES.scene.error.get({ method: useGetScene.name })

    console.error(msg, error)

    log.error(msg, { sceneId, error: String(error) })
  }

  return { data, isLoading, error }
}
