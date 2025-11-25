import { getSaveActive } from '@/infra/repositories'
import { SaveModel } from '@/domain/models'

export async function getActiveSaveService(): Promise<SaveModel | null> {
  const active = await getSaveActive()

  return active ?? null
}
