import { ButtonHTMLAttributes, DetailedHTMLProps, ElementType, PropsWithChildren } from 'react'

export interface ButtonsProps<T extends ElementType>
  extends PropsWithChildren,
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  isLoading?: boolean
  textLoader?: string
  as?: T
}
