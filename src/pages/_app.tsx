import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ReactQueryProvider } from '@/providers/ReactQueryProvider'
import { Background, FooterNav, Header, Sidebar, ToasterResponsive } from '@/components'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProvider>
      <div className="grid grid-rows-[auto_1fr_auto] max-w-full min-h-dvh text-foreground">
        <Header />

        <main className="mx-auto p-4 sm:px-6 md:px-8 w-full lg:w-5xl grow">
          <div className="flex md:flex-row flex-col items-stretch gap-4 p-4 md:p-8 w-full">
            <Background className="hidden md:block md:w-64">
              <Sidebar />
            </Background>

            <Background className="w-full">
              <Component {...pageProps} />
            </Background>
          </div>
        </main>

        <FooterNav />
      </div>

      <ToasterResponsive />
    </ReactQueryProvider>
  )
}
