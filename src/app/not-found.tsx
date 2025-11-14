import { NotFoundClient } from '@/components'
import { metadatas } from '@/config'

export const metadata = metadatas.not_found

export default function NotFound() {
  return <NotFoundClient />
}
