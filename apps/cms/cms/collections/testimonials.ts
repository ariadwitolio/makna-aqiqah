import type { CollectionConfig } from 'payload'

export const testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonial',
    plural: 'Testimonials',
  },
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  timestamps: true,
  fields: [
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Photo',
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      label: 'Testimonial',
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Name',
    },
  ],
}
