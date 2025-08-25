import type { ChoicesProps } from '@/types/choicesProps'

export function Choices({ choices, onChoose }: ChoicesProps) {
  return (
    <div className='grid gap-4'>
      {choices.map((c, i) => (
        <button
          type='button'
          key={c.text}
          onClick={() => onChoose(i)}
          className='w-full text-left p-4 rounded-xl bg-violet-700/80 hover:bg-violet-600 text-white font-semibold shadow transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-violet-400'
        >
          {c.text}
        </button>
      ))}
    </div>
  )
}
