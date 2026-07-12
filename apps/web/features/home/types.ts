export interface HomePageContent {
  badgeLabel: string
  heroTitle: string
  heroSubtitle: string
  heroCtaLabel: string
  heroSecondaryCtaLabel: string

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
  services: Array<{
    title: string
    description: string
  }>

  packagesEyebrow: string
  packagesTitle: string
  packagesDescription: string
  packages: Array<{
    name: string
    price: string
    description: string
  }>
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

  ctaTitle: string
  ctaDescription: string
  ctaButtonLabel: string
  ctaButtonHref: string
}
