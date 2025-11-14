import { AuthClient } from '@/components'
import { metadatas } from '@/config'

export const metadata = metadatas.auth

export default function AuthPage() {
  return <AuthClient />
}
