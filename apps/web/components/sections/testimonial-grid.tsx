import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { SectionHeading } from '@/components/shared/section-heading'

interface TestimonialGridProps {
  eyebrow: string
  title: string
  description: string
  testimonials: Array<{
    id: string
    name: string
    quote: string
    photoUrl: string | null
    photoAlt: string
  }>
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

export function TestimonialGrid({ eyebrow, title, description, testimonials }: TestimonialGridProps) {
  if (testimonials.length === 0) return null

  return (
    <section className="rounded-[32px] border border-brand-border bg-white p-8 shadow-soft lg:p-10">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} className="max-w-2xl" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2"
      >
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.id}
            variants={cardVariants}
            whileHover={{ scale: 1.02, y: -4 }}
            className="w-[85%] flex-none snap-start rounded-[28px] border border-brand-border bg-gradient-to-br from-white to-brand-background p-6 shadow-soft transition-all hover:shadow-md sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
          >
            <Quote className="h-6 w-6 text-brand-primary/60" />
            <p className="mt-4 text-sm leading-relaxed text-brand-textSecondary">{testimonial.quote}</p>
            <div className="mt-6 flex items-center gap-3">
              {testimonial.photoUrl ? (
                <img src={testimonial.photoUrl} alt={testimonial.photoAlt} className="h-10 w-10 rounded-full object-cover" />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary/20 text-sm font-bold text-brand-primaryDark">
                  {testimonial.name.charAt(0)}
                </div>
              )}
              <p className="font-semibold text-brand-textPrimary">{testimonial.name}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
