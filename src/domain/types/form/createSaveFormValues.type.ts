import { RaceEnum } from '@/domain/constants'

export interface CreateSaveFormValues {
  name: string
  race: RaceEnum | ''
}
