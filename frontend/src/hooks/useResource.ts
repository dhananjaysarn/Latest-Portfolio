import { useCallback, useEffect, useState } from 'react'
import { getApiErrorMessage } from '../services/api/errors'

export interface ResourceState<T> {
  data: T | null
  loading: boolean
  error: string | null
  reload: () => void
}

export function useResource<T>(loader: () => Promise<T>, dependencies: readonly unknown[] = []): ResourceState<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [requestVersion, setRequestVersion] = useState(0)

  const reload = useCallback(() => setRequestVersion((version) => version + 1), [])

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)
    loader()
      .then((result) => {
        if (active) setData(result)
      })
      .catch((reason: unknown) => {
        if (active) setError(getApiErrorMessage(reason))
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
    // Dependencies are supplied by each call site; requestVersion supports a manual retry.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, requestVersion])

  return { data, loading, error, reload }
}
