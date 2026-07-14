import type { HomePageContent } from '@/features/home/types'
import { readContentFile, readContentDir } from '@/lib/content/read'

export async function getHomePageContent(): Promise<HomePageContent> {
  const doc = readContentFile('homepage', 'index.md') as {
    badgeLabel: string
    heroTitle: string
    heroSubtitle: string
    heroCtaLabel: string
    heroCtaHref: string
    heroSecondaryCtaLabel: string
    heroSecondaryCtaHref: string
    heroImage?: string | null
    highlightTitle: string
    highlightDescription: string
    highlights?: Array<{ title: string; description: string; icon: string }>
    servicesEyebrow: string
    servicesTitle: string
    servicesDescription: string
    servicesSecondaryDescription: string
    servicesImage?: string | null
    services?: Array<{ title: string; description: string; icon: string }>
    packagesEyebrow: string
    packagesTitle: string
    packagesDescription: string
    packages?: Array<{ name: string; priceNotes?: string | null; priceCurrency: string; priceNominal: string; description: string }>
    packagesContactText: string
    packagesContactCtaLabel: string
    packagesContactCtaHref: string
    orderFlowEyebrow: string
    orderFlowTitle: string
    orderFlowDescription: string
    orderFlowSteps?: Array<{ icon: string; title: string; description: string }>
    infoEyebrow: string
    infoTitle: string
    infoDescription: string
    testimonialsEyebrow: string
    testimonialsTitle: string
    testimonialsDescription: string
    galleryEyebrow: string
    galleryTitle: string
    galleryDescription: string
    galleryImages?: Array<{ image?: string | null; caption?: string | null; size: 'normal' | 'wide' | 'tall' | 'large' }>
    ctaTitle: string
    ctaDescription: string
    ctaButtonLabel: string
    ctaButtonHref: string
  }

  const testimonials = readContentDir('testimonials') as Array<{
    slug: string
    data: { name: string; quote: string; photo?: string | null }
  }>

  return {
    badgeLabel: doc.badgeLabel,
    heroTitle: doc.heroTitle,
    heroSubtitle: doc.heroSubtitle,
    heroCtaLabel: doc.heroCtaLabel,
    heroCtaHref: doc.heroCtaHref,
    heroSecondaryCtaLabel: doc.heroSecondaryCtaLabel,
    heroSecondaryCtaHref: doc.heroSecondaryCtaHref,
    heroImageUrl: doc.heroImage ?? null,
    heroImageAlt: doc.heroTitle,

    highlightTitle: doc.highlightTitle,
    highlightDescription: doc.highlightDescription,
    highlights: doc.highlights ?? [],

    servicesEyebrow: doc.servicesEyebrow,
    servicesTitle: doc.servicesTitle,
    servicesDescription: doc.servicesDescription,
    servicesSecondaryDescription: doc.servicesSecondaryDescription,
    servicesImageUrl: doc.servicesImage ?? null,
    services: doc.services ?? [],

    packagesEyebrow: doc.packagesEyebrow,
    packagesTitle: doc.packagesTitle,
    packagesDescription: doc.packagesDescription,
    packages: (doc.packages ?? []).map((pkg) => ({
      name: pkg.name,
      priceNotes: pkg.priceNotes ?? null,
      priceCurrency: pkg.priceCurrency,
      priceNominal: pkg.priceNominal,
      description: pkg.description,
    })),
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
    testimonials: testimonials.map(({ slug, data }) => ({
      id: slug,
      name: data.name,
      quote: data.quote,
      photoUrl: data.photo ?? null,
      photoAlt: data.name,
    })),

    galleryEyebrow: doc.galleryEyebrow,
    galleryTitle: doc.galleryTitle,
    galleryDescription: doc.galleryDescription,
    galleryImages: (doc.galleryImages ?? []).map((item, index) => ({
      id: String(index),
      imageUrl: item.image ?? null,
      imageAlt: doc.galleryTitle,
      caption: item.caption ?? null,
      size: item.size,
    })),

    ctaTitle: doc.ctaTitle,
    ctaDescription: doc.ctaDescription,
    ctaButtonLabel: doc.ctaButtonLabel,
    ctaButtonHref: doc.ctaButtonHref,
  }
}
