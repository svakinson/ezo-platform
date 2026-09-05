import type { Metadata } from 'next'
import { Noto_Sans_Georgian } from 'next/font/google'
import './globals.css'

const notoSansGeorgian = Noto_Sans_Georgian({
  subsets: ['georgian', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-georgian',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'EZO - კორპუსების მართვა',
  description: 'კორპუსების მართვის პლატფორმა',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ka" className={notoSansGeorgian.variable}>
      <body className="antialiased">{children}</body>
    </html>
  )
}