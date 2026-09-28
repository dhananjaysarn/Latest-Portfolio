import axios from 'axios'

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) return 'The API could not be reached. Check your connection and try again.'
    return `The API request failed with status ${error.response.status}.`
  }
  if (error instanceof Error) return error.message
  return 'An unexpected error occurred while loading data.'
}

export function getFieldErrors(error: unknown): Record<string, string> {
  if (!axios.isAxiosError(error) || typeof error.response?.data !== 'object' || error.response.data === null) return {}
  return Object.fromEntries(
    Object.entries(error.response.data).flatMap(([field, message]) => {
      if (Array.isArray(message)) return [[field, message.map(String).join(' ')]]
      if (typeof message === 'string') return [[field, message]]
      return []
    }),
  )
}
