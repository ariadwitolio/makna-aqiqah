import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/shared/section-heading'

interface InfoSectionProps {
  eyebrow: string
  title: string
  description: string
}

export function InfoSection({ eyebrow, title, description }: InfoSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: '-100px' }}
      className="rounded-[32px] border border-brand-border bg-gradient-to-br from-brand-primary/10 to-brand-primary/5 p-8 text-center shadow-soft lg:p-16"
    >
      <SectionHeading eyebrow={eyebrow} title={title} description={description} className="mx-auto max-w-2xl text-center" />
    </motion.section>
  )
}
