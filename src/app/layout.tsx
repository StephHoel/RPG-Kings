import '@/styles/globals.css'
import { PropsWithChildren } from 'react'
import { ReactQueryProvider } from '@/providers/ReactQueryProvider'
import { Background, FooterNav, Header, Sidebar, ToasterResponsive } from '@/components'

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="pt-br" className="h-dvh bg-background bg-gradient-to-br from-neutral-900 via-violet-950 to-neutral-800 bg-fixed bg-no-repeat">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="icon"
          href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/favicon.svg`}
          type="image/svg+xml"
        />
      </head>

      <body className="flex min-h-dvh max-w-full flex-col text-foreground">
        <ReactQueryProvider>
          <Header />

          <main className='mx-auto flex h-fit w-full grow items-center justify-center p-6 px-4 py-6 md:w-3/4 lg:max-w-3/4 2xl:max-w-2/4'>
            <div className='min-w-[80dvw] min-h-[65dvh] p-8 flex gap-4'>
              <Background className='hidden md:block'>
                <Sidebar />
              </Background>

              <Background className='w-full justify-center'>
                {children}
              </Background>
            </div>
          </main>

          <FooterNav />

          <ToasterResponsive />
        </ReactQueryProvider>
      </body>
    </html>
  )
}
