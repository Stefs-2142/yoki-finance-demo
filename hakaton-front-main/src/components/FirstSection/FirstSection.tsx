import { Box, Button, TextField, Typography } from "@mui/material"
import Switch from '@mui/material/Switch';
import { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAccount, useBalance } from 'wagmi';
import { Profile } from "../Profile";

export const FirstPage = () => {
    const [dailyPeriod, setDailyPeriod] = useState(false)
    const [weeklyPeriod, setWeeklyPeriod] = useState(false)
    const [monthlyPeriod, setMonthlyPeriod] = useState(false)
    const [switchChecked, setSwitchChecked] = useState(true)

    const { address, isConnecting, isDisconnected } = useAccount();
    const { data, isError, isLoading } = useBalance({address})

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

    const showMe = () => {
        console.log(data);
    }
    
    return (
        <Box sx={{p: 2}}>
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
                        defaultValue={10}
                        sx={{background: darkBackColor,
                            color: smallTextColor}}>
                        <MenuItem
                            sx={{background: darkBackColor,
                                color: smallTextColor}}
                            value={10}>ETH</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            {/* End-------- First Select -------- */}

            <Typography
                sx={{mt: 2}} fontSize={smallTextSize} color={smallTextColor}>Invest from</Typography>
            <Box sx={{
                display: 'flex',
                width: '100%',
                mb: 2}}>
                <TextField
                    InputLabelProps={{style: { color: smallTextColor }}}
                    sx={{input: { color: 'white' },
                        background: darkBackColor,
                        color: 'white',
                        mr: 2}}
                    label='0.00'
                    variant="outlined" />

                <FormControl fullWidth>
                    <Select
                        fullWidth
                        sx={{background: darkBackColor,
                            color: smallTextColor}}
                        defaultValue={10}>
                        <MenuItem value={10}>USDT</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Start ------------- Investment frequency ------------- */}
            <Typography fontSize={smallTextSize} color={smallTextColor}>Investment frequency</Typography>
            <Box sx={{mt: 1, mb: 2}}>
                <Button
                    color={dailyPeriod ? "secondary" : 'primary'}
                    onClick={() => changePeriod('daily')}
                    sx={{border: 'white 1px solid'}}
                    variant="contained" >Daily</Button>
                <Button
                    color={weeklyPeriod ? "secondary" : 'primary'}
                    onClick={() => changePeriod('weekly')}
                    sx={{border: 'white 1px solid', mx: 2}} variant="contained" >Weekly
                </Button>

                <Button
                    color={monthlyPeriod ? "secondary" : 'primary'}
                    onClick={() => changePeriod('monthly')}
                    sx={{border: 'white 1px solid'}}
                    variant="contained" >Monthly
                </Button>
            </Box>

            <Typography fontSize={smallTextSize} color={smallTextColor}>Investment period</Typography>

            <Box sx={{display: 'flex'}}>
                <Box
                 sx={{display: 'flex',
                    color: 'white',
                    alignItems: 'center',
                    mr: 4}}>
                    <Typography fontSize={smallTextSize}>Unlimited</Typography>
                    <Switch
                        onChange={handleSwitchChange}
                        color='warning'
                        defaultChecked />
                    <Typography fontSize={14}>Limited</Typography>
                </Box>

                {switchChecked &&
                    <TextField
                        InputLabelProps={{style: { color: smallTextColor }}}
                        label='days'
                        fullWidth
                        sx={{input: { color: 'white' },
                            background: darkBackColor}}
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
        </Box>
    )
}