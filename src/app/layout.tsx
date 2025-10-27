"use client"
import '@/styles/globals.css'
import type { ReactNode } from 'react'
import { ReactQueryProvider } from '@/providers/ReactQueryProvider'
import { Header } from '@/components/Header'
import { FooterNav } from '@/components/FooterNav'
import { Toaster } from 'sonner'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>

      <body className="min-h-screen max-w-full flex flex-col text-white bg-gray-900
      bg-gradient-to-br from-neutral-900 via-violet-950 to-neutral-800
      ">
        <ReactQueryProvider>
          <Header />

          <main className='grow px-4 py-6 mx-auto lg:max-w-3/4 2xl:max-w-2/4'>
            {children}
          </main>

          <FooterNav />

          <Toaster richColors position="top-right" />
        </ReactQueryProvider>
      </body>
    </html>
  )
}
