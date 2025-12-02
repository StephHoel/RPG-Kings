import { PropsWithChildren } from 'react'

export function Background({ children, className }: PropsWithChildren & { className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-highlight bg-muted/70 p-4 flex shadow-2xl backdrop-blur-xl ${
        className ?? ''
      }`}
    >
      {children}
    </div>
  )
}
