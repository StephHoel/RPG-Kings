import { Activity, ActivityProps, PropsWithChildren } from 'react'

export function AlertError({ children, mode }: PropsWithChildren & ActivityProps) {
  return (
    <Activity mode={mode}>
      <p className="text-sm text-danger" role="alert">{children}</p>
    </Activity>
  )
}