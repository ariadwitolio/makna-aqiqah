import { motion } from 'framer-motion'
import { resolveIcon } from '@/lib/icon-map'

interface HighlightCardGridProps {
  title: string
  description: string
  highlights: Array<{
    title: string
    description: string
    icon: string
  }>
}

export function HighlightCardGrid({ title, description, highlights }: HighlightCardGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="rounded-[32px] border border-brand-border bg-gradient-to-br from-brand-primary/10 to-brand-primary/5 p-8 shadow-soft backdrop-blur-sm lg:p-8"
    >
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-8">
        <h3 className="text-xl font-bold text-brand-textPrimary">{title}</h3>
        <p className="mt-1 text-sm text-brand-textSecondary">{description}</p>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map((item) => {
          const Icon = resolveIcon(item.icon)
          return (
            <motion.div
              key={item.title}
              variants={itemVariants}
              whileHover={{ scale: 1.02, x: 4 }}
              className="group rounded-2xl border border-white/70 bg-white/70 p-5 backdrop-blur transition-all hover:border-brand-primary/30 hover:bg-white/90 hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-primary/15 text-brand-primary transition-colors group-hover:bg-brand-primary/25">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-brand-textPrimary">{item.title}</h4>
                  <p className="mt-1 text-sm text-brand-textSecondary leading-relaxed">{item.description}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}
