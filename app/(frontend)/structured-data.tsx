import Script from 'next/script'

export function StructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Makna Aqiqah',
    description: 'Premium aqiqah catering and family celebration services in Sumedang.',
    url: 'https://maknaaqiqah.com',
    areaServed: 'Sumedang',
    serviceType: ['Aqiqah', 'Jasa Aqiqah', 'Aqiqah Siap Saji'],
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'IDR',
      price: '2400000',
    },
  }

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      strategy="afterInteractive"
    >
      {JSON.stringify(data)}
    </Script>
  )
}
