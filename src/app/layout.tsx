import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FoodShare - Connecting Food with Those in Need',
  description: 'A platform connecting individuals who need food with nearby NGOs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
