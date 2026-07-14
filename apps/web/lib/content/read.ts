import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const CONTENT_DIR = path.join(process.cwd(), 'content')

export function readContentFile(...segments: string[]): Record<string, unknown> {
  const filePath = path.join(CONTENT_DIR, ...segments)
  const raw = fs.readFileSync(filePath, 'utf8')
  return matter(raw).data
}

export function readContentDir(dir: string): Array<{ slug: string; data: Record<string, unknown> }> {
  const dirPath = path.join(CONTENT_DIR, dir)
  const filenames = fs.readdirSync(dirPath).filter((name) => name.endsWith('.md'))

  return filenames.map((filename) => {
    const raw = fs.readFileSync(path.join(dirPath, filename), 'utf8')
    const { data } = matter(raw)
    return { slug: filename.replace(/\.md$/, ''), data }
  })
}
