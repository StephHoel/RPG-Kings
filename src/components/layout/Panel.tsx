import { PropsWithChildren } from 'react'

export function Panel({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col gap-6">
      {children}
    </div>
  )
}