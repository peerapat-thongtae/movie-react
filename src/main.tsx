import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@/assets/css/main.css'
import '@/assets/css/loading.css'
import { ThemeProvider } from '@/contexts/theme-context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  // </React.StrictMode>,
)
