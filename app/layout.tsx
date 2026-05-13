import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'AI Truth Layer',
  description: 'Brutally honest AI feedback for ideas and startups.'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
