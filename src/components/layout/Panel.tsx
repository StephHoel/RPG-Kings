import { PropsWithChildren } from 'react'

export function Panel({ children, className }: PropsWithChildren & { className?: string }) {
  return (
    <div className={`flex flex-col gap-6 ${className ?? ''}`}>
      {children}
    </div>
  )
}