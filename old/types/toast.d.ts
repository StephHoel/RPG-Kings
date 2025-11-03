import type { ToastType } from './toastType'

export interface Toast {
  id: string
  message: string
  type: ToastType
}
