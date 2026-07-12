import { Facebook, Instagram, MapPin, MessageCircle, Clock } from 'lucide-react'
import type { SiteSettings } from '@/features/site-settings/types'

interface SiteFooterProps {
  footer: SiteSettings['footer']
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.6 5.82c-.98-.86-1.6-2.07-1.6-3.42h-3.15v13.7c0 1.6-1.3 2.9-2.9 2.9a2.9 2.9 0 0 1 0-5.8c.27 0 .53.04.78.1V9.24a6.1 6.1 0 0 0-.78-.05 6.05 6.05 0 1 0 6.05 6.05V9.4a7.5 7.5 0 0 0 4.4 1.4V7.65a4.4 4.4 0 0 1-2.8-1.83Z" />
    </svg>
  )
}

export function SiteFooter({ footer }: SiteFooterProps) {
  const socials = [
    footer.whatsapp ? { href: `https://wa.me/${footer.whatsapp}`, label: 'WhatsApp', Icon: MessageCircle } : null,
    footer.instagram ? { href: footer.instagram, label: 'Instagram', Icon: Instagram } : null,
    footer.facebook ? { href: footer.facebook, label: 'Facebook', Icon: Facebook } : null,
    footer.tiktok ? { href: footer.tiktok, label: 'TikTok', Icon: TikTokIcon } : null,
  ].filter(Boolean) as Array<{ href: string; label: string; Icon: typeof Instagram }>

  return (
    <footer className="rounded-[32px] border border-brand-border bg-white p-8 shadow-soft lg:p-10">
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-lg font-bold text-brand-textPrimary">{footer.companyName}</p>

        {footer.address ? (
          <div className="flex items-start gap-2 text-sm text-brand-textSecondary">
            <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-primary" />
            <span className="whitespace-pre-line">{footer.address}</span>
          </div>
        ) : null}

        {footer.operationalHours ? (
          <div className="flex items-center gap-2 text-sm text-brand-textSecondary">
            <Clock className="h-4 w-4 flex-shrink-0 text-brand-primary" />
            <span>{footer.operationalHours}</span>
          </div>
        ) : null}

        {socials.length > 0 ? (
          <div className="flex items-center gap-4">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-border text-brand-textSecondary transition-colors hover:border-brand-primaryDark hover:text-brand-primaryDark"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        ) : null}
      </div>

      <p className="mt-8 border-t border-brand-border/40 pt-6 text-center text-xs text-brand-textSecondary">
        &copy; {new Date().getFullYear()} {footer.companyName}. All rights reserved.
      </p>
    </footer>
  )
}
