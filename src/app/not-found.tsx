import { metadatas } from '@/config/metadatas'
import NotFoundClient from '@/components/pages/NotFoundClient'

export const metadata = metadatas.not_found

export default function NotFound() {
  return <NotFoundClient />
}
