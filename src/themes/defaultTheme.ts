import {createTheme} from '@mui/material/styles';
import {red} from '@mui/material/colors';

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#f4f6f8', // Light gray background for the main content
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#fa4028', // White app bar
                    color: '#333',         // Dark text
                    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.05)', // Subtle shadow
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#263238', // Dark background for the sidebar
                    color: '#ffffff',       // Light text
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: '#fa4028', // Light hover effect
                    },
                },
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: '#ffffff', // Light icons
                },
            },
        },
    },
});

export default defaultTheme;