export const siteConfig = {
  name: 'Makna Aqiqah',
  url: 'https://maknaaqiqah.com',
  description:
    'Premium aqiqah catering and family celebration services in Sumedang with warm, trustworthy, and modern experiences.',
  keywords: ['aqiqah sumedang', 'jasa aqiqah sumedang', 'paket aqiqah sumedang', 'aqiqah siap saji', 'aqiqah sesuai syariat'],
  locale: 'id_ID',
  themeColor: '#F7B731',
}

export function buildMetadata({ title, description, path = '/' }: { title: string; description: string; path?: string }) {
  const url = `${siteConfig.url}${path}`

  return {
    title,
    description,
    keywords: siteConfig.keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}
