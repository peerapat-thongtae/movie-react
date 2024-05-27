// import Loading from '@/components/common/Loading'
import Navbar from '@/components/common/Navbar'
import { useTheme } from '@/contexts/theme-context'
import { useConfigTMDB } from '@/hooks/useConfig'
import { useAccountStateAll } from '@/hooks/useMedia'
import RouteList from '@/routes/route'
import { useAuth0 } from '@auth0/auth0-react'
// import { LoadingOverlay } from '@mantine/core'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { dehydrate, Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { useEffect, useState } from 'react'
import { setToken } from '@/stores/slice'
import { useDispatch } from 'react-redux'

import { useWindowScroll } from '@mantine/hooks'
import { Affix, Button, Transition } from '@mantine/core'
import { FaArrowUp } from 'react-icons/fa'

function AffixComponent() {
  const [scroll, scrollTo] = useWindowScroll()

  return (
    <>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {transitionStyles => (
            <Button
              leftSection={<FaArrowUp color="black" />}
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
              color="yellow"
            >

            </Button>
          )}
        </Transition>
      </Affix>
    </>
  )
}

function App() {
  const { darkTheme } = useTheme()
  const dispatch = useDispatch()
  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0()
  const [queryClient] = useState(() => new QueryClient())

  const dehydrateState = dehydrate(queryClient, { shouldDehydrateQuery: () => true })
  useAccountStateAll()
  const { getConfiguration } = useConfigTMDB()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      getAccessTokenSilently().then((token) => {
        dispatch(setToken(token))
      }).catch(() => dispatch(setToken('')))
    }
  }, [isAuthenticated, isLoading])

  useEffect(() => {
    getConfiguration()
  }, [])
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydrateState}>
          <AffixComponent />
          {/* <LoadingOverlay visible={isLoading} opacity={1} overlayProps={{ backgroundOpacity: 0.3, className: `${darkTheme ? 'bg-primary-light' : 'bg-primary-dark'}` }} zIndex={1000} loaderProps={{ children: <Loading /> }} /> */}
          <div className={`flex min-h-screen flex-col ${darkTheme ? 'text-primary-light bg-primary-dark' : 'text-primary-dark bg-primary-light'}`}>
            <div className="w-full antialiased">
              <Navbar />
            </div>
            <div className="grow text-white">
              <div className="">
                {/* my-32 */}
                <ToastContainer />
                <RouteList />
              </div>
            </div>
          </div>
        </Hydrate>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
