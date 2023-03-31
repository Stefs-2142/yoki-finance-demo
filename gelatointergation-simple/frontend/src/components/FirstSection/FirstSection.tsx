import { Box, Button, TextField, Typography } from "@mui/material"
import Switch from '@mui/material/Switch';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Profile } from "../Profile";
import { getTaskSome } from "../logic/tasks";
import { useSafeAppsSDK } from '@safe-global/safe-apps-react-sdk';
import Modal from '@mui/material/Modal';
import { useAccount } from 'wagmi'
 
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

export const FirstPage = ({ connector }: any) => {
    const [dailyPeriod, setDailyPeriod] = useState(false)
    const [weeklyPeriod, setWeeklyPeriod] = useState(false)
    const [monthlyPeriod, setMonthlyPeriod] = useState(false)
    const [switchChecked, setSwitchChecked] = useState(true)
    const { sdk, connected, safe } = useSafeAppsSDK();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { address, isConnecting, isDisconnected } = useAccount()

    const smallTextColor = 'grey'
    const darkBackColor = '#25262a'
    const smallTextSize = 14

    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSwitchChecked(event.target.checked);
    };

    const changePeriod = (period: any) => {
        if (period === 'daily') {
            setDailyPeriod((prev) => !prev)
            setWeeklyPeriod(false)
            setMonthlyPeriod(false)
        }
        if (period === 'weekly') {
            setWeeklyPeriod((prev) => !prev)
            setDailyPeriod(false)
            setMonthlyPeriod(false)
        }
        if (period === 'monthly') {
            setMonthlyPeriod((prev) => !prev)
            setWeeklyPeriod(false)
            setDailyPeriod(false)
        }
    }


    const showMe = async () => {
        setOpen(true)
        getTaskSome({ sdk, connected, safe })
    }

    return (
        <Box sx={{ p: 2 }}>
            {/* Start------------ Header ------------ */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <div>
                    <Typography color='white' variant="h4">Set up your subscription</Typography>
                    <Typography color={smallTextColor} sx={{
                        mt: 2,
                        mb: 1
                    }} fontSize={smallTextSize}>I'd like to invest in</Typography>
                </div>
                <div><Profile /></div>
            </Box>
            {/* End------------ Header ------------ */}


            {/* Start-------- First Select -------- */}
            <Box sx={{
                minWidth: 120,
            }}>
                <FormControl fullWidth>
                    <Select
                        fullWidth
                        defaultValue={1}
                        sx={{
                            background: darkBackColor,
                            color: smallTextColor
                        }}>
                        <MenuItem
                            sx={{
                                background: darkBackColor,
                                color: smallTextColor
                            }}
                            value={1}>ETH</MenuItem>
                        <MenuItem value={2}>BNB</MenuItem>
                        <MenuItem value={3}>SOL</MenuItem>
                        <MenuItem value={4}>ZETA</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            {/* End-------- First Select -------- */}

            <Typography
                sx={{ mt: 2, mb: 1 }} fontSize={smallTextSize} color={smallTextColor}>Invest from</Typography>
            <Box sx={{
                display: 'flex',
                width: '100%',
                mb: 2
            }}>
                <TextField
                    type={'number'}
                    InputLabelProps={{ style: { color: smallTextColor } }}
                    sx={{
                        input: { color: 'white' },
                        background: darkBackColor,
                        color: 'white',
                        mr: 2
                    }}
                    label='0.00'
                    variant="outlined" />

                <FormControl fullWidth>
                    <Select
                        fullWidth
                        sx={{
                            background: darkBackColor,
                            color: smallTextColor
                        }}
                        defaultValue={10}>
                        <MenuItem value={10}>USDT</MenuItem>
                        <MenuItem value={20}>BUSD</MenuItem>
                        <MenuItem value={30}>USDC</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Start ------------- Investment frequency ------------- */}
            <Typography fontSize={smallTextSize} color={smallTextColor}>Investment frequency</Typography>
            <Box sx={{ mt: 1, mb: 2 }}>
                <Button
                    color={dailyPeriod ? "secondary" : 'primary'}
                    onClick={() => changePeriod('daily')}
                    sx={{ border: 'white 1px solid' }}
                    variant="contained" >Daily</Button>
                <Button
                    color={weeklyPeriod ? "secondary" : 'primary'}
                    onClick={() => changePeriod('weekly')}
                    sx={{ color: 'white', border: 'white 1px solid', mx: 2 }} variant="contained" >Weekly
                </Button>

                <Button
                    color={monthlyPeriod ? "secondary" : 'primary'}
                    onClick={() => changePeriod('monthly')}
                    sx={{ border: 'white 1px solid' }}
                    variant="contained" >Monthly
                </Button>
            </Box>

            <Typography fontSize={smallTextSize} color={smallTextColor}>Investment period</Typography>

            <Box sx={{ display: 'flex' }}>
                <Box
                    sx={{
                        display: 'flex',
                        color: 'white',
                        alignItems: 'center',
                        mr: 4
                    }}>
                    <Typography fontSize={smallTextSize}>Unlimited</Typography>
                    <Switch
                        // disabled
                        onChange={handleSwitchChange}
                        color='warning'
                        defaultChecked={true} />
                    <Typography fontSize={14}>Limited</Typography>
                </Box>

                {switchChecked &&
                    <TextField
                        disabled
                        InputLabelProps={{ style: { color: smallTextColor } }}
                        label='days'
                        fullWidth
                        sx={{
                            input: { color: 'white' },
                            background: darkBackColor
                        }}
                        variant="outlined" />}
            </Box>
            {/* End ------------- Investment frequency ------------- */}
            <div>
                <Button
                    onClick={showMe}
                    fullWidth sx={{
                        backgroundColor: 'rgb(80, 168, 132)',
                        border: '1px solid #fff',
                        my: 2,
                        "&:hover": {
                            backgroundColor: '#92d1b7',
                            color: 'black'
                        }
                    }}>Send</Button> : <></>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={{mb:1}} variant="h5">
                        Strategy created for address:
                    </Typography>

                    <Typography>...{address?.toString().slice(address.length - 5, address.length)}</Typography>

                    <Typography sx={{ mt: 2 }}>
                        <Button
                        variant="contained"
                        sx={{
                            height: 25
                        }}
                        target="_blank" href="https://app.gelato.network/"
                        >Follow the link
                        </Button>
                    </Typography>
                </Box>
            </Modal>
        </Box>
    )
}