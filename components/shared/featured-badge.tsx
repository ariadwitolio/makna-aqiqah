import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

interface FeaturedBadgeProps {
  label?: string
}

export function FeaturedBadge({ label = 'Most Popular' }: FeaturedBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-2 rounded-full bg-brand-primary/20 px-3 py-1 text-xs font-semibold text-brand-primaryDark"
    >
      <Star className="h-3 w-3 fill-brand-primaryDark" />
      {label}
    </motion.div>
  )
}
