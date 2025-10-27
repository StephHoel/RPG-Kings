import type { StatusBarProps } from '@/types/statusBar'

export function StatusBar({ attributes }: StatusBarProps) {
  return (
    <div className='bg-gradient-to-br from-violet-950/60 to-neutral-800/40 p-5 rounded-xl border border-violet-900 shadow'>
      <h3 className='font-bold text-violet-300 mb-3'>Status</h3>
      <div className='grid grid-cols-2 gap-3 text-base'>
        {Object.entries(attributes).map(([k, v]) => (
          <div key={k} className='flex justify-between items-center'>
            <span className='capitalize text-neutral-200 font-semibold'>
              {k}
            </span>
            <span className='bg-violet-700/60 px-2 py-1 rounded text-violet-100 font-bold'>
              {v}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
