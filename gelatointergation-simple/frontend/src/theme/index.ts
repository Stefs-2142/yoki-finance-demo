import { createTheme } from '@mui/material/styles';

export const themeMui: any = createTheme({
    palette: {
        primary: {
            main: '#000',
            light: '#819ca9',
            dark: '#649f84',
        },

        secondary: {
            main: '#50a884',
            light: '#50A884',
            dark: '#285442',
        },

        warning: {
            main: '#50a884',
            light: '#000',
            dark: '#000',
        }
    },

    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: true
            },
            styleOverrides: {
                root: {
                    // background: 'black',
                    textTransform: 'none',
                    color: '#fff',
                },
                sizeSmall: {
                    padding: '6px 16px'
                },
                sizeMedium: {
                    padding: '8px 20px'
                },
                sizeLarge: {
                    padding: '11px 24px'
                },
                textSizeSmall: {
                    padding: '7px 12px'
                },
                textSizeMedium: {
                    padding: '9px 16px'
                },
                textSizeLarge: {
                    padding: '12px 16px'
                }
            }
        },
        MuiSwitch: {
            styleOverrides: {
                switchBase: {
                    // Controls default (unchecked) color for the thumb
                    color: "#ccc",
                },
                colorSecondary: {
                    "&$checked": {
                        // Controls checked color for the thumb
                        color: "#f2ff00"
                    }
                },
                track: {
                    // Controls default (unchecked) color for the track
                    opacity: 0.2,
                    backgroundColor: "#fff",
                    "$checked$checked + &": {
                        // Controls checked color for the track
                        opacity: 0.7,
                        backgroundColor: "#fff"
                    }
                }
            }
        },
        MuiCssBaseline: {
            styleOverrides: {
                '*': {},
                body: {
                    width: '100%'
                },
            }
        }
    },
    shape: {
        borderRadius: 8
    },
    typography: {
        fontFamily:
            '"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    },
});
