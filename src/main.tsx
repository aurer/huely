import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as Sentry from '@sentry/react'
import App from './App.tsx'
import '~/css/main.css'

Sentry.init({
	dsn: 'https://534366c7cbb145b6a078617778401236@o252569.ingest.sentry.io/5566300',
	environment: import.meta.env.MODE,
	release: `huely@${APP_VERSION}`,
})

console.log('APP_VERSION:', APP_VERSION)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
