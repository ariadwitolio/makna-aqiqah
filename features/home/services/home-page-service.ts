import type { HomePageContent } from '@/features/home/types'
import { getPayloadClient } from '@/lib/cms-client'

export async function getHomePageContent(): Promise<HomePageContent> {
  const payload = await getPayloadClient()

  const [doc, testimonialDocs] = await Promise.all([
    payload.findGlobal({ slug: 'home-page' }),
    payload.find({ collection: 'testimonials', depth: 1, sort: '-createdAt' }),
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
    testimonials: testimonialDocs.docs.map((testimonial) => {
      const photo = testimonial.photo && typeof testimonial.photo === 'object' ? testimonial.photo : null
      return {
        id: String(testimonial.id),
        name: testimonial.name,
        quote: testimonial.quote,
        photoUrl: photo?.url ?? null,
        photoAlt: photo?.alt ?? testimonial.name,
      }
    }),

    ctaTitle: doc.ctaTitle,
    ctaDescription: doc.ctaDescription,
    ctaButtonLabel: doc.ctaButtonLabel,
    ctaButtonHref: doc.ctaButtonHref,
  }
}
