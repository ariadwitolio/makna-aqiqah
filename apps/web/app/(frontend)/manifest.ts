import type { MetadataRoute } from 'next'
import { getSiteSettings } from '@/features/site-settings/services/site-settings-service'

export default function manifest(): MetadataRoute.Manifest {
  const siteSettings = getSiteSettings()
  const iconSrc = siteSettings.faviconUrl ?? siteSettings.logoUrl

  return {
    name: 'Makna Aqiqah',
    short_name: 'Makna',
    description: 'Premium aqiqah catering and family celebration services',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFDF8',
    theme_color: '#F7B731',
    icons: iconSrc ? [{ src: iconSrc, sizes: 'any', type: 'image/png' }] : [],
  }
}
