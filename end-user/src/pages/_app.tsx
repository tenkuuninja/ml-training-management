import { DefaultHead } from '@/common/layouts/DefaultHead'
import SEO from '@/configs/next-seo.config'
import { MuiThemeProvider } from '@/lib/muiTheme/MuiThemeProvider'
import store, { persistor } from '@/lib/redux/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AOS from 'aos'
import 'aos/dist/aos.css'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import type { NextPage } from 'next'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode, useEffect } from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { PersistGate } from 'redux-persist/lib/integration/react'
import '../styles/main.scss'

dayjs.extend(relativeTime)

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  useEffect(() => {
    AOS.init({
      once: true,
    })
  }, [])

  return (
    <>
      <QueryClientProvider client={new QueryClient()}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            {() => (
              <>
                <DefaultSeo {...SEO} />
                <DefaultHead />
                <ToastContainer />
                <MuiThemeProvider>
                  {getLayout(<Component {...pageProps} />)}
                </MuiThemeProvider>
              </>
            )}
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </>
  )
}
