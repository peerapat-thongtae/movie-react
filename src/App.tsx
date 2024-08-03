import Navbar from '@/components/common/Navbar'
import { useTheme } from '@/contexts/theme-context'
import { useConfigTMDB } from '@/hooks/useConfig'
import { useAccountStateAll } from '@/hooks/useMedia'
import RouteList from '@/routes/route'
import { useAuth0 } from '@auth0/auth0-react'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { dehydrate, Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { useEffect, useState } from 'react'

import { useWindowScroll } from '@mantine/hooks'
import { Affix, Button, Transition } from '@mantine/core'
import { FaArrowUp } from 'react-icons/fa'
import Loading from '@/components/common/Loading'
import AxiosInterceptor from '@/services/client/axios-interceptor'

function AffixComponent() {
  const [scroll, scrollTo] = useWindowScroll()

  return (
    <>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {transitionStyles => (
            <Button
              // leftSection={}
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
              color="yellow"
            >
              <FaArrowUp color="black" />
            </Button>
          )}
        </Transition>
      </Affix>
    </>
  )
}

function App() {
  const { darkTheme } = useTheme()
  const { isLoading, isAuthenticated } = useAuth0()
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // default: true]
        retry: false,
      },
    },
  }))

  const dehydrateState = dehydrate(queryClient, { shouldDehydrateQuery: () => true })
  const { fetch: fetchAccountStates, clear: clearAccountStates } = useAccountStateAll()
  const { getConfiguration } = useConfigTMDB()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      clearAccountStates()
    }
  }, [isAuthenticated, isLoading])

  useEffect(() => {
    if (isAuthenticated) {
      fetchAccountStates()
    }
  }, [isAuthenticated])

  useEffect(() => {
    getConfiguration()
  }, [])
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydrateState}>
          <AxiosInterceptor>
            <AffixComponent />
            {/* <LoadingOverlay visible={isLoading} opacity={1} overlayProps={{ backgroundOpacity: 0.3, className: `${darkTheme ? 'bg-primary-light' : 'bg-primary-dark'}` }} zIndex={1000} loaderProps={{ children: <Loading /> }} /> */}
            <div className={`flex min-h-screen flex-col ${darkTheme ? 'text-primary-light bg-primary-dark' : 'text-primary-dark bg-primary-light'}`}>
              <div className="w-full antialiased">
                <Navbar />
              </div>
              <div className="grow text-white">
                {isLoading
                  ? (
                    <div className="min-h-screen h-screen">
                      <Loading />
                    </div>
                  )
                  : (
                    <div className="">
                      {/* my-32 */}
                      <ToastContainer />
                      <RouteList />
                    </div>
                  )}

              </div>
            </div>
          </AxiosInterceptor>
        </Hydrate>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
