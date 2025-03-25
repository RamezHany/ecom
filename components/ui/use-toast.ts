// Adapted from https://ui.shadcn.com/docs/components/toast
import * as React from "react"

export type ToastVariant = "default" | "destructive"

export interface Toast {
  id: string
  title?: string
  description?: string
  variant?: ToastVariant
  duration?: number
}

export interface ToastActionElement {
  altText: string
}

const TOAST_TIMEOUT = 5000

export function useToast() {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const dismiss = React.useCallback((id: string) => {
    setToasts((prevToasts: Toast[]) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  const toast = React.useCallback(
    ({ ...props }: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).slice(2)
      const newToast = { id, ...props }
      
      setToasts((prevToasts: Toast[]) => [...prevToasts, newToast])
      
      return {
        id,
        dismiss: () => dismiss(id),
      }
    },
    [dismiss]
  )

  React.useEffect(() => {
    const interval = setInterval(() => {
      setToasts((prevToasts: Toast[]) => {
        const now = new Date().getTime()
        return prevToasts.filter((toast: Toast) => {
          const toastStartTime = parseInt(toast.id.split('-')[0]) || 0
          return now - toastStartTime < (toast.duration || TOAST_TIMEOUT)
        })
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return {
    toast,
    dismiss,
    toasts,
  }
} 