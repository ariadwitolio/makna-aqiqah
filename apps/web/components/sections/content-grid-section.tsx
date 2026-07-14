import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/shared/section-heading'
import { resolveIcon } from '@/lib/icon-map'

interface ContentGridSectionProps {
  eyebrow: string
  title: string
  description: string
  secondaryDescription: string
  secondaryImageUrl?: string | null
  items: Array<{
    title: string
    description: string
    icon: string
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

export function ContentGridSection({
  eyebrow,
  title,
  description,
  secondaryDescription,
  secondaryImageUrl,
  items,
}: ContentGridSectionProps) {
  return (
    <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-[32px] border border-brand-border bg-white p-8 shadow-soft"
      >
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 pt-6 border-t border-brand-border/30"
        >
          <p className="text-sm text-brand-textSecondary leading-relaxed">{secondaryDescription}</p>
          {secondaryImageUrl ? (
            <img
              src={secondaryImageUrl}
              alt={title}
              className="mt-6 aspect-video w-full rounded-2xl object-cover shadow-sm"
            />
          ) : null}
        </motion.div>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid gap-4 md:grid-cols-2">
        {items.map((item) => {
          const Icon = resolveIcon(item.icon)
          return (
            <motion.div
              key={item.title}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -4 }}
              className="group rounded-[28px] border border-brand-border bg-gradient-to-br from-white to-brand-background p-6 shadow-soft transition-all hover:shadow-md"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-primary/20 to-brand-primary/10 text-brand-primary transition-all group-hover:from-brand-primary/30 group-hover:to-brand-primary/15"
              >
                <Icon className="h-5 w-5" />
              </motion.div>
              <h3 className="font-semibold text-brand-textPrimary">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-textSecondary">{item.description}</p>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
