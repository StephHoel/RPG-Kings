import { useQuery } from '@tanstack/react-query'
import { useQueryKeys } from '@/domain/queryKeys'
import { getSceneByIdService, log } from '@/services'
import { SceneModel } from '@/domain/models'
import { HookResult } from '@/domain/types'
import { LOG_MESSAGES } from '@/domain/constants'

export function useGetScene(sceneId: SceneModel['id']): HookResult<SceneModel> {
  return useQuery({
    queryKey: useQueryKeys.scene(sceneId),
    enabled: !!sceneId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes

    queryFn: async () => {
      try {
        return await getSceneByIdService(sceneId)
      } catch (err) {
        const msg = LOG_MESSAGES.scene.error.get({ method: useGetScene.name })

        console.error(msg, err)

        await log.error(msg, { sceneId, error: String(err) })
      }
    },
  })
}
