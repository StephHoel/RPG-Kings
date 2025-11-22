import { PropsWithChildren } from 'react'

export function SceneCard({ children }: PropsWithChildren) {
  return (
    <div className="bg-surface p-4 sm:p-6 border rounded-xl w-full max-w-none prose">
      {children}
    </div>
  )
}
