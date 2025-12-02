import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useQueryKeys } from '@/domain/queryKeys'
import { createSaveService, createSheetService, createStatsService, log } from '@/services'
import { LOG_MESSAGES, RACE_ENUM } from '@/domain/constants'
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
        const msg = LOG_MESSAGES.save.error.create({ method: createSaveService.name })

        console.error(msg)
        await log.error(msg, { name, race })
        return
      }

      const sheet = await createSheetService({ saveId: save?.id, name, race })

      if (!sheet) {
        const msg = LOG_MESSAGES.sheet.error.create({
          method: createSheetService.name,
          saveId: save?.id,
        })

        console.error(msg)
        await log.error(msg, { save, name, race })
        return { save, sheet, stats: undefined }
      }

      const raceOrAnimal = race === RACE_ENUM.shapeshift && sheet?.animal ? sheet?.animal : race

      const stats = await createStatsService({ target: raceOrAnimal, saveId: save.id })

      if (!stats) {
        const msg = LOG_MESSAGES.stats.error.create({
          method: createStatsService.name,
          saveId: save.id,
        })

        console.error(msg)
        await log.error(msg, { save, sheet })
      }

      return { save, sheet, stats }
    },

    onMutate: async () => {
      try {
        await queryClient.cancelQueries({ queryKey: useQueryKeys.allSaves() })
        await queryClient.cancelQueries({ queryKey: useQueryKeys.saveActive() })
        await queryClient.cancelQueries({ queryKey: useQueryKeys.sheetActive() })
        await queryClient.cancelQueries({ queryKey: useQueryKeys.statsActive() })
      } catch (err) {
        const msg = LOG_MESSAGES.queries.error.invalidateCreate({
          method: useCreateSave.name,
        })
        console.error(msg, err)
      }
    },

    onSuccess: async (data) => {
      try {
        if (!data) return

        // Atualiza a lista de saves: adiciona o novo save ao cache se existir
        queryClient.setQueryData(useQueryKeys.allSaves(), (old: any) => {
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
        const msg = LOG_MESSAGES.queries.error.updateCache({
          method: useCreateSave.name,
        })
        console.error(msg, err)
      }
    },

    onError: async (err) => {
      const msg = LOG_MESSAGES.save.error.create({ method: useCreateSave.name })

      console.error(msg, err)

      await log.error(msg, { error: err })
    },
  })
}
