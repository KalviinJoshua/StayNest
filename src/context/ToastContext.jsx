import { createContext, useContext, useState, useCallback } from 'react'
import { Check, AlertCircle, X } from 'lucide-react'

const ToastContext = createContext(null)

let nextId = 1

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => {
    setToasts((t) => t.filter((toast) => toast.id !== id))
  }, [])

  const notify = useCallback(
    (message, type = 'success') => {
      const id = nextId++
      setToasts((t) => [...t, { id, message, type }])
      setTimeout(() => dismiss(id), 3500)
    },
    [dismiss],
  )

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}

      {/* Toast stack, bottom-center */}
      <div className="fixed bottom-6 inset-x-0 z-[60] flex flex-col items-center gap-2 px-4 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className="pointer-events-auto flex items-center gap-2.5 max-w-sm w-full sm:w-auto bg-pine text-ivory text-sm font-medium rounded-xl px-4 py-3 shadow-card"
          >
            <span className={t.type === 'error' ? 'text-clay-100' : 'text-gold-100'}>
              {t.type === 'error' ? <AlertCircle size={17} /> : <Check size={17} />}
            </span>
            <span className="flex-1">{t.message}</span>
            <button
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss"
              className="text-ivory/60 hover:text-ivory transition-colors"
            >
              <X size={15} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}
