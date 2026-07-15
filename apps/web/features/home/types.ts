export interface HomePageContent {
  badgeLabel: string
  heroTitle: string
  heroSubtitle: string
  heroCtaLabel: string
  heroCtaHref: string
  heroSecondaryCtaLabel: string
  heroSecondaryCtaHref: string
  heroImageUrl: string | null
  heroImageAlt: string

  highlightTitle: string
  highlightDescription: string
  highlights: Array<{
    title: string
    description: string
    icon: string
  }>

  servicesEyebrow: string
  servicesTitle: string
  servicesDescription: string
  servicesSecondaryDescription: string
  servicesImageUrl: string | null
  services: Array<{
    title: string
    description: string
    icon: string
  }>

  packagesEyebrow: string
  packagesTitle: string
  packagesDescription: string
  packages: Array<{
    name: string
    priceNotes: string | null
    priceCurrency: string
    priceNominal: string
    description: string
  }>
  packagesWhatsappMessage: string
  packagesContactText: string
  packagesContactCtaLabel: string
  packagesContactCtaHref: string

  orderFlowEyebrow: string
  orderFlowTitle: string
  orderFlowDescription: string
  orderFlowSteps: Array<{
    icon: string
    title: string
    description: string
  }>

  infoEyebrow: string
  infoTitle: string
  infoDescription: string

  testimonialsEyebrow: string
  testimonialsTitle: string
  testimonialsDescription: string
  testimonials: Array<{
    id: string
    name: string
    quote: string
    photoUrl: string | null
    photoAlt: string
  }>

  galleryEyebrow: string
  galleryTitle: string
  galleryDescription: string
  galleryImages: Array<{
    id: string
    imageUrl: string | null
    imageAlt: string
    caption: string | null
    size: 'normal' | 'wide' | 'tall' | 'large'
  }>

  ctaTitle: string
  ctaDescription: string
  ctaButtonLabel: string
  ctaButtonHref: string
}
