import { PropsWithChildren } from 'react'

export function H1({ children }: PropsWithChildren) {
  return (
    <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-primary drop-shadow text-center">
      {children}
    </h1>
  )
}