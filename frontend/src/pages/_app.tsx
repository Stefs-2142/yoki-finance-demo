import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import SafeProvider from '@safe-global/safe-apps-react-sdk';

export default function App({ Component, pageProps }: AppProps) {
  
  return <SafeProvider>
          <Component {...pageProps} />
         </SafeProvider>
}
