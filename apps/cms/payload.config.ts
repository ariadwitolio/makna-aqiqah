import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { media } from './cms/collections/media.js'
import { testimonials } from './cms/collections/testimonials.js'
import { users } from './cms/collections/users.js'
import { homePage } from './cms/globals/home-page.js'
import { siteSettings } from './cms/globals/site-settings.js'

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error(
    'DATABASE_URL is not set. Configure it in the deployment environment (e.g. Railway service variables) before starting the app.',
  )
}

const payloadSecret = process.env.PAYLOAD_SECRET

if (!payloadSecret) {
  throw new Error(
    'PAYLOAD_SECRET is not set. Configure it in the deployment environment (e.g. Railway service variables) before starting the app.',
  )
}

// Railway's public Postgres connection string requires SSL; the private
// (internal) connection string does not. Only enable SSL when the
// connection string itself asks for it, so internal networking is untouched.
const requiresSsl = /sslmode=require|ssl=true/i.test(databaseUrl)

export default buildConfig({
  routes: {
    admin: '/admin',
  },
  editor: lexicalEditor(),
  collections: [users, media, testimonials],
  globals: [siteSettings, homePage],
  db: postgresAdapter({
    pool: {
      connectionString: databaseUrl,
      ...(requiresSsl ? { ssl: { rejectUnauthorized: false } } : {}),
    },
  }),
  secret: payloadSecret,
  typescript: {
    outputFile: path.resolve('cms/generated-schema.ts'),
  },
})