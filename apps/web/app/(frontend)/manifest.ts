import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Makna Aqiqah',
    short_name: 'Makna',
    description: 'Premium aqiqah catering and family celebration services',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFDF8',
    theme_color: '#F7B731',
    icons: [
      {
        src: '/icon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}
