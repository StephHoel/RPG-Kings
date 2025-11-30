import { useQuery } from '@tanstack/react-query'
import { useQueryKeys } from '@/domain/queryKeys'
import { getSceneByIdService, log } from '@/services'
import { SceneModel } from '@/domain/models'
import { HookResult } from '@/domain/types'

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
        const msg = `[${useGetScene.name}] Erro ao obter cena`

        console.error(msg, err)

        await log.error(msg, undefined, { sceneId, error: String(err) })
      }
    },
  })
}
