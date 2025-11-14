import { DebugClient } from '@/components'
import { metadatas } from '@/config'

export const metadata = metadatas.debug

export default function DebugPage() {
  return <DebugClient />
}
