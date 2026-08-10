import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Dashboard Pusat Sumber & Fotografi', description: 'Statistik interaktif Pusat Sumber dan Fotografi' }

export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="ms"><body>{children}</body></html> }