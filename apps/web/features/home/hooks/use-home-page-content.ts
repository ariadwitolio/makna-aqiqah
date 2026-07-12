import { useMemo } from 'react'
import type { HomePageContent } from '@/features/home/types'

export function useHomePageContent(content: HomePageContent) {
  return useMemo(() => content, [content])
}
