import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { media } from './cms/collections/media.js'
import { testimonials } from './cms/collections/testimonials.js'
import { users } from './cms/collections/users.js'
import { homePage } from './cms/globals/home-page.js'
import { siteSettings } from './cms/globals/site-settings.js'

export default buildConfig({
  admin: {
    user: users.slug,
  },
  routes: {
    admin: '/admin',
  },
  editor: lexicalEditor(),
  collections: [users, media, testimonials],
  globals: [siteSettings, homePage],
  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.DATABASE_URL ||
        'postgres://postgres:postgres@127.0.0.1:5432/makna-aqiqah',
    },
  }),
  secret: process.env.PAYLOAD_SECRET || 'changeme',
  typescript: {
    outputFile: path.resolve('cms/generated-schema.ts'),
  },
})