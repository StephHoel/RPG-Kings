import { useQuery } from '@tanstack/react-query'
import { useQueryKeys } from '../../../domain/queryKeys'
import { getSceneByIdService } from '@/services'
import { SceneModel } from '@/domain/models'

export function useGetScene(sceneId: SceneModel['id']): SceneModel | null {
  const { data: scene } = useQuery({
    queryKey: useQueryKeys.scene(sceneId),
    enabled: !!sceneId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes

    queryFn: async () => await getSceneByIdService(sceneId),
  })

  return scene ?? null
}
