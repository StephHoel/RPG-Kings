import { StatsBaseModel, StatsModel } from '../models'

export type CreateStats = {
  raceOrAnimal: StatsBaseModel['target']
  saveId: StatsModel['saveId']
}
