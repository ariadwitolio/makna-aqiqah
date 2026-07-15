import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/shared/section-heading'

interface PackageCardGridProps {
  eyebrow: string
  title: string
  description: string
  packages: Array<{
    name: string
    priceNotes: string | null
    priceCurrency: string
    priceNominal: string
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
  return (
    <section className="rounded-[32px] border border-brand-border bg-white p-8 shadow-soft lg:p-10">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} className="max-w-2xl" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="mt-10 grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]"
      >
        {packages.map((pkg) => (
          <motion.div key={pkg.name} variants={cardVariants} whileHover={{ scale: 1.01 }}>
            <div className="group rounded-[28px] border border-brand-border bg-gradient-to-br from-white to-brand-background transition-all duration-300 hover:shadow-md">
              <div className="p-7">
                <p className="text-sm font-bold uppercase tracking-wide text-brand-primaryDark">{pkg.name}</p>

                <div className="mt-6">
                  {pkg.priceNotes ? <p className="text-sm text-brand-textSecondary">{pkg.priceNotes}</p> : null}
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm text-brand-textSecondary">{pkg.priceCurrency}</span>
                    <span className="text-4xl font-bold text-brand-textPrimary">{pkg.priceNominal}</span>
                  </div>
                </div>

                <p className="mt-4 text-base text-brand-textSecondary leading-relaxed">{pkg.description}</p>

                <motion.div whileHover={{ x: 4 }} className="mt-8">
                  <Button variant="outline" className="w-full">
                    Pilih Paket
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
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
