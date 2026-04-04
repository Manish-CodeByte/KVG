import { useToast } from '../context/ToastContext'

export default function Toast() {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-6 py-3 rounded-lg shadow-lg text-white animate-in fade-in slide-in-from-top-2 animation-duration-500 flex items-center gap-2 ${
            toast.type === 'success'
              ? 'bg-gradient-to-r from-green-500 to-emerald-500'
              : toast.type === 'error'
              ? 'bg-gradient-to-r from-red-500 to-rose-500'
              : 'bg-gradient-to-r from-blue-500 to-cyan-500'
          }`}
        >
          {toast.type === 'success' && '✅'}
          {toast.type === 'error' && '❌'}
          {toast.type === 'info' && 'ℹ️'}
          <span className="font-medium">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-2 hover:opacity-75 transition"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
