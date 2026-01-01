import { useState, useEffect, createContext, useContext, useCallback } from 'react'
import { Check, X, Info, AlertTriangle } from 'lucide-react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    
    // Haptic feedback en móviles
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, duration)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="fixed bottom-24 left-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  )
}

function ToastItem({ toast, onRemove }) {
  const icons = {
    success: <Check className="w-5 h-5" />,
    error: <X className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />
  }

  const colors = {
    success: 'bg-gradient-to-r from-emerald-500 to-green-600',
    error: 'bg-gradient-to-r from-red-500 to-rose-600',
    warning: 'bg-gradient-to-r from-amber-500 to-orange-600',
    info: 'bg-gradient-to-r from-cyan-500 to-blue-600'
  }

  return (
    <div 
      className={`
        ${colors[toast.type]} text-white px-4 py-3 rounded-2xl shadow-xl
        flex items-center gap-3 pointer-events-auto
        animate-slide-up backdrop-blur-sm
        min-h-[56px] active:scale-95 transition-transform
      `}
      onClick={() => onRemove(toast.id)}
      role="alert"
    >
      <div className="flex-shrink-0 bg-white/20 p-1.5 rounded-full">
        {icons[toast.type]}
      </div>
      <p className="text-sm font-semibold flex-1">{toast.message}</p>
    </div>
  )
}

export default ToastProvider
