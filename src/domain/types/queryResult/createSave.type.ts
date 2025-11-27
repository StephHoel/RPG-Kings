import { SaveModel, SheetModel, StatsModel } from '@/domain/models'

export type CreateSaveResult = {
  save?: SaveModel | undefined
  sheet?: SheetModel | undefined
  stats?: StatsModel | undefined
}
