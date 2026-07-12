import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typedRoutes: true,
  outputFileTracingRoot: '/Users/aria/Developer/Web/makna-aqiqah',
}

export default withPayload(nextConfig)
