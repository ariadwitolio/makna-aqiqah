import '@payloadcms/next/css'

import config from '@/payload.config'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'

import { importMap } from './admin/importMap'

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
