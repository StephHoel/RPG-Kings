"use client"
import '@/styles/globals.css'
import type { ReactNode } from 'react'
import { ReactQueryProvider } from '@/providers/ReactQueryProvider'
import { Header } from '@/components/Header'
import { FooterNav } from '@/components/FooterNav'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <ReactQueryProvider>
          <div className="min-h-dvh flex flex-col">
            <Header />
            <main className="flex-1 p-3">{children}</main>
            <FooterNav />
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
