import '@/styles/globals.css'
import { PropsWithChildren } from 'react'
import { ReactQueryProvider } from '@/providers/ReactQueryProvider'
import { Toaster } from 'sonner'
import { FooterNav, Header } from '@/components'

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="pt-br" className="h-dvh bg-panel-bg bg-gradient-to-br from-neutral-900 via-violet-950 to-neutral-800 bg-fixed bg-no-repeat">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>

      <body className="flex min-h-dvh max-w-full flex-col text-primary-fg">
        <ReactQueryProvider>
          <Header />

          <main className='mx-auto flex h-fit w-full grow items-center justify-center p-6 px-4 py-6 md:w-3/4 lg:max-w-3/4 2xl:max-w-2/4'>
            <div className='min-w-[80dvw] min-h-[65dvh] rounded-2xl border border-primary-bg bg-muted-fg/70 p-8 shadow-2xl backdrop-blur-xl'>
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
