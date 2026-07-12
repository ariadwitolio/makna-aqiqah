const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL

if (!CMS_URL) {
  throw new Error('NEXT_PUBLIC_CMS_URL is not set')
}

export async function fetchCMS<T>(endpoint: string, revalidate = 60): Promise<T> {
  const response = await fetch(`${CMS_URL}${endpoint}`, {
    next: { revalidate },
  })

  if (!response.ok) {
    throw new Error(`CMS request failed: ${response.status} ${endpoint}`)
  }

  return response.json() as Promise<T>
}

export function resolveCmsMediaUrl(url: string | null | undefined): string | null {
  if (!url) return null
  return url.startsWith('http') ? url : `${CMS_URL}${url}`
}
