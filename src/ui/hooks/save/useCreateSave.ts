import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useQueryKeys } from '../../../domain/queryKeys'
import { CreateSaveFormValues } from '@/ui/types'
import { createSaveService, log } from '@/services'

export function useCreateSave() {
  const queryClient = useQueryClient()

  return useMutation<string, Error, CreateSaveFormValues>({
    mutationFn: async ({ name, race }: CreateSaveFormValues): Promise<string> => {
      const saveId = await createSaveService()

      // TODO migrar para hook específico
      // sheets creation currently remains in hook until a dedicated service is implemented
      // // const animal = getAnimal(race)
      // // const stats = statsByRace(race, animal)
      // // const developSkills = getDevelopSkills(race)
      // // const fixedSkills = getFixedSkills(race)

      // await db.sheets.add({
      //   saveId,
      //   race,
      //   // animal: animal ?? null,
      //   coins: 0,
      //   name,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // })

      // await log.info('[useCreateSave] Ficha de personagem criada', { saveId })

      return saveId
    },

    onSuccess: async () => {
      queryClient.refetchQueries({ queryKey: useQueryKeys.saveActive() })
      queryClient.refetchQueries({ queryKey: useQueryKeys.saves() })
    },

    onError: async (err) => {
      const msg = `[${useCreateSave.name}] Erro na criação do save`

      console.error(msg, err)

      log.error(msg, { error: err })
    },
  })
}
