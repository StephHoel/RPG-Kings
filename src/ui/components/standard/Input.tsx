import { InputProps } from '@/domain/types'
import { ErrorIcon } from '@/ui/components/icons'

export function Input({ className = '', children, error, ...rest }: InputProps) {
  return (
    <div className={`w-full ${className}`}>
      <label className="space-y-1">
        <p className={children ? 'block' : 'hidden'}>{children}</p>

        <input
          className={`px-3 py-2 border border-highlight rounded focus:outline-2  w-full ${
            error ? 'focus:outline-danger' : 'focus:outline-primary'
          }`}
          {...rest}
        />

        <p
          role="alert"
          className={`text-danger text-sm flex items-center gap-2 ${error ? 'block' : 'hidden'}`}
        >
          <ErrorIcon aria-hidden />

          <span>{error}</span>
        </p>
      </label>
    </div>
  )
}
