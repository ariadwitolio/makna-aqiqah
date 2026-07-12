import express from 'express'
import dotenv from 'dotenv'
import { getPayload } from 'payload'
import config from './payload.config'

dotenv.config()

const start = async () => {
  const app = express()

  const payload = await getPayload({
    config,
  })

  app.get('/', (_, res) => {
    res.json({
      message: 'Makna Aqiqah CMS is running',
    })
  })

  app.listen(3000, () => {
    console.log('🚀 CMS running on http://localhost:3000')
  })
}

start()