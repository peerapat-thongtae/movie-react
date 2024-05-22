import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@/assets/css/main.css'
import '@/assets/css/loading.css'
import '@mantine/core/styles.css'
import 'react-loading-skeleton/dist/skeleton.css'
import { ThemeProvider } from '@/contexts/theme-context.tsx'
import { MantineProvider } from '@mantine/core'
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.createRoot(document.getElementById('root')!).render(
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
  </Auth0Provider>,
)
