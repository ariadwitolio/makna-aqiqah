'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export function FloatingWhatsAppButton() {
  const whatsappNumber = '62812345678' // Replace with actual number
  const message = 'Halo Makna Aqiqah! Saya tertarik dengan layanan aqiqah Anda. Bisa konsultasi gratis?'
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-all hover:shadow-xl sm:h-12 sm:w-12"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6 text-white sm:h-5 sm:w-5" />
    </motion.a>
  )
}
