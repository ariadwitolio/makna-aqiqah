import { cache } from 'react'
import { readContentFile } from '@/lib/content/read'
import type { SiteSettings } from '@/features/site-settings/types'

export const getSiteSettings = cache((): SiteSettings => {
  const doc = readContentFile('settings', 'site.md') as {
    logo?: string | null
    favicon?: string | null
    siteName: string
    tagline: string
    navItems?: Array<{ label: string; href: string }>
    navCtaLabel: string
    navCtaHref: string
    companyName: string
    whatsapp?: string | null
    instagram?: string | null
    facebook?: string | null
    tiktok?: string | null
    address?: string | null
    operationalHours?: string | null
  }

  return {
    logoUrl: doc.logo ?? null,
    logoAlt: doc.siteName,
    faviconUrl: doc.favicon ?? null,
    siteName: doc.siteName,
    tagline: doc.tagline,
    navItems: (doc.navItems ?? []).map((item) => ({ label: item.label, href: item.href })),
    navCtaLabel: doc.navCtaLabel,
    navCtaHref: doc.navCtaHref,
    footer: {
      companyName: doc.companyName,
      whatsapp: doc.whatsapp ?? null,
      instagram: doc.instagram ?? null,
      facebook: doc.facebook ?? null,
      tiktok: doc.tiktok ?? null,
      address: doc.address ?? null,
      operationalHours: doc.operationalHours ?? null,
    },
  }
})
