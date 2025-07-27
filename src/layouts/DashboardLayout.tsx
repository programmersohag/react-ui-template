import React, {useState} from 'react';
import {
    AppBar,
    Box,
    CssBaseline,
    Drawer,
    IconButton,
    Toolbar,
    Typography,
    useTheme,
    styled,
    useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'; // Icon to close the drawer
import AccountCircle from '@mui/icons-material/AccountCircle';
import AdminSidebar from "./components/AdminSidebar.tsx";
import {Outlet} from 'react-router-dom';

const drawerWidth: number = 240;

// Styled component for the AppBar to handle transitions
const AppBarStyled = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== 'open', // Don't pass 'open' to the DOM
})<{ open?: boolean }>(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

// Styled component for the main content to handle transitions
const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})<{
    open?: boolean;
}>(({theme, open}) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`, // Initially push content to the left
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0, // When open, no left margin
    }),
}));

const DashboardLayout: React.FC = () => {
    const theme = useTheme();
    // State for mobile temporary drawer
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);
    // State for desktop persistent drawer
    const [desktopOpen, setDesktopOpen] = useState<boolean>(true); // Start open by default on desktop

    // Hook to check screen size based on theme breakpoints
    // `isSmUp` will be true for 'sm' (600px) and up
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

    // Handler for mobile drawer
    const handleMobileDrawerToggle = (): void => {
        console.log('mobile')
        setMobileOpen(!mobileOpen);
    };

    // Handler for desktop drawer
    const handleDesktopDrawerToggle = (): void => {
        console.log('desktop')
        setDesktopOpen(!desktopOpen);
    };

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>

            {/* App Bar */}
            <AppBarStyled
                position="fixed"
                open={desktopOpen && isSmUp} // Only open if desktop view AND desktopOpen state is true
                sx={{
                    zIndex: theme.zIndex.drawer + 1,
                    backgroundColor: '#fff',
                    color: '#333',
                    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.05)',
                }}
            >
                <Toolbar>
                    {/* Toggle button for mobile drawer (hidden on desktop) */}
                    {!isSmUp && (
                        <IconButton
                            color="inherit"
                            aria-label="open mobile drawer"
                            edge="start"
                            onClick={handleMobileDrawerToggle}
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                    )}

                    {/* Toggle button for desktop persistent drawer (only shown on desktop) */}
                    {isSmUp && (
                        <IconButton
                            color="inherit"
                            aria-label="toggle desktop drawer"
                            onClick={handleDesktopDrawerToggle}
                            edge="start"
                            sx={{mr: 2}}
                        >
                            {desktopOpen ? <ChevronLeftIcon/> : <MenuIcon/>} {/* Change icon based on state */}
                        </IconButton>
                    )}

                    <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1}}>
                        Dashboard Overview
                    </Typography>
                    <IconButton color="inherit">
                        <AccountCircle/>
                    </IconButton>
                </Toolbar>
            </AppBarStyled>

            {/* Navigation Drawer */}
            <Box
                component="nav"
                sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
                aria-label="dashboard navigation"
            >
                {/* Temporary drawer (for small screens) */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleMobileDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: {xs: 'block', sm: 'none'}, // Only on extra-small screens
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            backgroundColor: theme.components?.MuiDrawer?.styleOverrides?.paper?.backgroundColor, // Use theme color
                            color: theme.components?.MuiDrawer?.styleOverrides?.paper?.color,
                        },
                    }}
                >
                    <AdminSidebar/>
                </Drawer>

                {/* Persistent drawer (for large screens) */}
                <Drawer
                    variant="persistent" // Changed from 'permanent' to 'persistent'
                    open={desktopOpen} // Controlled by desktopOpen state
                    sx={{
                        display: {xs: 'none', sm: 'block'}, // Only on small and up
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            backgroundColor: theme.components?.MuiDrawer?.styleOverrides?.paper?.backgroundColor,
                            color: theme.components?.MuiDrawer?.styleOverrides?.paper?.color,
                        },
                    }}
                >
                    <AdminSidebar/>
                </Drawer>
            </Box>

            {/* Main Content Area */}
            <Main open={desktopOpen && isSmUp}> {/* Pass desktopOpen state to Main */}
                <Toolbar/> {/* To offset content from fixed AppBar */}
                <Outlet/> {/* Render child components (dashboard pages) here */}
            </Main>
        </Box>
    );
};

export default DashboardLayout;