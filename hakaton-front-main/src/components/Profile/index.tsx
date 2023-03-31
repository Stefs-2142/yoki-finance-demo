import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsName,
} from 'wagmi'
import { Box, Button, TextField, Typography } from "@mui/material"


export function Profile() {
    const { address, connector, isConnected }: any = useAccount()
    const { data: ensName }: any = useEnsName({ address })
    const { connect, connectors, error, isLoading, pendingConnector }: any = useConnect()
    const { disconnect }: any = useDisconnect()

    if (isConnected) {
        return (
            <Button variant='contained' color='secondary' onClick={disconnect}>Disconnect</Button>
        )
    }

    return (
        <div>
            {connectors.map((connector: any) => (
                <Button
                    variant='contained'
                    color='secondary'
                    disabled={!connector.ready}
                    key={connector.id}
                    onClick={() => connect({ connector })}>
                    Connect to {connector.name}
                    {!connector.ready && ' (unsupported)'}
                    {isLoading && connector.id === pendingConnector?.id &&
                        ' (connecting)'}</Button>))}
            {error && <Typography fontSize={12} sx={{display: 'flex', justifyContent: 'end', mr: 1, mt: 1}} color='red'>{error.message}</Typography>}
        </div>
    )
}
