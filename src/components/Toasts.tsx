import { useToast } from './ToastContext'

export function Toasts() {
  const { toasts, removeToast } = useToast()
  
  return (
    <div className='fixed top-4 right-4 z-50 flex flex-col gap-3'>
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`px-4 py-3 rounded-xl shadow-lg text-white font-semibold transition-all duration-300 animate-fade-in ${
            t.type === 'success'
              ? 'bg-green-600'
              : t.type === 'error'
                ? 'bg-red-600'
                : 'bg-violet-700'
          }`}
          onClick={() => removeToast(t.id)}
        >
          {t.message}
        </div>
      ))}
    </div>
  )
}
