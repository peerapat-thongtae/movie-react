import Navbar from '@/components/common/Navbar'
import { useTheme } from '@/contexts/theme-context'
import RouteList from '@/routes/route'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function App() {
  const { darkTheme } = useTheme()
  return (
    <BrowserRouter>
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
