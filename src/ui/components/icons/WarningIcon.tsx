import { SVGProps } from 'react'

export function WarningIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="flex-shrink-0 w-4 h-4 text-warning"
      aria-hidden
      {...props}
    >
      <path
        d="M10.29 3.86L1.82 18a1 1 0 0 0 .86 1.5h18.64a1 1 0 0 0 .86-1.5L13.71 3.86a1 1 0 0 0-1.72 0z"
        className="stroke-warning"
      />
      <path d="M12 9v4" className="stroke-warning" />
      <circle cx="12" cy="17" r="1" className="fill-warning" />
    </svg>
  )
}
