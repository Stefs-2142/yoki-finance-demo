import { FirstPage } from "./components/FirstSection/FirstSection";
import { themeMui } from "./theme/index";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material"
import { WagmiConfig, createClient, configureChains, mainnet, goerli } from 'wagmi'

import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { SafeConnector } from '@wagmi/connectors/safe'

export function App() {
  const { chains, provider, webSocketProvider } = configureChains(
    [goerli],
    [alchemyProvider({ apiKey: 'bd8CWkLuZfA87L5x37zCtqgeRErCfgvh' }), publicProvider()],
  )
  const connector = new SafeConnector({
    chains: [mainnet],
    options: {
      allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/],
      debug: true,
    },
  })

  const wagmiClient = createClient({
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({ chains }),
      connector
    ],
    provider,
    webSocketProvider,
  })

  return (
    <Box sx={{
      backgroundColor: 'rgb(24, 25, 28)',
      height: '100vh',
      borderRadius: 3,
    }}>
      <CssBaseline />
      <ThemeProvider theme={themeMui}>
        <WagmiConfig client={wagmiClient}>
            <FirstPage connector={connector} />
        </WagmiConfig>
      </ThemeProvider>
    </Box>
  )
}

export default App
