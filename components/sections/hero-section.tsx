import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeroSectionProps {
  badgeLabel: string
  title: string
  subtitle: string
  ctaLabel: string
  secondaryCtaLabel: string
}

export function HeroSection({ badgeLabel, title, subtitle, ctaLabel, secondaryCtaLabel }: HeroSectionProps) {
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
      <motion.div variants={itemVariants} className="mb-8 inline-flex items-center gap-2 rounded-full bg-brand-primary/15 px-4 py-1.5 text-sm font-medium text-brand-textPrimary">
        <div className="h-2 w-2 rounded-full bg-brand-primary animate-pulse" />
        {badgeLabel}
      </motion.div>

      <motion.h1 variants={itemVariants} className="max-w-3xl text-4xl font-bold tracking-tight text-brand-textPrimary sm:text-5xl lg:text-6xl leading-tight">
        {title}
      </motion.h1>

      <motion.p variants={itemVariants} className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-textSecondary">
        {subtitle}
      </motion.p>

      <motion.div variants={itemVariants} className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
        <Button size="lg" className="w-full sm:w-auto">
          {ctaLabel}
        </Button>
        <Button variant="outline" size="lg" className="w-full sm:w-auto">
          {secondaryCtaLabel} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </motion.div>
  )
}
