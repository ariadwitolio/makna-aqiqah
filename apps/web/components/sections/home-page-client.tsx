'use client'

import { motion } from 'framer-motion'
import { buttonVariants } from '@/components/ui/button'
import { HeroSection } from '@/components/sections/hero-section'
import { HighlightCardGrid } from '@/components/sections/highlight-card-grid'
import { ContentGridSection } from '@/components/sections/content-grid-section'
import { PackageCardGrid } from '@/components/sections/package-card-grid'
import { OrderFlowSection } from '@/components/sections/order-flow-section'
import { InfoSection } from '@/components/sections/info-section'
import { TestimonialGrid } from '@/components/sections/testimonial-grid'
import { GalleryBentoGrid } from '@/components/sections/gallery-bento-grid'
import { FloatingWhatsAppButton } from '@/components/shared/floating-whatsapp-button'
import { SiteFooter } from '@/components/shared/site-footer'
import type { HomePageContent } from '@/features/home/types'
import type { SiteSettings } from '@/features/site-settings/types'

interface HomePageClientProps {
  content: HomePageContent
  siteSettings: SiteSettings
}

export function HomePageClient({ content, siteSettings }: HomePageClientProps) {
  return (
    <>
      <main className="min-h-screen bg-brand-background">
        <section className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-10 lg:gap-14 lg:px-8 lg:py-16">
          {/* Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between rounded-full border border-brand-border bg-white/80 px-4 py-3 shadow-soft backdrop-blur-md"
          >
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3 cursor-pointer">
              {siteSettings.logoUrl ? (
                <img src={siteSettings.logoUrl} alt={siteSettings.logoAlt} className="h-10 w-10 rounded-full object-cover shadow-md" />
              ) : (
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-primary to-brand-primaryDark text-lg font-bold text-white shadow-md"
                >
                  {siteSettings.siteName.charAt(0)}
                </motion.div>
              )}
              <div>
                <p className="text-sm font-bold text-brand-textPrimary">{siteSettings.siteName}</p>
                <p className="text-xs text-brand-textSecondary">{siteSettings.tagline}</p>
              </div>
            </motion.div>

            <div className="hidden items-center gap-8 text-xs font-bold uppercase tracking-[0.1em] text-brand-primaryDark md:flex">
              {siteSettings.navItems.map((item) => (
                <motion.a key={item.href} href={item.href} whileHover={{ y: -2 }} className="transition-colors hover:text-brand-textPrimary">
                  {item.label}
                </motion.a>
              ))}
            </div>

            <motion.a
              href={siteSettings.navCtaHref}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={buttonVariants({ size: 'sm' })}
            >
              {siteSettings.navCtaLabel}
            </motion.a>
          </motion.nav>

          {/* Hero + Highlights Grid */}
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
            <HeroSection
              badgeLabel={content.badgeLabel}
              title={content.heroTitle}
              subtitle={content.heroSubtitle}
              ctaLabel={content.heroCtaLabel}
              secondaryCtaLabel={content.heroSecondaryCtaLabel}
              imageUrl={content.heroImageUrl}
              imageAlt={content.heroImageAlt}
            />
            <HighlightCardGrid title={content.highlightTitle} description={content.highlightDescription} highlights={content.highlights} />
          </div>

          {/* Services Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
            id="services"
          >
            <ContentGridSection
              eyebrow={content.servicesEyebrow}
              title={content.servicesTitle}
              description={content.servicesDescription}
              secondaryDescription={content.servicesSecondaryDescription}
              items={content.services}
            />
          </motion.div>

          {/* Packages Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
            id="packages"
          >
            <PackageCardGrid
              eyebrow={content.packagesEyebrow}
              title={content.packagesTitle}
              description={content.packagesDescription}
              packages={content.packages}
              contactText={content.packagesContactText}
              contactCtaLabel={content.packagesContactCtaLabel}
              contactCtaHref={content.packagesContactCtaHref}
            />
          </motion.div>

          {/* Order Flow Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
            id="how-it-works"
          >
            <OrderFlowSection
              eyebrow={content.orderFlowEyebrow}
              title={content.orderFlowTitle}
              description={content.orderFlowDescription}
              steps={content.orderFlowSteps}
            />
          </motion.div>

          {/* Info / About Section */}
          <div id="about">
            <InfoSection eyebrow={content.infoEyebrow} title={content.infoTitle} description={content.infoDescription} />
          </div>

          {/* Testimonials Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
            id="testimonials"
          >
            <TestimonialGrid
              eyebrow={content.testimonialsEyebrow}
              title={content.testimonialsTitle}
              description={content.testimonialsDescription}
              testimonials={content.testimonials}
            />
          </motion.div>

          {/* Gallery Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
            id="gallery"
          >
            <GalleryBentoGrid
              eyebrow={content.galleryEyebrow}
              title={content.galleryTitle}
              description={content.galleryDescription}
              images={content.galleryImages}
            />
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-[32px] border border-brand-border bg-gradient-to-br from-brand-primary/10 to-brand-primary/5 p-8 text-center shadow-soft lg:p-16"
          >
            <h3 className="text-3xl font-bold text-brand-textPrimary sm:text-4xl">{content.ctaTitle}</h3>
            <p className="mt-4 text-lg text-brand-textSecondary">{content.ctaDescription}</p>
            <motion.a
              href={content.ctaButtonHref}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={buttonVariants({ size: 'lg', className: 'mt-8 inline-flex' })}
            >
              {content.ctaButtonLabel}
            </motion.a>
          </motion.div>

          <SiteFooter footer={siteSettings.footer} />
        </section>
      </main>

      <FloatingWhatsAppButton />
    </>
  )
}
