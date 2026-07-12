import { Calendar, CheckCircle2, FileText, HeartHandshake, Headphones, ShieldCheck, Sparkles, Zap, type LucideIcon } from 'lucide-react'

export const iconMap: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  shield: ShieldCheck,
  heart: HeartHandshake,
  calendar: Calendar,
  check: CheckCircle2,
  file: FileText,
  zap: Zap,
  headset: Headphones,
}

export const iconOptions = Object.keys(iconMap) as Array<keyof typeof iconMap>

export function resolveIcon(icon: string): LucideIcon {
  return iconMap[icon] || Sparkles
}
