// GitHub OAuth relay for Decap CMS's `github` backend. Implements the two
// endpoints Decap expects at `${base_url}/${auth_endpoint}` and its fixed
// `/callback`: kick off the GitHub OAuth dance, then hand the resulting
// token back to the CMS popup via postMessage.
//
// Deploy with `wrangler deploy`. Requires:
//   - GITHUB_CLIENT_ID    (plain var, set in wrangler.jsonc or `wrangler secret put`)
//   - GITHUB_CLIENT_SECRET (secret, set via `wrangler secret put GITHUB_CLIENT_SECRET`)
// The GitHub OAuth App's callback URL must be set to
// `https://<this-worker's-domain>/callback`.

export interface Env {
  GITHUB_CLIENT_ID: string
  GITHUB_CLIENT_SECRET: string
}

const STATE_COOKIE = 'decap_oauth_state'

function getCookie(request: Request, name: string): string | undefined {
  const header = request.headers.get('Cookie')
  if (!header) return undefined
  for (const part of header.split(';')) {
    const [key, ...rest] = part.trim().split('=')
    if (key === name) return rest.join('=')
  }
  return undefined
}

function renderMessagePage(message: string): Response {
  const body = `<!doctype html>
<html>
  <body>
    <script>
      (function () {
        function receiveMessage(e) {
          window.opener.postMessage(
            ${JSON.stringify(message)},
            e.origin
          )
          window.removeEventListener('message', receiveMessage, false)
        }
        window.addEventListener('message', receiveMessage, false)
        window.opener.postMessage('authorizing:github', '*')
      })()
    </script>
  </body>
</html>`
  return new Response(body, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })
}

async function handleAuth(request: Request, env: Env): Promise<Response> {
  if (!env.GITHUB_CLIENT_ID) {
    return new Response('GITHUB_CLIENT_ID is not configured', { status: 500 })
  }

  const state = crypto.randomUUID()
  const origin = new URL(request.url).origin
  const redirectUri = `${origin}/callback`

  const authorizeUrl = new URL('https://github.com/login/oauth/authorize')
  authorizeUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID)
  authorizeUrl.searchParams.set('redirect_uri', redirectUri)
  authorizeUrl.searchParams.set('scope', 'repo,user')
  authorizeUrl.searchParams.set('state', state)

  return new Response(null, {
    status: 302,
    headers: {
      Location: authorizeUrl.toString(),
      'Set-Cookie': `${STATE_COOKIE}=${state}; HttpOnly; Secure; SameSite=Lax; Max-Age=600; Path=/`,
    },
  })
}

async function handleCallback(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const storedState = getCookie(request, STATE_COOKIE)

  const clearCookieHeader = `${STATE_COOKIE}=; HttpOnly; Secure; SameSite=Lax; Max-Age=0; Path=/`

  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    return new Response('GitHub OAuth is not configured', { status: 500 })
  }

  if (!code || !state || !storedState || state !== storedState) {
    const response = renderMessagePage(
      `authorization:github:error:${JSON.stringify({ message: 'Invalid or missing OAuth state' })}`,
    )
    response.headers.set('Set-Cookie', clearCookieHeader)
    return response
  }

  const redirectUri = `${url.origin}/callback`

  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: redirectUri,
    }),
  })

  const tokenData = (await tokenResponse.json()) as {
    access_token?: string
    error_description?: string
  }

  const response = tokenData.access_token
    ? renderMessagePage(
        `authorization:github:success:${JSON.stringify({ token: tokenData.access_token, provider: 'github' })}`,
      )
    : renderMessagePage(
        `authorization:github:error:${JSON.stringify({ message: tokenData.error_description ?? 'GitHub authorization failed' })}`,
      )

  response.headers.set('Set-Cookie', clearCookieHeader)
  return response
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url)

    if (pathname === '/auth') return handleAuth(request, env)
    if (pathname === '/callback') return handleCallback(request, env)

    return new Response('Not found', { status: 404 })
  },
}
