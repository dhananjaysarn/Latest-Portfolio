import type { ReactNode } from 'react'

interface AsyncStateProps {
  loading: boolean
  error?: string
  empty?: boolean
  children: ReactNode
}

export function AsyncState({ loading, error, empty = false, children }: AsyncStateProps) {
  if (loading) return <p role="status">Loading…</p>
  if (error) return <p role="alert">{error}</p>
  if (empty) return <p>No items to show yet.</p>
  return children
}
