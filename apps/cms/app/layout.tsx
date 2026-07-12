import '@payloadcms/next/css'

import config from '../payload.config.js'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'

import { importMap } from './admin/importMap.js'

const serverFunction = async function (args: any) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

export default async function PayloadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return RootLayout({
    config,
    importMap,
    serverFunction,
    children,
  })
}
