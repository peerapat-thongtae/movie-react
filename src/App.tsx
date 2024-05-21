import Navbar from '@/components/common/Navbar'
import RouteList from '@/routes/route'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
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
