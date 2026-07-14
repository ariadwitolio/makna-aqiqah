export interface SiteSettings {
  logoUrl: string | null
  logoAlt: string
  faviconUrl: string | null
  siteName: string
  tagline: string
  navItems: Array<{ label: string; href: string }>
  navCtaLabel: string
  navCtaHref: string
  footer: {
    companyName: string
    whatsapp: string | null
    instagram: string | null
    facebook: string | null
    tiktok: string | null
    address: string | null
    operationalHours: string | null
  }
}
