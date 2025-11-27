import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useQueryKeys } from '@/domain/queryKeys'
import { createSaveService, createSheetService, createStatsService, log } from '@/services'
import { RACE_ENUM } from '@/domain/constants'
import { CreateSaveFormValues, CreateSaveResult } from '@/domain/types'

export function useCreateSave() {
  const queryClient = useQueryClient()

  return useMutation<CreateSaveResult | undefined, Error, CreateSaveFormValues>({
    mutationFn: async ({
      name,
      race,
    }: CreateSaveFormValues): Promise<CreateSaveResult | undefined> => {
      const save = await createSaveService()

      if (!save) {
        const msg = `[${createSaveService.name}] Falha ao criar save`

        console.error(msg)
        await log.error(msg, { name, race })
        return
      }

      const sheet = await createSheetService({ saveId: save?.id, name, race })

      if (!sheet) {
        const msg = `[${createSheetService.name}] Falha ao criar sheet para save ${save?.id}`

        console.error(msg)
        await log.error(msg, { save, name, race })
        return { save, sheet, stats: undefined }
      }

      const raceOrAnimal = race === RACE_ENUM.shapeshift && sheet?.animal ? sheet?.animal : race

      const stats = await createStatsService({ raceOrAnimal, saveId: save.id })

      if (!stats) {
        const msg = `[${createStatsService.name}] Falha ao criar stats para save ${save.id}`

        console.error(msg)
        await log.error(msg, { save, sheet })
      }

      return { save, sheet, stats }
    },

    onMutate: async () => {
      try {
        await queryClient.cancelQueries({ queryKey: useQueryKeys.saves() })
        await queryClient.cancelQueries({ queryKey: useQueryKeys.saveActive() })
        await queryClient.cancelQueries({ queryKey: useQueryKeys.sheetActive() })
        await queryClient.cancelQueries({ queryKey: useQueryKeys.statsActive() })
      } catch (err) {
        console.error(`[${useCreateSave.name}] Erro ao invalidar queries antes da criação`, err)
      }
    },

    onSuccess: async (data) => {
      try {
        if (!data) return

        // Atualiza a lista de saves: adiciona o novo save ao cache se existir
        queryClient.setQueryData(useQueryKeys.saves(), (old: any) => {
          if (!old) return old

          return [...old, data.save]
        })

        // Atualiza o save ativo
        queryClient.setQueryData(useQueryKeys.saveActive(), data.save)

        // Atualiza a sheet ativa
        queryClient.setQueryData(useQueryKeys.sheetActive(), data.sheet)

        // Atualiza o stats ativo
        queryClient.setQueryData(useQueryKeys.statsActive(), data.stats)
      } catch (err) {
        console.error(`[${useCreateSave.name}] Erro ao atualizar cache após sucesso`, err)
      }
    },

    onError: async (err) => {
      const msg = `[${useCreateSave.name}] Erro na criação do save`

      console.error(msg, err)

      await log.error(msg, { error: err })
    },
  })
}
