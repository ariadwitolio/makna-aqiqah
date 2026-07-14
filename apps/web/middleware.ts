import { NextRequest, NextResponse } from 'next/server'
import { getCloudflareContext } from '@opennextjs/cloudflare'

// Gates /admin (the Decap CMS shell) behind a shared HTTP Basic Auth prompt,
// on top of — not instead of — Decap's own GitHub OAuth login. Skipped on
// localhost so `npm run dev` + `npm run cms:proxy` keeps working with no
// credentials, matching local_backend's passwordless local flow.
export function middleware(request: NextRequest) {
  if (request.nextUrl.hostname === 'localhost' || request.nextUrl.hostname === '127.0.0.1') {
    return NextResponse.next()
  }

  const user = process.env.CMS_BASIC_AUTH_USER
  const password = process.env.CMS_BASIC_AUTH_PASSWORD

  if (!user || !password) {
    return new NextResponse('CMS_BASIC_AUTH_USER / CMS_BASIC_AUTH_PASSWORD are not configured', { status: 500 })
  }

  const authHeader = request.headers.get('authorization')
  const [scheme, encoded] = authHeader?.split(' ') ?? []

  if (scheme === 'Basic' && encoded) {
    const [reqUser, reqPassword] = atob(encoded).split(':')
    if (reqUser === user && reqPassword === password) {
      // /admin isn't a Next.js route (it's a static public/admin/* bundle),
      // so NextResponse.next() has no page to hand off to and loops on
      // trailing-slash redirects. Serve the static asset directly instead —
      // requesting the exact file, since re-entering ASSETS.fetch() with a
      // directory-style path (/admin or /admin/) triggers Cloudflare's own
      // index-resolution redirect and loops back into this same request.
      const assetUrl = new URL(request.url)
      if (assetUrl.pathname === '/admin' || assetUrl.pathname === '/admin/') {
        assetUrl.pathname = '/admin/index.html'
      }
      return getCloudflareContext().env.ASSETS.fetch(new Request(assetUrl, request))
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Admin", charset="UTF-8"' },
  })
}

export const config = {
  matcher: ['/admin/:path*'],
}
