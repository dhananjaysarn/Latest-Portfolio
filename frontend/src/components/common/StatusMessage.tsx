import { AlertCircle, LoaderCircle, RotateCcw } from 'lucide-react'

interface StatusMessageProps {
  loading?: boolean
  error?: string | null
  empty?: string
  onRetry?: () => void
}

export function StatusMessage({ loading = false, error, empty, onRetry }: StatusMessageProps) {
  if (loading) {
    return <p className="status-message" role="status"><LoaderCircle className="spin" size={17} /> Connecting to the API…</p>
  }
  if (error) {
    return (
      <div className="status-message status-message--error" role="alert">
        <AlertCircle size={18} />
        <span>{error}</span>
        {onRetry && <button className="icon-button" type="button" aria-label="Retry request" onClick={onRetry}><RotateCcw size={15} /></button>}
      </div>
    )
  }
  if (empty) return <p className="status-message">{empty}</p>
  return null
}
