import { useQuery } from '@tanstack/react-query'
import { useQueryKeys } from '@/domain/queryKeys'
import { getSceneByIdService, log } from '@/services'
import { SceneModel } from '@/domain/models'

export function useGetScene(sceneId: SceneModel['id']): SceneModel | null {
  const { data: scene } = useQuery({
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

        await log.error(msg, { sceneId, error: String(err) })
      }
    },
  })

  return scene ?? null
}
