import { SeedDevClient } from '@/components'
import { metadatas } from '@/config'

export const metadata = metadatas.dev_seed

export default function SeedDevPage() {
  return <SeedDevClient />
}
