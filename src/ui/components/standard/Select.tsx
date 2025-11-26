import { ErrorIcon } from '@/ui/components/icons'
import { SelectProps } from '@/ui/types'

export function Select({ className = '', options, children, error, ...rest }: SelectProps) {
  const ariaLabel =
    (rest as any)['aria-label'] ??
    (typeof children === 'string' ? children : undefined) ??
    (rest as any).placeholder

  const ariaRequired = (rest as any)['aria-required'] ?? (rest.required ? true : undefined)

  return (
    <div className={`w-full ${className}`}>
      <label className="space-y-1">
        <p className={children ? 'block' : 'hidden'}>{children}</p>

        <select
          className={`px-3 py-2 border border-highlight rounded focus:outline-2 w-full bg-surface text-foreground ${
            error ? 'focus:outline-danger' : 'focus:outline-primary'
          }`}
          aria-label={ariaLabel}
          aria-required={ariaRequired}
          {...rest}
        >
          {rest.placeholder
            ? (() => {
                const current = (rest as any).value ?? (rest as any).defaultValue
                const hasValue = current !== undefined && current !== '' && current !== null

                return (
                  <option value="" disabled hidden={hasValue}>
                    {rest.placeholder}
                  </option>
                )
              })()
            : null}

          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        <p
          role="alert"
          className={`text-danger text-sm flex items-center gap-2 ${error ? 'block' : 'hidden'}`}
        >
          <ErrorIcon aria-hidden />

          <span>{String(error)}</span>
        </p>
      </label>
    </div>
  )
}
