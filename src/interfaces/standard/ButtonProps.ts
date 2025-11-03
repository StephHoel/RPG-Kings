import { ButtonHTMLAttributes, ComponentProps, ComponentPropsWithRef, DetailedHTMLProps, ElementType, PropsWithChildren } from 'react'

export interface ButtonsProps<T extends ElementType>
  extends PropsWithChildren,
  ComponentPropsWithRef<ElementType>,
  DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isLoading?: boolean
  textLoader?: string
  as?: T
}