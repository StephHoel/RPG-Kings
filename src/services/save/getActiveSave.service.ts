import { getSaveActive } from '@/infra/repositories'
import { Save } from '@/infra/schemas'

export async function getActiveSaveService(): Promise<Save | null> {
  const active = await getSaveActive()

  return active ?? null
}
