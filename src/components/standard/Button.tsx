"use client"
import { ButtonsProps } from '@/interfaces'
import { Loader } from '@/components'
import { ElementType } from 'react'

export function Button<T extends ElementType>({
  disabled = false,
  children,
  isLoading = false,
  textLoader = '',
  type,
  className,
  as,
  ...props
}: ButtonsProps<T>) {

  const Element = as ?? ('button' as ElementType)
  const isDisabled = disabled || isLoading

  const defaultClass =
    'w-full px-4 py-2 rounded-xl bg-violet-600 text-center hover:bg-violet-500 text-panel-fg font-bold '

  const combinedClass = `${className ?? defaultClass} ${isDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}`.trim()

  // Conditionally include attributes appropriate for the rendered element
  const elementProps: any = {
    className: combinedClass,
    ...props,
  }

  if (Element === 'button') {
    elementProps.type = type
    elementProps.disabled = isDisabled
  } else {
    // For non-button elements, provide aria-disabled and prevent tab focus when disabled
    elementProps['aria-disabled'] = isDisabled
    if (isDisabled) elementProps.tabIndex = -1
  }

  return (
    <Element {...elementProps}>
      {isLoading ? <Loader text={textLoader} /> : children}
    </Element>
  )
}