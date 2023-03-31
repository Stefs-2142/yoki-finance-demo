import { FirstPage } from "./components/FirstSection/FirstSection";
import { themeMui } from "./theme/index";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Button, TextField, Typography } from "@mui/material"
import { WagmiConfig, createClient, configureChains, mainnet, goerli } from 'wagmi'

import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

export function App() {

  const { chains, provider, webSocketProvider } = configureChains(
    [mainnet, goerli],
    [alchemyProvider({ apiKey: 'yourAlchemyApiKey' }), publicProvider()],
)

const wagmiClient = createClient({
    autoConnect: true,
    connectors: [
        new MetaMaskConnector({ chains }),
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
            <FirstPage />
          </WagmiConfig>
        </ThemeProvider>
      </Box>
    )
}

export default App
