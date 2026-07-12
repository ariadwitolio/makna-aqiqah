import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/shared/section-heading'

interface GalleryBentoGridProps {
  eyebrow: string
  title: string
  description: string
  images: Array<{
    id: string
    imageUrl: string | null
    imageAlt: string
    caption: string | null
    size: 'normal' | 'wide' | 'tall' | 'large'
  }>
}

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

const sizeClassMap: Record<GalleryBentoGridProps['images'][number]['size'], string> = {
  normal: 'sm:col-span-1 sm:row-span-1',
  wide: 'sm:col-span-2 sm:row-span-1',
  tall: 'sm:col-span-1 sm:row-span-2',
  large: 'sm:col-span-2 sm:row-span-2',
}

export function GalleryBentoGrid({ eyebrow, title, description, images }: GalleryBentoGridProps) {
  const validImages = images.filter((image) => image.imageUrl)
  if (validImages.length === 0) return null

  return (
    <section className="rounded-[32px] border border-brand-border bg-white p-8 shadow-soft lg:p-10">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} className="max-w-2xl" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="mt-10 grid auto-rows-[160px] grid-cols-2 gap-4 sm:grid-cols-4 lg:auto-rows-[200px]"
      >
        {validImages.map((image) => (
          <motion.div
            key={image.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className={`group relative overflow-hidden rounded-[20px] border border-brand-border ${sizeClassMap[image.size]}`}
          >
            <img
              src={image.imageUrl ?? ''}
              alt={image.imageAlt}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {image.caption ? (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <p className="text-sm font-medium text-white">{image.caption}</p>
              </div>
            ) : null}
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
