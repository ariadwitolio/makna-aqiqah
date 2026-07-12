import { cache } from 'react'
import { getPayloadClient } from '@/lib/cms-client'
import type { SiteSettings } from '@/features/site-settings/types'

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const payload = await getPayloadClient()
  const doc = await payload.findGlobal({ slug: 'site-settings', depth: 1 })

  const logo = doc.logo && typeof doc.logo === 'object' ? doc.logo : null

  return {
    logoUrl: logo?.url ?? null,
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
