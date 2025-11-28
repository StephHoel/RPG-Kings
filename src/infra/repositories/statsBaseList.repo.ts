import { db } from '@/infra/dexie/database'
import { StatsBase } from '@/infra/schemas'

export async function getStatsBaseByTarget(
  target: StatsBase['target']
): Promise<StatsBase | undefined> {
  return db.stats_base_list.where({ target }).first()
}
