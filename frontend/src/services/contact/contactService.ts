import { apiClient } from '../api/client'
import type { ContactSubmission } from '../../types/contact'

export async function submitContactMessage(payload: ContactSubmission): Promise<void> {
  await apiClient.post('contact/', payload)
}
