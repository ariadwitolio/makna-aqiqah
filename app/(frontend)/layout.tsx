import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { buildMetadata } from '@/lib/seo'
import { StructuredData } from './structured-data'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Makna Aqiqah | Premium Aqiqah Catering & Family Celebration',
    description:
      'Makna Aqiqah provides premium aqiqah catering and family-friendly celebration services with warm, trustworthy, and modern experiences.',
  }),
  metadataBase: new URL('https://maknaaqiqah.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={inter.variable}>
      <body>
        <StructuredData />
        {children}
      </body>
    </html>
  )
}
