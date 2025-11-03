import { createContext, type ReactNode, useContext, useState } from 'react'
import type { Toast } from '@/types/toast'
import type { ToastContextType } from '@/types/toastContextType'
import type { ToastType } from '@/types/toastType'

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  function showToast(message: string, type: ToastType = 'info') {
    const id = Math.random().toString(36).slice(2)
    setToasts((ts) => [...ts, { id, message, type }])
    setTimeout(() => removeToast(id), 4000)
  }

  function removeToast(id: string) {
    setToasts((ts) => ts.filter((t) => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)

  if (!ctx) throw new Error('useToast must be used within ToastProvider')

  return ctx
}
