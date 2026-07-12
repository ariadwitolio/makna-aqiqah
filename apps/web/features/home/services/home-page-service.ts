import type { HomePageContent } from '@/features/home/types'
import { fetchCMS, resolveCmsMediaUrl } from '@/lib/cms-client'

interface HomePageDoc {
  badgeLabel: string
  heroTitle: string
  heroSubtitle: string
  heroCtaLabel: string
  heroSecondaryCtaLabel: string

  highlightTitle: string
  highlightDescription: string
  highlights?: Array<{ title: string; description: string; icon: string }> | null

  servicesEyebrow: string
  servicesTitle: string
  servicesDescription: string
  servicesSecondaryDescription: string
  services?: Array<{ title: string; description: string }> | null

  packagesEyebrow: string
  packagesTitle: string
  packagesDescription: string
  packages?: Array<{ name: string; price: string; description: string }> | null
  packagesContactText: string
  packagesContactCtaLabel: string
  packagesContactCtaHref: string

  orderFlowEyebrow: string
  orderFlowTitle: string
  orderFlowDescription: string
  orderFlowSteps?: Array<{ icon: string; title: string; description: string }> | null

  infoEyebrow: string
  infoTitle: string
  infoDescription: string

  testimonialsEyebrow: string
  testimonialsTitle: string
  testimonialsDescription: string

  ctaTitle: string
  ctaDescription: string
  ctaButtonLabel: string
  ctaButtonHref: string
}

interface TestimonialDoc {
  id: number | string
  name: string
  quote: string
  photo?: { url?: string | null; alt?: string | null } | number | string | null
}

interface TestimonialsResponse {
  docs: TestimonialDoc[]
}

export async function getHomePageContent(): Promise<HomePageContent> {
  const [doc, testimonialsRes] = await Promise.all([
    fetchCMS<HomePageDoc>('/api/globals/home-page'),
    fetchCMS<TestimonialsResponse>('/api/testimonials?depth=1&sort=-createdAt&limit=50'),
  ])

  return {
    badgeLabel: doc.badgeLabel,
    heroTitle: doc.heroTitle,
    heroSubtitle: doc.heroSubtitle,
    heroCtaLabel: doc.heroCtaLabel,
    heroSecondaryCtaLabel: doc.heroSecondaryCtaLabel,

    highlightTitle: doc.highlightTitle,
    highlightDescription: doc.highlightDescription,
    highlights: doc.highlights ?? [],

    servicesEyebrow: doc.servicesEyebrow,
    servicesTitle: doc.servicesTitle,
    servicesDescription: doc.servicesDescription,
    servicesSecondaryDescription: doc.servicesSecondaryDescription,
    services: doc.services ?? [],

    packagesEyebrow: doc.packagesEyebrow,
    packagesTitle: doc.packagesTitle,
    packagesDescription: doc.packagesDescription,
    packages: doc.packages ?? [],
    packagesContactText: doc.packagesContactText,
    packagesContactCtaLabel: doc.packagesContactCtaLabel,
    packagesContactCtaHref: doc.packagesContactCtaHref,

    orderFlowEyebrow: doc.orderFlowEyebrow,
    orderFlowTitle: doc.orderFlowTitle,
    orderFlowDescription: doc.orderFlowDescription,
    orderFlowSteps: doc.orderFlowSteps ?? [],

    infoEyebrow: doc.infoEyebrow,
    infoTitle: doc.infoTitle,
    infoDescription: doc.infoDescription,

    testimonialsEyebrow: doc.testimonialsEyebrow,
    testimonialsTitle: doc.testimonialsTitle,
    testimonialsDescription: doc.testimonialsDescription,
    testimonials: testimonialsRes.docs.map((testimonial) => {
      const photo = testimonial.photo && typeof testimonial.photo === 'object' ? testimonial.photo : null
      return {
        id: String(testimonial.id),
        name: testimonial.name,
        quote: testimonial.quote,
        photoUrl: resolveCmsMediaUrl(photo?.url),
        photoAlt: photo?.alt ?? testimonial.name,
      }
    }),

    ctaTitle: doc.ctaTitle,
    ctaDescription: doc.ctaDescription,
    ctaButtonLabel: doc.ctaButtonLabel,
    ctaButtonHref: doc.ctaButtonHref,
  }
}
