import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-background px-6">
      <div className="max-w-md rounded-[32px] border border-brand-border bg-white p-10 text-center shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primaryDark">404</p>
        <h1 className="mt-3 text-3xl font-semibold text-brand-textPrimary">Halaman tidak ditemukan</h1>
        <p className="mt-4 text-brand-textSecondary">Halaman yang Anda cari belum tersedia. Kembali ke beranda untuk melihat layanan Makna Aqiqah.</p>
        <Link href="/" className="mt-6 inline-flex rounded-full bg-brand-primary px-6 py-3 font-semibold text-brand-textPrimary">
          Kembali ke Beranda
        </Link>
      </div>
    </main>
  )
}
