import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/shared/section-heading'
import { resolveIcon } from '@/lib/icon-map'

interface OrderFlowSectionProps {
  eyebrow: string
  title: string
  description: string
  steps: Array<{
    icon: string
    title: string
    description: string
  }>
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export function OrderFlowSection({ eyebrow, title, description, steps }: OrderFlowSectionProps) {
  return (
    <section className="rounded-[32px] border border-brand-border bg-white p-8 shadow-soft lg:p-10">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} className="max-w-2xl" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {steps.map((step, index) => {
          const Icon = resolveIcon(step.icon)
          return (
            <motion.div
              key={step.title}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -4 }}
              className="group relative rounded-[28px] border border-brand-border bg-gradient-to-br from-white to-brand-background p-6 shadow-soft transition-all hover:shadow-md"
            >
              <p className="text-xs font-bold text-brand-primaryDark">{String(index + 1).padStart(2, '0')}</p>
              <div className="mt-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-primary/15 text-brand-primary transition-colors group-hover:bg-brand-primary/25">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold text-brand-textPrimary">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-textSecondary">{step.description}</p>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
