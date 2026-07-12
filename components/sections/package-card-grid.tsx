import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/shared/section-heading'
import { FeaturedBadge } from '@/components/shared/featured-badge'

interface PackageCardGridProps {
  eyebrow: string
  title: string
  description: string
  packages: Array<{
    name: string
    price: string
    description: string
  }>
  contactText: string
  contactCtaLabel: string
  contactCtaHref: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export function PackageCardGrid({ eyebrow, title, description, packages, contactText, contactCtaLabel, contactCtaHref }: PackageCardGridProps) {
  const featuredIndex = 1 // Middle package (Golden Family)

  return (
    <section className="rounded-[32px] border border-brand-border bg-white p-8 shadow-soft lg:p-10">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} className="max-w-2xl" />

      <motion.div variants={containerVariants} initial="hidden" animate="show" className="mt-10 grid gap-6 lg:grid-cols-3">
        {packages.map((pkg, index) => {
          const isFeatured = index === featuredIndex
          return (
            <motion.div key={pkg.name} variants={cardVariants} whileHover={isFeatured ? { scale: 1.02, y: -8 } : { scale: 1.01 }}>
              <div
                className={`group relative rounded-[28px] border transition-all duration-300 ${
                  isFeatured
                    ? 'border-brand-primary bg-gradient-to-br from-brand-primary/15 to-brand-primary/5 shadow-lg'
                    : 'border-brand-border bg-gradient-to-br from-white to-brand-background hover:shadow-md'
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-3 left-6">
                    <FeaturedBadge label="Pilihan Terpopuler" />
                  </div>
                )}

                <div className={`p-7 ${isFeatured ? 'pt-10' : ''}`}>
                  <p className="text-sm font-bold uppercase tracking-wide text-brand-primaryDark">{pkg.name}</p>

                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-brand-textPrimary">{pkg.price.split(' ')[1]}</span>
                    <span className="text-sm text-brand-textSecondary">{pkg.price.split(' ')[0]}</span>
                  </div>

                  <p className="mt-4 text-base text-brand-textSecondary leading-relaxed">{pkg.description}</p>

                  {isFeatured && (
                    <div className="mt-6 space-y-3 border-t border-brand-border/40 pt-6">
                      {['Menu premium pilihan', 'Presentasi elegan', 'Dokumentasi profesional'].map((feature) => (
                        <div key={feature} className="flex items-center gap-3 text-sm text-brand-textSecondary">
                          <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-brand-success" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  )}

                  <motion.div
                    whileHover={{ x: 4 }}
                    className="mt-8"
                  >
                    <Button variant={isFeatured ? 'default' : 'outline'} className="w-full">
                      Pilih Paket
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-10 rounded-2xl border border-brand-border/40 bg-brand-background p-6 text-center"
      >
        <p className="text-brand-textSecondary">
          {contactText}{' '}
          <a href={contactCtaHref} className="font-semibold text-brand-textPrimary underline-offset-4 hover:underline">
            {contactCtaLabel}
          </a>
        </p>
      </motion.div>
    </section>
  )
}
