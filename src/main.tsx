import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@/assets/css/main.css'
import '@/assets/css/loading.css'
import '@mantine/core/styles.css'
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-modal-video/scss/modal-video.scss'
import 'react-toastify/dist/ReactToastify.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { ThemeProvider } from '@/contexts/theme-context.tsx'
import { MantineProvider } from '@mantine/core'
import { Auth0Provider } from '@auth0/auth0-react'
import { Provider } from 'react-redux'
import { store, persistor } from '@/stores/store'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: 'http://localhost:4000',
        }}
      >
        <MantineProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </MantineProvider>
      </Auth0Provider>
    </PersistGate>
  </Provider>,
)
