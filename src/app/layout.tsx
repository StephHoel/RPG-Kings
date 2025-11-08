import '@/styles/globals.css'
import { ReactNode } from 'react'
import { ReactQueryProvider } from '@/providers/ReactQueryProvider'
import { Toaster } from 'sonner'
import { FooterNav, Header } from '@/components'

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

          <main className='grow px-4 py-6 mx-auto w-full lg:max-w-3/4 2xl:max-w-2/4 flex items-center justify-center p-6 h-full md:w-3/4 mx-auto'>
            <div className='h-full w-full max-w-3xl rounded-2xl border border-primary-bg bg-muted-fg/70 p-8 shadow-2xl backdrop-blur-xl'>
              {children}
            </div>
          </main>

          <FooterNav />

          <Toaster richColors position="top-right" />
        </ReactQueryProvider>
      </body>
    </html>
  )
}
