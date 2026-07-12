import { getHomePageContent } from '@/features/home/services/home-page-service'
import { getSiteSettings } from '@/features/site-settings/services/site-settings-service'
import { HomePageClient } from '@/components/sections/home-page-client'

export async function HomePage() {
  const [content, siteSettings] = await Promise.all([getHomePageContent(), getSiteSettings()])

  return <HomePageClient content={content} siteSettings={siteSettings} />
}
