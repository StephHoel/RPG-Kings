import '@/styles/globals.css'
import { PropsWithChildren } from 'react'
import { ReactQueryProvider } from '@/providers/ReactQueryProvider'
import { Background, FooterNav, Header, Sidebar, ToasterResponsive } from '@/components'

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="pt-br" className="bg-background bg-gradient-to-br from-background via-primary to-highlight bg-no-repeat bg-fixed h-dvh">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="icon"
          href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/favicon.svg`}
          type="image/svg+xml"
        />
      </head>

      <body className="grid grid-rows-[auto_1fr_auto] max-w-full min-h-dvh text-foreground">
        <ReactQueryProvider>
          <Header />

          <main className="mx-auto p-4 sm:px-6 md:px-8 w-full lg:w-5xl grow">
            <div className="flex md:flex-row flex-col items-stretch gap-4 p-4 md:p-8 w-full">
              {/* Sidebar hidden on mobile, shown on md+ */}
              <Background className="hidden md:block md:w-64">
                <Sidebar />
              </Background>

              <Background className="w-full">{children}</Background>
            </div>
          </main>

          <FooterNav />

          <ToasterResponsive />
        </ReactQueryProvider>
      </body>
    </html>
  )
}
