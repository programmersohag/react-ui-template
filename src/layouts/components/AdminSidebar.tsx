import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    Divider,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import {useLocation, useNavigate} from "react-router-dom";

import React from "react";

const AdminSidebar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const menuItems = [
        {text: "Home", path: "/"},
        {text: "Form", path: "/form"},
        {text: "Table", path: "/table"},
        {text: "Multi Step Form", path: "/multi-step-form"}
    ];

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
                <List>
                    {menuItems.map((item) => (
                        <ListItemButton
                            key={item.text}
                            selected={location.pathname === item.path} // highlight active
                            onClick={() => navigate(item.path)}
                        >
                            <ListItemIcon>
                                <DashboardIcon/>
                            </ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </ListItemButton>
                    ))}
                </List>
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