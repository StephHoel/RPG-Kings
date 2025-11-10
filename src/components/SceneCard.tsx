import { PropsWithChildren } from 'react'

export function SceneCard({ children }: PropsWithChildren) {
  return (
    <div className="w-full rounded-xl border p-4 sm:p-6 prose max-w-none bg-surface">
      {children}
    </div>
  )
}
