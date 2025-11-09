import { PropsWithChildren } from 'react'

export function SceneCard({ children }: PropsWithChildren) {
  return <div className="rounded-xl border p-4 prose max-w-none">{children}</div>
}
