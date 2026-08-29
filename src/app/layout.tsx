import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="ka">
      <body>{children}</body>
    </html>
  )
}
