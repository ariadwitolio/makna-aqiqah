import { cache } from 'react'
import { fetchCMS, resolveCmsMediaUrl } from '@/lib/cms-client'
import type { SiteSettings } from '@/features/site-settings/types'

interface SiteSettingsDoc {
  logo?: { url?: string | null; alt?: string | null } | number | string | null
  siteName: string
  tagline: string
  navItems?: Array<{ label: string; href: string }> | null
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

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const doc = await fetchCMS<SiteSettingsDoc>('/api/globals/site-settings?depth=1')

  const logo = doc.logo && typeof doc.logo === 'object' ? doc.logo : null

  return {
    logoUrl: resolveCmsMediaUrl(logo?.url),
    logoAlt: logo?.alt ?? doc.siteName,
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
