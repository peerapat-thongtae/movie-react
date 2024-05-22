import Loading from '@/components/common/Loading'
import Navbar from '@/components/common/Navbar'
import { useTheme } from '@/contexts/theme-context'
import RouteList from '@/routes/route'
import { useAuth0 } from '@auth0/auth0-react'
import { LoadingOverlay } from '@mantine/core'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function App() {
  const { darkTheme } = useTheme()
  const { isLoading } = useAuth0()
  return (
    <BrowserRouter>
      <LoadingOverlay visible={isLoading} opacity={1} overlayProps={{ backgroundOpacity: 0.3, className: `${darkTheme ? 'bg-primary-light' : 'bg-primary-dark'}` }} zIndex={1000} loaderProps={{ children: <Loading /> }} />
      <div className={`flex min-h-screen flex-col ${darkTheme ? 'text-primary-light bg-primary-dark' : 'text-primary-dark bg-primary-light'}`}>
        <div className="w-full antialiased">
          <Navbar />
        </div>
        <div className="grow text-white">
          <div className="my-32">
            <ToastContainer />
            <RouteList />
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
