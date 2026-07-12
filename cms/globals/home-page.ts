import type { GlobalConfig } from 'payload'
import { iconOptions } from '@/lib/icon-map'

const iconSelectOptions = iconOptions.map((value) => ({
  label: value.charAt(0).toUpperCase() + value.slice(1),
  value,
}))

export const homePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page',
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'badgeLabel',
              type: 'text',
              required: true,
              label: 'Badge Label',
              defaultValue: 'Pengalaman aqiqah yang bermakna sejak 2019',
            },
            {
              name: 'heroTitle',
              type: 'text',
              required: true,
              label: 'Hero Title',
              defaultValue: 'Aqiqah yang hangat, bermakna, dan penuh berkah untuk keluarga Anda.',
            },
            {
              name: 'heroSubtitle',
              type: 'textarea',
              required: true,
              label: 'Hero Subtitle',
              defaultValue:
                'Makna Aqiqah menghadirkan menu premium, presentasi elegan, dan layanan terpercaya untuk merayakan momen istimewa dengan sempurna.',
            },
            {
              name: 'heroCtaLabel',
              type: 'text',
              required: true,
              label: 'Hero CTA Label',
              defaultValue: 'Konsultasi Gratis',
            },
            {
              name: 'heroSecondaryCtaLabel',
              type: 'text',
              required: true,
              label: 'Hero Secondary CTA Label',
              defaultValue: 'Lihat Paket',
            },
          ],
        },
        {
          label: 'Highlights',
          fields: [
            {
              name: 'highlightTitle',
              type: 'text',
              required: true,
              label: 'Highlight Section Title',
              defaultValue: 'Mengapa Memilih Kami',
            },
            {
              name: 'highlightDescription',
              type: 'text',
              required: true,
              label: 'Highlight Section Description',
              defaultValue: 'Komitmen kami untuk keluarga Anda',
            },
            {
              name: 'highlights',
              type: 'array',
              label: 'Highlights',
              defaultValue: [
                {
                  title: 'Menu Premium Pilihan',
                  description: 'Hidangan berkualitas tinggi, segar, dan disajikan dengan presentasi yang elegan untuk setiap acara spesial.',
                  icon: 'sparkles',
                },
                {
                  title: 'Layanan Terpercaya',
                  description: 'Koordinasi profesional dan kehangatan dari konsultasi hingga pengiriman tepat waktu sesuai kebutuhan Anda.',
                  icon: 'shield',
                },
                {
                  title: 'Keluarga adalah Prioritas',
                  description: 'Pengalaman yang dipikirkan matang untuk merayakan kegembiraan, kualitas, dan kemudahan bersama orang tersayang.',
                  icon: 'heart',
                },
              ],
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
                { name: 'icon', type: 'select', required: true, options: iconSelectOptions, defaultValue: 'sparkles' },
              ],
            },
          ],
        },
        {
          label: 'Services',
          fields: [
            {
              name: 'servicesEyebrow',
              type: 'text',
              required: true,
              label: 'Services Eyebrow',
              defaultValue: 'Layanan Kami',
            },
            {
              name: 'servicesTitle',
              type: 'text',
              required: true,
              label: 'Services Title',
              defaultValue: 'Pengalaman lengkap dari perencanaan hingga penyajian.',
            },
            {
              name: 'servicesDescription',
              type: 'textarea',
              required: true,
              label: 'Services Description',
              defaultValue: 'Setiap detail dirancang dengan hati untuk memberikan kemudahan, kehangatan, dan kualitas premium.',
            },
            {
              name: 'servicesSecondaryDescription',
              type: 'textarea',
              required: true,
              label: 'Services Secondary Description',
              defaultValue: 'Setiap detail dirancang dengan cermat untuk memberikan pengalaman terbaik bagi keluarga Anda.',
            },
            {
              name: 'services',
              type: 'array',
              label: 'Services',
              defaultValue: [
                { title: 'Perencanaan Menu Custom', description: 'Kurasi menu yang disesuaikan dengan tema, budget, dan preferensi keluarga Anda.' },
                { title: 'Presentasi Elegan', description: 'Penampilan profesional dengan sentuhan personal yang membuat setiap hidangan istimewa.' },
                { title: 'Pengiriman Tepat Waktu', description: 'Jaminan pengiriman sesuai jadwal dengan layanan profesional dan ramah.' },
                { title: 'Dukungan Keluarga', description: 'Bimbingan hangat di setiap langkah dari awal hingga acara berlangsung sempurna.' },
              ],
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
              ],
            },
          ],
        },
        {
          label: 'Packages',
          fields: [
            {
              name: 'packagesEyebrow',
              type: 'text',
              required: true,
              label: 'Packages Eyebrow',
              defaultValue: 'Paket Aqiqah',
            },
            {
              name: 'packagesTitle',
              type: 'text',
              required: true,
              label: 'Packages Title',
              defaultValue: 'Pilihan paket fleksibel untuk setiap momen keluarga.',
            },
            {
              name: 'packagesDescription',
              type: 'textarea',
              required: true,
              label: 'Packages Description',
              defaultValue: 'Pilih paket yang sesuai dengan gaya perayaan dan kenyamanan Anda, atau customisasi sesuai kebutuhan.',
            },
            {
              name: 'packages',
              type: 'array',
              label: 'Packages',
              defaultValue: [
                { name: 'Silver Celebration', price: 'Rp 2.4 Juta', description: 'Paket sempurna untuk gathering intim dengan kenyamanan premium dan menu pilihan.' },
                { name: 'Golden Family', price: 'Rp 3.6 Juta', description: 'Paket seimbang dengan presentasi elevasi, layanan lebih personal, dan menu eksklusif.' },
                { name: 'Diamond Gathering', price: 'Rp 5.2 Juta', description: 'Pengalaman mewah dengan add-on premium, dokumentasi profesional, dan layanan concierge.' },
              ],
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'price', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
              ],
            },
            {
              name: 'packagesContactText',
              type: 'text',
              required: true,
              label: 'Contact Prompt Text',
              defaultValue: 'Tidak menemukan paket yang cocok?',
            },
            {
              name: 'packagesContactCtaLabel',
              type: 'text',
              required: true,
              label: 'Contact CTA Label',
              defaultValue: 'Hubungi kami untuk konsultasi gratis',
            },
            {
              name: 'packagesContactCtaHref',
              type: 'text',
              required: true,
              label: 'Contact CTA Link',
              defaultValue: '#contact',
            },
          ],
        },
        {
          label: 'Order Flow',
          fields: [
            {
              name: 'orderFlowEyebrow',
              type: 'text',
              required: true,
              label: 'Order Flow Eyebrow',
              defaultValue: 'Cara Kerja',
            },
            {
              name: 'orderFlowTitle',
              type: 'text',
              required: true,
              label: 'Order Flow Title',
              defaultValue: 'Proses mudah dalam 4 langkah',
            },
            {
              name: 'orderFlowDescription',
              type: 'textarea',
              required: true,
              label: 'Order Flow Description',
              defaultValue: 'Dari konsultasi hingga hari perayaan, kami dampingi setiap langkahnya.',
            },
            {
              name: 'orderFlowSteps',
              type: 'array',
              label: 'Steps',
              defaultValue: [
                { icon: 'calendar', title: 'Konsultasi', description: 'Diskusikan kebutuhan dan preferensi Anda dengan tim kami.' },
                { icon: 'sparkles', title: 'Pilih Paket', description: 'Tentukan paket dan menu yang sesuai dengan acara Anda.' },
                { icon: 'shield', title: 'Konfirmasi & Persiapan', description: 'Kami siapkan semua detail dengan teliti sebelum hari-H.' },
                { icon: 'heart', title: 'Perayaan', description: 'Nikmati momen istimewa bersama keluarga tanpa khawatir.' },
              ],
              fields: [
                { name: 'icon', type: 'select', required: true, options: iconSelectOptions, defaultValue: 'sparkles' },
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
              ],
            },
          ],
        },
        {
          label: 'Info / About',
          fields: [
            {
              name: 'infoEyebrow',
              type: 'text',
              required: true,
              label: 'Info Eyebrow',
              defaultValue: 'Tentang Kami',
            },
            {
              name: 'infoTitle',
              type: 'text',
              required: true,
              label: 'Info Title',
              defaultValue: 'Melayani dengan hati sejak 2019',
            },
            {
              name: 'infoDescription',
              type: 'textarea',
              required: true,
              label: 'Info Description',
              defaultValue:
                'Makna Aqiqah hadir untuk membantu keluarga merayakan momen aqiqah dengan penuh kehangatan, kemudahan, dan kualitas premium di setiap detail.',
            },
          ],
        },
        {
          label: 'Testimonials',
          fields: [
            {
              name: 'testimonialsEyebrow',
              type: 'text',
              required: true,
              label: 'Testimonials Eyebrow',
              defaultValue: 'Testimoni',
            },
            {
              name: 'testimonialsTitle',
              type: 'text',
              required: true,
              label: 'Testimonials Title',
              defaultValue: 'Apa kata keluarga yang telah merayakan bersama kami',
            },
            {
              name: 'testimonialsDescription',
              type: 'textarea',
              required: true,
              label: 'Testimonials Description',
              defaultValue: 'Kepercayaan dari ratusan keluarga adalah kebahagiaan terbesar kami.',
              admin: { description: 'Individual testimonials are managed in the Testimonials collection.' },
            },
          ],
        },
        {
          label: 'CTA Banner',
          fields: [
            {
              name: 'ctaTitle',
              type: 'text',
              required: true,
              label: 'CTA Title',
              defaultValue: 'Siap rayakan momen istimewa?',
            },
            {
              name: 'ctaDescription',
              type: 'textarea',
              required: true,
              label: 'CTA Description',
              defaultValue: 'Hubungi kami hari ini untuk konsultasi gratis dan dapatkan penawaran eksklusif.',
            },
            {
              name: 'ctaButtonLabel',
              type: 'text',
              required: true,
              label: 'CTA Button Label',
              defaultValue: 'Konsultasi Gratis Sekarang',
            },
            {
              name: 'ctaButtonHref',
              type: 'text',
              required: true,
              label: 'CTA Button Link',
              defaultValue: '#contact',
            },
          ],
        },
      ],
    },
  ],
}
