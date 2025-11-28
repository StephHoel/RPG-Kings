import { StatsBaseModel, StatsModel } from '../models'

export type CreateStats = {
  target: StatsBaseModel['target']
  saveId: StatsModel['saveId']
}
