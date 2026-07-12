import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { media } from './collections/media'
import { testimonials } from './collections/testimonials'
import { users } from './collections/users'
import { homePage } from './globals/home-page'
import { siteSettings } from './globals/site-settings'

export default buildConfig({
  admin: {
    user: 'users',
  },
  editor: lexicalEditor(),
  collections: [users, media, testimonials],
  globals: [siteSettings, homePage],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@127.0.0.1:5432/makna-aqiqah',
    },
  }),
  secret: process.env.PAYLOAD_SECRET || 'changeme',
  typescript: {
    outputFile: path.resolve('cms/generated-schema.ts'),
  },
})
