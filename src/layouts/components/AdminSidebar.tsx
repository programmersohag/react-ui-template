import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    Divider,
    Link,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import React from "react";

const AdminSidebar: React.FC = () => {
    return (
        <>
            {/* Removed backgroundColor here, relying on Drawer's background */}
            <Toolbar>
                <Typography variant="h6" noWrap component="div" sx={{color: 'white'}}>
                    My Dashboard
                </Typography>
            </Toolbar>
            <Divider/>
            <List>
                {/* ... rest of the list items */}
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/">
                        <ListItemIcon>
                            <DashboardIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Dashboard"/>
                    </ListItemButton>
                </ListItem>
                {/* ... */}
            </List>
            <Divider/>
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <LogoutIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Logout"/>
                    </ListItemButton>
                </ListItem>
            </List>
        </>
    );
}

export default AdminSidebar;