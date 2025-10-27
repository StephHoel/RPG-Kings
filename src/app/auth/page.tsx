import AuthClient from '@/components/pages/AuthClient'
import { metadatas } from '@/config/metadatas'

export const metadata = metadatas.auth

export default function AuthPage() {
  return <AuthClient />
}
