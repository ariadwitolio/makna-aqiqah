import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'

interface HeroSectionProps {
  badgeLabel: string
  title: string
  subtitle: string
  ctaLabel: string
  ctaHref: string
  secondaryCtaLabel: string
  secondaryCtaHref: string
  imageUrl?: string | null
  imageAlt?: string
}

export function HeroSection({
  badgeLabel,
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  imageUrl,
  imageAlt,
}: HeroSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="rounded-[32px] border border-brand-border bg-gradient-to-br from-white to-brand-background/50 p-8 shadow-soft backdrop-blur-sm lg:p-12"
    >
      <div className="flex flex-col gap-8">
        <motion.div variants={itemVariants} className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-primary/15 px-4 py-1.5 text-sm font-medium text-brand-textPrimary">
          <div className="h-2 w-2 rounded-full bg-brand-primary animate-pulse" />
          {badgeLabel}
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          <motion.h1 variants={itemVariants} className="text-4xl font-bold tracking-tight text-brand-textPrimary sm:text-5xl lg:text-6xl leading-tight">
            {title}
          </motion.h1>

          <div className="flex flex-col gap-6">
            <motion.p variants={itemVariants} className="text-lg leading-relaxed text-brand-textSecondary">
              {subtitle}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <motion.a
                href={ctaHref}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={buttonVariants({ size: 'lg', className: 'w-full sm:w-auto' })}
              >
                {ctaLabel}
              </motion.a>
              <motion.a
                href={secondaryCtaHref}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={buttonVariants({ variant: 'outline', size: 'lg', className: 'w-full sm:w-auto' })}
              >
                {secondaryCtaLabel} <ArrowRight className="ml-2 h-4 w-4" />
              </motion.a>
            </motion.div>
          </div>
        </div>

        {imageUrl ? (
          <motion.div variants={itemVariants}>
            <img
              src={imageUrl}
              alt={imageAlt ?? title}
              className="aspect-[16/9] w-full rounded-[24px] object-cover shadow-md"
            />
          </motion.div>
        ) : null}
      </div>
    </motion.div>
  )
}
