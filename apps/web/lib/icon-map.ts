import { icons, Sparkles, type LucideIcon } from 'lucide-react'

function kebabToPascalCase(name: string): string {
  return name
    .split('-')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join('')
}

export function resolveIcon(icon: string): LucideIcon {
  return icons[kebabToPascalCase(icon) as keyof typeof icons] || Sparkles
}
