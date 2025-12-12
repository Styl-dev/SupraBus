import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { resendAdapter } from '@payloadcms/email-resend'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { stripePlugin } from '@payloadcms/plugin-stripe'
import { buildConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Buses } from './collections/Buses'
import { Drivers } from './collections/Drivers'
import { Media } from './collections/Media'
import { Routes } from './collections/Routes'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Buses, Drivers, Routes],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  email: resendAdapter({
    defaultFromAddress: process.env.RESEND_FROM_EMAIL || 'noreply@example.com',
    defaultFromName: process.env.RESEND_FROM_NAME || 'My App',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  plugins: [
    stripePlugin({
      stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
      stripeWebhooksEndpointSecret: process.env.STRIPE_WEBHOOK_SECRET,
      isTestKey: process.env.STRIPE_SECRET_KEY?.includes('sk_test'),
    }),
  ],
  sharp,
})
