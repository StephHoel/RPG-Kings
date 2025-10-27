import { PropsWithChildren } from 'react'

export interface ButtonsWithClickProps extends PropsWithChildren {
  onClick: () => void
  disabled?: boolean
}