// Renders cms/config.template.yml -> public/admin/config.yml, substituting
// __DECAP_AUTH_BASE_URL__ with NEXT_PUBLIC_DECAP_AUTH_BASE_URL. Runs before
// `dev` and `build` (see package.json) so the CMS always ships a config that
// matches the current environment without hand-editing YAML.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const rootDir = fileURLToPath(new URL('..', import.meta.url))
const templatePath = path.join(rootDir, 'cms/config.template.yml')
const outputPath = path.join(rootDir, 'public/admin/config.yml')

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return
  for (const line of readFileSync(filePath, 'utf8').split('\n')) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/)
    if (!match) continue
    const [, key, rawValue = ''] = match
    if (process.env[key] !== undefined) continue
    process.env[key] = rawValue.replace(/^(['"])(.*)\1$/, '$2')
  }
}

// Next.js env precedence: .env.local always wins, then the mode-specific
// file, then .env. We're not Next.js here, so replicate it manually.
const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'
;[`.env.local`, `.env.${mode}`, `.env`].forEach((name) => loadEnvFile(path.join(rootDir, name)))

const baseUrl = process.env.NEXT_PUBLIC_DECAP_AUTH_BASE_URL
if (!baseUrl) {
  console.warn(
    '[generate-decap-config] NEXT_PUBLIC_DECAP_AUTH_BASE_URL is not set — ' +
      'writing a placeholder. Fine for local dev (local_backend bypasses it); ' +
      'set it before deploying so GitHub OAuth login works in production.',
  )
}

const { default: dynamicIconImports } = await import('lucide-react/dynamicIconImports.js')
const iconOptionsYaml = `[${Object.keys(dynamicIconImports).sort().join(', ')}]`

const template = readFileSync(templatePath, 'utf8')
const rendered = template
  .replace(/__DECAP_AUTH_BASE_URL__/g, baseUrl || 'https://decap-oauth.example.workers.dev')
  .replace(/__LUCIDE_ICON_OPTIONS__/g, iconOptionsYaml)

writeFileSync(outputPath, rendered)
console.log(`[generate-decap-config] wrote ${path.relative(rootDir, outputPath)}`)
