import type { GlobalConfig } from 'payload'

export const siteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Navigation',
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo',
            },
            {
              name: 'siteName',
              type: 'text',
              required: true,
              label: 'Site Name',
              defaultValue: 'Makna Aqiqah',
            },
            {
              name: 'tagline',
              type: 'text',
              required: true,
              label: 'Tagline',
              defaultValue: 'Rayakan dengan Bermakna',
            },
            {
              name: 'navItems',
              type: 'array',
              label: 'Nav Links',
              defaultValue: [
                { label: 'Layanan', href: '#services' },
                { label: 'Paket', href: '#packages' },
                { label: 'Tentang', href: '#about' },
              ],
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'href', type: 'text', required: true },
              ],
            },
            {
              name: 'navCtaLabel',
              type: 'text',
              required: true,
              label: 'Nav Button Label',
              defaultValue: 'Hubungi',
            },
            {
              name: 'navCtaHref',
              type: 'text',
              required: true,
              label: 'Nav Button Link',
              defaultValue: '#contact',
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            {
              name: 'companyName',
              type: 'text',
              required: true,
              label: 'Company Name',
              defaultValue: 'Makna Aqiqah',
            },
            {
              name: 'whatsapp',
              type: 'text',
              label: 'WhatsApp Number',
              admin: { description: 'International format without symbols, e.g. 6281234567890' },
            },
            {
              name: 'instagram',
              type: 'text',
              label: 'Instagram URL',
            },
            {
              name: 'facebook',
              type: 'text',
              label: 'Facebook URL',
            },
            {
              name: 'tiktok',
              type: 'text',
              label: 'TikTok URL',
            },
            {
              name: 'address',
              type: 'textarea',
              label: 'Address',
            },
            {
              name: 'operationalHours',
              type: 'text',
              label: 'Operational Hours',
              defaultValue: 'Setiap hari, 08.00 - 20.00',
            },
          ],
        },
      ],
    },
  ],
}
