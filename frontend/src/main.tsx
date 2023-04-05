import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import SafeProvider from '@safe-global/safe-apps-react-sdk';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SafeProvider>
      <App />
    </SafeProvider>
  </React.StrictMode>,
)
